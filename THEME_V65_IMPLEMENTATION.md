# Universal Design System v65

## Files
- `assets/theme-foundation-v65.css`: final semantic tokens + global baseline; appended last in every HTML `<head>`.
- `assets/theme-bridge-v65.js`: listens for root `data-theme` changes; synchronizes accessible same-origin embedded documents; dispatches `dalp:themechange` for editor integrations.
- Existing `assets/theme-control-v14.js`: retains persisted local preference and the application's appearance toggle.

## Usage
- Prefer `var(--background)`, `var(--surface)`, `var(--surface-alt)`, `var(--text-main)`, `var(--text-muted)`, `var(--border-subtle)`, `var(--primary)`, `var(--on-primary)` in new components.
- Use `var(--editor-background)` and `var(--editor-text)` for custom code editors; use `var(--code-background)` and `var(--code-text)` for terminal/code blocks.
- Editors needing explicit runtime updates should subscribe to `window.addEventListener('dalp:themechange', (event) => { /* apply event.detail.theme */ })`.
- To change theme, set `document.documentElement.dataset.theme = 'dark'` or `'light'`, preferably using the pre-existing appearance control to retain storage synchronization.
- Do not force GPU layers onto all elements or virtualize tables automatically: profile first and virtualize only large tables.

## Verification
- `npm test` passed.
- `node tests/arena-scroll-and-theme-v54.mjs`, `node tests/course-layout-theme-v57.mjs`, `node tests/course-capstone-statements-v63.mjs`, and `node tests/course-capstone-root-v64.mjs` passed.
- Adjusted test asset version allowlist to include v61–65 (v62 already used by the original project).

## Important limits / follow-up QA
- This is a non-destructive compatibility layer: older legacy CSS files still include literal colors, and several components may remain visually inconsistent due to specific selectors or inline declarations. A full elimination of hardcoded values requires targeted component refactoring.
- WCAG AAA has **not** been verified for every text and icon combination. Perform automated contrast scanning plus manual keyboard and accessibility audits on rendered states before claiming AAA conformity.
- Cross-origin / sandboxed iframes and browser PDF previews cannot be force-styled by the parent due to browser security restrictions.
- Browser-based visual comparison, Lighthouse/scroll profiling, production deployment, and real-device GPU testing have not been performed.
