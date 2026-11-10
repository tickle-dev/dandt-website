// Service_Filter logic for the Services_Page (design.md, src/lib signatures and key
// algorithms; Req 7.3–7.8, 7.11, 11.5).

import type { FilteredCategory, ServiceCategory } from '../content/types.ts';

/** Maximum length of the Service_Filter text (Req 7.11). */
export const SERVICE_FILTER_MAX = 100;

/**
 * Returns the prefix of `value` of length `min(value.length, max)`, so over-long typed or
 * pasted text is silently cut (Req 7.11, 11.5). Length is counted in UTF-16 code units,
 * the same unit as `String.prototype.length` and the HTML `maxLength` attribute. A
 * negative `max` is treated as 0.
 */
export function clampLength(value: string, max: number): string {
  const limit = Math.max(0, max);
  return value.length <= limit ? value : value.slice(0, limit);
}

/** Trims leading and trailing whitespace and lowercases the filter text (Req 7.3, 7.7). */
export function normalizeQuery(raw: string): string {
  return raw.trim().toLowerCase();
}

/**
 * Filters the catalog by Service_Item name.
 *
 * - An empty or whitespace-only query returns every category with all of its items
 *   (Req 7.7).
 * - Otherwise an item matches when its lowercased name contains the normalized query as a
 *   literal substring; no character, including `&`, `/`, `.`, `-` or regex
 *   metacharacters, has a special meaning (Req 7.3).
 * - Categories with no matching item are dropped; kept categories carry their full
 *   metadata (Req 7.4, 7.8).
 * - Categories and items keep catalog order, and an item listed in several categories is
 *   checked independently in each, so it appears in every matching section and at most
 *   once per section (Req 7.5). Filtering an already-filtered result with the same query
 *   gives the same result (Req 7.6).
 *
 * Pure: the input is not modified, and each returned `items` array is a new array.
 */
export function filterCatalog(
  categories: readonly ServiceCategory[],
  raw: string,
): FilteredCategory[] {
  const q = normalizeQuery(raw);

  if (q === '') {
    return categories.map((category) => ({ category, items: category.items.slice() }));
  }

  const result: FilteredCategory[] = [];
  for (const category of categories) {
    const items = category.items.filter((item) => item.name.toLowerCase().includes(q));
    if (items.length > 0) {
      result.push({ category, items });
    }
  }
  return result;
}
