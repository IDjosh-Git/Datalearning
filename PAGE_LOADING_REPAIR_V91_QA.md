# Data Learning Path v91 — Page Loading and Session Recovery

## Investigation

- Live Vercel production deployment checked on 31 October 2026: `datalearning.vercel.app`, deployment `dpl_6wpz7wvYWK3RDv1rjS6hWsaaBLRx`, project `datalearning`, Git commit `958be6254fea81cce7a05ecd9f6978480fad6746` (v90), deployment state `READY`.
- The public homepage and some course and tutor pages were retrievable through website inspection. `READY` is only a deployment status; it does not verify authenticated browser rendering.
- Vercel runtime errors query returned no grouped errors in the checked 30-minute window, and runtime log query returned no records. This does not rule out browser-side errors, HTTP 403 responses, network failures, or earlier incidents. Broader logs were unavailable within the Hobby retention window.
- The v90 learner authentication cover (`dalp-auth-checking`) hides page content until the Supabase session *and administrator-role lookup* complete. On v90, any role lookup failure causes a full-page error even for a regular course, Arena, or tutor page. Browser requests can stall indefinitely without a timeout.
- The sign-in code made successful establishment of an HttpOnly hosting cookie mandatory for **every** page, although ordinary learner routes are authenticated using the Supabase session. A temporary failure in `/api/auth/session` could therefore block even ordinary lesson navigation.
- v90's public service worker used stale-while-revalidate for JavaScript/CSS; cached assets could be served before an updated deployment's file, especially when URLs are reused. This is a possible version mismatch, not a confirmed root cause on a specific user's browser.
- Vercel middleware continues to protect instructor-only pages (`admin.html`, `progress.html`, `reviewer.html`, etc.). These legitimately require an administrator session and can show a sign-in or access error if permission is missing.

## Code changes

1. `assets/auth-gate.js`: bounded session and account verification, ten-second role lookup timeout; ordinary learner pages open after verified account authentication even if the optional admin-role lookup fails, without exposing admin controls. Instructor-only routes continue to fail closed. Added clear retry and return-to-sign-in actions for verification errors.
2. `assets/auth-flow.js`: keep requested return destination; a temporary hosting-cookie failure no longer blocks ordinary learner routes. Instructor-only routes continue to require a successful server session. Admin landing lookup is time-bounded.
3. `assets/auth-gate.css`: responsive, accessible recovery actions and focus rings.
4. New `service-worker-v24.js`: network-first current-version public HTML/JS/CSS and cached fallback if offline; private routes, APIs and authentication remain excluded. Old public cache is cleared on activation.
5. `assets/accessibility-v23.js`: registers the new worker; `vercel.json` adds no-store service-worker headers.
6. All 25 HTML pages: changed versions of modified gate, auth-flow and accessibility scripts to prevent old copies being reused.
7. `tests/page-load-recovery-v91.mjs`: verifies bounded guard, strict admin handling, recovery controls, worker strategy and script versions. `tests/auth-gate-runtime.mjs`: verifies verified learner fallback and administrator fail-closed behavior.

## Verification completed (local)

- `npm test` — passed (including browser-auth gate state simulations).
- `npm run test:server-auth` — passed (server cookie, protected pages, authorization).
- `npm run test:page-load:v91` — passed.
- `npm run test:navigation:v90` — passed: 25 routes, 708 authored links, 60 downloads, 203 fragments, no unresolved local targets.
- `npm run test:workspace`, `npm run test:arena:v85`, `npm run test:tutor:v87`, `npm run test:responsive`, `npm run verify:deployment`, `npm run test:colour:v89` — passed.
- Modified JavaScript and service worker syntax validated with Node.

## Remaining verification and operational actions

- This archive is **not deployed** to Vercel. The live production site is still v90 unless the owner deploys an update.
- No authenticated browser session, full network trace, exact failing URL list or mobile browser capture was available. Hence the exact cause of every reported failing page cannot be confirmed.
- Supabase JavaScript is still downloaded from jsDelivr CDN in this legacy architecture. If that CDN is unreachable, users cannot authenticate until it loads; a future resilience improvement is bundling the reviewed SDK with the application. The gate now provides a more actionable error when browser scripts reach it.
- The live AI API needs a valid server-side provider configuration. The private admin dashboard needs admin role membership; neither should be interpreted as a missing page when access is denied.
- Deployment checklist: deploy to a staging URL, verify homepage -> `/practice.html?tool=SQL` -> sign in -> Arena, direct refresh, browser Back, Tutor Studio, Excel course, account, and admin page under both learner and administrator roles. Check browser Network and Console panels and verify service worker v24 activates and old cache clears.

## Immediate troubleshooting for users of production v90

1. Open the exact failing page in a new private/incognito tab. If it displays an account prompt, sign in and retry.
2. On the normal browser, refresh the site without using an older open tab; if necessary, clear **only this site's** cached website files/service worker. This may sign out the user or remove locally stored progress, so back up unsynced work first.
3. Record the failing page URL, exact screen message (loading spinner / sign in / 403 / blank), device, and whether signed in. These details are needed to prove the root cause of each failing route.
