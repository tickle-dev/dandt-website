// Projects_Page Placeholder_Content (design.md, Data Models: Project; Req 10.1, 10.2, 16.4).
// One project per `project-…` photo slot in photoManifest.ts, and each project's category
// matches its photo subject in assets-src/photos/SOURCING.md. Flooring & Tile and Interior
// Improvements have one project each, so their filter states leave a short row for the
// Visual_Review (Req 26.28). Brand_Voice (Req 27.3, 27.5): each description that says who did
// the work names the crew or team for that trade, and no text here uses "elite".
import type { Project } from './types.ts';

export const projects: readonly Project[] = [
  {
    placeholder: true,
    id: 'roof-replacement',
    title: 'Architectural Shingle Roof Replacement in Plano',
    category: 'Roofing & Exterior Construction',
    description:
      'Our roofing crew removed a hail-worn roof and installed new underlayment, architectural shingles and ridge vents in two days.',
    photo: 'project-roof-replacement',
    alt: 'Suburban house with a newly installed asphalt shingle roof',
  },
  {
    placeholder: true,
    id: 'composite-deck',
    title: 'Composite Deck in McKinney',
    category: 'Outdoor Living',
    description:
      'Our outdoor living crew built a low-maintenance composite deck with wide steps down to the yard. It replaced a weathered wood deck that needed new boards every summer.',
    photo: 'project-composite-deck',
    alt: 'Finished composite deck with steps leading down to a backyard lawn',
  },
  {
    placeholder: true,
    id: 'bathroom-remodel',
    title: 'Walk-In Shower Bathroom Remodel in Richardson',
    category: 'Kitchen & Bathroom Upgrades',
    description:
      'Our bathroom team replaced a dated tub with a tiled walk-in shower, then added a new vanity and updated fixtures.',
    photo: 'project-bathroom-remodel',
    alt: 'Remodeled bathroom with a tiled walk-in shower and a new vanity',
  },
  {
    placeholder: true,
    id: 'stained-cedar-fence',
    title: 'Stained Cedar Privacy Fence in Carrollton',
    category: 'Exterior Improvements',
    description:
      'Our fence crew built a cedar privacy fence around the backyard and finished it with a stain that protects the wood from sun and rain.',
    photo: 'project-stained-cedar-fence',
    alt: 'New stained cedar privacy fence along the edge of a backyard',
  },
  {
    placeholder: true,
    id: 'hardwood-flooring',
    title: 'Hardwood Flooring Installation in Denton',
    category: 'Flooring & Tile',
    description:
      'Our flooring and tile team installed oak hardwood through the living room, dining room and front hall, replacing worn carpet.',
    photo: 'project-hardwood-flooring',
    alt: 'Newly installed hardwood floor in an open living room',
  },
  {
    placeholder: true,
    id: 'kitchen-backsplash',
    title: 'Tile Kitchen Backsplash in Irving',
    category: 'Kitchen & Bathroom Upgrades',
    description:
      'Our tile team installed a new backsplash between the countertops and upper cabinets in a single day, with clean cuts around every outlet.',
    photo: 'project-kitchen-backsplash',
    alt: 'New tile backsplash behind kitchen countertops and below upper cabinets',
  },
  {
    placeholder: true,
    id: 'storm-roof-repair',
    title: 'Hail Damage Roof Repair in Frisco',
    category: 'Roofing & Exterior Construction',
    description:
      'After a spring hailstorm, our roofing crew replaced damaged shingles and flashing. Each repair was documented with photos for the homeowner’s insurance claim.',
    photo: 'project-storm-roof-repair',
    alt: 'Roof repair in progress, with new shingles replacing storm-damaged ones',
  },
  {
    placeholder: true,
    id: 'backyard-pergola',
    title: 'Cedar Pergola Over a Backyard Patio in Allen',
    category: 'Outdoor Living',
    description:
      'Our outdoor living crew built a cedar pergola over an existing patio to shade the seating area through long Texas summers.',
    photo: 'project-backyard-pergola',
    alt: 'Wood pergola over a backyard patio with outdoor seating',
  },
  {
    placeholder: true,
    id: 'exterior-repaint',
    title: 'Full Exterior Repaint in Garland',
    category: 'Exterior Improvements',
    description:
      'Our exterior paint crew prepped and repainted the siding, trim and front door, giving the home a clean, updated look from the street.',
    photo: 'project-exterior-repaint',
    alt: 'Freshly painted house exterior with crisp trim and a front door',
  },
  {
    placeholder: true,
    id: 'crown-molding',
    title: 'Crown Molding in a Dallas Living Room',
    category: 'Interior Improvements',
    description:
      'Our trim carpentry crew installed painted crown molding around the living and dining room ceilings for a finished, classic look.',
    photo: 'project-crown-molding',
    alt: 'Painted crown molding where a living room wall meets the ceiling',
  },
];
