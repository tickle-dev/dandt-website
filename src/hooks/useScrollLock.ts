// Page scroll lock for the Project_Viewer (design.md, ProjectViewer row; Req 21.11, 21.13, 21.14).
import { useLayoutEffect } from 'react';

/**
 * While `active` is true, stops the page from scrolling: saves `window.scrollY`, then pins
 * `body` with `position: fixed; top: -scrollY; width: 100%` (this also holds on iOS Safari,
 * where `overflow: hidden` alone does not). The scrollbar's width is added as body
 * `padding-right` so the page behind does not shift sideways.
 *
 * When `active` turns false or the component unmounts, the previous inline body styles come
 * back and the saved position is restored instantly with `window.scrollTo`.
 *
 * It is a layout effect on purpose: on a route change the cleanup runs in React's mutation
 * phase, before `ScrollRestoration`'s layout effect for the new page, so the router still
 * decides the new page's scroll position.
 */
export function useScrollLock(active: boolean): void {
  useLayoutEffect(() => {
    if (!active) return;
    const { body, documentElement } = document;
    const savedScrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = 'fixed';
    body.style.top = `${-savedScrollY}px`;
    body.style.width = '100%';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.paddingRight = previous.paddingRight;
      window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
    };
  }, [active]);
}
