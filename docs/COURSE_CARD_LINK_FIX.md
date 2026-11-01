# Course card link styling — November 1, 2026

## What was corrected

The homepage's course action links (including the dynamic **Review completed course** label) and **Open Practice Studio** links were still inheriting filled indigo button rules from older stylesheets. The learner resume action also carried a primary-button class.

- Removed course-card links from the legacy primary action selector groups in `home-refinements.css` and `design-system.css`.
- Changed the base `.lp-course-cta` rule in `home.css` to a plain underlined link, removed the Introduction/AI track background overrides and deleted the AI card pseudo-element overlay.
- Removed primary-button styling from the resume link in `index.html`; the `landing.js` and `learning-experience.js` state updates still change link text and destinations as before.
- Applied a localized light-theme link rule within the maintained `design-system.css` for course footer, resume, and pathfinder links, covering visited, hover, keyboard focus, and small-screen wrapping.
- Updated the service worker's cache namespace to invalidate old offline CSS when the new deployment activates.

No lesson, route, quiz, course or progress code was removed.

## Verification

- `npm run build` — passed
- `npm run lint` — passed
- `npm test` — passed, including the new `tests/course-card-plain-links.mjs` check
- Browser screenshot rendering was attempted but headless Chromium timed out; visual confirmation in a deployed browser is still required.
