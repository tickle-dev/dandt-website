// Route table (design.md, Routes; Req 5.1, 5.5, 5.6, 5.10, 5.11, 25.11, 25.12).
// - basename strips the build-time Base_Path, so deep links work under `/` and `/<repo>/`.
// - React Router matches case-insensitively by default, so every route sets
//   `caseSensitive: true`; `/About` falls through to `*` (Req 5.11).
// - A single trailing slash (`/about/`) already matches the same route (Req 5.10).
import { createBrowserRouter, type RouteObject } from 'react-router';
import { ROUTES } from '../content/index.ts';
import { routerBasename } from '../lib/basePath.ts';
import { AboutPage } from '../pages/AboutPage.tsx';
import { ContactPage } from '../pages/ContactPage.tsx';
import { FaqPage } from '../pages/FaqPage.tsx';
import { HomePage } from '../pages/HomePage.tsx';
import { NotFoundPage } from '../pages/NotFoundPage.tsx';
import { ProjectsPage } from '../pages/ProjectsPage.tsx';
import { ReviewsPage } from '../pages/ReviewsPage.tsx';
import { ServiceAreasPage } from '../pages/ServiceAreasPage.tsx';
import { ServiceCategoryPage } from '../pages/ServiceCategoryPage.tsx';
import { ServicesPage } from '../pages/ServicesPage.tsx';
import { RootLayout } from './RootLayout.tsx';

/** Child paths are relative to the root route, so the leading '/' of each Route_Path is dropped. */
const child = (path: string): string => path.replace(/^\//, '');

export const routes: RouteObject[] = [
  {
    path: ROUTES.home,
    caseSensitive: true,
    element: <RootLayout />,
    children: [
      { index: true, caseSensitive: true, element: <HomePage /> },
      { path: child(ROUTES.services), caseSensitive: true, element: <ServicesPage /> },
      {
        path: `${child(ROUTES.services)}/:categorySlug`,
        caseSensitive: true,
        element: <ServiceCategoryPage />,
      },
      { path: child(ROUTES.projects), caseSensitive: true, element: <ProjectsPage /> },
      { path: child(ROUTES.reviews), caseSensitive: true, element: <ReviewsPage /> },
      { path: child(ROUTES.serviceAreas), caseSensitive: true, element: <ServiceAreasPage /> },
      { path: child(ROUTES.faq), caseSensitive: true, element: <FaqPage /> },
      { path: child(ROUTES.about), caseSensitive: true, element: <AboutPage /> },
      { path: child(ROUTES.contact), caseSensitive: true, element: <ContactPage /> },
      { path: '*', caseSensitive: true, element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: routerBasename(import.meta.env.BASE_URL),
});
