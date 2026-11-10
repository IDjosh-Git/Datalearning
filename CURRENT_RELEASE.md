# DataLearning — Unified Premium Private Workspace (10 November 2026)

**Based on:** `DataLearning_Premium_Private_Pages_Rebuild_20261110.zip`.

All eight authenticated pages now use the same branded initial page loader and public search dialog as the public academy. The protected sidebar has an uncluttered **Academy** group for all signed-in users, plus a verified-admin-only **Administration** group and collapsed secondary tool menus. The duplicate profile control is removed in favour of the one shared profile-photo-aware shortcut. The deep-teal/sage/ivory theme, responsive drawer, accessible focus states, card layouts and existing controllers are retained.

**Database/security:** Existing Supabase queries, authentication, database rows and row-level security are unchanged. No migration or secret was introduced. `site_admins` controls the admin menu and restricted pages. Some instructor reports also require `capstone_reviewers` membership; verify that authorised administrators have the appropriate roles before deployment. Live Supabase sign-in and data reads still require an authenticated staging/production test.

**Verification:** `npm run verify:deployment`, plus signed-in learner/admin checks on the deployed preview. See `docs/PRIVATE_WORKSPACE_REFINEMENT_20261110.md`.
