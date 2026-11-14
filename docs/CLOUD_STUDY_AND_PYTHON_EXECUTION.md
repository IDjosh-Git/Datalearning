# DataLearning — Cloud state and Python execution

## Implemented (11 November 2026)

- The existing Supabase `course_progress` and `mastery_results` tables remain the authoritative destinations for week completion and final assessment scores.
- Private `public.learner_workspace_state` stores small learner-specific editor drafts, worksheet cells, quiz drafts, bookmarks, practice notes, study plans, and preferences. Access is constrained by Supabase Auth and user-id Row Level Security. The migration is in `database/20261111_cloud_learner_workspace.sql` and was applied to the connected project.
- The client uses `persistSession: false`, meaning Supabase JS does not persist auth tokens in localStorage/IndexedDB.
- `assets/scripts/cloud-workspace.js` is a synchronous RAM-backed compatibility adapter; it asynchronously hydrates and saves to Supabase. The first authenticated visit attempts a one-time migration of legacy browser data, after which app keys are cleared from localStorage. Offline-only unsynced changes cannot be guaranteed to survive a closed tab.
- The hosting API `/api/auth/session` uses a first-party HttpOnly, SameSite=Lax, Secure cookie for access and refresh tokens. Sign-in must be served on a host where this server endpoint is deployed; a static `file://` copy cannot maintain cross-page accounts in this architecture.
- Legacy offline service worker caching was retired and app-owned caches are cleaned up.
- Each of 90 weekly lessons includes a lazy-loaded explanatory diagram. Excel Week 1 additionally has a detailed generated visual showing ribbon tabs, worksheet cells, the formula bar, and Excel-style workspace navigation. The diagrams are **educational interface illustrations**, not exact screenshots of licensed software.
- The Excel practice workbook remains editable and saves its values to the account workspace. The editor header shows only its selected icon; the worksheet expansion remains optional.

## Python execution: current boundary

Python remains a **browser Web Worker** running Pyodide for functional, isolated client execution. The worker is warmed on Python selection, reused between Run and Grade, and avoids loading optional packages for standard-library imports. These steps can reduce perceived waiting and redundant package downloads during a single session, but **they do not make Python server-side**. Initial downloads and memory use remain on the device.

**Do not execute learner Python directly in Supabase PostgreSQL, Supabase Edge Functions, or an unrestricted serverless process.** True cloud execution requires a dedicated sandbox runner (e.g., ephemeral containers/microVMs with isolated filesystem and no network by default), authentication, size/time/memory quotas, abusive-code protection, dependency controls, and a secure grading API. No such runner was provisioned or connected in this release. Until it is, the site should not advertise "cloud Python execution."

## Release and validation

- Requires redeploying the `api/auth/session.js` serverless endpoint and the project assets together. **This source update is not a live deployment.**
- If transferring to another Supabase project, apply `database/20261111_cloud_learner_workspace.sql` and configure the correct publishable Supabase URL/key.
- Network interruptions leave unsynced changes in RAM only, with visible warnings. Sign-in uses an essential first-party HttpOnly cookie; it is not possible to retain authenticated sessions across pages with literally zero browser-side session data.
- Browser engines may cache public static resources such as fonts or images outside the app's control. No DataLearning localStorage, sessionStorage, or IndexedDB persistence remains active after the legacy-data migration.
- All repository unit and static integrity tests, including cloud/media release guards, pass. End-to-end authenticated login against a deployed host and true remote Python execution have **not** been verified.
