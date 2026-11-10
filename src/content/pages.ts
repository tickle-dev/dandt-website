// Page-header intros and closing CTA banners (design.md, Data Models: PageIntros,
// ClosingBanners; Page layouts). All text here is Placeholder_Content that the customer
// replaces or confirms; the Record types have no `placeholder` field, so this comment is the
// placeholder label for the module (Req 16.11). Brand_Voice (Req 27.5, 27.6): no "elite"
// outside the company name. Home's banner is HomeContent.closing.

import { about } from './about.ts';
import { serviceAreas } from './serviceAreas.ts';
import type { ClosingBanners, PageIntros } from './types.ts';

/**
 * One-line intro under each page h1. Each intro is written once: `about` comes from
 * AboutContent.intro, and `serviceAreas` comes from ServiceAreasContent.intro.
 */
export const pageIntros: PageIntros = {
  services:
    'Browse seven categories of home improvement work, with a dedicated crew for each trade across the Dallas–Fort Worth area.',
  projects:
    'Browse recent roofing, kitchen, flooring and outdoor living projects from homes across the Dallas–Fort Worth area.',
  reviews: 'Read what homeowners across the Dallas–Fort Worth area say about working with D&T Go Elite.',
  serviceAreas: serviceAreas.intro,
  faq: 'Find answers about estimates, storm damage, scheduling, payment and the areas we serve.',
  about: about.intro,
  contact: 'Tell us about your project, and we will reply within one business day to set up your free estimate.',
};

/** Black, centered closing CTA banner per page; the FAQ heading is fixed (Req 19.14). */
export const closingBanners: ClosingBanners = {
  services: {
    heading: 'Have a project in mind?',
    text: 'Tell us what you need, and we will connect you with the specialist crew for that trade.',
  },
  projects: {
    heading: 'Planning a project like these?',
    text: 'Send us a few details, and we will set up a free on-site estimate at a time that suits you.',
  },
  reviews: {
    heading: 'Ready to start your own project?',
    text: 'Request a free estimate, and we will reply within one business day.',
  },
  faq: {
    heading: 'Still have questions?',
    text: 'Send us your question or project details, and we will get back to you within one business day.',
  },
  about: {
    heading: 'Let’s talk about your home',
    text: 'Request a free estimate, and we will match your project with the crew for its trade.',
  },
};
