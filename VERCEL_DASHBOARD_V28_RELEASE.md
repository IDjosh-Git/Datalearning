# Datalearningpath v28 — Vercel-safe analytics dashboard refresh

**Baseline:** v27 ZIP (`Datalearningpath_Data_Atmosphere_v27.zip`)  
**Scope:** 22 static HTML routes, HTML/CSS/SVG presentation, Vercel route/header configuration and static-asset regression validation. No Supabase schema or API business logic changes.

## What changed

| File(s) | Change |
| --- | --- |
| `assets/dashboard-analytics-v28.css` | New final cascade layer for light/dark analytics gradients, decorative SVG network mask, dashboard cards, touch targets, tablet/mobile breakpoints and motion preferences. |
| `assets/data-network-v28.svg` | Tiny static SVG graph motif. Applied only as a CSS mask, with theme-selected tint; decorative and non-interactive. |
| `index.html`, `account.html`, `studio.html`, `practice.html` and 18 other root/course HTML pages | Added exactly one versioned `dashboard-analytics-v28.css` reference, placed after the v27 theme layer. Course pages use `../assets/...`; root pages use `assets/...`. |
| `assets/theme-control-v14.js` | Flag theme readiness after the first animation frames to suppress first-paint transition flash while preserving user-triggered theme transitions. Existing early `<head>` theme selection and storage logic are unchanged. |
| `vercel.json` | Added **scoped** `/dashboard`, `/studio`, `/practice`, `/courses/:course` aliases to existing `.html` files; excluded broad SPA fallback to avoid swallowing `/api/` routes. Added a no-cache, root-scope service-worker response header. Retained static root (`framework:null`, no `outputDirectory`, `cleanUrls:false`) and existing security/auth headers. |
| `tests/vercel-static-v28.mjs` and `package.json` | New `npm run verify:vercel` command: checks Vercel JSON, 22 HTML pages, 109 referenced local resources, stylesheet load order and SVG URL, and avoids destructive catch-all rewrites. |
| `tests/sync-regression.mjs` | Recognizes new cache-buster ID `20261023.28` while retaining existing checks. |

## Design tokens

The final versioned stylesheet is the source of truth for the following dashboard tokens:

| Token | Light | Dark |
| --- | --- | --- |
| `--bg-dashboard` | `#f1f6fc` | `#0b1422` |
| `--bg-card` | `#ffffff` | `#18283d` |
| `--grid-line` | `rgba(48,101,159,.073)` | `rgba(123,172,232,.071)` |
| `--accent-glow` | `rgba(48,121,215,.14)` | `rgba(47,143,235,.2)` |
| `--data-foreground` | `#162b43` | `#f3f8ff` |
| `--data-muted` | `#52667b` | `#bdcce0` |
| `--data-border` | `#d8e3ef` | `#3a516a` |
| `--data-primary` | `#1555a4` | `#8cc5ff` |

The old `modern.css`, `theme-unified-v10.css`, `design-system-v25.css` and `data-atmosphere-v27.css` continue to support legacy pages. To avoid brittle specificity changes, v28 overrides the actual dashboard classes (`.dl-home`, `.dl-resume`, `.dl-goals`, `.dl-track`, `.dl-tool`), not only the older hidden `.lp-*` sections. This lets the existing course, admin and auth views retain their functional styles.

## CSS architecture

- The page-level background is painted with CSS radial/linear gradients and a low-opacity 48px coordinate grid; it does not use an image request.
- The static `data-network-v28.svg` is referenced **relative to the CSS file**: `url("./data-network-v28.svg")`, correctly resolving as `/assets/data-network-v28.svg` on Vercel even if the HTML page is under `/courses/`.
- Color changes follow the existing `html[data-theme="dark"]` contract. The existing `<head>` initializer still selects the theme before page content renders.
- Course cards use natural heights, `min-width:0`, Grid/Flexbox, word wrapping and content-driven spacing. At ≤560px the active dashboard cards and study-tool links become one column.
- Hover elevation is limited to fine-pointer hover devices. `prefers-reduced-motion:reduce` disables drift/hover and theme transitions.
- The mask and grid never intercept clicks or focus; 48px actions and keyboard focus rings remain available.

## Build and routing contract

1. **Set the Vercel project Root Directory to the folder containing `index.html` and `vercel.json`** (`Datalearningpath/` if the repository has this wrapper). Do not choose `dist` or `build`; the project is not a React/Vite build.
2. Framework preset: **Other**, matching `"framework":null`. Leave Build Command and Output Directory empty unless the hosted project has intentionally different configuration.
3. Keep the project on Node.js 20+ for serverless functions (`@vercel/functions` and `@supabase/supabase-js` remain server dependencies; client scripts do not import native Node modules).
4. Existing routes `index.html`, `studio.html`, `practice.html`, `courses/excel.html`, etc. are stable; alias rewrites add optional clean URLs without touching `/api/tutor` or `/api/auth/session`.
5. Keep environment configuration in Vercel project settings, **not** the HTML/ZIP. Validate authenticated `/admin.html`, `/reviewer.html`, `/progress.html` access against the staging runtime.
6. Publish a **Vercel preview deployment** and check both the `.html` URLs and aliases, media types for CSS/SVG, edge middleware and service worker cache behavior. Do not promote without live checks.

### Commands

```sh
npm run verify:vercel
npm test
npm run test:responsive:v15
npm run test:course-mobile:v21
npm run test:theme:v16
npm run test:server-auth
```

The root has no new `build` step or client bundler. The package's `@vercel/functions` import stays confined to the server-side middleware and API.

## Local verification results

- **PASS:** New Vercel static-asset audit: 22 pages and 109 distinct linked local resources resolve; CSS-relative SVG resolves; no generic SPA fallback.
- **PASS:** Core regression, responsive v15, course mobile v21, theme v16 and server-auth/middleware tests.
- **PASS:** New CSS parses without errors; key contrast pairs (computed from CSS color tokens, not rendered browser capture): light primary text 14.38:1 and muted text 5.92:1 against white; dark primary 13.96:1 and muted 9.13:1 against dark card; resume CTA 9.01:1.
- **NOT VERIFIED:** Live `vercel build` or deployment (no matching Vercel project found via connected account), Vercel route responses, actual cross-device browser rendering, screen-reader behavior, production Supabase auth or offline/online integration. Local Chromium attempt timed out when navigating localhost; **not counted as a pass**.

**Recommendation:** Staging candidate, not production sign-off. Use Vercel preview to verify functional routes, mobile viewport visuals (320/375/768/1440), light/dark first paint and live sessions before release.
