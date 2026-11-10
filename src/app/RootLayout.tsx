// Layout shell for every route (design.md, RootLayout row and Runtime composition;
// Req 3.1, 4.1, 5.2, 5.8, 12.1, 15.1, 15.3, 15.5, 24.5).
import { useEffect, useRef, type RefObject } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { Footer } from '../components/Footer/Footer.tsx';
import { SiteHeader } from '../components/SiteHeader/SiteHeader.tsx';
import { MAIN_ID, SkipLink } from '../components/SkipLink/SkipLink.tsx';
import { TabBar } from '../components/TabBar/TabBar.tsx';
import { computeFocusScrollDelta } from '../lib/layout.ts';
import { LayoutProvider } from './layoutContext.tsx';
import { RouteChangeEffects } from './RouteChangeEffects.tsx';
import styles from './RootLayout.module.css';

/**
 * One header, main and footer landmark on every page, the Not_Found_Page included (Req 15.1).
 * The Site_Header and Footer stay mounted while the Outlet swaps pages (Req 5.2), and
 * ScrollRestoration scrolls to the top on new navigations (Req 5.8).
 */
export function RootLayout() {
  const shellRef = useRef<HTMLDivElement>(null);
  useFocusScrollAdjustment(shellRef);

  return (
    <LayoutProvider>
      <div ref={shellRef} className={styles.shell}>
        <SkipLink />
        <SiteHeader />
        <main id={MAIN_ID} tabIndex={-1} className={styles.main}>
          <Outlet />
        </main>
        <Footer />
        <TabBar />
      </div>
      <RouteChangeEffects />
      <ScrollRestoration />
    </LayoutProvider>
  );
}

/** The fixed TabBar (Req 4), a direct child of the shell; display: none from 1024 px. */
const TAB_BAR_SELECTOR = ':scope > nav[data-tab-bar]';
const HEADER_SELECTOR = ':scope > header';

/**
 * Document `focusin` listener (design.md, Focus visibility; Req 15.5, 24.5). scroll-padding in
 * global.css covers browsers that honor it during focus navigation; this listener scrolls by
 * `computeFocusScrollDelta` when the focused element is still covered by the sticky
 * Site_Header or the TabBar. It measures one frame after focus, so any scroll the
 * browser performed itself is already applied and the delta is then 0.
 *
 * Skipped targets:
 * - elements with tabIndex -1 (`main` and the page h1): they are only focused programmatically
 *   (SkipLink, route change with `preventScroll`), so ScrollRestoration keeps control;
 * - elements inside the Site_Header or the TabBar (and its More sheet), which are always in view;
 * - elements inside a modal dialog (the Project_Viewer), which is fixed and scroll-locked;
 * - focus that is not `:focus-visible` (for example a mouse click on a link or button).
 */
function useFocusScrollAdjustment(shellRef: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    let frame = 0;

    const adjust = (target: HTMLElement) => {
      const shell = shellRef.current;
      if (!shell || document.activeElement !== target) return;
      if (target.tabIndex < 0 || target.closest('[aria-modal="true"]')) return;
      if (!matchesFocusVisible(target)) return;

      const header = shell.querySelector<HTMLElement>(HEADER_SELECTOR);
      const tabBar = shell.querySelector<HTMLElement>(TAB_BAR_SELECTOR);
      if (header?.contains(target) || tabBar?.contains(target)) return;

      const viewportHeight = window.innerHeight;
      const topInset = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
      const bottomInset = tabBar ? coveredBottom(tabBar, viewportHeight) : 0;
      const delta = computeFocusScrollDelta(
        target.getBoundingClientRect(),
        viewportHeight,
        topInset,
        bottomInset,
      );
      // Instant: global CSS never sets scroll-behavior: smooth (Req 15.9).
      if (delta !== 0) window.scrollBy(0, delta);
    };

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => adjust(target));
    };

    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      cancelAnimationFrame(frame);
    };
  }, [shellRef]);
}

/** Height of the band at the viewport bottom covered by the TabBar; 0 when it is not displayed. */
function coveredBottom(tabBar: HTMLElement, viewportHeight: number): number {
  const rect = tabBar.getBoundingClientRect();
  if (rect.height === 0) return 0; // display: none at 1024 px and wider
  return Math.max(0, viewportHeight - rect.top);
}

/** `:focus-visible` where supported; browsers without it treat every focus as visible. */
function matchesFocusVisible(el: HTMLElement): boolean {
  try {
    return el.matches(':focus-visible');
  } catch {
    return true;
  }
}
