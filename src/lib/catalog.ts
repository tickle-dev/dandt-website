// Service_Catalog construction and lookups (design.md, src/lib signatures; Req 2.3–2.11).

import type {
  CatalogInput,
  ServiceCatalog,
  ServiceCategory,
  ServiceItem,
} from '../content/types.ts';
import { isValidSlug, slugify } from './slug.ts';

/**
 * Derives the Slug of `name` and throws when it is empty (the name has no ASCII letter
 * or digit), so an invalid catalog fails at module load (Req 2.11).
 */
function requireSlug(name: string, what: string): string {
  const slug = slugify(name);
  if (!isValidSlug(slug)) {
    throw new Error(`Service catalog: ${what} "${name}" produces an empty or invalid slug.`);
  }
  return slug;
}

/**
 * Builds the Service_Catalog from the authored input. Categories and items keep their
 * input order, and an item name that appears in several categories is kept once in each
 * (Req 2.3, 2.4). Throws when a slug is empty, when two categories share a slug
 * (Req 2.7), or when two items in one category share a slug (Req 2.8).
 */
export function buildCatalog(input: CatalogInput): ServiceCatalog {
  const bySlug = new Map<string, ServiceCategory>();
  const categories: ServiceCategory[] = [];

  for (const categoryInput of input) {
    const slug = requireSlug(categoryInput.name, 'category');
    const existing = bySlug.get(slug);
    if (existing) {
      throw new Error(
        `Service catalog: categories "${existing.name}" and "${categoryInput.name}" share the slug "${slug}".`,
      );
    }

    const itemsBySlug = new Map<string, ServiceItem>();
    const items: ServiceItem[] = [];
    for (const itemInput of categoryInput.items) {
      const itemSlug = requireSlug(itemInput.name, `item in "${categoryInput.name}"`);
      const existingItem = itemsBySlug.get(itemSlug);
      if (existingItem) {
        throw new Error(
          `Service catalog: items "${existingItem.name}" and "${itemInput.name}" in "${categoryInput.name}" share the slug "${itemSlug}".`,
        );
      }
      const item: ServiceItem = {
        name: itemInput.name,
        slug: itemSlug,
        description: itemInput.description,
      };
      itemsBySlug.set(itemSlug, item);
      items.push(item);
    }

    const category: ServiceCategory = {
      name: categoryInput.name,
      slug,
      summary: categoryInput.summary,
      icon: categoryInput.icon,
      headerPhoto: categoryInput.headerPhoto,
      items,
    };
    bySlug.set(slug, category);
    categories.push(category);
  }

  return { categories, bySlug };
}

/**
 * Returns the category whose Slug equals `slug` exactly (case-sensitive, no trimming),
 * or `undefined` for any other value, including ''. Never throws (Req 2.9, 2.10).
 */
export function getCategoryBySlug(c: ServiceCatalog, slug: string): ServiceCategory | undefined {
  return c.bySlug.get(slug);
}

/**
 * Returns the item with Slug `itemSlug` in the category with Slug `categorySlug`
 * (both exact, case-sensitive), or `undefined` when either does not match (Req 2.9).
 */
export function getServiceItem(
  c: ServiceCatalog,
  categorySlug: string,
  itemSlug: string,
): ServiceItem | undefined {
  return getCategoryBySlug(c, categorySlug)?.items.find((item) => item.slug === itemSlug);
}
