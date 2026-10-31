# Practice Arena browser-access repair — v92

## Production context

- Production URL: `https://datalearning.vercel.app/practice.html`.
- Vercel API inspection on 31 October 2026 reported production READY at commit `958be6254fea81cce7a05ecd9f6978480fad6746` (Navigation Repair v90), **not this v92 source**.
- The web-fetch tool could not retrieve the practice URL; Chromium's attempt to navigate directly to both live and local server routes was blocked by the test environment (`ERR_BLOCKED_BY_ADMINISTRATOR`). Accordingly **live browser loading and authenticated refresh/back/forward could not be independently reproduced or verified**.
- The ready deployment status confirms Vercel has a build; it does not establish that the learner experience renders correctly.

## Specific, verifiable source defect

In the deployed v90 `assets/auth-gate.js`, the browser applies `dalp-auth-checking`, hiding protected content before scripts execute. It then awaits `getSession()`, `Promise.all([getUser(), site_admins query])`, and `DALP_SERVER_SESSION.establish(...)` before removing that class. These requests were unbounded. A stalled optional administrator lookup or hosting-cookie request could leave an otherwise verified learner on an indefinite loading cover. The Practice Arena HTML, challenge data, and route can all be present in this state. This is a **confirmed vulnerability in the loading path**, although there is insufficient production-browser evidence to attribute every user failure exclusively to it.

Version 91 added bounded calls but still waited for administrator lookup and cookie renewal before displaying the Arena. This update removes those unnecessary dependencies for verified learner pages.

## Small, targeted repairs

1. `assets/auth-gate.js`: Supabase session and user verification remain required. Normal learner pages can reveal content immediately after verification, while optional role lookup and hosting-cookie renewal continue without blocking. Administrator-only routes still fail closed and wait for verified permissions. Existing sign-in return URLs, including `?tool=...&challenge=...`, are preserved.
2. `assets/server-session.js`: Hosting-cookie creation now has a seven-second abortable timeout instead of a potentially stalled fetch.
3. `assets/auth-flow.js`: Learner sign-in no longer waits up to ten seconds for a separate hosting cookie before returning to the requested page. Admin-only destinations still require that cookie.
4. `practice.html`: If the authentication script itself never starts, a timed recovery screen offers Retry or sign-in with the original Arena location and query parameters. Protected Arena content remains hidden in this failure state.
5. `vercel.json`: Practice page responses are `private, no-store`, limiting stale HTML. Modified scripts have new cache-busting identifiers on all protected pages.
6. All underlying SQL, Excel, Python challenge datasets, evaluators, progress mechanisms, links, and content are unchanged.

## Tests executed

| Test | Result | Scope |
|---|---|---|
| Stalled administrator lookup and hosting cookie | PASS | Node VM reproduces unresolved promises; verified learner cover clears, administrator cover remains |
| Auth login deep-link return | PASS | Existing gate and navigation regression assertions |
| 149 bundled challenges | PASS | Arena regression; SQL 45, Excel 50, Python 54 |
| Isolated Chromium at 390px and 1440px | PASS | All three subject buttons selected appropriate challenge and populated editor; no page-script errors |
| Isolated Excel formula evaluation | PASS | Bundled evaluator returned a passing challenge check |
| Static routes and links | PASS | 25 routes, 708 authored links, no missing local destination |
| General app, tutor, responsive, static deployment regression | PASS | Node source and runtime tests |
| Live homepage-to-Arena click | NOT VERIFIED | Browser access to production origin blocked |
| Live direct `/practice.html` load | NOT VERIFIED | Browser access to production origin blocked |
| Live refresh and browser history | NOT VERIFIED | Browser access to production origin blocked |
| Authenticated live SQL/Excel/Python selector and execution | NOT VERIFIED | No browser login session / external SQLite or Pyodide download in isolated test |

## Deployment and acceptance

This package is source-only; **v92 is not deployed**. Deploy to a Vercel preview, sign in with a real learner account, test homepage and course Arena entry links, verify direct Arena URL and refresh, use browser Back/Forward, and check SQL/Excel/Python choices and execution. Only after those acceptance tests pass should the release be promoted to production. Check DevTools Network and Console for missing Supabase CDN/SDK, SQL.js, Pyodide, 401/403 session endpoints, and stale service-worker assets if failures continue. Do not delete site storage without backing up locally saved drafts and challenge progress.
