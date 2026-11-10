// Text formatting helpers (design.md, src/lib signatures; Property 17). The wording lives in
// uiText.ts; these functions are the single call sites the components use.
import { copyrightLine, documentTitle } from '../content/uiText.ts';

/** Browser tab title: "{pageName} | D&T Go Elite" (Req 5.9). */
export function formatDocumentTitle(pageName: string): string {
  return documentTitle(pageName);
}

/** "© {year} D&T Go Elite Roofing and Construction. All rights reserved." (Req 12.7). */
export function formatCopyright(year: number): string {
  return copyrightLine(year);
}

/**
 * Result count announcement: "{n} {singular}" when `n === 1`, otherwise "{n} {plural}"
 * (Req 15.11). Pass a `RESULT_COUNTS` pair from uiText.ts, for example
 * `formatResultCount(3, RESULT_COUNTS.projects.singular, RESULT_COUNTS.projects.plural)`.
 */
export function formatResultCount(n: number, singular: string, plural: string): string {
  return `${n} ${n === 1 ? singular : plural}`;
}
