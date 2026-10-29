# v60 — Theme and checkpoint refinement

- Includes a final, shared stylesheet on Introduction, Excel, SQL, Python, Power BI and AI course pages.
- Suppresses long background/text color transitions on course shells and lesson surfaces, giving instantaneous CSS palette replacement on theme toggle. Interactive hover and drawer effects outside those scoped surfaces remain intact.
- Gives embedded capstone panels a matching semantic foreground and background, including headings, body text, and input controls.
- Restricts Course Mastery Checkpoint to a 760px content column and reduces outer spacing, nested card padding, answer spacing, meta margins, and feedback spacing while retaining 44px touch targets on mobile.
- Updates sync-regression asset-version allowlist for v60.

Validation: npm test, tests/course-mobile-v21.mjs, tests/course-density-v58.mjs passed. This does not substitute for live browser screenshots, contrast ratio evaluation, or touch testing.
