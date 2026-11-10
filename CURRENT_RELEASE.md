# DataLearning — Private Sidebar Consolidation & Hover Contrast

**Release:** 10 November 2026  
**Base:** DataLearning Private Navigation Isolated Premium Diagnostics (full project)

## What changed

- Administration displays **Admin overview**, **Progress reports**, and **Review desk** as its three main destinations. The secondary **Reports & admin tools** list now includes Courses analysis, Connection check, and Progress sync; it does **not** repeat Progress reports.
- The redundant **Student management** sidebar link was removed. **Admin overview → Learner management** remains a functional shortcut to `admin.html#admin-learners`; it continues to show the existing learner directory and management operations without deleting data or database permissions.
- The Admin Overview view remains visually selected in the sidebar while the user drills into the directory through its shortcut. The independent Courses Analysis view and browser history handling remain unchanged.
- A stronger, shared private-page interaction style overrides older conflicting legacy rules. Unselected sidebar links have readable light text on the dark navy background. Hovering or selecting a link shows a pale mint surface with dark navy text and matching icons. The **selected** page retains a distinct orange indicator while hovering a different entry does not create a second selected indicator.
- Expandable menus, profile footer, dark Sign out button, topbar actions and light-background Admin Overview actions have appropriate foreground/background contrast, including keyboard focus. No font, authentication or Supabase controller changes.
- Updated the private JS/CSS URL revision on all eight protected HTML pages to invalidate older browser asset versions. Updated the public service-worker cache namespace; HTML, CSS and JS remain network-only, and private data are never cached by this service worker.

## Verification

- `npm run verify:deployment` — Academy, security, Practice Arena and Tutor suites pass.
- Headless Chromium with an isolated, simulated admin identity: eight desktop pages (1440px) checked for keyboard/hover contrast on sidebar navigation, expandable panels, profile controls and sign-out. Eight mobile pages (390px) checked for the shared drawer, one progress destination and no Learners sidebar entry. Selected/hover contrast combinations exceed WCAG AA 4.5:1 for the sampled controls.
- These were **local UI tests**, not a live Supabase login, RLS audit or production deployment check.

## Deploying

Deploy the full ZIP over the previous version. Refresh an admin session and verify sidebar destinations, hover/selected labels and Admin Overview → Learner management. No database migrations or edits to existing learner records are included.

## AI Tutor mobile drawer refinement — 10 November 2026

- Redesigned the AI Tutor mobile tools panel with a premium navy/teal sticky header, a labelled **Close** button, clear learning-mode selection, tidier tool cards, and dark readable labels on light hover backgrounds.
- Fixed the mobile drawer's stacking position so the close control is not hidden behind the site's global header. The backdrop now covers the full interface.
- Improved keyboard and screen-reader behavior: dialog semantics only while open, initial focus on Close, trapped Tab navigation, Escape/backdrop close, restored trigger focus, and inert hidden controls.
- Added the scoped `assets/styles/tutor-mobile-drawer.css` stylesheet after the legacy Tutor styles (while retaining the required public-search stylesheet as the final link) and regression assertions in `tests/tutor-mobile-drawer-premium.mjs`.
- Kept desktop Tutor layout, live AI/offline learning modes, starter prompts, and saved progress behavior unchanged.

## All-sidebar mobile polish and parity — 10 November 2026

**Base:** Premium AI Tutor Mobile Sidebar release. This is a full-project update, not a standalone CSS patch.

### Corrections

- **Eight protected Academy and Administration routes:** one compact slide-in drawer (maximum 360px wide), premium navy-to-teal fixed header, legible **Close** button, scrollable Academy/Admin groups, visible backdrop, consistent focus/hover colour. Previous 100vw mobile sidebar rule is overridden; the menu no longer covers the entire tablet screen.
- **Python and AI course lesson rails:** removed the old forced full-screen/mobile drawer geometry; introduced the same compact inset width, a contrasting labelled Close button, sticky header and backdrop. Existing lesson highlights, deep links, resource links and auth/progress handling are preserved.
- **Practice Studio skills rail:** retains the appropriate inline expanding panel on phones, with a clearly labelled Close button and Escape-to-close; no unnecessary full-screen modal.
- **AI Tutor:** retained the previously verified premium tools drawer, with its persistent Close action, independent scroll area, focus trapping and backdrop.
- **Public mobile navigation and Study Pulse:** labelled their close controls and aligned hover colours with the overall light-on-dark/dark-on-light design system.
- **Practice Arena challenge selector:** improved the close action on narrow screens without modifying the SQL, Excel or Python practice engines.
- **Cache:** updated the public image-cache namespace; CSS, JS and HTML remain network-only in the service worker. Sidebar UI assets have release-specific URL revisions.

### Validation

- `npm run verify:deployment` (Academy, security, Arena and Tutor suites).
- Browser interaction checks at 320px, 390px, 768px, 1024px and desktop 1280px, covering representative protected drawers, AI and Python lesson rails, and their Close/Escape actions.
- Public navigation and Practice Studio interaction checks at 320px–1280px.
- New `tests/sidebar-unified-audit.mjs` checks shared sidebar links, styles and close behaviour contracts across all relevant routes.

**Limits:** Browser checks use isolated local UI fixtures. These do not substitute for authentication or real learner progress testing against live Supabase, nor deployment-specific mobile device testing. No data tables, RLS policies, API credentials or learner records were changed.
