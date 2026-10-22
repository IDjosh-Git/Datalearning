# Mobile Experience 13.0 — Responsive Release Notes

## Design principles

The compact UI prioritises visible learning progress, the next lesson, direct access to practice, and a consistent navigation structure. Visual patterns are informed by accessible responsive-navigation guidance and published learning-app mobile design discussions; no third-party logo, brand, or external design assets have been copied into the application.

## Implemented changes

- Added one final, shared responsive layer to **all 22 HTML routes**, loaded after their older styles.
- On phone-sized windows (up to 760px), learners now have fixed safe-area-aware tabs for Home, Courses, Practice, Tutor and More. More opens the existing full destination list. The original course navigation and keyboard search still work.
- Admin pages get a consistent compact Overview, Learners, Progress, Reviews and More bar. The existing protected admin menu, grading functions, and permissions remain intact.
- Course week selector, next/previous buttons, week chips, downloads, teaching stages, assignment and grading surfaces now reflow consistently. Course reset and print actions are behind a compact-screen Options button; they remain directly available on larger screens.
- Practice Studio keeps the current exercise before the skill catalogue on compact screens, with touch-sized actions and a more consistent layout.
- Sign-in has a compact mobile form with readable inputs and an explicit dark-mode color scheme.
- Tutor, learner homepage, forms, tables, capstone, certificate viewer, public verification, prompts, practice arena, and learning lab have additional page-specific mobile corrections.
- Improved safe-area spacing for gesture navigation, keyboard focus visibility, text wrapping, overflow containers, and wide-screen layout utilization.
- Corrected an inaccurate Practice Arena statement that implied account sign-in was not required.

## Testing performed

- All available automated application regression tests passed (including authentication, admin roles, course content, cloud progress sync, certificate issuance/verification, the practice studio, server-side admin middleware, and light/dark theme coverage).
- Added `tests/mobile-v13.mjs` confirming coverage and structure for 22 HTML pages, learner/admin navigation, accessible focus/touch surfaces and compact-width adaptations.
- Interactive compact navigation checks performed in an isolated Chromium page at 320, 390, 768 and 1024px. Learner/admin tab visibility, More menu opening/closing, keyboard Escape, Quick Find opening/closing, and document horizontal overflow passed in those **isolated navigation tests**.
- CSS parsed with zero syntax errors; the text contrast of the new mobile tab labels against their background colors meets WCAG AA normal-text contrast numerically in both themes.

## Remaining deployment QA

This release is not yet live. Complete hands-on browser/physical-device verification with real signed-in learner and administrator sessions, particularly on 320/360/390/430px phones, 768/820/1024px tablets and 1280/1440/1920/2560px desktops. Check both light/dark themes, landscape orientation, the on-screen keyboard, direct links to lessons, real form submissions, capstone uploads, and the printable certificate. Live account access and performance results were not measured in this release.

The existing hosting deployment and database configuration have not been modified by this package.
