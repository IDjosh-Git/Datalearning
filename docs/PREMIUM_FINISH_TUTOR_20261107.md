# DataLearning — Premium Finish & Focused Tutor

Release: 7 November 2026

## What's changed

**Across all public and private pages**
- Reused the existing `assets/styles/premium-unified.css` as the final styling layer, without another external stylesheet or changing route architecture.
- Normalized the primary and secondary action buttons, explicit link actions, focus rings, active/hover states, radii, shadows, spacing, and header surfaces.
- Introduced consistent dark-navy/violet text-and-surface pairs, and added text wrapping / width guards on cards, sections, grid children, forms and controls.
- Restyled tagged public action/resource links as compact button-style links; preserved ordinary inline editorial links.
- Improved action-link styling in the learner account, administration, assessment and progress areas.

**AI Tutor**
- Moved tutor setup controls into a compact accessible slide-over Tools panel on mobile. Live/offline mode, topic, starter questions and learning resources remain available without covering the chat by default.
- Changed the Tutor into a viewport-fitted, stationary workspace with the messages as the independently scrolling region, and a compact bottom composer.
- Collapsed optional practice actions and privacy information using native `<details>` disclosures.
- Reduced duplicated headings, decorative hero content and toolbar controls on narrow phones.
- Preserved the existing quiz, question selection, live AI + offline guide, response, session, authorization and provider fallback logic.
- Added `assets/scripts/tutor-workspace.js` solely for the responsive Tools drawer and composer auto-sizing; the AI controller remains unchanged except for placing the existing controls inside the Tools panel rather than above chat.

## Verification

- `npm run verify:deployment` passed, including build, lint, full security, learning, Arena and Tutor suites.
- `tests/premium-finish-workspace.mjs` checks the 39 HTML routes, linked assets, Tutor control IDs, responsive drawer and 13 representative text/surface color combinations against WCAG AA's 4.5:1 contrast threshold.
- Legacy CSS files were not deleted; the new rules are kept in the existing last-loaded unified stylesheet to avoid breaking page dependencies.
- Browser screenshots and on-device production interaction checks could not be completed in this test environment. The browser was configured to block page navigation. Perform a quick iPhone/Android check after deployment, especially with the keyboard open and with long Tutor answers.

## Deployment

Deploy ZIP contents to the existing DataLearning Vercel project, preserving the directory structure. The package includes the app, all six courses, downloads, tests, API routes and configuration. No Supabase migration or new API keys are needed for these UI changes. Verify the `tutor.html` page after redeployment, and hard-refresh if cached assets persist.
