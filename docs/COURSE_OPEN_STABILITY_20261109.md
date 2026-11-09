# Course opening and direct-link stability — 9 November 2026

## Fixed
- The original long-form course document no longer flashes before the week-by-week workspace initializes.
- Course opening retains its selected week or introduction lesson even when accessed through a `#week6` or `#lesson-6` link.
- Deep links are captured before the old sections are hidden, then restored using `history.replaceState` without a browser fragment jump to hidden content.
- Once the selected module is mounted, scroll is corrected to the visible workspace with room for the top navigation.
- A 4.5-second failsafe releases the initial page if a required course controller cannot load.

## Validation
- Confirm all six courses open from the weekly catalog and that the selected week remains in view.
- Verify direct links to Week 1, Week 6, Week 10, Intro Lesson 1 and Lesson 8 on mobile and desktop.
- Test the production Vercel site separately, including service-worker cache refresh.
