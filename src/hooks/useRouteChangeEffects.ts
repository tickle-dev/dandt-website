// Side effects of the Router displaying a different page (design.md, Route change effects;
// Req 4.9, 15.10). Call it from a component rendered inside the layout providers and the router.
import { useEffect, useRef, type Dispatch } from 'react';
import { useLocation } from 'react-router';
import type { MenuEvent } from '../lib/menuState.ts';

/**
 * On every pathname change after the first render (link selection, browser back or forward):
 * focuses the new page's `main h1` (each has `tabIndex={-1}`) with `preventScroll: true`, so
 * `ScrollRestoration` keeps control of the scroll position, and dispatches `ROUTE_CHANGE` so the
 * Mobile_Menu closes.
 *
 * Only a pathname change counts as a different page: a change to just the query string or hash
 * keeps focus where it is. The first render is skipped, so a fresh page load leaves focus at
 * the document start (the menu already starts closed).
 */
export function useRouteChangeEffects(dispatchMenu: Dispatch<MenuEvent>): void {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    // Passive effects run after the whole commit, so the new page's h1 is already in the DOM.
    document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true });
    dispatchMenu({ type: 'ROUTE_CHANGE' });
  }, [pathname, dispatchMenu]);
}
