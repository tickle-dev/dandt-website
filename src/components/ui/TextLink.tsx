import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { A11Y } from '../../content/uiText.ts';
import styles from './TextLink.module.css';

interface TextLinkBaseProps {
  children: ReactNode;
  /** A link on its own line rather than inside a sentence: 44 px tap height. */
  standalone?: boolean;
  className?: string;
}

export interface InternalTextLinkProps extends TextLinkBaseProps {
  /** Route_Path for the router link. */
  to: string;
  href?: never;
  external?: false;
}

export interface ExternalTextLinkProps extends TextLinkBaseProps {
  /** Absolute URL opened in a new tab. */
  href: string;
  external: true;
  to?: never;
}

export type TextLinkProps = InternalTextLinkProps | ExternalTextLinkProps;

/**
 * Inline or standalone text link in the surrounding text color with a 1 px
 * underline that becomes 2 px on hover (Req 26.21). The external variant opens
 * in a new tab and appends visually hidden "(opens in a new tab)" to its
 * accessible name (Req 20.15, 22.7).
 */
export function TextLink(props: TextLinkProps) {
  const { children, standalone = false, className } = props;
  const classes = [styles.link, standalone ? styles.standalone : undefined, className]
    .filter(Boolean)
    .join(' ');

  if (props.external) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span className="visually-hidden"> {A11Y.opensInNewTab}</span>
      </a>
    );
  }

  return (
    <Link to={props.to} className={classes}>
      {children}
    </Link>
  );
}
