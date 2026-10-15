# Theme and course-card layout update — 15 October 2026

## What's changed

- Course cards appear in this order on the homepage: Introduction → Excel → SQL → Power BI → **AI Integration in Data Analysis**.
- AI is the **last** course card, no longer a double-width featured tile. All five course cards use the same width, padding, borders, shadow and equal-height grid rows at the same screen size.
- The AI course remains clickable, including its existing whole-card click target and course progress indicator. The My Learning dashboard still includes an AI course link and progress card.
- Shared design tokens unify the light and dark themes across the main website, Introduction, Excel, SQL, Power BI, AI, AI Prompt Library, learner account and utility pages.
- Previously fixed light-blue areas (the homepage AI prompt-library promotion, the Continue Learning banner and the Introduction next-steps box) now follow the active theme instead of breaking dark-mode contrast.
- The AI course and prompt library use the same navy, burgundy/plum and neutral brand identity, while specialist track accents remain distinct.
- Theme buttons are available on the AI course and the prompt library, preserving the site-wide saved `dalp-theme` preference.
- Local CSS and JavaScript references use cache version `20261015.3` to prevent an outdated stylesheet from displaying the previously oversized AI card.

## Verification

- Automated suite: `npm test` (all checks passed).
- In a headless Chromium visual inspection with styles inlined (to avoid blocked network font-loading), five homepage course cards had identical widths and heights at 1440px, 900px and 390px, in light and dark modes.
- Theme controls and body backgrounds were inspected for Introduction, Excel, SQL, Power BI, AI and the AI Prompt Library in both themes.
- On production, verify the real browser interaction, network-loaded assets, Supabase progress synchronization and certificate flows after deployment. These rely on external services and were not executed by the isolated visual test.

## Deploy

Replace the old site files with the contents of this ZIP, maintaining the directory structure. In your browser perform a hard refresh (Ctrl+Shift+R). This is a styling/layout update and does not add a new database migration.
