# DataLearning: count only actual app users

**Definition:** a user is a distinct, non-anonymous Supabase account with a verified DataLearning session, a completed sign-in through DataLearning, or recorded course/quiz/capstone activity. Accounts existing only in Auth or `learner_profiles` are not counted. Anonymous public visitors are *visitors*, not verified app learners.

- `database/migrations/app_usage_only_users.sql` creates an RLS-protected app usage record keyed by Auth UID, a verified-user usage RPC and privacy-suppressed unique learner summary. Do not delete existing Auth accounts.
- Shared Supabase client records actual authenticated visits (max once every five minutes per user per browser tab), and the sign-in flow records completed in-app sign-in. Unverified sign-ups are never recorded.
- Admin directory and learner totals only use verified app use or course activity, never every Auth profile. It degrades to course activity only if migration is absent.
- Public learning overview shows one distinct total across all courses, not a sum of per-course counts. It suppresses totals <5 and clearly labels missing migration status. Staff are not included in learner totals.
- Public course popularity remains based on actual recorded lesson/quiz/capstone activity and the existing privacy threshold.

## Activation
1. Review and apply `ADMIN_LEARNER_MIGRATION.sql` if not previously installed; then `app_usage_only_users.sql` on the correct Supabase project.
2. Deploy the full project to Vercel. Earlier sign-ins cannot be inferred solely from Auth accounts; historical learners with recorded learning activity count automatically.
3. Test with (a) an Auth account unused in DataLearning, (b) a verified new DataLearning sign-in, (c) a returning learner, (d) a learner studying two courses. Verify only the actual learner is counted once.
4. Do not use the `learner_profiles` row count as 'users' in external reporting.

No live database migration or Vercel production deployment was performed while preparing this source package.
