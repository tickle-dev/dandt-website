// Keyboard focus containment for modal dialogs (design.md, ProjectViewer row; Req 15.4, 21.10).
import { useEffect, type RefObject } from 'react';

const FOCUSABLE = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Focusable, rendered elements inside `container`, in DOM (tab) order. */
function focusableWithin(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.closest('[inert]') && el.getClientRects().length > 0,
  );
}

/**
 * While `active` is true, Tab from the last focusable element in `containerRef` moves focus to
 * the first, and Shift+Tab from the first moves it to the last. If focus has left the container
 * (for example after a click on non-focusable panel text), the next Tab goes to the first
 * element and Shift+Tab to the last. Disabled controls are skipped. If nothing inside is
 * focusable, Tab is swallowed.
 *
 * The listener is on `document` in the capture phase, so it runs before any other Tab handling.
 */
export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey) return;
      const container = containerRef.current;
      if (!container) return;

      const items = focusableWithin(container);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const inside = current instanceof Node && container.contains(current);

      if (event.shiftKey) {
        if (!inside || current === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (!inside || current === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [containerRef, active]);
}
