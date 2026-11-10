// Home_Page Placeholder_Content (design.md, Data Models: HomeContent; Page layouts: Home).
// The customer replaces or confirms each value. Brand_Voice (Req 27): "elite" appears here
// only inside the company name, and the hero shows no Tagline (Req 27.2, 27.5).

import type { HomeContent } from './types.ts';

export const home: HomeContent = {
  placeholder: true,
  hero: {
    /** Contains "D&T Go Elite" and speaks to the whole home, not one trade (Req 6.1). */
    headline: 'D&T Go Elite: built for Texas weather, inside and out',
    /** One sentence, ≤160 chars: storm-ready roofing plus interior and outdoor work, a specialist crew per trade (Req 6.1). */
    sentence:
      'From storm-ready roofs to kitchens, floors and backyard decks, every job goes to the specialist crew for that trade.',
    photo: 'home-hero',
    alt: 'Roofing crew installing new asphalt shingles on a suburban Dallas–Fort Worth home',
  },
  /**
   * "Why Choose D&T Go Elite" (Req 6.4, 27.7): exactly one highlight names the crews for each
   * trade; the other three avoid "specialist", "specialized", "team" and "crew".
   */
  highlights: [
    {
      icon: 'HardHat',
      title: 'A Crew for Every Trade',
      text: 'Your roof goes to our roofing crew, your tile to our tile team, and each other job to the specialists for that trade.',
    },
    {
      icon: 'ClipboardCheck',
      title: 'Clear Written Estimates',
      text: 'You get a free, itemized estimate in writing before any work begins, so the scope and price are settled up front.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Insured and Permitted',
      text: 'Every project is covered by liability insurance and the permits your city requires.',
    },
    {
      icon: 'MessageSquare',
      title: 'Updates at Every Step',
      text: 'One point of contact keeps you informed by phone or text from your first call to the final walkthrough.',
    },
  ],
  /**
   * "How It Works", in the fixed order of Req 6.5. The third step matches the project with the
   * specialist crew for its trade (Req 27.8).
   */
  steps: [
    {
      title: 'Request a Quote',
      text: 'Tell us about your project through the quote form or by phone, and we will reply within one business day.',
    },
    {
      title: 'On-Site Estimate',
      text: 'A lead from the crew for your trade, such as our roofing crew or tile team, inspects the work area and writes up your estimate.',
    },
    {
      title: 'Scheduling and Work',
      text: 'We set a start date that suits you and match your project with the specialist crew for that trade, who carry out the work to the agreed plan.',
    },
    {
      title: 'Final Walkthrough',
      text: 'The crew lead for your trade walks the finished work with you, checks each detail against the estimate and leaves the site clean.',
    },
  ],
  /** Closing CTA banner above the Footer (Req 6.8). */
  closing: {
    heading: 'Ready to start your project?',
    text: 'Request a free, no-obligation estimate for roofing, remodeling or outdoor work anywhere in the Dallas–Fort Worth area.',
  },
};
