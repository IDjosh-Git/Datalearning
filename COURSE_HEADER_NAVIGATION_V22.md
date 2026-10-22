# Course header navigation: Version 22

## Audit finding
The learning platform has two navigation rows on Excel, SQL and Power BI: (1) the global workspace header and (2) a course-specific title/action bar. Both were sticky in Version 21, causing two stacked persistent rows during scrolling on phone screens. A second breakpoint mismatch displayed mobile bottom navigation up to 950px but reverted the course week selector to desktop mode above 760px.

## Changes
- Global workspace navigation remains sticky, including search, theme toggle, account and mobile navigation.
- Course-specific title/action bar scrolls with the content on screens up to 950px, instead of remaining sticky beneath the global workspace header. Desktop behavior above 950px is retained.
- Compact course week controls (Current week, Previous, Next and All weeks) now continue through the 950px tablet breakpoint. The ten-card week strip remains a desktop feature.
- Course header's Options actions remain available, in their existing overflow menu, while the course header is visible.
- Updated cache-key version for the modified compact course CSS and script and added a final dedicated navigation stylesheet to all five course pages.
- No learning, grading, progress, account or administrator access-control logic changed.

## Checks performed
- 18 isolated Chromium layout/scroll checks on widths 320, 390, 760, 768, 820, 950, 951, 1024 and 1440px, in light and dark mode: all passed after including the course's base box-sizing rules.
- Verified the global header remains sticky and the course title bar scrolls away at widths up to 950px; compact week selector is visible and the desktop week strip hidden in the same range; no overflow in the isolated scaffold.
- Static structural test checks that all 5 course pages include latest stylesheet and consistent asset versions.
- Existing app, responsive, admin, authentication, course content, mobile, and server-authorization Node regression tests: passed.

## Test limits
Browser QA used an isolated CSS/DOM scaffold, not live end-to-end authenticated course pages, because this runtime blocks page navigation to local files and local HTTP addresses. Live-device testing and signed-in scroll/menu interaction testing are recommended prior to deployment. This update has not been deployed.
