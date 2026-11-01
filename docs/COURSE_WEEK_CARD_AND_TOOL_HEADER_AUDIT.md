# Course Week Navigation, Card Padding, Tutor and Capstone Header Audit

## Scope

Source baseline: `Data_Analysis_Learning_Path_Catalog_Course_Header_Fix.zip`.

- Removed the arrow-based week-strip controls and their obsolete scroll listener from `assets/scripts/weekly-workspace.js`.
- Removed the additional Previous/Next buttons beside the **Jump to any week** selector in Excel, SQL, Power BI, Python and AI workspace templates. Removed the corresponding selector-row pair in Introduction.
- Removed compact mobile previous/next arrows in the week header, leaving its **All weeks** disclosure available.
- Retained the bottom Previous/Next lesson controls, accessible week dropdown, week chips, progress and completion controls.
- Replaced the desktop horizontal week strip with a five-column grid, three columns on tablets and two columns on narrow phones, with text wrapping and visible keyboard focus.
- Separated the **Course roadmap** heading from the week selector, with clear padding and section boundaries.
- Improved the inner padding of week resource, quiz, lesson and exercise cards without padding the outer lesson body that contains full-width title bands.
- Made the Tutor hero fill its intended content width and explicitly maintained indigo `#303561` with white text.
- Explicitly maintained the Capstone hero in dark muted plum `#3B365C` with white headings and readable light supporting text.
- Refreshed the public service-worker cache namespace to invalidate old CSS and JavaScript.

## Boundaries

The course-player nav, accessible dropdowns, lesson progress, quizzes, downloads, authorized account functions and bottom lesson navigation were retained. Light content cards below the dark banners were intentionally preserved.

## Verification

- Source integrity, JS syntax, build, lint and full automated regression tests
- Embedded-browser rendering at 360px, 768px and 1280px for 4 interactive week-grid tracks plus AI, Introduction, Tutor and Capstone
- Checked for lack of page-level horizontal overflow at each tested width, and counted 0 obsolete arrow controls
- Confirmed calculated hero background colours and full-width Tutor banner

**Limitations:** Production data, authenticated learner journeys, real network conditions and the deployed cache state were not exercised in these embedded previews. The AI track and Introduction use different lesson markup and did not expose the same dynamic 10-chip grid in the isolated preview; their page-level overflow and header/source checks were completed.
