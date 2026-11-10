import { useId } from 'react';
import { MapEmbed } from '../components/MapEmbed/MapEmbed.tsx';
import { CtaLink } from '../components/ui/CtaLink.tsx';
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { CTA_LABELS, PAGE_HEADINGS, PAGE_NAMES, ROUTES, serviceAreas } from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { sortCities } from '../lib/cities.ts';
import styles from './ServiceAreasPage.module.css';

/** Sorted once at module load; the content is static (Req 18.3, 18.6). */
const CITIES = sortCities(serviceAreas.cities);

/**
 * Service_Areas_Page (design.md, Page layouts → Service Areas; Req 18, 22.2, 22.5, 26.12):
 * the page header, then one off-white section with the city list and the DFW Map_Embed
 * (side by side from 1024 px, stacked in DOM order below), the nearby-cities note and the
 * section's only Primary CTA. The Map_Embed handles its own failure states, so the rest of
 * the page stays in place if the frame does not load (Req 18.7).
 */
export function ServiceAreasPage() {
  usePageTitle(PAGE_NAMES.serviceAreas);
  const headingId = useId();

  return (
    <>
      <PageSection tone="dark" aria-labelledby={headingId}>
        <PageHeading id={headingId}>{PAGE_HEADINGS.serviceAreas}</PageHeading>
        <p>{serviceAreas.intro}</p>
      </PageSection>

      <PageSection tone="light">
        <div className={styles.layout}>
          <ul className={styles.cities}>
            {CITIES.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
          <MapEmbed embed={serviceAreas.map} className={styles.map} />
        </div>
        <p className={styles.note}>{serviceAreas.note}</p>
        <div className={styles.cta}>
          <CtaLink to={ROUTES.contact} variant="primary" size="lg">
            {CTA_LABELS.getQuote}
          </CtaLink>
        </div>
      </PageSection>
    </>
  );
}
