// Site-wide Placeholder_Content (design.md, Data Models: SiteContent). The customer replaces
// or confirms each value. Brand_Voice (Req 27): outside the company name, "elite" appears only
// in the Tagline, which the Footer shows and nothing else does (Req 27.1, 27.2).

import type { SiteContent } from './types.ts';

export const site: SiteContent = {
  placeholder: true,
  /** Proposed by us; the company has no official slogan, so the customer may keep, change or drop it. */
  tagline: 'Elite teams. Elite results.',
  /** One sentence, ends with a period, ≤160 chars, names the Dallas–Fort Worth area (Req 12.2). */
  footerDescription:
    'We handle roofing, remodeling and outdoor projects for homes across the Dallas–Fort Worth area, with dedicated crews for every trade.',
  /** Footer notice on every page, including the Not_Found_Page (Req 1.6). */
  conceptNotice:
    'Concept demo: this website is a non-production concept, and its contact details, reviews and photos are placeholder content.',
  /** Shown above the Rating_Summary and above the Review_Preview cards (Req 20.7). */
  reviewSampleNotice: 'The reviews shown here are sample placeholder content for this concept demo.',
  /** "Leave a Review" target (Req 20.15); replace with the company's Google review link. */
  leaveReviewUrl:
    'https://www.google.com/maps/search/?api=1&query=D%26T%20Go%20Elite%20Roofing%20and%20Construction',
  /** Not_Found_Page h1 and sentence; the page adds the Home and Services links (Req 5.7). */
  notFound: {
    heading: 'Page not found',
    text: 'We could not find the page you asked for, but the links below will take you back to the rest of the site.',
  },
};
