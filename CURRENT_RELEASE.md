## 9 November 2026 — Premium weekly curriculum browser

- Redesigned the Courses catalogue with six course selectors and stage-based weekly-module cards.
- Added a compact, expandable module map within all six course pages.
- Retained existing lesson content, standalone quiz pages, progress tracking and signed-in permissions.
- Intro is correctly structured as eight lessons plus the final foundation assessment; five other courses have ten weeks each.
- Verification: full project checks, 24 isolated selector/viewport checks, no overflow, and valid lesson/quiz destinations.
- Design-reference limitation: the supplied ChatGPT-hosted site returned 401 Unauthorized, so the update is not a pixel-for-pixel reproduction.

# Latest release — Premium Tutor & Immersive Mobile Challenges | 9 November 2026

Tutor Studio now uses a rectilinear Blueprint design with square-edged chat cards, controls, and a clean message area. Practice Arena opens the challenges library as a true mobile full-screen overlay, with an anchored title/search/footer, collapsible mobile filters, and a separately scrollable challenge list. Fixed a layering conflict with the global navigation and a clipped Tutor header action on 320px phones. Existing challenge scoring, learner progress, and AI modes preserved. See `docs/PREMIUM_TUTOR_ARENA_MOBILE_20261109.md`. No database migration required.

# Latest release — Mastery Assessment, Discover 3D, Navigation & Contrast | 9 November 2026

Premium standalone mastery assessments now have refined question cards, A–D answer options, responsive forms, synced progress indicators, grading feedback and accessible focus treatment. The redundant “Data Analysis Learning Path” heading was removed from the Excel, SQL, Power BI and Python course sidebars; course-specific branding remains. Discover’s hero includes an illustrative, responsive, animated 3D interface panel with reduced-motion support. Desktop navigation uses more of the available width. Reviewed contrast on assessment, Discover, catalogue, and learning-support surfaces. No questions, answer keys, backend accounts or Supabase tables were changed.

See `docs/PREMIUM_MASTERY_DISCOVER_CONTRAST_20261109.md`. Actual deployed browser/device and authenticated workflows should be checked before production rollout.

# Latest release — Premium Cross-Device Responsiveness | 8 November 2026

Refined responsive layout consistency across shared public pages, course portals, dedicated weekly quizzes, Tutor Studio, Practice Arena, learner overview, account and administrative views. Added adaptive gutters, flexible card/grid sizing, mobile navigation containment, touch-friendly controls, compact phone typography, safe-area-aware Tutor composer, and scroll-contained data tables. Corrected Catalogue dark-hero text contrast, Overview badges/CTA, Practice Arena breadcrumbs, and a 320px Tutor Send button wrap. Retained the existing premium logo/brand motion, all six learning tracks, and account/progress functions. No backend or database change.

Automated build, lint and complete test suites passed, supplemented by Chromium static rendering audits. See `docs/PREMIUM_RESPONSIVENESS_AUDIT_20261108.md` for coverage and limitations.

# Latest release — Premium Brand Wordmark & Motion | 8 November 2026

See `docs/PREMIUM_BRAND_MOTION_20261108.md`. Premium live wordmark and reusable SVG logo, refined SVG/icon microinteractions and subtle card hover animation. Motion respects user accessibility preferences. No backend or database changes.

# Latest release — Guided Weekly Lessons + Dedicated Quiz Pages | 8 November 2026

All 50 technical course weeks and the eight Introduction lessons now receive clear, premium learning guides with practical business context, actionable steps, and separate weekly assessment links. The original question banks and mastery checks now open on responsive, purpose-built quiz pages instead of expanding inside the lesson. Existing lessons, practice activities, progress, and account sync are retained. See `docs/PREMIUM_WEEKLY_LESSON_STANDALONE_QUIZ_20261108.md`. No database migration required.

# Latest release — Unified Premium Assessments | 8 November 2026

All six course question experiences now share Blueprint-and-melon premium gradients, consistent question cards, accessible answer states, refined quiz actions and responsive layouts. Includes weekly knowledge checks, Introduction and course mastery checkpoints. See `docs/PREMIUM_ASSESSMENT_UI_20261108.md`. CSS-only visual update; learner data, quiz logic, accounts and backend remain unchanged.

# Latest release — Premium Surface Finish | 8 November 2026

See `docs/PREMIUM_SURFACE_FINISH_20261108.md`. Consistent premium cards, tonal buttons, quieter edges, intentional shadows, retained focus states and responsive course/Tutor surfaces. No backend or database changes.

# Latest release — Premium Responsive Theme, Video & Learning Coach | 8 November 2026

See `docs/PREMIUM_RESPONSIVE_THEME_RELEASE_20261108.md`. Retired old visual palette, centered YouTube player on phones, fixed Learning Coach footer, enhanced square-top mobile Tutor, consistent typography, and responsive layout. No backend changes.

# Latest release: Melon + Blueprint Light Edition — 2026-11-08

Full light-theme refresh across public and authenticated pages. Premium gradient private navigation, light course sidebars, consistent buttons and headers, and updated brand mark. Dark navy sections are replaced with warm neutral panels and muted blue accents. No backend, course content, or auth changes. See `docs/MELON_BLUE_PALETTE_RELEASE_20261108.md`.

# Latest release: Premium Navigation & Workspace Audit — 2026-11-08

See `docs/PREMIUM_NAVIGATION_AUDIT_20261108.md` for changes, tests and deployment.

# Current release — 8 November 2026

**In-app YouTube course videos:** all six main courses open their video resource in a premium responsive player without navigating away from the lesson; Close, fullscreen and external fallback remain available. Original reading links preserved. See `docs/IN_APP_COURSE_VIDEO_20261108.md`. No database migration.

# Current release — 8 November 2026

**Premium navigation contrast, improved mobile Tutor, and course sidebar close button**

See `docs/NAV_TUTOR_SIDEBAR_20261108.md` for details. No new Supabase migration or environment variables.

## 8 November 2026 — Mobile Tutor immersive viewport

The mobile Tutor now occupies the full dynamic screen height. The global site header and extra hero are hidden within Tutor only; a Back to Discover link and Tools drawer remain available. Long messages scroll independently of the compact anchored composer. See `docs/TUTOR_FULLSCREEN_MOBILE_20261108.md`.

**Latest release (8 November 2026):** Capstone / Profile / Mobile Header. See `docs/CAPSTONE_PROFILE_MOBILE_20261108.md`. All existing learning and administrator features retained.

# Current release — Clarity Edition (7 November 2026)

Simpler public pages and mobile menu, seven CSS layer consolidations (48 → 41 files), sidebar-only lesson selection, modern quiz cards, and a capstone without the decorative hero overlay. See [`docs/CLARITY_EDITION_20261107.md`](docs/CLARITY_EDITION_20261107.md) for specific file changes and verification. No production database writes or deployment were performed.

---

# Current release — 7 November 2026

This version retains the 6 November course-card layout and extends the existing final stylesheet for premium public/private design, tighter mobile controls, and consistent focus/scroll behavior. Supabase reliability improvements include serialized per-course writes, pending-change reconciliation, truthful live connection testing, and diagnostic coverage for all six course tracks.

No production Supabase migration or deployment has been performed. See `docs/PREMIUM_UI_AND_SUPABASE_AUDIT_20261107.md` for evidence and limitations.

---

# DataLearning — Premium full-width course cards (6 November 2026)

## Current update
This release builds on `DataLearning_Mobile_Spacing_Tables_Refined_20261106.zip` and retains all existing lessons, the six white-gradient course sidebars, 12 roadmap/extension pages, progress saving, quizzes, Practice Arena, authentication, and Tutor Studio.

- **Wider teaching cards across every course.** On a 390px screen, Excel/SQL/Power BI lesson cards increased from approximately 305px to 344px; their mastery cards from 287px to 344px. The Introduction lesson card increased from 331px to 348px, and AI lesson units from 334px to 356px. Equivalent layout rules apply to Python. On desktop, the support cards use two approximately 503px columns instead of three 331px columns.
- **Modern, uncluttered surfaces.** Removed decorative panel/background overlays (not functional drawer and dialog backdrops), made the lesson surfaces consistent white with subtle shadows/borders, improved card padding, readable typography, accent borders, and focus-visible accessibility.
- **Mobile tables no longer squeeze text.** An old CSS rule was overriding the previous table enhancement, recreating cramped 3-column learning tables. The three-column concept / explanation / example tables now render as full-width labelled cards on phones **even without JavaScript**, and their captions also span the available width. Wide financial/data tables retain horizontal scrolling.
- **Responsive layouts without sideways scrolling.** Audited all six course pages in isolated Chromium HTML/CSS rendering at 320px, 375px, 390px, 768px, 1024px and 1440px: 36 checks with zero page-wide horizontal overflow or out-of-viewport teaching cards.
- **Single design-layer source of truth.** All new scoped course styling is in the existing last-loaded `assets/styles/premium-unified.css`, avoiding another stylesheet or legacy override conflict. No new background assets or additional frontend dependencies.

## Files changed
- `assets/styles/premium-unified.css` — widened cards, reduced nested padding, cleaned decorative layers, corrected CSS-only mobile teaching tables.
- `tests/course-premium-card-width.mjs` and `package.json` — regression contract included in the standard responsive test suite.
- `CURRENT_RELEASE.md` and `README.md` — this release description.

## Verification and limitations
- `npm run verify:deployment` — **PASS** (build, lint, responsive, learning, security, practice, tutor).
- 36 isolated Chromium HTML/CSS layout checks — **PASS**, no horizontal overflow. This is static rendering with page scripts removed for reproducibility; it does not prove dynamic behavior on the live Vercel site.
- Existing automated project tests verify course navigation, exercises, quizzes, progress, access gates and learning infrastructure. Final cross-device review on a Vercel preview is recommended.
- This ZIP has not been pushed to GitHub or deployed to Vercel; Supabase was not changed.

---

## Previous release record

# DataLearning — Mobile spacing and teaching-table readability (6 November 2026)

## Baseline
`DataLearning_Premium_White_Gradient_Sidebars_Header_Fixed_20261105.zip` (latest provided project). This release preserves the premium white-gradient lesson sidebar, the six primary course pages, twelve linked roadmaps/extensions, authentication, progress, quizzes, practice features, and learning content. It does not change Supabase data or deploy to Vercel.

## Fixes
1. **Readable mobile teaching tables.** The original three-column learning tables were forced to 530–600px or more, causing narrow-screen reading problems. On 760px and narrower screens, the existing `course-reading-tables.js` now labels and presents appropriate two-to-four-column instructional tables as stacked cards with a concept, explanation, and worked example. Their captions and column headers remain in the DOM for accessibility. Desktop keeps semantic tabular display; seven-column financial tables remain scrollable instead of squashing many columns.
2. **Tighter mobile content widths.** Removed excessive nested spacing in course sections, session guides, and learning-clarity panels so lesson content uses the screen more effectively. Kept readable breathing room, touch targets, and the current course-specific design.
3. **Removed apparent blank panels on phones.** Disabled `content-visibility:auto`/its 720px and 540px estimated placeholder heights only for mobile course lessons, units, and mastery sections. The previous placeholders could look like large blank spaces or produce vertical jumps while scrolling. Desktop still retains its off-screen rendering optimization. The tradeoff is that mobile browsers now calculate complete lesson sections immediately.
4. **Release cache update.** Bumped service-worker cache namespace to `dalp-public-mobile-reading-v50`. Mutable HTML, CSS, and JS are already network-fetched and are not stored in public offline cache.

## Code changed
- `assets/scripts/course-reading-tables.js`
- `assets/styles/premium-unified.css`
- `service-worker.js`
- `tests/course-navigation-stability.mjs` (updated cache-version assertion)
- `CURRENT_RELEASE.md` and `README.md` release notes.

## Verification
- `npm run verify:deployment` — PASS, including build, lint, responsive, course content, progress, authentication, admin, security, Practice Arena, and Tutor Studio.
- Isolated Chromium HTML/CSS/JS rendering (local URL navigation unavailable in this environment): 12 checks across Introduction, Excel, SQL, Power BI, Python and AI at 320px and 390px; all passed, table headers populated, vertical cards rendered, no page-wide horizontal overflow, no mobile 720px placeholder layout.
- A fuller initial preview also rendered the desktop table layout and 768px tablet styles on five courses; no regression was identified in those checks. A live Vercel preview with actual network requests and full authenticated behavior is still recommended before production rollout.

## Deployment
Unzip into the existing `IDjosh-Git/Datalearning` repository root, replacing the matching files, then deploy through Vercel. No production deployment was triggered in this release.

- Premium icon refresh across the app, including a redesigned logo, updated favicons, unified course icon family, and a global SVG icon system for navigation and action links.

## Sign-in & Full-screen Course Navigation (9 November 2026)
- Sign-in restyled as a premium, light, overlay-free two-column experience with polished form controls; mobile places sign-in first.
- Mobile course sidebar is a full-width, full-height viewport panel without the previous top/side gap, including safe-area-aware close control and scrolling.
- Existing auth logic, courses, progress, and Supabase integration preserved.

- 2026-11-09: Rectilinear premium Tutor Studio and immersive full-screen mobile Practice Arena challenge browser, with contained challenge-list scrolling and compact mobile filters.

## 9 Nov 2026 – Accessibility & sign-in refinement
- Wider 320px Data Analysis Foundations desktop sidebar, with matching content clearance.
- Rebranded Introduction document title; redundant legacy product title removed from that page.
- Sign-in page displays the form directly on a clean surface without outer-card overlay, shadows or wash.
- Contrast refinements for hero panels, summaries, sidebars, question status, and administrative and learning workspaces.

## Sign-in & Create Account field refinement — 9 November 2026
- Removed the residual inner white authentication panel and its border/shadow across Sign In, Create Account, and password recovery.
- Expanded the right-hand form region and increased input height to 60px on desktop/tablet and 58px on narrow phones.
- Preserved accessible input boundaries, clear focus indicators, password visibility controls, and original account/authentication logic.

## 9 November 2026 — Floating Learning AI, navigation and contrast
- Small floating coach across 33 learner-facing pages, with guest-safe built-in study guidance and optional authenticated live AI via the existing `/api/tutor` endpoint. No browser API keys or database changes.
- Mobile/tablet public navigation fills the viewport, with its own visible close button, Escape and keyboard focus controls. The floating launcher hides while the menu is open.
- Removed the command-search bar from Sign In; search remains accessible elsewhere.
- Improved text/background contrast for Practice Arena results and code output, the selected capstone button, and all six courses' Roadmap/Extension heroes (12 pages).
- Browser-tested mobile widths and reviewed text contrast across the 41 HTML routes (computed solid-background checks; gradient/dynamic UI not exhaustively certified).

### Excel Formula Lab & formatted floating AI (9 November 2026)
Expanded offline calculation functions and custom-cell worksheet with independent preview/grading, plus a safe Markdown-rich response renderer for the public floating AI. Updated regressions and responsive control spacing. No schema migration.

### Introduction course sidebar boundary correction · 9 November 2026
- The Data Analysis introductory course now uses the same bounded `.app` course layout as the other course pages: its sidebar and lesson content are siblings within one shared course shell.
- On desktops, the wider 320px (298px on smaller desktops) sidebar is sticky **within the lesson layout**, so it yields before the public footer instead of overlapping it. Its lesson list continues to scroll internally.
- The full-screen mobile/tablet course drawer, close control, focus handling, active lesson links, study resources, and course content remain intact.
- Added a source regression check and isolated Chromium geometry tests for 320, 390, 768, 1040, 1100, 1280 and 1440 px.
