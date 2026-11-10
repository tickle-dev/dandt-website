// Mobile_Menu open/closed state machine (design.md, Property 5; Req 4.2–4.9).
import type { ViewportCategory } from '../content/types.ts';

export type MenuEvent =
  | { type: 'TOGGLE' }
  | { type: 'CLOSE' }
  | { type: 'ROUTE_CHANGE' }
  | { type: 'VIEWPORT_CHANGE'; to: ViewportCategory };

/** The Mobile_Menu starts closed on every page load. */
export const INITIAL_MENU_OPEN = false;

/**
 * Next open state of the Mobile_Menu (`true` = open).
 * - `TOGGLE` inverts the state (Req 4.3, 4.4).
 * - `CLOSE` (Escape, link activation) and `ROUTE_CHANGE` close it (Req 4.7, 4.9).
 * - `VIEWPORT_CHANGE` to `desktop` closes it; to `mobile` or `tablet` keeps the state (Req 4.8).
 */
export function menuReducer(open: boolean, e: MenuEvent): boolean {
  switch (e.type) {
    case 'TOGGLE':
      return !open;
    case 'CLOSE':
    case 'ROUTE_CHANGE':
      return false;
    case 'VIEWPORT_CHANGE':
      return e.to === 'desktop' ? false : open;
  }
}
