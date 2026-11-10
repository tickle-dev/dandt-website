import { Children, isValidElement } from 'react';
import type { ReactNode } from 'react';
import styles from './CardGrid.module.css';

export type CardGridElement = 'div' | 'ul' | 'ol';

export interface CardGridColumns {
  /** Columns below 768 px. Default 1 (Req 14.2); 2 for the stats band. */
  mobile?: 1 | 2;
  /** Columns from 768 px. Default 2 (Req 14.3); 1 is not used by the design but allowed. */
  tablet?: 1 | 2;
  /**
   * Columns from 1024 px: 4 for Service_Category cards, highlights and the stats band,
   * 3 for Project_Cards, Review_Cards and the link grid, 2 for Service_Items (Req 14.4, 26.8).
   */
  desktop: 2 | 3 | 4;
}

export interface CardGridProps {
  columns: CardGridColumns;
  /**
   * 'ul' or 'ol' wraps each child in an `<li>` (with role="list" kept on the list,
   * since `list-style: none` drops list semantics in Safari). Default 'div'.
   */
  as?: CardGridElement;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  children?: ReactNode;
}

/**
 * Equal-width column grid (Req 14.2–14.4, 14.10, 26.7, 26.8, 26.31):
 * `repeat(var(--cols), minmax(0, 1fr))` with `--cols` set per breakpoint,
 * `--grid-gap` in both directions and `align-items: stretch`.
 */
export function CardGrid({
  columns,
  as = 'div',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
}: CardGridProps) {
  const { mobile = 1, tablet = 2, desktop } = columns;
  const classes = [
    styles.grid,
    styles[`mobile${mobile}`],
    styles[`tablet${tablet}`],
    styles[`desktop${desktop}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'div') {
    return (
      <div className={classes} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
        {children}
      </div>
    );
  }

  const List = as;
  return (
    <List role="list" className={classes} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
      {Children.toArray(children).map((child, index) => (
        <li key={isValidElement(child) && child.key !== null ? child.key : index} className={styles.item}>
          {child}
        </li>
      ))}
    </List>
  );
}
