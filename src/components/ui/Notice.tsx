import type { ReactNode } from 'react';
import styles from './Notice.module.css';

export interface NoticeProps {
  children: ReactNode;
  /** Element to render. Default 'p'. */
  as?: 'p' | 'span' | 'div';
  id?: string;
  className?: string;
}

/**
 * Notice text such as "Concept demo" and the sample-reviews notice (Req 26.27):
 * --fs-small Inter 400 with no box or border, in --surface-muted (gray on
 * off-white, off-white on black), so it meets 4.5:1 on both tones.
 */
export function Notice({ children, as: Tag = 'p', id, className }: NoticeProps) {
  const classes = [styles.notice, className].filter(Boolean).join(' ');
  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
}
