import type { MouseEvent } from 'react';
import { SKIP_LINK } from '../../content/index.ts';
import styles from './SkipLink.module.css';

/** Id of the `<main tabIndex={-1}>` landmark that RootLayout renders. */
export const MAIN_ID = 'main';

/**
 * "Skip to main content" (Req 15.3): the first focusable element on every page,
 * visually hidden until focused. Activation focuses `main#main` directly instead
 * of following the `#main` hash, so the router sees no location change (which
 * would refocus the h1 and dispatch ROUTE_CHANGE). The next Tab press then
 * reaches the first focusable element inside `main`.
 */
export function SkipLink() {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById(MAIN_ID);
    if (!main) return;
    e.preventDefault();
    main.focus();
  };
  return (
    <a href={`#${MAIN_ID}`} className={styles.skipLink} data-tone="dark" onClick={onClick}>
      {SKIP_LINK}
    </a>
  );
}
