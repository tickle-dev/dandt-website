import type { ReactNode } from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  children?: ReactNode;
  /** Extra class for layout inside the container (for example a flex row). */
  className?: string;
}

/**
 * Centered content box: max width --container-max, side padding --gutter.
 * Used by every PageSection, the SiteHeader and the Footer (Req 14.5, 26.13).
 */
export function Container({ children, className }: ContainerProps) {
  const classes = className ? `${styles.container} ${className}` : styles.container;
  return <div className={classes}>{children}</div>;
}
