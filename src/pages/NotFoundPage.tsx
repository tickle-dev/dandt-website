// Not_Found_Page (design.md, Page layouts → Not Found; Req 5.5–5.7, 5.9, 5.11, 3.9).
// Rendered by the `*` route and, in place, by ServiceCategoryPage for an unknown slug, so the
// address bar keeps the requested Route_Path (Req 5.5, 5.6, 5.11). getActiveNav returns null for
// both cases, so no Navigation_Menu link is active (Req 3.9). RootLayout keeps the Footer, with
// its Concept_Notice, at the bottom of this short page (Req 1.6, 1.9).
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { TextLink } from '../components/ui/TextLink.tsx';
import { CTA_LABELS, PAGE_NAMES, ROUTES, site } from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import styles from './NotFoundPage.module.css';

const HEADING_ID = 'not-found-heading';

export function NotFoundPage() {
  usePageTitle(PAGE_NAMES.notFound);
  return (
    <PageSection tone="dark" aria-labelledby={HEADING_ID}>
      <PageHeading id={HEADING_ID}>{site.notFound.heading}</PageHeading>
      <p>{site.notFound.text}</p>
      <ul className={styles.links}>
        <li>
          <TextLink to={ROUTES.home} standalone>
            {CTA_LABELS.notFoundHome}
          </TextLink>
        </li>
        <li>
          <TextLink to={ROUTES.services} standalone>
            {CTA_LABELS.notFoundServices}
          </TextLink>
        </li>
      </ul>
    </PageSection>
  );
}
