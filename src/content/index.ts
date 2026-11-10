// Content_Module entry point (design.md, Architecture and Data Models; Req 16.11, 16.12, 22.3, 23.3).
// Pages and components import content only from here.

// Types and the runtime constants that live beside them (CATEGORY_NAMES, FIELD_LIMITS).
export * from './types.ts';

// Content data.
export { catalog } from './serviceCatalog.ts';
export { projects } from './projects.ts';
export { reviews } from './reviews.ts';
export { faq } from './faq.ts';
export { serviceAreas } from './serviceAreas.ts';
export { about } from './about.ts';
export { home } from './home.ts';
export { contact, contactMap } from './contact.ts';
export { social } from './social.ts';
export { site } from './site.ts';
export { pageIntros, closingBanners } from './pages.ts';

// Fixed UI text: flat named exports (e.g. `import { CTA_LABELS } from '../content/index.ts'`)
// and the same values as a `uiText` namespace (e.g. `uiText.CTA_LABELS`).
export * from './uiText.ts';
export * as uiText from './uiText.ts';
