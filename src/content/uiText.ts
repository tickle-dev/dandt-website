// Fixed product copy (design.md, Architecture): UI labels that the requirements specify
// verbatim or that every page shares. This is not Placeholder_Content, so nothing here is
// flagged `placeholder: true`; it lives in the Content_Module so that no layout code holds
// copy (Req 16.11). Brand_Voice (Req 27.4, 27.6, 27.12, 27.14): "elite" appears here only
// inside the company name, and none of the banned phrases, superlatives or exclamation marks
// are used.
//
// Templates are small functions so callers never build these strings by hand.
// src/lib/text.ts and src/lib/quoteForm.ts import from this file instead of repeating it.

import type { NavKey, SocialPlatform } from './types.ts';

// ---- Company name ----

export const COMPANY_NAME = 'D&T Go Elite';
export const COMPANY_FULL_NAME = 'D&T Go Elite Roofing and Construction';

// ---- Route_Paths (Req 3.3, 5.1) ----

export const ROUTES = {
  home: '/',
  services: '/services',
  projects: '/projects',
  reviews: '/reviews',
  serviceAreas: '/service-areas',
  faq: '/faq',
  about: '/about',
  contact: '/contact',
} as const satisfies Record<NavKey, string>;

/** `/services/{slug}` (Req 2.9, 8.4). */
export const categoryPath = (slug: string): string => `${ROUTES.services}/${slug}`;
/** `/contact?service={slug}`, read by the Quote_Form for preselection (Req 8.3, 11.6). */
export const quotePath = (slug: string): string => `${ROUTES.contact}?service=${slug}`;

// ---- Navigation_Menu (Req 3.3, 12.3) ----

export const NAV_LABELS = {
  home: 'Home',
  services: 'Services',
  projects: 'Projects',
  reviews: 'Reviews',
  serviceAreas: 'Service Areas',
  faq: 'FAQ',
  about: 'About',
  contact: 'Contact',
} as const satisfies Record<NavKey, string>;

/** The eight page links in display order, shared by the Site_Header and the Footer. */
export const NAV_ITEMS: readonly { key: NavKey; label: string; to: string }[] = (
  ['home', 'services', 'projects', 'reviews', 'serviceAreas', 'faq', 'about', 'contact'] as const
).map((key) => ({ key, label: NAV_LABELS[key], to: ROUTES[key] }));

// ---- Document titles (Req 5.9) ----

/** Page names passed to `usePageTitle`; a category page uses the category name instead. */
export const PAGE_NAMES = {
  home: 'Home',
  services: 'Services',
  projects: 'Projects',
  reviews: 'Reviews',
  serviceAreas: 'Service Areas',
  faq: 'FAQ',
  about: 'About',
  contact: 'Contact',
  notFound: 'Page Not Found',
} as const;

/** "{Page Name} | D&T Go Elite" */
export const documentTitle = (pageName: string): string => `${pageName} | ${COMPANY_NAME}`;

// ---- Page h1 texts ----
// Home's h1 is HomeContent.hero.headline, a category page's h1 is the category name, and the
// Not_Found_Page h1 is SiteContent.notFound.heading.

export const PAGE_HEADINGS = {
  services: 'Our Services',
  projects: 'Our Projects',
  reviews: 'Customer Reviews',
  serviceAreas: 'Service Areas',
  faq: 'Frequently Asked Questions',
  about: 'About D&T Go Elite',
  contact: 'Get a Free Quote',
} as const;

// ---- Section h2 texts ----

export const SECTION_HEADINGS = {
  homeServices: 'Our Services',
  whyChoose: 'Why Choose D&T Go Elite',
  howItWorks: 'How It Works',
  reviewPreview: 'What DFW Homeowners Say',
  whatWeDo: 'What We Do',
  exploreOtherServices: 'Explore Other Services',
  ourStory: 'Our Story',
  ourValues: 'Our Values',
} as const;

// ---- Call_To_Action and link labels ----

export const CTA_LABELS = {
  getQuote: 'Get a Free Quote',
  viewServices: 'View Our Services',
  readAllReviews: 'Read All Reviews',
  leaveReview: 'Leave a Review',
  openInGoogleMaps: 'Open in Google Maps',
  describeProject: 'Describe Your Project',
  explore: 'Explore',
  seeAllServiceAreas: 'See all service areas',
  /** Header CTA label on a Mobile_Viewport, where "Get a Free Quote" does not fit beside the logo. */
  getQuoteShort: 'Free Quote',
  /** Not_Found_Page text links (Req 5.7). */
  notFoundHome: 'Go to the home page',
  notFoundServices: 'Browse our services',
} as const;

/** "Request a Quote for {Service_Category name}" (Req 8.3). */
export const requestQuoteFor = (categoryName: string): string => `Request a Quote for ${categoryName}`;
/** Services_Page link from each category section to its Service_Category_Page (Req 7.2). */
export const viewCategory = (categoryName: string): string => `View ${categoryName}`;

/** Alt text of a Service_Category_Page header photo; contains the category name (Req 8.1). */
export const categoryHeaderAlt = (categoryName: string): string => `Example of ${categoryName} work`;

/** Breadcrumb trail labels: Home › Services › {name} (Req 8.5). */
export const BREADCRUMB = {
  home: NAV_LABELS.home,
  services: NAV_LABELS.services,
  separator: '›',
} as const;

// ---- About_Page stats band labels (Req 9.3) ----

export const STAT_LABELS = {
  yearsInBusiness: 'Years in business',
  projectsCompleted: 'Projects completed',
  satisfaction: 'Customer satisfaction',
  serviceRadiusMiles: 'Service radius',
} as const;

/** Stats band figure for the radius, e.g. "50 mi"; the other three figures are shown as stored. */
export const radiusStatValue = (miles: number): string => `${miles} mi`;

// ---- Service_Filter (Req 7) ----

export const SERVICE_FILTER = {
  label: 'Search services',
  clear: 'Clear search',
} as const;

/** No-match message (Req 7.8); also announced through the live region (Req 15.11). */
export const noServicesMatch = (query: string): string => `No services match “${query}”.`;
/** Supporting line under the no-match message, before "Describe Your Project". */
export const NO_MATCH_HINT = 'Tell us about your project and we will follow up within one business day.';

// ---- Result counts announced through live regions (Req 15.11) ----
// Used as `formatResultCount(n, singular, plural)` in src/lib/text.ts, which returns
// `${n} ${n === 1 ? singular : plural}`, e.g. "1 service matches your search", "4 projects shown".

export const RESULT_COUNTS = {
  services: { singular: 'service matches your search', plural: 'services match your search' },
  projects: { singular: 'project shown', plural: 'projects shown' },
  reviews: { singular: 'review shown', plural: 'reviews shown' },
} as const;

// ---- Filters (Req 10.3, 20.10) ----

export const FILTER_LABELS = {
  /** First option of every Project_Filter and Review_Filter. */
  all: 'All',
  /** `aria-label` of each filter's `role="group"`. */
  projects: 'Filter projects by service category',
  reviews: 'Filter reviews by service category',
} as const;

// ---- Ratings (Req 20.5, 20.8, 20.17) ----

/** Visually hidden text beside the stars: "Rated {rating} out of 5 stars". */
export const ratedOutOf5 = (rating: number): string => `Rated ${rating} out of 5 stars`;
/** Rating_Summary average line: "{average} out of 5"; the label after the large figure is OUT_OF_5. */
export const averageOutOf5 = (averageText: string): string => `${averageText} out of 5`;
export const OUT_OF_5 = 'out of 5';
/** "Based on 1 review" | "Based on {count} reviews". */
export const basedOnReviews = (count: number): string =>
  `Based on ${count} ${count === 1 ? 'review' : 'reviews'}`;
/** Live-region text after a Review_Filter change, e.g. "4.3 out of 5. Based on 6 reviews." */
export const ratingAnnouncement = (averageText: string, countText: string): string =>
  `${averageOutOf5(averageText)}. ${countText}.`;

// ---- Quote_Form (Req 11.3, 11.4) ----

export const FORM_LABELS = {
  fullName: 'Full name',
  email: 'Email address',
  phone: 'Phone number',
  service: 'Service category',
  details: 'Project details',
  contactMethod: 'Preferred contact method',
  contactMethodEmail: 'Email',
  contactMethodPhone: 'Phone',
  /** Text of the empty first `<option>`; the field starts with no selection (Req 11.3). */
  servicePlaceholder: 'Select a service category',
  /** The eighth option after the seven Service_Categories (value 'other'). */
  serviceOther: 'Other / Not sure',
  /** Shown after the phone label, which is the only optional text field. */
  optional: '(optional)',
  /** Visible required indicator; REQUIRED_SR_TEXT is its screen-reader text. */
  requiredMarker: '*',
  submit: 'Send Quote Request',
} as const;

export const REQUIRED_SR_TEXT = 'required';

/** Form_Validator messages (Req 11.9–11.14). */
export const ERRORS = {
  fullName: 'Please enter your name',
  email: 'Please enter a valid email address',
  phoneFormat: 'Please enter a 10-digit phone number',
  phoneRequired: 'Please enter a phone number so we can call you',
  service: 'Please choose a service category',
  details: 'Please tell us a bit more about your project (at least 20 characters)',
} as const;

/** Confirmation_Message: thanks the visitor by the trimmed full name (Req 11.18). */
export const confirmationMessage = (trimmedName: string): string =>
  `Thank you, ${trimmedName}. We received your quote request, and ${COMPANY_NAME} will respond within one business day.`;

// ---- Contact details labels (Contact_Page panel and Footer) ----

export const CONTACT_LABELS = {
  heading: 'Contact Details',
  phone: 'Phone',
  email: 'Email',
  hours: 'Hours',
  location: 'Location',
} as const;

// ---- Footer (Req 12) ----

/** Column labels; styled text, not headings. */
export const FOOTER_LABELS = {
  pages: 'Pages',
  services: 'Services',
  contact: 'Contact',
} as const;

/** "© {current year} D&T Go Elite Roofing and Construction. All rights reserved." (Req 12.7) */
export const copyrightLine = (year: number): string =>
  `© ${year} ${COMPANY_FULL_NAME}. All rights reserved.`;

// ---- Skip link (Req 15.3) ----

export const SKIP_LINK = 'Skip to main content';

// ---- Accessible names and announcements ----

export const A11Y = {
  /** Header_Logo link (Req 3.2, 17.9); the image itself has alt="". */
  headerLogoLink: `${COMPANY_FULL_NAME} – Home`,
  /** Footer Logo image alt (Req 17.8). */
  footerLogoAlt: COMPANY_FULL_NAME,
  mainNav: 'Main',
  footerPagesNav: 'Footer pages',
  footerServicesNav: 'Footer services',
  breadcrumb: 'Breadcrumb',
  /** Tab_Bar More tab label and the accessible name of the sheet it opens (Req 4.2, 4.4). */
  more: 'More',
  morePages: 'More pages',
  previousProject: 'Previous project',
  nextProject: 'Next project',
  closeViewer: 'Close project viewer',
  /** Visually hidden suffix on links with target="_blank" (Req 20.15, 22.7). */
  opensInNewTab: '(opens in a new tab)',
  /** Visible Click_To_Call_Button label (Req 24.3). */
  call: 'Call',
} as const;

/** Project_Card button: "{title}, view larger photo" (Req 21.1). */
export const viewLargerPhoto = (title: string): string => `${title}, view larger photo`;
/** Project_Viewer live-region text after next or previous (Req 21.6). */
export const showingProject = (title: string): string => `Showing ${title}`;
/** Social_Links item: "D&T Go Elite on {platform name} (opens in a new tab)" (Req 23.2). */
export const socialLinkLabel = (platform: SocialPlatform): string =>
  `${COMPANY_NAME} on ${platform} ${A11Y.opensInNewTab}`;
/** Click_To_Call_Button accessible name: "Call D&T Go Elite at (214) 555-0123" (Req 24.3). */
export const callLabel = (displayPhone: string): string => `${A11Y.call} ${COMPANY_NAME} at ${displayPhone}`;
