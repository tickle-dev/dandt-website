import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { useMenu } from '../../app/layoutContext.tsx';
import {
  A11Y,
  NAV_LABELS,
  ROUTES,
  callLabel,
  catalog,
  contact,
  type IconName,
  type NavKey,
} from '../../content/index.ts';
import { getCategoryBySlug } from '../../lib/catalog.ts';
import { getActiveNav } from '../../lib/nav.ts';
import { toTelHref } from '../../lib/urls.ts';
import { Icon } from '../ui/Icon.tsx';
import styles from './TabBar.module.css';

/** Id of the More sheet, referenced by the More tab's aria-controls (Req 4.7). */
export const MORE_SHEET_ID = 'more-pages';

const isKnownCategory = (slug: string): boolean => getCategoryBySlug(catalog, slug) !== undefined;

type PageTab = { key: NavKey; icon: IconName };

/** Page tabs left of the centre Call tab, then right of it before More (Req 4.2). */
const TABS_BEFORE_CALL: readonly PageTab[] = [
  { key: 'home', icon: 'House' },
  { key: 'services', icon: 'Hammer' },
];
const TABS_AFTER_CALL: readonly PageTab[] = [{ key: 'projects', icon: 'Image' }];

/** Pages listed in the More sheet, in Navigation_Menu order (Req 4.4). */
const MORE: readonly { key: NavKey; icon: IconName }[] = [
  { key: 'reviews', icon: 'Star' },
  { key: 'serviceAreas', icon: 'MapPin' },
  { key: 'faq', icon: 'CircleHelp' },
  { key: 'about', icon: 'Users' },
  { key: 'contact', icon: 'Mail' },
];
const MORE_KEYS: ReadonlySet<NavKey> = new Set(MORE.map((item) => item.key));

/**
 * Tab_Bar (Req 4, 24): the Compact_Viewport navigation, fixed to the bottom of the
 * viewport so every main page is one thumb tap away. Five tabs: Home, Services,
 * Call (the Click_To_Call_Button, in the centre), Projects and More. More opens a small sheet above
 * the bar with the other five pages; the page behind is dimmed, and a tap on it,
 * Escape, another tap on More, a link or a route change closes the sheet. CSS hides
 * the whole bar at 1024 px and wider, where the Site_Header shows the inline links.
 *
 * The sheet uses the existing Mobile_Menu state (menuReducer), so LayoutProvider
 * still closes it when the viewport becomes desktop and RouteChangeEffects closes it
 * on every page change.
 */
export function TabBar() {
  const { open, dispatch } = useMenu();
  const { pathname } = useLocation();
  const moreRef = useRef<HTMLButtonElement>(null);
  const active = getActiveNav(pathname, isKnownCategory);
  const moreActive = active !== null && MORE_KEYS.has(active.key);

  // Escape closes the open sheet and returns focus to the More tab (Req 4.5).
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      dispatch({ type: 'CLOSE' });
      moreRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, dispatch]);

  const close = () => dispatch({ type: 'CLOSE' });
  const current = (key: NavKey) => (active?.key === key ? active.ariaCurrent : undefined);

  return (
    <nav aria-label={A11Y.mainNav} className={styles.bar} data-tone="dark" data-tab-bar="">
      {open && <div className={styles.backdrop} aria-hidden="true" onClick={close} />}

      <ul className={styles.tabs}>
        {TABS_BEFORE_CALL.map(({ key, icon }) => (
          <li key={key}>
            <Link
              to={ROUTES[key]}
              className={current(key) ? `${styles.tab} ${styles.active}` : styles.tab}
              aria-current={current(key)}
              onClick={close}
            >
              <span className={styles.iconSlot}>
                <Icon name={icon} size="md" />
              </span>
              <span className={styles.label}>{NAV_LABELS[key]}</span>
            </Link>
          </li>
        ))}
        <li>
          {/* Click_To_Call_Button (Req 24.3): same tel: target and accessible name as before. */}
          <a
            href={toTelHref(contact.phone)}
            className={`${styles.tab} ${styles.call}`}
            aria-label={callLabel(contact.phone)}
            onClick={close}
          >
            <span className={`${styles.iconSlot} ${styles.callBadge}`}>
              <Icon name="Phone" size="md" />
            </span>
            <span className={styles.label}>{A11Y.call}</span>
          </a>
        </li>
        {TABS_AFTER_CALL.map(({ key, icon }) => (
          <li key={key}>
            <Link
              to={ROUTES[key]}
              className={current(key) ? `${styles.tab} ${styles.active}` : styles.tab}
              aria-current={current(key)}
              onClick={close}
            >
              <span className={styles.iconSlot}>
                <Icon name={icon} size="md" />
              </span>
              <span className={styles.label}>{NAV_LABELS[key]}</span>
            </Link>
          </li>
        ))}
        <li>
          <button
            ref={moreRef}
            type="button"
            className={moreActive || open ? `${styles.tab} ${styles.active}` : styles.tab}
            aria-expanded={open}
            aria-controls={MORE_SHEET_ID}
            onClick={() => dispatch({ type: 'TOGGLE' })}
          >
            <span className={styles.iconSlot}>
              <Icon name={open ? 'X' : 'Ellipsis'} size="md" />
            </span>
            <span className={styles.label}>{A11Y.more}</span>
          </button>
        </li>
      </ul>

      {/* After the tabs in DOM order, so Tab from More moves straight into the sheet. */}
      <div id={MORE_SHEET_ID} className={styles.sheet} hidden={!open} aria-label={A11Y.morePages} role="group">
        <ul className={styles.sheetList}>
          {MORE.map(({ key, icon }) => (
            <li key={key}>
              <Link
                to={ROUTES[key]}
                className={current(key) ? `${styles.sheetLink} ${styles.sheetActive}` : styles.sheetLink}
                aria-current={current(key)}
                onClick={close}
              >
                <Icon name={icon} size="md" className={styles.sheetIcon} />
                {NAV_LABELS[key]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
