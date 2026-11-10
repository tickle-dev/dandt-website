// Shared layout state that RootLayout provides (design.md, RootLayout row): the Mobile_Menu
// state, the Project_Viewer open flag and the viewport category (Req 4.7, 4.8, 4.9, 14.8, 24.7,
// 24.10).
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react';
import type { ViewportCategory } from '../content/types.ts';
import { useViewportCategory } from '../hooks/useViewportCategory.ts';
import { INITIAL_MENU_OPEN, menuReducer, type MenuEvent } from '../lib/menuState.ts';

export type MenuContextValue = { open: boolean; dispatch: Dispatch<MenuEvent> };
export type ViewerContextValue = { viewerOpen: boolean; setViewerOpen: (open: boolean) => void };

const MenuContext = createContext<MenuContextValue | null>(null);
const ViewerContext = createContext<ViewerContextValue | null>(null);
const ViewportContext = createContext<ViewportCategory | null>(null);

/**
 * Holds the Mobile_Menu reducer, the viewer-open flag and the single `useViewportCategory`
 * subscription. Every viewport category change dispatches `VIEWPORT_CHANGE` here (and only
 * here), so the menu closes when the viewport becomes desktop even if no header is mounted.
 */
export function LayoutProvider({ children }: { children: ReactNode }) {
  const [open, dispatch] = useReducer(menuReducer, INITIAL_MENU_OPEN);
  const [viewerOpen, setViewerOpen] = useState(false);
  const viewport = useViewportCategory();

  // Layout effect: the menu closes before the browser paints the desktop layout.
  useLayoutEffect(() => {
    dispatch({ type: 'VIEWPORT_CHANGE', to: viewport });
  }, [viewport]);

  const menu = useMemo<MenuContextValue>(() => ({ open, dispatch }), [open]);
  const viewer = useMemo<ViewerContextValue>(() => ({ viewerOpen, setViewerOpen }), [viewerOpen]);

  return (
    <ViewportContext value={viewport}>
      <MenuContext value={menu}>
        <ViewerContext value={viewer}>{children}</ViewerContext>
      </MenuContext>
    </ViewportContext>
  );
}

function missingProvider(hook: string): never {
  throw new Error(`${hook}() must be used inside <LayoutProvider>.`);
}

/** Mobile_Menu state: `open` and the `menuReducer` dispatch (TOGGLE, CLOSE, ROUTE_CHANGE). */
export function useMenu(): MenuContextValue {
  return useContext(MenuContext) ?? missingProvider('useMenu');
}

/** Project_Viewer open flag; the viewer sets it on open and clears it on close or unmount. */
export function useViewer(): ViewerContextValue {
  return useContext(ViewerContext) ?? missingProvider('useViewer');
}

/** Current viewport category from the provider's single matchMedia subscription. */
export function useViewport(): ViewportCategory {
  return useContext(ViewportContext) ?? missingProvider('useViewport');
}
