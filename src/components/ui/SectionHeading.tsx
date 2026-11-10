import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

export interface SectionHeadingProps {
  children: ReactNode;
  /** Used by the parent section's aria-labelledby. */
  id?: string;
  /** 'center' centers the heading text and the accent rule. Default 'left'. */
  align?: 'left' | 'center';
  className?: string;
}

/**
 * An h2 followed by the 48 × 2 px gold accent rule (Req 26.18). The rule sits
 * --space-4 below the heading text and 16 px above the following content.
 */
export function SectionHeading({
  children,
  id,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const classes = [styles.heading, align === 'center' ? styles.center : undefined, className]
    .filter(Boolean)
    .join(' ');

  return (
    <h2 id={id} className={classes}>
      {children}
    </h2>
  );
}
