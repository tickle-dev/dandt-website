import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

/** 'light' = off-white fill on off-white sections; 'dark' = charcoal fill on black sections. */
export type CardVariant = 'light' | 'dark';

export interface CardStyleOptions {
  variant: CardVariant;
  /** Only for cards that are links or buttons: gets the shared hover treatment. */
  interactive?: boolean;
  className?: string;
}

/** Props to spread on any element that should look like a Card. */
export interface CardStyleProps {
  className: string;
  /** Sets the --surface-* variables for the card fill (see global.css). */
  'data-tone': CardVariant;
}

/**
 * Card styling for elements other than `<Card>`: spread on a router `Link`
 * (ServiceCategoryCard) or a `<button>` (ProjectCard) with `interactive: true`.
 *
 *   <Link to="/services/roofing" {...cardProps({ variant: 'light', interactive: true })}>
 */
export function cardProps({ variant, interactive = false, className }: CardStyleOptions): CardStyleProps {
  return {
    className: [styles.card, styles[variant], interactive ? styles.interactive : undefined, className]
      .filter(Boolean)
      .join(' '),
    'data-tone': variant,
  };
}

export interface CardMediaProps {
  className?: string;
  children: ReactNode;
}

/**
 * Top image slot: must be the card's first child. Full card width, flush with
 * the top, `--radius-md` top corners. A `<span>` so it is valid inside a `<button>`.
 */
export function CardMedia({ className, children }: CardMediaProps) {
  return <span className={[styles.media, className].filter(Boolean).join(' ')}>{children}</span>;
}

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'> {
  variant: CardVariant;
  /** Element to render. Non-interactive only; links and buttons use cardProps(). Default 'div'. */
  as?: 'div' | 'article';
  /** Optional top image, rendered in a CardMedia slot. */
  media?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Non-interactive Card (Req 26.6, 26.7, 26.23): Review_Cards, highlights,
 * Service_Items and values. A flex column whose last child sits at the bottom;
 * no change on hover.
 */
export function Card({ variant, as: Element = 'div', media, className, children, ...rest }: CardProps) {
  return (
    <Element {...rest} {...cardProps({ variant, className })}>
      {media !== undefined && media !== null ? <CardMedia>{media}</CardMedia> : null}
      {children}
    </Element>
  );
}
