# Datalearningpath v29 — Five-Track Course Experience

**Scope:** `courses/excel.html`, `courses/sql.html`, `courses/powerbi.html`, `courses/ai.html`, and `courses/introduction.html`. Builds on v28; no live Vercel deployment was made.

## Architectural decision

The site is a root-static, multi-page HTML application with Vercel serverless functions in `/api`. To preserve its routing, authentication, lesson tracking, quizzes, and offline behavior, the v29 redesign is a **scoped, additive HTML/CSS/JS layer**, not a migration to a new SPA/framework. Existing page IDs, weekly learning sections, Supabase scripts, JavaScript controllers, content and lesson-completion inputs remain untouched. No `dist` or `build` output directory is introduced, and `vercel.json` is unchanged.

## Changed files

| File | Change |
| --- | --- |
| `courses/excel.html` | New course compass, Excel milestones, outcomes, prerequisites, `SUMIFS` worked exercise, scoped asset references |
| `courses/sql.html` | SQL milestones, safe aggregated query example, join-grain validation checkpoint |
| `courses/powerbi.html` | Modeling/DAX milestones, filter-context example and validation exercise |
| `courses/ai.html` | Responsible-AI milestones, controlled prompt specification and verification checkpoint |
| `courses/introduction.html` | Beginner milestones, fictional transport spending example, plain-language checkpoint |
| `assets/course-polish-v29.css` | Light/dark palette, grid/nodes backdrop, course hero/card/roadmap styling, mobile touch sizing, focus, and reduced-motion rules |
| `assets/course-polish-v29.js` | Progressive enhancement of three WAI-ARIA-style tabs, roving tabindex, arrow key/Home/End handling; all panels readable without JS |
| `tests/course-redesign-v29.mjs` | New validation for five page references, milestones, ARIA tab keyboard behavior, CSS safeguards |
| `tests/sync-regression.mjs` | Accepts the new versioned assets (`20261023.29`) |
| `package.json` | Version 29.0.0, new `test:course-redesign:v29`, extended `verify:vercel` |

## Primary CSS tokens

```css
body.dlp-course-v29 {
  --dlp29-canvas: #f1f6fc;
  --dlp29-surface: #fff;
  --dlp29-ink: #172c44;
  --dlp29-muted: #425b75;
  --dlp29-line: #cbdbe9;
  --dlp29-primary: #1359a6;
  --dlp29-grid: rgba(28,90,156,.072);
}
html[data-theme="dark"] body.dlp-course-v29 {
  --dlp29-canvas: #0b1524;
  --dlp29-surface: #192b40;
  --dlp29-ink: #f0f6fe;
  --dlp29-muted: #c2d4e7;
  --dlp29-line: #405a74;
  --dlp29-primary: #a5d5ff;
  --dlp29-grid: rgba(148,197,255,.065);
}
```

All decorative patterns use CSS gradients; no external images or dependencies were added. Course reading panels use solid surfaces and inherited high-contrast foreground tokens. Interactive guide controls and primary course navigation receive 48px target constraints, and animations honor `prefers-reduced-motion`.

## Deploy to Vercel

1. Extract the full ZIP; use the contained `Datalearningpath/` directory as the Vercel project root (not the parent ZIP directory).
2. Keep Vercel Framework Preset **Other**, with root static file handling. Do not configure a `dist`/`build` output directory unless you separately introduce an actual build process.
3. Keep existing environment variables and Supabase configurations securely in Vercel project settings; do **not** commit secrets.
4. Inspect `vercel.json` for scoped HTML rewrites: `/courses/:course` → `/courses/:course.html`. Literal `courses/*.html` links remain valid. API paths retain Vercel function handling because no wildcard rewrites were added.
5. Run checks from the project root:

```bash
npm test
npm run test:responsive:v15
npm run test:course-mobile:v21
npm run test:course-navigation:v22
npm run test:theme:v16
npm run test:server-auth
npm run test:course-redesign:v29
npm run verify:vercel
```

6. Deploy a **preview** using your existing protected Git/Vercel workflow. Test URLs `/courses/excel.html`, `/courses/sql.html`, `/courses/powerbi.html`, `/courses/ai.html`, `/courses/introduction.html`, and the shorthand `/courses/excel` rewrite on the preview domain.
7. Verify both themes with authenticated learner and guest states; test at 320, 375, 768, 1024 and 1440 CSS px, plus 200% browser zoom; check for horizontal overflow, tap target dimensions, course completion and persistent progress, videos/interactive tools where actually present, network failure fallbacks, and ARIA tabs with keyboard and screen reader.
8. Only promote to production after preview/serverless/Supabase and manual browser audits pass.

## Validation evidence (local)

- `npm test`: **PASS** (core/auth/course/sync regression; a denial message emitted during a negative-role test is expected).
- `npm run test:responsive`, `test:responsive:v15`, `test:course-mobile:v21`, `test:course-navigation:v22`, `test:theme:v16`, `test:courses:v17`, `test:tools:v20`, `test:server-auth`: **PASS**.
- `npm run verify:vercel`: **PASS**. All 22 pages and 111 distinct referenced local assets were checked; no missing linked static files were detected.
- `npm run test:course-redesign:v29`: **PASS**. 5 course pages, 4 valid stage anchors each, 3-tab interactions and new assets verified.
- HTML parse/unique-ID checks on five course pages: **PASS**. CSS syntax parsed successfully.
- **Not verified:** Vercel cloud build/preview or live deployment, live Supabase auth and cross-device sync, real browser-rendered contrast and responsive layout, native screen-reader behavior. Chromium was available but did not return a usable rendered page under this environment; therefore no visual pass is claimed.

## Known follow-up

The pre-existing CSS/theme stack contains many historical stylesheets. v29 deliberately scopes overrides to `body.dlp-course-v29` and loads the new stylesheet *last* to reduce cross-page regressions. A future theme-layer consolidation can remove duplicate cascade rules after a rendered visual comparison. The new tabs present supplemental course guidance; they do not alter weekly quiz grading or the progress model. Existing course download links and third-party CDN runtime dependencies were preserved as found in v28.
