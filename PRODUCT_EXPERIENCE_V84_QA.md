# Data Analysis Learning Path — Product Experience v84

30 October 2026 | Incremental release candidate built from `Data_Learning_Path_Atelier_UI_V83_QA.zip`.

## Scope and guiding decisions

This release **does not rebuild the application**. It keeps the existing 25 HTML routes (24 original plus the new `/preview.html`), brand assets, course materials, practice engines, account authentication, Supabase progress synchronization, capstone submissions, instructor assessment, and certificate verification. There are no new third-party dependencies or database migrations.

## Problems identified in the live site and source

1. The theme bootstrap and toolbar defaulted to light when the visitor had not saved a preference, even if the operating system preferred dark.
2. The home progress summary ignored Python; there were duplicated course and dashboard sections and unclear or overstated account-sync messaging before login.
3. The first learning action and choice among six courses were not obvious. The homepage had a stale “five ways to begin” heading and hard-coded summary counts that did not fully describe the six tracks.
4. Course cards explained content but not consistently who the course served and the tangible outcome.
5. The page used a fixed floating link obscuring mobile content, a hamburger icon on large desktops, and mobile section tabs that were visually clipped.
6. At least one course callout used extremely pale text against a pale background in light mode; four specialist covers lacked a semantic H1 heading.
7. The site's auth-first flow did not provide a clearly linked sample lesson for visitors considering registration.
8. Some “learning path” links pointed to a homepage fragment that did not exist.

## Improvements implemented

- Shared v84 experience tokens and CSS; semantic light/dark surface, text, border, focus, and code colors. Distinct, restrained Excel, SQL, Power BI, Python, AI, and Foundations course accents.
- **System / Light / Dark** appearance selector. Defaults to OS preference on first visit, persists an explicit selection using the existing `dalp-theme` localStorage key, reacts to OS preference changes when in System mode, and prepaints the chosen theme on every route.
- Responsive “Find your starting point” recommender uses the learner's experience, goal, tool preference, and weekly study time. No account, network request, profile collection, or implied enrolment. It suggests a real existing course and a practical pacing approach.
- Cleaner home architecture for new vs returning learners; better course headings, honest six-track summary, added course outcomes, and a stronger sample CTA.
- Python included in the existing landing progress map; explicit unit-based progress counting and next-lesson links, including the Foundations case study. Card progress bars now have accessible numeric labels. The existing sync engine is unchanged.
- A contextual next action on each course: continue a unit, practise in Studio, or consult capstone guidelines. Progress remains reported as local until separately verified via the account sync service.
- New **public `preview.html`** reproducing the first real Foundations lesson without any faux completion state. Linked from sign-in and homepage. Existing account/session security for protected pages is preserved.
- Improved registration, tutor, and capstone guidance about privacy, reviewing AI output, independent practice, and manual instructor assessment.
- Fixed mobile tab clipping, desktop hamburger visibility, unreadable course callout colors, missing specialist H1s, and two stale navigation anchors. Removed the obstructive floating lab bubble while retaining a normal link to Learning Lab.

## Verification performed

| Verification | Result |
|---|---|
| `npm test` — core application, lesson datasets, quizzes, auth/security mocks, instructor review, sync | PASS |
| `npm run test:experience` — v84 25-page, first-paint theme, preview, recommendation, link, Python progress coverage | PASS |
| `npm run test:responsive` — shared mobile coverage and navigation | PASS |
| `npm run test:workspace` — existing account-aware workspace scripts | PASS |
| `npm run test:server-auth` — access and session checks | PASS |
| `npm run test:arena:v31` — interactive practice model answers and registered challenges | PASS |
| `npm run test:theme:contrast` — 14 legacy semantic pairs | PASS |
| `npm run verify:deployment` — static assets, route configuration, practice deployment audit | PASS |
| `node tests/accessibility-v23.mjs` and `node tests/live-gradient.mjs` | PASS |
| Custom token contrast audit of v84 palette | PASS (tested text/primary/focus pairs above 6.8:1) |
| Isolated browser render via Playwright/Chromium — 1440px desktop and 390px mobile, light/dark, basic theme and recommendation interactions, horizontal page overflow | PASS for isolated renders; no horizontal overflow observed |
| Local Vercel deployment/browser navigation or real authenticated account/instructor workflow | NOT VERIFIED (environment denies local HTTP/file navigation and has no authenticated deployment context) |

A broad sweep of 49 historical `.mjs` scripts was also performed. Eleven old assertions are still not passing; they were already failing in the input v83 archive and target obsolete rollout page counts, superseded asset requirements, or previously changed certificate/course details. These are **not** represented as new product regressions. The primary supported test commands above all pass.

## Important limitations and remaining work

- **Not deployed.** `https://datalearning.vercel.app/` will continue to show the prior version until this ZIP is deployed to the correct Vercel project. No backend or hosted data were modified.
- The isolated browser render includes the real page HTML/CSS and tests the new theme and recommendation controls, but does not run the full Supabase-authenticated app. A staging visit should verify signed-in dashboard, data sync, quiz completion, Studio practice, uploads, and certificate review with authorised test accounts.
- Original multi-era stylesheets are layered extensively; consolidating them and simplifying the theme cascade is worthwhile but should be done under full browser regression coverage rather than risk changing established course behavior.
- Cross-device progress depends on the existing Supabase session, network, and sync system. New onboarding recommendations are not saved to the user account; they are transient browser guidance.
- The sample is deliberately public and does not track completion. Regular course pages and account-dependent functions retain their prior authentication requirements.
- Instructor marking, issuance, payment/fee policy, and certificate claims were not altered or simulated; business rules must be verified by an authorised platform owner.

## Suggested staging acceptance journey

1. Open `/preview.html` in a signed-out browser; follow the sign-in link and verify the redirect to the Foundations lesson.
2. Try System, Light and Dark on desktop and mobile, refresh, then change OS preference while in System.
3. Submit the beginner and experienced versions of “Find your starting point”; compare with the six courses and start a lesson.
4. As a test learner, complete one lesson, refresh, confirm the next action updates, and check another device after the signed-in sync completes.
5. Try one Practice Studio challenge, a quiz with incorrect answers, Reference Library and the tutor. Confirm feedback is useful and saved state is accurately explained.
6. Walk through the capstone submission requirements, file privacy warning, and instructor review/certificate workflow with test accounts.
7. Check responsive layouts at 320px, 390px, tablet and desktop. Watch the browser console/network tab and check forms, keyboard focus, screen readers, reduced motion and dark-mode modal surfaces.
