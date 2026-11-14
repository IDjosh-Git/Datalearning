# DataLearning — Unified Administration Release (12 November 2026)

## User-facing changes

- The administration sidebar and overview now point to one **Learners & Progress** view (`admin.html#admin-learners`) instead of separate Learner Management and Progress Reports links. The legacy `progress.html` route remains server-protected for bookmarked URLs; it is no longer advertised in navigation, search or administrator shortcuts.
- The retained view uses verified `public.learner_profiles` records as the directory of DataLearning users, with **Learner** and **Administrator** role badges, search, course filter, role filter, learning-status filter, pagination and CSV export.
- The directory shows courses started, distinct completed weeks out of 90, overall progress %, last activity and a **View details** action for each account. Details include course-specific progress, completed-week indicators, quiz attempts and average, capstone status and certificate status.
- **An administrator who studies is an engaged learner** for learning analytics. Course analytics count distinct account IDs with study events regardless of their role. Login alone does not count as learning engagement. Administrators retain their administrator role and privileges. Deduplicate repeated completion updates by `user_id`, course slug and week.
- Every private workspace sidebar now displays **Administrator account** or **Learner account** and the verified signed-in email directly above **Sign out**. The role comes from the verified gate (`site_admins`), not editable profile metadata.
- The admin interface and assessment desk use the scoped premium cleanup stylesheet. It removes oversized decorative hero underlays and full-width section border treatments, retains accessible content backgrounds and fixes the phone detail drawer's content-box overflow issue.

## Privacy and correctness

- No database changes were made for this release. The authoritative learner directory and role security remain in Supabase.
- Access remains verified by Vercel middleware and the client role gate, backed by `site_admins` and RLS. Both learner and administrator study events use their real account identifiers.
- Percentages in the directory are completed course weeks divided by 90 (9 paths × 10 weekly units), not a fake enrolment percentage. Course cards use the individual course's 10-week denominator.
- Historical totals use only recorded, readable data. Distinct study participation is not invented or conflated with signing in.

## Verification

- `npm test` passes all academy, security, Practice Arena, Tutor and cloud-media suites, including `tests/admin-unified-engagement.mjs`.
- Isolated Chromium checks at 320, 390, 768, and 1440px with simulated authenticated Supabase responses confirmed responsive table display with no page-level overflow and an administrator's Excel progress appearing in course engagement.
- A 390px per-account View details drawer was checked: nine collapsible course records with 90 week indicators, no off-screen clipping, and responsive content.
- This is a **source release only**, not a live deployment or end-to-end check against live authenticated records.
