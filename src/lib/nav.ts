// Navigation_Menu active-link state (design.md, Routes table and Property 4; Req 3.6, 3.7, 3.9).
import type { ActiveNav, NavKey } from '../content/types.ts';
import { ROUTES } from '../content/uiText.ts';

/** Exact Route_Path → nav key for the eight Navigation_Menu pages. Case-sensitive (Req 5.11). */
const KEY_BY_PATH: ReadonlyMap<string, NavKey> = new Map(
  (Object.entries(ROUTES) as [NavKey, string][]).map(([key, path]) => [path, key]),
);

const CATEGORY_PREFIX = `${ROUTES.services}/`;

/**
 * Returns the active Navigation_Menu link for `pathname` (router pathname, without the basename).
 * One trailing slash is ignored (Req 5.10) and matching is case-sensitive (Req 5.11).
 * - Exact match on one of the eight Route_Paths → `{ key, ariaCurrent: 'page' }` (Req 3.6).
 * - `/services/{slug}` with `isKnownCategory(slug)` true → `{ key: 'services', ariaCurrent: 'true' }` (Req 3.7).
 * - Anything else (unknown routes, unknown or case-changed slugs, deeper paths) → `null` (Req 3.9).
 */
export function getActiveNav(
  pathname: string,
  isKnownCategory: (slug: string) => boolean,
): ActiveNav | null {
  const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  const key = KEY_BY_PATH.get(path);
  if (key !== undefined) return { key, ariaCurrent: 'page' };

  if (path.startsWith(CATEGORY_PREFIX)) {
    const slug = path.slice(CATEGORY_PREFIX.length);
    if (slug !== '' && !slug.includes('/') && isKnownCategory(slug)) {
      return { key: 'services', ariaCurrent: 'true' };
    }
  }
  return null;
}
