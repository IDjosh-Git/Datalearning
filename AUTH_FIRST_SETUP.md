# Authentication-first release (October 2026)

## How the visitor experience works

1. The first visit to `/` or `index.html` checks the existing Supabase Auth session. No session means immediate navigation to `auth.html?return=...` (the learning dashboard cannot be seen while the check is pending).
2. On the sign-in screen, returning students sign in; first-time students choose **Create account**. The flow prompts new students to verify their email if Supabase requires confirmation. If confirmation is disabled, registration still signs them out so they deliberately sign in.
3. After sign-in, the student returns to the original intended page, or the dashboard when there is no deep link. Session persistence is managed by Supabase. Direct visits to any of the other 18 HTML routes are checked in the same way.
4. **Forgot password** sends a Supabase recovery link. The link returns to the same auth page with a reset-password form.
5. Sign-out removes the current device's cached course checkmarks, without deleting the learner's cloud data. Progress for a different account on the same browser is not migrated.

The visual approach follows familiar learning-site patterns: a simple **Sign in / Create account** decision, short forms, clear recovery, one focused action, and a mobile-first order that shows the form before the marketing story. The brand colors remain those of Data Analysis Learning Path.

## Production checklist (Vercel + the existing Supabase project)

- Deploy the **contents inside `Datalearningpath/`** as the site's root folder on HTTPS (not the outer ZIP directory).
- Supabase project **DataLearning** is already configured in `assets/supabase-config.js`. This file must contain a **publishable/anon** key only, never a service-role/secret key. Keep using the same Supabase project: it owns existing accounts, progress and certificates.
- In **Supabase → Authentication → URL Configuration**, set the production **Site URL** (e.g. `https://learning.example.com`) and add allowed Redirect URLs for your actual auth address, including callback query parameters for sign-up and password reset (for example `https://learning.example.com/auth.html**`, subject to Supabase's redirect glob syntax). Add trusted preview origins separately if needed. Do not permit arbitrary third-party redirects.
- In **Authentication → Providers → Email**, enable email/password signup. **Require email confirmation** for production. If using the hosted default email sender, ensure delivery limits and branding suit your enrolment traffic; for real users configure a verified SMTP sender.
- In **Authentication → Security**, turn on **Leaked Password Protection** where available; keep reasonable auth rate limits, CAPTCHA if under attack, and consider MFA for instructors.
- Password policy in the UI currently requires at least **8 characters**; ensure server-side policy is at least as strong. Supabase rejects weak logins or accounts according to its own rules.
- The **Google button is optional and hidden by default**. To enable, first configure Google Auth with client ID/secret and redirect URLs in Supabase. Then set `googleOAuthEnabled: true` in `assets/auth-options.js`, test the full round trip, and deploy.
- Database RLS is the security boundary for `course_progress`, `quiz_results`, `certificates`, `capstone_submissions` and `capstone_reviewers`. The connected project has RLS enabled on those tables. Validate production policies again after schema changes; don't weaken reviewer allowlisting.
- Run `npm test` and `npm run test:responsive`. Test production user flows with actual accounts: signup / email link / login / forgot password / reset / log out / expired session / direct course link / shared device / mobile browser.

## Important distinction: access screen versus protected static source

**This update is an application-level gate for a static HTML website.** JavaScript blocks and redirects unauthenticated readers and Supabase RLS protects the user-specific database rows. However, if someone requests a static `.html`, `.js`, `.css`, or downloadable lesson asset directly through an HTTP client without executing JavaScript, a conventional public static web host can still serve that file. The gate **does not make static course content confidential or prevent determined users from fetching source files**. If course content must actually be private, migrate it behind server-side authentication (Vercel middleware/server routes with secure HttpOnly cookies or another authenticated backend), protect download URLs too, and ensure the server refuses unauthenticated requests. Do not market this front-end gate as paywall/DRM or as server-side access control.

If sign-in is temporarily unavailable, protected pages stay covered and offer **Retry connection**, rather than showing the course to an unverified session.

## Project-specific security observations (no automatic changes made)

Read-only Supabase Security Advisor findings at implementation time reported **Leaked Password Protection disabled** and an **anonymous-executable `public.rls_auto_enable()` SECURITY DEFINER function**. These need an administrator's review before launch, especially the publicly executable privileged function. The `public.library_invites` table also has RLS enabled with no policies; whether that's intentional depends on its purpose. The app update does not alter these functions or policies.

Security Advisor documentation:
- https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
- https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable
- https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy

## Files changed

- `auth.html`: redesigned login-first, signup, recovery, responsive entry screen.
- `assets/auth-flow.js`, `assets/auth-first.css`, `assets/auth-options.js`: new auth UI modules.
- `assets/auth-gate.js`, `assets/auth-gate.css`: session check, redirect, loading/error state, sign-out control and device progress scoping.
- **18 HTML pages**: early auth guard in `<head>`; redundant Supabase SDK loads removed.
- `assets/progress-cloud.js`: legacy progress migration now runs once per account rather than forced on every login.
- `account.html`: logout clears cached progress and returns to sign-in.
- `tests/auth-first.mjs`, `tests/auth-gate-runtime.mjs`: auth coverage and mocked guard-flow tests. Existing tests updated for the modular auth implementation.
