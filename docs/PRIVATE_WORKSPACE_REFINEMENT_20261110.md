# Authenticated workspace refinement — 10 November 2026

## Scope
- Updated `private-navigation.js` shared shell: four Academy links for every signed-in role, three admin-only primary links, collapsed learning resources and admin reporting/diagnostic links. Admin status is displayed only after Supabase role verification.
- Removed the redundant private navigation avatar. The shared `profile-navigation.js` now owns the single top-right profile shortcut (and loads the existing profile-photo integration).
- Reused the exact public loader assets and loader HTML in `account.html`, `profile.html`, `certificate.html`, `admin.html`, `progress.html`, `reviewer.html`, `connection-test.html`, and `sync-test.html`. The existing auth gate remains mandatory and separate from this visual loader.
- Adjusted the final private styling layer to maintain shared premium color/typography/search controls, clear sidebar hierarchy and compact mobile profile action.

## Authentication/data integrity
All existing Supabase clients, query controllers, RLS rules, storage and server middleware are unchanged. No database records are altered by this release. `auth-gate.js` must validate each protected session; `site_admins` membership is necessary for administrative pages. Instructor progress RPCs additionally depend on `capstone_reviewers` membership in current SQL migrations. If the same administrator needs both sets of functions, grant the appropriate roles server-side after reviewing least-privilege access. Never modify permissions from browser code or expose service-role keys.

## Preview checklist
1. Confirm navigation and unique header avatar at 390px, tablet and desktop widths after learner sign-in.
2. Confirm Academy is visible to admin users and Administration is hidden for ordinary learners.
3. Confirm the exact public loader appears on protected page entry, then disappears without bypassing auth.
4. Test search dialog, keyboard shortcut, course/Studio links and mobile drawer.
5. Verify live learner progress/profile and course data; with a permitted admin account verify admin analytics, review queue, progress RPC access and diagnostics.
6. Run `npm run verify:deployment` before publishing.
