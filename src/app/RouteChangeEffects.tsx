// Route change side effects (design.md, Runtime composition: RouteChangeEffects). Rendered by
// RootLayout inside <LayoutProvider> so `useMenu()` resolves (Req 4.9, 15.10).
import { useRouteChangeEffects } from '../hooks/useRouteChangeEffects.ts';
import { useMenu } from './layoutContext.tsx';

/** Focuses the new page's h1 and closes the Mobile_Menu on every page change. Renders nothing. */
export function RouteChangeEffects() {
  const { dispatch } = useMenu();
  useRouteChangeEffects(dispatch);
  return null;
}
