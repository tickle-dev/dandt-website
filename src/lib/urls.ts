// URL helpers for Social_Links, the map embed and telephone links (design.md, Properties 16, 23, 24).
import type { SocialLink } from '../content/types.ts';

/**
 * True when `url` begins with `https://` and parses as an absolute URL with protocol `https:`.
 * Empty or missing values, `#`, relative paths, `http://` and other schemes are false
 * (Req 22.10, 23.3, 23.7).
 */
export function isHttpsUrl(url: string | undefined): boolean {
  if (url === undefined || !url.startsWith('https://')) return false;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * `tel:` href for a US display phone number: the digits prefixed with `+1`.
 * '(214) 555-0123' → 'tel:+12145550123'. A leading country code 1 in an 11-digit
 * number is not repeated (Req 11.2, 24.3).
 */
export function toTelHref(displayPhone: string): string {
  const digits = displayPhone.replace(/\D/g, '');
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return `tel:+1${national}`;
}

/** The Social_Links entries with a valid `https://` URL, in their original order (Req 23.7, 23.8). */
export function visibleSocialLinks(links: readonly SocialLink[]): SocialLink[] {
  return links.filter((link) => isHttpsUrl(link.url));
}
