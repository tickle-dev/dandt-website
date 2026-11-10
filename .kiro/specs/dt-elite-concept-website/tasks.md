# Implementation Plan: D&T Go Elite Concept Website

## Overview

Build the static React 19 + TypeScript + Vite 7 single-page site described in `design.md` and deploy it to GitHub Pages. The order is UI first: the project scaffold, then the Theme (`tokens.css`, fonts, global styles) and the shared building blocks, then the logo and photo assets, the Content_Module, the app shell, and finally the pages, each built to its table in the design's "Page layouts" section. Deployment and the manual Visual_Review close the plan.

Decisions that apply to every task:

- No automated tests and no test or lint tooling (user decision: "We don't need to worry about tests right now; this is just a low-level concept website"). `npm run build`, which runs `tsc -b`, is the only automated check. The design's Correctness Properties describe how the `src/lib` functions must behave; no property tests are written.
- Only `src/styles/tokens.css` contains literal colors, sizes, spacing, radii and shadows (Req 13.3). Components use CSS Modules and the tokens.
- All copy lives in `src/content/` (Placeholder_Content flagged `placeholder: true`, fixed product copy in `uiText.ts`), never in layout code (Req 16.11).
- Brand_Voice rules for all content (Req 27): whenever a sentence says who does on-site work, name the crew, team or specialists for that trade. Outside the company name, "elite" appears only in the About story's workmanship sentence, in at most one non-featured review, and in the Footer Tagline. Never use "general contractor(s)", "handyman", "handymen" or "jack of all trades" (with or without hyphens). Use no superlatives or ranking phrases ("best in", "#1", "top-rated", "world-class" and the rest of Req 27.12), and no exclamation marks or pressure phrases outside review text. Write complete English sentences about DFW home improvement work, with no lorem ipsum. "General Construction & Repairs" and "General Home Repairs" stay verbatim.
- Photos are downloaded by hand later. Until then every photo slot renders an intentional SmartImage placeholder, and the site must look finished with them.

## Tasks

- [x] 1. Scaffold the project and the build configuration
  - [x] 1.1 Scaffold Vite + React + TypeScript at the workspace root
    - Create `package.json` (`"type": "module"`) with the scripts `dev` (`vite`), `build` (`tsc -b && vite build`), `preview` (`vite preview`), `crop-logo` (`node scripts/crop-logo.mjs`) and `optimize-photos` (`node scripts/optimize-photos.mjs`)
    - Dependencies: `react` and `react-dom` 19, `react-router` 7, `lucide-react`, `simple-icons`, `@fontsource-variable/cinzel`, `@fontsource-variable/inter`. Dev dependencies: `vite` 7, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `sharp`. Run `npm install` to create `package-lock.json`
    - Add strict tsconfig files (app and node projects referenced from `tsconfig.json`), `index.html` (`lang="en"`, viewport meta, `<link rel="icon" type="image/png" href="/favicon.png">`, `#root`, `/src/main.tsx`), `.gitignore` (`node_modules`, `dist`) and a minimal `src/main.tsx` that mounts React into `#root`
    - Add no test or lint tooling
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 1.7_
  - [x] 1.2 Implement `src/lib/basePath.ts` and `vite.config.ts`
    - `resolveBasePath(raw)`: unset or `''` returns `/`; a value that starts and ends with `/` is returned unchanged; anything else throws `Invalid BASE_PATH "<value>": it must start and end with "/" (for example "/my-repository/").`. `routerBasename(base)` returns `base.replace(/\/$/, '') || '/'`
    - `vite.config.ts`: `base: resolveBasePath(process.env.BASE_PATH)`, `@vitejs/plugin-react`, and an inline `spaFallback404()` plugin that copies `dist/index.html` to `dist/404.html` in `writeBundle`. Leave `publicDir` at its default `public/`, so `dist/` holds only `index.html`, `404.html`, `favicon.png` and `assets/`, with nothing named after a route segment
    - Include `src/lib/basePath.ts` in the node tsconfig so `tsc -b` type-checks the import
    - _Requirements: 1.2, 1.8, 5.4, 25.7, 25.9, 25.10, 25.11, 25.15_

- [x] 2. Build the Theme: tokens, fonts and global styles
  - [x] 2.1 Create `src/styles/tokens.css`
    - Copy the design's token block: the nine colors, the two font families, the type scale with its 768 px and 1024 px overrides, three weights, line heights, letter-spacing, `--measure`, the nine-step spacing scale, section padding, grid gap, card padding, gutters, `--container-max`, three radii, two shadows, header and logo heights, header row tokens, CTA sizes, `--ctc-height`, `--tap-min`, border and focus widths, and `--duration-fast`
    - Add tokens for the remaining literal values the components need, so no other file has one: gold accent rule 48 × 2 px, icon sizes 16, 20 and 32 px, CTA border 2 px, form field height 48 px, star outline 1.5 px, focus offset 2 px, card lift 2 px, nav underline offset 6 px, Tagline letter-spacing 0.08em, map aspect ratios (4:3 mobile, 16:9 tablet and desktop) and Service_Category header ratios (4:3 mobile, 16:9 tablet, 21:9 desktop)
    - _Requirements: 3.11, 13.1, 13.3, 13.4, 13.5, 13.12, 14.5, 17.4, 17.5, 26.1, 26.9, 26.31_
  - [x] 2.2 Create `src/styles/global.css` and load the fonts
    - Import `@fontsource-variable/cinzel`, `@fontsource-variable/inter`, `tokens.css` and `global.css` in `src/main.tsx`, so fonts are bundled
    - Base styles: Inter 400 body text at `--fs-body` and `--lh-body` on the off-white page background; h1 to h3 in Cinzel (600, h1 700) at `--lh-heading` and `--ls-heading`; `text-wrap: balance` on h1 and h2; `text-wrap: pretty` and `max-width: var(--measure)` on paragraphs; form controls at `--fs-body`; a `.visually-hidden` utility
    - Surface variables: `[data-tone="dark"]` and `[data-tone="light"]` set `--surface-text`, `--surface-muted` (off-white on dark, gray on light) and `--surface-accent` (`--color-gold` on dark, `--color-gold-dark` on light). The focus ring is `outline: var(--focus-width) solid var(--surface-accent)` with the focus offset and no transition, so gold on off-white always uses the darker shade
    - `html { scroll-padding-top: var(--header-height) }`, plus `scroll-padding-bottom: calc(var(--ctc-height) + var(--space-4))` below 768 px. Never set `scroll-behavior: smooth`. Declare every transition inside `@media (prefers-reduced-motion: no-preference)`
    - _Requirements: 1.3, 13.4, 13.6, 13.7, 13.11, 14.7, 15.5, 15.9, 26.2, 26.3, 26.4, 26.5, 26.17, 26.30_

- [x] 3. Build the shared UI building blocks in `src/components/ui/`
  - [x] 3.1 Implement `Container` and `PageSection`
    - `Container`: max width `--container-max`, centered, side padding `--gutter`. Every Page_Section, the Site_Header and the Footer use it, so all left edges align
    - `PageSection`: prop `tone` (`'dark'` = `--color-black`, `'light'` = `--color-offwhite`; charcoal is never a section background) and prop `align` (`'left'` by default; `'center'` only for the hero, closing CTA banners and the no-match block). It renders `<section data-tone>` with `--section-pad` top and bottom around a `Container`
    - Gray separator rule: a CSS adjacent-sibling rule gives a section a 1 px `--color-gray` full-width top border when the previous section has the same tone, so pages never place separators by hand
    - _Requirements: 13.12, 14.5, 26.9, 26.10, 26.11, 26.13, 26.14_
  - [x] 3.2 Implement `SectionHeading` and `PageHeading`
    - `SectionHeading`: an `h2` followed by the gold accent rule (48 × 2 px bar, `--space-4` above it, `--surface-accent` color), aligned with the heading and centered only in centered sections, with 16 px before the following content
    - `PageHeading`: `<h1 tabIndex={-1}>` for route focus management, with 24 px before the following content; h3 elements get 8 px
    - _Requirements: 15.2, 15.10, 26.2, 26.18, 26.30, 26.31_
  - [x] 3.3 Implement `CardGrid` and `Card`
    - `CardGrid`: column counts per breakpoint (1 on mobile and 2 on tablet by default; 2, 3 or 4 on desktop) through `grid-template-columns: repeat(var(--cols), minmax(0, 1fr))`, the same `--grid-gap` in both directions and `align-items: stretch`. A short last row keeps the full-row card width and aligns left. It is also used for the other column grids in the page tables (the 2/2/1 Service_Item grid, the 3/2/1 link grid, the 4/2/2 stats band)
    - `Card`: a `light` variant (off-white fill, for off-white sections) and a `dark` variant (charcoal fill, for black sections), both with a 1 px `--color-gray` border, `--radius-md` and `--card-pad`. It is a flex column whose last child sits at the bottom, with an optional top image slot at full card width and `--radius-md` top corners
    - Interactive style, used only by cards that are links or buttons: the border turns `--surface-accent`, plus `--shadow-card-hover` and the 2 px lift, within 150 ms. Non-interactive cards do not change on hover
    - _Requirements: 13.9, 14.2, 14.3, 14.4, 14.10, 26.6, 26.7, 26.8, 26.23, 26.31_
  - [x] 3.4 Implement `CtaLink` and `TextLink`
    - `CtaLink`: a router `Link` with `variant` `primary` (gold background, 2 px gold border, black Inter 600 label; hover gold-light background and border) or `secondary` (transparent, 2 px `--surface-accent` border and label; hover gold background with a black label), and `size` `md` or `lg` with one padding and font size per size (`--cta-md-*`, `--cta-lg-*`), `--radius-sm`, `--ls-cta` and a height of at least 44 px. Export the class names so the Quote_Form submit button and the Click_To_Call_Button reuse the Primary style
    - `TextLink`: an internal variant (router `Link`) and an external variant (`target="_blank"`, `rel="noopener noreferrer"`, visually hidden "(opens in a new tab)"), both in the surrounding text color with a 1 px underline at rest and 2 px on hover, never gold. Standalone links get a 44 px tap height
    - _Requirements: 13.2, 13.8, 13.9, 14.6, 26.12, 26.19, 26.21_
  - [x] 3.5 Implement the `Icon` registry, `Notice` and `LiveRegion`
    - `Icon`: a curated map of the lucide icons the site uses (UI icons such as `Menu`, `X`, `Phone`, `Mail`, `Clock`, `MapPin`, `CircleAlert`, `Image`, `Plus`, `Minus`, `Star`, `ChevronLeft`, `ChevronRight` and `Search`, plus the category and highlight icons). `IconName` is its key type, because importing lucide's full `icons` map would bundle every icon. Use one size token per context; decorative icons are `aria-hidden`, and meaningful icons get a text alternative
    - `Notice`: `--fs-small` Inter 400, no box or border, `--surface-muted` color
    - `LiveRegion`: always mounted, `role="status"` (polite); it repeats an identical message by clearing it and setting it again on the next animation frame
    - _Requirements: 2.5, 13.10, 13.13, 15.11, 26.27_
  - [x] 3.6 Implement `FilterButtons`, `StarRating` and `Breadcrumb`
    - `FilterButtons`: props `{ options: { id; label }[]; selected; onSelect; label }`; `role="group"` with `aria-label`; each option is a `<button aria-pressed>`. Shared filter style: transparent background, 1 px gray border, `--radius-sm`, body text color; hover border `--surface-accent`; selected option with gold background and black text, hover gold-light. Options wrap onto left-aligned rows with `--space-3` gaps and are at least 44 px tall. Selecting the selected option does nothing
    - `StarRating`: five 16 px lucide `Star` icons (`aria-hidden`), filled ones in `--surface-accent` and unfilled ones as a 1.5 px `--color-gray` outline with no fill, plus visually hidden "Rated N out of 5 stars"
    - `Breadcrumb`: `nav aria-label="Breadcrumb"` with an ordered list of `TextLink`s, separators hidden from assistive technologies, and the last item as non-link text with `aria-current="page"`
    - _Requirements: 8.5, 10.3, 10.6, 10.9, 13.7, 14.6, 20.5, 20.6, 20.10, 20.13, 20.16, 26.20, 26.21_

- [x] 4. Build `SmartImage` and the photo pipeline
  - [x] 4.1 Add the photo types, `shouldLoadImage` and the initial photo manifest
    - Add `PhotoId` and `Photo` (`id`, `width`, `height`, `sources`, `focal`) to `src/content/types.ts`
    - Add `shouldLoadImage(top, viewportHeight, margin)` (`top < viewportHeight + margin`, margin 1000 px) to `src/lib/layout.ts`
    - Create `src/assets/photos/photoManifest.ts` with one entry per slot in the design's Photo slots table: `home-hero` (roofing work), `category-{slug}` for each of the seven categories, about ten `project-…` slots covering at least five categories, and `about`. Every entry starts with empty `sources`, a nominal size for its ratio (3:2 for the hero and headers, 4:3 for projects, 4:5 for About) and `focal: '50% 50%'`, so it renders the placeholder until photos exist
    - _Requirements: 16.8, 16.14, 16.15_
  - [x] 4.2 Implement `SmartImage` with intentional placeholders
    - Props `{ photo, alt, priority?, fill?, sizes?, className? }`. The box takes its `aspect-ratio` from the manifest size. `fill` mode (hero and category headers) fills its slot with `object-fit: cover`, `object-position: photo.focal` and no radius; other images use `--radius-md`. `srcset` comes from `photo.sources`; `priority` sets `loading="eager" fetchpriority="high"`
    - Without `priority`, `src` is set by an initial `shouldLoadImage` check in `useLayoutEffect` or by an `IntersectionObserver` with `rootMargin: '0px 0px 1000px 0px'`, and the image loads at once when `IntersectionObserver` is missing
    - Placeholder for empty `sources` and for load errors, in the same box, never the browser's broken-image icon: a `--color-charcoal` block. In `fill` mode it shows no text and keeps `role="img"` with an `aria-label` of the alt text. Otherwise it shows a centered 32 px lucide `Image` icon in `--color-gray` with the alt text below in `--fs-small` `--color-offwhite`, or the icon alone for decorative images
    - _Requirements: 1.3, 15.6, 16.1, 16.8, 16.9, 16.10, 16.14, 16.15, 26.16, 26.23, 26.32_
  - [x] 4.3 Write `scripts/optimize-photos.mjs`
    - Use sharp and a `SLOTS` list (id, ratio) that matches the manifest. Read `assets-src/photos/{id}.{jpg,jpeg,png,webp}`, crop each master to its slot ratio, strip metadata, and export WebP at quality 78 in 640, 1280 and 1920 px widths, with every longest edge at most 1920 px and every file at most 400 KB (lower the quality for a file that is larger). Write the files as `src/assets/photos/{id}-{width}.webp`
    - Regenerate `photoManifest.ts` with the file imports and widths in `sources`, the largest file's width and height, and each `focal` value kept from the existing manifest. Slots without a raw file keep empty `sources` and their nominal size. Run the script once with no photos and confirm the manifest is unchanged
    - _Requirements: 16.2, 16.3, 16.8_
  - [x] 4.4 Write the photo sourcing list and `ATTRIBUTIONS.md`
    - `assets-src/photos/SOURCING.md`: one row per slot from the design's Photo slots table with the slot id, the file name to save (`{id}.jpg`), the ratio, the Unsplash/Pexels search keywords (roofing work for the hero; different roofing keywords for the Roofing & Exterior Construction header) and, for each project slot, its category and subject (Req 16.4). Then list the Req 26.22 photo checks and the manual steps: download the photo, save it under `assets-src/photos/`, run `npm run optimize-photos`, and add its attribution row
    - `ATTRIBUTIONS.md` at the repository root: a "Company artwork" section that lists the logo (`company-logo.png` and the files derived from it) as customer-supplied, and a stock photo table `File | Source page | Photographer | License | License URL` with the Unsplash (`https://unsplash.com/license`) and Pexels (`https://www.pexels.com/license/`) license URLs, with one row per bundled photo (none yet)
    - _Requirements: 16.2, 16.4, 16.5, 16.6, 16.7, 26.22_

- [x] 5. Create the logo assets
  - [x] 5.1 Write and run `scripts/crop-logo.mjs`
    - Source selection: prefer customer files in `brand/` when present (`brand/logo.svg` or a higher-resolution `brand/logo.png` for both logos; `brand/icon.svg` or `brand/icon.png`, the Brand_Icon, for the favicon). Otherwise read `company-logo.png`, which is opened read-only and stays byte-for-byte unchanged. Log which source was used
    - Processing: set pixels whose channels are all 24 or below to `#000000`, trim to the wordmark box (about 1151 × 477 px for `company-logo.png`), then write lossless PNGs:
      - `src/assets/brand/logo-full.png` (Footer Logo): the whole box padded with exact black by 4% of the box height at the top and bottom and 2% of its width at the left and right, about 1197 × 515 px
      - `src/assets/brand/logo-header.png` (compact Header_Logo): wordmark-box rows 0–419 ("D&T" with the roofline and "GO ELITE", without "ROOFING AND CONSTRUCTION"), trimmed again to its own wordmark pixels and padded the same way, so the Req 17.2 margins also hold for it
      - `public/favicon.png`: 512 × 512 px, box rows 0–317 ("D&T" with the roofline) scaled to fit and centered on exact black, or the Brand_Icon when supplied
    - The row numbers apply to `company-logo.png`. For customer artwork, find the split above the "ROOFING AND CONSTRUCTION" line from the row profile (the last gap of background rows above the bottom text line)
    - Write `src/assets/brand/logoSizes.ts` with the width and height of both PNGs for the `<img>` width and height attributes, and run the script so all outputs exist in the repository
    - _Requirements: 17.1, 17.2, 17.3, 17.6, 17.7, 17.13, 17.14_

- [x] 6. Define the content types and the Service_Catalog
  - [x] 6.1 Complete `src/content/types.ts` and write `src/content/uiText.ts`
    - Add the remaining types from the design's Data Models: `CATEGORY_NAMES`, the catalog input and derived types, `Project`, `Review`, `RatingSummary`, `RichText`, `FaqTopic`, `FaqItem`, `FaqGroup`, `ContactDetails` (with `locationLine` and no street address), `SocialLink`, `MapEmbedConfig`, `ServiceAreasContent`, `AboutContent`, `HomeContent`, `SiteContent`, `PageIntros`, `ClosingBanner` and `ClosingBanners`, the quote form types with `FIELD_LIMITS`, and the UI state types
    - `uiText.ts` holds the fixed product copy: nav labels and Route_Paths; page `h1` texts ("Our Services", "Our Projects", "Customer Reviews", "Service Areas", "Frequently Asked Questions", "About D&T Go Elite", "Get a Free Quote"); section headings ("Our Services", "Why Choose D&T Go Elite", "How It Works", "What DFW Homeowners Say", "What We Do", "Explore Other Services", "Our Story", "Our Values"); CTA and link labels ("Get a Free Quote", "View Our Services", "Read All Reviews", "Leave a Review", "Open in Google Maps", "Request a Quote for {name}", "Describe Your Project", "Explore", "See all service areas"); stat labels; form labels and the "Other / Not sure" option; the `ERRORS` constants; the confirmation template; "Skip to main content"; accessible-name templates; and result-count strings. None of it uses "elite" outside the company name
    - _Requirements: 2.1, 11.3, 11.4, 11.9, 11.10, 11.11, 11.12, 11.13, 11.14, 11.18, 16.11, 27.6_
  - [x] 6.2 Implement `src/lib/slug.ts` and `src/lib/catalog.ts`
    - `slugify` and `isValidSlug` as in the design's key algorithms
    - `buildCatalog` derives the slugs, keeps the input order (including identical item names in different categories) and throws at module load on an empty or duplicate slug. `getCategoryBySlug` is an exact, case-sensitive lookup that returns `undefined` without throwing. Add `getServiceItem`
    - _Requirements: 2.3, 2.4, 2.7, 2.8, 2.9, 2.10, 2.11_
  - [x] 6.3 Write `src/content/serviceCatalog.ts` from Appendix A
    - Transcribe requirements.md Appendix A verbatim: the seven categories in Glossary order with 16, 17, 9, 10, 7, 11 and 8 items, in the supplied order, with exact spelling, capitalization and `&`. "Backsplash Installation" appears in both Interior Improvements and Flooring & Tile, and "Pressure Washing" and "Pressure Washing & Surface Cleaning" stay separate
    - Each category gets a summary of one to two sentences and at most 250 characters that names that trade's team, crew or specialists exactly once (the words "team", "crew" and "specialists" appear once in total; a carpentry or repair crew for General Construction & Repairs), shares no six-word sequence with another summary and contains no "elite"; a registry icon; and its `category-{slug}` header photo
    - Each item gets a placeholder description of one to three sentences and at most 400 characters
    - Export the result of `buildCatalog`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 16.11, 27.3, 27.4, 27.6, 27.9_

- [x] 7. Write the Placeholder_Content in the Brand_Voice
  - [x] 7.1 Write `site.ts`, `contact.ts` and `social.ts`
    - `site.ts`: the Tagline placeholder proposal "Elite teams. Elite results." (shown in the Footer only); the one-sentence Footer description (at most 160 characters, ending with a period, mentioning the Dallas–Fort Worth area, no "elite"); the "Concept demo" notice; the sample-review notice; the `https://` "Leave a Review" placeholder URL; and the Not_Found heading "Page not found" with one sentence
    - `contact.ts`: phone `(214) 555-0123`, email `info@dtgoelite.example`, hours `Mon–Fri 7:00 AM – 6:00 PM, Sat 8:00 AM – 2:00 PM`, the location line "Based in Dallas, TX, serving the greater Dallas–Fort Worth area" (no street address), and the Contact map config centered on Dallas from the design (embed URL `https://maps.google.com/maps?q=Dallas%2C%20TX&z=11&output=embed`, the open URL, title "Map of Dallas, TX, home base of D&T Go Elite", label "Dallas, TX")
    - `social.ts`: four `https://` placeholder URLs in the order Facebook, Instagram, Google Business Profile, Nextdoor
    - Flag every entry `placeholder: true`
    - _Requirements: 1.6, 5.7, 11.1, 12.2, 16.11, 16.12, 16.13, 20.7, 20.15, 22.1, 22.3, 22.5, 23.3, 27.1, 27.2, 27.4, 27.14_
  - [x] 7.2 Write `home.ts`, `about.ts` and `pages.ts`
    - `home.ts` hero: a headline that contains "D&T Go Elite" and leads with roofing (for example "D&T Go Elite: roofing crews built for DFW weather"); a supporting sentence of at most 160 characters about roofing and storm repairs that says specialist crews handle the other trades; the `home-hero` roofing photo and its alt text; no Tagline
    - `home.ts` sections: four "Why Choose D&T Go Elite" highlights (icon, title, one sentence), exactly one of them with "team", "crew" or "specialists" plus "each trade", "every trade" or "trade-specific", and the other three without specialist, specialized, team or crew; four How It Works steps in order (request a quote, on-site estimate, project scheduling and work, final walkthrough), with the third step saying the project is matched with the specialist crew for that trade; the closing banner heading and sentence
    - `about.ts`: the page intro; two to three story paragraphs of two to five sentences that name "D&T Go Elite" and its Dallas, Texas base, with one sentence saying each trade has its own trained specialist team and exactly one sentence about an elite standard of workmanship; the `about` photo and its alt text; three to six values (titles of at most five words, one-sentence descriptions, one or two of them about specialists, trade, craft or workmanship); the four stats (years in business, projects completed, satisfaction percentage, service radius in miles); the service area heading and text with a `{radius}` token
    - `pages.ts`: one-line intros for Services, Projects, Reviews, FAQ and Contact (the Service Areas and About intros come from their own modules), and the closing banners for Services, Projects, Reviews, FAQ (heading "Still have questions?") and About
    - _Requirements: 6.1, 6.4, 6.5, 6.8, 9.1, 9.2, 9.3, 9.4, 16.11, 16.13, 19.14, 27.2, 27.3, 27.5, 27.6, 27.7, 27.8, 27.10, 27.11, 27.12, 27.14_
  - [x] 7.3 Write `projects.ts` and `reviews.ts`
    - `projects.ts`: one project per `project-…` photo slot in the manifest (9–12 projects over at least five categories, with at least one category that has only one or two projects so a short row exists for the Visual_Review). Each has a title of 1–60 characters, a category name, a description of one to two sentences and at most 200 characters, a photo id, and alt text of at most 150 characters that describes the subject
    - `reviews.ts`: at least eight reviews over at least four categories, with at least one category that has only one or two reviews; names like "Maria S."; cities taken from the 15 required Service_Area_Cities; whole-number ratings from 1 to 5; one to four sentences of at most 400 characters; exactly three `featured: true`; at most one review uses "elite", and that review is not featured
    - _Requirements: 6.6, 10.1, 10.2, 16.4, 16.11, 16.13, 20.2, 20.3, 26.28, 27.3, 27.12, 27.13_
  - [x] 7.4 Write `faq.ts` and `serviceAreas.ts`
    - `faq.ts`: three to four groups (for example "Estimates and scheduling", "Roofing and storm damage", "During your project", "Payment and service area") with 10–30 items in total; unique questions of 1–120 characters (aim for 80 or fewer) ending with "?"; answers of one to four sentences and at most 600 characters as `RichText`; a `topic` per item, covering every Req 19.4 topic. The payment answer names cash, check and card with no provider, fee or rate, and no item mentions financing, loans, payment plans, monthly payments or installments. The service-area answer links to `/service-areas`
    - `serviceAreas.ts`: the intro (one to three sentences: based in Dallas, Texas, serving the greater Dallas–Fort Worth area), 15–40 unique, trimmed city names including the 15 required cities, the note about nearby cities, and the DFW map config (`q=Dallas-Fort%20Worth%2C%20TX&z=9&output=embed`, a title containing "Dallas–Fort Worth", the label and the open URL)
    - _Requirements: 16.11, 16.13, 18.1, 18.2, 18.4, 18.5, 19.2, 19.3, 19.4, 19.5, 19.6, 22.2, 22.3, 22.5, 27.12, 27.14_
  - [x] 7.5 Create `src/content/index.ts`
    - The single entry point that re-exports the catalog, projects, reviews, FAQ groups, service areas, about, home, contact, social, site, page intros, closing banners and `uiText`. Pages and components import content only from here
    - _Requirements: 16.11, 16.12, 22.3, 23.3_

- [x] 8. Build the app shell
  - [x] 8.1 Implement the shell logic in `src/lib/`
    - `nav.ts` `getActiveNav`; `menuState.ts` `menuReducer` (TOGGLE, CLOSE, ROUTE_CHANGE, VIEWPORT_CHANGE; starts closed); `viewportCategory`, `isClickToCallVisible` and `computeFocusScrollDelta` in `layout.ts`; `urls.ts` `isHttpsUrl`, `toTelHref` and `visibleSocialLinks`; `text.ts` `formatDocumentTitle`, `formatCopyright` and `formatResultCount`, all as specified in the design
    - _Requirements: 3.6, 3.7, 3.9, 4.2, 4.3, 4.4, 4.7, 4.8, 4.9, 5.9, 11.2, 12.7, 15.5, 15.11, 22.10, 23.7, 23.8, 24.1, 24.2, 24.3, 24.7, 24.8_
  - [x] 8.2 Implement the shell hooks and the layout state
    - `src/hooks/`: `useViewportCategory` (two `matchMedia` queries, defaulting to desktop), `usePageTitle(name)` (sets `document.title` to `formatDocumentTitle(name)`) and `useRouteChangeEffects` (on each location change after the first render, focus `main h1` with `preventScroll` and dispatch `ROUTE_CHANGE`)
    - `src/app/layoutContext.tsx`: the menu state (`useReducer` over `menuReducer`) and the viewer-open flag as contexts that `RootLayout` provides
    - _Requirements: 4.7, 4.8, 4.9, 5.9, 14.8, 15.10, 24.7, 24.10_
  - [x] 8.3 Implement `SkipLink`, `SiteHeader`, `MenuToggle` and the nav panel
    - `SkipLink`: the first focusable element, visually hidden until focused; it moves focus to `main#main`
    - `SiteHeader` (`data-tone="dark"`): opaque black, `position: sticky; top: 0`, height `--header-height`, a 1 px `--color-gray` bottom border, and a `Container` row with vertically centered items. The Header_Logo link sits at the left: `logo-header.png` at `--logo-header-h` with width and height from `logoSizes.ts`, `alt=""`, and the link label `aria-label="D&T Go Elite Roofing and Construction – Home"`
    - One `<nav aria-label="Main">` holds the eight links in order, in off-white Inter 600 with a gold hover; the active link from `getActiveNav` is gold with a 2 px underline and `aria-current`. The md Primary "Get a Free Quote" CTA sits in the header row on tablet and desktop. The desktop row never wraps from 1024 to 1920 px (`--nav-link-pad-x`, `--header-gap`)
    - Compact viewports: the `MenuToggle` sits at the right (44 × 44 px, `aria-expanded`, `aria-controls="main-nav-panel"`, "Open navigation menu" or "Close navigation menu", lucide `Menu` or `X`). The panel is a full-width black panel under the header with links stacked at `--fs-h3` between 1 px gray dividers and a full-width lg Primary CTA at the bottom. It is `display: none` while closed and `max-height: calc(100dvh - var(--header-height)); overflow-y: auto` while open. Escape closes it and focuses the toggle, any link click dispatches `CLOSE`, and viewport changes dispatch `VIEWPORT_CHANGE`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.10, 4.11, 4.12, 15.3, 15.4, 17.1, 17.4, 17.7, 17.9, 17.10, 17.11, 17.12, 17.14, 26.13, 26.21_
  - [x] 8.4 Implement `Footer` and `SocialLinks`
    - `SocialLinks`: renders `visibleSocialLinks(social)` and returns `null` when the list is empty. Each item is a 44 × 44 px link with `target="_blank"`, `rel="noopener noreferrer"` and `aria-label="D&T Go Elite on {platform} (opens in a new tab)"`, showing the bundled `simple-icons` path (`aria-hidden`) in `--surface-accent`
    - `Footer` (`data-tone="dark"`): black with a 1 px gray top border and a `Container` grid (desktop: brand at 2fr, then pages, services, and contact with social at 1fr each; tablet: 2 × 2; mobile: one column with no horizontal scrolling at 320 px)
    - Brand column: the full Logo (`logo-full.png` at `--logo-footer-h`, size from `logoSizes.ts`, `alt="D&T Go Elite Roofing and Construction"`), the full company name, the one-sentence description and, below it, the Tagline as a `<p>` (Inter 600, `--fs-small`, uppercase, Tagline letter-spacing, off-white). This is the only place the Tagline appears
    - Link and contact columns: `nav aria-label="Footer pages"` with the eight page links and `nav aria-label="Footer services"` with the seven category links in catalog order; the contact column with the phone `tel:` link, email `mailto:` link, hours, location line and `SocialLinks`. Column labels are styled text, not headings. Links are off-white with a gold hover and a 44 px minimum size. A bottom bar after a 1 px gray divider shows `formatCopyright(new Date().getFullYear())` and the Concept demo `Notice`
    - Below 768 px, reserve the Click_To_Call_Button space (`calc(var(--ctc-height) + var(--space-4) * 2)`) as extra bottom padding inside the Footer. The design puts this padding on `body`; keeping it inside the black Footer avoids a blank strip below the Footer (Req 12.1)
    - _Requirements: 1.6, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 14.6, 16.12, 17.5, 17.6, 17.7, 17.8, 17.11, 17.12, 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8, 24.5, 24.6, 26.13, 26.27, 27.1, 27.2_
  - [x] 8.5 Implement `ClickToCallButton`
    - A `tel:` link from `toTelHref(contact.phone)` (`tel:+12145550123`) in the Primary style at the md size with `--radius-pill`, a black "Call" label and a 20 px lucide `Phone` icon (`aria-hidden`), `aria-label="Call D&T Go Elite at (214) 555-0123"` and height `--ctc-height`. It is fixed 16 px from the bottom and right edges with `--shadow-float`, above other content
    - It is hidden by CSS at 768 px and wider, is not rendered while the Mobile_Menu or the Project_Viewer is open (`isClickToCallVisible` with the layout contexts), and opens in the current tab
    - _Requirements: 16.12, 24.1, 24.2, 24.3, 24.4, 24.7, 24.9, 24.10_
  - [x] 8.6 Wire the router and `RootLayout`
    - `src/app/router.tsx`: `createBrowserRouter` with `basename: routerBasename(import.meta.env.BASE_URL)`, `caseSensitive: true` on every route, and the routes from the design's Routes table. Create `src/pages/` with a stub per page (its `PageHeading` text and `usePageTitle`) for the page tasks to fill in. The `ServiceCategoryPage` stub already renders `NotFoundPage` in place when `getCategoryBySlug` misses, and `*` renders `NotFoundPage`
    - `RootLayout`: `SkipLink`, `SiteHeader`, `<main id="main" tabIndex={-1}>` with the `Outlet`, `Footer`, `ClickToCallButton`, `<ScrollRestoration />`, `RouteChangeEffects`, the layout context providers, and a document `focusin` listener that scrolls by `computeFocusScrollDelta` when the Site_Header or the Click_To_Call_Button covers the focused element. A `min-height: 100dvh` flex column keeps the Footer at the bottom of short pages
    - Render the `RouterProvider` from `src/main.tsx`
    - _Requirements: 1.1, 1.8, 1.9, 3.1, 4.9, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.8, 5.10, 5.11, 12.1, 15.1, 15.3, 15.5, 15.10, 24.8, 25.11, 25.12_

- [x] 9. Build the Home and Not Found pages
  - [x] 9.1 Implement `ServiceCategoryCard` and `ReviewCard`
    - `ServiceCategoryCard`: an interactive light `Card` that is one router `Link` to `/services/{slug}`, with no nested links. It contains the 32 px registry icon in `--surface-accent`, the `h3` name, the summary, and an "Explore" `<span>` styled like a text link and pinned to the bottom
    - `ReviewCard`: a non-interactive `Card` (light on off-white sections, dark on black sections) with the reviewer name in Inter 600 (not a heading, so the card fits under an `h2` or directly under the `h1`), the city, the category name, `StarRating` and the full text with no clamping
    - _Requirements: 6.2, 6.3, 6.6, 15.2, 20.4, 20.5, 20.6, 26.6, 26.7_
  - [x] 9.2 Build `HomePage` per the Home table
    - 1 Hero (`home-hero` roofing photo as a `fill` and `priority` `SmartImage` under `--color-overlay`, `data-tone="dark"`, centered): `PageHeading` with the roofing headline containing "D&T Go Elite" (`max-width: 20ch`), the `--fs-body-lg` sentence, Primary "Get a Free Quote" (`/contact`) and Secondary "View Our Services" (`/services`). The CTAs sit side by side at equal height on tablet and desktop and stack at equal width on mobile, one spacing step apart. A min-height keeps the headline and both CTAs in the first viewport at 1280 × 720 and 375 × 667. No Tagline
    - 2 Services (light, left): `SectionHeading` "Our Services" and the seven `ServiceCategoryCard`s in catalog order (4/2/1)
    - 3 Why Choose D&T Go Elite (dark, left): `SectionHeading` and four dark highlight Cards with an icon, an `h3` title and a sentence (4/2/1)
    - 4 How It Works (light, left): `SectionHeading` and an `<ol>` of the four steps with Inter 600 numerals at `--fs-h2` in `--color-black`, `h3` titles and one sentence each
    - 5 Review_Preview (dark, left): `SectionHeading` "What DFW Homeowners Say", the sample-review `Notice`, the three featured `ReviewCard`s (dark, 3/2/1) and the "Read All Reviews" `TextLink` to `/reviews`
    - 6 Closing CTA banner (dark, centered, gray separator above it from the sibling rule): the heading, one sentence and Primary "Get a Free Quote"
    - `usePageTitle('Home')`
    - _Requirements: 5.9, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10, 6.11, 13.12, 16.14, 20.7, 26.8, 26.10, 26.11, 26.12, 26.14, 26.15, 26.16, 26.19, 26.32, 27.2_
  - [x] 9.3 Build `NotFoundPage` per the Not Found table
    - One dark, left-aligned section: `PageHeading` "Page not found", one sentence, and `TextLink`s to Home (`/`) and Services (`/services`). Call `usePageTitle('Page Not Found')`; no nav link is active
    - _Requirements: 1.9, 3.9, 5.5, 5.6, 5.7, 5.9, 5.11_

- [x] 10. Checkpoint: shell, Home and Not Found pages
  - Run `npm run build`, open `npm run preview`, and check the pages in the browser; ask the user if questions arise.

- [x] 11. Build the Services and Service Category pages
  - [x] 11.1 Implement `src/lib/serviceFilter.ts`
    - `SERVICE_FILTER_MAX`, `clampLength`, `normalizeQuery` and `filterCatalog` (trimmed, case-insensitive, literal substring match; categories without matches are dropped; catalog order is kept; an item listed in two categories is checked in each)
    - _Requirements: 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.11, 11.5_
  - [x] 11.2 Implement `ServiceFilter` and build `ServicesPage` per the Services table
    - `ServiceFilter`: `<input type="search">` with the visible label "Search services", `maxLength={100}` plus `clampLength`, and a 44 px clear button (`aria-label="Clear search"`, lucide `X`) shown while the value is non-empty, which empties the input and focuses it. The result count or the no-match message is announced through `LiveRegion`, debounced by a new `src/hooks/useDebouncedValue.ts` (400 ms)
    - 1 Page header (dark, left): `PageHeading` "Our Services", the intro from `pages.ts`, `ServiceFilter`
    - 2 Category sections (light, left): for each filtered category, a `SectionHeading` with the name, the summary, the item list (2 columns on tablet and desktop, 1 on mobile) and a "View {category}" `TextLink` to `/services/{slug}`
    - 3 No-match block, replacing section 2 when nothing matches (light, centered): an icon, the message and Primary "Describe Your Project" to `/contact`
    - 4 Closing CTA banner (dark, centered): the banner from `pages.ts` and Primary "Get a Free Quote"
    - `usePageTitle('Services')`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.7, 7.8, 7.9, 7.10, 7.11, 14.7, 14.8, 15.11, 15.12, 26.12, 26.14, 26.26_
  - [x] 11.3 Build `ServiceCategoryPage` per the Service Category table
    - Keyed by slug (`key={slug}`) so no state carries over between categories; an unknown slug renders `NotFoundPage`; `usePageTitle(category.name)`
    - 1 Title section (dark, left): `Breadcrumb` Home › Services › {name}, `PageHeading` with the name, the summary, and Primary "Request a Quote for {name}" to `/contact?service={slug}`
    - 2 Header image: a full-width `fill` `SmartImage` of the `category-{slug}` photo with no radius, overlay or text, at the 21:9, 16:9 and 4:3 ratio tokens, with alt text that contains the category name
    - 3 What We Do (light, left): `SectionHeading` "What We Do" and non-interactive light Service_Item Cards with an `h3` name and the description (2/2/1)
    - 4 Explore Other Services (dark, left): `SectionHeading` "Explore Other Services" and `TextLink`s to the six other categories in catalog order (3/2/1)
    - _Requirements: 5.1, 5.6, 5.9, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 26.10, 26.16, 26.23_

- [x] 12. Build the Projects page and the Project_Viewer
  - [x] 12.1 Implement `src/lib/categoryFilter.ts` and `src/lib/viewerNav.ts`
    - `ALL`, `FilterOption`, `buildFilterOptions` ("All" first, then each category with at least one item, in Glossary order) and the stable `applyCategoryFilter`; `nextIndex` and `prevIndex` (wrap around for n ≥ 2, unchanged for n = 1)
    - _Requirements: 10.3, 10.4, 10.5, 10.7, 20.10, 20.12, 20.14, 21.4, 21.5, 21.7, 21.15_
  - [x] 12.2 Implement `ProjectCard`
    - An interactive light `Card` rendered as a `<button>` with the 4:3 `SmartImage` on top, the title as a styled `<span>` (headings cannot sit inside a button), the category and the description; `aria-label="{title}, view larger photo"`. It registers its DOM node in a ref map keyed by project id for focus return
    - _Requirements: 10.2, 15.4, 21.1, 26.6, 26.7, 26.23_
  - [x] 12.3 Implement `ProjectViewer`
    - A portal into `document.body` with `role="dialog"`, `aria-modal="true"` and `aria-labelledby` pointing to its `h2` title. A `--color-overlay` backdrop holds a centered dark charcoal panel (`--radius-md`) with the photo (`object-fit: contain`, at most `calc(100vw - 32px)` wide and `60dvh` tall), the title, category and description, 44 px round "Previous project" and "Next project" buttons (disabled, in the gray disabled style, when only one project is shown) and a "Close project viewer" button at the top right. The panel scrolls inside itself when taller than the viewport and keeps the close button visible
    - Opening stores the opener id and `scrollY`, locks scrolling with a new `src/hooks/useScrollLock.ts`, sets `inert` on `#root`, focuses the close button and sets the viewer-open flag. Escape, the close button and a backdrop click close it. ArrowRight and ArrowLeft use `nextIndex` and `prevIndex`. Tab and Shift+Tab wrap through a new `src/hooks/useFocusTrap.ts`. Each move announces "Showing {title}" once through `LiveRegion`
    - Closing, or unmounting on a route change, removes `inert`, unlocks scrolling, restores the saved scroll position and focuses the opener card. State stays in the component, so browser history is unchanged. The fade runs only under `prefers-reduced-motion: no-preference`
    - _Requirements: 21.2, 21.3, 21.4, 21.5, 21.6, 21.8, 21.9, 21.10, 21.11, 21.12, 21.13, 21.14, 21.15, 21.16, 24.7, 26.17, 26.23, 26.24_
  - [x] 12.4 Build `ProjectsPage` per the Projects table
    - 1 Page header (dark, left): `PageHeading` "Our Projects" and the intro from `pages.ts`
    - 2 Grid (light, left): `FilterButtons` (All selected on every mount), the `ProjectCard`s in a 3/2/1 `CardGrid`, a visually hidden `LiveRegion` with the result count, and the `ProjectViewer` over the currently filtered set
    - 3 Closing CTA banner (dark, centered): the banner from `pages.ts` and Primary "Get a Free Quote"
    - `usePageTitle('Projects')`
    - _Requirements: 10.1, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 14.8, 14.10, 15.11, 21.1, 26.8, 26.12, 26.14_

- [x] 13. Build the Reviews page
  - [x] 13.1 Implement `src/lib/ratings.ts` and `RatingSummary`
    - `roundHalfUpTenths` and `summarizeRatings` with integer arithmetic as in the design ("4.3", "Based on 1 review" or "Based on N reviews")
    - `RatingSummary`: the average in Inter 600 at `--fs-h2` in off-white, "out of 5" and the count at `--fs-body`, five stars for the rounded average inside an `aria-hidden` wrapper (the text already states the value), and a `LiveRegion` that announces the new average and count after filter changes
    - _Requirements: 20.8, 20.9, 20.17, 26.3_
  - [x] 13.2 Build `ReviewsPage` per the Reviews table
    - 1 Page header (dark, left): `PageHeading` "Customer Reviews", the intro from `pages.ts`, the sample-review `Notice` above the `RatingSummary`, and the external "Leave a Review" `TextLink` to `leaveReviewUrl`
    - 2 Grid (light, left): `FilterButtons` (All selected on every mount; focus stays on the chosen option) and light `ReviewCard`s in Content_Module order in a 3/2/1 `CardGrid`. The `RatingSummary` reflects only the displayed reviews
    - 3 Closing CTA banner (dark, centered): the banner from `pages.ts` and Primary "Get a Free Quote"
    - `usePageTitle('Reviews')`
    - _Requirements: 14.8, 14.10, 15.11, 20.1, 20.4, 20.7, 20.10, 20.11, 20.12, 20.13, 20.14, 20.15, 20.16, 20.17, 26.8, 26.12, 26.14, 26.27_

- [x] 14. Build the Service Areas, FAQ and About pages
  - [x] 14.1 Implement `src/lib/cities.ts` and `MapEmbed`
    - `sortCities`: case-insensitive ascending order by code-unit comparison of the lowercased names
    - `MapEmbed`: a container with `--radius-md`, a 1 px gray border, a charcoal background and the map ratio tokens. It shows the `label` text instead of an `iframe` when `isHttpsUrl(embedUrl)` is false or `navigator.onLine === false`; otherwise it renders the `iframe` after the first mount with `loading="lazy"`, `title` and `referrerPolicy="no-referrer-when-downgrade"`. It always shows the external "Open in Google Maps" `TextLink` below
    - _Requirements: 18.3, 18.6, 18.7, 22.3, 22.4, 22.6, 22.7, 22.8, 22.9, 22.10, 22.11, 26.23_
  - [x] 14.2 Build `ServiceAreasPage` per the Service Areas table
    - 1 Page header (dark, left): `PageHeading` "Service Areas" and the intro from `serviceAreas.ts`
    - 2 Cities and map (light, left): on desktop, two columns with the `<ul>` of `sortCities(cities)` in 3 columns on the left and the DFW `MapEmbed` on the right; stacked on tablet and mobile. Then the note and Primary "Get a Free Quote" to `/contact` with no query
    - `usePageTitle('Service Areas')`
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 22.2, 22.5, 26.12_
  - [x] 14.3 Implement `faqState` and `FaqAccordion`, and build `FaqPage` per the FAQ table
    - `src/lib/faqState.ts`: `initialFaqState` (empty set) and `toggleFaq`
    - `FaqAccordion` for one group: a `SectionHeading` with the group title, then each item as `<h3><button id aria-expanded aria-controls>` with the full question and a 20 px lucide `Plus` or `Minus` icon in `--surface-accent` (`aria-hidden`), and an answer `<div role="region" aria-labelledby hidden>` that renders `RichText` with router links. Items have 1 px gray dividers and `--space-4` answer padding. `useReducer` state resets on mount and is applied synchronously, with a fade only under `prefers-reduced-motion: no-preference`; focus stays on the button
    - 1 Page header (dark, left): `PageHeading` "Frequently Asked Questions" and the one-line intro. 2 Accordion groups (light, left): one `FaqAccordion` per group. 3 Closing CTA banner (dark, centered): "Still have questions?", one sentence and Primary "Get a Free Quote"
    - `usePageTitle('FAQ')`
    - _Requirements: 15.9, 19.1, 19.2, 19.6, 19.7, 19.8, 19.9, 19.10, 19.11, 19.12, 19.13, 19.14, 19.15, 19.16, 26.2, 26.12, 26.14_
  - [x] 14.4 Build `AboutPage` per the About table
    - 1 Page header (dark, left): `PageHeading` "About D&T Go Elite" and the intro from `about.ts`
    - 2 Story (light, left): `SectionHeading` "Our Story" and the paragraphs (72ch) on the left, with the 4:5 About `SmartImage` (`--radius-md`) on the right on desktop; stacked on tablet and mobile
    - 3 Stats band (dark, left): four figures in Inter 600 at `--fs-h2` in off-white with Inter labels (4/2/2)
    - 4 Values (light, left): `SectionHeading` "Our Values" and three to six non-interactive light Cards with an `h3` title and one sentence
    - 5 Service area (dark, left): `SectionHeading` with the service area heading, one sentence with `{radius}` filled from `stats.serviceRadiusMiles`, and the "See all service areas" `TextLink` to `/service-areas`
    - 6 Closing CTA banner (dark, centered, gray separator above it from the sibling rule): the banner from `pages.ts` and Primary "Get a Free Quote"
    - `usePageTitle('About')`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 26.10, 26.11, 26.12, 26.14, 26.23, 27.10, 27.11_

- [x] 15. Build the Contact page and the Quote_Form
  - [x] 15.1 Implement `src/lib/quoteForm.ts`
    - `INITIAL_QUOTE_VALUES`, `isValidEmail`, `phoneDigits`, `validateField`, `validateQuoteForm`, `isFormValid`, `firstInvalidField` (order: full name, email, phone, service, project details) and `parseServiceParam`, as in the design. A whitespace-only phone counts as empty. Messages come from `ERRORS`
    - _Requirements: 11.6, 11.7, 11.9, 11.10, 11.11, 11.12, 11.13, 11.14, 11.15, 11.21, 11.22_
  - [x] 15.2 Implement `QuoteForm`
    - A controlled `useReducer` form with `noValidate`, no `action` and no `fetch`. Fields in order: full name*, email*, phone, Service_Category* `<select>` (seven categories plus "Other / Not sure", empty at first, preselected from `parseServiceParam(searchParams.get('service'), slugs)`), project details* `<textarea>`, and preferred contact method radios (email by default). Every field has a visible label; required fields show "*" plus screen-reader "required". `maxLength` plus `clampLength` enforce `FIELD_LIMITS`
    - Submitting (button or Enter) validates every field. When invalid: show all errors, focus the first invalid field and keep the values. When valid: show the Confirmation_Message (thanks by trimmed name, reply within one business day) inside the always-present `role="status"` region, focus it, reset the values and clear the errors
    - A field that shows an error is re-validated on each change; changing the contact method re-validates the phone field when it shows an error
    - Errors: `<p id="{field}-error">` with a 16 px `CircleAlert` and the text in `--color-error` at `--fs-small` directly below the field, linked by `aria-describedby`, with `aria-invalid="true"` only while shown. The invalid border is 2 px `--color-error` with the padding reduced by 1 px, so the field keeps its size
    - Styling: 48 px off-white fields with a 1 px gray border, `--radius-sm` and the gold-dark focus ring; name/email and phone/category in two columns on desktop and one column on mobile; a Primary-style submit button
    - _Requirements: 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.15, 11.16, 11.17, 11.18, 11.19, 11.20, 14.6, 14.7, 14.8, 14.9, 15.7, 15.8, 15.12, 26.25_
  - [x] 15.3 Build `ContactPage` per the Contact table
    - 1 Page header (dark, left): `PageHeading` "Get a Free Quote" and the intro from `pages.ts`
    - 2 Form and details (light, left): on desktop, `QuoteForm` (2/3 width) on the left and the contact details panel (1/3) on the right with the location line "Based in Dallas, TX, serving the greater Dallas–Fort Worth area" (no street address), the phone `tel:` link, the email `mailto:` link, the hours (lucide icons at one size), `SocialLinks` (dark gold on off-white) and, under the details, the `MapEmbed` centered on Dallas, TX. On tablet and mobile they stack in the order form, details, map. The submit button is this section's only Primary
    - `usePageTitle('Contact')`
    - _Requirements: 11.1, 11.2, 11.23, 16.12, 22.1, 22.5, 23.1, 23.2, 23.4, 23.5, 23.6, 26.12_

- [x] 16. Checkpoint: all pages built
  - Run `npm run build`, open `npm run preview`, and check the pages in the browser; ask the user if questions arise.

- [x] 17. Set up GitHub Pages deployment and the README
  - [x] 17.1 Write `.github/workflows/deploy.yml` as in the design
    - "Deploy to GitHub Pages" runs on `push` to `main` (the default branch) and on `workflow_dispatch`, with permissions `contents: read`, `pages: write` and `id-token: write`, and `concurrency: { group: pages, cancel-in-progress: false }`
    - `build` job, skipped unless `github.ref` is the default branch: `actions/checkout@v7`, `actions/setup-node@v7` (Node 22, npm cache), `npm ci`, `actions/configure-pages@v6` (id `pages`), a "Compute BASE_PATH" step that writes `BASE_PATH=${PAGES_BASE_PATH}/` to `$GITHUB_ENV` with `base_path` passed through `env`, `npm run build`, `test -f dist/index.html && test -f dist/404.html`, and `actions/upload-pages-artifact@v5` with `path: dist`
    - `deploy` job: `needs: build`, the `github-pages` environment with the page URL, and `actions/deploy-pages@v5`. Use the major tags from the design; if one of them does not exist when this task runs, use the latest existing major of that action
    - _Requirements: 25.1, 25.2, 25.3, 25.4, 25.5, 25.6, 25.8, 25.14_
  - [x] 17.2 Write `README.md`
    - Prerequisites (Node 22), `npm install`, `npm run dev` (prints the local URL that shows the Home_Page), `npm run build` and `npm run preview`
    - Asset scripts: `npm run crop-logo` (prefers customer files in `brand/` and leaves `company-logo.png` unchanged) and the manual photo steps (`assets-src/photos/SOURCING.md`, `npm run optimize-photos`, one row per photo in `ATTRIBUTIONS.md`)
    - Replacing placeholder content in `src/content/` (entries flagged `placeholder: true`); stock photos and sample reviews must be replaced before production
    - GitHub Pages deployment: set Settings → Pages → Source to "GitHub Actions"; how the Pages_Pipeline sets `BASE_PATH` for a project site (`/<repository>/`) and for a user, organization or custom-domain site (`/`); update `on.push.branches` if the default branch is not `main`; manual runs through `workflow_dispatch`; where the published URL appears; how to find failed runs in the Actions tab; and the `404.html` deep-link mechanism
    - _Requirements: 1.4, 1.5, 1.8, 16.5, 25.13_

- [x] 18. Perform the Visual_Review and fix what it finds
  - [x] 18.1 Check every page and UI state at 375, 768, 1280 and 1920 px
    - Run `npm run build && npm run preview`, open the preview URL, and use the browser's responsive mode at each width in turn
    - At each width, go through every page (Home, Services, all seven Service_Category_Pages, Projects, Reviews, Service Areas, FAQ, About, Contact and the Not_Found_Page) and these states: open Mobile_Menu (375 and 768 only), open Project_Viewer, Quote_Form with errors, Confirmation_Message, Services no-match, one FAQ item expanded, and Projects and Reviews with a filter that leaves a short last row
    - Look for: no sideways scrolling; equal card heights and gaps; one shared left edge; a Site_Header height equal to `--header-height`; no h1 or h2 that ends with a single word on its own line; at most one Primary CTA per section and the Secondary only in the hero; placeholders that look intentional while photos are missing
    - Fix each issue in the tokens, CSS Modules or content. Use no scripts and no checklist file
    - _Requirements: 3.11, 14.1, 26.7, 26.12, 26.13, 26.28, 26.29, 26.30, 26.31_
  - [x] 18.2 Check the header row at 1024 px, the hero contrast, the photos and the copy
    - At 1024 px the Site_Header row does not wrap and no two header items overlap
    - The hero text meets 4.5:1 against the lightest composited pixel of the darkened photo, or against the placeholder while the photo is missing
    - Each bundled photo passes the Req 26.22 checks: full color, no watermark, no text or third-party logo, and no visible blur at its largest size
    - The copy reads in the Brand_Voice: specialist crews per trade, at most one "elite" per page outside the company name and the Tagline, the Tagline only in the Footer, no "general contractor" or "handyman", no superlatives, no exclamation marks
    - Fix each issue in the tokens, CSS Modules or content
    - _Requirements: 3.4, 26.15, 26.22, 27.2, 27.4, 27.5, 27.12, 27.14_

## Notes

- This plan has no automated tests, test tooling or lint tooling (user decision). `npm run build`, which includes `tsc -b`, is the only automated check; the checkpoints and the Visual_Review are manual browser checks.
- The design's Correctness Properties describe the intended behavior of the `src/lib` functions. They can become property-based tests later if the concept moves toward production.
- Downloading stock photos is a manual step for the user (`assets-src/photos/SOURCING.md`). Until then every slot renders the SmartImage placeholder.
- Small choices beyond the design text: the Click_To_Call_Button bottom space sits inside the Footer instead of on `body` (Req 12.1); `IconName` comes from a curated icon registry rather than lucide's full `icons` map, to keep the bundle small; `crop-logo.mjs` writes `logoSizes.ts` so the logo `<img>` sizes follow the files; the Reviews page header includes the `pages.ts` intro that the `PageIntros` type defines.
- Each task lists the requirement clauses it implements, for traceability.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "2.1", "4.1", "5.1"] },
    { "id": 2, "tasks": ["2.2", "4.3", "4.4", "6.1", "17.1"] },
    { "id": 3, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5", "6.2"] },
    { "id": 4, "tasks": ["3.6", "4.2", "6.3", "7.1", "7.2", "7.3", "7.4", "8.1", "11.1", "12.1", "15.1"] },
    { "id": 5, "tasks": ["7.5", "8.2", "13.1", "14.1"] },
    { "id": 6, "tasks": ["8.3", "8.4", "8.5", "9.1", "12.2", "15.2"] },
    { "id": 7, "tasks": ["8.6", "12.3"] },
    { "id": 8, "tasks": ["9.2", "9.3", "11.2", "11.3", "12.4", "13.2", "14.2", "14.3", "14.4", "15.3", "17.2"] },
    { "id": 9, "tasks": ["18.1"] },
    { "id": 10, "tasks": ["18.2"] }
  ]
}
```
