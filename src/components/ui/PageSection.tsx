import type { ReactNode } from 'react';
import { Container } from './Container';
import styles from './PageSection.module.css';

/** 'dark' = --color-black, 'light' = --color-offwhite. Charcoal is never a section background. */
export type SectionTone = 'dark' | 'light';

/** 'center' only for the hero, closing CTA banners and the Services no-match block (Req 26.14). */
export type SectionAlign = 'left' | 'center';

export interface PageSectionProps {
  tone: SectionTone;
  align?: SectionAlign;
  id?: string;
  /** Id of the section's heading, so the section is labelled by it. */
  'aria-labelledby'?: string;
  /** Extra class on the `<section>` (for example the hero's photo background). */
  className?: string;
  /** Extra class on the inner Container (for example a two-column layout). */
  containerClassName?: string;
  children?: ReactNode;
}

/**
 * A full-width Page_Section: `<section data-tone data-align>` with --section-pad
 * top and bottom around a Container. Adjacent sections of the same tone get a
 * 1 px gray separator automatically (Req 26.11).
 */
export function PageSection({
  tone,
  align = 'left',
  id,
  'aria-labelledby': labelledBy,
  className,
  containerClassName,
  children,
}: PageSectionProps) {
  const classes = [styles.section, align === 'center' ? styles.center : undefined, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={classes}
      data-tone={tone}
      data-align={align}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
