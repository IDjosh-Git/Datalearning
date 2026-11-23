# Release 21 — Navigation Visual Consistency

## Root cause
The public Academy header used a legacy white surface with burnt-wood text tokens, while later palette rules applied dark backgrounds and white text selectively. The authenticated learner workspace uses a separate `.ac-topbar` header, which also had its own visual styling. This created inconsistent background, label, control, dropdown, and mobile-menu contrast across routes.

## Changes
- Added `assets/styles/release-21-navigation-unified.css` as the dedicated navigation visual contract.
- Added its rules at the end of `premium-color-system.css` to respect the existing final-stylesheet contract and guarantee cascade precedence.
- Loaded the dedicated stylesheet ahead of the shared palette on top-level pages.
- Unified the public `.dlu-header` and authenticated `.ac-topbar` using `--dl-brand-secondary` with white text.
- Ensured dropdowns remain white with dark text, mobile drawer has readable controls, and My Learning tabs have consistent selected-state contrast.
- Preserved central branding variables, responsive breakpoints, and existing navigation behaviour.

## Verification
`npm run verify:deployment` passed (build, lint and automated tests).

## Scope and limitations
The public header and private workspace header are still structurally distinct for authentication and role-aware functionality. Their visual contract is unified. Browser screenshots across signed-in and signed-out routes are required to validate final rendered behaviour; automated tests alone do not prove pixel-perfect consistency. Not deployed.
