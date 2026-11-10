import { Link } from 'react-router';
import { CTA_LABELS, categoryPath, type ServiceCategory } from '../../content/index.ts';
import { cardProps } from '../ui/Card.tsx';
import { Icon } from '../ui/Icon.tsx';
import styles from './ServiceCategoryCard.module.css';

export interface ServiceCategoryCardProps {
  category: ServiceCategory;
}

/**
 * Service_Category card (Req 6.2, 6.3, 26.6, 26.7): one interactive light Card
 * that is a single router `Link` to `/services/{slug}`, with no nested links.
 * It holds the 32 px registry icon in the surface gold, the `h3` name, the
 * summary and an "Explore" `<span>` styled like a text link, pinned to the
 * bottom by the Card's last-child rule. The link's accessible name is its
 * full text content, so it contains the visible "Explore" label.
 */
export function ServiceCategoryCard({ category }: ServiceCategoryCardProps) {
  return (
    <Link
      to={categoryPath(category.slug)}
      {...cardProps({ variant: 'light', interactive: true, className: styles.card })}
    >
      <Icon name={category.icon} size="lg" className={styles.icon} />
      <h3 className={styles.name}>{category.name}</h3>
      <p className={styles.summary}>{category.summary}</p>
      <span className={styles.explore}>{CTA_LABELS.explore}</span>
    </Link>
  );
}
