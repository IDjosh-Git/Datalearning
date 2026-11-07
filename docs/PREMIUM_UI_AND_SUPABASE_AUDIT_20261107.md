# DataLearning — Premium UI and Supabase reliability audit

Release: 7 November 2026. Source: `DataLearning_Premium_Wide_Course_Cards_20261106.zip`.

## Design updates

- Public and authenticated routes continue to share the navy, violet and white visual system. `assets/styles/premium-unified.css` remains the **last stylesheet loaded on all 39 pages**; the new design refinements were consolidated there instead of adding another conflicting CSS file.
- Unified card radii and elevation, button sizing and focus treatment, form/input controls, select chevrons, navigation menu surfaces, content wrapping and mobile overflow handling.
- Course-specific accent colors, assessment forms, editor behavior, SQL/Excel/Python challenges, sign-in and authorized admin navigation remain unchanged.
- Reduced-motion support and a non-forced global scroll behavior. No additional external font or UI library introduced.

## Supabase — evidence verified against the connected project

- Project: `DataLearning` (`hotysnqorkqbiconjskl`, EU West).
- Confirmed the app's `course_progress`, `quiz_results`, `capstone_submissions`, `learner_profiles`, `site_admins`, `datalearning_app_users` and certificate tables exist with row-level security enabled.
- Confirmed the app's named RPCs exist with matching arguments, including instructor progress reporting, certificate verification, capstone review, privacy-protected public aggregates and usage tracking.
- Confirmed the required composite primary keys exist for upserting learning progress and quiz results.
- Live read-only aggregate queries executed successfully (six aggregate course rows; public user-summary function responsive). No client records or credentials are included in this report.
- Vercel runtime error aggregation returned no matching errors in the preceding 24-hour window. This **does not prove** every user flow is error-free; no authenticated browser session was available to exercise every workflow on the live deployment.
- No production database writes, permission relaxations, migrations or deployments were performed. The Supabase instance is also used by other apps; database rules were deliberately left unchanged.

## Corrections included

1. **Ordered progress updates.** Concurrent changes for the same course are serialized before posting to Supabase; older network responses cannot finish after and overwrite newer updates from that browser.
2. **Pending-change safety.** An acknowledged sync removes only the exact queued change it saved, instead of discarding a later edit that arrived while the request was running. Anonymous-to-account migration preserves more recent queued changes.
3. **Truthful connection diagnostic.** The protected `connection-test.html` now performs an actual `auth.getUser()` network verification and a database read before declaring the connection healthy. Previously it relied on a locally cached session.
4. **Complete progress diagnostic.** The protected `sync-test.html` now checks all six learning paths, shows the correct unit count, and offers a retry action.
5. Added regression tests: `tests/cloud-write-order.mjs` and `tests/supabase-diagnostics.mjs`.

## Important limitations

- A production incident caused by invalid user credentials, an exhausted AI-provider quota, an unavailable network, or a revoked Supabase role cannot be fixed through CSS or client retries alone.
- Changes from **different devices while offline** can still conflict when synchronizing the exact same progress item. A stronger server-side versioning/merge protocol would require a separately reviewed, backwards-compatible migration.
- Live sessions, sign-in and remote API replies should be rechecked after deployment. The project currently contains server-side admin gating and RLS; do not replace either with UI-only protection.
- No new Supabase migration is required for this release.

## Release checks

Run `npm run verify:deployment` from the project root (Node.js 24). The full test suite passed during packaging. Static visual inspection at phone/tablet/desktop widths is supplementary, not a replacement for live browser authentication and database tests.
