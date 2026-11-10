// About_Page (design.md, Page layouts → About; Req 9.1–9.8, 26.10–26.12, 26.14, 26.23,
// 27.10, 27.11). Sections, top to bottom: page header, Our Story, stats band, Our Values,
// service area, closing CTA banner. The only Primary CTA is in the closing banner.
import { useId } from 'react';
import { getPhoto } from '../assets/photos/photoManifest.ts';
import { Card } from '../components/ui/Card.tsx';
import { CardGrid } from '../components/ui/CardGrid.tsx';
import { CtaLink } from '../components/ui/CtaLink.tsx';
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';
import { SmartImage } from '../components/ui/SmartImage.tsx';
import { TextLink } from '../components/ui/TextLink.tsx';
import {
  CTA_LABELS,
  PAGE_HEADINGS,
  PAGE_NAMES,
  ROUTES,
  SECTION_HEADINGS,
  STAT_LABELS,
  about,
  closingBanners,
  radiusStatValue,
} from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import styles from './AboutPage.module.css';

const aboutPhoto = getPhoto(about.photo);

/** The four stats band figures with their labels, in Req 9.3 order. */
const STATS = [
  { key: 'yearsInBusiness', value: about.stats.yearsInBusiness, label: STAT_LABELS.yearsInBusiness },
  { key: 'projectsCompleted', value: about.stats.projectsCompleted, label: STAT_LABELS.projectsCompleted },
  { key: 'satisfaction', value: about.stats.satisfaction, label: STAT_LABELS.satisfaction },
  {
    key: 'serviceRadiusMiles',
    value: radiusStatValue(about.stats.serviceRadiusMiles),
    label: STAT_LABELS.serviceRadiusMiles,
  },
] as const;

/** Same radius as the stats band, so the two always match (Req 9.4). */
const serviceAreaText = about.serviceArea.text.replace('{radius}', String(about.stats.serviceRadiusMiles));

/** Four values fill one desktop row; 3, 5 or 6 values use three columns. */
const valueColumns = about.values.length === 4 ? 4 : 3;

export function AboutPage() {
  usePageTitle(PAGE_NAMES.about);
  const headingId = useId();
  const storyId = useId();
  const valuesId = useId();
  const areaId = useId();
  const closingId = useId();
  const banner = closingBanners.about;
  return (
    <>
      {/* 1 Page header: the page's single h1 (Req 9.7). */}
      <PageSection tone="dark" aria-labelledby={headingId}>
        <PageHeading id={headingId}>{PAGE_HEADINGS.about}</PageHeading>
        <p>{about.intro}</p>
      </PageSection>

      {/* 2 Our Story: text left and the 4:5 About image right on desktop; stacked below 1024 px (Req 9.1, 26.23, 27.10). */}
      <PageSection tone="light" aria-labelledby={storyId} containerClassName={styles.story}>
        <div>
          <SectionHeading id={storyId}>{SECTION_HEADINGS.ourStory}</SectionHeading>
          {about.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.storyMedia}>
          <SmartImage
            photo={aboutPhoto}
            alt={about.alt}
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 80vw, 100vw"
          />
        </div>
      </PageSection>

      {/* 3 Stats band: each list item reads as "figure label" (Req 9.3); 2/2/4 columns. */}
      <PageSection tone="dark">
        <CardGrid as="ul" columns={{ mobile: 2, tablet: 2, desktop: 4 }}>
          {STATS.map((stat) => (
            <p key={stat.key} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>{' '}
              <span className={styles.statLabel}>{stat.label}</span>
            </p>
          ))}
        </CardGrid>
      </PageSection>

      {/* 4 Our Values: non-interactive off-white cards (Req 9.2, 27.11). */}
      <PageSection tone="light" aria-labelledby={valuesId}>
        <SectionHeading id={valuesId}>{SECTION_HEADINGS.ourValues}</SectionHeading>
        <CardGrid as="ul" columns={{ desktop: valueColumns }}>
          {about.values.map((value) => (
            <Card key={value.title} variant="light">
              {/* One child, so the Card's last-child rule keeps the sentence under its title. */}
              <div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </Card>
          ))}
        </CardGrid>
      </PageSection>

      {/* 5 Service area: heading, radius sentence and the Service_Areas_Page link (Req 9.4, 9.5). */}
      <PageSection tone="dark" aria-labelledby={areaId}>
        <SectionHeading id={areaId}>{about.serviceArea.heading}</SectionHeading>
        <p>{serviceAreaText}</p>
        <div className={styles.areaLink}>
          <TextLink to={ROUTES.serviceAreas} standalone>
            {CTA_LABELS.seeAllServiceAreas}
          </TextLink>
        </div>
      </PageSection>

      {/* 6 Closing CTA banner: black and centered; the sibling rule draws the gray line above it (Req 9.6, 9.8, 26.11). */}
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
