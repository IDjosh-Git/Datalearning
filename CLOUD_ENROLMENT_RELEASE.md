# Cloud-only course enrolment update

- Supabase Auth user metadata remains the canonical store for career goal and experience level. The browser does not store career preferences.
- New `course_enrollments` table stores explicitly started courses with user-scoped RLS.
- The nine Academy courses remain discoverable. Opening a course offers **Start studying this course**; only then is it shown under My Courses.
- My Learning now displays only enrolled course cards, and dashboard completion percentages are calculated across enrolled courses.
- Career recommendations do **not** automatically enrol a learner.
- Apply `migrations/20261121_course_enrollments.sql` before deploying the frontend.
- IMPORTANT: This release does not eliminate the existing platform-wide local progress caches in `progress-cloud.js`, practice storage, and Supabase Auth session storage. Removing those safely requires a separate end-to-end refactor and online-only policy. Course enrolments and career preferences introduced here are cloud-authoritative.
- Test with two real authenticated browsers before production deployment.
