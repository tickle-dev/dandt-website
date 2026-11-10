import { useId, useMemo, useState } from 'react';
import { ServiceFilter } from '../components/ServiceFilter/ServiceFilter.tsx';
import { CtaLink } from '../components/ui/CtaLink.tsx';
import { Icon } from '../components/ui/Icon.tsx';
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';
import { TextLink } from '../components/ui/TextLink.tsx';
import {
  CTA_LABELS,
  NO_MATCH_HINT,
  PAGE_HEADINGS,
  PAGE_NAMES,
  RESULT_COUNTS,
  ROUTES,
  catalog,
  categoryPath,
  closingBanners,
  noServicesMatch,
  pageIntros,
  viewCategory,
} from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { filterCatalog } from '../lib/serviceFilter.ts';
import { formatResultCount } from '../lib/text.ts';
import styles from './ServicesPage.module.css';

/**
 * Services_Page (design.md, Page layouts → Services; Req 7, 14.7, 14.8, 15.11, 15.12,
 * 26.12, 26.14, 26.26): page header with the Service_Filter, one section per matching
 * Service_Category (or the no-match block), and the closing CTA banner.
 *
 * The filter text is component state, so a viewport change keeps it (Req 14.8). The list
 * is filtered on every change with no submit step (Req 7.3); ServiceFilter announces the
 * result after a pause in typing (Req 15.11).
 */
export function ServicesPage() {
  usePageTitle(PAGE_NAMES.services);
  const headingId = useId();
  const sectionIdBase = useId();
  const closingId = useId();

  const [query, setQuery] = useState('');
  const filtered = useMemo(() => filterCatalog(catalog.categories, query), [query]);

  const shownCount = filtered.reduce((sum, { items }) => sum + items.length, 0);
  const announcement =
    filtered.length === 0
      ? noServicesMatch(query.trim())
      : formatResultCount(shownCount, RESULT_COUNTS.services.singular, RESULT_COUNTS.services.plural);

  const banner = closingBanners.services;

  return (
    <>
      <PageSection tone="dark" aria-labelledby={headingId}>
        <PageHeading id={headingId}>{PAGE_HEADINGS.services}</PageHeading>
        <p>{pageIntros.services}</p>
        <ServiceFilter value={query} onChange={setQuery} announcement={announcement} />
      </PageSection>

      {filtered.length > 0 ? (
        filtered.map(({ category, items }) => {
          const categoryHeadingId = `${sectionIdBase}-${category.slug}`;
          return (
            <PageSection key={category.slug} tone="light" aria-labelledby={categoryHeadingId}>
              <SectionHeading id={categoryHeadingId}>{category.name}</SectionHeading>
              <p>{category.summary}</p>
              <ul className={styles.items}>
                {items.map((item, index) => (
                  <li key={`${index}-${item.slug}`}>{item.name}</li>
                ))}
              </ul>
              <TextLink standalone to={categoryPath(category.slug)}>
                {viewCategory(category.name)}
              </TextLink>
            </PageSection>
          );
        })
      ) : (
        <PageSection tone="light" align="center">
          <Icon name="SearchX" size="lg" className={styles.noMatchIcon} />
          <p className={styles.noMatchMessage}>{noServicesMatch(query.trim())}</p>
          <p>{NO_MATCH_HINT}</p>
          <div className={styles.cta}>
            <CtaLink to={ROUTES.contact} variant="primary" size="lg">
              {CTA_LABELS.describeProject}
            </CtaLink>
          </div>
        </PageSection>
      )}

      <PageSection tone="dark" align="center" aria-labelledby={closingId}>
        <SectionHeading id={closingId} align="center">
          {banner.heading}
        </SectionHeading>
        <p>{banner.text}</p>
        <div className={styles.cta}>
          <CtaLink to={ROUTES.contact} variant="primary" size="lg">
            {CTA_LABELS.getQuote}
          </CtaLink>
        </div>
      </PageSection>
    </>
  );
}
