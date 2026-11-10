// Category filter shared by the Project_Filter and the Review_Filter
// (design.md, src/lib signatures; Req 10.3–10.7, 20.10, 20.12, 20.14).

import type { CategorySlug, ServiceCategoryName } from '../content/types.ts';
import { FILTER_LABELS } from '../content/uiText.ts';
import { slugify } from './slug.ts';

/** Id of the "All" option. No category slug can equal it. */
export const ALL = 'all' as const;

/**
 * One filter option: "All" or a Service_Category, identified by its Slug and labeled
 * with the exact category name. Structurally matches FilterButtons' FilterOption.
 */
export type FilterOption = { id: typeof ALL | CategorySlug; label: string };

/**
 * "All" first, then one option per category in `categoryOrder` (pass CATEGORY_NAMES
 * for Glossary order) that has at least one item. Categories with no items get no option.
 */
export function buildFilterOptions<T extends { category: ServiceCategoryName }>(
  items: readonly T[],
  categoryOrder: readonly ServiceCategoryName[],
): FilterOption[] {
  const present = new Set<ServiceCategoryName>(items.map((item) => item.category));
  const options: FilterOption[] = [{ id: ALL, label: FILTER_LABELS.all }];
  for (const name of categoryOrder) {
    if (present.has(name)) options.push({ id: slugify(name), label: name });
  }
  return options;
}

/**
 * Items shown for the selected option, in input order. `ALL` returns a copy of every
 * item; a category slug returns the items whose category has that slug.
 */
export function applyCategoryFilter<T extends { category: ServiceCategoryName }>(
  items: readonly T[],
  selected: FilterOption['id'],
): T[] {
  if (selected === ALL) return [...items];
  return items.filter((item) => slugify(item.category) === selected);
}
