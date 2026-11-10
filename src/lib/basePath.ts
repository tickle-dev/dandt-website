// Build-time Base_Path handling (Req 25.7, 25.9).
// Used by vite.config.ts (node) and by the app (browser), so this file must
// stay free of DOM-only and node-only APIs.

/**
 * Normalizes the raw BASE_PATH environment value into a Vite `base`.
 * - unset or '' → '/'
 * - starts and ends with '/' → returned unchanged
 * - anything else → throws, so `vite build` fails before writing output
 */
export function resolveBasePath(raw: string | undefined): string {
  if (raw === undefined || raw === '') return '/';
  if (raw.startsWith('/') && raw.endsWith('/')) return raw;
  throw new Error(
    `Invalid BASE_PATH "${raw}": it must start and end with "/" (for example "/my-repository/").`,
  );
}

/** Converts a Vite base ('/repo/' or '/') into a React Router basename ('/repo' or '/'). */
export function routerBasename(base: string): string {
  return base.replace(/\/$/, '') || '/';
}
