// Builds the bundled logo assets from the customer's artwork (Req 17.1–17.3, 17.6, 17.7, 17.13, 17.14).
//
// Outputs:
//   src/assets/brand/logo-full.png    full Logo (Footer)
//   src/assets/brand/logo-header.png  compact Header_Logo ("D&T" + roofline + "GO ELITE")
//   public/favicon.png                512 × 512 favicon
//   src/assets/brand/logoSizes.ts     intrinsic sizes for the <img> width/height attributes
//
// Sources, in order of preference:
//   brand/logo.svg, brand/logo.png    customer logo (both logos)
//   brand/icon.svg, brand/icon.png    Brand_Icon (favicon)
//   company-logo.png                  fallback; read only, never written
//
// Run with `npm run crop-logo`.

import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (p) => path.relative(root, p);

const FALLBACK_LOGO = path.join(root, 'company-logo.png');
const BRAND_DIR = path.join(root, 'brand');
const BRAND_DIR_OUT = path.join(root, 'src', 'assets', 'brand');
const PUBLIC_DIR = path.join(root, 'public');

/** A pixel is background when every RGB channel is at or below this value (Req 17.2). */
const BG_MAX = 24;
/** Padding added around each trimmed wordmark, as a fraction of its own height / width. */
const PAD_Y = 0.04;
const PAD_X = 0.02;
/** Req 17.2: each margin must be > 0 and at most 8% of the output height / width. */
const MAX_MARGIN = 0.08;
/** Req 17.6: at least 2 image pixels per CSS pixel at the largest rendered heights. */
const MIN_FULL_HEIGHT = 2 * 120; // --logo-footer-h on desktop
const MIN_HEADER_HEIGHT = 2 * 56; // --logo-header-h on tablet and desktop
const FAVICON_SIZE = 512;
/** Row-profile threshold: a row is part of a text line when this share of the box width is wordmark. */
const ROW_MIN_FRACTION = 0.01;
/** Rendered width for SVG sources, so vector artwork rasterizes at high resolution. */
const SVG_TARGET_WIDTH = 2400;

/**
 * Wordmark-box rows measured on company-logo.png during design:
 * "D&T" with the roofline spans rows 13–317, "GO ELITE" 321–419,
 * "ROOFING AND CONSTRUCTION" 436–476.
 */
const COMPANY_LOGO_HEADER_LAST_ROW = 419;
const COMPANY_LOGO_ICON_LAST_ROW = 317;

// ---------------------------------------------------------------------------
// Image helpers. An "image" is { data: Buffer (RGB, 3 channels), width, height }.
// ---------------------------------------------------------------------------

function firstExisting(names) {
  for (const name of names) {
    const file = path.join(BRAND_DIR, name);
    if (existsSync(file)) return file;
  }
  return null;
}

/** Loads a file as RGB on exact black (transparent areas become black). Never writes the file. */
async function loadRgb(file) {
  let input = sharp(file);
  if (file.toLowerCase().endsWith('.svg')) {
    const meta = await input.metadata();
    const density = meta.width ? Math.max(72, (72 * SVG_TARGET_WIDTH) / meta.width) : 300;
    input = sharp(file, { density });
  }
  const { data, info } = await input
    .flatten({ background: '#000000' })
    .removeAlpha()
    .toColourspace('srgb')
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (info.channels !== 3) throw new Error(`Unexpected channel count ${info.channels} in ${rel(file)}`);
  // Copy so the buffer is ours to modify; the source file is never touched.
  return { data: Buffer.from(data), width: info.width, height: info.height };
}

const isWordmark = (d, i) => d[i] > BG_MAX || d[i + 1] > BG_MAX || d[i + 2] > BG_MAX;

/** Sets every background pixel (all channels <= 24) to exact #000000, in place. */
function cleanBackground(img) {
  const d = img.data;
  for (let i = 0; i < d.length; i += 3) {
    if (!isWordmark(d, i)) {
      d[i] = 0;
      d[i + 1] = 0;
      d[i + 2] = 0;
    }
  }
  return img;
}

/** Bounding box of wordmark pixels inside rows [y0, y1] of the image. */
function wordmarkBox(img, y0 = 0, y1 = img.height - 1) {
  let left = img.width;
  let right = -1;
  let top = -1;
  let bottom = -1;
  for (let y = y0; y <= y1; y++) {
    const row = y * img.width * 3;
    for (let x = 0; x < img.width; x++) {
      if (isWordmark(img.data, row + x * 3)) {
        if (top < 0) top = y;
        bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }
  if (right < 0) return null;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

function crop(img, box) {
  const out = Buffer.alloc(box.width * box.height * 3);
  for (let y = 0; y < box.height; y++) {
    const src = ((box.top + y) * img.width + box.left) * 3;
    img.data.copy(out, y * box.width * 3, src, src + box.width * 3);
  }
  return { data: out, width: box.width, height: box.height };
}

/**
 * Rows that carry text: at least ROW_MIN_FRACTION of the box width in wordmark pixels. Sparser
 * rows (stray noise pixels, anti-aliased tips where two lines nearly touch) count as gap rows.
 */
function rowProfile(img) {
  const minPixels = Math.max(1, img.width * ROW_MIN_FRACTION);
  const rows = new Array(img.height).fill(false);
  for (let y = 0; y < img.height; y++) {
    const row = y * img.width * 3;
    let count = 0;
    for (let x = 0; x < img.width; x++) {
      if (isWordmark(img.data, row + x * 3)) count++;
    }
    rows[y] = count >= minPixels;
  }
  return rows;
}

/** Runs of consecutive text rows, as [{ start, end }] from top to bottom. */
function rowRuns(rows, lastRow = rows.length - 1) {
  const runs = [];
  for (let y = 0; y <= lastRow; y++) {
    if (!rows[y]) continue;
    if (runs.length && runs.at(-1).end === y - 1) runs.at(-1).end = y;
    else runs.push({ start: y, end: y });
  }
  return runs;
}

/**
 * Last row above the bottom text run within rows [0, lastRow]: the end of the run just above the
 * last gap of background rows. Returns null when the area has a single run.
 */
function splitAboveBottomRun(rows, lastRow) {
  const runs = rowRuns(rows, lastRow);
  return runs.length < 2 ? null : runs.at(-2).end;
}

/** Trims rows [0, lastRow] of the wordmark box to their own wordmark pixels. */
function trimRows(box, lastRow) {
  const b = wordmarkBox(box, 0, lastRow);
  if (!b) throw new Error(`No wordmark pixels in rows 0–${lastRow}`);
  return crop(box, b);
}

/** Pads with exact black: 4% of the height at top and bottom, 2% of the width at left and right. */
async function padToPng(img) {
  const padY = Math.max(1, Math.round(img.height * PAD_Y));
  const padX = Math.max(1, Math.round(img.width * PAD_X));
  const png = await sharp(img.data, { raw: { width: img.width, height: img.height, channels: 3 } })
    .extend({ top: padY, bottom: padY, left: padX, right: padX, background: '#000000' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  return { png, width: img.width + 2 * padX, height: img.height + 2 * padY, padX, padY };
}

/** Scales the image to fit 512 × 512 and centers it on exact black. */
async function faviconPng(img) {
  const scale = Math.min(FAVICON_SIZE / img.width, FAVICON_SIZE / img.height);
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const { data, info } = await sharp(img.data, { raw: { width: img.width, height: img.height, channels: 3 } })
    .resize(w, h, { fit: 'fill', kernel: 'lanczos3' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  // Resampling can leave faint non-black values around the mark; keep the background exact black.
  const scaled = cleanBackground({ data: Buffer.from(data), width: info.width, height: info.height });
  // Center on an exact-black RGB canvas.
  const canvas = Buffer.alloc(FAVICON_SIZE * FAVICON_SIZE * 3);
  const left = Math.floor((FAVICON_SIZE - scaled.width) / 2);
  const top = Math.floor((FAVICON_SIZE - scaled.height) / 2);
  for (let y = 0; y < scaled.height; y++) {
    const src = y * scaled.width * 3;
    scaled.data.copy(canvas, ((top + y) * FAVICON_SIZE + left) * 3, src, src + scaled.width * 3);
  }
  return sharp(canvas, { raw: { width: FAVICON_SIZE, height: FAVICON_SIZE, channels: 3 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

/** Checks the Req 17.2 margins and the Req 17.6 minimum height of a padded output. */
function check(name, out, minHeight) {
  const errors = [];
  if (out.padY <= 0 || out.padY > MAX_MARGIN * out.height) errors.push(`top/bottom margin ${out.padY}px`);
  if (out.padX <= 0 || out.padX > MAX_MARGIN * out.width) errors.push(`left/right margin ${out.padX}px`);
  if (out.height < minHeight) errors.push(`height ${out.height}px is below the ${minHeight}px minimum`);
  if (errors.length) throw new Error(`${name}: ${errors.join('; ')}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const customerLogo = firstExisting(['logo.svg', 'logo.png']);
const brandIcon = firstExisting(['icon.svg', 'icon.png']);
const logoSource = customerLogo ?? FALLBACK_LOGO;
const usingFallback = logoSource === FALLBACK_LOGO;

console.log(`Logo source: ${rel(logoSource)}${usingFallback ? ' (no brand/logo.svg or brand/logo.png found)' : ''}`);

const source = cleanBackground(await loadRgb(logoSource));
const outer = wordmarkBox(source);
if (!outer) throw new Error(`${rel(logoSource)} has no wordmark pixels (any channel above ${BG_MAX})`);
const box = crop(source, outer);
console.log(
  `Wordmark box: x ${outer.left}–${outer.left + outer.width - 1}, y ${outer.top}–${outer.top + outer.height - 1} ` +
    `(${box.width} × ${box.height} px)`,
);

// Split rows from the row profile: the header ends above the "ROOFING AND CONSTRUCTION" run, and
// the icon ("D&T" with the roofline) ends above the "GO ELITE" run.
const rows = rowProfile(box);
const measuredHeaderLast = splitAboveBottomRun(rows, box.height - 1);
if (measuredHeaderLast === null) throw new Error('Could not find the gap above the "ROOFING AND CONSTRUCTION" line');
const measuredIconLast = splitAboveBottomRun(rows, measuredHeaderLast);

let headerLast = measuredHeaderLast;
let iconLast = measuredIconLast;
if (usingFallback) {
  headerLast = COMPANY_LOGO_HEADER_LAST_ROW;
  iconLast = COMPANY_LOGO_ICON_LAST_ROW;
  if (measuredHeaderLast !== headerLast || measuredIconLast !== iconLast) {
    console.warn(
      `Warning: row profile gives header rows 0–${measuredHeaderLast} and icon rows 0–${measuredIconLast}; ` +
        `using the design measurements 0–${headerLast} and 0–${iconLast}.`,
    );
  }
} else if (box.height < 477) {
  console.warn(`Warning: ${rel(logoSource)} has a ${box.height} px wordmark, smaller than company-logo.png (477 px).`);
}
console.log(`Header_Logo rows: 0–${headerLast}; favicon rows: 0–${iconLast ?? headerLast}`);

const full = await padToPng(box);
const header = await padToPng(trimRows(box, headerLast));
check('logo-full.png', full, MIN_FULL_HEIGHT);
check('logo-header.png', header, MIN_HEADER_HEIGHT);

let favicon;
if (brandIcon) {
  console.log(`Favicon source: ${rel(brandIcon)} (Brand_Icon)`);
  const icon = cleanBackground(await loadRgb(brandIcon));
  const iconBox = wordmarkBox(icon);
  if (!iconBox) throw new Error(`${rel(brandIcon)} has no visible pixels (any channel above ${BG_MAX})`);
  favicon = await faviconPng(crop(icon, iconBox));
} else {
  console.log(`Favicon source: ${rel(logoSource)}, wordmark rows 0–${iconLast ?? headerLast} ("D&T" with the roofline)`);
  favicon = await faviconPng(trimRows(box, iconLast ?? headerLast));
}

await mkdir(BRAND_DIR_OUT, { recursive: true });
await mkdir(PUBLIC_DIR, { recursive: true });

const outputs = [
  [path.join(BRAND_DIR_OUT, 'logo-full.png'), full.png, `${full.width} × ${full.height}`],
  [path.join(BRAND_DIR_OUT, 'logo-header.png'), header.png, `${header.width} × ${header.height}`],
  [path.join(PUBLIC_DIR, 'favicon.png'), favicon, `${FAVICON_SIZE} × ${FAVICON_SIZE}`],
];
for (const [file, buf, size] of outputs) {
  if (path.resolve(file) === path.resolve(FALLBACK_LOGO)) throw new Error('Refusing to overwrite company-logo.png');
  await writeFile(file, buf);
  console.log(`Wrote ${rel(file)} (${size} px)`);
}

const sizesFile = path.join(BRAND_DIR_OUT, 'logoSizes.ts');
await writeFile(
  sizesFile,
  `// Generated by scripts/crop-logo.mjs from ${rel(logoSource)}. Do not edit; run \`npm run crop-logo\`.
// Intrinsic pixel sizes for the logo <img> width and height attributes (Req 17.11, 17.14).

export const logoFullSize = { width: ${full.width}, height: ${full.height} } as const;

export const logoHeaderSize = { width: ${header.width}, height: ${header.height} } as const;
`,
);
console.log(`Wrote ${rel(sizesFile)}`);
