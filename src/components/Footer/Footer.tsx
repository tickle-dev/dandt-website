import { Link } from 'react-router';
import logoFull from '../../assets/brand/logo-full.png';
import { logoFullSize } from '../../assets/brand/logoSizes.ts';
import {
  A11Y,
  COMPANY_FULL_NAME,
  CONTACT_LABELS,
  FOOTER_LABELS,
  NAV_ITEMS,
  catalog,
  categoryPath,
  contact,
  site,
} from '../../content/index.ts';
import { formatCopyright } from '../../lib/text.ts';
import { toTelHref } from '../../lib/urls.ts';
import { Container } from '../ui/Container.tsx';
import { Notice } from '../ui/Notice.tsx';
import { SocialLinks } from '../SocialLinks/SocialLinks.tsx';
import styles from './Footer.module.css';

/** Reserves the Logo box before load and on failure (Req 17.11, 17.12). */
const logoStyle = { aspectRatio: `${logoFullSize.width} / ${logoFullSize.height}` };

/** The email with a break opportunity after "@", so a narrow column wraps it cleanly. */
function EmailText({ email }: { email: string }) {
  const at = email.indexOf('@');
  if (at < 0) return <>{email}</>;
  return (
    <>
      {email.slice(0, at + 1)}
      <wbr />
      {email.slice(at + 1)}
    </>
  );
}

/**
 * Site Footer (Req 12, 17.5, 23, 27.2), black on every page. Columns: brand (Logo,
 * company name, description, Tagline), page links, the seven category links in catalog
 * order, and contact details with the Social_Links. A bottom bar after a gray divider
 * holds the copyright line and the Concept demo notice (Req 1.6, 12.7).
 *
 * The Tagline is a plain paragraph here and appears nowhere else (Req 27.2). Below
 * 768 px the Footer adds the Click_To_Call_Button height to its own bottom padding, so
 * the button covers no Footer content and no blank strip shows under it (Req 12.1, 24.5).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-tone="dark">
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img
              className={styles.logo}
              src={logoFull}
              width={logoFullSize.width}
              height={logoFullSize.height}
              alt={A11Y.footerLogoAlt}
              style={logoStyle}
              decoding="async"
            />
            <p className={styles.name}>{COMPANY_FULL_NAME}</p>
            <p className={styles.description}>{site.footerDescription}</p>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          <div className={styles.column}>
            <p className={styles.label}>{FOOTER_LABELS.pages}</p>
            <nav aria-label={A11Y.footerPagesNav}>
              <ul className={styles.list}>
                {NAV_ITEMS.map(({ key, label, to }) => (
                  <li key={key}>
                    <Link className={styles.link} to={to}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.column}>
            <p className={styles.label}>{FOOTER_LABELS.services}</p>
            <nav aria-label={A11Y.footerServicesNav}>
              <ul className={styles.list}>
                {catalog.categories.map(({ slug, name }) => (
                  <li key={slug}>
                    <Link className={styles.link} to={categoryPath(slug)}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.column}>
            <p className={styles.label}>{FOOTER_LABELS.contact}</p>
            <ul className={styles.list}>
              <li>
                <span className="visually-hidden">{CONTACT_LABELS.phone}: </span>
                <a className={styles.link} href={toTelHref(contact.phone)}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <span className="visually-hidden">{CONTACT_LABELS.email}: </span>
                <a className={`${styles.link} ${styles.email}`} href={`mailto:${contact.email}`}>
                  <EmailText email={contact.email} />
                </a>
              </li>
              <li className={styles.text}>
                <span className="visually-hidden">{CONTACT_LABELS.hours}: </span>
                {contact.hours}
              </li>
              <li className={styles.text}>{contact.locationLine}</li>
            </ul>
            <SocialLinks className={styles.social} />
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{formatCopyright(year)}</p>
          <Notice className={styles.notice}>{site.conceptNotice}</Notice>
        </div>
      </Container>
    </footer>
  );
}
