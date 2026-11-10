// About_Page Placeholder_Content (design.md, Data Models: AboutContent; Page layouts: About).
// The customer replaces or confirms each value. Brand_Voice (Req 27.10): the story has one
// sentence about each trade's own trained specialist team and exactly one sentence about an
// elite standard of workmanship, which is the About_Page's single permitted "elite". The
// intro, values, stats and service area text contain no "elite" outside the company name.

import type { AboutContent } from './types.ts';

export const about: AboutContent = {
  placeholder: true,
  /** Page-header intro under the h1; also the `about` entry of `pageIntros`. */
  intro: 'D&T Go Elite is a Dallas, Texas home improvement company with a trained crew for each trade.',
  /** "Our Story": 2–3 paragraphs of 2–5 sentences (Req 9.1, 27.10). */
  story: [
    'D&T Go Elite started in Dallas, Texas with one roofing crew repairing storm and hail damage on homes across the Dallas–Fort Worth area. As homeowners asked for help with fences, kitchens, floors and decks, the company grew to cover the whole house, inside and out.',
    'Each trade has its own trained specialist team, from our roofing crew to our tile, paint and carpentry teams. Every crew lead has years of experience in a single trade and trains new crew members on the job. That focus is how we hold every project to an elite standard of workmanship, down to the last shingle, tile joint and trim line.',
    'Today D&T Go Elite is still based in Dallas and serves homeowners throughout the greater Dallas–Fort Worth area. We give clear written estimates, keep you informed at each stage and treat your home with care.',
  ],
  photo: 'about',
  alt: 'Carpentry crew framing a home addition on a residential job site in the Dallas area',
  /** "Our Values": 3–6, titles ≤5 words, one sentence each; one names trade expertise (Req 9.2, 27.11). */
  values: [
    {
      title: 'Specialists in Every Trade',
      description: 'Each job goes to the crew trained for that trade, from roofing and siding to tile and outdoor living.',
    },
    {
      title: 'Honest Estimates',
      description: 'We put the scope, price and timeline in writing before any work begins.',
    },
    {
      title: 'Respect for Your Home',
      description: 'We protect your floors and landscaping and tidy the work area at the end of each day.',
    },
    {
      title: 'Clear Next Steps',
      description: 'You always know who to call, what happens next and when each stage of your project will start.',
    },
  ],
  /** Stats band (Req 9.3); the radius figure is shown as "{n} mi" by uiText.radiusStatValue. */
  stats: {
    yearsInBusiness: '10+',
    projectsCompleted: '500+',
    satisfaction: '98%',
    serviceRadiusMiles: 50,
  },
  /** Req 9.4; `{radius}` is filled from stats.serviceRadiusMiles, so both always match. */
  serviceArea: {
    heading: 'Serving the Greater Dallas–Fort Worth Area from Dallas, TX',
    text: 'From our base in Dallas, TX, we serve homes across the greater Dallas–Fort Worth area within {radius} miles of the city.',
  },
};
