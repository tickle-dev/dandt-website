import { useCallback, useId, useMemo, useRef, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard/ProjectCard.tsx';
import { ProjectViewer } from '../components/ProjectViewer/ProjectViewer.tsx';
import { CardGrid } from '../components/ui/CardGrid.tsx';
import { CtaLink } from '../components/ui/CtaLink.tsx';
import { FilterButtons } from '../components/ui/FilterButtons.tsx';
import { LiveRegion } from '../components/ui/LiveRegion.tsx';
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';
import {
  CATEGORY_NAMES,
  CTA_LABELS,
  FILTER_LABELS,
  PAGE_HEADINGS,
  PAGE_NAMES,
  RESULT_COUNTS,
  ROUTES,
  closingBanners,
  pageIntros,
  projects,
} from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import {
  ALL,
  applyCategoryFilter,
  buildFilterOptions,
  type FilterOption,
} from '../lib/categoryFilter.ts';
import { formatResultCount } from '../lib/text.ts';
import styles from './ProjectsPage.module.css';

/** "All" first, then each category with at least one project, in Glossary order (Req 10.3). */
const FILTER_OPTIONS = buildFilterOptions(projects, CATEGORY_NAMES);

interface Announcement {
  message: string;
  key: number;
}

/**
 * Projects_Page (design.md, Page layouts → Projects; Req 10, 14.8, 14.10, 15.11, 21.1,
 * 26.8, 26.12, 26.14): page header, filtered Project_Card grid with the Project_Viewer,
 * and the closing CTA banner.
 *
 * The selected option is component state, so every mount starts on "All" (Req 10.8) and a
 * viewport change keeps it (Req 14.8). The result count is announced only after a filter
 * selection, never on mount (Req 15.11). Focus stays on the chosen filter button.
 */
export function ProjectsPage() {
  usePageTitle(PAGE_NAMES.projects);
  const headingId = useId();
  const closingId = useId();

  const [selected, setSelected] = useState<FilterOption['id']>(ALL);
  const [announcement, setAnnouncement] = useState<Announcement>({ message: '', key: 0 });
  const displayed = useMemo(() => applyCategoryFilter(projects, selected), [selected]);

  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const [openerId, setOpenerId] = useState<string | null>(null);
  const closeViewer = useCallback(() => setOpenerId(null), []);

  const selectFilter = useCallback((id: FilterOption['id']) => {
    const count = applyCategoryFilter(projects, id).length;
    setSelected(id);
    setAnnouncement((previous) => ({
      message: formatResultCount(count, RESULT_COUNTS.projects.singular, RESULT_COUNTS.projects.plural),
      key: previous.key + 1,
    }));
  }, []);

  const banner = closingBanners.projects;

  return (
    <>
      <PageSection tone="dark" aria-labelledby={headingId}>
        <PageHeading id={headingId}>{PAGE_HEADINGS.projects}</PageHeading>
        <p>{pageIntros.projects}</p>
      </PageSection>

      <PageSection tone="light">
        <div className={styles.filters}>
          <FilterButtons
            options={FILTER_OPTIONS}
            selected={selected}
            onSelect={selectFilter}
            label={FILTER_LABELS.projects}
          />
        </div>
        <LiveRegion message={announcement.message} announceKey={announcement.key} />
        <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
          {displayed.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setOpenerId}
              cardRefs={cardRefs}
            />
          ))}
        </CardGrid>
        {openerId !== null && (
          <ProjectViewer
            projects={displayed}
            openerId={openerId}
            cardRefs={cardRefs}
            onClose={closeViewer}
          />
        )}
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
