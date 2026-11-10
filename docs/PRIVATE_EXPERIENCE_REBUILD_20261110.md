> **Historical design record.** For the newer four-link Academy + Administration navigation, shared page-loader integration and single-profile fix, see `PRIVATE_WORKSPACE_REFINEMENT_20261110.md`.

# DataLearning — Premium Private Experience Rebuild (10 November 2026)

**Base release:** `DataLearning_Premium_Compact_Practice_Studio_Paginated_Learning_Lab_20261110.zip`.

## Design alignment
- All eight protected routes now load the same premium search-dialog stylesheet used by public pages, followed by one final protected-workspace styling layer.
- Replaced the old indigo-heavy visual language with the public academy's midnight-teal, sage, warm ivory, and orange theme. Shared typography, cards, buttons, spacing, inputs, tables, and mobile breakpoints are harmonized.
- Rebuilt shared navigation to use five primary learner destinations: Dashboard, Explore Courses, Practice Arena, Study Tools, and AI Tutor. Secondary learning destinations move into an expandable **More learning tools** area; account/profile and sign-out remain anchored at the bottom, and a single public-academy return link remains available.
- Administrators get a separate five-item management menu with protected diagnostics available on demand; learner-only items disappear when the verified administrator role is set.
- Header shows responsive breadcrumbs, the same search dialog as the public pages, a compact primary action, and an accessible profile shortcut. Search works with the existing controller and Ctrl/Cmd+K shortcut.
- On mobile/tablet, navigation becomes the existing focus-managed, closable drawer; desktop retains a lean sticky sidebar. Includes reduced-motion and visible keyboard-focus states.

## Protected pages
`admin.html`, `progress.html`, `reviewer.html`, `account.html`, `profile.html`, `certificate.html`, `connection-test.html`, and `sync-test.html`.

## Preservation
- All existing authentication and role checks, course progress, learner profiles, private assessment controllers, grading, certificates, Supabase integrations, and Studio/Lab pagination remain in place.
- Public course pages and the preceding release features are unchanged.
- No database migrations or changes to environment variables are required.

## Tests
`npm run verify:deployment` runs academy, security, arena, tutor, syntax and the new `private-premium-rebuild.mjs` regression contract. A live authenticated browser review (especially Supabase data and admin roles) remains recommended before publishing the update.
