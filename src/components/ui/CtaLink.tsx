import type { ReactNode } from 'react';
import { Link } from 'react-router';
import type { LinkProps } from 'react-router';
import styles from './CtaLink.module.css';

export type CtaVariant = 'primary' | 'secondary';
export type CtaSize = 'md' | 'lg';

export interface CtaClassOptions {
  variant: CtaVariant;
  size: CtaSize;
  /** Stretch to the container width, e.g. the Mobile_Menu lg Primary CTA. */
  fullWidth?: boolean;
  className?: string;
}

/**
 * Class names for the Call_To_Action style, for reuse on elements that are not
 * router links: the Quote_Form submit `<button>` and the Click_To_Call_Button
 * `<a href="tel:">` use the Primary style through this helper.
 */
export function ctaClassName({ variant, size, fullWidth = false, className }: CtaClassOptions): string {
  return [styles.cta, styles[variant], styles[size], fullWidth ? styles.fullWidth : undefined, className]
    .filter(Boolean)
    .join(' ');
}

export interface CtaLinkProps extends Omit<LinkProps, 'className' | 'children'>, CtaClassOptions {
  children: ReactNode;
}

/**
 * Router link styled as a Primary or Secondary Call_To_Action (Req 13.8, 13.9,
 * 26.12, 26.19): md or lg, `--radius-sm`, at least 44 px tall.
 */
export function CtaLink({ variant, size, fullWidth, className, children, ...linkProps }: CtaLinkProps) {
  return (
    <Link {...linkProps} className={ctaClassName({ variant, size, fullWidth, className })}>
      {children}
    </Link>
  );
}
