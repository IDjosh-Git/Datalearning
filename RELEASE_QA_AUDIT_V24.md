# Datalearningpath — release QA audit (2026-10-23)

**Verdict: NOT APPROVED for final production sign-off.** This is a source-level and automated-regression audit of the supplied v23 ZIP, not a successful live staging evaluation. The supplied project had no usable deployed staging URL, Supabase live credentials, service-role credentials, or production test accounts. A Chromium browser is installed, but its navigation to both local HTTP and `file://` origins was blocked with `net::ERR_BLOCKED_BY_ADMINISTRATOR`; therefore browser-rendered and manual accessibility checks could not be completed.

## Evidence and status

| Requirement | Observed evidence | Status |
|---|---|---|
| Core regression tests | `npm test` completed, including smoke, tutor mocks, progress regression, courses, auth and admin role fixtures | PASS (mock/static only) |
| Static accessibility integration | `node tests/accessibility-v23.mjs`: reports 22-page shared asset coverage, skip navigation, focus baseline, caching exclusions | PASS (static only) |
| Browser A11Y on index, practice, studios, courses, admin, login | 14 sampled views × 3 viewport widths attempted via Playwright Chromium. Each `goto` was blocked by browser administration policy, before inspecting the DOM. | BLOCKED |
| Keyboard and screen-reader evaluation | No interactive DOM traversal or NVDA/VoiceOver session feasible in this environment | NOT TESTED |
| WCAG AA visual contrast, theme states, zoom and focus | No computed-color or visual contrast results captured | NOT TESTED |
| Server auth logic | `npm run test:server-auth`: expiry, session cookies, authorization separation, CSRF and route middleware mocked assertions passed | PASS (fixture only) |
| Live Supabase registration/login/refresh/concurrency/RLS | No configured staging system or credentials supplied. SQL migrations **not executed**. | BLOCKED |
| API tutor error handling | Existing smoke/modern tests exercise method restrictions, config failure, origin check, validation and mocked successful responses | PASS (mock only) |
| Live tutor latency/load, progress and account updates | No staging endpoint, accounts or real provider API key | BLOCKED |
| Responsive static assertions | `npm run test:responsive:v15` and `npm run test:course-navigation:v22` passed | PASS (static only) |
| Actual 360/768/1440 pixel DOM overflow, hit targets | Playwright navigation blocked; no measurements obtained | BLOCKED |
| Offline cached lessons and progress reconnection | Static worker exclusions passed. No real HTTP(S) worker network/offline browser simulation could be run. | BLOCKED |
| Zero learner-progress data loss across two devices | No transactional/conflict-resolution load testing. Best-effort localStorage queue cannot establish guaranteed zero data loss | NOT PROVEN |

## Verified code defect corrected in this QA package

**SW-001 — wrong worker URL for nested course pages (fixed):** In `assets/accessibility-v23.js`, service worker registration used `new URL('service-worker-v23.js', document.baseURI)` and scope `new URL('./', document.baseURI)`. From `/courses/excel.html` this resolves `/courses/service-worker-v23.js` (file does not exist) with a `/courses/` scope. Registration now derives the worker URL and scope from the `assets/accessibility-v23.js` script URL, consistently yielding `/service-worker-v23.js` and root scope on a conventional root deployment. `node tests/accessibility-v23.mjs` continues to pass after this fix. **Live registration remains unverified.**

## Remaining risks and recommended fixes

1. **A11Y-001 (release blocker):** Perform automated axe-core scans on 22 routes with authenticated learner and administrator personas in light/dark modes; record critical/serious/moderate violations. Conduct keyboard-only traversal for menus, dialogs, form errors, quizzes and practice studios. Evaluate focus management and screen-reader announcements with NVDA/Chrome and VoiceOver/Safari. Measure WCAG AA text contrast at 4.5:1 (normal) and 3:1 (large) and component contrast 3:1; assess reflow at 320px, 200% and 400% zoom. A 48px target guarantee is **not established** by shared CSS alone.
2. **AUTH-001 (release blocker):** Run staging Supabase E2E: signup, email verification, invalid/password-reset flows, persistence and refresh, token expiry, concurrent sessions, logout/all-device invalidation expectations, anonymous-to-authenticated progress ownership, Admin-vs-Learner RLS (direct database query attempts), and database migration rollback. Never embed service role keys in browser tests.
3. **API-001 (release blocker):** Exercise deployed `/api/tutor`, `/api/auth/session`, and all Supabase progress/user writes with valid/malformed/large payloads, upstream 429/500/timeouts, aborts, revocation, race conditions, and CORS/CSRF scenarios. Capture p50/p95/p99 latency and error rate from staging traffic; agree on performance SLOs before accepting.
4. **SYNC-001 (release blocker):** Worker only caches previously visited public resources, not private or all course content. Confirm real offline navigation and cache eviction behavior. Simulate no network before/during/after lesson saves, refresh/close/reopen, duplicate retries, device A and device B updating the same unit, failing quota/localStorage, and logout/account switch. Inspect `assets/progress-cloud.js` for last-write-wins and pending-queue race safety and implement durable, conflict-aware storage/retries if **zero data loss** is contractually required. A localStorage write failure is currently swallowed and a pending queue is best-effort, not durable by definition.
5. **RELIABILITY-001:** Add observable monitoring and user-visible fallback states for all network routes. Include synthetic alarms for API failures, auth provider interruptions, and failed cloud progress writes.

## Verification commands

```sh
npm test
node tests/accessibility-v23.mjs
npm run test:server-auth
npm run test:responsive:v15
npm run test:course-navigation:v22
```

All five commands above were executed successfully in this session. Browser test attempts and their blocking errors are captured in `qa-evidence/browser-results.json`. The original `tests/accessibility-v23.mjs` is a source-level checker, **not** an axe-core audit.

## Deployment instructions

Use this updated source in staging only until release blockers are cleared. Install dependencies in the target runtime, deploy via the existing build/deployment pipeline, configure Supabase with dedicated staging credentials, and run the E2E matrix above. Complete a sign-off record with device/browser versions, timestamps, screenshots, network logs, detailed test cases, defects and retest results. Do not run migration SQL against production without staging verification and backup/rollback procedures.

**Sign-off owner status:** Pending; no production approval is claimed.
