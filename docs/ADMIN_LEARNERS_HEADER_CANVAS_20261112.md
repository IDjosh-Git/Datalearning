# Admin Learners & Progress – header and canvas refinement (2026-11-12)

- Restored a premium navy-and-teal header behind **Learners & Progress**, with white typography, orange eyebrow text, and accessible translucent action buttons.
- Removed the legacy radial gradient/underlay from the admin page-area, main-frame, and workspace wrappers. Body retains a single flat `#f7f9fa` canvas. Modal backdrops and sidebar overlays remain operational when intentionally opened.
- Removed page-wide border/outline treatments while retaining individual table/card/control borders.
- Scoped all changes to the admin page, preserving Course Analysis, Review Desk, and learner-facing pages.
- Bumped the admin CSS cache-version query in `admin.html` to ensure updated styling loads when deployed.
- No Supabase schema or administrative role changes.
