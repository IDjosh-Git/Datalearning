# DataLearning — Clean Unified Premium Release

**Updated:** 10 November 2026.

Cleaned from the Unified Premium Study Tools / Footer / Tutor / Coach release. Existing functionality, seven-path curriculum, authentication, progress sync, Supabase RLS, AI Tutor, floating AI, Practice Arena, Learning Coach, capstones and certificates are preserved.

- Removed orphaned CSS/JS, disconnected legacy course-guide pages and obsolete release documentation and tests.
- Removed hidden duplicate old public navigation markup on pages already using the unified header.
- Kept bookmarked legacy course-guide routes working through Vercel redirects.
- Updated the seven-path route manifest and service-worker cache version.
- Retained current course paths plus AI/Python legacy learning routes and their linked guides.
- Added an automated link and asset resolution regression check.

See `docs/CLEANUP_AUDIT_20261110.md` for the exact audit and preserved assets.

**Deployment:** unzip and place the `datalearning/` contents in the repository root; deploy to Vercel. Run `npm run verify:deployment` locally. No Supabase schema changes.
