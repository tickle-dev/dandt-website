// Project_Viewer next/previous navigation with wrap-around
// (design.md, src/lib signatures; Req 21.4, 21.5, 21.7, 21.15).

/** Index after `i` in a set of `n` items: wraps last → first for n ≥ 2; unchanged for n ≤ 1. */
export function nextIndex(i: number, n: number): number {
  if (n < 2) return i;
  return (i + 1) % n;
}

/** Index before `i` in a set of `n` items: wraps first → last for n ≥ 2; unchanged for n ≤ 1. */
export function prevIndex(i: number, n: number): number {
  if (n < 2) return i;
  return (i - 1 + n) % n;
}
