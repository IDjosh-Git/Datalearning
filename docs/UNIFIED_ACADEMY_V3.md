# DataLearning — unified academy release (10 November 2026)

## Scope
This release **extends** the seven-path curriculum rebuild with a unified interface for 19 former legacy pages: 11 public learner/tool screens and eight protected account/instructor/administrative screens.

Seven active paths: Data Analysis, Excel, SQL, Power BI, Tableau, Power Query and Introductory Statistics. The original Python and AI course assets and progress are preserved for returning learners.

### Features retained (not reimplemented)
- Supabase sign-in, registration, password recovery, profile records, cloud course progress, quiz saving and row-level access controls
- Capstone upload, secure evidence storage, instructor review, certificate issuance and verification
- Mastery Assessment, the weekly questions page, Learning Coach and personalised study features
- AI Tutor, floating AI's offline and signed-in provider modes, and the Practice Arena's SQL/Excel/Python engines
- Administrator oversight and access-controlled assessment workspaces

### Design changes
- New responsive public navigation with full-viewport mobile drawer, visible close control, keyboard focus management and Escape close
- The legacy public menu is retained in source for compatibility but visually suppressed to prevent double headers; the 7-course Academy routes keep their own contemporary header
- Unified Blueprint/Melon/Ivory palette, typography, surface elevations, consistent spacing and accessible focus styling
- Redesigned panels and layouts on sign-in, capstone, certificate, progress dashboard, profile, AI Tutor, Arena, Learning Coach, Practice Studio, reference and prompt libraries, instructor review and administration
- Protected role-aware navigation rebranded to Blueprint with full-screen phone drawer
- Learner account dashboard includes all seven current course cards; previous Python and AI paths remain in a separate legacy section. The summary meter now reflects 70 current weeks.
- Hard contrast fixes for dark Capstone, Learning Coach and admin heroes and for the Arena response surfaces.

### File paths
- `assets/styles/unified-academy-v3.css`: last-loaded shared legacy-page visual system.
- `assets/scripts/unified-academy-shell.js`: new public navigation behaviour, independent of Supabase or course controllers.
- `tests/unified-academy-v3.mjs`: verifies route coverage, preserved feature IDs and navigation integration.
- Seven-course Academy pages continue using `assets/styles/academy.css`, `academy-app.js`, and the Supabase progress bridge.

### Deploy
1. Replace project files in GitHub or Vercel with the `datalearning` folder's contents.
2. Keep existing Vercel server-side secrets and existing Supabase publishable client configuration. Never put service-role keys in public JavaScript.
3. No additional database migration is required **if your Supabase project already has the seven-path schema upgrade from the 10 November release**. If deploying to another project, apply the appropriate migrations and verify RLS first.
4. Test real signed-in actions and the reviewer workflow on Vercel before promoting the deployment.

### Validation boundaries
`npm run verify:deployment` exercises local source/build, Tutor, Practice Arena and auth/security regressions. Separate isolated Chromium checks inspected mobile/desktop styles and full-screen navigation, without hitting the live authenticated backend. They are not a full manual-device or accessibility certification.
