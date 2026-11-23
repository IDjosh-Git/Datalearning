# Release 14 — centrally published brand settings

## Required before use
1. Run `database/BRANDING_MIGRATION.sql` in the existing Supabase project SQL editor.
2. Set `SUPABASE_SERVICE_ROLE_KEY` in Vercel server environment variables. **Never expose it in frontend scripts.** `DALP_AUTH_URL` must point to the same Supabase project as existing authentication.
3. Deploy the release, sign in as a verified site administrator and use **Admin → Brand & Appearance**.
4. Test on separate browsers/devices and test logo/name/colour changes on public, learner and admin pages.

## Behaviour
- `GET /api/branding` reads the published record; fails closed with HTTP 503 if database is unavailable.
- `POST /api/branding` requires a valid first-party session, `site_admins` membership, and same-origin request. Changes persist centrally in Supabase.
- Logo supports PNG/JPEG/WebP under 140 KB and is stored as a data URL in the central record (not browser-local). For larger logos use a future dedicated storage bucket.
- All static HTML documents load the common CSS/JS. Generated public course pages receive the same assets during build.
- Open tabs refresh published branding every 30 seconds while visible, and on focus.
- Error/danger status red remains semantic. Some legacy decorative hardcoded CSS/SVG and server-rendered HTML strings may require further manual refactoring; this release does **not** guarantee every historical pixel and hardcoded string is replaced.

## Validation limits
Local build/tests do not validate the real Supabase migration, Vercel credentials, live sessions, or cross-device behaviour. Production activation requires the migration and deployment checks above.

## Compatibility note
The initial published defaults retain the project's existing Burnt Wood palette (midnight `#023048`, charcoal `#0B0909`, copper `#C58A69`, ivory `#F0EDDE`) to satisfy the existing source-wide palette audit. Administrators can publish different compliant hex colours through the panel after the backend is configured. The former burgundy decorative colour is replaced on shared branded components, while status/error red is retained. The earlier proposed teal/blue palette is not silently forced on the existing site.
