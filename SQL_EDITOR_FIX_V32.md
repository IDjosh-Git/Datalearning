# Practice Arena SQL editor — v32

This update fixes editor contrast, duplicated glyphs, typing responsiveness and soft-wrap alignment without replacing the exercise engine or changing its 95 challenges.

## Changes

- `assets/arena-upgrade.js`: highlights SQL by tokenising the raw query first (rather than replacing HTML entities); updates the display with `requestAnimationFrame` without mutating the textarea; keeps Ctrl/Cmd+Enter; does not intercept Space or Tab; sets all four input-assistant attributes and soft wrapping.
- `assets/sql-editor-accessibility-v32.css`: added at the end of `practice.html` to override older theme rules. Uses WCAG-friendly dark text and distinct keyword/string/number/comment colours in light mode, and readable light tokens in dark mode. Mirrors the textarea/pre fonts, padding, line-height and wrapping. On touch/phones the textarea is natively visible and the decorative token layer is hidden for reliable virtual-keyboard input. The line-number gutter is hidden on narrow views where wrapped rows would otherwise misalign.
- `assets/arena-stability.js`: no longer saves localStorage for every syntax-highlight DOM mutation; debounces edit metadata saves and observes actual feedback only.
- `assets/practice.js` and `assets/arena-ide.js`: turn off spellcheck/autocorrect/autocapitalize/autocomplete in the native SQL/Excel inputs.
- `practice.html`: loads the new CSS last and bumps changed JS cache tokens for deployment.

## Testing

Run `npm run test:arena:v31` from the `Datalearningpath` folder. This checks the unchanged 95 challenges, including 45 SQL and 50 Excel, and the deployment resources. Chromium browser checks were performed at 1200 px (light/dark), 820 px touch, 390 px touch and 320 px touch, verifying Space insertion, native input, XSS-safe highlighting, wrapping and input attributes. These tests are smoke checks, not a substitute for device-specific testing on deployed Android/iOS browsers. 

## Important implementation note

The syntax-highlight overlay is intentionally disabled on touch screens: native text remains visible to avoid predictive-keyboard and IME issues. SQL execution, grading, and editing are unchanged, but coloured tokens are desktop-only in this implementation. If coloured syntax is mandatory on touch screens, migrating to a mature editor such as CodeMirror 6 with its mobile composition handling is recommended.
