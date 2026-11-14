# DataLearning · Sign-in and Admin Performance Snapshot · 13 Nov 2026

## Sign-in page (`auth.html`)
- Kept the global Burnt Wood palette but moved the isolated `auth-entry-premium.css` stylesheet to the final stylesheet position. This prevents general-purpose primary-button rules from overriding the sign-in page.
- Changed its cache key to `20261113-auth-v4`.
- Updated the actual hero gradient to Charcoal → Midnight Blue → Burnt Red (red ends at 100%, rather than beyond the visible panel).
- Updated the sign-in tab, submit gradient, page canvas, warm form background, form-top accent, and focus treatments. Mobile rules and accessibility preferences remain.
- Preserved all login, registration, password visibility, and password-reset markup and scripts.

## Admin overview (`admin.html`)
- Added a specific `ac-performance-section` class to the Performance Snapshot section.
- Removed the section's backing background, border, shadow, backdrop filter, and pseudo-element overlays. Its four individual KPI cards retain their white surfaces, borders, and metric content.
- Bumped `admin-unified-premium.css` cache key to `20261113-snapshot-clean-v1`.

## Verification
- `npm test` passed.
- `npm run lint` passed.
- `tests/auth-admin-visual-fixes.mjs` added to the security suite.
- Browser-rendered computed styles confirmed the sign-in hero and submit gradients on 1440px and 390px preview widths. For the admin snapshot, the section and KPI grid computed backgrounds are transparent with no section border or shadow, while cards remain white and bordered. This preview did not use a live authenticated Supabase session.
- Source code changes are **not deployed**. Redeploy the complete project to update the live website. The updated cache keys prevent stale CSS once deployed.
