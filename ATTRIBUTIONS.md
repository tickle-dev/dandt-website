# Attributions

## Company artwork

The D&T Go Elite logo is company-owned artwork supplied by the customer. It is not a stock image and is not covered by the licenses below.

| File | Description |
|---|---|
| `company-logo.png` | Original logo file supplied by the customer (kept unchanged) |
| `src/assets/brand/logo-full.png` | Full logo cropped from the customer's logo by `scripts/crop-logo.mjs` |
| `src/assets/brand/logo-header.png` | Header logo (without the "ROOFING AND CONSTRUCTION" line) cropped from the customer's logo by `scripts/crop-logo.mjs` |
| `public/favicon.png` | Favicon made from the customer's artwork by `scripts/crop-logo.mjs` |

## Stock photos

Each stock photo comes from Unsplash or Pexels under that site's free license:

- Unsplash License: https://unsplash.com/license
- Pexels License: https://www.pexels.com/license/

Add exactly one row per bundled photo. List the raw master in `assets-src/photos/` and the three optimized files in `src/assets/photos/` that `npm run optimize-photos` makes from it. Every row must point to files that exist in the repository. See `assets-src/photos/SOURCING.md` for the steps.

Example row:

```
| `assets-src/photos/home-hero.jpg`, `src/assets/photos/home-hero-{640,1280,1920}.webp` | https://unsplash.com/photos/… | Photographer Name | Unsplash License | https://unsplash.com/license |
```

| File | Source page | Photographer | License | License URL |
|---|---|---|---|---|
| `assets-src/photos/home-hero.jpg`, `src/assets/photos/home-hero-{640,1280,1920}.webp` | https://www.pexels.com/photo/roofer-installing-shingles-on-a-sunny-day-38028508/ | TODO: add the name shown on the source page | Pexels License | https://www.pexels.com/license/ |

Notes:

- `home-hero`: third-party product branding on the shingle bundles, the ridge strip and the roofing underlayment was blurred before optimizing (Req 26.22). The Pexels License allows modification.
