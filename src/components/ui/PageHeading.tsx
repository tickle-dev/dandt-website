import type { ReactNode } from 'react';
import styles from './PageHeading.module.css';

export interface PageHeadingProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * The page's single h1 (Req 15.2). tabIndex={-1} lets useRouteChangeEffects
 * focus it after each route change (Req 15.10) without adding a Tab stop.
 */
export function PageHeading({ children, id, className }: PageHeadingProps) {
  const classes = className ? `${styles.heading} ${className}` : styles.heading;

  return (
    <h1 id={id} tabIndex={-1} className={classes}>
      {children}
    </h1>
  );
}
