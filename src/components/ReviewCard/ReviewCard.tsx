import type { Review } from '../../content/index.ts';
import { Card, type CardVariant } from '../ui/Card.tsx';
import { StarRating } from '../ui/StarRating.tsx';
import styles from './ReviewCard.module.css';

export interface ReviewCardProps {
  review: Review;
  /** 'light' on the Reviews_Page's off-white grid; 'dark' in the Home Review_Preview on black. */
  variant: CardVariant;
}

/**
 * Review_Card (Req 20.4–20.6, 26.6, 26.7): a non-interactive Card with the
 * reviewer name, city, category name, StarRating ("Rated N out of 5 stars"
 * for assistive technologies) and the full review text, never clamped.
 *
 * The name is Inter 600 text, not a heading, so the card fits under an `h2`
 * or directly under the `h1` (Req 15.2). The content is one `<figure>` (the
 * Card's only child), so the Card's bottom-pinning rule does not push the
 * review text away from the stars in a stretched grid row.
 */
export function ReviewCard({ review, variant }: ReviewCardProps) {
  return (
    <Card variant={variant}>
      <figure className={styles.figure}>
        <figcaption className={styles.caption}>
          <span className={styles.name}>{review.reviewerName}</span>
          <span className={styles.meta}>{review.city}</span>
          <span className={styles.meta}>{review.category}</span>
          <StarRating rating={review.rating} className={styles.stars} />
        </figcaption>
        <blockquote className={styles.quote}>
          <p className={styles.text}>{review.text}</p>
        </blockquote>
      </figure>
    </Card>
  );
}
