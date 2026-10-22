# Data Learning Path v21 — Mobile Course Navigation & Layout

## Problem and design direction
Four 10-week courses previously showed a week dropdown, Previous/Next buttons **and** an entire horizontally scrolling row of ten week cards on narrow devices. This occupied several rows and duplicated navigation. The Excel/SQL/Power BI course headers also offered a wide text-based Options button beside the course title. The Introduction course displayed a duplicate horizontal lesson list despite already providing a lesson dropdown.

Following established Android adaptive-navigation guidance (secondary navigation, contextual overflow actions), mobile courses now emphasize the active lesson and a focused content flow rather than multiple simultaneous navigators. Reference: https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns. Coursera mobile redesign case study: https://kstine.com/project/coursera-mobile.

## Changes
- Four 10-week courses: compact, theme-aware current-week card, visible numbered progress bar, Previous/Next chevrons, and expandable **All weeks** dropdown. Eliminates the mobile horizontal week-card strip while preserving it on desktop, including deep links and completion indicators.
- The existing week-selection `<select>` remains the authoritative control: selecting a week updates the breadcrumb, content, completion status, hash, and progress state as before.
- Excel/SQL/Power BI: desktop header actions unchanged; compact screens use a 40px ellipsis button with a small popover for Print / Save PDF and Reset Progress. Outside click, focus away, and Escape dismiss the menu; the existing button handlers remain intact.
- Introduction course: hide its redundant horizontal lesson sidebar on mobile while preserving its accessible lesson chooser and Next/Previous controls.
- Reduced excess course header, overview, and practice-promo spacing; preserved access to Mastery checkpoint and Course guide; AI tutor is still in the main mobile navigation.
- Unified the previously dark-on-dark Introduction workflow headings under the active course theme tokens.
- Added `assets/course-mobile-v21.css` and `assets/course-mobile-v21.js` to the five course pages only, after legacy styles; other 17 pages are unchanged.
- Did **not** alter grading, progress storage, LMS authentication, administrator permissions, learning content, or certificates.

## Verification completed
- 40 browser viewport cases (5 courses × 2 themes × 4 widths: 320, 390, 768, 1440) passed with zero page-wide horizontal overflow and zero JavaScript exceptions in isolated visual testing.
- Interactions checked in the isolated renderer: All weeks opens, selecting Week 3 updates course state, Next moves to Week 4, Introduction lessons change, and the compact options menu opens and dismisses.
- Regression suite passed: core tests, responsive, workspace, administrator, server authorization, week-navigation, course assessments, v20 tools, and v21 source-contract tests.
- Visual QA uses an isolated Chromium renderer with local assets and non-networked course layout logic. **It is not an authenticated live-site test.** Cross-browser physical-device verification and actual production deployment are still required.
- Deployment: replace the entire prior release, avoid mixing assets from versions. New CSS/JS references are versioned `20261022.21` for cache freshness.
