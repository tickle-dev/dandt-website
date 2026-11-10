// Slug generation and validation (design.md, key algorithms; Req 2.11).

/** Pattern every Slug matches: a–z and 0–9 groups joined by single '-'. */
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Lowercases `name`, replaces each run of characters outside a–z and 0–9 with one '-',
 * and trims leading and trailing '-'. Non-ASCII letters (for example 'é') become
 * separators. "Kitchen & Bathroom Upgrades" → 'kitchen-bathroom-upgrades'.
 * Returns '' when `name` has no ASCII letter or digit.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** True when `s` is a well-formed Slug: /^[a-z0-9]+(-[a-z0-9]+)*$/. */
export function isValidSlug(s: string): boolean {
  return SLUG_PATTERN.test(s);
}
