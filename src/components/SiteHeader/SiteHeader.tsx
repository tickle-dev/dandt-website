import { Link, useLocation } from 'react-router';
import logoHeaderUrl from '../../assets/brand/logo-header.png';
import { logoHeaderSize } from '../../assets/brand/logoSizes.ts';
import { useMenu } from '../../app/layoutContext.tsx';
import { A11Y, CTA_LABELS, NAV_ITEMS, ROUTES, catalog } from '../../content/index.ts';
import { getCategoryBySlug } from '../../lib/catalog.ts';
import { getActiveNav } from '../../lib/nav.ts';
import { Container } from '../ui/Container.tsx';
import { CtaLink } from '../ui/CtaLink.tsx';
import styles from './SiteHeader.module.css';

const isKnownCategory = (slug: string): boolean => getCategoryBySlug(catalog, slug) !== undefined;

/** Reserves the Header_Logo box before load and if the image fails (Req 17.11, 17.12, 17.14). */
const logoStyle = { aspectRatio: `${logoHeaderSize.width} / ${logoHeaderSize.height}` };

/**
 * Site_Header (Req 3, 17.4, 17.7, 17.9–17.12, 17.14): sticky, opaque black, one
 * `--header-height` row with the Header_Logo link at the left and the gold quote CTA at
 * the right on every viewport ("Free Quote" on phones, "Get a Free Quote" from 768 px).
 *
 * The inline `<nav aria-label="Main">` is displayed only from 1024 px. Below that, the
 * TabBar at the bottom of the viewport is the main navigation (Req 4), so the header
 * holds no menu button. DOM order (logo, links, CTA) matches the visual order.
 */
export function SiteHeader() {
  const { dispatch } = useMenu();
  const { pathname } = useLocation();
  const active = getActiveNav(pathname, isKnownCategory);

  // Following a header link also closes the TabBar's More sheet if it is open.
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

        <nav aria-label={A11Y.mainNav} className={styles.nav}>
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
        </nav>

        <div className={styles.cta}>
          <CtaLink to={ROUTES.contact} variant="primary" size="md" onClick={close}>
            <span className={styles.ctaLong}>{CTA_LABELS.getQuote}</span>
            <span className={styles.ctaShort}>{CTA_LABELS.getQuoteShort}</span>
          </CtaLink>
        </div>
      </Container>
    </header>
  );
}
