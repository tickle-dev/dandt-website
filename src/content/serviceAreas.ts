// Service_Areas_Page Placeholder_Content (design.md, Data Models: ServiceAreasContent,
// MapEmbedConfig; Page layouts: Service Areas). The customer replaces or confirms each value.
// The page sorts `cities` with sortCities, so the order here does not matter (Req 18.3, 18.6).
// Every Review city must be in `cities`.

import type { ServiceAreasContent } from './types.ts';

export const serviceAreas: ServiceAreasContent = {
  placeholder: true,
  /** Page-header intro under the h1; also the `serviceAreas` entry of `pageIntros` (Req 18.1). */
  intro: 'D&T Go Elite is based in Dallas, Texas, and serves homeowners throughout the greater Dallas–Fort Worth area.',
  /** Shown after the city list, before the "Get a Free Quote" CTA (Req 18.4). */
  note: 'Nearby cities that are not listed may still be in our service area. Contact us with your city, and we will confirm whether we can help with your project.',
  /** 15–40 unique, trimmed names, including the 15 cities required by Req 18.2. */
  cities: [
    'Dallas',
    'Fort Worth',
    'Plano',
    'Frisco',
    'Arlington',
    'Irving',
    'Garland',
    'McKinney',
    'Richardson',
    'Denton',
    'Grand Prairie',
    'Mesquite',
    'Carrollton',
    'Lewisville',
    'Allen',
    'Addison',
    'Bedford',
    'Cedar Hill',
    'Coppell',
    'DeSoto',
    'Duncanville',
    'Euless',
    'Farmers Branch',
    'Flower Mound',
    'Grapevine',
    'Highland Park',
    'Keller',
    'Mansfield',
    'North Richland Hills',
    'Prosper',
    'Rockwall',
    'Rowlett',
    'Southlake',
    'The Colony',
    'University Park',
    'Wylie',
  ],
  /** DFW view that includes Dallas and Fort Worth on desktop; no API key needed (Req 18.5, 22.2, 22.3, 22.5). */
  map: {
    placeholder: true,
    embedUrl: 'https://maps.google.com/maps?q=Dallas-Fort%20Worth%2C%20TX&z=9&output=embed',
    openUrl: 'https://www.google.com/maps/search/?api=1&query=Dallas-Fort%20Worth%2C%20TX',
    title: 'Map of the Dallas–Fort Worth area served by D&T Go Elite',
    label: 'Dallas–Fort Worth, TX',
  },
};
