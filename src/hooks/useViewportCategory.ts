// Current viewport category from two matchMedia queries (design.md, Cross-cutting runtime
// behavior; Req 4.7, 4.8, 14.8, 24.10). Layout itself is pure CSS; this hook only drives state
// transitions (menu close on desktop) and the Click_To_Call_Button's menu/viewer coupling.
import { useSyncExternalStore } from 'react';
import type { ViewportCategory } from '../content/types.ts';
import { DESKTOP_MIN_WIDTH, TABLET_MIN_WIDTH } from '../lib/layout.ts';

const TABLET_QUERY = `(min-width: ${TABLET_MIN_WIDTH}px)`;
const DESKTOP_QUERY = `(min-width: ${DESKTOP_MIN_WIDTH}px)`;

/** Used when `matchMedia` is unavailable (and as the server snapshot). */
const FALLBACK: ViewportCategory = 'desktop';

type Queries = { tablet: MediaQueryList; desktop: MediaQueryList };

let queries: Queries | null | undefined;

/** The two MediaQueryLists, created once; `null` when `matchMedia` is missing. */
function getQueries(): Queries | null {
  if (queries === undefined) {
    queries =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? { tablet: window.matchMedia(TABLET_QUERY), desktop: window.matchMedia(DESKTOP_QUERY) }
        : null;
  }
  return queries;
}

function subscribe(onChange: () => void): () => void {
  const q = getQueries();
  if (!q) return () => {};
  q.tablet.addEventListener('change', onChange);
  q.desktop.addEventListener('change', onChange);
  return () => {
    q.tablet.removeEventListener('change', onChange);
    q.desktop.removeEventListener('change', onChange);
  };
}

/** Same mapping as `viewportCategory(width)`: `< 768` mobile, `768–1023` tablet, `>= 1024` desktop. */
function getSnapshot(): ViewportCategory {
  const q = getQueries();
  if (!q) return FALLBACK;
  if (q.desktop.matches) return 'desktop';
  if (q.tablet.matches) return 'tablet';
  return 'mobile';
}

function getServerSnapshot(): ViewportCategory {
  return FALLBACK;
}

/** `'mobile' | 'tablet' | 'desktop'`, updated when the viewport crosses 768 or 1024 px. */
export function useViewportCategory(): ViewportCategory {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
