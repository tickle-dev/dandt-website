// Rating_Summary arithmetic (design.md, src/lib signatures and Key algorithms; Req 20.8, 20.9).
import type { RatingSummary } from '../content/types.ts';
import { basedOnReviews } from '../content/uiText.ts';

/**
 * The mean `sum / count` in tenths, rounded half up, using integer arithmetic only:
 * floor((20·sum + count) / (2·count)) = floor(10·sum/count + 1/2). An exact mean of
 * 4.25 gives 43 and 4.45 gives 45, with no floating-point error.
 * `sum` and `count` must be whole numbers; `count` must be at least 1.
 */
export function roundHalfUpTenths(sum: number, count: number): number {
  if (!Number.isInteger(sum) || !Number.isInteger(count) || count < 1) {
    throw new RangeError(`roundHalfUpTenths needs whole numbers and count ≥ 1 (got ${sum}, ${count})`);
  }
  return Math.floor((20 * sum + count) / (2 * count));
}

/**
 * Average and count of a non-empty list of whole-number ratings (1–5):
 * `{ averageText: '4.3', count, countText: 'Based on 1 review' | 'Based on N reviews' }`.
 * The average always has one decimal digit ('4.0'). An empty list throws a RangeError;
 * the Review_Filter only offers categories with at least one Review, so it never occurs.
 */
export function summarizeRatings(ratings: readonly number[]): RatingSummary {
  const count = ratings.length;
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const tenths = roundHalfUpTenths(sum, count);
  return {
    averageText: `${Math.floor(tenths / 10)}.${tenths % 10}`,
    count,
    countText: basedOnReviews(count),
  };
}
