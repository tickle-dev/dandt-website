// Pure layout helpers (design.md, src/lib signatures).
import type { ViewportCategory } from '../content/types.ts';

/** Distance below the viewport, in px, within which deferred images start loading (Req 16.15). */
export const IMAGE_LOAD_MARGIN = 1000;

/** Minimum widths, in px, of the tablet and desktop categories (matches the CSS breakpoints). */
export const TABLET_MIN_WIDTH = 768;
export const DESKTOP_MIN_WIDTH = 1024;

/**
 * True when an image whose top edge is `top` px from the viewport top should load now:
 * `top < viewportHeight + margin` (Req 16.14, 16.15).
 */
export function shouldLoadImage(top: number, viewportHeight: number, margin: number): boolean {
  return top < viewportHeight + margin;
}

/** `< 768` → mobile, `768–1023` → tablet, `>= 1024` → desktop. */
export function viewportCategory(width: number): ViewportCategory {
  if (width >= DESKTOP_MIN_WIDTH) return 'desktop';
  if (width >= TABLET_MIN_WIDTH) return 'tablet';
  return 'mobile';
}

/**
 * The Click_To_Call_Button is shown only on mobile, and only while neither the Mobile_Menu
 * nor the Project_Viewer is open (Req 24.1, 24.2, 24.7).
 */
export function isClickToCallVisible(
  v: ViewportCategory,
  menuOpen: boolean,
  viewerOpen: boolean,
): boolean {
  return v === 'mobile' && !menuOpen && !viewerOpen;
}

/**
 * Pixels to scroll by (`window.scrollBy(0, delta)`) so a focused element's rectangle is not
 * covered by the sticky Site_Header (`topInset`) or the Click_To_Call_Button (`bottomInset`)
 * (Req 15.5, 24.8). Negative scrolls up, 0 means already uncovered. Elements taller than the
 * free band are aligned to its top.
 */
export function computeFocusScrollDelta(
  rect: { top: number; bottom: number },
  viewportHeight: number,
  topInset: number,
  bottomInset: number,
): number {
  if (rect.top < topInset) return rect.top - topInset;
  const bandBottom = viewportHeight - bottomInset;
  if (rect.bottom > bandBottom) {
    // Align to the top instead when the element cannot fit in the free band.
    return Math.min(rect.bottom - bandBottom, rect.top - topInset);
  }
  return 0;
}
