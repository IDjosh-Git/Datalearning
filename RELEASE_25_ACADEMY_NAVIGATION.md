# DataLearning Release 25

Source baseline was the locally available Release 23 archive. The Release 24 download was visible in the earlier ChatGPT conversation, but its archived file was inaccessible in this workspace.

## Changes

- One Academy component renders desktop dropdowns and the mobile navigation dialog from one route list. The public landing and guidance pages, all nine generated syllabi, and the learner workspace use it.
- The header highlights the current Academy group on both screen sizes. My Learning section links track the current fragment, including links using the old course-progress anchor.
- Shared search uses public course syllabi for visitors and the course workspaces for signed-in learners. Profile and sign-out use the verified learner session.
- A shared footer owns its contrast rules and uses the published Admin Appearance colours. The current theme guards primary and secondary backgrounds against insufficient white-text contrast.
- Updated the Vercel Functions dependency and included the npm lockfile. Install with Node 24 and npm ci.

## Verification

The configured deployment verification includes public generation, clean static output, lint, the Academy and learning-platform regressions, and authentication and authorization tests. Separate release-route, learner-journey and quality checks also ran.

Edge was checked locally at 1440 and 390 CSS pixels. Coverage included the public landing page, Start Here, Free Lesson, Career Paths, the catalogue, all nine syllabi, My Learning, AI Tutor, Profile, Certificates, Practice Hub and Study Tools. Signed-in visual checks used a simulated learner. The branding endpoint also used simulated published colours. Live Supabase sign-in, Admin Appearance publishing and production behaviour were outside local verification.

No production deployment was made.


## Discover Courses layout update

The signed-in Discover Courses hero and the public course catalogue intro use less vertical space. The Discover photo, actions and course statistics remain in the layout, with a shorter photo crop and a compact statistics row on phones.

## Navigation and visual polish

- Explore Courses opens the Discover study grid. Its dropdown lists nine study workspaces, with the public catalogue and previews grouped below them.
- Desktop and mobile use matching disclosure icons and link cards. The course links remain keyboard accessible.
- Learner and public heroes use the published palette. Study Tools, Practice Hub, Reference, Profile and Start Here have adjusted narrow-screen layouts.
- Pages request the published palette early and hold content during the short initial theme check. The default palette is available if the branding request fails.

## Public and learner navigation

Public pages show Home, Start Here, course outlines, Career Paths, Free Lesson and Sign in. Their footer helps visitors choose a first course or create an account. Learner pages keep the study destinations and search. Their footer has four link groups in a wider layout and includes Admin. The existing administrator authorization still protects that destination.

## Home image and first-paint update

AI Tutor is available directly from learner navigation and search. The Study Tools grid uses its remaining five cards across the available width. The public home and Discover give the hero photograph the larger desktop column and the full content width on smaller screens.

The published palette now starts resolving in the document head and is applied before page content becomes visible. An initial request that fails uses the default palette. Later failures leave the last published palette applied on the open page. Local Edge checks used an intentionally delayed branding response.

## Public experience and app audit

- The Explore Courses catalogue now has aligned search and category controls, course icons, and a visible link to the introductory course.
- Career Paths presents three suggested training sequences with direct links to course syllabi. Free Lesson places the worked example and exercise in a readable lesson layout with section shortcuts.
- The visitor footer aligns with the home page content width. Both footer layouts use their available space at desktop and phone widths.
- The desktop and mobile layout audit covered 50 routes, including nine public outlines, nine lesson workspaces, signed-in tools, admin screens, sign-in, and the legacy Questions redirect. It caught clipped lesson section controls and a missing primary heading in AI Tutor. Final Edge checks passed at 1440 and 390 CSS pixels with no page-level horizontal overflow.
- The browser audit used simulated authentication and branding. It checked layout and landmarks across the route list, and exercised catalogue filters, career links and sample lesson anchors. Live services and production were outside this audit.

## Windows desktop width

Page frames, headers and footers use the available desktop width with a 16–28 px side gutter. This covers the public site, learner tools and courses, sign-in, and administrative workspaces. Long-form reading and printable certificate dimensions retain their own layout. Home images load a local dashboard preview immediately and swap in the weekly photograph after it loads.

## Alignment, loading and certificate records

Navigation and footer content use matching horizontal margins on desktop and mobile. The compact loader uses one neutral surface and dismisses when page styling and, where necessary, access verification are ready. Public routes use the same loader.

The Certificates route now lists the signed-in learner’s issued records without requiring a certificate ID. Active records open the existing certificate preview and download controls. Revoked records are identified and have no preview link. Learning Progress counts active certificates and distinguishes a fetch failure from an empty list. Certificate access remains subject to the existing database policies.

## Shared interface polish and local fonts

DM Sans is the interface typeface and Plus Jakarta Sans is used for page headings. The app ships the font files and their Open Font Licences. Public previews, learner tools, sign-in and administration use these fonts without external font requests. Typography, card presentation and control spacing share the same design rules. My Learning’s mobile section links wrap into two columns, and the selected section is visually distinct.

The layout audit checked 50 routes at 1440 and 390 CSS pixels in Edge with external font requests blocked. Protected-page checks used simulated authentication.

## Course reader and diagrams

All nine course workspaces use a tighter sidebar gap and fill the remaining lesson width. Mobile lesson content shares the same page gutters instead of adding a second inset. My Learning enrolment sits beside the week counter, using the already verified learner session and retaining the enrolment action.

The 90 weekly visuals and 20 supplemental concept diagrams share a framed layout and a full-size link. The illustrations have updated colours and typography. Excel Week 1 keeps its product screenshot within the shared presentation. Small screens can scroll the diagram rather than reducing its labels to unreadable text. Edge checked all 90 weeks at desktop and phone widths, with simulated enrolment.
