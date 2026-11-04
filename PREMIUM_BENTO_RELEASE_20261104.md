# DataLearning — Premium Bento and Learning Overview release

Release: 4 November 2026 · Source package · **Not deployed**

## What changed

- **39 routes:** the existing 38 routes remain, plus a new public `overview.html` (also available at `/overview` on Vercel).
- **Shared premium navigation:** one final `assets/styles/premium-unified.css` loaded last on every route. Public headers, dropdowns, private navigation and common controls use coherent, higher-contrast surfaces. The previous role-based private authorization and course-specific designs are preserved.
- **Bento Search:** `assets/scripts/premium-search.js` provides a consistent search control on all pages. Use **Ctrl+K / Cmd+K**, or `/` outside text fields; search course names, skills and learning destinations; use arrow keys, Enter, Escape. No search terms are transmitted off-device.
- **Learning Overview:** browse all six learning tracks, activity ranking where genuine aggregate activity is available, a locally saved daily study checklist (15/30/60 minutes), and quick links to Practice Arena, Tutor and Reference Library.
- **Real learning statistics, not fictional rankings:** `database/migrations/learning_overview_aggregate.sql` adds a Supabase RPC for privacy-suppressed aggregate counts. It uses recorded progress, quiz and capstone activity; excludes instructor accounts; **suppresses course metrics until at least five distinct learners have activity in that course**. The public page does not retrieve learner names, emails or individual rows. Existing server-side RLS and account/session checks are untouched.
- **Cleanup:** removed 44 old one-off audit/report documents, eight redundant root release files and two unreferenced Arena scripts. All 48 remaining CSS files are still referenced by real pages; they were *not* deleted indiscriminately. Existing tests, lesson content, downloads, Practice Arena editor and execution assets remain.
- **Cache:** bumped the public service-worker revision to `dalp-public-bento-search-overview-v33`.

## Enable live course-popularity statistics

1. Open your intended Supabase project and review `database/migrations/learning_overview_aggregate.sql` before applying it through the Supabase SQL Editor/migrations.
2. The **public** `overview.html` calls the read-only `public_course_activity_overview` function via the site's existing published Supabase connection. It does not expose service-role credentials.
3. If Supabase is not configured, the function is not deployed, or fewer than five learners have activity in a course, the page **does not invent numbers**. It displays a clear unavailability / insufficient-data state.
4. The “learner-course activity” KPI adds each qualifying course's learner count; a person studying two courses contributes once to each of those courses. This is **not** a unique site-wide user count.

## Delivery and verification

- `npm run verify:deployment` — **PASS**, including build, lint, security, course content, responsive source contracts, private navigation, 95 Arena challenges, and Tutor tests.
- `tests/premium-bento-overview.mjs` specifically checks every route's new shared stylesheet/search, overview component presence, SQL data minimization and accessibility colours.
- The container's Chromium disallowed direct local/HTTP page navigation; browser-level pixel matching on a **live Vercel preview** is still needed. Do not consider source checks a substitute for an authenticated, mobile browser test.
- The package was tested locally with Node 22; `package.json` specifies Node 24 for Vercel. **Neither production Vercel deployment nor the Supabase migration was performed.**

## Deploy safely

Extract this ZIP into the Git repository root, commit source files to a **preview branch** first, check Vercel build status and live search/Arena/Overview on mobile and desktop, apply the reviewed SQL migration to the correct Supabase environment, and merge to `main` only after checks. Preserve project environment variables and credentials in Vercel, not inside the ZIP.
