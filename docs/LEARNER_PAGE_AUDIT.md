# Learner account page audit — November 1, 2026

## Scope

Updated `account.html` and consolidated account styles into **`assets/styles/account.css`**. Deleted the old `account-foundation.css` and `account-layout.css` (neither was referenced from another page). Removed both embedded `<style>` blocks and the old gradient/overlay layers. Shared site styles remain in `design-system.css`.

## Presentation and information architecture

- One dark, flat account overview with high-contrast heading, signed-in identity and plain Practice Studio link. No redundant second logo or dashboard link.
- Six accessible progress cards with category colour accents and **separate, underlined course links** rather than clickable card overlays. Removed the duplicate Continue Learning links panel.
- Real action buttons remain buttons (Sign out). The instructor-only workspace retains its permission gate and plain admin links.
- Quiz and certificate tables are horizontally scrollable within their own labeled regions on narrow screens.
- Added progressbar roles and synchronised `aria-valuenow` and `aria-valuetext` with the database-derived completion data.
- Formatted all existing reports and learner features without modifying Supabase queries, RLS or sign-in redirects.

## Maintained styles

Use `assets/styles/account.css` for account-specific selectors scoped to `body.dalp-account-page`. Avoid reintroducing superseded account stylesheets or decorative overlays. Design tokens and public navigation remain in `design-system.css`.

## Verification

Run `npm run build`, `npm run lint`, `npm test` and `node tests/learner-account-theme.mjs`. Browser-based authenticated visual review and real-data/RLS verification remain necessary before production sign-off.
