# Educator curriculum release — 13 November 2026

## Scope and source of truth

- All **nine Academy courses** have **ten weeks**. The existing foundations (roughly 615 words/week of masterclass teaching, with worksheets, visuals, quizzes and capstones) remain available.
- Added **90 curated non-repeating teaching ladders**, one per course/week, containing a plain-English foundation, a worked miniature, a professional extension and independently checkable evidence. Source of truth: `assets/data/course-educator-depth.json`; browser build: `assets/scripts/course-educator-depth.js`.
- Progression: Weeks 1–2 **Start here**, 3–5 **Build your skills**, 6–8 **Apply professionally**, 9–10 **Advanced practice**. This is an instructional progression, not a promise of formal professional certification after ten weeks.
- The course reader uses the same full guided reading for **Python and AI** as for the seven core subjects. The specialist masterclass renderer now calls the common renderer instead of displaying the same explanation twice; Week 10 projects remain accessible.
- The previous duplicated deep-dive casework was replaced by one practical skill ladder with disclosure-based companion code, verification evidence and a meaningful extension.
- SQL miniature examples explicitly use the **retail SQLite practice dataset** (`orders.unit_price`, `orders.discount_pct`), which differs from the **learning_sales_2026.csv** dataset (`unit_price_ngn`). Do not mix their schemas. The three SQL samples were executed against `downloads/retail_practice.sqlite`.
- All existing user/administrator roles, first-party session protection, Supabase RLS, cloud progress, 90 quizzes, 450 mastery items, capstone handling, Tutor and Practice Arena remain intact. No database migrations were applied.

## Style consolidation

- `academy-learning-depth.css` is now the one canonical teaching-ladder stylesheet; it replaces earlier gradient overlays, cramped two-column casework and non-scrolling code, providing three responsive cards and a structured proof section.
- Removed unused `.dlm-specialist-reading`, `.dlm-answer`, `.dlm-code` and old helper selectors from `ten-week-masterclass.css`, as the shared renderer does not use them.
- All HTML-referenced stylesheets still serve real pages; avoid deleting legacy shared CSS blindly until a complete browser-state and interaction audit demonstrates it is unused.
- Updated the changed lesson JS/CSS query versions to `educator-20261113`, preventing old CDN assets from masking this release after deployment.

## Release verification

Run `npm test` (includes new 90-week progression verification), `npm run build`, and test actual login, Supabase progress save, editors, Tutor and capstone in a deployed Vercel preview. Browser-only Python still runs in a web worker (not on the Supabase server). The current source ZIP is not a live deployment.
