# Practice Studio v11 — course experience update

## What changed

- The previous **Interactive Course Studio · Offline** block is no longer inserted into the five full course pages. Their weekly/lesson navigation, original lesson content, datasets, quizzes and completion flags are unchanged.
- A separate `studio.html` offers guided self-assessed practice for Foundations, Excel, SQL, Power BI, and AI Integration, with a visible subject selector.
- One skill is shown at a time, with a searchable skill list, status filter, worked example, answer area, model explanation, and Previous/Next controls.
- Each course's learning workspace includes a prominent "Open Practice Studio" link. The learner dashboard features a dedicated Practice Studio section and a direct practice link on every course card. The global navigation includes **Practice Studio** and still allows opening the original **Practice Arena** through Quick Find.
- Responsive layout has desktop two-panel workspace and mobile horizontally navigable skill cards, with explicit dark and light theme tokens.
- Practice answers and completion flags are stored in local browser storage under a verified learner ID (`data-learning-studio-v3:<user id>`). Earlier shared-device records are not automatically assigned to a user. A user may explicitly import earlier practice from the same device **only if they are certain it is their own**. Previously stored data remain intact.
- Practice exercises are self-assessed and do not affect official course quiz scores, capstone eligibility, or certificates.

## Important offline limitation

The word "offline" on the former studio described exercises that run locally without an AI API, not an actual downloaded offline application. The new practice activities run locally after being loaded, and drafts are stored in the browser, but account sign-in, opening the site and loading resources may require internet access. This release **does not claim a fully offline PWA, course download capability, or cloud-synced exercise drafts**.

## Verification performed

- Existing application suite and new `tests/practice-studio-v11.mjs` passed.
- Isolated Chromium checks: 390, 768, 1440 and 2560 pixel viewports in light/dark themes; no horizontal overflow.
- In the isolated practice flow, typing a draft, marking complete, revealing the solution, and navigating to the next skill succeeded.
- Live sign-in, cross-device synchronization and production serving require a deployed-domain acceptance test. Existing secure admin middleware is preserved.

## Platform references used

- edX Course Homepage outline: https://support.edx.org/hc/en-us/articles/14942397728023-What-s-the-Course-Homepage
- Open edX course units and learner sidebar: https://docs.openedx.org/en/latest/educators/concepts/open_edx_platform/about_course_units.html
- Moodle mobile offline activities: https://warwick.ac.uk/services/digitallearning/support/student-guides/moodle/moodlemobileapp/

## Deployment

Replace the previous site package with this complete `Datalearningpath/` directory, keeping its folder structure. Publish `studio.html` together with `assets/course-studio.js`, `assets/course-studio-data.js`, `assets/practice-studio-v11.css`, and `assets/practice-studio-home-v11.css`. Check learner login, visit `studio.html?course=excel`, then check the course and dashboard shortcuts. No new database migration is required.
