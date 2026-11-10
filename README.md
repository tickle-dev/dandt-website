# D&T Go Elite concept website

A frontend-only concept website for D&T Go Elite Roofing and Construction (Dallas–Fort Worth). It is a React single-page app built with Vite and TypeScript, and it is hosted on GitHub Pages. There is no backend: the quote form validates and confirms in the browser and sends nothing.

Contact details, reviews, project descriptions, FAQ answers and social links are placeholder content. See [Replacing placeholder content](#replacing-placeholder-content).

## Prerequisites

- Node.js 22 (the version the deployment workflow uses). Newer Node versions also work.
- npm (comes with Node.js).

## Run it locally

```sh
npm install        # install dependencies
npm run dev        # start the development server
```

`npm run dev` prints a local URL, normally `http://localhost:5173/`. Open it in a browser to see the Home page. The server reloads as you edit files.

## Build and preview

```sh
npm run build      # type-check (tsc -b), then build into dist/
npm run preview    # serve dist/ locally
```

- `npm run build` writes the whole static site to `dist/` and exits with an error, naming the file, if TypeScript or Vite finds a problem. The build also copies `dist/index.html` to `dist/404.html` (see [Deep links](#deep-links-on-github-pages)).
- `npm run preview` prints a local URL, normally `http://localhost:4173/`. Deep links such as `/services/flooring-tile` work there, including on refresh.

The project has no test or lint scripts. `tsc -b` type-checks the code as part of `npm run build`.

### Building for a subpath

The site is served from the path in the `BASE_PATH` environment variable. When it is unset or empty, the site is served from `/`. A non-empty value must start and end with `/`; anything else (for example `/my-repo` or `my-repo/`) stops the build with an "Invalid BASE_PATH" error.

To check a project-site build on your machine:

```sh
BASE_PATH=/my-repo/ npm run build && npm run preview
```

Then open `http://localhost:4173/my-repo/`.

## Logo and photos

### Logo: `npm run crop-logo`

`scripts/crop-logo.mjs` builds the logo files the site uses:

| Output | Used for |
|---|---|
| `src/assets/brand/logo-full.png` | Full logo in the footer |
| `src/assets/brand/logo-header.png` | Compact header logo ("D&T" with the roofline and "GO ELITE", without "ROOFING AND CONSTRUCTION") |
| `src/assets/brand/logoSizes.ts` | Generated pixel sizes for the logo `<img>` tags. Do not edit by hand |
| `public/favicon.png` | 512 × 512 favicon |

The script picks its sources in this order:

1. `brand/logo.svg`, then `brand/logo.png`: the customer's logo, used for both logos.
2. `brand/icon.svg`, then `brand/icon.png`: the customer's icon-only mark, used for the favicon.
3. `company-logo.png` at the repository root, when no `brand/logo.*` file exists. Without a `brand/icon.*` file, the favicon is cut from the "D&T" part of the logo.

The script only reads `company-logo.png` and never changes it. When the customer sends an SVG or higher-resolution logo or an icon, create a `brand/` folder, save the files under the names above, and run `npm run crop-logo` again.

### Stock photos (manual steps)

The repository has no photos yet. Until a photo slot has a file, the site shows a styled placeholder block in its place. To add photos:

1. Follow `assets-src/photos/SOURCING.md`. It lists every slot id, its aspect ratio and search keywords, and the checks a photo must pass (full color, no watermark, no text or third-party logos, sharp at 1920 px).
2. Download each photo by hand from Unsplash or Pexels at full size and save it as `assets-src/photos/{slot id}.jpg` (`.jpeg`, `.png` and `.webp` also work). Note the photo page URL and the photographer's name.
3. Run `npm run optimize-photos`. For each slot that has a file, the script crops the photo to the slot's ratio around its `focal` point, writes WebP files 640, 1280 and 1920 px wide to `src/assets/photos/`, and keeps each file at or under 400 KB. It then regenerates `src/assets/photos/photoManifest.ts` and keeps the existing `focal` values. Slots without a file keep showing the placeholder.
4. Add one row per photo to the stock photo table in `ATTRIBUTIONS.md`: the files, source page URL, photographer, license name and license URL. Every row must point to files that exist.

If a crop cuts off the subject, edit that slot's `focal` value (a CSS `object-position` such as `'50% 30%'`) in `photoManifest.ts` and run `npm run optimize-photos` again. When you remove or replace a photo, update or delete its row in `ATTRIBUTIONS.md`.

## Replacing placeholder content

All site text lives in `src/content/`. Pages and components contain no copy of their own.

- Entries marked `placeholder: true` are placeholder content that the customer must replace or confirm. They are in `site.ts` (including the proposed footer tagline "Elite teams. Elite results."), `home.ts`, `about.ts`, `contact.ts` (phone, email, hours, map), `serviceAreas.ts`, `projects.ts`, `reviews.ts`, `faq.ts` and `social.ts`.
- `pages.ts` (page intros and closing banners) is also placeholder text. Its comment marks it as such because its types have no `placeholder` field.
- `serviceCatalog.ts` holds the customer's service list exactly as supplied. Keep category and item names unchanged.
- `uiText.ts` holds fixed interface copy (navigation labels, button labels, form labels and error messages). It is not placeholder content.

Change a value once and every page that shows it updates. For example, the phone number in `contact.ts` feeds the Contact page, the footer and the mobile call button.

Before any production launch, replace the stock photos and the sample reviews with the customer's own photos and real reviews, and have the customer confirm the FAQ answers about licensing, insurance, warranties, permits and payment.

### Writing copy (brand voice)

- Describe the work as done by a crew or team for that trade ("our roofing crew", "the tile team").
- Never use "general contractor" or "handyman". The service names "General Construction & Repairs" and "General Home Repairs" stay as they are.
- Use "elite" at most once per page outside the company name, and never in headings, buttons, labels or form messages. The tagline appears only in the footer.
- No superlatives or rankings ("best in Dallas", "#1", "top-rated", "unmatched", "world-class"), no exclamation marks and no pressure phrases ("act now", "limited time").

## Deploying to GitHub Pages

The workflow `.github/workflows/deploy.yml` ("Deploy to GitHub Pages") builds and publishes the site.

### One-time setup

1. Push the repository to GitHub.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. If this is not set, the run fails at the "Configure GitHub Pages" step and nothing is published.
3. The workflow runs on pushes to `main`. If the repository's default branch has another name, change `on.push.branches` in `deploy.yml` to that name.

### What the workflow does

- Runs on every push to the default branch, and when started by hand (see below). Pull requests and pushes to other branches deploy nothing.
- Uses only the `contents: read`, `pages: write` and `id-token: write` permissions.
- Uses one concurrency group (`pages`) that never cancels a running deployment. If several commits arrive during a deployment, it finishes and the latest commit is deployed after it.
- The `build` job checks out the commit, sets up Node 22, runs `npm ci` and `actions/configure-pages`, sets `BASE_PATH`, runs `npm run build`, checks that `dist/index.html` and `dist/404.html` exist, and uploads `dist/` as the Pages artifact.
- The `deploy` job publishes the artifact with `actions/deploy-pages` to the `github-pages` environment.

### How `BASE_PATH` is set

The "Compute BASE_PATH" step takes the `base_path` that `actions/configure-pages` reports for the repository and adds a trailing `/`:

| Site type | Published at | `BASE_PATH` |
|---|---|---|
| Project site | `https://<owner>.github.io/<repository>/` | `/<repository>/` |
| User or organization site (repository named `<owner>.github.io`) | `https://<owner>.github.io/` | `/` |
| Custom domain | `https://<your-domain>/` | `/` |

No file needs editing to switch between these cases. The "Show BASE_PATH" step prints the value used in each run.

### Running it by hand

Open the **Actions** tab, select **Deploy to GitHub Pages**, click **Run workflow**, keep the default branch selected and confirm. If you pick another branch, the build job is skipped and nothing is deployed.

### Finding the published URL

- In the finished run, the `deploy` job shows the URL under the `github-pages` environment.
- **Settings → Pages** shows "Your site is live at …".
- The repository home page lists it under **Deployments**.

A new deployment can take a few minutes to appear. Reload with the browser cache bypassed (Shift + reload) to check.

### Finding a failed run

Open the **Actions** tab and select **Deploy to GitHub Pages**. Failed runs have a red mark. Open the run, open the failed job (`build` or `deploy`) and expand the red step to read its log. Common causes are the Pages source not set to "GitHub Actions" (the "Configure GitHub Pages" step fails), a TypeScript or build error ("Build"), or a missing `dist/index.html` or `dist/404.html` ("Check build output"). When a run fails, nothing is deployed and the previously published site stays online.

### Deep links on GitHub Pages

GitHub Pages has no server rewrite rules, so a direct load of a URL such as `/<repository>/services/flooring-tile` has no matching file. In that case GitHub Pages serves the site's `404.html` and leaves the address bar unchanged. The build makes `dist/404.html` an exact copy of `dist/index.html`, so the app loads, React Router reads the address, and the right page appears. Unknown paths show the site's Not Found page. There is no redirect and no extra browser history entry. The browser's network panel shows status 404 for the first request of a deep link; this is expected.

For the same reason, `dist/` contains only `index.html`, `404.html`, `favicon.png` and `assets/`. Do not add files or folders named after a page (such as `services` or `about.html`) to `public/`, because GitHub Pages would serve them instead of the app.

After the first deployment, check by hand: open a deep link directly, refresh it, and open the project-site address without the trailing slash (GitHub Pages redirects it to `/<repository>/`).

## Before the demo

- Do the visual review: check every page and UI state at 375, 768, 1280 and 1920 px wide in the browser's responsive mode (`npm run build && npm run preview`).
- At 1024 px, check that the header row (logo, navigation and "Get a Free Quote") fits on one line without overlap. Body text grows to 17 px at 1024 px and wider, so this width is the tightest.
- Download and optimize the photos (see [Stock photos](#stock-photos-manual-steps)). Until then, every photo slot shows a placeholder block.
- Have the customer review the placeholder content and the proposed tagline.
