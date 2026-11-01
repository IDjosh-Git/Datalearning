# Project documentation index

## Current sources of truth

- [Website organization and access map](SITE_ORGANIZATION_AUDIT.md) — route hierarchy, page ownership, open risks and verification.
- [Route manifest](SITE_ROUTE_MANIFEST.json) — all HTML routes grouped by access boundary, used by automated checks.
- [Current styling system](CURRENT_STYLE_SYSTEM.md) — the authoritative design tokens and stylesheet ownership.
- [Supabase setup](SUPABASE_SETUP.txt) — authentication and database integration guidance.
- [Course guides and checkpoints](COURSE_GUIDES_AND_CHECKPOINTS.md) — teaching resource routes.

## Historical audit records (reference only)

The following documents describe **previous migrations and fixes**; follow current guidance above before modifying source files:

- `CLEANUP_REPORT.md`, `COURSE_SOURCE_CLEANUP.md`, `FEATURE_PAGE_CLEANUP.md`
- `PUBLIC_THEME_AUDIT.md`, `PUBLIC_LINK_CLEANUP.md`, `REMAINING_PAGE_STYLE_AUDIT.md`
- `FRONTEND_AND_CURRICULUM_HANDOFF.md` (its old `experience.css` instructions are obsolete)

To validate a change run `npm run verify:deployment`. A source-level pass does not certify browser rendering or live backend access.
