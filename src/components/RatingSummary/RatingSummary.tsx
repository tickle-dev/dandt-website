import { useState } from 'react';
import { OUT_OF_5, ratingAnnouncement } from '../../content/index.ts';
import { roundHalfUpTenths, summarizeRatings } from '../../lib/ratings.ts';
import { LiveRegion } from '../ui/LiveRegion.tsx';
import { StarRating } from '../ui/StarRating.tsx';
import styles from './RatingSummary.module.css';

export interface RatingSummaryProps {
  /** Ratings of the currently displayed Reviews (non-empty). */
  ratings: readonly number[];
  /**
   * Identifies the current filter selection (for example the selected option id).
   * Each change after mount announces the new average and count (Req 20.17);
   * the first render announces nothing.
   */
  announceKey: string | number;
}

/**
 * Rating_Summary on the black Reviews page header (Req 20.8, 20.9, 20.17, 26.3):
 * the average as a large Inter 600 figure, "out of 5", five stars and
 * "Based on N reviews". The stars show the displayed average rounded half up to
 * a whole star (4.3 → 4, 4.5 → 5) and are hidden from assistive technologies,
 * because the text already states the value.
 */
export function RatingSummary({ ratings, announceKey }: RatingSummaryProps) {
  const { averageText, countText } = summarizeRatings(ratings);
  const tenths = roundHalfUpTenths(
    ratings.reduce((total, rating) => total + rating, 0),
    ratings.length,
  );
  const stars = Math.floor((tenths + 5) / 10);

  // Announce only after the selection changes, never on mount
  // (state derived from the previous prop, updated during render).
  const [previousKey, setPreviousKey] = useState(announceKey);
  const [changed, setChanged] = useState(false);
  if (announceKey !== previousKey) {
    setPreviousKey(announceKey);
    setChanged(true);
  }

  return (
    <div className={styles.summary}>
      <p className={styles.averageLine}>
        <span className={styles.average}>{averageText}</span>{' '}
        <span className={styles.outOf}>{OUT_OF_5}</span>
        <StarRating rating={stars} includeLabel={false} className={styles.stars} />
      </p>
      <p className={styles.count}>{countText}</p>
      <LiveRegion
        message={changed ? ratingAnnouncement(averageText, countText) : ''}
        announceKey={announceKey}
      />
    </div>
  );
}
