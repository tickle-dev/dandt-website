// Service_Category_Page (design.md, Page layouts → Service Category; Req 5.1, 5.6, 5.9, 8.1–8.7,
// 26.10, 26.16, 26.23).
import { useId } from 'react';
import { useParams } from 'react-router';
import { getPhoto } from '../assets/photos/photoManifest.ts';
import { Breadcrumb } from '../components/ui/Breadcrumb.tsx';
import { Card } from '../components/ui/Card.tsx';
import { CardGrid } from '../components/ui/CardGrid.tsx';
import { CtaLink } from '../components/ui/CtaLink.tsx';
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';
import { SmartImage } from '../components/ui/SmartImage.tsx';
import { TextLink } from '../components/ui/TextLink.tsx';
import {
  BREADCRUMB,
  ROUTES,
  SECTION_HEADINGS,
  catalog,
  categoryHeaderAlt,
  categoryPath,
  quotePath,
  requestQuoteFor,
  type ServiceCategory,
} from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { getCategoryBySlug } from '../lib/catalog.ts';
import { NotFoundPage } from './NotFoundPage.tsx';
import styles from './ServiceCategoryPage.module.css';

/**
 * `/services/:categorySlug`. The lookup is exact and case-sensitive; a miss renders the
 * Not_Found_Page in place, so the address bar keeps the requested URL (Req 5.6, 25.12).
 * The view is keyed by slug so no state carries over between categories (Req 8.7).
 */
export function ServiceCategoryPage() {
  const { categorySlug = '' } = useParams();
  const category = getCategoryBySlug(catalog, categorySlug);
  if (!category) return <NotFoundPage />;
  return <CategoryView key={category.slug} category={category} />;
}

function CategoryView({ category }: { category: ServiceCategory }) {
  usePageTitle(category.name);
  const titleId = useId();
  const whatWeDoId = useId();
  const otherId = useId();
  const otherCategories = catalog.categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      {/* 1 Title section: breadcrumb, h1, summary and the section's one Primary CTA (Req 8.1, 8.3, 8.5). */}
      <PageSection tone="dark" aria-labelledby={titleId}>
        <Breadcrumb
          className={styles.breadcrumb}
          items={[
            { label: BREADCRUMB.home, to: ROUTES.home },
            { label: BREADCRUMB.services, to: ROUTES.services },
            { label: category.name },
          ]}
        />
        <PageHeading id={titleId}>{category.name}</PageHeading>
        <p>{category.summary}</p>
        <div className={styles.cta}>
          <CtaLink to={quotePath(category.slug)} variant="primary" size="lg">
            {requestQuoteFor(category.name)}
          </CtaLink>
        </div>
      </PageSection>

      {/* 2 Header image: full width, outside any Container, no radius, overlay or text (Req 26.10, 26.16, 26.23). */}
      <div className={styles.headerImage}>
        <SmartImage
          photo={getPhoto(category.headerPhoto)}
          alt={categoryHeaderAlt(category.name)}
          fill
          priority
          sizes="100vw"
          className={styles.headerImageFill}
        />
      </div>

      {/* 3 What We Do: every Service_Item in catalog order, non-interactive cards, 2/2/1 (Req 8.2). */}
      <PageSection tone="light" aria-labelledby={whatWeDoId}>
        <SectionHeading id={whatWeDoId}>{SECTION_HEADINGS.whatWeDo}</SectionHeading>
        <CardGrid as="ul" columns={{ tablet: 2, desktop: 2 }}>
          {category.items.map((item) => (
            <Card key={item.slug} variant="light">
              {/* One wrapper, so the Card's "last child at the bottom" rule leaves the text together. */}
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </Card>
          ))}
        </CardGrid>
      </PageSection>

      {/* 4 Explore Other Services: the six other categories in catalog order, 3/2/1 (Req 8.4, 8.7). */}
      <PageSection tone="dark" aria-labelledby={otherId}>
        <SectionHeading id={otherId}>{SECTION_HEADINGS.exploreOtherServices}</SectionHeading>
        <CardGrid as="ul" columns={{ tablet: 2, desktop: 3 }}>
          {otherCategories.map((other) => (
            <TextLink key={other.slug} to={categoryPath(other.slug)} standalone>
              {other.name}
            </TextLink>
          ))}
        </CardGrid>
      </PageSection>
    </>
  );
}
