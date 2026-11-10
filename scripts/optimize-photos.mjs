// Builds the bundled Stock_Photo files and the photo manifest (Req 16.2, 16.3, 16.8).
//
// Input:   assets-src/photos/{slot id}.{jpg,jpeg,png,webp}   one downloaded master per slot
// Outputs: src/assets/photos/{slot id}-{width}.webp           640, 1280 and 1920 px wide
//          src/assets/photos/photoManifest.ts                 regenerated from SLOTS
//
// Each master is auto-rotated, cropped to its slot ratio around the slot's `focal` point (the
// same CSS object-position the SmartImage uses), resized without upscaling so the longest edge is
// at most 1920 px, and exported as WebP at quality 78 with no metadata. A file above 400 KB is
// re-encoded at a lower quality. Old `{slot id}-{width}.webp` files that this run did not write
// are deleted, so the files on disk always match the manifest.
//
// `focal` values are read from the existing manifest and kept. Slots without a master keep
// empty `sources` and their nominal size, so a run with no photos leaves the manifest unchanged.
//
// Run with `npm run optimize-photos`.

import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (p) => path.relative(root, p);

const RAW_DIR = path.join(root, 'assets-src', 'photos');
const OUT_DIR = path.join(root, 'src', 'assets', 'photos');
const MANIFEST = path.join(OUT_DIR, 'photoManifest.ts');

const RAW_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const TARGET_WIDTHS = [640, 1280, 1920];
/** Longest edge of any output file, in px (Req 16.3 allows 2400). */
const MAX_EDGE = 1920;
const QUALITY = 78;
const MIN_QUALITY = 30;
const QUALITY_STEP = 4;
/** Req 16.3: each file at most 400 KB (counted as 400,000 bytes to stay on the safe side). */
const MAX_BYTES = 400_000;
const DEFAULT_FOCAL = '50% 50%';

/** Slot ratios, as [width, height]. */
const HEADER = [3, 2]; // home hero and Service_Category headers
const PROJECT = [4, 3]; // Project_Cards
const PORTRAIT = [4, 5]; // About image

/** One entry per slot in the design's Photo slots table, in manifest order. */
const SLOTS = [
  { id: 'home-hero', ratio: HEADER },
  { id: 'category-exterior-improvements', ratio: HEADER },
  { id: 'category-interior-improvements', ratio: HEADER },
  { id: 'category-flooring-tile', ratio: HEADER },
  { id: 'category-kitchen-bathroom-upgrades', ratio: HEADER },
  { id: 'category-roofing-exterior-construction', ratio: HEADER },
  { id: 'category-general-construction-repairs', ratio: HEADER },
  { id: 'category-outdoor-living', ratio: HEADER },
  { id: 'project-roof-replacement', ratio: PROJECT },
  { id: 'project-storm-roof-repair', ratio: PROJECT },
  { id: 'project-composite-deck', ratio: PROJECT },
  { id: 'project-backyard-pergola', ratio: PROJECT },
  { id: 'project-bathroom-remodel', ratio: PROJECT },
  { id: 'project-kitchen-backsplash', ratio: PROJECT },
  { id: 'project-stained-cedar-fence', ratio: PROJECT },
  { id: 'project-exterior-repaint', ratio: PROJECT },
  { id: 'project-hardwood-flooring', ratio: PROJECT },
  { id: 'project-crown-molding', ratio: PROJECT },
  { id: 'about', ratio: PORTRAIT },
];

/** Largest size for a ratio with the longest edge at MAX_EDGE: 1920 × 1280, 1920 × 1440, 1536 × 1920. */
function nominalSize([rw, rh]) {
  return rw >= rh
    ? { width: MAX_EDGE, height: Math.round((MAX_EDGE * rh) / rw) }
    : { width: Math.round((MAX_EDGE * rw) / rh), height: MAX_EDGE };
}

// ---------------------------------------------------------------------------
// Existing manifest: keep each slot's `focal` value.
// ---------------------------------------------------------------------------

async function readExistingFocals() {
  const focals = new Map();
  if (!existsSync(MANIFEST)) return focals;
  const text = await readFile(MANIFEST, 'utf8');
  const entry = /^ {2}'([^']+)': \{[\s\S]*?^ {4}focal: (['"])((?:\\.|(?!\2).)*)\2,$/gm;
  for (const m of text.matchAll(entry)) focals.set(m[1], m[3].replace(/\\(.)/g, '$1'));
  return focals;
}

/** Parses a CSS object-position value ('50% 40%', 'center top', '30%') into 0–1 fractions. */
function focalFractions(focal) {
  const keywordX = { left: 0, center: 0.5, right: 1 };
  const keywordY = { top: 0, center: 0.5, bottom: 1 };
  const pct = (t) => {
    const m = /^(-?\d+(?:\.\d+)?)%$/.exec(t);
    return m ? Math.min(1, Math.max(0, Number(m[1]) / 100)) : null;
  };
  let [a, b = 'center'] = focal.trim().toLowerCase().split(/\s+/);
  // A vertical keyword first ('top', 'top left', 'bottom center'): swap to x then y.
  if ((a === 'top' || a === 'bottom') && b in keywordX) [a, b] = [b, a];
  const x = pct(a) ?? keywordX[a];
  const y = pct(b) ?? keywordY[b];
  if (x === undefined || y === undefined) return null;
  return { x, y };
}

// ---------------------------------------------------------------------------
// Image processing
// ---------------------------------------------------------------------------

/** Finds `{id}.{ext}` masters in assets-src/photos. Returns Map<slot id, file>. */
async function findMasters() {
  const masters = new Map();
  if (!existsSync(RAW_DIR)) return masters;
  const known = new Set(SLOTS.map((s) => s.id));
  for (const name of (await readdir(RAW_DIR)).sort()) {
    const ext = path.extname(name).toLowerCase();
    if (!RAW_EXTENSIONS.includes(ext)) continue;
    const id = path.basename(name, path.extname(name));
    if (!known.has(id)) {
      console.warn(`Warning: ${rel(path.join(RAW_DIR, name))} does not match a slot id; skipped.`);
      continue;
    }
    if (masters.has(id)) {
      throw new Error(`Two masters for slot "${id}": ${rel(masters.get(id))} and ${rel(path.join(RAW_DIR, name))}`);
    }
    masters.set(id, path.join(RAW_DIR, name));
  }
  return masters;
}

/** Crop box with the slot ratio, placed like CSS object-position at the focal point. */
function cropBox(srcW, srcH, [rw, rh], { x, y }) {
  let width = srcW;
  let height = Math.round((srcW * rh) / rw);
  if (height > srcH) {
    height = srcH;
    width = Math.min(srcW, Math.round((srcH * rw) / rh));
  }
  return {
    left: Math.round((srcW - width) * x),
    top: Math.round((srcH - height) * y),
    width,
    height,
  };
}

/** Encodes one size, lowering the quality until the file is at most MAX_BYTES. */
async function encode(raw, box, width, height) {
  for (let quality = QUALITY; quality >= MIN_QUALITY; quality -= QUALITY_STEP) {
    const buf = await sharp(raw.data, { raw: raw.info })
      .extract(box)
      .resize(width, height, { fit: 'fill', kernel: 'lanczos3' })
      .webp({ quality, effort: 6 })
      .toBuffer();
    if (buf.length <= MAX_BYTES) return { buf, quality };
  }
  throw new Error(`Could not get a ${width} × ${height} file under ${MAX_BYTES} bytes at quality ${MIN_QUALITY}`);
}

/** Processes one master. Returns [{ file, width, height }] from smallest to largest. */
async function processSlot(slot, file, focal) {
  // Decoding to raw pixels applies the EXIF orientation and drops all metadata (EXIF, XMP, ICC).
  const { data, info } = await sharp(file)
    .rotate()
    .flatten({ background: '#000000' })
    .toColourspace('srgb')
    .raw()
    .toBuffer({ resolveWithObject: true });
  const raw = { data, info: { width: info.width, height: info.height, channels: info.channels } };

  let point = focalFractions(focal);
  if (!point) {
    console.warn(`Warning: ${slot.id} focal "${focal}" is not a CSS position; cropping around the center.`);
    point = { x: 0.5, y: 0.5 };
  }
  const box = cropBox(info.width, info.height, slot.ratio, point);
  const nominal = nominalSize(slot.ratio);
  const maxWidth = Math.min(box.width, nominal.width);
  if (maxWidth < TARGET_WIDTHS.at(-1) && maxWidth < nominal.width) {
    console.warn(`Warning: ${rel(file)} gives a ${box.width} px wide crop; outputs stop at ${maxWidth} px (no upscaling).`);
  }
  const widths = [...new Set(TARGET_WIDTHS.map((w) => Math.min(w, maxWidth)))];

  const [rw, rh] = slot.ratio;
  const outputs = [];
  for (const width of widths) {
    const height = Math.round((width * rh) / rw);
    const { buf, quality } = await encode(raw, box, width, height);
    const out = path.join(OUT_DIR, `${slot.id}-${width}.webp`);
    await writeFile(out, buf);
    const note = quality === QUALITY ? '' : `, quality ${quality}`;
    console.log(`Wrote ${rel(out)} (${width} × ${height} px, ${(buf.length / 1000).toFixed(0)} KB${note})`);
    outputs.push({ file: path.basename(out), width, height });
  }
  return outputs;
}

/** Deletes `{slot id}-{width}.webp` files that this run did not write. */
async function removeStale(written) {
  const known = new Set(SLOTS.map((s) => s.id));
  for (const name of await readdir(OUT_DIR)) {
    const m = /^(.+)-(\d+)\.webp$/.exec(name);
    if (!m || !known.has(m[1]) || written.has(name)) continue;
    await unlink(path.join(OUT_DIR, name));
    console.log(`Removed stale ${rel(path.join(OUT_DIR, name))}`);
  }
}

// ---------------------------------------------------------------------------
// Manifest
// ---------------------------------------------------------------------------

const quote = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const importName = (id, width) => id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()) + width;

function renderManifest(entries) {
  const imports = entries.flatMap((e) =>
    e.outputs.map((o) => `import ${importName(e.id, o.width)} from './${o.file}';`),
  );
  const lines = [
    "// Photo manifest: one entry per slot in the design's Photo slots table.",
    '// Regenerated by `npm run optimize-photos` (scripts/optimize-photos.mjs). Edit `focal`',
    '// values by hand if needed; the script keeps them. Slots with empty `sources` have no',
    '// files yet, keep their nominal size (3:2 hero and headers, 4:3 projects, 4:5 About)',
    '// and render the SmartImage placeholder.',
    "import type { Photo, PhotoId } from '../../content/types.ts';",
    ...imports,
    '',
    'export const photoManifest = {',
  ];
  for (const e of entries) {
    lines.push(`  ${quote(e.id)}: {`, `    id: ${quote(e.id)},`, `    width: ${e.width},`, `    height: ${e.height},`);
    if (e.outputs.length === 0) {
      lines.push('    sources: [],');
    } else {
      lines.push('    sources: [');
      for (const o of e.outputs) lines.push(`      { src: ${importName(e.id, o.width)}, width: ${o.width} },`);
      lines.push('    ],');
    }
    lines.push(`    focal: ${quote(e.focal)},`, '  },');
  }
  lines.push(
    '} satisfies Record<PhotoId, Photo>;',
    '',
    '/** Every slot id in the manifest. */',
    'export type PhotoSlotId = keyof typeof photoManifest;',
    '',
    '/** Looks up a slot; throws on an unknown id so a typo in the content shows at once. */',
    'export function getPhoto(id: PhotoId): Photo {',
    '  const photo = (photoManifest as Record<PhotoId, Photo | undefined>)[id];',
    '  if (!photo) throw new Error(`Unknown photo id "${id}" (not in photoManifest.ts).`);',
    '  return photo;',
    '}',
    '',
  );
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const focals = await readExistingFocals();
const slotIds = new Set(SLOTS.map((s) => s.id));
const missing = [...focals.keys()].filter((id) => !slotIds.has(id));
if (missing.length) {
  throw new Error(`photoManifest.ts has slots that are not in SLOTS: ${missing.join(', ')}. Add them to SLOTS first.`);
}

await mkdir(OUT_DIR, { recursive: true });
const masters = await findMasters();
console.log(`Masters found in ${rel(RAW_DIR)}: ${masters.size} of ${SLOTS.length} slots`);

const entries = [];
const written = new Set();
for (const slot of SLOTS) {
  const focal = focals.get(slot.id) ?? DEFAULT_FOCAL;
  const file = masters.get(slot.id);
  const outputs = file ? await processSlot(slot, file, focal) : [];
  for (const o of outputs) written.add(o.file);
  const size = outputs.length ? outputs.at(-1) : nominalSize(slot.ratio);
  entries.push({ id: slot.id, width: size.width, height: size.height, outputs, focal });
}
await removeStale(written);

const manifest = renderManifest(entries);
const previous = existsSync(MANIFEST) ? await readFile(MANIFEST, 'utf8') : null;
if (manifest === previous) {
  console.log(`${rel(MANIFEST)} is unchanged`);
} else {
  await writeFile(MANIFEST, manifest);
  console.log(`Wrote ${rel(MANIFEST)}`);
}
