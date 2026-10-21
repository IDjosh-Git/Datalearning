# Responsive Layout Remediation — October 2026

## Scope
All 19 HTML routes were updated to load `assets/responsive-v2.css` **after** their existing page styles and `assets/responsive-v2.js` for navigation behaviour. Page identifiers allow precise follow-up adjustments without disrupting course data, quizzes, progress records or server APIs. Existing themes, course colours and functionality were retained.

## Layout coverage
- 320px: compact phone (including older Android devices)
- 360–390px: standard Android and iPhone portrait
- 430px: large phone
- 600–768px: small tablet / landscape phone
- 900–1100px: tablet / compact laptop
- 1440px and above: desktop
- Height under 500px: landscape phones

## Changes
- Homepage: one-line swipeable section chips on phones, narrower heading scale, full-width CTAs, adaptive dashboard mockup, search/filter controls and course grids.
- Excel, SQL, Power BI: course toolbar in one row on phones, two-column metric grids where readable, compact side navigation drawer, adaptable quiz and lesson layouts, horizontal data-table scrolling.
- Introduction: swipeable course navigation, compact text and diagrams, single-column educational content, touch-friendly quizzes.
- AI course: compact hero, two-column module metrics, single-column lesson and lab panels, usable links and code-block scrolling.
- AI Tutor: conversation appears first on phones; topic suggestions remain available below, with stacked composer and appropriately sized chat buttons.
- Prompt library, reference library, Learning Lab, Practice Arena: responsive search, filter, result, code and exercise sections; deliberate overflow scrolling for datasets.
- Account, authentication, verification and sync utilities: mobile-friendly forms and data cards, full-width inputs, corrected auth hero text contrast.
- Capstone, instructor progress and reviewer: stacked workflows, adaptable KPI cards, reduced sidebars, scrollable evidence previews and tables.
- Consistent focus outlines, minimum interaction sizes and safe-area spacing for floating utilities and the learning coach; fixed-position items no longer occupy the same mobile position.
- Navigation: mobile menu dismisses with Escape, outside pointer click, or desktop resize; course nav closes after selecting a lesson.

## Validation performed
1. Static browser rendering inspected for each of the 19 routes at 320, 390, 768 and 1440 CSS pixels. Extra component checks at 1024px.
2. Live DOM component tests without remote network access: 40 Practice Arena challenges, 24 visible Prompt Library cards and 603 Reference Library cards rendered; document width stayed within viewport at 320/390/768px.
3. Mobile hamburger navigation tested opening and closing with Escape.
4. Existing `npm test` application regression checks passed, including course content, theme consistency, progress sync and instructor review.
5. Run `npm run test:responsive` to verify every page retains responsive CSS/JS inclusion.

## Notes and limits
- Code examples and large datasets intentionally scroll **inside their container**, rather than shrinking unreadably.
- External services such as cloud authentication, remote APIs and live learner records were not end-to-end tested in a deployed environment; they should be verified on the deployment domain.
- Actual iOS/Android hardware interaction and screen-reader testing remain advisable before publishing. The browser exercise here used a headless Chromium rendering environment.
