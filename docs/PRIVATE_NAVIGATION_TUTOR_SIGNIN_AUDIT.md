# Protected workspace, AI Tutor and sign-in audit

**Release:** 2026-11-01 — single private navigation, compact Tutor composer, refreshed sign-in

## Scope and implementation

This release updates the **seven role-gated pages**: `admin.html`, `progress.html`, `reviewer.html`, `account.html`, `certificate.html`, `connection-test.html`, and `sync-test.html`.

- Replaced the mismatched learner/public and utility headers with **one shared private navigation** implemented in `assets/scripts/private-navigation.js` and styled in `assets/styles/private-workspace.css`.
- The desktop sidebar becomes one off-canvas drawer at widths up to 1024px. Its toggle has an accessible name and `aria-expanded` state. Opening moves focus into the drawer; closing restores focus, supports Escape and backdrop clicks, and prevents keyboard focus from entering the closed mobile drawer.
- The sidebar's account, course and learner dashboard links are available to authenticated learners. **Academy and diagnostic links are hidden by default and revealed only when `DALP_ROLE === 'admin'`**, after role verification. Backend administrator authorization, Supabase RLS and middleware remain the final enforcement layer.
- `admin-console.js` remains an admin-protected asset but now handles only the existing learner-detail dialog. The reusable private-navigation module and stylesheet do not require administrator asset access. `admin-workspace.css` is a 136-byte compatibility import of the one maintained shared private workspace skin.
- Removed duplicate private-page navigation markup and page-wide Learning Coach scripts from all seven private pages. Public courses and the Tutor still retain the Learning Coach where previously available. Added a runtime guard against accidental coach initialization on private routes.
- Moved the learner account's duplicated administrator navigation links into the shared role-aware sidebar. Preserved the instructor-only notice, learner progress, certificates, account data and sign-out controls.
- Preserved direct links and anchor destinations, including `account.html#certificates`, `admin.html#admin-learners` and `admin.html#admin-courses`.

## AI Tutor

- Replaced the visible question-field decoration with an **inline scalable AI icon** while retaining a screen-reader label and `aria-label` on the actual textarea.
- Reduced the composer field to a single-row 42px text area inside a compact 62px composer. It can still be resized vertically for long questions, and sending/cancelling and keyboard behaviours remain unchanged.
- Kept controls touch-friendly and adjusted phone spacing without adding a new global stylesheet.

## Sign-in page

- Rebuilt the active sign-in palette around deep navy, indigo, violet and light neutral surfaces.
- Added a restrained background gradient, animated radial glow motifs, improved form borders and a gradient primary action. Animation is disabled under `prefers-reduced-motion: reduce`.
- Removed older cross-page CSS layers from `auth.css` (about 40 KB down to 18 KB); retained functional sign-in, sign-up, recovery and input styles. All signed-out public browsing routes remain public.

## Validation

- `npm run build` — PASS
- `npm run lint` — PASS
- `npm test` — PASS
- New `tests/private-navigation-tutor-signin.mjs` — PASS, including all seven private routes, one navigation initializer each, no coach on private pages, admin-only link gating, asset access separation, compact Tutor UI, gradients and reduced motion.
- CSS syntax parsing — PASS for auth, tutor and private workspace stylesheets.

**Unverified:** A full rendered browser review (including authenticated admin/learner mobile sessions) was not completed: Chromium timed out during local page preview. Production service/network performance, live progress data and individual role sessions were not measured. The regression suite validates the source and mocked authorization flows but not every live browser state.

**Deployment note:** The service-worker cache version was updated to `dalp-public-private-nav-tutor-v13`. Deploy the whole package, not just the HTML files, because all protected pages now depend on the new public-safe `private-navigation.js` and `private-workspace.css` assets.
