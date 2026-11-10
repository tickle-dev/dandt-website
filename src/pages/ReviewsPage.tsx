import { useCallback, useId, useMemo, useState } from 'react';
import { RatingSummary } from '../components/RatingSummary/RatingSummary.tsx';
import { ReviewCard } from '../components/ReviewCard/ReviewCard.tsx';
import { CardGrid } from '../components/ui/CardGrid.tsx';
import { CtaLink } from '../components/ui/CtaLink.tsx';
import { FilterButtons } from '../components/ui/FilterButtons.tsx';
import { Notice } from '../components/ui/Notice.tsx';
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';
import { TextLink } from '../components/ui/TextLink.tsx';
import {
  CATEGORY_NAMES,
  CTA_LABELS,
  FILTER_LABELS,
  PAGE_HEADINGS,
  PAGE_NAMES,
  ROUTES,
  closingBanners,
  pageIntros,
  reviews,
  site,
} from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import {
  ALL,
  applyCategoryFilter,
  buildFilterOptions,
  type FilterOption,
} from '../lib/categoryFilter.ts';
import styles from './ReviewsPage.module.css';

/** "All" first, then each category with at least one review, in Glossary order (Req 20.10). */
const FILTER_OPTIONS = buildFilterOptions(reviews, CATEGORY_NAMES);

/**
 * Reviews_Page (design.md, Page layouts → Reviews; Req 20, 14.8, 14.10, 15.11, 26.8,
 * 26.12, 26.14, 26.27): page header with the sample notice, Rating_Summary and
 * "Leave a Review" link; the filtered Review_Card grid; and the closing CTA banner.
 *
 * The selected option is page state because the Rating_Summary in the header depends on
 * the filter in the grid section. Every mount starts on "All" (Req 20.11) and a viewport
 * change keeps it (Req 14.8). FilterButtons ignores a click on the selected option
 * (Req 20.16), and focus stays on the chosen button (Req 20.12).
 *
 * Announcements: the Rating_Summary's own polite live region announces the new average
 * and "Based on N reviews" after each selection, never on mount (Req 20.17). That count
 * equals the number of displayed Review_Cards (Req 20.9), so it also meets Req 15.11;
 * the page adds no second result-count announcement.
 */
export function ReviewsPage() {
  usePageTitle(PAGE_NAMES.reviews);
  const headingId = useId();
  const closingId = useId();
  const [selected, setSelected] = useState<FilterOption['id']>(ALL);
  const displayed = useMemo(() => applyCategoryFilter(reviews, selected), [selected]);
  const ratings = useMemo(() => displayed.map((review) => review.rating), [displayed]);
  const selectFilter = useCallback((id: FilterOption['id']) => setSelected(id), []);
  const banner = closingBanners.reviews;

  return (
    <>
      {/* 1 Page header: notice above the Rating_Summary (Req 20.7), then "Leave a Review" (Req 20.15). */}
      <PageSection tone="dark" aria-labelledby={headingId}>
        <PageHeading id={headingId}>{PAGE_HEADINGS.reviews}</PageHeading>
        <p>{pageIntros.reviews}</p>
        <Notice className={styles.notice}>{site.reviewSampleNotice}</Notice>
        <RatingSummary ratings={ratings} announceKey={selected} />
        <div className={styles.leaveReview}>
          <TextLink href={site.leaveReviewUrl} external standalone>
            {CTA_LABELS.leaveReview}
          </TextLink>
        </div>
      </PageSection>

      {/* 2 Grid: Review_Filter and the displayed Review_Cards in Content_Module order (3/2/1). */}
      <PageSection tone="light">
        <div className={styles.filters}>
          <FilterButtons
            options={FILTER_OPTIONS}
            selected={selected}
            onSelect={selectFilter}
            label={FILTER_LABELS.reviews}
          />
        </div>
        <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
          {displayed.map((review) => (
            <ReviewCard key={review.id} review={review} variant="light" />
          ))}
        </CardGrid>
      </PageSection>

      {/* 3 Closing CTA banner. */}
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
