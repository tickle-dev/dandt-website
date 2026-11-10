// FAQ_Page Placeholder_Content (design.md, Data Models: FaqContent; Page layouts: FAQ).
// Groups render in this order as h2 sections, and `faq.flatMap(g => g.items)` is the
// FAQ_Item order (Req 19.2). Every Req 19.4 topic has an item whose `topic` names it.
// The customer must confirm the licensing and insurance, warranty, permit and payment
// answers before launch. The payment answer names method types only, with no provider,
// fee or rate, and no item offers deferred or split payment (Req 19.5).

import type { FaqContent } from './types.ts';

export const faq: FaqContent = [
  {
    id: 'estimates-and-scheduling',
    title: 'Estimates and scheduling',
    items: [
      {
        placeholder: true,
        id: 'free-estimates',
        topic: 'free-estimates',
        question: 'Do you offer free estimates?',
        answer: [
          'Yes. Every estimate is free and comes with no obligation, and most include an on-site visit to measure and look at the work area. You receive a written estimate that lists the scope, price and expected timeline.',
        ],
      },
      {
        placeholder: true,
        id: 'start-date',
        topic: 'other',
        question: 'How soon can you start my project?',
        answer: [
          'We usually schedule the estimate visit within a few business days of your request. Start dates depend on the season and the trade crew’s schedule, and we confirm a date with you before any materials are ordered.',
        ],
      },
      {
        placeholder: true,
        id: 'project-timelines',
        topic: 'timelines',
        question: 'What is the typical timeline for a project?',
        answer: [
          'Timelines depend on the trade and the size of the job. Most roof replacements take one to two days, while a kitchen or bathroom remodel usually takes three to six weeks. Your written estimate includes an expected timeline, and we tell you right away if weather or material delays change it.',
        ],
      },
      {
        placeholder: true,
        id: 'licensing-insurance',
        topic: 'licensing-insurance',
        question: 'Are you licensed and insured?',
        answer: [
          'Yes. D&T Go Elite carries liability insurance and workers’ compensation coverage, and our crews hold the licenses their trades require in Texas. We can send proof of insurance before your project begins.',
        ],
      },
    ],
  },
  {
    id: 'roofing-and-storm-damage',
    title: 'Roofing and storm damage',
    items: [
      {
        placeholder: true,
        id: 'storm-damage-claims',
        topic: 'storm-damage-claims',
        question: 'Can you help with roof storm damage and insurance claims?',
        answer: [
          'Yes. Our roofing crew inspects your roof for hail and wind damage and records what it finds with photos and measurements. We can meet your insurance adjuster on site to walk through the damage, while you stay in charge of your claim. You receive a written estimate whether or not you file a claim.',
        ],
      },
      {
        placeholder: true,
        id: 'after-a-hailstorm',
        topic: 'other',
        question: 'What should I do right after a hailstorm?',
        answer: [
          'Check your ceilings for leaks and take photos of any visible damage, but stay off the roof. Then contact us to schedule a free roof inspection, and our roofing crew can cover any opening with a temporary tarp until repairs begin.',
        ],
      },
      {
        placeholder: true,
        id: 'warranties',
        topic: 'warranties',
        question: 'Do you offer warranties on your work?',
        answer: [
          'Yes. We back our workmanship with a written warranty, and its length depends on the type of work. Shingles, flooring and other products also carry the manufacturer’s warranty, and we register those warranties for you where the manufacturer allows it.',
        ],
      },
      {
        placeholder: true,
        id: 'permits',
        topic: 'permits',
        question: 'Do I need a permit, and will you get it for me?',
        answer: [
          'Many projects, including roof replacements, additions and some remodels, need a permit from your city. When a permit is required, we apply for it, schedule the city inspections and include the permit cost in your estimate.',
        ],
      },
    ],
  },
  {
    id: 'during-your-project',
    title: 'During your project',
    items: [
      {
        placeholder: true,
        id: 'homeowner-present',
        topic: 'homeowner-present',
        question: 'Do I need to be home while the work is done?',
        answer: [
          'No, you do not need to be home for most of the work. We ask that someone is there at the start of the first day to walk through the plan and that the crew has access to the work area, power and water. Your crew lead keeps you updated by phone or text.',
        ],
      },
      {
        placeholder: true,
        id: 'who-does-the-work',
        topic: 'other',
        question: 'Who will be working at my home?',
        answer: [
          'Each job goes to the crew trained for that trade, so our roofing crew handles your roof and our tile team sets your tile. A crew lead stays on site for the job and is your day-to-day contact.',
        ],
      },
      {
        placeholder: true,
        id: 'several-projects',
        topic: 'other',
        question: 'Can you handle several projects at the same home?',
        answer: [
          'Yes. If you want a new roof, fresh exterior paint and a new fence, we schedule each trade’s crew in a sensible order and give you one point of contact for the whole project.',
        ],
      },
      {
        placeholder: true,
        id: 'job-site-cleanup',
        topic: 'cleanup',
        question: 'How do you handle job-site cleanup?',
        answer: [
          'Our crews protect floors, furniture and landscaping while they work and tidy the work area at the end of each day. When the job is done, we haul away debris and old materials, and on roofing jobs our roofing crew sweeps the yard and driveway with a magnet for loose nails.',
        ],
      },
    ],
  },
  {
    id: 'payment-and-service-area',
    title: 'Payment and service area',
    items: [
      {
        placeholder: true,
        id: 'payment-methods',
        topic: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer: [
          'We accept cash, check and credit or debit card. The payment terms for your project are listed in your written estimate before any work begins.',
        ],
      },
      {
        placeholder: true,
        id: 'service-area',
        topic: 'service-area',
        question: 'What is your service area?',
        answer: [
          'We are based in Dallas, Texas, and serve homes across the greater Dallas–Fort Worth area, including Plano, Frisco, Arlington and Fort Worth. See the full list of cities on our ',
          { type: 'link', to: '/service-areas', text: 'Service Areas page' },
          '. If your city is not listed, contact us, and we will let you know whether we can help.',
        ],
      },
    ],
  },
];
