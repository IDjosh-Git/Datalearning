# Theme consistency update — 15 October 2026

## Improvements
- Aligned the standalone AI course and AI Prompt Library with the existing burgundy/navy/neutral visual identity.
- Shared CSS tokens now drive light and dark surfaces, text, controls, prompts, lesson panels and quizzes.
- Added the existing global theme toggle to both previously standalone pages. It uses the same saved `dalp-theme` browser preference as the rest of the platform.
- Preserved Excel green, SQL blue, Power BI gold and Intro purple as **course identity accents**, not competing global themes.
- Improved responsive header layout, link contrast, focus visibility and prompt-card controls.
- Appended a shared final stylesheet to every HTML page, and bumped CSS cache keys to `v=20261015.3`.

## Deployment
Upload the complete site files to the same web root, preserving folder structure. Refresh the browser with Ctrl+Shift+R if it has cached an old page. No new database migration is required for this CSS-only update.

## Verification checklist
1. Open homepage and AI course, check common plum/navy styling.
2. Open AI Prompt Library; search, filter and copy a prompt.
3. Switch dark/light mode on either page; navigate to other pages to confirm persistence.
4. Confirm module completion and capstone links still work.
5. Test the same flows on narrow/mobile screens.

Automated structural/course checks do not replace a deployed-browser check.
