# Requirements Document

## Introduction

D&T Go Elite Roofing and Construction ("D&T Go Elite") is a home improvement, roofing, and construction company based in Dallas, Texas, serving the greater Dallas–Fort Worth (DFW) area. This feature is a frontend-only concept website, built with React, that will be demonstrated to the customer and hosted on GitHub Pages. The Website presents the company, its seven service categories and the services within each, sample projects with a photo viewer, customer reviews, the DFW service area, frequently asked questions, and a quote request form.

The Website has no backend: no authentication, database, payment, or e-commerce. Navigation, links, responsive styling, and interactive UI (mobile menu, service filtering, project filtering, project photo viewer, review filtering, FAQ accordion, form validation, form confirmation) must work fully in the browser. The only runtime requests to third-party origins are the embedded Google Maps views. All company details that the customer has not yet supplied (contact details, reviews, project descriptions, company history, FAQ answers, social media URLs) use clearly marked placeholder content.

The visual direction is modern, minimal, and upscale: a black and charcoal plus off-white neutral palette, one gold accent color taken from the company logo, a serif heading font that echoes the logo, generous whitespace, and clear calls to action aimed at first-time visitors.

The copy presents D&T Go Elite as a company of specialized, trade-specific teams rather than a general contractor, with a restrained brand message that every job and every team is held to an elite standard (Requirement 27).

Visual quality and a clean, uncluttered layout are the top priority of the demo. They are specified mainly in Requirement 13 (Visual Theme), Requirement 14 (Responsive Layout), Requirement 17 (Brand Logo), and Requirement 26 (Clean Visual Layout and UI Consistency).

### Assumptions (pending customer confirmation)

- Pages: Home, Services, Service Category (one per category), Projects, Reviews, Service Areas, FAQ, About, Contact / Free Quote, and a Not Found page. Financing and Careers pages are out of scope.
- Company name: "D&T Go Elite Roofing and Construction" (full name) and "D&T Go Elite" (short name).
- Brand positioning: D&T Go Elite positions itself as a company of specialized, trade-specific teams (for example, a roofing crew, a tile team, a paint crew), not a general contractor, with a brand message that every job and every team is "elite". The company has no official slogan, so the placeholder Tagline (for example, "Elite teams. Elite results."), shown only in the Footer, is a proposal that the customer may keep, change, or remove.
- Logo: `company-logo.png` at the workspace root, a portrait PNG (about 1185×2560 pixels) with a solid black background and a gold metallic wordmark. The "ROOFING AND CONSTRUCTION" line is about 8% of the Logo height, so at the 48–64 CSS pixel Site_Header logo heights it would be only 4–5 CSS pixels tall; the Site_Header therefore shows the compact Header_Logo, and the Footer shows the full Logo. The customer will add an SVG or higher-resolution logo file and an icon-only mark (the Brand_Icon) to the workspace; both are pending. Until they arrive, the Website derives the Logo, the Header_Logo, and the favicon from `company-logo.png`, which stays unchanged.
- Color palette: black (matching the logo background) and charcoal dark neutrals, an off-white light neutral, a medium gray, and a gold accent sampled from the logo wordmark.
- Fonts: a serif heading font that echoes the logo lettering and a sans-serif body font, both bundled with the Website.
- Location: Dallas, Texas. Service area: the greater Dallas–Fort Worth area.
- Contact details use placeholders: phone `(214) 555-0123`, email `info@dtgoelite.example`, hours `Mon–Fri 7:00 AM – 6:00 PM, Sat 8:00 AM – 2:00 PM`. The Website shows no street address: the Contact_Page shows the location line "Based in Dallas, TX, serving the greater Dallas–Fort Worth area" instead, and the Contact_Page Map_Embed is centered on Dallas, TX.
- Imagery uses royalty-free stock photos from Unsplash or Pexels under their free licenses. The photos are downloaded, resized, compressed, and bundled with the build, and each photo's source is recorded in an attributions file. Stock photos and placeholder reviews must be replaced with real customer material before any production launch.
- FAQ answers about licensing, insurance, warranties, permits, and payment are placeholder statements that the customer must confirm before production.
- Social media URLs (Facebook, Instagram, Google Business Profile, Nextdoor), the "Leave a Review" URL, and the map embed URLs are placeholders stored in the content module so that they can be replaced later.
- The Reviews_Page filters reviews by Service_Category, using the same pattern as the Project_Filter. Filtering by star rating is not included.
- The Home_Page hero speaks to the whole home (Requirement 6 criterion 1) so the company does not read as roofing-only; storm-ready roofing stays in the supporting sentence because storm repairs are a major draw for DFW homeowners. The Service_Category cards keep Service_Catalog order.
- The Home_Page review preview shows the three Reviews marked as featured in the content module.
- Map embeds use the Google Maps embed URL format that requires no API key. These embeds are the only exception to the rule that the Website makes no runtime requests to other origins.
- The demo is hosted on GitHub Pages and deployed by a GitHub Actions workflow, most likely as a project site under a repository subpath (for example, `https://<owner>.github.io/<repository>/`), or alternatively as a user/organization site (`<owner>.github.io` repository) or on a custom domain served at `/`. GitHub Pages provides no server rewrite rules, so the mechanism for supporting direct loads of deep links (for example, a `404.html` fallback or hash-based routing) is left to the design.
- The Contact_Page reads the Service_Category preselection from a `service` URL query parameter.
- No automated test suite is built for the concept. Statements in these requirements that read like properties (for example, "round-trip property") describe intended behavior and are checked by hand.

## Glossary

- **Website**: The complete D&T Go Elite Roofing and Construction concept single-page React application.
- **Router**: The client-side routing component of the Website that maps Route_Paths to pages.
- **Base_Path**: The URL path prefix under which the Website is served, set by a single build-time configuration value: a repository subpath such as `/<repository>/` for a GitHub Pages project site at `https://<owner>.github.io/<repository>/`, or `/` (the default) for a GitHub Pages user or organization site (`<owner>.github.io` repository) or a custom domain.
- **Route_Path**: The part of a page URL that identifies the page, relative to the Base_Path. Every path written in this document (for example, `/about`) is a Route_Path. Where the design uses hash-based routing, the Route_Path is carried in the URL fragment.
- **Pages_Pipeline**: The GitHub Actions workflow, defined in a workflow file in the repository's `.github/workflows/` directory, that builds the Website and deploys it to GitHub Pages.
- **Logo**: The full wordmark image, showing the gold wordmark ("D&T" with a house roofline, "GO ELITE", "ROOFING AND CONSTRUCTION") on a black background, bundled with the Website and built from the customer's logo file as defined in Requirement 17 criterion 1.
- **Header_Logo**: The compact version of the Logo shown in the Site_Header, showing only "D&T" with the house roofline and "GO ELITE" and omitting the "ROOFING AND CONSTRUCTION" line.
- **Brand_Icon**: The customer's icon-only mark, used for the browser tab icon (favicon).
- **Site_Header**: The persistent top bar of the Website containing the Header_Logo, the Navigation_Menu (Desktop_Viewport only), and the header Call_To_Action.
- **Navigation_Menu**: The set of primary page links (Home, Services, Projects, Reviews, Service Areas, FAQ, About, Contact) shown in the Site_Header on a Desktop_Viewport.
- **Tab_Bar**: The navigation bar fixed to the bottom of the viewport on a Compact_Viewport, with five tabs in the order Home, Services, Projects, Call, More.
- **Mobile_Menu**: The "More" sheet of the Tab_Bar: a panel that opens above the Tab_Bar and lists the Navigation_Menu pages that have no tab of their own (Reviews, Service Areas, FAQ, About, Contact).
- **Menu_Toggle**: The More tab of the Tab_Bar, which opens and closes the Mobile_Menu.
- **Footer**: The persistent bottom section of the Website containing the Logo, company summary, links, Social_Links, and contact information.
- **Home_Page**: The page served at Route_Path `/`.
- **Services_Page**: The page served at Route_Path `/services` listing all Service_Categories and Service_Items.
- **Service_Category_Page**: The page served at Route_Path `/services/{category-slug}` showing a single Service_Category.
- **Projects_Page**: The page served at Route_Path `/projects` showing Project_Cards.
- **Reviews_Page**: The page served at Route_Path `/reviews` showing Review_Cards and the Rating_Summary.
- **Service_Areas_Page**: The page served at Route_Path `/service-areas` describing the DFW service area.
- **FAQ_Page**: The page served at Route_Path `/faq` showing the FAQ_Accordion.
- **About_Page**: The page served at Route_Path `/about`.
- **Contact_Page**: The page served at Route_Path `/contact` containing the Quote_Form and contact details.
- **Not_Found_Page**: The page shown for any Route_Path that does not match a defined route.
- **Content_Module**: The single source-code data module, separate from page and component layout code, that stores all Placeholder_Content, Reviews, FAQ_Items, Service_Area_Cities, Social_Links URLs, and Map_Embed URLs.
- **Service_Catalog**: The static data set containing all Service_Categories and Service_Items supplied by the customer.
- **Service_Category**: One of the seven named groups of services: Exterior Improvements; Interior Improvements; Flooring & Tile; Kitchen & Bathroom Upgrades; Roofing & Exterior Construction; General Construction & Repairs; Outdoor Living.
- **Service_Item**: A single named service within a Service_Category (for example, "Fence Installation & Repair").
- **Slug**: A lowercase, hyphen-separated URL identifier derived from a name, containing only the characters `a–z`, `0–9`, and `-`.
- **Service_Filter**: The text input on the Services_Page that narrows the displayed Service_Items.
- **Project_Card**: A visual card representing a sample completed project, with an image, title, Service_Category, and short description.
- **Project_Filter**: The set of controls on the Projects_Page that narrows displayed Project_Cards by Service_Category.
- **Project_Viewer**: The modal dialog on the Projects_Page that shows a larger photo and the details of one Project_Card and allows moving to the next or previous displayed Project_Card.
- **Review**: A placeholder customer review stored in the Content_Module, with a reviewer name, a Service_Area_City, a Service_Category, a whole-number star rating from 1 to 5, review text, and a featured flag.
- **Review_Card**: The visual card that displays one Review.
- **Review_Filter**: The set of controls on the Reviews_Page that narrows displayed Review_Cards by Service_Category.
- **Rating_Summary**: The element on the Reviews_Page showing the average star rating and the count of the currently displayed Reviews.
- **Review_Preview**: The Home_Page section that shows the three featured Reviews and a link to the Reviews_Page.
- **Service_Area_City**: A named city in the greater DFW area listed in the Content_Module as served by D&T Go Elite.
- **FAQ_Item**: A single question and answer pair stored in the Content_Module.
- **FAQ_Accordion**: The list of FAQ_Items on the FAQ_Page in which each answer can be expanded and collapsed independently.
- **Map_Embed**: An embedded Google Maps frame, loaded from a Google Maps embed URL that requires no API key, together with its "Open in Google Maps" fallback link.
- **Social_Links**: The set of links to the company's Facebook, Instagram, Google Business Profile, and Nextdoor pages, using placeholder URLs from the Content_Module.
- **Click_To_Call_Button**: The Call tab of the Tab_Bar, which links to the placeholder phone number through a `tel:` link.
- **Quote_Form**: The free-quote request form on the Contact_Page.
- **Form_Validator**: The client-side logic that checks Quote_Form field values and produces field error messages.
- **Confirmation_Message**: The on-screen message shown after a valid Quote_Form submission.
- **Call_To_Action**: A visually prominent button or link that directs the visitor to the Contact_Page or the Services_Page, rendered in either the Primary_CTA_Style or the Secondary_CTA_Style.
- **Primary_CTA_Style**: The Call_To_Action style with a Theme gold accent background and black or charcoal text, defined in Requirement 13 criterion 8.
- **Secondary_CTA_Style**: The outline Call_To_Action style with a transparent background, a gold accent border, and gold accent text (darker gold shade on off-white backgrounds), defined in Requirement 13 criterion 8.
- **Card**: A bounded visual container used for a Service_Category card, a Project_Card, a Review_Card, or a "Why Choose D&T Go Elite" highlight.
- **Page_Section**: A full-width horizontal band of a page's `main` content with its own background, such as the Home_Page hero section, a card grid section, or a closing Call_To_Action banner.
- **Hero_Section**: The first Page_Section of the Home_Page, described in Requirement 6 criterion 1.
- **Visual_Review**: The manual pre-demo check, made by the presenter in a browser, of every page and the UI states listed in Requirement 26 criterion 28 at viewport widths of 375, 768, 1280, and 1920 CSS pixels.
- **Placeholder_Content**: Boilerplate text, contact details, reviews, URLs, and images used in place of real customer-supplied content.
- **Brand_Voice**: The tone of all Placeholder_Content copy, which presents D&T Go Elite as dedicated specialist teams for each trade and hints at the "elite" standard without overstatement, as made testable in Requirement 27.
- **Tagline**: A short placeholder slogan (for example, "Elite teams. Elite results.") stored in the Content_Module and shown only in the Footer, proposed for the demo because the company has no official slogan.
- **Stock_Photo**: A royalty-free photograph downloaded from Unsplash or Pexels under that site's free license and bundled with the Website as Placeholder_Content.
- **Attributions_File**: The file `ATTRIBUTIONS.md` at the repository root that records the source of every Stock_Photo.
- **Theme**: The shared set of design tokens (colors, font families, font sizes, spacing scale, border radii, shadows) used by every page of the Website.
- **Mobile_Viewport**: A browser viewport width below 768 CSS pixels.
- **Tablet_Viewport**: A browser viewport width from 768 to 1023 CSS pixels inclusive.
- **Desktop_Viewport**: A browser viewport width of 1024 CSS pixels or more.
- **Compact_Viewport**: A Mobile_Viewport or a Tablet_Viewport, that is, a browser viewport width below 1024 CSS pixels.

## Requirements

### Requirement 1: Frontend-Only Application Delivery

**User Story:** As the demo presenter, I want the Website to run entirely in the browser from a static build, so that I can show the concept to the customer without setting up any backend services.

#### Acceptance Criteria

1. THE Website SHALL be implemented as a React single-page application in which the Router switches between pages without a full browser page reload.
2. THE Website SHALL produce a static build output consisting only of HTML, CSS, JavaScript, font, and image files, with no server-side executable code.
3. THE Website SHALL render every page, including all Service_Catalog data, Project_Cards, Reviews, FAQ_Items, Placeholder_Content, fonts, and images, using only files contained in the static build output, with zero runtime network requests to any origin other than the origin serving the static build output, except the requests made by a Map_Embed as defined in Requirement 22.
4. WHEN the presenter runs the development command documented in the project README, THE Website SHALL start a local development server and print a local URL that, when opened in a browser, displays the Home_Page.
5. WHEN the presenter runs the build command documented in the project README, THE Website SHALL generate the complete static build output in a single output directory and the command SHALL exit with a success status.
6. THE Website SHALL display a "Concept demo" notice in the Footer of every page, including the Not_Found_Page, stating that the site is a non-production concept.
7. IF the build command encounters a compilation error, THEN THE Website build process SHALL exit with a failure status and display an error message identifying the file that caused the failure.
8. WHEN the static build output is served by the local preview command documented in the project README or deployed to GitHub Pages by the Pages_Pipeline, and a visitor loads any defined Route_Path (including any `/services/{category-slug}` path) directly in the browser address bar or by browser refresh, THE Router SHALL display the page that matches that Route_Path.
9. WHEN the static build output is served and a visitor loads a Route_Path that matches no defined route, THE Router SHALL display the Not_Found_Page.

### Requirement 2: Service Catalog Content

**User Story:** As the customer, I want every service I offer to appear on the Website under the correct category, so that visitors see the full range of D&T Go Elite's work.

#### Acceptance Criteria

1. THE Service_Catalog SHALL contain exactly seven Service_Categories, with names and order exactly as listed in the Glossary: Exterior Improvements, Interior Improvements, Flooring & Tile, Kitchen & Bathroom Upgrades, Roofing & Exterior Construction, General Construction & Repairs, Outdoor Living.
2. THE Service_Catalog SHALL contain every Service_Item supplied by the customer, as listed in Appendix A, under the Service_Category in which the customer listed the Service_Item, in the order supplied, with no Service_Items added beyond the customer's list, and with each Service_Item name matching the supplied name exactly in words, spelling, capitalization, and punctuation (including `&`).
3. IF an identical Service_Item name appears in more than one Service_Category in the customer's list (for example, "Backsplash Installation" under both Interior Improvements and Flooring & Tile), THEN THE Service_Catalog SHALL include that Service_Item once in each of those Service_Categories, so that the number of Service_Items in each Service_Category equals the number of items the customer listed under that Service_Category.
4. IF two Service_Item names in the customer's list differ by any character (for example, "Pressure Washing" under Exterior Improvements and "Pressure Washing & Surface Cleaning" under Outdoor Living), THEN THE Service_Catalog SHALL keep them as separate Service_Items, each with its own supplied name and its own Slug, without merging, renaming, or removing either one.
5. THE Service_Catalog SHALL store, for each Service_Category, a non-empty name, a Slug, a summary of one to two sentences and at most 250 characters (written in the Brand_Voice as defined in Requirement 27 criterion 9), and a non-empty icon identifier that refers to an icon bundled with the Website.
6. THE Service_Catalog SHALL store, for each Service_Item, a non-empty name, a Slug, and a boilerplate description of one to three sentences and at most 400 characters.
7. THE Service_Catalog SHALL assign each Service_Category a Slug that is unique among all Service_Categories.
8. THE Service_Catalog SHALL assign each Service_Item a Slug that is unique within the Service_Item's Service_Category.
9. FOR ALL Service_Categories in the Service_Catalog, looking up a Service_Category by the Service_Category's Slug SHALL return that same Service_Category, and FOR ALL Service_Items, looking up a Service_Item by its Service_Category's Slug and its own Slug SHALL return that same Service_Item (round-trip property).
10. IF a Service_Category lookup is given a value that does not exactly match (case-sensitive) the Slug of any Service_Category, including an empty value, THEN THE Service_Catalog SHALL return a not-found result instead of a Service_Category, without raising an error.
11. FOR ALL names in the Service_Catalog, THE Service_Catalog SHALL generate the Slug by converting the name to lowercase and replacing each run of one or more characters outside `a–z` and `0–9` with a single `-`, so that the Slug contains only `a–z`, `0–9`, and `-`, contains no consecutive `-`, neither begins nor ends with `-`, contains at least one character, and is the same every time it is generated from the same name (for example, "Kitchen & Bathroom Upgrades" yields `kitchen-bathroom-upgrades`).

### Requirement 3: Site Header and Primary Navigation

**User Story:** As a first-time visitor, I want a clear, consistent header with navigation, so that I can reach any section of the site from any page.

#### Acceptance Criteria

1. THE Site_Header SHALL appear at the top of every page of the Website, including the Not_Found_Page, at every viewport width.
2. THE Site_Header SHALL display the Header_Logo at its left edge as a link to the Home_Page, and the Header_Logo link SHALL have an accessible name that contains the text "D&T Go Elite".
3. WHILE the viewport is a Desktop_Viewport, THE Site_Header SHALL display the Navigation_Menu links inline, in a single row, in the order Home, Services, Projects, Reviews, Service Areas, FAQ, About, Contact, linking to the Route_Paths `/`, `/services`, `/projects`, `/reviews`, `/service-areas`, `/faq`, `/about`, and `/contact` respectively.
4. WHILE the viewport is a Desktop_Viewport, THE Site_Header SHALL display the Header_Logo, all eight Navigation_Menu links, and the header Call_To_Action on one row without wrapping, truncating, or overlapping one another at every viewport width from 1024 to 1920 CSS pixels.
5. THE Site_Header SHALL display, at every viewport width, a Call_To_Action in the header row that links to the Contact_Page at Route_Path `/contact` and is styled with the Theme gold accent color as its background, labeled "Get a Free Quote" on a Tablet_Viewport or Desktop_Viewport and "Free Quote" on a Mobile_Viewport so that it fits beside the Header_Logo from 320 CSS pixels wide.
6. WHILE the visitor is on the Home_Page, Services_Page, Projects_Page, Reviews_Page, Service_Areas_Page, FAQ_Page, About_Page, or Contact_Page, THE Navigation_Menu SHALL mark the link whose Route_Path matches the current page as active, using the Theme gold accent color plus an underline, SHALL set `aria-current="page"` on that link, and SHALL show no other Navigation_Menu link as active.
7. WHILE the visitor is on a Service_Category_Page, THE Navigation_Menu SHALL mark the Services link as active using the same visual styling defined in criterion 6, SHALL set `aria-current="true"` on the Services link, and SHALL show no other Navigation_Menu link as active.
8. WHILE the page is scrolled vertically by any amount greater than 0 CSS pixels, THE Site_Header SHALL remain fixed at the top edge of the viewport and stay fully visible.
9. WHILE the visitor is on the Not_Found_Page, THE Navigation_Menu SHALL show no link as active and SHALL set `aria-current` on no Navigation_Menu link.
10. WHILE the page is scrolled to the top (scroll position 0), THE Website SHALL position the start of each page's main content below the bottom edge of the Site_Header, so that the Site_Header overlaps no main-content text or controls.
11. THE Site_Header SHALL have one fixed height per viewport category, identical on every page, at every scroll position, and in both the open and closed Mobile_Menu states, of at most 72 CSS pixels on a Mobile_Viewport and at most 88 CSS pixels on a Tablet_Viewport or Desktop_Viewport, with the Header_Logo, Navigation_Menu links, and header Call_To_Action vertically centered in the header row.

### Requirement 4: Mobile Tab Bar

**User Story:** As a visitor on a phone or tablet, I want the main pages one tap away at the bottom of the screen, so that I can navigate with my thumb without opening a hidden menu.

#### Acceptance Criteria

1. WHILE the viewport is a Compact_Viewport, THE Website SHALL display the Tab_Bar on every page, including the Not_Found_Page, fixed to the bottom edge of the viewport, fully within the viewport bounds at every width from 320 to 1023 CSS pixels, visible at every scroll position, and SHALL keep the inline Navigation_Menu links out of view and unreachable by keyboard Tab navigation.
2. THE Tab_Bar SHALL be a `nav` element with the accessible name "Main" and SHALL contain five tabs in this order: Home (`/`), Services (`/services`), Projects (`/projects`), Call (the Click_To_Call_Button, Requirement 24), and More (the Menu_Toggle). Each tab SHALL show an icon above a visible text label and SHALL have a tappable area of at least 44 by 44 CSS pixels.
3. THE Tab_Bar SHALL be at most 72 CSS pixels tall, excluding any device safe-area inset added below it, SHALL use the Theme black background with a gold accent line along its top edge, and SHALL mark the active tab with the Theme gold accent color using the active-page rules of Requirement 3 criteria 6, 7 and 9: the Home, Services or Projects tab when its page (or, for Services, a Service_Category_Page) is displayed, and the More tab when the Reviews, Service Areas, FAQ, About or Contact page is displayed.
4. WHEN the visitor activates the More tab by pointer click, touch tap, or the Enter or Space key while the Mobile_Menu is closed, THE Mobile_Menu SHALL open above the Tab_Bar within 300 milliseconds and list the Reviews, Service Areas, FAQ, About and Contact links in that order, each with an icon and a tappable area of at least 44 by 44 CSS pixels, and THE Website SHALL dim the page behind it with the Theme overlay.
5. WHEN the visitor activates the More tab while the Mobile_Menu is open, taps or clicks the dimmed page behind it, or presses the Escape key, THE Website SHALL close the Mobile_Menu within 300 milliseconds; after the Escape key, keyboard focus SHALL move to the More tab.
6. WHEN the visitor selects any link inside the Mobile_Menu or any Tab_Bar tab, including the link for the page currently displayed, THE Website SHALL close the Mobile_Menu and THE Router SHALL display the selected page.
7. THE More tab SHALL expose an `aria-expanded` attribute whose value is `true` while the Mobile_Menu is open and `false` while it is closed, and an `aria-controls` attribute that references the Mobile_Menu.
8. WHEN the viewport changes from a Compact_Viewport to a Desktop_Viewport while the Mobile_Menu is open, THE Website SHALL close the Mobile_Menu; WHEN the viewport changes between a Mobile_Viewport and a Tablet_Viewport, THE Mobile_Menu SHALL keep its current open or closed state.
9. WHEN any page first loads or the Router displays a different page by any means (link selection, browser back, or browser forward), THE Mobile_Menu SHALL be in the closed state.
10. WHILE the Mobile_Menu is closed, THE Website SHALL keep the Mobile_Menu links hidden from view, unreachable by keyboard Tab navigation, and hidden from assistive technologies.
11. WHILE the Tab_Bar is displayed, THE Website SHALL reserve space below the last Footer content at least equal to the Tab_Bar height, so that when the page is scrolled to the bottom the Tab_Bar covers no Footer text, link, or control, and every focusable element and line of text on the page can be scrolled to a position where no part of it is covered by the Tab_Bar.
12. WHILE the viewport is a Desktop_Viewport, THE Website SHALL hide the Tab_Bar and the Mobile_Menu from view and from assistive technologies and keep them unreachable by keyboard Tab navigation, and SHALL remove the space described in criterion 11.

### Requirement 5: Client-Side Routing

**User Story:** As a visitor, I want every page to have its own URL, so that I can bookmark, share, refresh, and use the browser back button normally.

#### Acceptance Criteria

1. THE Router SHALL map the Route_Paths `/`, `/services`, `/services/{category-slug}`, `/projects`, `/reviews`, `/service-areas`, `/faq`, `/about`, and `/contact` to the Home_Page, Services_Page, Service_Category_Page, Projects_Page, Reviews_Page, Service_Areas_Page, FAQ_Page, About_Page, and Contact_Page respectively, where `{category-slug}` is the Slug of one of the seven Service_Categories in the Service_Catalog and the Service_Category_Page displays the Service_Category whose Slug equals `{category-slug}`.
2. WHEN the visitor follows an internal link, THE Router SHALL update the browser address bar to the link's target URL under the Base_Path, including any query string, add exactly one entry to the browser history, and display the target page without a full page reload, so that the Site_Header and Footer remain on screen throughout the transition.
3. WHEN the visitor uses the browser back or forward control, THE Router SHALL display the page matching the resulting URL without a full page reload.
4. WHEN the visitor loads or refreshes any defined Route_Path URL directly in the address bar, with or without a query string, THE Website SHALL display the page matching that URL and SHALL show the same Route_Path and query string in the address bar once the page is displayed. This applies under the documented development command, under the documented local preview of the static build output, and on GitHub Pages as deployed by the Pages_Pipeline at either a root Base_Path (user or organization site, or custom domain) or a repository-subpath Base_Path (project site) (Requirement 25).
5. IF the visitor requests a Route_Path that matches no defined route, THEN THE Router SHALL display the Not_Found_Page together with the Site_Header and Footer, and SHALL show the requested Route_Path in the address bar once the Not_Found_Page is displayed, without redirecting to the URL of another page.
6. IF the visitor requests `/services/{category-slug}` with a Slug that matches no Service_Category in the Service_Catalog, including a Slug that differs from a valid Slug only in letter case, THEN THE Router SHALL display the Not_Found_Page and SHALL show the requested Route_Path in the address bar.
7. THE Not_Found_Page SHALL display a heading stating that the page was not found, a link to the Home_Page, and a link to the Services_Page.
8. WHEN the visitor follows an internal link to a Route_Path different from the current Route_Path, THE Website SHALL set the viewport's vertical scroll position to 0 once the target page is displayed.
9. WHEN the Router displays a page, THE Website SHALL set the document title to "{Page Name} | D&T Go Elite" before the visitor's next interaction, where {Page Name} is "Home" for the Home_Page, "Services" for the Services_Page, the Service_Category name for a Service_Category_Page, "Projects" for the Projects_Page, "Reviews" for the Reviews_Page, "Service Areas" for the Service_Areas_Page, "FAQ" for the FAQ_Page, "About" for the About_Page, "Contact" for the Contact_Page, and "Page Not Found" for the Not_Found_Page.
10. WHEN the visitor requests a defined Route_Path followed by a single trailing slash (for example, `/about/` or `/services/flooring-tile/`), THE Router SHALL display the same page it displays for that Route_Path without the trailing slash.
11. WHEN the visitor requests a defined Route_Path written with uppercase letters (for example, `/About`), THE Router SHALL display the Not_Found_Page, because Router path matching is case-sensitive.

### Requirement 6: Home Page

**User Story:** As a first-time visitor, I want the home page to show who D&T Go Elite is and what they do at a glance, so that I can decide quickly whether to request a quote.

#### Acceptance Criteria

1. THE Home_Page SHALL display, as the first section of the main content, a hero section containing a headline that includes the text "D&T Go Elite" and speaks to work across the whole home rather than a single trade, a supporting sentence of at most 160 characters written in the Brand_Voice (Requirement 27) that names storm-ready roofing together with interior and outdoor work and states that each trade is handled by its specialist crew, a background or side Stock_Photo that shows residential roofing, construction or home improvement work, a primary Call_To_Action labeled "Get a Free Quote" that links to the Contact_Page, and a secondary Call_To_Action labeled "View Our Services" that links to the Services_Page.
2. THE Home_Page SHALL display exactly seven Service_Category cards, one for each Service_Category in the Service_Catalog and in Service_Catalog order, each showing the Service_Category name, icon, and summary as stored in the Service_Catalog.
3. WHEN the visitor activates any part of a Service_Category card on the Home_Page by click, tap, or the Enter key, THE Router SHALL navigate to the Service_Category_Page at `/services/{category-slug}` for the Slug of that card's Service_Category.
4. THE Home_Page SHALL display a section headed "Why Choose D&T Go Elite" containing exactly four highlights, each with an icon, a title, and one sentence of Placeholder_Content, with the highlight content defined in Requirement 27 criterion 7.
5. THE Home_Page SHALL display a section headed "How It Works" containing exactly four steps numbered 1 to 4 in this order: request a quote, on-site estimate, project scheduling and work, and final walkthrough, each step with a title and one sentence of description, with the project scheduling and work step worded as defined in Requirement 27 criterion 8.
6. THE Review_Preview SHALL display exactly three Review_Cards for the three Reviews marked as featured in the Content_Module, in Content_Module order, each showing the same reviewer name, Service_Area_City, Service_Category name, star rating, and review text that the Reviews_Page shows for that Review.
7. THE Review_Preview SHALL display a link labeled "Read All Reviews" that links to the Reviews_Page at Route_Path `/reviews`.
8. THE Home_Page SHALL display, as the last section of the main content and directly above the Footer, a closing Call_To_Action banner containing a heading and a Call_To_Action labeled "Get a Free Quote" that links to the Contact_Page.
9. THE Home_Page SHALL display its sections in this order from top to bottom: hero section, Service_Category cards, "Why Choose D&T Go Elite", "How It Works", Review_Preview, and closing Call_To_Action banner.
10. WHEN the Home_Page loads at a viewport of 1280 by 720 CSS pixels, THE Home_Page SHALL show the hero headline, the "Get a Free Quote" Call_To_Action, and the "View Our Services" Call_To_Action fully within the initial viewport without scrolling.
11. WHEN the Home_Page loads at a viewport of 375 by 667 CSS pixels, THE Home_Page SHALL show the hero headline and the "Get a Free Quote" Call_To_Action fully within the initial viewport without scrolling and without being covered by the Click_To_Call_Button.

### Requirement 7: Services Page and Service Filter

**User Story:** As a visitor with a specific job in mind, I want to see all services and search them, so that I can confirm D&T Go Elite handles my project.

#### Acceptance Criteria

1. THE Services_Page SHALL display every Service_Category from the Service_Catalog as a section, in Service_Catalog order, showing the Service_Category name, the Service_Category summary, and every Service_Item of that Service_Category in Service_Catalog order.
2. THE Services_Page SHALL display, in each Service_Category section, a link that navigates to the Service_Category_Page at Route_Path `/services/{category-slug}` matching that Service_Category's Slug.
3. WHEN the visitor changes the text in the Service_Filter, THE Services_Page SHALL, within 300 milliseconds and without requiring a submit action, display only the Service_Items whose names contain the Service_Filter text as a contiguous substring, after removing leading and trailing whitespace from the Service_Filter text, compared case-insensitively, and treating every character (including `&`, `/`, `.`, and `-`) as a literal character.
4. WHILE the Service_Filter contains at least one non-whitespace character, THE Services_Page SHALL hide each Service_Category section that contains no matching Service_Item and SHALL keep the Service_Category name, summary, and Service_Category_Page link visible for each section that contains at least one matching Service_Item.
5. THE Services_Page SHALL display, for every Service_Filter text value, only Service_Items present in the Service_Catalog, each under a Service_Category in which the Service_Catalog lists it, with a Service_Item listed in more than one Service_Category shown in every matching section and shown at most once within any single section (filter subset property).
6. THE Services_Page SHALL produce, for every Service_Filter text value, the same set of displayed Service_Items when that filter text is applied to an already-filtered result as when it is applied to the full Service_Catalog (idempotence property).
7. WHEN the Service_Filter becomes empty or contains only whitespace characters, THE Services_Page SHALL display every Service_Category section and every Service_Item in the Service_Catalog exactly as in criterion 1 and SHALL hide the no-match message described in criterion 8.
8. IF the trimmed Service_Filter text matches no Service_Item name, THEN THE Services_Page SHALL hide all Service_Category sections, display a message stating that no services matched the entered text, and display a Call_To_Action linking to the Contact_Page that invites the visitor to describe the project.
9. WHILE the Service_Filter contains at least one character, THE Services_Page SHALL display a clear control next to the Service_Filter that is operable by mouse, touch, and keyboard (Enter or Space) and has an accessible name indicating that it clears the search.
10. WHEN the visitor activates the clear control, THE Services_Page SHALL empty the Service_Filter, display every Service_Item as described in criterion 1, hide the clear control, and move keyboard focus to the Service_Filter.
11. IF the visitor enters or pastes text that would make the Service_Filter longer than 100 characters, THEN THE Services_Page SHALL keep only the first 100 characters in the Service_Filter and discard the remaining input.

### Requirement 8: Service Category Page

**User Story:** As a visitor interested in one type of work, I want a dedicated page for that category, so that I can read about each related service before contacting the company.

#### Acceptance Criteria

1. WHEN the Router displays the Service_Category_Page for a Slug that matches a Service_Category, THE Service_Category_Page SHALL display the Service_Category name from the Service_Catalog as the single top-level page heading, the Service_Category summary from the Service_Catalog, and a header image that is either a bundled Stock_Photo or a styled placeholder block, with a text alternative that contains the Service_Category name.
2. THE Service_Category_Page SHALL display every Service_Item that the Service_Catalog lists under the displayed Service_Category, in Service_Catalog order, each with the Service_Item name and boilerplate description, and SHALL display no Service_Item that the Service_Catalog does not list under the displayed Service_Category.
3. THE Service_Category_Page SHALL display a Call_To_Action with the text "Request a Quote for {Service_Category name}" that links to the Contact_Page Route_Path `/contact` with the displayed Service_Category's Slug passed as the `service` URL query parameter that the Quote_Form reads for Service_Category preselection.
4. THE Service_Category_Page SHALL display exactly six links to other Service_Category_Pages, one for each Service_Category other than the displayed Service_Category, each labeled with the target Service_Category name and listed in Service_Catalog order.
5. THE Service_Category_Page SHALL display a breadcrumb trail of the form Home › Services › {Service_Category name}, in which Home links to `/`, Services links to `/services`, and the final item shows the displayed Service_Category name as non-link text marked as the current page.
6. WHEN the visitor selects the "Request a Quote for {Service_Category name}" Call_To_Action, THE Router SHALL display the Contact_Page with the Quote_Form's Service_Category field preselected to the Service_Category of the originating Service_Category_Page.
7. WHEN the visitor selects a link to another Service_Category_Page, THE Router SHALL display the target Service_Category_Page without a full page reload, with the page heading, summary, header image, Service_Items, Call_To_Action, other-category links, and breadcrumb all showing the target Service_Category and no content from the previous Service_Category.

### Requirement 9: About Page

**User Story:** As a prospective customer, I want to learn about the company, so that I can trust D&T Go Elite with work on my home or property.

#### Acceptance Criteria

1. THE About_Page SHALL display a company story section with a visible section heading and two to three paragraphs of Placeholder_Content, where each paragraph contains two to five sentences and the section refers to the company by the name "D&T Go Elite" and states that the company is based in Dallas, Texas, with the specialist-team content defined in Requirement 27 criterion 10.
2. THE About_Page SHALL display a company values section with a visible section heading and three to six values, each with a title of at most five words and a description of exactly one sentence of Placeholder_Content, including the value defined in Requirement 27 criterion 11.
3. THE About_Page SHALL display a statistics band containing exactly four Placeholder_Content figures, each shown as a numeric value with a text label: years in business (a whole number with an optional "+" suffix), projects completed (a whole number with an optional "+" suffix), customer satisfaction rating (a percentage from 0% to 100%), and service area radius (a whole number of miles).
4. THE About_Page SHALL display a service area section with a visible section heading that states the company serves the greater Dallas–Fort Worth area from Dallas, TX, and states a service radius in miles equal to the service area radius shown in the statistics band.
5. THE About_Page service area section SHALL display a link that navigates to the Service_Areas_Page at Route_Path `/service-areas` without a full browser page reload.
6. THE About_Page SHALL display a "Get a Free Quote" Call_To_Action that links to the Contact_Page and is positioned after all other About_Page sections and above the Footer.
7. THE About_Page SHALL display a single `h1` page heading containing the text "About D&T Go Elite".
8. WHEN the visitor selects the About_Page "Get a Free Quote" Call_To_Action, THE Router SHALL navigate to the Contact_Page without a full browser page reload.

### Requirement 10: Projects Page and Project Filter

**User Story:** As a prospective customer, I want to browse examples of past work, so that I can judge the quality of D&T Go Elite's projects.

#### Acceptance Criteria

1. THE Projects_Page SHALL display at least nine Project_Cards spanning at least five different Service_Categories, with each Project_Card assigned to exactly one Service_Category.
2. THE Project_Card SHALL display an image with non-empty alternative text, a project title of 1 to 60 characters, the Service_Category name matching exactly one of the seven Service_Category names defined in the Glossary, and a description of one to two sentences of Placeholder_Content not exceeding 200 characters.
3. THE Project_Filter SHALL offer an "All" option as the first option, followed by one option for each Service_Category that has at least one Project_Card in the Glossary order of Service_Categories, with no option for a Service_Category that has zero Project_Cards, and with each option operable by mouse click, touch, and the Enter and Space keys.
4. WHEN the visitor selects a Service_Category option in the Project_Filter, THE Projects_Page SHALL, within 300 milliseconds and without a full page reload, display only the Project_Cards belonging to that Service_Category, in the same relative order they appear under "All".
5. WHEN the visitor selects the "All" option in the Project_Filter, THE Projects_Page SHALL, within 300 milliseconds and without a full page reload, display every Project_Card in its original order.
6. THE Project_Filter SHALL keep exactly one option selected at any time and SHALL visually mark the selected option with a background color or border color that differs from every unselected option, using the shared filter option style defined in Requirement 26 criterion 20.
7. FOR ALL Service_Category options, the number of Project_Cards displayed after selecting the option SHALL be at least one and less than or equal to the number displayed after selecting "All", and the sum of Project_Cards displayed across all Service_Category options SHALL equal the number displayed after selecting "All" (metamorphic property).
8. WHEN the Projects_Page loads, THE Project_Filter SHALL have the "All" option selected and THE Projects_Page SHALL display every Project_Card.
9. THE Project_Filter SHALL set `aria-pressed="true"` on the selected option and `aria-pressed="false"` on every unselected option.

### Requirement 11: Contact Page and Quote Form

**User Story:** As a visitor ready to start a project, I want to send a quote request with my details, so that D&T Go Elite can contact me about the work.

#### Acceptance Criteria

1. THE Contact_Page SHALL display the Quote_Form and a contact details panel showing the Placeholder_Content phone number `(214) 555-0123`, email address `info@dtgoelite.example`, business hours `Mon–Fri 7:00 AM – 6:00 PM, Sat 8:00 AM – 2:00 PM`, and the location line "Based in Dallas, TX, serving the greater Dallas–Fort Worth area" in place of a street address.
2. THE Contact_Page SHALL render the phone number as a `tel:` link targeting the digits of the displayed phone number and the email address as a `mailto:` link targeting the displayed email address.
3. THE Quote_Form SHALL contain the following fields in this top-to-bottom order: full name (required), email address (required), phone number (optional), Service_Category (required single selection from the seven Service_Categories plus "Other / Not sure", initially showing no selection), project details (required, multi-line), and preferred contact method (single choice of email or phone, defaulting to email).
4. THE Quote_Form SHALL display a visible text label for every field and SHALL mark each required field with a visible required indicator.
5. THE Quote_Form SHALL limit entry to at most 100 characters in the full name field, 254 characters in the email address field, 20 characters in the phone number field, and 2,000 characters in the project details field, ignoring any characters typed or pasted beyond each limit.
6. WHEN the Contact_Page is loaded with a `service` URL query parameter whose value exactly matches the Slug of one of the seven Service_Categories, THE Quote_Form SHALL preselect that Service_Category in the Service_Category field.
7. IF the Contact_Page is loaded without a `service` URL query parameter, or with a `service` value that does not exactly match any Service_Category Slug, THEN THE Quote_Form SHALL leave the Service_Category field unselected and SHALL display no error.
8. WHEN the visitor submits the Quote_Form by activating the submit button or pressing Enter in a single-line field, THE Form_Validator SHALL validate every field without reloading the page, SHALL display the error for every invalid field at the same time, and SHALL display no field errors before the first submission attempt.
9. IF the full name field is empty or contains only whitespace when the Quote_Form is submitted, THEN THE Form_Validator SHALL display the error "Please enter your name" beneath the full name field.
10. IF the email address field, after trimming leading and trailing whitespace, contains any whitespace, does not contain exactly one `@`, has no characters before the `@`, or has after the `@` a domain without at least one `.` separating non-empty parts with a final part of at least 2 letters, when the Quote_Form is submitted, THEN THE Form_Validator SHALL display the error "Please enter a valid email address" beneath the email address field.
11. IF the phone number field is non-empty and either contains a character other than digits, spaces, parentheses, hyphens, periods, and a leading `+1`, or does not contain exactly 10 digits after removing spaces, parentheses, hyphens, periods, and a leading `+1`, when the Quote_Form is submitted, THEN THE Form_Validator SHALL display the error "Please enter a 10-digit phone number" beneath the phone number field.
12. IF the preferred contact method is phone and the phone number field is empty or contains only whitespace when the Quote_Form is submitted, THEN THE Form_Validator SHALL display the error "Please enter a phone number so we can call you" beneath the phone number field.
13. IF no Service_Category is selected when the Quote_Form is submitted, THEN THE Form_Validator SHALL display the error "Please choose a service category" beneath the Service_Category field.
14. IF the project details field contains fewer than 20 characters after trimming leading and trailing whitespace when the Quote_Form is submitted, THEN THE Form_Validator SHALL display the error "Please tell us a bit more about your project (at least 20 characters)" beneath the project details field.
15. IF the Form_Validator finds one or more invalid fields when the Quote_Form is submitted, THEN THE Quote_Form SHALL move keyboard focus to the first invalid field in the order defined in criterion 3, SHALL keep every entered field value unchanged, and SHALL not display the Confirmation_Message.
16. WHEN the visitor changes the value of a field that currently displays an error, THE Form_Validator SHALL re-validate that field on each change, SHALL remove the error as soon as the value becomes valid, and SHALL replace it with the currently applicable error if the value is still invalid.
17. WHEN the visitor changes the preferred contact method while the phone number field displays an error, THE Form_Validator SHALL re-validate the phone number field against the newly selected contact method.
18. WHEN the visitor submits the Quote_Form with all fields valid, THE Quote_Form SHALL display the Confirmation_Message on the Contact_Page, thanking the visitor by the trimmed full name value and stating that D&T Go Elite will respond within one business day, and SHALL keep the Confirmation_Message visible until the visitor navigates away from the Contact_Page or submits the Quote_Form again.
19. WHEN the Quote_Form displays the Confirmation_Message, THE Quote_Form SHALL clear the full name, email address, phone number, and project details fields, SHALL reset the Service_Category field to unselected and the preferred contact method to email, SHALL display no field errors, and SHALL send no network request.
20. WHEN the Quote_Form displays the Confirmation_Message, THE Quote_Form SHALL move keyboard focus to the Confirmation_Message so that screen readers announce it.
21. THE Form_Validator SHALL report the Quote_Form as valid if and only if it reports zero field errors, for every combination of field values (validation consistency property).
22. THE Form_Validator SHALL produce identical field errors each time it validates the same combination of field values (determinism property).
23. THE Contact_Page SHALL display the Map_Embed centered on Dallas, TX (Requirement 22 criteria 1 and 5) and the Social_Links (Requirement 23) alongside or below the contact details panel.

### Requirement 12: Footer

**User Story:** As a visitor who has scrolled to the bottom of a page, I want useful links and contact details, so that I can keep browsing or get in touch without scrolling back up.

#### Acceptance Criteria

1. THE Footer SHALL appear on every page of the Website, including the Not_Found_Page, as the last content element after the page's `main` landmark. IF a page's content is shorter than the viewport height, THEN THE Footer SHALL sit flush with the bottom edge of the viewport with no blank space below it.
2. THE Footer SHALL display the Logo, the full company name "D&T Go Elite Roofing and Construction", and a company description that is exactly one sentence, ends with a period, contains no more than 160 characters, states that the company serves the Dallas–Fort Worth area, and is written in the Brand_Voice (Requirement 27). THE Footer SHALL display the Tagline (Requirement 27 criterion 2), which appears nowhere else on the Website, as a separate short line directly beside or below the company description, and the Tagline SHALL NOT count toward the one-sentence and 160-character limits of the company description.
3. THE Footer SHALL display links with the visible text labels "Home", "Services", "Projects", "Reviews", "Service Areas", "FAQ", "About", and "Contact", in that order, which point to the Route_Paths `/`, `/services`, `/projects`, `/reviews`, `/service-areas`, `/faq`, `/about`, and `/contact`.
4. THE Footer SHALL display exactly seven Service_Category links. Each link SHALL use the Service_Category name as its visible text and point to `/services/{category-slug}` for that Service_Category. The links SHALL appear in the same order as the Service_Categories in the Service_Catalog.
5. THE Footer SHALL display the Placeholder_Content phone number, email address, and business hours, using values identical to those shown on the Contact_Page. The phone number SHALL be a `tel:` link and the email address SHALL be a `mailto:` link.
6. THE Footer SHALL display the Social_Links defined in Requirement 23.
7. WHEN a page is rendered, THE Footer SHALL display a copyright line in the format "© {current year} D&T Go Elite Roofing and Construction. All rights reserved.", where {current year} is the four-digit calendar year read from the visitor's device clock at render time.
8. WHEN the visitor activates a Footer page link or a Footer Service_Category link, THE Router SHALL display the target page without a full browser page reload, and the Footer SHALL remain present on the new page.
9. WHILE the viewport is a Mobile_Viewport, THE Footer SHALL stack its content groups (Logo and company summary, page links, Service_Category links, contact details, Social_Links) in a single column without horizontal scrolling at viewport widths down to 320 CSS pixels.

### Requirement 13: Visual Theme

**User Story:** As the customer, I want a modern, minimal, upscale look based on my black and gold logo, so that the Website feels professional, matches my brand, and welcomes new clients.

#### Acceptance Criteria

1. THE Theme SHALL define a color palette of exactly five base colors: a black identical to the Logo background color, a charcoal dark neutral, an off-white light neutral, one medium gray for secondary text and borders, and one gold accent color sampled from the Logo wordmark. THE Theme MAY add one darker and one lighter shade of the gold accent for hover, pressed, and light-background states. THE Theme SHALL also define exactly one error color, used only for Form_Validator error text and invalid-field borders, and one overlay value (Theme black at a Theme-defined opacity) used only for the Hero_Section photo overlay and the Project_Viewer backdrop.
2. THE Website SHALL use the gold accent color and its shades only for Call_To_Action elements, active Navigation_Menu links, the hover states of Navigation_Menu links, Footer links, and Project_Filter and Review_Filter options, selected Project_Filter and Review_Filter options, star rating icons, focus indicators, and decorative accent lines and icons.
3. THE Website SHALL apply colors, font families, font sizes, spacing, border radii, and shadows only through values defined in the Theme, so that no page, component, or Placeholder_Content block uses a color, size, spacing, radius, or shadow value that is not in the Theme. The pixel content of images and the content rendered inside a Map_Embed frame are excluded from this rule.
4. THE Theme SHALL define exactly two font families: a serif family for headings whose letterforms echo the Logo wordmark, and a sans-serif family for body text. Each family SHALL be bundled with the Website and followed by the matching generic fallback family (`serif` or `sans-serif`), so that text still renders on every page if the primary font fails to load. THE Theme SHALL set a base body text size of at least 16 CSS pixels on all viewports.
5. THE Theme SHALL define a spacing scale of at least five and at most ten steps. Each step SHALL be a multiple of 4 CSS pixels, from a smallest step of 4 CSS pixels up to a largest step of at least 64 CSS pixels.
6. THE Website SHALL render every text and background color pair with a contrast ratio of at least 4.5:1 for text smaller than 24 CSS pixels (or smaller than 18.66 CSS pixels when bold), and at least 3:1 for larger text. The rule SHALL cover Call_To_Action button labels, gold text, text on Placeholder_Content blocks, and text overlaid on images, in both the default and hover states.
7. THE Website SHALL render gold accent text only on black or charcoal backgrounds, SHALL render text on gold accent backgrounds in black or charcoal, and WHERE gold-colored text or a gold-colored line appears on an off-white background, THE Website SHALL use the darker gold shade, chosen so that the pair meets the contrast ratios of criterion 6.
8. THE Website SHALL render every Call_To_Action in exactly one of two styles, both with the same Theme-defined border radius, font family, and font weight on all pages: the Primary_CTA_Style (gold accent background with black or charcoal text) and the Secondary_CTA_Style (transparent background with a 2 CSS pixel gold accent border and gold accent text, using the darker gold shade for border and text on off-white backgrounds). THE Website SHALL use the Secondary_CTA_Style only for a Call_To_Action that sits in the same Page_Section as a Primary_CTA_Style Call_To_Action, such as the Home_Page "View Our Services" Call_To_Action, and the Primary_CTA_Style for every other Call_To_Action and the Quote_Form submit button. THE Website SHALL use at most two Call_To_Action size variants, and each variant SHALL have the same padding and font size wherever it appears in either style.
9. WHEN the visitor hovers the pointer over an interactive card, button, or link on a Desktop_Viewport or Tablet_Viewport, THE Website SHALL change at least one of background color, border color, text color, text underline, or shadow, and SHALL complete the change within 200 milliseconds. Every Primary_CTA_Style Call_To_Action SHALL change to the same Theme-defined gold hover shade, and every Secondary_CTA_Style Call_To_Action SHALL change to the gold accent background with black text.
10. THE Website SHALL draw every icon used in the Service_Category cards, the "Why Choose D&T Go Elite" highlights, the Footer, the Contact_Page contact details, and the Click_To_Call_Button from a single icon set, with one line style (all outlined or all filled), one Theme-defined icon color per context, and one icon size per context. The Social_Links platform icons and the star rating icons are excluded from the single-set rule, and each of those icon groups SHALL use one size and one Theme-defined color per context.
11. WHEN the visitor moves keyboard focus to an interactive card, button, link, Menu_Toggle, Project_Filter control, Review_Filter control, FAQ_Accordion question, Project_Viewer control, or Quote_Form field, THE Website SHALL display a focus indicator at least 2 CSS pixels thick in the gold accent color on black or charcoal backgrounds and in the darker gold shade on off-white backgrounds. The indicator SHALL have a contrast ratio of at least 3:1 against the adjacent background and SHALL appear within 200 milliseconds.
12. THE Website SHALL separate adjacent full-width page sections vertically by at least 64 CSS pixels on a Desktop_Viewport, at least 48 CSS pixels on a Tablet_Viewport, and at least 32 CSS pixels on a Mobile_Viewport, using values from the Theme spacing scale.
13. IF an icon conveys meaning that is not also given by adjacent visible text, THEN THE Website SHALL provide a text alternative for that icon. Icons that only decorate adjacent visible text SHALL be hidden from assistive technologies.

### Requirement 14: Responsive Layout

**User Story:** As a visitor on any device, I want the layout to fit my screen, so that the Website is easy to read and use on a phone, tablet, or desktop.

#### Acceptance Criteria

1. THE Website SHALL render every page, including the Not_Found_Page, the open Mobile_Menu, the open Project_Viewer, and the Click_To_Call_Button, at every viewport width from 320 to 1920 CSS pixels inclusive so that the page's total rendered width does not exceed the viewport width, no horizontal scrollbar appears, and no text, image, map, form field, or button is cut off at the viewport edge.
2. WHILE the viewport is a Mobile_Viewport, THE Website SHALL display every card grid (Service_Category cards, Project_Cards, and Review_Cards) in one column, with each card spanning the full width of the main page content area.
3. WHILE the viewport is a Tablet_Viewport, THE Website SHALL display every card grid in two columns of equal width.
4. WHILE the viewport is a Desktop_Viewport, THE Website SHALL display every card grid in at least three and at most four columns of equal width.
5. THE Website SHALL limit the width of main page content to a maximum of 1280 CSS pixels, centered horizontally so that the left and right margins differ by no more than 1 CSS pixel, and SHALL keep at least 16 CSS pixels of horizontal space between main page content and each viewport edge at every viewport width.
6. THE Website SHALL render every interactive element (buttons, Navigation_Menu links, the Menu_Toggle, Call_To_Action elements, Project_Filter controls, Review_Filter controls, FAQ_Accordion questions, Project_Viewer controls, the Service_Filter input, Quote_Form fields, Social_Links, Map_Embed fallback links, the Click_To_Call_Button, and Footer links) with a clickable area of at least 44 by 44 CSS pixels, measured including padding; links that appear inline within a sentence of body text are exempt.
7. THE Website SHALL render body text and the text entered in Quote_Form fields and the Service_Filter at a minimum computed font size of 16 CSS pixels at every viewport width.
8. WHEN the viewport width changes from one viewport category (Mobile_Viewport, Tablet_Viewport, Desktop_Viewport) to another through window resize or device rotation, THE Website SHALL apply the layout for the new viewport category without a page reload, and SHALL keep any values entered in the Quote_Form, the Service_Filter text, the selected Project_Filter option, the selected Review_Filter option, and the expanded or collapsed state of every FAQ_Item.
9. WHILE the viewport is a Mobile_Viewport, THE Website SHALL display the Quote_Form fields in a single column, with each field spanning the full width of the Quote_Form.
10. IF a card grid contains fewer cards than its column count (for example, after the Project_Filter or Review_Filter is applied), THEN THE Website SHALL display those cards at the same width they would have in a full row, aligned to the left edge of the grid, without stretching them to fill the row.

### Requirement 15: Accessibility

**User Story:** As a visitor using a keyboard or assistive technology, I want the Website to be fully operable, so that I can use every feature.

#### Acceptance Criteria

1. THE Website SHALL structure every page, including the Not_Found_Page, with exactly one `header` landmark, exactly one `main` landmark, exactly one `footer` landmark, and at least one `nav` landmark, and SHALL give each `nav` landmark an accessible name that differs from the accessible name of every other `nav` landmark on the same page.
2. THE Website SHALL render exactly one `h1` heading on every page, including the Not_Found_Page, and SHALL never increase heading level by more than one from the preceding heading in document order (for example, an `h2` may be followed by an `h3` but not by an `h4`).
3. THE Website SHALL provide a "Skip to main content" link as the first focusable element on every page, hidden from view until it receives keyboard focus, and WHEN the visitor activates that link, THE Website SHALL move keyboard focus to the `main` landmark so that the next Tab key press focuses the first focusable element inside `main`.
4. THE Website SHALL make every interactive element (links, buttons, Call_To_Action elements, the Menu_Toggle, Mobile_Menu links, the Service_Filter and its clear control, Project_Filter options, Project_Cards, Project_Viewer controls, Review_Filter options, FAQ_Accordion questions, Social_Links, Map_Embed fallback links, the Click_To_Call_Button, and every Quote_Form field and the submit button) reachable with the Tab and Shift+Tab keys in an order that matches the visual reading order, operable with the Enter key for links and with the Enter or Space key for buttons, and free of any keyboard trap that prevents focus from moving to the next or previous element. The only exception is the open Project_Viewer, which contains focus as defined in Requirement 21 and which the visitor can always leave with the Escape key or the close button.
5. WHEN an interactive element receives keyboard focus, THE Website SHALL display a focus indicator at least 2 CSS pixels thick with a contrast ratio of at least 3:1 against the adjacent background, and SHALL keep the focused element not fully hidden behind the fixed Site_Header or the Click_To_Call_Button.
6. THE Website SHALL give every informative image (hero image, Project_Card images, Project_Viewer images, and any image that conveys content not repeated in adjacent text) non-empty alternative text of at most 150 characters that describes the image subject and does not consist of a file name or the words "image" or "photo" alone, and SHALL give every decorative image (icons placed beside a text label, background images, and styled placeholder blocks) empty alternative text or hide it from assistive technology.
7. WHEN the Form_Validator displays a field error message, THE Form_Validator SHALL associate that error message with the corresponding field through `aria-describedby` and SHALL set `aria-invalid="true"` on that field, and WHEN the Form_Validator removes the error message, THE Form_Validator SHALL remove that association and remove `aria-invalid="true"` from that field.
8. WHEN the Quote_Form displays the Confirmation_Message, THE Quote_Form SHALL announce the full Confirmation_Message text to screen readers through a polite ARIA live region that is present in the page before the Confirmation_Message is inserted.
9. WHERE the visitor's operating system requests reduced motion, THE Website SHALL apply every visual state change (Mobile_Menu open and close, hover and focus states, Project_Card, Review_Card, and Service_Item filtering, FAQ_Item expand and collapse, Project_Viewer open, close, next, and previous, and scroll-to-top on navigation) immediately without animated transitions, smooth scrolling, or auto-playing motion, while still showing the final visual state.
10. WHEN the Router displays a new page after the visitor follows an internal link or uses the browser back or forward control, THE Website SHALL move keyboard focus to the `h1` heading of the newly displayed page so that screen readers announce the new page heading.
11. WHEN the set of displayed Service_Items changes because of Service_Filter input, the set of displayed Project_Cards changes because of a Project_Filter selection, or the set of displayed Review_Cards changes because of a Review_Filter selection, THE Website SHALL announce the number of displayed results (or the no-match message from Requirement 7, criterion 8) to screen readers through a polite ARIA live region within 1 second of the last change, without moving keyboard focus.
12. THE Website SHALL give every Quote_Form field, the Service_Filter, and each icon-only control (including the Menu_Toggle, the Service_Filter clear control, the Project_Viewer close, next, and previous buttons, and each Social_Links icon link) a programmatic accessible name, with each Quote_Form field's accessible name containing the text of its visible label.

### Requirement 16: Imagery and Placeholder Content

**User Story:** As the demo presenter, I want polished imagery and realistic boilerplate text, so that the concept looks finished even before the customer supplies real content.

#### Acceptance Criteria

1. THE Website SHALL load every image, including the Logo and the hero, Service_Category header, Project_Card, Project_Viewer, and About_Page images, from files bundled within the static build output, so that a page load makes zero image requests to any origin other than the origin serving the Website. The map imagery loaded inside a Map_Embed frame (Requirement 22) is the only exception.
2. THE Website SHALL use Stock_Photos for the hero, Service_Category header, Project_Card, Project_Viewer, and About_Page images, each downloaded from Unsplash or Pexels under that site's free license and stored in the repository.
3. THE Website SHALL bundle each Stock_Photo in JPEG or WebP format, resized so that its longest edge is at most 2,400 pixels and compressed so that each file is at most 400 KB.
4. THE Website SHALL use, for each Stock_Photo, a photo whose subject is residential roofing, construction, or home improvement work, and SHALL use for each Project_Card a Stock_Photo whose subject matches the Project_Card's Service_Category.
5. THE Attributions_File SHALL record, for each Stock_Photo, the bundled file path, the source page URL, the photographer's name, the license name, and the license URL.
6. THE Attributions_File SHALL contain exactly one entry for each Stock_Photo file in the repository, and each entry SHALL refer to a Stock_Photo file that exists in the repository (attribution consistency property).
7. THE Attributions_File SHALL list the Logo as company-owned artwork supplied by the customer, separate from the Stock_Photo entries.
8. THE Website SHALL display every image inside a container with a declared fixed aspect ratio, such that the container's rendered width and height before the image finishes loading equal its rendered width and height after the image finishes loading, within 1 CSS pixel, at Mobile_Viewport, Tablet_Viewport, and Desktop_Viewport widths.
9. IF an image fails to load, THEN THE Website SHALL replace the image with a styled placeholder block that uses a neutral color from the Theme, fills the same container at the same aspect ratio, and shows the image's alternative text, leaving the surrounding page content in place and fully usable, except that the placeholder block for a full-width Hero_Section background photo or a full-width Service_Category_Page header image shows no visible text and keeps the image's alternative text available to assistive technologies, so that no placeholder text overlaps the hero text (consistent with Requirement 26 criterion 32).
10. IF a decorative image (one with empty alternative text) fails to load, THEN THE Website SHALL display the styled placeholder block in the Theme's neutral colors with no text and SHALL NOT display a broken-image icon.
11. THE Website SHALL store all Placeholder_Content (contact details, Reviews, project descriptions, company story, statistics, service area text, Service_Area_Cities, FAQ_Items, Social_Links URLs, the "Leave a Review" URL, and Map_Embed URLs) in the Content_Module, with each Placeholder_Content entry labeled in the Content_Module as placeholder, and with no Placeholder_Content text written directly in page or component layout code.
12. THE Website SHALL display each Placeholder_Content contact detail (phone number, email address, business hours) with the same value on every page, in the Footer, and in the Click_To_Call_Button, matching the value stored in the Content_Module.
13. THE Website SHALL write all Placeholder_Content text as complete English sentences describing home improvement, roofing, and construction work in the Dallas–Fort Worth area, which MAY name Service_Area_Cities, and SHALL NOT display "lorem ipsum" or any other dummy Latin filler text on any page.
14. WHEN a page first loads, THE Website SHALL load every image positioned fully or partly within the initial viewport immediately, without deferral.
15. WHEN a page first loads, THE Website SHALL defer loading of each image whose top edge is more than 2,500 CSS pixels below the bottom edge of the initial viewport, and WHEN the visitor scrolls, THE Website SHALL begin loading each deferred image no later than when its top edge comes within 200 CSS pixels of the bottom edge of the viewport.

### Requirement 17: Brand Logo

**User Story:** As the customer, I want my existing black and gold logo shown clearly in the header and footer, so that visitors recognize the D&T Go Elite brand.

#### Acceptance Criteria

1. THE Website SHALL bundle the Logo and the Header_Logo as image files in the static build output, SHALL leave the original `company-logo.png` file at the workspace root byte-for-byte unchanged, and SHALL display the Header_Logo in the Site_Header and the Logo in the Footer both when the Website is served at the Base_Path `/` and when it is served under a repository-subpath Base_Path such as `/<repository>/`. WHEN the customer adds an SVG or higher-resolution logo file to the workspace, THE Website SHALL build the Logo and the Header_Logo from that file. WHILE the workspace contains no such file, THE Website SHALL derive the Logo and the Header_Logo from `company-logo.png`.
2. THE Logo SHALL be cropped from its source file (criterion 1) to the wordmark area, where a wordmark pixel is any pixel with at least one RGB channel value above 24 on a 0–255 scale, and every pixel whose RGB channel values are all 24 or below is treated as background and MAY be set to the exact Theme black (#000000) before trimming, so that the black margin between the outermost wordmark pixels and each edge of the Logo is greater than 0 pixels and at most 8% of the Logo's height (for the top and bottom edges) and greater than 0 pixels and at most 8% of the Logo's width (for the left and right edges).
3. THE Logo SHALL keep every element of the original wordmark ("D&T" with the house roofline, "GO ELITE", and "ROOFING AND CONSTRUCTION") with none cut off at an edge, SHALL keep the original aspect ratio of the cropped area without stretching, and SHALL keep the original pixel colors of the wordmark apart from changes caused by resizing. THE Header_Logo SHALL keep "D&T" with the house roofline and "GO ELITE" with neither cut off at an edge, SHALL keep the original aspect ratio of that area without stretching, SHALL keep the original pixel colors of those elements apart from changes caused by resizing, and SHALL omit the "ROOFING AND CONSTRUCTION" line. Setting background pixels (as defined in criterion 2) to the exact Theme black SHALL NOT count as a change to the wordmark colors.
4. THE Site_Header SHALL display the Header_Logo, for each of the Mobile_Viewport, Tablet_Viewport, and Desktop_Viewport categories, at one rendered height that is identical on every page and at every viewport width within that category, between 48 and 56 CSS pixels inclusive on a Mobile_Viewport and between 56 and 64 CSS pixels inclusive on a Tablet_Viewport and a Desktop_Viewport, with the rendered width scaled so that the rendered width-to-height ratio is within 1% of the Header_Logo's intrinsic width-to-height ratio, and with the Header_Logo fitting inside the Site_Header height defined in Requirement 3 criterion 11. The height MAY differ between viewport categories.
5. THE Footer SHALL display the full Logo, for each of the Mobile_Viewport, Tablet_Viewport, and Desktop_Viewport categories, at one rendered height between 96 and 120 CSS pixels inclusive that is identical on every page and at every viewport width within that category, with the rendered width scaled so that the rendered width-to-height ratio is within 1% of the Logo's intrinsic width-to-height ratio, with the "ROOFING AND CONSTRUCTION" line of the wordmark legible at every Visual_Review viewport width, and with the Logo fitting inside the Footer content area without horizontal scrolling at viewport widths down to 320 CSS pixels (for example, a cropped Logo of about 1197 × 515 pixels rendered 120 CSS pixels tall is about 279 CSS pixels wide, which fits within a 320 CSS pixel viewport minus 16 CSS pixels of margin on each side).
6. THE Website SHALL bundle the Logo at a pixel height of at least twice the largest rendered CSS height used in the Site_Header or Footer at any viewport width, so that the Logo has at least 2 image pixels per CSS pixel on displays with a device pixel ratio of 2.
7. THE Website SHALL display the Logo only on elements whose background color is the Theme black, THE Site_Header and Footer SHALL use the Theme black at full opacity as their background color at every scroll position and in both the open and closed Mobile_Menu states, and the Logo's margin pixels SHALL have the same color value as the Theme black, so that no visible edge appears between the Logo image and the surrounding background.
8. THE Website SHALL give each Logo image that is not hidden from assistive technologies under criterion 9 the alternative text "D&T Go Elite Roofing and Construction".
9. IF a Logo image is inside a link whose accessible name comes from text or a label other than the Logo image and already contains "D&T Go Elite Roofing and Construction", THEN THE Website SHALL hide that Logo image from assistive technologies, so that the link's accessible name contains the company name exactly once.
10. WHILE the viewport is a Compact_Viewport, THE Site_Header SHALL display the Header_Logo fully visible, without clipping and without overlapping the Menu_Toggle or any other Site_Header element, at every viewport width from 320 to 1023 CSS pixels inclusive.
11. WHEN a page loads, THE Site_Header and Footer SHALL reserve the Logo's rendered width and height before the Logo image finishes loading, so that no Site_Header or Footer element changes position when the Logo appears.
12. IF the Logo image fails to load, THEN THE Site_Header and Footer SHALL keep the same height and element positions as when the Logo loads, and the Site_Header Logo link SHALL remain focusable, keep an accessible name containing "D&T Go Elite", and still link to the Home_Page.
13. WHEN the customer adds the Brand_Icon to the workspace, THE Website SHALL build the favicon from the Brand_Icon. WHILE the workspace contains no Brand_Icon, THE Website SHALL derive the favicon from the part of the Logo that shows "D&T" with the house roofline.
14. THE Website SHALL apply criteria 2, 6, 7, 8, 9, 11, and 12 to the Header_Logo in the Site_Header in the same way as they apply to the Logo; for criterion 2, the Header_Logo's wordmark area covers only "D&T" with the house roofline and "GO ELITE".

### Requirement 18: Service Areas Page

**User Story:** As a homeowner in the Dallas–Fort Worth area, I want to see which cities D&T Go Elite serves, so that I know whether the company can work at my property.

#### Acceptance Criteria

1. THE Service_Areas_Page SHALL display a single `h1` page heading containing the text "Service Areas", followed by an introduction of one to three complete sentences, stored in the Content_Module, stating that D&T Go Elite is based in Dallas, Texas, and serves the greater Dallas–Fort Worth area.
2. THE Content_Module SHALL list between 15 and 40 Service_Area_Cities inclusive, including at least Dallas, Fort Worth, Plano, Frisco, Arlington, Irving, Garland, McKinney, Richardson, Denton, Grand Prairie, Mesquite, Carrollton, Lewisville, and Allen, where each city name contains at least one non-whitespace character, has no leading or trailing whitespace, and appears only once when names are compared case-insensitively.
3. THE Service_Areas_Page SHALL display the Service_Area_Cities as a single list in which each Service_Area_City from the Content_Module is a separate list item shown exactly once, sorted in ascending alphabetical order by a case-insensitive comparison of the full city name (so the 15 required cities appear in the order Allen, Arlington, Carrollton, Dallas, Denton, Fort Worth, Frisco, Garland, Grand Prairie, Irving, Lewisville, McKinney, Mesquite, Plano, Richardson).
4. THE Service_Areas_Page SHALL display, after the Service_Area_City list, a note of one or two sentences stating that nearby cities not listed may still be served, together with a Call_To_Action labeled "Get a Free Quote" that links to the Contact_Page at Route_Path `/contact` with no `service` URL query parameter.
5. THE Service_Areas_Page SHALL display a Map_Embed showing the Dallas–Fort Worth area, as defined in Requirement 22, with an `iframe` `title` attribute that names the Dallas–Fort Worth service area.
6. FOR ALL Service_Area_City lists the Content_Module may hold, the list displayed on the Service_Areas_Page SHALL contain the same set of names as the Content_Module list with the same spelling and capitalization, the same item count, no duplicates, and ascending case-insensitive alphabetical order, so that adding or removing a city name in the Content_Module changes the displayed list in the next build without any change to page or component layout code (invariant property).
7. IF the Map_Embed on the Service_Areas_Page fails to load, THEN THE Service_Areas_Page SHALL keep the `h1` heading, introduction, Service_Area_City list, note, and "Get a Free Quote" Call_To_Action visible and usable, in addition to the Map_Embed failure behavior defined in Requirement 22, criteria 8 and 9.

### Requirement 19: FAQ Page

**User Story:** As a prospective customer, I want answers to common questions, so that I understand how D&T Go Elite works before I request a quote.

#### Acceptance Criteria

1. THE FAQ_Page SHALL display a single `h1` page heading containing the text "Frequently Asked Questions".
2. THE FAQ_Page SHALL display the FAQ_Accordion containing every FAQ_Item from the Content_Module exactly once, in Content_Module order, and THE Content_Module SHALL contain at least 10 and at most 30 FAQ_Items.
3. THE Content_Module SHALL store, for each FAQ_Item, a question of 1 to 120 characters ending with "?" and an answer of one to four sentences of Placeholder_Content, 1 to 600 characters long, and no two FAQ_Items SHALL have identical question text.
4. THE FAQ_Items SHALL cover each of these topics with at least one FAQ_Item whose question names that topic: free estimates; licensing and insurance; warranties; project timelines; roof storm damage and insurance claims; permits; whether the homeowner must be present during work; accepted payment methods; job-site cleanup; and the service area.
5. THE FAQ_Item about accepted payment methods SHALL name accepted payment method types (for example, cash, check, or card) as Placeholder_Content without naming a specific payment provider, fee, or rate, and no FAQ_Item question or answer SHALL contain the words "financing", "finance", "loan", "payment plan", "monthly payments", or "installments", or offer deferred or split payment.
6. THE FAQ_Item about the service area SHALL include, inside its answer, a link to the Service_Areas_Page that the Router opens without a full page reload.
7. THE FAQ_Accordion SHALL present each FAQ_Item question as a button inside a heading element one level below the heading of the section that contains the FAQ_Accordion (an `h2` when the FAQ_Accordion sits directly under the `h1`). Each button SHALL have the full question text as its accessible name, an `aria-expanded` attribute, an `aria-controls` attribute that references the FAQ_Item's answer panel, and a visible state icon that differs between the collapsed and expanded states and is hidden from assistive technologies.
8. WHEN the FAQ_Page is displayed, whether by direct URL load, an internal link, or the browser back or forward control, THE FAQ_Accordion SHALL show every FAQ_Item in the collapsed state with `aria-expanded="false"`.
9. WHEN the visitor activates a collapsed FAQ_Item question by pointer click, touch tap, or the Enter or Space key, THE FAQ_Accordion SHALL, within 300 milliseconds of activation, expand that FAQ_Item, show its full answer, show the expanded state icon, and set `aria-expanded="true"` on its question button.
10. WHEN the visitor activates an expanded FAQ_Item question by pointer click, touch tap, or the Enter or Space key, THE FAQ_Accordion SHALL, within 300 milliseconds of activation, collapse that FAQ_Item, hide its answer, show the collapsed state icon, and set `aria-expanded="false"` on its question button.
11. WHILE an FAQ_Item is collapsed, THE FAQ_Accordion SHALL keep that FAQ_Item's answer, including any link inside it, hidden from view, unreachable by Tab and Shift+Tab navigation, and hidden from assistive technologies.
12. THE FAQ_Accordion SHALL allow any number of FAQ_Items, from none to all, to be expanded at the same time. FOR ALL FAQ_Items, toggling one FAQ_Item SHALL leave the expanded or collapsed state of every other FAQ_Item unchanged (invariant property).
13. FOR ALL FAQ_Accordion states, activating the same FAQ_Item question twice in succession SHALL return every FAQ_Item to its original expanded or collapsed state and `aria-expanded` value (round-trip property).
14. THE FAQ_Page SHALL display, after the FAQ_Accordion, a closing Call_To_Action banner containing a heading of Placeholder_Content that asks whether the visitor has more questions, and a Call_To_Action whose label refers to contacting D&T Go Elite or requesting a free quote and that links to the Contact_Page.
15. WHEN the visitor activates an FAQ_Item question, THE FAQ_Accordion SHALL keep keyboard focus on that question button and SHALL keep that question button inside the viewport after the expand or collapse completes.
16. IF the visitor activates the same FAQ_Item question again before its expand or collapse transition has completed, THEN THE FAQ_Accordion SHALL end in the state requested by the latest activation, with the visible answer state, the state icon, and the `aria-expanded` value in agreement.

### Requirement 20: Reviews Page and Review Filter

**User Story:** As a prospective customer, I want to read reviews from other DFW homeowners, so that I can judge D&T Go Elite's reputation.

#### Acceptance Criteria

1. THE Reviews_Page SHALL display a single `h1` page heading containing the text "Customer Reviews".
2. THE Content_Module SHALL contain at least eight Reviews spanning at least four Service_Categories, with exactly three Reviews marked as featured.
3. THE Content_Module SHALL store, for each Review, a reviewer name made of a first name of 2 to 20 letters, a space, an uppercase last initial, and a period (for example, "Maria S."), a Service_Area_City that matches one entry in the Content_Module list of Service_Area_Cities, a Service_Category name matching exactly one of the seven Service_Category names in the Glossary, a whole-number star rating from 1 to 5, and review text of one to four sentences of Placeholder_Content, from 1 to 400 characters.
4. THE Review_Card SHALL display the reviewer name, Service_Area_City, Service_Category name, star rating, and the full review text of one Review, with no truncation of the review text at any viewport width.
5. THE Review_Card SHALL display the star rating as five star icons in which the number of filled stars equals the rating, together with a text equivalent of the form "Rated {rating} out of 5 stars" that is available to assistive technologies, and SHALL hide the individual star icons from assistive technologies.
6. THE Website SHALL render filled star icons with a contrast ratio of at least 3:1 against the Review_Card background, and SHALL render unfilled star icons with an outline whose contrast ratio is at least 3:1 against the Review_Card background.
7. THE Reviews_Page SHALL display, as visible text above the Rating_Summary, a notice stating that the reviews shown are sample placeholder content for the concept demo, and THE Review_Preview SHALL display the same notice as visible text above its Review_Cards.
8. THE Rating_Summary SHALL display the arithmetic mean of the star ratings of the currently displayed Reviews in the form "{average} out of 5", rounded to one decimal place with halves rounded up (for example, an exact mean of 4.25 shows as "4.3" and an exact mean of 4.45 shows as "4.5") and always shown with one decimal digit (for example, "4.0"), and SHALL display the count of the currently displayed Reviews in the form "Based on {count} reviews", using "review" when the count is 1.
9. FOR ALL non-empty sets of displayed Reviews, the average shown in the Rating_Summary SHALL equal the arithmetic mean of the displayed ratings rounded to one decimal place with halves rounded up, SHALL be greater than or equal to 1.0 and less than or equal to 5.0, and the count shown SHALL equal the number of displayed Review_Cards (correctness property).
10. THE Review_Filter SHALL offer an "All" option as the first option, followed by one option for each Service_Category that has at least one Review, labeled with the Service_Category name exactly as written in the Glossary and listed in the Glossary order of Service_Categories, with no option for a Service_Category that has zero Reviews, and with each option operable by mouse click, touch, and the Enter and Space keys.
11. WHEN the Reviews_Page loads, including a direct load of Route_Path `/reviews` and a return to the Reviews_Page from another page through a link or the browser back button, THE Review_Filter SHALL have the "All" option selected, THE Reviews_Page SHALL display every Review in Content_Module order, and THE Rating_Summary SHALL reflect every Review.
12. WHEN the visitor selects an option in the Review_Filter that is not currently selected, THE Reviews_Page SHALL, within 300 milliseconds and without a full page reload, display only the Reviews belonging to the selected Service_Category (or every Review for "All"), in Content_Module order, THE Rating_Summary SHALL update to reflect only the displayed Reviews, and keyboard focus SHALL remain on the selected option.
13. THE Review_Filter SHALL keep exactly one option selected at any time, SHALL visually mark the selected option with a background color or border color that differs from every unselected option, using the shared filter option style defined in Requirement 26 criterion 20, and SHALL set `aria-pressed="true"` on the selected option and `aria-pressed="false"` on every unselected option.
14. FOR ALL Service_Category options in the Review_Filter, the number of Reviews displayed after selecting the option SHALL be at least one and at most the number displayed for "All", and the sum of Reviews displayed across all Service_Category options SHALL equal the number displayed for "All" (metamorphic property).
15. THE Reviews_Page SHALL display a link labeled "Leave a Review" whose target is the placeholder review URL stored in the Content_Module, which opens in a new browser tab with `rel="noopener noreferrer"` and has an accessible name indicating that the link opens in a new tab.
16. WHEN the visitor selects the Review_Filter option that is already selected, THE Reviews_Page SHALL leave the selected option, the displayed Reviews, their order, and the Rating_Summary unchanged.
17. WHEN the displayed Reviews change after a Review_Filter selection, THE Rating_Summary SHALL announce the updated average and count to assistive technologies through a polite live region, without moving keyboard focus.

### Requirement 21: Project Photo Viewer

**User Story:** As a prospective customer, I want to open project photos in a larger view and step through them, so that I can inspect the quality of the work.

#### Acceptance Criteria

1. THE Projects_Page SHALL make each displayed Project_Card reachable by keyboard Tab navigation and operable by pointer click, touch tap, and the Enter or Space key, with an accessible name that contains the Project_Card's title.
2. WHEN the visitor activates a Project_Card, THE Projects_Page SHALL open the Project_Viewer within 300 milliseconds, showing a larger version of that Project_Card's photo with the same alternative text, the project title, the Service_Category name, and the description, all identical to the values shown on that Project_Card.
3. THE Project_Viewer SHALL have `role="dialog"`, `aria-modal="true"`, and an accessible name equal to the title of the Project_Card currently shown, updating the accessible name each time a different Project_Card is shown.
4. WHILE the set of Project_Cards displayed under the selected Project_Filter option contains two or more Project_Cards, THE Project_Viewer SHALL display an enabled "Next project" button and an enabled "Previous project" button that, within 300 milliseconds of activation, show the next or previous Project_Card in that set in its displayed order, moving from the last Project_Card to the first on next and from the first Project_Card to the last on previous.
5. WHILE the Project_Viewer is open and the displayed set contains two or more Project_Cards, WHEN the visitor presses the Right Arrow key or the Left Arrow key, THE Project_Viewer SHALL show the next Project_Card for Right Arrow and the previous Project_Card for Left Arrow, within 300 milliseconds, using the same order and wrap-around as criterion 4.
6. WHEN the Project_Viewer shows a different Project_Card after a next or previous action, THE Project_Viewer SHALL announce the newly shown project title to screen readers through a polite ARIA live region, with exactly one announcement per action.
7. FOR ALL filtered sets of N Project_Cards with N ≥ 2 and every starting Project_Card in the set, performing the next action N times SHALL show the starting Project_Card again, performing the previous action N times SHALL show the starting Project_Card again, and performing the next action followed by the previous action SHALL show the starting Project_Card again (round-trip property).
8. WHEN the visitor presses the Escape key, activates the Project_Viewer close button (accessible name "Close project viewer"), or clicks or taps the backdrop area outside the Project_Viewer's dialog content, THE Projects_Page SHALL close the Project_Viewer within 300 milliseconds and SHALL leave the selected Project_Filter option and the displayed Project_Cards unchanged.
9. WHEN the Project_Viewer opens, THE Project_Viewer SHALL move keyboard focus to the Project_Viewer close button.
10. WHILE the Project_Viewer is open, THE Project_Viewer SHALL keep keyboard focus within the Project_Viewer, moving focus from the last focusable element to the first on Tab and from the first focusable element to the last on Shift+Tab.
11. WHILE the Project_Viewer is open, THE Website SHALL prevent the page behind the Project_Viewer from scrolling, SHALL hide the content behind the Project_Viewer from assistive technologies, and SHALL make that content unreachable by pointer and keyboard.
12. WHILE the Project_Viewer is open, at every viewport width from 320 to 1920 CSS pixels inclusive, THE Project_Viewer SHALL display the photo in full at its original aspect ratio, without cropping or distortion, no wider than the viewport width minus 32 CSS pixels and no taller than 60 percent of the viewport height, and SHALL keep the close button visible and the title, Service_Category name, description, and next and previous controls reachable by vertical scrolling inside the Project_Viewer when the Project_Viewer content is taller than the viewport.
13. WHEN the Router displays a different page while the Project_Viewer is open (for example, through the browser back control), THE Website SHALL close the Project_Viewer and restore page scrolling.
14. WHEN the Project_Viewer closes through any action in criterion 8, THE Projects_Page SHALL return keyboard focus to the Project_Card that the visitor activated to open the Project_Viewer, even if the visitor moved to other Project_Cards inside the Project_Viewer, SHALL restore page scrolling, and SHALL restore the page scroll position that existed before the Project_Viewer opened, within 1 CSS pixel.
15. IF the set of Project_Cards displayed under the selected Project_Filter option contains exactly one Project_Card, THEN THE Project_Viewer SHALL show the "Next project" and "Previous project" buttons in a disabled state that is exposed to assistive technologies, and SHALL keep the shown Project_Card unchanged, with no live region announcement, when the visitor presses the Right Arrow or Left Arrow key.
16. WHEN the Project_Viewer opens or shows a different Project_Card, THE Website SHALL leave the browser history unchanged, so that a single browser back action while the Project_Viewer is open displays the page shown before the Projects_Page.

### Requirement 22: Map Embeds

**User Story:** As a visitor, I want to see where D&T Go Elite is located and the area it covers on a map, so that I can confirm the company is local to me.

#### Acceptance Criteria

1. THE Contact_Page SHALL display exactly one Map_Embed, loaded from an embed URL that searches for "Dallas, TX", so that the initial map view is centered on Dallas, Texas.
2. THE Service_Areas_Page SHALL display exactly one Map_Embed whose initial map view, at a Desktop_Viewport, includes both the city of Dallas and the city of Fort Worth.
3. THE Website SHALL load each Map_Embed frame in an `iframe` from a Google Maps embed URL that requires no API key, and SHALL read each embed URL and each "Open in Google Maps" link URL from the Content_Module, so that replacing a URL in the Content_Module changes the map or link without any edit to page or component layout code.
4. THE Website SHALL lazy-load each Map_Embed `iframe`, so that no Map_Embed network request starts before the Site_Header, the page's `h1` heading, all main content text, and the Footer have been added to the page, and so that a Map_Embed that is still loading does not delay the display or operation of any other page content.
5. THE Website SHALL give each Map_Embed `iframe` a non-empty `title` attribute of at most 100 characters that names the place shown, containing "Dallas, TX" for the Contact_Page Map_Embed and "Dallas–Fort Worth" for the Service_Areas_Page Map_Embed (for example, "Map of Dallas, TX, home base of D&T Go Elite").
6. THE Website SHALL display each Map_Embed frame inside a container that has a declared aspect ratio for each viewport category (Mobile_Viewport, Tablet_Viewport, Desktop_Viewport), so that at a given viewport width the container's rendered width and height before the frame loads equal its rendered width and height after the frame loads, within 1 CSS pixel, and so that the container causes no horizontal page scrolling at any viewport width from 320 to 1920 CSS pixels.
7. THE Website SHALL display, directly below each Map_Embed frame and whether or not the frame has loaded, a text link labeled "Open in Google Maps" that opens the Google Maps page for the same address or area shown in the frame in a new browser tab, with `rel="noopener noreferrer"` and an accessible name that contains the text "Open in Google Maps" and indicates that the link opens in a new tab.
8. IF a Map_Embed frame fails to load (for example, because the visitor is offline or a content blocker blocks the request), THEN THE Website SHALL keep the Map_Embed container at its declared size with a neutral color from the Theme as its background, and SHALL keep the "Open in Google Maps" link visible and operable.
9. IF a Map_Embed frame fails to load, THEN THE Website SHALL keep every other element of the page displayed in its normal position, SHALL keep every other interactive element (including the Site_Header, Navigation_Menu, Quote_Form, Social_Links, and Footer links) operable, and SHALL raise no uncaught script error.
10. IF the embed URL stored in the Content_Module for a Map_Embed is empty or is not an `https://` URL, THEN THE Website SHALL render no `iframe` for that Map_Embed, SHALL display the Map_Embed container at its declared size with a neutral color from the Theme as its background and the address or area name as text, and SHALL keep the "Open in Google Maps" link visible.
11. THE Website SHALL make runtime network requests to an origin other than the origin serving the static build output only from a Map_Embed `iframe` and the content loaded inside it, and only while the Contact_Page or the Service_Areas_Page is displayed (exception to Requirement 1, criterion 3, and Requirement 16, criterion 1).

### Requirement 23: Social Media Links

**User Story:** As the customer, I want links to my social media profiles on the Website, so that visitors can follow the company and read more about its work.

#### Acceptance Criteria

1. THE Footer on every page and THE Contact_Page contact details section SHALL each display exactly four Social_Links items, one per platform, in this order: Facebook, Instagram, Google Business Profile, Nextdoor, with all four items visible at every viewport width without horizontal scrolling of the page.
2. THE Website SHALL display each Social_Links item as that platform's icon, bundled with the Website so that displaying the icon makes no runtime network request, with an accessible name of the form "D&T Go Elite on {platform name} (opens in a new tab)", where {platform name} is exactly "Facebook", "Instagram", "Google Business Profile", or "Nextdoor", and SHALL hide the icon graphic from assistive technologies.
3. THE Content_Module SHALL store exactly one placeholder URL for each Social_Links platform, written as an absolute URL beginning with `https://` and labeled as placeholder, and THE Footer and THE Contact_Page SHALL read each Social_Links URL from that single Content_Module entry, so that changing one entry updates the link in both locations without any change to page or component layout code.
4. WHEN the visitor activates a Social_Links item by pointer click, tap, or the Enter key, THE Website SHALL open the URL stored in the Content_Module for that platform in a new browser tab, and SHALL keep the original tab on the same page with its scroll position and any values entered in the Quote_Form unchanged.
5. THE Website SHALL render each Social_Links icon with a contrast ratio of at least 3:1 against the adjacent background in the default, hover, and keyboard-focused states, on both the Footer background and the Contact_Page background.
6. THE Website SHALL give every Social_Links item the attributes `target="_blank"` and `rel="noopener noreferrer"`.
7. IF a Social_Links URL entry in the Content_Module is empty or does not begin with `https://`, THEN THE Website SHALL omit that Social_Links item from the Footer and the Contact_Page, SHALL keep the remaining Social_Links items in the order given in criterion 1, and SHALL NOT render a link with an empty or `#` destination (exception to criterion 1).
8. IF all four Social_Links URL entries in the Content_Module are empty or do not begin with `https://`, THEN THE Website SHALL display no Social_Links heading, label, or empty Social_Links container in the Footer or on the Contact_Page, and SHALL leave the rest of the Footer and Contact_Page content in place and fully usable.

### Requirement 24: Mobile Click-to-Call

**User Story:** As a visitor on a phone, I want a call button that is always within reach, so that I can call D&T Go Elite with one tap from any page.

#### Acceptance Criteria

1. WHILE the Tab_Bar is displayed, THE Website SHALL display the Click_To_Call_Button as the Call tab of the Tab_Bar on every page, including the Not_Found_Page, visible at every scroll position.
2. WHILE the viewport is a Desktop_Viewport, THE Website SHALL hide the Click_To_Call_Button from view and from assistive technologies together with the Tab_Bar (Requirement 4 criterion 12).
3. THE Click_To_Call_Button SHALL be a `tel:` link whose target is the country code `+1` followed by the 10 digits of the placeholder phone number (`2145550123`), with no spaces, parentheses, or hyphens, read from the same Content_Module phone number entry that the Footer and Contact_Page display, so that changing that one entry updates all three locations. THE Click_To_Call_Button SHALL show a visible "Call" label and a phone icon, and SHALL have an accessible name that contains "Call" and the displayed phone number `(214) 555-0123`.
4. THE Click_To_Call_Button SHALL have a tappable area of at least 44 by 44 CSS pixels and SHALL set its phone icon on a gold circular badge, so that it reads as the Tab_Bar's main action.
5. WHILE the Tab_Bar is displayed, WHEN a focusable element receives keyboard focus while any part of it is covered by the Tab_Bar or the Site_Header, THE Website SHALL scroll the page so that no part of the focused element is covered.
6. WHEN the visitor activates the Click_To_Call_Button, THE Website SHALL pass the `tel:` link to the browser in the current tab without opening a new tab or window, and SHALL leave the current page, its Route_Path, its scroll position, and any values entered in the Quote_Form unchanged.
7. WHEN the viewport width crosses the 1024 CSS pixel boundary through window resize or device rotation, THE Website SHALL show or hide the Tab_Bar, including the Click_To_Call_Button, within 500 milliseconds after the change, without a page reload, and SHALL add or remove the space described in Requirement 4 criterion 11 at the same time.

### Requirement 25: GitHub Pages Deployment

**User Story:** As the demo presenter, I want the Website to deploy automatically to GitHub Pages, so that I can share a working link with the customer.

#### Acceptance Criteria

1. THE repository SHALL include a Pages_Pipeline workflow file in the `.github/workflows/` directory (for example, `.github/workflows/deploy.yml`) that checks out the commit that triggered the run, installs dependencies with a clean install from the committed lockfile, runs the build command documented in the README, configures GitHub Pages with GitHub's official Pages configuration action, uploads the complete static build output as a GitHub Pages artifact with an `index.html` file at the top level of the artifact using GitHub's official Pages artifact upload action, and deploys that artifact with GitHub's official Pages deployment action.
2. THE Pages_Pipeline SHALL grant only the permissions `contents: read`, `pages: write`, and `id-token: write`, and SHALL use a single concurrency group that does not cancel an in-progress run, so that at most one Pages_Pipeline deployment runs at a time and no deployment is stopped partway through.
3. WHEN a commit is pushed to the repository's default branch, THE Pages_Pipeline SHALL run automatically, with no manual trigger, and SHALL deploy the resulting build to GitHub Pages, so that within 10 minutes after the run completes successfully, loading the published URL with the browser cache bypassed displays the Website built from that commit.
4. WHEN the presenter starts the Pages_Pipeline manually through the `workflow_dispatch` trigger with the default branch selected, THE Pages_Pipeline SHALL build and deploy the latest commit of the default branch in the same way as criterion 3.
5. WHEN a pull request is opened or updated, a commit is pushed to any branch other than the repository's default branch, or the `workflow_dispatch` trigger is started with a branch other than the default branch selected, THE Pages_Pipeline SHALL perform no deployment and SHALL leave the published Website unchanged.
6. IF dependency installation, the build command, the Pages configuration step, the artifact upload step, or the deployment step exits with a failure status during a Pages_Pipeline run (including when Settings → Pages → Source is not set to "GitHub Actions"), or the build completes without producing an `index.html` file at the top level of the static build output, THEN THE Pages_Pipeline SHALL mark the run as failed in the repository's Actions tab and SHALL deploy nothing, so that the previously published Website remains unchanged and reachable at the same URL.
7. THE Website SHALL read the Base_Path from a single build-time configuration value, and IF that value is unset or empty at build time, THEN THE Website SHALL use `/` as the Base_Path.
8. THE Pages_Pipeline SHALL derive the Base_Path configuration value from the repository's GitHub Pages site configuration, as reported by GitHub's official Pages configuration action, setting `/<repository>/` for a project site published at `https://<owner>.github.io/<repository>/`, and `/` for a user or organization site (`<owner>.github.io` repository) or a site published on a custom domain, with no manual edit to the workflow file or source code needed to switch between these cases.
9. IF the Base_Path configuration value is set to a non-empty value that does not both begin with `/` and end with `/` (for example, `/<repository>` or `<repository>/`), THEN THE Website build process SHALL exit with a failure status before writing a complete static build output and SHALL display an error message identifying the Base_Path value as invalid.
10. WHEN the Website is built with a given Base_Path, either `/` or a repository subpath such as `/<repository>/`, and served under that Base_Path, THE Website SHALL resolve every internal link, script, stylesheet, font, image, Stock_Photo, Logo, and favicon to a URL under that Base_Path, so that loading any defined Route_Path produces zero requests to the serving origin outside the Base_Path and zero requests for files in the static build output that fail with a 404 status. The top-level page request that a deep-link fallback mechanism deliberately answers with the GitHub Pages 404 response is excluded from this count, provided the matching page is then displayed as stated in criterion 11.
11. WHEN a visitor loads or refreshes any defined Route_Path on the GitHub Pages site, including `/services/{category-slug}` for each of the seven Service_Category Slugs, a Route_Path with a query string, and a defined Route_Path followed by a single trailing slash, THE Website SHALL display the page that matches that Route_Path, as defined in Requirement 5, using a mechanism that works without server redirect or rewrite rules, which GitHub Pages does not provide. Once the page is displayed, the address bar SHALL show the same Route_Path and query string, and the browser history SHALL contain no extra entry from the fallback mechanism, so that one press of the browser back control returns to the page the visitor was on before the load.
12. WHEN a visitor loads a Route_Path under the Base_Path that matches no defined route on the GitHub Pages site, including `/services/{category-slug}` with a Slug that matches no Service_Category and a defined Route_Path written with uppercase letters (Requirement 5 criterion 11), THE Website SHALL display the Not_Found_Page with the Site_Header and Footer and SHALL show the requested Route_Path in the address bar once the Not_Found_Page is displayed.
13. THE README SHALL document the GitHub Pages deployment steps: setting Settings → Pages → Source to "GitHub Actions", how the Pages_Pipeline sets the Base_Path for a project site and for a user, organization, or custom-domain site, how to start a run manually through `workflow_dispatch`, where to find the published URL, how to find a failed Pages_Pipeline run in the repository's Actions tab, and the mechanism the Website uses to support direct loads of deep links.
14. WHEN two or more commits are pushed to the default branch while a Pages_Pipeline deployment is in progress, THE Pages_Pipeline SHALL let the in-progress deployment finish and SHALL then deploy the most recently pushed commit, so that once all triggered runs have finished, the published Website reflects the most recently pushed commit and not an earlier one.
15. WHEN a visitor loads the project-site address without a trailing slash (`https://<owner>.github.io/<repository>`), THE Website SHALL display the Home_Page with every script, stylesheet, font, and image loaded, and the address bar SHALL show the Base_Path `/<repository>/` once the Home_Page is displayed.

### Requirement 26: Clean Visual Layout and UI Consistency

**User Story:** As the customer seeing the demo, I want every page to look clean, consistent, and polished, so that the concept impresses me and feels trustworthy to new clients.

#### Acceptance Criteria

1. THE Theme SHALL define, for each viewport category (Mobile_Viewport, Tablet_Viewport, Desktop_Viewport), a type scale of at most seven font sizes, each with one fixed computed value that does not change with viewport width inside that category. THE Theme SHALL also define at most three font weights, at most three non-zero border radius values, and at most two shadow values. THE Website SHALL render every text element at a font size and font weight from these sets.
2. THE Website SHALL render, within each viewport category, every `h1` at a larger font size than every `h2`, every `h2` larger than every `h3`, and every `h3` larger than body text, and every `h4` to `h6` no larger than `h3` and no smaller than body text. Each heading level SHALL use one font size per viewport category on every page, including FAQ_Accordion question headings and the Not_Found_Page.
3. THE Website SHALL render every heading (`h1` to `h6`) in the Theme serif family, and all other text, including Call_To_Action labels, Navigation_Menu links, Project_Filter and Review_Filter options, Quote_Form labels and field text, Rating_Summary text, and Footer text, in the Theme sans-serif family.
4. THE Website SHALL render all body text with one line height between 1.5 and 1.7 times the body font size, and every heading with a line height between 1.1 and 1.3 times its font size.
5. THE Website SHALL give every body text paragraph, including the Hero_Section supporting sentence and the Footer company description, a maximum rendered width between 70ch and 75ch of the body font.
6. THE Website SHALL render every Card with one shared Card style: one Theme border radius, one border-or-shadow treatment, and one internal padding value per viewport category. Interactive Cards (Cards that navigate or open the Project_Viewer when activated) SHALL share one hover treatment, and non-interactive Cards (Review_Cards and "Why Choose D&T Go Elite" highlights) SHALL show no change on hover.
7. THE Website SHALL render all Cards in the same grid row at equal height, within 1 CSS pixel, and SHALL display all Card images within one card grid at one shared aspect ratio.
8. WHILE the viewport is a Desktop_Viewport, THE Website SHALL display every Service_Category card grid and the "Why Choose D&T Go Elite" highlights in four columns, and every Project_Card grid and Review_Card grid (including the Review_Preview) in three columns. A final row with fewer Cards than the column count (for example, the seventh Service_Category card) SHALL follow Requirement 14 criterion 10.
9. THE Website SHALL give every Page_Section other than the Hero_Section the same Theme top padding and the same Theme bottom padding within each viewport category, with values that meet Requirement 13 criterion 12.
10. THE Website SHALL give every Page_Section a solid background of Theme black, charcoal, or off-white, except the Hero_Section, which MAY place a Stock_Photo under the Theme overlay value. THE Service_Category_Page SHALL display its header image as a full-width image with no text placed over it and no overlay, and SHALL display the page heading and summary in a Page_Section with a solid Theme black, charcoal, or off-white background.
11. IF two adjacent Page_Sections, the Site_Header and the first Page_Section, or the last Page_Section and the Footer have the same solid dark background color (Theme black or charcoal), THEN THE Website SHALL separate them with a full-width horizontal line 1 to 2 CSS pixels thick in the Theme medium gray. A Hero_Section with a Stock_Photo background SHALL NOT count as a solid dark background for this rule.
12. THE Website SHALL display at most one Primary_CTA_Style element in each Page_Section, counting the Quote_Form submit button as a Primary_CTA_Style element. THE Hero_Section SHALL display exactly one Primary_CTA_Style and one Secondary_CTA_Style Call_To_Action, and no other Page_Section SHALL display a Secondary_CTA_Style Call_To_Action. The Site_Header, Mobile_Menu, and Footer are not Page_Sections for this rule.
13. THE Website SHALL align the left edge of the content container in every Page_Section, the Site_Header, and the Footer with the left edge of the main content container defined in Requirement 14 criterion 5, within 1 CSS pixel, at every viewport width from 320 to 1920 CSS pixels. Full-width section backgrounds, the Hero_Section background photo, and full-width Service_Category_Page header images are excluded.
14. THE Website SHALL center text only in the Hero_Section, closing Call_To_Action banners, and the Services_Page no-match block, and SHALL left-align all other text, including section headings, Card text, paragraphs, lists, Quote_Form labels and fields, and the Footer. All closing Call_To_Action banners SHALL use the same alignment on every page.
15. WHERE the Hero_Section text is placed over a Stock_Photo, THE Website SHALL place the Theme overlay value between the photo and the text, so that the headline, supporting sentence, and both Call_To_Action labels meet the contrast ratios of Requirement 13 criterion 6 against the lightest composited photo pixel inside each element's bounding box, at every Visual_Review viewport width.
16. THE Website SHALL crop the Hero_Section Stock_Photo and each Service_Category_Page header image to fill its area at every viewport width from 320 to 1920 CSS pixels, with the rendered image aspect ratio within 1% of the file's intrinsic aspect ratio (no stretching), and with the subject named in the image's alternative text fully inside the visible area at every Visual_Review viewport width.
17. THE Website SHALL start every animation, transition, dialog, and content change only in response to a pointer, touch, or keyboard action by the visitor, and SHALL complete every transition within 300 milliseconds. THE Website SHALL contain no auto-advancing carousel or slider, no autoplaying video, no parallax effect, no animation triggered by scrolling, and no pop-up, banner, or dialog that opens without a visitor action. Image loading (Requirement 16), Map_Embed loading (Requirement 22), and the reduced-motion behavior of Requirement 15 criterion 9 are not affected by this criterion.
18. THE Website SHALL use at most one decorative accent style (for example, a short gold rule beneath headings). WHERE the accent is used beneath headings, THE Website SHALL place it beneath every `h2` Page_Section heading on every page (excluding FAQ_Accordion question headings), with the same width, thickness, and spacing above and below, aligned to match the heading's text alignment, and colored according to Requirement 13 criterion 7.
19. WHILE the viewport is a Mobile_Viewport, THE Website SHALL stack the Hero_Section Primary_CTA_Style and Secondary_CTA_Style Call_To_Actions vertically, Primary first, at equal width and separated by one Theme spacing step. WHILE the viewport is a Tablet_Viewport or a Desktop_Viewport, THE Website SHALL display them side by side on one row, Primary on the left, at equal height, separated by one Theme spacing step.
20. THE Project_Filter and THE Review_Filter SHALL use one shared filter option style: unselected options with a transparent background, a 1 CSS pixel Theme medium gray border, and the section's body text color; on hover, a border in the gold accent color (darker gold shade on off-white); and for the selected option, the gold accent background with black text, changing to the Theme gold hover shade on hover. IF the filter options do not fit on one row, THEN THE Website SHALL wrap them onto additional left-aligned rows using one Theme spacing value for both horizontal and vertical gaps, without truncating any option label and without horizontal scrolling.
21. THE Website SHALL style text links by type: Navigation_Menu links and Footer links on black or charcoal SHALL change to the gold accent text color on hover; the active Navigation_Menu link SHALL use the gold accent text color with an underline as defined in Requirement 3 criterion 6; every other text link (inline links in body text and standalone links such as "Read All Reviews", "Leave a Review", "Open in Google Maps", and breadcrumb links) SHALL use the surrounding text color with a 1 CSS pixel underline at rest and a 2 CSS pixel underline on hover, and SHALL NOT use the gold accent color or its shades, consistent with Requirement 13 criterion 2.
22. THE Website SHALL use only full-color Stock_Photos (none black-and-white, duotone, or with a visible color filter) that show no watermark, no overlaid text or caption, and no legible third-party company name or logo, and whose subject shows no visible blur at its largest rendered size. THE Visual_Review SHALL check each Stock_Photo against each of these conditions.
23. THE Website SHALL display every image inside a Card, the Project_Viewer photo, every About_Page image, a side (not full-width) Hero_Section photo, and every Map_Embed container with the same Theme border radius as Cards, and SHALL display a full-width Hero_Section background photo and full-width Service_Category_Page header images with no border radius.
24. THE Website SHALL render every disabled control (including the Project_Viewer "Next project" and "Previous project" buttons) with its text, icon, and border in the Theme medium gray, at the same shape and size as the enabled state, and SHALL show no hover change on a disabled control.
25. WHEN the Form_Validator displays a field error, THE Website SHALL render, directly below the field and aligned with the field's left edge, an error message made of an error icon from the Website's single icon set followed by the error text, both in the Theme error color, and SHALL render the invalid field border in the Theme error color with a contrast ratio of at least 3:1 against the adjacent background. The error message SHALL push the following content down without overlapping any other element.
26. WHEN the Services_Page displays the no-match message of Requirement 7 criterion 8, THE Services_Page SHALL display the message as one centered block containing an icon from the Website's single icon set, the message text, and the Call_To_Action, using the standard Page_Section padding.
27. THE Website SHALL display the "Concept demo" notice in the Footer and the sample-review notices on the Reviews_Page and Review_Preview in one shared notice style: the smallest type-scale size, which SHALL be at least 14 CSS pixels; one font weight; no background box or border; and one Theme text color per background (dark or off-white) that meets the 4.5:1 contrast ratio of Requirement 13 criterion 6.
28. WHEN the presenter performs the Visual_Review before the demo, THE Website SHALL pass every check of this requirement on every page (including each of the seven Service_Category_Pages and the Not_Found_Page) and in these UI states: open Mobile_Menu, open Project_Viewer, Quote_Form with field errors, Confirmation_Message, Services_Page no-match message, FAQ_Page with one FAQ_Item expanded, and the Projects_Page and Reviews_Page each with a Service_Category filter option selected that leaves fewer Cards than the column count. The presenter checks each listed page and UI state manually in a browser at viewport widths of 375, 768, 1280, and 1920 CSS pixels (the open Mobile_Menu only at 375 and 768 CSS pixels). No checklist file and no screenshot script are required.
29. WHEN the Visual_Review is performed before the demo, THE Website SHALL show, for every page, UI state, and viewport width checked in the Visual_Review, no overlapping elements except: Hero_Section text and Call_To_Actions over the Hero_Section photo; the fixed Site_Header over scrolled content (at scroll position 0 the Site_Header SHALL cover no main content); the Click_To_Call_Button (at the maximum scroll position it SHALL cover no Footer content); and the open Project_Viewer or Mobile_Menu.
30. WHEN the Visual_Review is performed before the demo, THE Website SHALL show, for every page, UI state, and viewport width checked in the Visual_Review, no `h1` or `h2` heading of three or more words whose last line contains only one word.
31. THE Website SHALL use, within each viewport category, one Theme spacing value for both the horizontal and vertical gaps of each card grid (equal within 1 CSS pixel), and one Theme spacing value per heading level between that heading and the content that follows it, identical on every page.
32. IF the Hero_Section Stock_Photo fails to load, THEN THE Website SHALL display the styled placeholder block of Requirement 16 criterion 9 in Theme charcoal or black at the same Hero_Section size, SHALL keep the headline, supporting sentence, and both Call_To_Actions in place and meeting the contrast ratios of Requirement 13 criterion 6 against the placeholder, and SHALL position the placeholder's alternative text so that it does not overlap the hero text or Call_To_Actions.

### Requirement 27: Brand Voice and Specialist Positioning

**User Story:** As the customer, I want the Website copy to show that each job is handled by a specialized team held to an elite standard, without the message feeling pushy, so that visitors understand that D&T Go Elite is not a general contractor and trust the quality of every trade.

#### Acceptance Criteria

1. THE Content_Module SHALL store exactly one Tagline entry of one to six words, marked in the Content_Module as placeholder pending customer confirmation, containing none of the phrases listed in criteria 4 and 12. THE Website SHALL read every displayed Tagline from that single entry, so that changing the entry changes the Tagline text in the Footer and in no other place.
2. THE Website SHALL display the Tagline in exactly one place, the Footer, as its own line directly beside or below the company description defined in Requirement 12 criterion 2, outside that description sentence. THE Website SHALL NOT render the Tagline as a heading element (`h1` to `h6`), and SHALL NOT show the Tagline in the Hero_Section, the Site_Header, document titles, Call_To_Action labels, or the `main` content of any page. Because the Footer appears on every page, the Footer Tagline also appears on the Not_Found_Page.
3. THE Content_Module SHALL word every Placeholder_Content sentence, other than Review text, that says who performs on-site work (installing, repairing, building, or inspecting) so that it names the workers as a team, crew, or specialists for a named trade (for example, "our roofing crew", "the tile team", "our paint specialists") or as specialist teams for each trade (for example, "dedicated crews for every trade"). Sentences about quoting, scheduling, or contacting the company are excluded from this rule.
4. THE Content_Module and every rendered page SHALL contain zero occurrences, in any capitalization and including Review text and the Tagline, of the phrases "general contractor", "general contractors", "handyman", "handymen", "jack of all trades", and "jack-of-all-trades". THE Website SHALL convey that the company is not a general contractor only through positive specialist-team statements (criteria 3, 7, 8, 9, 10) and never through a negating sentence that uses these phrases. The word "general" is not restricted. THE Website SHALL display the customer-supplied names "General Construction & Repairs" and "General Home Repairs" (Appendix A) verbatim wherever they appear, including cards, headings, filters, breadcrumbs, Footer links, Review_Cards, and document titles, and these names SHALL NOT be reworded for the Brand_Voice.
5. THE Website SHALL render each page, counting each Service_Category_Page and the Not_Found_Page as separate pages, with at most one occurrence of the whole word "elite" (any capitalization). The count covers all text the page can display in any UI state: the Site_Header, `main` content, Footer, collapsed FAQ_Item answers, Project_Viewer content, every Review_Filter and Project_Filter state, Quote_Form success and error messages, and image alt text. The count excludes the company name "D&T Go Elite" or "D&T Go Elite Roofing and Construction" (including the possessive "D&T Go Elite's"), the Logo and Header_Logo images and their alt text, and the Footer Tagline defined in criterion 2.
6. THE Content_Module and every rendered page SHALL contain zero occurrences of the whole word "elite" (any capitalization), outside the company name, in these places: Navigation_Menu labels, Call_To_Action labels, Quote_Form field labels and placeholder text, Form_Validator error messages, the Quote_Form confirmation message, every heading (`h1` to `h6`), document titles, the Footer company description, and every Service_Category summary. The company name inside the headings "Why Choose D&T Go Elite", "About D&T Go Elite", and the Hero_Section headline is excluded and does not count as a violation.
7. THE Content_Module SHALL include, among the four "Why Choose D&T Go Elite" highlights (Requirement 6 criterion 4), exactly one highlight whose title or sentence contains "team", "crew", or "specialists" together with "each trade", "every trade", or "trade-specific". The other three highlights SHALL contain none of the words "specialist", "specialists", "specialized", "team", or "crew".
8. THE Content_Module SHALL word the one-sentence description of the "How It Works" project scheduling and work step (Requirement 6 criterion 5) so that it states the project is matched with or assigned to the team or crew for that trade, contains "specialist" or "specialized", and contains zero occurrences of the word "elite".
9. THE Service_Catalog SHALL include in each Service_Category summary, within the limits of Requirement 2 criterion 5, exactly one phrase that names the team, crew, or specialists for that Service_Category's trade (for example, "our flooring and tile team"; for General Construction & Repairs, a carpentry or repair crew), with the words "team", "crew", and "specialists" appearing exactly once in total per summary. No two Service_Category summaries SHALL contain the same sequence of six or more consecutive words, compared case-insensitively and ignoring punctuation.
10. THE About_Page company story (Requirement 9 criterion 1) SHALL contain at least one sentence stating that each trade is handled by its own trained specialist team, and exactly one sentence stating the company's commitment to an elite standard of workmanship. That sentence SHALL be the About_Page's single permitted "elite" occurrence under criterion 5, so the About_Page values, statistics band, service area section, and Call_To_Action SHALL contain zero occurrences of "elite" outside the company name. Both sentences SHALL meet criterion 12.
11. THE Content_Module SHALL include, among the About_Page company values (Requirement 9 criterion 2), at least one and at most two values whose title or description contains "specialist", "specialized", "trade", "craft", "craftsmanship", or "workmanship".
12. THE Content_Module and every rendered page SHALL contain zero occurrences, in any capitalization and including Review text, of the superlative or ranking phrases "best in" (for example, "best in Dallas", "best in DFW", "best in Texas"), "#1", "number one", "No. 1", "top-rated", "top rated", "unmatched", "unbeatable", "second to none", "world-class", and "world class".
13. THE Content_Module SHALL contain at most one Review whose text contains the whole word "elite" (any capitalization) outside the company name, and that Review SHALL NOT be marked as featured. Because the Reviews_Page shows all Reviews when no Review_Filter is applied, that Review SHALL count as the Reviews_Page's single permitted "elite" occurrence under criterion 5, and all other Reviews_Page text SHALL contain zero occurrences of "elite" outside the company name. Review text is exempt from criterion 3 and MAY refer to the crew or team that did the work.
14. THE Content_Module SHALL contain, in all Placeholder_Content other than Review text, zero exclamation marks and zero occurrences (any capitalization) of the pressure phrases "act now", "limited time", "hurry", "don't wait", and "today only".

## Appendix A: Customer Service List (verbatim)

### Exterior Improvements
- Fence Installation & Repair
- Fence Staining & Painting
- Pressure Washing
- Driveway & Sidewalk Cleaning
- Exterior Painting
- Siding Installation & Repair
- Gutter Installation & Repair
- Gutter Cleaning
- Deck Building & Repair
- Deck Staining & Sealing
- Patio Covers & Pergolas
- Concrete Work
- Walkways & Sidewalks
- Exterior Trim & Fascia Repair
- Door & Window Replacement
- Landscaping & Curb Appeal Improvements

### Interior Improvements
- Interior Painting
- Drywall Installation & Repair
- Texture & Sheetrock Repair
- Interior Trim & Baseboards
- Door Installation & Replacement
- Cabinet Installation & Painting
- Kitchen Remodeling
- Bathroom Remodeling
- Backsplash Installation
- Tile Installation
- Flooring Installation
- Luxury Vinyl Plank (LVP) Flooring
- Laminate Flooring
- Hardwood Flooring
- Carpet Removal & Replacement
- Crown Molding Installation
- Interior Fixture Updates

### Flooring & Tile
- Tile Flooring
- Shower Tile Installation
- Backsplash Installation
- Grout Repair & Replacement
- Tile Removal & Replacement
- Hardwood Floor Installation
- Vinyl & Laminate Flooring
- Floor Repairs
- Baseboard Installation

### Kitchen & Bathroom Upgrades
- Kitchen Backsplashes
- Cabinet Installation
- Cabinet Refinishing
- Countertop Replacement
- Vanity Installation
- Shower & Tub Updates
- Shower Surrounds
- Bathroom Tile
- Fixture Replacement
- Bathroom Renovations

### Roofing & Exterior Construction
- Roof Replacement
- Roof Repairs
- Shingle Replacement
- Roof Inspections
- Flashing Repairs
- Fascia & Soffit Repairs
- Storm Damage Repairs

### General Construction & Repairs
- General Home Repairs
- Remodeling & Renovations
- Framing & Carpentry
- Wood Rot Repair
- Trim & Finish Work
- Door & Window Repairs
- Minor Plumbing Repairs
- Minor Electrical Repairs
- Property Maintenance
- Rental Property Repairs
- Commercial Property Improvements

### Outdoor Living
- Fence Installation
- Deck Construction
- Patio Construction
- Pergolas
- Outdoor Kitchens
- Porch Repairs
- Outdoor Painting & Staining
- Pressure Washing & Surface Cleaning
