# Website responsiveness and loading performance audit

**Baseline:** `Data_Analysis_Learning_Path_Legacy_Style_Fully_Audited.zip`  
**Scope:** all 38 HTML routes, shared navigation and learner tools, course pages, certificate/diagnostics, account reads, offline cache; 1 November 2026.

## Confirmed performance problems and corrections

| Issue identified from source | Correction | How it was checked |
|---|---|---|
| 72 synchronous external script references blocked HTML parsing, including the remote Supabase library | All 497 external script references now use `defer` (ordered) or another non-blocking loading strategy. Auth dependency order remains vendor → config → client → guard | Recounted all 38 HTML files and verified script order; performance regression test |
| Scroll toolbar read the document's full scroll height and wrote layout-affecting progress-bar width for *every* scroll event | Progress indicator now uses a compositor `transform: scaleX(...)` scheduled at most once per animation frame; page measurements are refreshed on resize/content growth | Verified scroll handler is passive, frame-coalesced, and no longer reads scrollHeight on each event |
| Long course pages enhanced all tables synchronously on first load | Existing tables stay readable immediately; nonessential caption/scroll-region enhancement happens in batches of at most five during idle time | Code checks and learning accessibility / tables regression suite |
| Decorative 650ms card reveal animation made cards appear to react slowly | Removed that animation and its observer, so cards appear without a reveal delay | Inspected JS and shared CSS, existing style tests |
| Network-first service worker held public responses while `cache.put()` wrote copies to storage | Respond immediately to network; write permitted public assets to Cache Storage using `event.waitUntil` | Static service-worker and security checks; cache exclusion for private routes retained |
| Global navigation and Learning Coach repositioned on every `resize` event | Reposition only on relevant breakpoint changes | Component event-listener checks |
| Account display waited for six-course sync before starting three independent SQL reads | Quiz, certificate and capstone read-only requests are now launched concurrently with progress sync; progress query still waits for migration to finish | Source regression and auth/progress tests |
| Global `scroll-behavior: smooth` could delay anchor navigation | Use instant CSS anchor positioning; explicit user-requested smooth scrolling remains where intentional | Current design system check |

## Before/after static counts

| Indicator | Baseline | Updated |
|---|---:|---:|
| HTML routes | 38 | 38 |
| External script references | 497 | 497 |
| HTML parsing-blocking external script references | **72** | **0** |
| Stylesheet references | 110 | 110 |
| Background cache writing delays public fetch return | Yes | No |
| Scroll progress reads `scrollHeight` on every scroll event | Yes | No |

These are **verified source-level changes**, not measured end-user latency or Core Web Vitals results. A faster page loading experience is expected, but an exact speedup cannot be inferred from script counts alone.

## Functional and security preservation

- Course structure, quizzes, certificates, video playback, resource links, learning progress and admin permissions remain in place.
- Deferred scripts preserve dependency execution order. A protected account and diagnostics route were adapted to wait for DOM readiness before database calls.
- The offline cache still fetches the current published assets first and never caches private API or authorized responses.
- No schema change, migration, production data write or permission change was made.

## Verification performed

- `npm run build`: passed
- `npm run lint`: passed
- `npm test`: full suite passed, including auth, admin role, progress migration, course content, learning tools, mobile/source checks
- `node tests/performance-readiness.mjs`: passed
- Parsed and syntax-checked 20 inline JavaScript snippets, plus the existing JavaScript syntax suite.
- Browser instrumentation was attempted on representative mobile, tablet and desktop routes, but Chromium returned `net::ERR_BLOCKED_BY_ADMINISTRATOR` for local HTTP URLs. Actual frame times, LCP, INP, field response time and production Supabase latency **were not measured**.

## Remaining work for a deployment benchmark

On a real preview deployment, run Lighthouse at 360px, 768px and 1280px and capture LCP, INP, CLS and Total Blocking Time, on both cold and repeat loads. Check homepage, catalogue, reference library, each course track, Practice Arena, signed-in learner account and authorized admin workspace. Use a representative throttled mobile connection to assess external font and Supabase download time. Query performance depends on live network, server and database indexing and was not benchmarked offline. If those remain slow, inspect Network requests and slow database query logs before changing SQL.
