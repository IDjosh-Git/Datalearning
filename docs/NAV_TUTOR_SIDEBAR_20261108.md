# DataLearning navigation, Tutor and lesson drawer update — 8 November 2026

## Changed
- Resolved inherited pale text on light navigation cards, course menus, actions and account controls with explicit foreground/background pairs.
- Standardised mobile menu text, active and hover states, and dropdown icon contrast across public and course pages.
- Added one focusable, 44-pixel Close button to the shared course sidebar controller, active on all six main courses. Opening, backdrop, Escape and focus restoration remain with the existing controller.
- Simplified fullscreen mobile Tutor: compact header, higher-contrast status/actions, content-sized messages and composer, and practice controls moved into the existing Tools drawer without changing their element IDs or AI logic.

## Deployment
Replace the website files and redeploy. No database or environment variable changes required.

## Important
Run live device tests with actual user accounts, mobile soft keyboard and long AI responses before treating production behavior as fully verified.
