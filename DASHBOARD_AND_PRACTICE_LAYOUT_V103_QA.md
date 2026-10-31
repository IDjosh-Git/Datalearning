# Dashboard and Practice Arena layout update v103

## Practice Arena mobile badges

All three technology badges now occupy three columns on mobile, including the 320px viewport. Their icon sits beside a wrapping label, and padding/font/icon sizing were tightened to shorten each badge card. Chromium measured badge card heights of **41px at 320px** and **32px at 360–600px**; the Practice Arena hero is **114px at 320px** and **105px at 360–600px**. Labels stay within the cards and remain visible. Desktop layout is unchanged.

The rendered test `python3 tests/practice-overflow-v100.py` now enforces one badge row, card heights at or below 46px, hero-height limits, containment, light/dark themes at 320/360/375/390px, and a 200%-text viewport check at 320px.

## Dashboard course-card links

Only the five **Open Practice Studio** links inside course cards were changed: they are underlined text links without a filled background, border, shadow, or button padding. Their existing destinations and visible wording remain. The separate Practice Studio promotional links and the Python **See practice lessons** CTA are unchanged. `python3 tests/dashboard-practice-links-v103.py` verifies both themes, all five links, and the preserved destinations/other links. A local 390px screenshot was visually checked.

## Asset freshness and Vercel

The premium design stylesheet query is bumped to `v=103` on all 26 HTML pages; the Practice Arena stylesheet query is `v=103`. This requests fresh CSS after deployment but does not itself deploy the project. Vercel production status remains unverified because the owning team has not yet authorized this connection for read-only project/deployment inspection. No deployment was triggered.

## Verification

The targeted practice and dashboard Chromium tests pass. The shared responsive, design, visual, contrast, app, navigation, and static deployment suites were rerun for this update; see the accompanying delivery summary for exact results. Live production, device testing, and authenticated routes remain unverified.
