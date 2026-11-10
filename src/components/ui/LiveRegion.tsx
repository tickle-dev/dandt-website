import { useEffect, useRef } from 'react';

export interface LiveRegionProps {
  /** Text to announce. An empty string clears the region. */
  message: string;
  /**
   * Change this value (for example increment a counter) to announce `message`
   * again even when the text is identical to the previous announcement.
   */
  announceKey?: number | string;
  /** Hide the region visually (screen readers still read it). Default true. */
  visuallyHidden?: boolean;
  className?: string;
}

/**
 * A polite live region (role="status"). Mount it once and keep it mounted, so
 * screen readers register it before any message arrives. Each change to
 * `message` or `announceKey` clears the text, then sets it on the next
 * animation frame, so an identical message is announced again
 * (Req 2.5, 13.13, 15.11).
 *
 * React renders no children here; the effect owns the element's text, which
 * guarantees the cleared state reaches the DOM before the new text does.
 */
export function LiveRegion({
  message,
  announceKey,
  visuallyHidden = true,
  className,
}: LiveRegionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = '';
    if (!message) return;
    const frame = requestAnimationFrame(() => {
      el.textContent = message;
    });
    return () => cancelAnimationFrame(frame);
  }, [message, announceKey]);

  const classes = [visuallyHidden ? 'visually-hidden' : undefined, className]
    .filter(Boolean)
    .join(' ');
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={classes || undefined}
    />
  );
}
