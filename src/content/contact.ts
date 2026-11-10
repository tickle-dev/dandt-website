// Contact Placeholder_Content (design.md, Data Models: ContactDetails, MapEmbedConfig). The
// Contact_Page, the Footer and the Click_To_Call_Button all read these values, so each detail
// is the same everywhere (Req 11.1, 16.12). The Website shows no street address.

import type { ContactDetails, MapEmbedConfig } from './types.ts';

export const contact: ContactDetails = {
  placeholder: true,
  phone: '(214) 555-0123',
  email: 'info@dtgoelite.example',
  /** `\u00a0` (no-break space) keeps each time and its AM/PM on one line in narrow columns. */
  hours: 'Mon–Fri 7:00\u00a0AM – 6:00\u00a0PM, Sat 8:00\u00a0AM – 2:00\u00a0PM',
  locationLine: 'Based in Dallas, TX, serving the greater Dallas–Fort Worth area',
};

/** Contact_Page Map_Embed, centered on Dallas, Texas (Req 22.1, 22.3, 22.5). No API key needed. */
export const contactMap: MapEmbedConfig = {
  placeholder: true,
  embedUrl: 'https://maps.google.com/maps?q=Dallas%2C%20TX&z=11&output=embed',
  openUrl: 'https://www.google.com/maps/search/?api=1&query=Dallas%2C%20TX',
  title: 'Map of Dallas, TX, home base of D&T Go Elite',
  label: 'Dallas, TX',
};
