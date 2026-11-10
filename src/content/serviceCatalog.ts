// Service_Catalog (Req 2). Category and item names transcribe requirements.md
// "Appendix A: Customer Service List (verbatim)" exactly, in the supplied order. Keep them
// unchanged: "Backsplash Installation" appears in both Interior Improvements and
// Flooring & Tile (Req 2.3), and "Pressure Washing" and "Pressure Washing & Surface Cleaning"
// are separate items (Req 2.4).
//
// PLACEHOLDER (Req 16.11): every category `summary` and item `description` below is
// Placeholder_Content for the concept demo and must be replaced or confirmed by the customer.
// The names are customer-supplied and are not placeholders.
//
// Brand_Voice (Req 27): each summary names the trade's team, crew or specialists exactly
// once (Req 27.9); any sentence that says who does on-site work names a trade crew or team
// (Req 27.3); no "elite" (Req 27.6), banned phrases, superlatives or exclamation marks.

import type { CatalogInput, ServiceCatalog } from './types.ts';
import { buildCatalog } from '../lib/catalog.ts';

const catalogInput: CatalogInput = [
  {
    name: 'Exterior Improvements',
    summary:
      'Fences, siding, gutters, decks and concrete that keep a Dallas–Fort Worth home sound and good-looking from the curb. Our exterior improvement team handles each project from first measurement to final cleanup.',
    icon: 'BrickWall',
    headerPhoto: 'category-exterior-improvements',
    items: [
      {
        name: 'Fence Installation & Repair',
        description:
          'New wood, iron and vinyl fences, plus repairs for leaning posts, broken pickets and sagging gates. Our fence crew sets posts in concrete and checks every line for level before the panels go up.',
      },
      {
        name: 'Fence Staining & Painting',
        description:
          'Stain or paint that protects fence boards from Texas sun and moisture and gives the yard a uniform color. Our fence crew cleans and dries the wood first so the finish soaks in evenly.',
      },
      {
        name: 'Pressure Washing',
        description:
          'Pressure washing removes dirt, mildew and pollen from siding, brick, fences and other exterior surfaces. Pressure and nozzle settings are matched to each surface so paint and mortar stay intact.',
      },
      {
        name: 'Driveway & Sidewalk Cleaning',
        description:
          'Surface cleaning lifts oil spots, tire marks and built-up grime from concrete driveways and sidewalks. The result is a brighter entry to your home and a clean base for any sealing work.',
      },
      {
        name: 'Exterior Painting',
        description:
          'Exterior paint for siding, trim, doors and shutters, applied after scraping, caulking and priming. Our exterior paint team uses coatings rated for Texas heat so the color holds up season after season.',
      },
      {
        name: 'Siding Installation & Repair',
        description:
          'Replacement of damaged or worn siding panels, or a full new siding installation in fiber cement, vinyl or wood. Our siding crew seals every seam and opening to keep water out of the wall.',
      },
      {
        name: 'Gutter Installation & Repair',
        description:
          'Seamless gutters and downspouts sized for heavy Texas rainstorms, plus repairs for leaks, loose hangers and sagging runs. Proper slope and outlet placement carry water away from your foundation.',
      },
      {
        name: 'Gutter Cleaning',
        description:
          'Removal of leaves, seed pods and debris from gutters and downspouts, followed by a flow test. Clear gutters help prevent overflow, fascia rot and pooling near the foundation.',
      },
      {
        name: 'Deck Building & Repair',
        description:
          'New decks built to your layout and repairs for loose boards, failing stairs and worn railings. Our deck crew checks the framing and footings before any new boards are fastened.',
      },
      {
        name: 'Deck Staining & Sealing',
        description:
          'Cleaning, light sanding and a penetrating stain or sealer that protects deck boards from sun, rain and foot traffic. A fresh coat every few years helps the wood resist cracking and graying.',
      },
      {
        name: 'Patio Covers & Pergolas',
        description:
          'Attached patio covers and freestanding pergolas that add shade to a back patio or deck. Our outdoor build crew anchors each structure securely and can match the trim and paint of your home.',
      },
      {
        name: 'Concrete Work',
        description:
          'Concrete pads, slabs, steps and repairs for cracked or sunken sections around the home. Our concrete crew prepares and compacts the base so the new surface stays level.',
      },
      {
        name: 'Walkways & Sidewalks',
        description:
          'New walkways and sidewalk sections in concrete, pavers or stone that connect the driveway, porch and backyard. Each path is graded so rainwater drains away from the house.',
      },
      {
        name: 'Exterior Trim & Fascia Repair',
        description:
          'Replacement of rotted or split trim boards and fascia, sealed and painted to match the rest of the house. Repairing these areas early keeps water and insects out of the roof edge and walls.',
      },
      {
        name: 'Door & Window Replacement',
        description:
          'Energy-efficient entry doors, patio doors and windows fitted, flashed and sealed against North Texas weather. New units can lower cooling costs and cut outside noise.',
      },
      {
        name: 'Landscaping & Curb Appeal Improvements',
        description:
          'Fresh mulch beds, shrubs, edging and small exterior updates that make a strong first impression from the street. Our landscaping crew chooses plants that handle DFW summers with modest watering.',
      },
    ],
  },
  {
    name: 'Interior Improvements',
    summary:
      'Paint, drywall, trim, cabinets, flooring and full room remodels that refresh the inside of your home. Each job is carried out by our interior finish specialists, who protect your furniture and floors while they work.',
    icon: 'PaintRoller',
    headerPhoto: 'category-interior-improvements',
    items: [
      {
        name: 'Interior Painting',
        description:
          'Walls, ceilings, trim and doors painted with clean lines and even coverage. Our interior paint team covers floors and furniture, repairs small dings and cleans up at the end of each day.',
      },
      {
        name: 'Drywall Installation & Repair',
        description:
          'New drywall for remodels and additions, plus patches for holes, cracks and water damage. Our drywall crew tapes, sands and primes each repair so it disappears under paint.',
      },
      {
        name: 'Texture & Sheetrock Repair',
        description:
          'Sheetrock patches finished with orange peel, knockdown or smooth texture matched to the surrounding wall or ceiling. A careful texture match keeps the repair from showing once the room is painted.',
      },
      {
        name: 'Interior Trim & Baseboards',
        description:
          'Baseboards, door casings and window trim cut, installed and caulked for tight corners and clean joints. New trim is a simple way to give a room a finished look.',
      },
      {
        name: 'Door Installation & Replacement',
        description:
          'Interior doors, closet doors and new hardware hung square so they open, close and latch smoothly. Our carpentry crew adjusts frames and hinges as needed for a proper fit.',
      },
      {
        name: 'Cabinet Installation & Painting',
        description:
          'New cabinet installation, or cleaning, sanding and painting of existing cabinets for a fresh color without a full replacement. Cabinet doors are finished with durable coatings made for kitchens and baths.',
      },
      {
        name: 'Kitchen Remodeling',
        description:
          'Kitchen remodels that can include new cabinets, countertops, backsplash, flooring, lighting and layout changes. Our kitchen remodeling team walks you through the plan and the schedule before demolition begins.',
      },
      {
        name: 'Bathroom Remodeling',
        description:
          'Bathroom remodels from a single vanity swap to a complete renovation with new tile, shower, fixtures and lighting. Our bathroom remodeling team protects the rest of the house from dust while work is underway.',
      },
      {
        name: 'Backsplash Installation',
        description:
          'A tile backsplash behind the kitchen counters or a bathroom vanity, in ceramic, glass or stone. Neatly cut edges and sealed grout make the wall easy to wipe clean.',
      },
      {
        name: 'Tile Installation',
        description:
          'Tile for floors, walls, entryways and laundry rooms, set on a properly prepared surface. Our tile crew lays out each room in advance so cut pieces land at the edges and not in the middle of the floor.',
      },
      {
        name: 'Flooring Installation',
        description:
          'Flooring installation for living areas, bedrooms and hallways in the material that fits your budget and lifestyle. Our flooring crew removes the old floor, levels the subfloor and installs transitions between rooms.',
      },
      {
        name: 'Luxury Vinyl Plank (LVP) Flooring',
        description:
          'Waterproof luxury vinyl plank that looks like wood and handles kids, pets and spills. LVP is a practical choice for kitchens, baths and busy family rooms.',
      },
      {
        name: 'Laminate Flooring',
        description:
          'Laminate flooring offers the look of hardwood with a scratch-resistant surface at a lower cost. It is installed over a moisture barrier and underlayment for a quiet, comfortable floor.',
      },
      {
        name: 'Hardwood Flooring',
        description:
          'Solid and engineered hardwood floors installed with proper acclimation, spacing and finishing. Hardwood adds warmth to a home and can be refinished many times over its life.',
      },
      {
        name: 'Carpet Removal & Replacement',
        description:
          'Removal and disposal of worn carpet and pad, followed by new carpet or a switch to hard flooring. Tack strips and staples are pulled and the subfloor is checked before the new floor goes in.',
      },
      {
        name: 'Crown Molding Installation',
        description:
          'Crown molding fitted along the ceiling line with tight miter joints and caulked seams. Our finish carpentry crew primes and paints the molding so it blends with your existing trim.',
      },
      {
        name: 'Interior Fixture Updates',
        description:
          'Replacement of light fixtures, ceiling fans, cabinet hardware, faucets and other dated interior fixtures. Small fixture updates can modernize a room in a single visit.',
      },
    ],
  },
  {
    name: 'Flooring & Tile',
    summary:
      'Tile, hardwood, vinyl and laminate floors set level, sealed properly and finished with clean grout lines and baseboards. Our flooring and tile team prepares every subfloor before a single plank or tile goes down.',
    icon: 'Grid3x3',
    headerPhoto: 'category-flooring-tile',
    items: [
      {
        name: 'Tile Flooring',
        description:
          'Porcelain and ceramic tile floors for kitchens, baths, entries and living areas. Our tile crew checks the subfloor for flatness and uses the right underlayment to prevent cracked tiles later.',
      },
      {
        name: 'Shower Tile Installation',
        description:
          'Shower walls, floors and niches tiled over a fully waterproofed backing. Proper slope to the drain and sealed grout lines keep water where it belongs.',
      },
      {
        name: 'Backsplash Installation',
        description:
          'Backsplash tile in subway, mosaic, stone or large-format styles, set straight and level along the countertop. Outlets, windows and cabinet edges are trimmed cleanly for a finished look.',
      },
      {
        name: 'Grout Repair & Replacement',
        description:
          'Cracked, stained or crumbling grout is removed and replaced, then sealed to resist moisture and stains. New grout can make an older tile floor or shower look close to new.',
      },
      {
        name: 'Tile Removal & Replacement',
        description:
          'Removal of damaged, loose or outdated tile with care to protect nearby surfaces, followed by new tile set on a sound base. Single cracked tiles can often be replaced without redoing the whole floor.',
      },
      {
        name: 'Hardwood Floor Installation',
        description:
          'Nail-down, glue-down and floating hardwood floors installed over a clean, flat subfloor. Our flooring crew finishes with matching stair nosing, thresholds and trim.',
      },
      {
        name: 'Vinyl & Laminate Flooring',
        description:
          'Vinyl plank, vinyl tile and laminate floors that install quickly and stand up to daily wear. These floors work well in rentals, kitchens and other high-traffic rooms.',
      },
      {
        name: 'Floor Repairs',
        description:
          'Repairs for squeaky boards, lifted planks, chipped tile and water-damaged sections of flooring. Matching material is used wherever possible so the repair blends with the rest of the floor.',
      },
      {
        name: 'Baseboard Installation',
        description:
          'New baseboards installed after flooring work or as a stand-alone update, with tight inside corners and filled nail holes. Painted or stained baseboards cover expansion gaps and complete the room.',
      },
    ],
  },
  {
    name: 'Kitchen & Bathroom Upgrades',
    summary:
      'Backsplashes, cabinets, countertops, vanities and shower updates that make kitchens and baths easier to use and keep clean. Our kitchen and bath crew coordinates each upgrade so the room is back in service as quickly as possible.',
    icon: 'Bath',
    headerPhoto: 'category-kitchen-bathroom-upgrades',
    items: [
      {
        name: 'Kitchen Backsplashes',
        description:
          'Kitchen backsplashes in tile or stone that protect the wall behind the stove and sink. A new backsplash is a quick way to update a kitchen without a full remodel.',
      },
      {
        name: 'Cabinet Installation',
        description:
          'Base, wall and pantry cabinets installed level, plumb and securely fastened to the wall studs. Doors and drawers are adjusted so gaps are even and everything closes smoothly.',
      },
      {
        name: 'Cabinet Refinishing',
        description:
          'Existing cabinets are cleaned, sanded, primed and refinished in a new color or stain. Refinishing keeps sound cabinet boxes in place and costs less than replacing them.',
      },
      {
        name: 'Countertop Replacement',
        description:
          'Removal of old countertops and installation of new quartz, granite, solid surface or laminate tops. Our countertop crew reconnects the sink, faucet and cooktop so the kitchen is ready to use again.',
      },
      {
        name: 'Vanity Installation',
        description:
          'Single and double bathroom vanities installed with new tops, sinks, faucets and drain connections. A properly anchored and sealed vanity prevents leaks and water damage to the floor below.',
      },
      {
        name: 'Shower & Tub Updates',
        description:
          'Updates such as new valves, trim kits, shower doors, tub surrounds and fresh caulking for an aging shower or tub. These targeted changes refresh a bathroom without a full renovation.',
      },
      {
        name: 'Shower Surrounds',
        description:
          'Acrylic, solid surface or tile shower surrounds installed over a watertight backing. A one-piece or panel surround has fewer grout lines and is easy to keep clean.',
      },
      {
        name: 'Bathroom Tile',
        description:
          'Floor and wall tile for bathrooms, chosen for slip resistance and moisture protection. Our bathroom tile team seals every joint and transition around the tub, toilet and vanity.',
      },
      {
        name: 'Fixture Replacement',
        description:
          'Replacement of faucets, showerheads, toilets, towel bars, mirrors and lighting in kitchens and baths. New fixtures can save water and give a room a more current look.',
      },
      {
        name: 'Bathroom Renovations',
        description:
          'Full bathroom renovations that can change the layout, replace the tub with a walk-in shower and update every surface. Our bathroom renovation team keeps you informed at each stage, from demolition to the final fixtures.',
      },
    ],
  },
  {
    name: 'Roofing & Exterior Construction',
    summary:
      'Roof replacement, repairs, inspections and storm damage work built for North Texas hail, wind and summer heat. Our roofing crew documents what they find with photos and explains every recommended repair.',
    icon: 'House',
    headerPhoto: 'category-roofing-exterior-construction',
    items: [
      {
        name: 'Roof Replacement',
        description:
          'Complete tear-off and replacement of worn or damaged roofs with new underlayment, flashing, vents and shingles. Our roofing crew protects your landscaping during the job and runs a magnetic sweep for nails at the end.',
      },
      {
        name: 'Roof Repairs',
        description:
          'Repairs for leaks, missing shingles, damaged vents and worn pipe boots on asphalt shingle roofs. Fixing small problems early helps prevent water damage to the decking, insulation and ceilings.',
      },
      {
        name: 'Shingle Replacement',
        description:
          'Replacement of cracked, curled or wind-blown shingles with a close color and style match. Our roofing crew seals each new shingle so it lies flat and resists the next storm.',
      },
      {
        name: 'Roof Inspections',
        description:
          'A roof inspection covering shingles, flashing, vents, gutters and attic signs of leaks. Our roof inspection team provides photos and a written summary of what they find.',
      },
      {
        name: 'Flashing Repairs',
        description:
          'Repair or replacement of loose, rusted or missing flashing around chimneys, skylights, walls and roof valleys. Sound flashing is a key defense against roof leaks.',
      },
      {
        name: 'Fascia & Soffit Repairs',
        description:
          'Replacement of rotted fascia boards and damaged soffit panels along the roof edge, primed and painted to match. Intact soffits keep birds and insects out of the attic and support proper ventilation.',
      },
      {
        name: 'Storm Damage Repairs',
        description:
          'Repairs after hail, high wind and fallen limbs, from temporary tarping to full roof and exterior restoration. Our storm repair crew documents the damage with photos that you can share with your insurance company.',
      },
    ],
  },
  {
    name: 'General Construction & Repairs',
    summary:
      'Carpentry, framing, wood rot, trim and the small repairs that keep homes, rentals and commercial properties in working order. Our carpentry and repair crew works through each list one item at a time and leaves the site tidy.',
    icon: 'Hammer',
    headerPhoto: 'category-general-construction-repairs',
    items: [
      {
        name: 'General Home Repairs',
        description:
          'Repairs for the everyday issues found around a house, such as sticking doors, loose railings, damaged trim and drywall dings. Our home repair crew can work through several items on your list in a single visit.',
      },
      {
        name: 'Remodeling & Renovations',
        description:
          'Room remodels and whole-home renovations that update layouts, finishes and fixtures. Our renovation team plans each phase so you know what happens next and when.',
      },
      {
        name: 'Framing & Carpentry',
        description:
          'Wall framing, header installation, structural repairs and custom carpentry such as built-in shelves and benches. Our carpentry crew builds each frame square, plumb and ready for the finish trades.',
      },
      {
        name: 'Wood Rot Repair',
        description:
          'Removal and replacement of rotted wood in siding, trim, window sills, door frames and decks. Our carpentry crew finds the source of the moisture so the rot does not return.',
      },
      {
        name: 'Trim & Finish Work',
        description:
          'Door casings, window trim, wainscoting, shelving and other finish details installed with tight, clean joints. Careful finish work gives a room a polished, complete appearance.',
      },
      {
        name: 'Door & Window Repairs',
        description:
          'Repairs for doors and windows that stick, drag, leak air or no longer lock properly. Hinges, weatherstripping, locks and sashes are adjusted or replaced to restore smooth operation.',
      },
      {
        name: 'Minor Plumbing Repairs',
        description:
          'Small plumbing fixes such as dripping faucets, running toilets, slow drains and loose supply lines. Quick repairs like these help prevent water waste and hidden damage under sinks and cabinets.',
      },
      {
        name: 'Minor Electrical Repairs',
        description:
          'Small electrical updates such as replacing switches, outlets, light fixtures and ceiling fans. Each repair is completed with the power safely shut off and is tested before the job is closed out.',
      },
      {
        name: 'Property Maintenance',
        description:
          'Scheduled maintenance visits that cover caulking, filter changes, gutter checks, touch-up paint and small repairs. Regular upkeep catches minor problems before they become costly ones.',
      },
      {
        name: 'Rental Property Repairs',
        description:
          'Turnover and repair work for rental homes, including paint, flooring, fixtures, doors and drywall. Our rental repair crew works to tight move-in schedules and sends photos when each unit is ready.',
      },
      {
        name: 'Commercial Property Improvements',
        description:
          'Interior and exterior improvements for small offices, retail spaces and other commercial properties across DFW. Work can be scheduled around business hours to limit disruption for your staff and customers.',
      },
    ],
  },
  {
    name: 'Outdoor Living',
    summary:
      'Fences, decks, patios, pergolas, porches and outdoor kitchens for enjoying a Texas evening in your own backyard. Our outdoor living team plans each build around how you use the space and how the sun moves across your yard.',
    icon: 'Trees',
    headerPhoto: 'category-outdoor-living',
    items: [
      {
        name: 'Fence Installation',
        description:
          'Privacy, picket and ornamental fences that define your yard and keep pets and children safely inside. Gates are hung to swing freely and latch securely.',
      },
      {
        name: 'Deck Construction',
        description:
          'Custom decks in pressure-treated wood or composite boards, sized for dining, grilling or relaxing. Our deck crew builds each deck on solid footings, with railings and stairs built to code.',
      },
      {
        name: 'Patio Construction',
        description:
          'Concrete, paver and stone patios that create a level, durable outdoor living area. Each patio is graded to shed rainwater away from the house and the lawn.',
      },
      {
        name: 'Pergolas',
        description:
          'Wood and aluminum pergolas that provide filtered shade over a patio, deck or garden path. Pergolas can be fitted with lighting, fans or a retractable shade cover.',
      },
      {
        name: 'Outdoor Kitchens',
        description:
          'Outdoor kitchens with built-in grills, countertops, storage and seating for entertaining in the backyard. Our outdoor kitchen team helps you choose weather-resistant materials that stand up to Texas summers.',
      },
      {
        name: 'Porch Repairs',
        description:
          'Repairs for front and back porches, including rotted boards, loose steps, worn railings and damaged posts. A sound porch makes the home safer and more welcoming.',
      },
      {
        name: 'Outdoor Painting & Staining',
        description:
          'Paint and stain for outdoor structures such as fences, decks, pergolas, sheds and porch railings. The right product for each surface protects the wood from sun, rain and humidity.',
      },
      {
        name: 'Pressure Washing & Surface Cleaning',
        description:
          'Cleaning of patios, pool decks, outdoor furniture, fences and other outdoor living surfaces. Soft-wash and pressure methods are chosen for each material to remove grime without damage.',
      },
    ],
  },
];

/** The Service_Catalog with derived slugs; throws at module load on an empty or duplicate slug. */
export const catalog: ServiceCatalog = buildCatalog(catalogInput);
