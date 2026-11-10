# Photo sourcing list

Every photo on the site is a free stock photo from [Unsplash](https://unsplash.com) or [Pexels](https://www.pexels.com), downloaded by hand and stored in this folder (Req 16.2). Until a slot has a file, the site shows the SmartImage placeholder for it.

Slot ids match `src/assets/photos/photoManifest.ts`. Save each download as `{id}.jpg` (the script also accepts `.jpeg`, `.png` and `.webp`). Keep one raw file per slot.

## Slots

Every photo must show residential roofing, construction or home improvement work (Req 16.4). Use the first keyword phrase and fall back to the others if nothing passes the checks below.

### Hero, category headers and About

| Slot id | Save as | Ratio | Search keywords |
|---|---|---|---|
| `home-hero` | `home-hero.jpg` | 3:2 | "roofers installing shingles", "roofing crew at work", "new shingle roof suburban home" |
| `category-exterior-improvements` | `category-exterior-improvements.jpg` | 3:2 | "cedar fence backyard", "fresh exterior paint house" |
| `category-interior-improvements` | `category-interior-improvements.jpg` | 3:2 | "crown molding living room", "freshly painted interior" |
| `category-flooring-tile` | `category-flooring-tile.jpg` | 3:2 | "hardwood floor installation", "large format tile floor" |
| `category-kitchen-bathroom-upgrades` | `category-kitchen-bathroom-upgrades.jpg` | 3:2 | "modern white kitchen quartz", "walk-in shower tile" |
| `category-roofing-exterior-construction` | `category-roofing-exterior-construction.jpg` | 3:2 | "roof shingles close up", "roof inspection" |
| `category-general-construction-repairs` | `category-general-construction-repairs.jpg` | 3:2 | "carpenter framing", "home renovation carpentry" |
| `category-outdoor-living` | `category-outdoor-living.jpg` | 3:2 | "backyard pergola patio", "outdoor kitchen" |
| `about` | `about.jpg` | 4:5 | "construction crew on site", "craftsman tools workshop" |

The hero and the Roofing & Exterior Construction header both show roofing, so they use different keywords. Pick two different photos: the hero shows a crew at work or a whole new roof, and the header shows shingles up close or an inspection.

The hero and the category headers are cropped live on the page (21:9 on desktop, 16:9 on tablet, 4:3 on mobile). Choose photos whose subject sits near the center, or set the slot's `focal` value in `photoManifest.ts` after optimizing.

### Projects

Each project photo must match its project's service category (Req 16.4).

| Slot id | Save as | Ratio | Category | Subject | Search keywords |
|---|---|---|---|---|---|
| `project-roof-replacement` | `project-roof-replacement.jpg` | 4:3 | Roofing & Exterior Construction | A full shingle roof replacement on a house | "roof replacement", "new asphalt shingle roof house" |
| `project-storm-roof-repair` | `project-storm-roof-repair.jpg` | 4:3 | Roofing & Exterior Construction | Roof repair after storm or hail damage | "storm damage roof repair", "roof repair shingles" |
| `project-composite-deck` | `project-composite-deck.jpg` | 4:3 | Outdoor Living | A finished composite deck | "composite deck", "backyard deck" |
| `project-backyard-pergola` | `project-backyard-pergola.jpg` | 4:3 | Outdoor Living | A wood pergola over a backyard patio | "backyard pergola", "wood pergola patio" |
| `project-bathroom-remodel` | `project-bathroom-remodel.jpg` | 4:3 | Kitchen & Bathroom Upgrades | A remodeled bathroom with a tiled shower | "bathroom remodel", "modern bathroom tile shower" |
| `project-kitchen-backsplash` | `project-kitchen-backsplash.jpg` | 4:3 | Kitchen & Bathroom Upgrades | A new tile backsplash behind kitchen counters | "kitchen backsplash", "subway tile backsplash" |
| `project-stained-cedar-fence` | `project-stained-cedar-fence.jpg` | 4:3 | Exterior Improvements | A new stained cedar privacy fence | "stained cedar fence", "wood privacy fence" |
| `project-exterior-repaint` | `project-exterior-repaint.jpg` | 4:3 | Exterior Improvements | A freshly painted house exterior | "exterior house painting", "freshly painted house exterior" |
| `project-hardwood-flooring` | `project-hardwood-flooring.jpg` | 4:3 | Flooring & Tile | Newly installed hardwood floors in a home | "hardwood flooring", "new hardwood floor living room" |
| `project-crown-molding` | `project-crown-molding.jpg` | 4:3 | Interior Improvements | Crown molding where a wall meets the ceiling | "crown molding", "crown molding ceiling trim" |

## Photo checks (Req 26.22)

Check every candidate at full size before downloading. Reject it if any check fails:

- [ ] Full color: not black-and-white, not duotone, and no visible color filter.
- [ ] No watermark.
- [ ] No overlaid text or caption.
- [ ] No legible third-party company name or logo (trucks, signs, product packaging, tool brands).
- [ ] No visible blur on the subject at the largest size the site shows it (1920 px wide).

Also prefer photos that fit the imagery direction: warm natural light, finished high-end residential work in the Dallas–Fort Worth style, clean compositions, no people facing the camera, and a color temperature close to the other photos in the set.

The Visual_Review checks every bundled photo against the same list.

## Steps for each photo

1. Download the photo from Unsplash or Pexels at its largest size. Keep the photo page URL and the photographer's name.
2. Save it in this folder (`assets-src/photos/`) as `{id}.jpg`, using the slot id from the tables above.
3. Run `npm run optimize-photos`. The script crops the photo to its slot's ratio, strips metadata, writes `src/assets/photos/{id}-640.webp`, `{id}-1280.webp` and `{id}-1920.webp`, and updates `photoManifest.ts`.
4. Add one row for the photo to the stock photo table in `ATTRIBUTIONS.md` at the repository root (Req 16.5, 16.6): the files, the source page URL, the photographer, and the license name and URL.

If you remove or replace a photo, delete its files, run `npm run optimize-photos` again, and update or remove its row in `ATTRIBUTIONS.md` so every row matches a file in the repository.
