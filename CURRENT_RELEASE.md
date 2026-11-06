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
