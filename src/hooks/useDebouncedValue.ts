import { useEffect, useState } from 'react';

/**
 * Returns `value` once it has stayed unchanged for `delayMs` milliseconds (design.md,
 * ServiceFilter; Req 15.11). Each change restarts the timer, so a burst of keystrokes
 * produces one update after the last one. Values are compared with `Object.is`, so pass
 * a primitive or a memoized object.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
