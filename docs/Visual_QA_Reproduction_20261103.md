# Browser visual QA reproduction

The external screenshot bundle includes the actual Chromium snapshots of 38 pages at 1440, 768 and 390 pixels; 21 representative pages at 320 pixels; and interactive private/public navigation captures. The full CSS and browser review is in `Modern_CSS_Browser_Review_20261103.md`.

To reproduce functional checks in the project root, run `npm run verify:deployment`.

To reproduce interactive visual checks on a local preview server with your authenticated accounts, launch the preview build and test each of the 38 routes, the mobile public navigation toggle, the private navigation and Sign out area, course exercises, modals, forms, and the full content/tables. The review environment could not exercise remote authentication or navigate an HTTP server due to policy restrictions.
