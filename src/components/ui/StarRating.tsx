import { ratedOutOf5 } from '../../content/uiText.ts';
import { Icon } from './Icon.tsx';
import styles from './StarRating.module.css';

const STAR_COUNT = 5;

export interface StarRatingProps {
  /** Whole-number rating from 1 to 5. */
  rating: number;
  /**
   * Adds the visually hidden "Rated N out of 5 stars" text (default true,
   * Req 20.5). Pass false where the rating is already announced in text, such
   * as the Rating_Summary; the stars are then hidden from assistive technologies.
   */
  includeLabel?: boolean;
  className?: string;
}

/**
 * Five 16 px lucide stars, the first `rating` of them filled (Req 20.5).
 * Filled stars use the surface gold (gold on charcoal or black, gold-dark on
 * off-white, Req 13.7); unfilled stars are a gray outline with no fill
 * (Req 20.6). The icons are aria-hidden; the text equivalent is visually hidden.
 */
export function StarRating({ rating, includeLabel = true, className }: StarRatingProps) {
  const classes = [styles.rating, className].filter(Boolean).join(' ');
  return (
    <span className={classes} aria-hidden={includeLabel ? undefined : true}>
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <Icon
          key={index}
          name="Star"
          size="sm"
          className={`${styles.star} ${index < rating ? styles.filled : styles.empty}`}
        />
      ))}
      {includeLabel && <span className="visually-hidden">{ratedOutOf5(rating)}</span>}
    </span>
  );
}
