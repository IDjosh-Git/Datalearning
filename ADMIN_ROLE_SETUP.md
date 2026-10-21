# Data Analysis Learning Path — Administrator / Learner Release

## Status (October 21, 2026)

The migration `learner_profile_and_admin_roles_20261021` was **applied to the existing Supabase DataLearning project** (`hotysnqorkqbiconjskl`). It was verified with 7 authentication accounts, 7 learner profile rows, one admin (promoted from the existing sole trusted reviewer), and zero orphaned profiles. Existing learning records were preserved. **Do not rerun old database setup SQL files over an existing project without reviewing them.** The migration is retained as `ADMIN_LEARNER_MIGRATION.sql` for disaster recovery / new environments.

### Role model

| Capability | Learner | Administrator |
|---|---|---|
| Sign in, profile, courses, tutor, quiz, practice, personal certificates | yes | yes |
| Read/update own course progress | yes | yes |
| Read the learner directory and all course/quiz/certificate records | no | yes |
| Instructor progress and capstone review | no | yes |
| `admin.html`, `progress.html`, `reviewer.html`, internal tests | no | yes |

Administrator designation lives in `public.site_admins`. It is NOT derived from editable email, user metadata, local storage or an HTML button. Existing `capstone_reviewers` continue to enforce the instructor-only assessment functions, so a new admin must be added to **both** tables by a trusted database owner. Never grant UPDATE/INSERT/DELETE on site_admins to the signed-in browser client.

### New account storage

- Every authenticated user is given a unique `public.learner_profiles` row automatically by an `auth.users` insert/update trigger.
- `learner_profiles.user_id` is the primary key and a foreign key to the Auth user. A deleted account cascades to the matching profile.
- Progress, quizzes, certificates and capstone submissions are stored as individual per-user records in the existing relational tables (`user_id` foreign key), NOT in a distinct physical table for each person.
- RLS makes a learner's own data visible only to that learner. Administrators receive a read-only overview across learners, without gaining the ability to overwrite their grades or learning records through the normal data API.
- The existing admin is also backed by an Auth profile. The admin directory excludes the logged-in admin's own account from the learner list.

### How to add or remove an admin

In **Supabase Dashboard > Authentication > Users**, obtain the verified account UUID. An administrator who also grades capstones needs both grants:

```sql
INSERT INTO public.site_admins(user_id)
VALUES ('REPLACE-WITH-EXISTING-AUTH-USER-UUID'::uuid)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.capstone_reviewers(user_id)
VALUES ('REPLACE-WITH-EXISTING-AUTH-USER-UUID'::uuid)
ON CONFLICT (user_id) DO NOTHING;
```

To revoke: delete from both allowlists. A logged-in user's next page access check will reject a revoked role. For immediate revocation of an already open session, revoke that user's sessions or have them sign out. Never set roles from signup fields or `user_metadata`.

### Deployment

1. Publish the **entire ZIP contents** (`Datalearningpath/`) to your host, preserving the existing relative folder structure. Root `index.html` remains the entry point and redirects signed-out visitors to `auth.html`. New `admin.html` is protected by the same login check and an additional admin lookup.
2. Supabase configuration already points to the live DataLearning project and uses a public, browser-safe publishable key. **Do not put a service-role key in HTML.**
3. Confirm your project's **Authentication > URL Configuration** lists the live website origin and reset-password redirect URL. Check verification email delivery.
4. Sign in with the existing trusted owner/reviewer account. Open **Admin dashboard** from the header, or `admin.html`. Search the six existing non-admin learner profiles.
5. Sign in with a regular student account; verify they can reach lessons but receive an access-denied screen for `admin.html`, `reviewer.html`, and `progress.html`.
6. Register a test learner, verify their email, sign in, and confirm their row in `learner_profiles` and lesson rows in `course_progress`.
7. Use a second test learner; confirm they cannot read or overwrite the first learner's data via Supabase's browser API.
8. Test password reset, logout, reopening the page with an active session, mobile navigation, instructor grading and certificate verification after deploying.

### Security and operational limits

- **Static files:** This static HTML release uses client-side page access controls. Sensitive learner data is protected by Supabase RLS, but the **HTML, JS and course source files themselves can still be downloaded directly from hosting**. Real server-side course-content access control requires protected API endpoints, server-side cookies or edge middleware in a different hosting architecture. Do not publish secret course content or user data in static HTML.
- **Database functions:** An earlier security advisor report identified a public-executable `rls_auto_enable()` event trigger and some library-related privileged functions. These existing non-LMS functions have **not** been modified as part of this release. Review their intended access in the security advisor before allowing public users. Leaked-password protection was also reported as disabled.
- **Tests:** `npm test` and `npm run test:responsive` run static and simulated-session regression checks. Production sign-in and real-device browser testing are not yet verified. Automated browser navigation to the local preview site was blocked by the runtime environment.
- **Capacity:** The admin directory paginates Supabase queries in batches of 500 (up to 10,000 rows); above that scale, replace in-browser aggregation with server-side paginated reporting.
- **Sign-out / multi-user device:** Course cache is cleared on account switch to avoid importing one learner's checkmarks into another account. Learning data in the cloud remains intact.
