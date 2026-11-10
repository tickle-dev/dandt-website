import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import logoHeaderUrl from '../../assets/brand/logo-header.png';
import { logoHeaderSize } from '../../assets/brand/logoSizes.ts';
import { useMenu } from '../../app/layoutContext.tsx';
import { A11Y, CTA_LABELS, NAV_ITEMS, ROUTES, catalog } from '../../content/index.ts';
import { getCategoryBySlug } from '../../lib/catalog.ts';
import { getActiveNav } from '../../lib/nav.ts';
import { MenuToggle } from '../MenuToggle/MenuToggle.tsx';
import { Container } from '../ui/Container.tsx';
import { CtaLink } from '../ui/CtaLink.tsx';
import styles from './SiteHeader.module.css';

/** Id of the `<nav aria-label="Main">`, which is the Mobile_Menu panel on compact viewports. */
export const NAV_PANEL_ID = 'main-nav-panel';

const isKnownCategory = (slug: string): boolean => getCategoryBySlug(catalog, slug) !== undefined;

/** Reserves the Header_Logo box before load and if the image fails (Req 17.11, 17.12, 17.14). */
const logoStyle = { aspectRatio: `${logoHeaderSize.width} / ${logoHeaderSize.height}` };

/**
 * Site_Header (Req 3, 4, 17.4, 17.7, 17.9–17.12, 17.14): sticky, opaque black,
 * one `--header-height` row with the Header_Logo link at the left.
 *
 * DOM order is logo, tablet CTA, Menu_Toggle, `<nav aria-label="Main">`, desktop CTA.
 * Exactly one of the two header CTAs is displayed per viewport category (none on
 * mobile), so Tab order follows the visual order everywhere:
 * - desktop: logo → eight inline links → CTA (toggle hidden);
 * - tablet: logo → CTA → toggle → open panel (links, lg CTA);
 * - mobile: logo → toggle → open panel (links, lg CTA).
 * The single nav is the inline link row on desktop and, below 1024 px, the
 * `main-nav-panel` drop-down, `display: none` while closed (Req 4.1, 4.10).
 *
 * Viewport changes are dispatched by LayoutProvider, not here (Req 4.7, 4.8).
 */
export function SiteHeader() {
  const { open, dispatch } = useMenu();
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const active = getActiveNav(pathname, isKnownCategory);

  // Escape closes the open Mobile_Menu and returns focus to the toggle (Req 4.5).
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      dispatch({ type: 'CLOSE' });
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, dispatch]);

  // Any link selection closes the menu, including the link to the current page (Req 4.4).
  const close = () => dispatch({ type: 'CLOSE' });

  return (
    <header className={styles.header} data-tone="dark">
      <Container className={styles.row}>
        <Link to={ROUTES.home} className={styles.logoLink} aria-label={A11Y.headerLogoLink} onClick={close}>
          <img
            className={styles.logo}
            src={logoHeaderUrl}
            width={logoHeaderSize.width}
            height={logoHeaderSize.height}
            style={logoStyle}
            alt=""
          />
        </Link>

        <div className={styles.ctaTablet}>
          <CtaLink to={ROUTES.contact} variant="primary" size="md" onClick={close}>
            {CTA_LABELS.getQuote}
          </CtaLink>
        </div>

        <MenuToggle
          ref={toggleRef}
          open={open}
          controls={NAV_PANEL_ID}
          onToggle={() => dispatch({ type: 'TOGGLE' })}
        />

        <nav
          id={NAV_PANEL_ID}
          aria-label={A11Y.mainNav}
          className={open ? `${styles.nav} ${styles.navOpen}` : styles.nav}
        >
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => {
              const current = active?.key === item.key ? active.ariaCurrent : undefined;
              return (
                <li key={item.key} className={styles.item}>
                  <Link
                    to={item.to}
                    className={current ? `${styles.link} ${styles.active}` : styles.link}
                    aria-current={current}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.panelCta}>
            <CtaLink to={ROUTES.contact} variant="primary" size="lg" fullWidth onClick={close}>
              {CTA_LABELS.getQuote}
            </CtaLink>
          </div>
        </nav>

        <div className={styles.ctaDesktop}>
          <CtaLink to={ROUTES.contact} variant="primary" size="md" onClick={close}>
            {CTA_LABELS.getQuote}
          </CtaLink>
        </div>
      </Container>
    </header>
  );
}
