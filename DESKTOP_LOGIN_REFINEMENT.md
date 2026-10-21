# Desktop and sign-in layout refinement

- Responsive authentication shell expands to 1550px for Windows desktops; sign-in form width remains readable.
- Dashboard containers scale with monitor width to reduce excessive side gutters.
- Tablet/mobile use single-column, sign-in-first authentication layout.
- Learners and admins use identical Supabase email/password authentication.
- Authorized admins without an explicit deep link enter `admin.html`; links requested before login retain priority.
- `site_admins` is read through RLS; admin self-registration is not permitted.

For production, deploy the new ZIP and verify sign-in with an actual admin account. Site contents remain static and require server-side middleware to protect direct file downloads.
