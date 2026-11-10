import { useId } from 'react';
import { FaqAccordion } from '../components/FaqAccordion/FaqAccordion.tsx';
import { CtaLink } from '../components/ui/CtaLink.tsx';
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';
import {
  CTA_LABELS,
  PAGE_HEADINGS,
  PAGE_NAMES,
  ROUTES,
  closingBanners,
  faq,
  pageIntros,
} from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import styles from './FaqPage.module.css';

/**
 * FAQ_Page (design.md, Page layouts → FAQ; Req 19, 26.12, 26.14): page header, one
 * FaqAccordion per FAQ group in Content_Module order inside a single off-white
 * Page_Section, and the closing CTA banner.
 */
export function FaqPage() {
  usePageTitle(PAGE_NAMES.faq);
  const headingId = useId();
  const closingId = useId();
  const banner = closingBanners.faq;

  return (
    <>
      <PageSection tone="dark" aria-labelledby={headingId}>
        <PageHeading id={headingId}>{PAGE_HEADINGS.faq}</PageHeading>
        <p>{pageIntros.faq}</p>
      </PageSection>

      <PageSection tone="light">
        <div className={styles.groups}>
          {faq.map((group) => (
            <FaqAccordion key={group.id} group={group} />
          ))}
        </div>
      </PageSection>

      <PageSection tone="dark" align="center" aria-labelledby={closingId}>
        <SectionHeading id={closingId} align="center">
          {banner.heading}
        </SectionHeading>
        <p>{banner.text}</p>
        <div className={styles.bannerCta}>
          <CtaLink to={ROUTES.contact} variant="primary" size="lg">
            {CTA_LABELS.getQuote}
          </CtaLink>
        </div>
      </PageSection>
    </>
  );
}
