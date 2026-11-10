// Home_Page (design.md, Page layouts → Home; Req 6.1–6.11, 5.9, 13.12, 16.14, 20.7, 26.8,
// 26.10–26.12, 26.14–26.16, 26.19, 26.32, 27.2). Sections, top to bottom (Req 6.9): hero,
// services, Why Choose D&T Go Elite, How It Works, Review_Preview, closing CTA banner.
import { useId } from 'react';
import { getPhoto } from '../assets/photos/photoManifest.ts';
import { ReviewCard } from '../components/ReviewCard/ReviewCard.tsx';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard/ServiceCategoryCard.tsx';
import { Card } from '../components/ui/Card.tsx';
import { CardGrid } from '../components/ui/CardGrid.tsx';
import { CtaLink } from '../components/ui/CtaLink.tsx';
import { Icon } from '../components/ui/Icon.tsx';
import { Notice } from '../components/ui/Notice.tsx';
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';
import { SmartImage } from '../components/ui/SmartImage.tsx';
import { TextLink } from '../components/ui/TextLink.tsx';
import {
  CTA_LABELS,
  PAGE_NAMES,
  ROUTES,
  SECTION_HEADINGS,
  catalog,
  home,
  reviews,
  site,
} from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import styles from './HomePage.module.css';

const heroPhoto = getPhoto(home.hero.photo);
/** The three featured Reviews, in Content_Module order (Req 6.6). */
const featuredReviews = reviews.filter((review) => review.featured);

export function HomePage() {
  usePageTitle(PAGE_NAMES.home);
  const heroId = useId();
  const servicesId = useId();
  const whyId = useId();
  const stepsId = useId();
  const reviewsId = useId();
  const closingId = useId();

  return (
    <>
      {/* 1 Hero: roofing photo under the overlay, centered copy, the site's only Secondary CTA. No Tagline (Req 27.2). */}
      <PageSection
        tone="dark"
        align="center"
        aria-labelledby={heroId}
        className={styles.hero}
      >
        <span className={styles.heroMedia}>
          <SmartImage photo={heroPhoto} alt={home.hero.alt} fill priority />
        </span>
        <div className={styles.heroContent}>
          <PageHeading id={heroId} className={styles.heroHeading}>
            {home.hero.headline}
          </PageHeading>
          <p className={styles.heroSentence}>{home.hero.sentence}</p>
          <div className={styles.heroActions}>
            <CtaLink to={ROUTES.contact} variant="primary" size="lg">
              {CTA_LABELS.getQuote}
            </CtaLink>
            <CtaLink to={ROUTES.services} variant="secondary" size="lg">
              {CTA_LABELS.viewServices}
            </CtaLink>
          </div>
        </div>
      </PageSection>

      {/* 2 Services: the seven category cards in Service_Catalog order (Req 6.2, 6.3). */}
      <PageSection tone="light" aria-labelledby={servicesId}>
        <SectionHeading id={servicesId}>{SECTION_HEADINGS.homeServices}</SectionHeading>
        <CardGrid as="ul" columns={{ desktop: 4 }}>
          {catalog.categories.map((category) => (
            <ServiceCategoryCard key={category.slug} category={category} />
          ))}
        </CardGrid>
      </PageSection>

      {/* 3 Why Choose D&T Go Elite: four non-interactive charcoal highlight cards (Req 6.4). */}
      <PageSection tone="dark" aria-labelledby={whyId}>
        <SectionHeading id={whyId}>{SECTION_HEADINGS.whyChoose}</SectionHeading>
        <CardGrid as="ul" columns={{ desktop: 4 }}>
          {home.highlights.map((highlight) => (
            <Card key={highlight.title} variant="dark">
              {/* One child, so the Card's last-child rule keeps the text under its title. */}
              <div>
                <Icon name={highlight.icon} size="lg" className={styles.highlightIcon} />
                <h3>{highlight.title}</h3>
                <p>{highlight.text}</p>
              </div>
            </Card>
          ))}
        </CardGrid>
      </PageSection>

      {/* 4 How It Works: an ordered list; the visible numerals are decorative (Req 6.5). */}
      <PageSection tone="light" aria-labelledby={stepsId}>
        <SectionHeading id={stepsId}>{SECTION_HEADINGS.howItWorks}</SectionHeading>
        <CardGrid as="ol" columns={{ desktop: 4 }}>
          {home.steps.map((step, index) => (
            <div key={step.title}>
              <span className={styles.stepNumber} aria-hidden="true">
                {index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </CardGrid>
      </PageSection>

      {/* 5 Review_Preview: sample notice above the three featured reviews (Req 6.6, 6.7, 20.7). */}
      <PageSection tone="dark" aria-labelledby={reviewsId}>
        <SectionHeading id={reviewsId}>{SECTION_HEADINGS.reviewPreview}</SectionHeading>
        <Notice className={styles.reviewNotice}>{site.reviewSampleNotice}</Notice>
        <CardGrid as="ul" columns={{ desktop: 3 }}>
          {featuredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} variant="dark" />
          ))}
        </CardGrid>
        <div className={styles.reviewLink}>
          <TextLink to={ROUTES.reviews} standalone>
            {CTA_LABELS.readAllReviews}
          </TextLink>
        </div>
      </PageSection>

      {/* 6 Closing CTA banner: black and centered; the sibling rule draws the gray line above it (Req 6.8, 26.11). */}
      <PageSection tone="dark" align="center" aria-labelledby={closingId}>
        <SectionHeading id={closingId} align="center">
          {home.closing.heading}
        </SectionHeading>
        <p>{home.closing.text}</p>
        <div className={styles.bannerCta}>
          <CtaLink to={ROUTES.contact} variant="primary" size="lg">
            {CTA_LABELS.getQuote}
          </CtaLink>
        </div>
      </PageSection>
    </>
  );
}
