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
