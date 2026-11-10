// Social_Links Placeholder_Content (Req 23.1, 23.3): exactly one `https://` URL per platform,
// in display order. The Footer and the Contact_Page both read this list, so changing an entry
// updates both. Replace each platform home page with the company's profile URL.

import type { SocialLink } from './types.ts';

export const social: readonly SocialLink[] = [
  { placeholder: true, platform: 'Facebook', url: 'https://www.facebook.com/' },
  { placeholder: true, platform: 'Instagram', url: 'https://www.instagram.com/' },
  { placeholder: true, platform: 'Google Business Profile', url: 'https://www.google.com/business/' },
  { placeholder: true, platform: 'Nextdoor', url: 'https://nextdoor.com/' },
];
