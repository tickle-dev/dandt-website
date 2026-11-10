// FAQ_Accordion expanded-item state (design.md, Property 21; Req 19.8, 19.12, 19.13).

/** Ids of the expanded FAQ_Items. Any number, from none to all, may be expanded. */
export type FaqState = ReadonlySet<string>;

/** Every FAQ_Item starts collapsed (Req 19.8). */
export const initialFaqState: FaqState = new Set<string>();

/**
 * Flips the expanded membership of `id` and leaves every other id unchanged
 * (Req 19.12), so toggling the same id twice returns the original state (Req 19.13).
 * Returns a new Set; the input is never mutated.
 */
export function toggleFaq(state: FaqState, id: string): FaqState {
  const next = new Set(state);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}
