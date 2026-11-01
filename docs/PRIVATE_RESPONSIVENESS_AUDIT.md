# Private workspace — responsive layout audit

**Baseline:** `Data_Analysis_Learning_Path_Private_Workspace_Cleaned.zip`  
**Scope:** `admin.html`, `progress.html`, `reviewer.html`, `account.html`, `certificate.html`, `connection-test.html`, `sync-test.html` (seven protected routes).  
**Design:** same light theme, indigo/slate accents, single role-aware private navigation; existing authorization rules unchanged.

## Findings and corrections

1. **Certificate layout overflow:** the certificate viewer used `width: 100%` plus inline padding without a matching border-box calculation. At a 320px viewport, its content wrapper extended to x=332px, outside the intended main area. The wrapper is now border-box sized and stays within the content frame. The wide certificate document still scrolls horizontally inside its own labelled, keyboard-focusable region, preserving its print geometry and download controls.
2. **Progress table clipped against the page gutter:** the progress table wrapper had `width:100%` and additional 12px side margins, spilling past the panel boundary. It now subtracts those margins from the available width, keeping the panel aligned while retaining horizontal data scrolling.
3. **Phone-width metric density:** at 320–350px, administrative KPI, progress and review stats now display one card per row, avoiding excessively narrow values and captions. Larger phones and tablets retain more compact grids.
4. **Scrollable data tables:** the administrator learner table and progress report table now have region labels and keyboard focus; the learner account's two tables already supported keyboard focus. Brief scroll guidance appears on narrow screens only. Data columns, exports and filters are unchanged.
5. **Learner account gutters:** on narrow phones, the course and progress content uses the workspace's available width with consistent card padding. Existing progress colours, controls and results remain intact.
6. **Private navigation:** verified single shared drawer/sidebar, keyboard dismissal with Escape, role-gated administrator sections, scrollable sidebar, and correct open/closed state. The navigation implementation is not duplicated.
7. **Offline styling:** incremented the public asset cache version to reduce stale CSS after a new deployment. Private data remains excluded from service-worker caching.

## Rendered viewport audit

Used headless Chromium with the seven page templates, their real CSS in load order, and the actual private-navigation script. For protected views, content was unhidden with *simulated* learner/administrator roles; **no real account or production database was accessed**.

| Viewport | Pages evaluated | Result |
| --- | ---: | --- |
| 320px narrow phone | 7 | No document-level horizontal overflow; drawer opens/closes |
| 360px phone | 7 | No document-level horizontal overflow; drawer opens/closes |
| 390px phone | 7 | No document-level horizontal overflow; drawer opens/closes |
| 430px large phone | 7 | No document-level horizontal overflow; drawer opens/closes |
| 768px tablet | 7 | No document-level horizontal overflow; drawer opens/closes |
| 1024px tablet | 7 | No document-level horizontal overflow; drawer opens/closes |
| 1280px desktop | 7 | No document-level horizontal overflow; fixed desktop sidebar |
| **Total** | **49 views** | **Passed viewport and navigation checks** |

**Intentional local scrolling:** multi-column tables and full-resolution certificates may exceed a small *container*; each scrolls inside a bounded, keyboard-focusable region. This is different from unwanted whole-page overflow.

## Automated checks

- `npm run build` — pass.
- `npm run lint` — pass.
- `npm test` — pass; includes `tests/private-responsive-audit.mjs` covering seven routes, navigation, scrollability and small-screen rules.
- No database writes, access-policy changes, or route removals.

## Verification limitations

The viewport preview uses static templates and simulated roles. Real learner names, returned reports, certificate rendering from production records, permissions against the live backend, device-specific font scaling, and all dynamic dialog/form/error states still need testing in an authenticated staging deployment. No claim of all possible phone models or browser engines is made.
