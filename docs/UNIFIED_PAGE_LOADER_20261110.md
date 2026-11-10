# Unified page loader and authenticated sidebar — implementation notes

- `assets/styles/page-loader.css`: one shared loader design; its CSS covers the entire viewport, supports reduced motion, and remains accessible on small screens.
- `assets/scripts/page-loader.js`: clears loader after DOM readiness on public routes (minimum visual period 460ms, public fallback 2800ms); on authenticated routes, waits for auth success or a blocked/error state before clearing. It never bypasses the secure check.
- `assets/scripts/auth-gate.js`: retains authentication checks and recoverable errors, but no longer injects a second spinner. During verification, the recovery gate is hidden while the branded loader is visible; `dalp:auth-gate-state` informs the loader about error/denied states.
- `assets/styles/access-guard.css`: private content stays fail-closed during validation and only the shared loading element is exempted; the old auth-spinner selectors and animations were removed.
- `assets/styles/private-premium-rebuild.css`: light hover now has dark ink for side links, icons, summaries, and profile footer card.
- Regression coverage: `tests/page-loader.mjs`, `tests/private-premium-rebuild.mjs`, `tests/sidebar-hover-contrast.mjs`.

> The auth error/access-denied screens are still available by design. They are account recovery and permission notices, **not** page loaders.
