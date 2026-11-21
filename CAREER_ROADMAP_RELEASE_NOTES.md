# DataLearning career pathway integration (2026-11-21)

## Implemented
- First-time registration redirects to `career-setup.html` after a confirmed session, unless an explicit deep link or administrator destination takes precedence.
- Career setup offers four career tracks plus “Exploring Data Careers”, and an experience level.
- Choices are saved in the authenticated user’s Supabase Auth `user_metadata` using `auth.updateUser`, with no new database migration.
- My Learning renders the recommended sequence from the existing nine guided courses and links directly to them; electives remain accessible.
- Existing course progress, capstone grades and certificates are not overwritten or converted to career-level certifications.
- All nine course pages remain intact. Career selection is editable via `career-setup.html`.

## Verification and limitations
- JavaScript syntax, nine course routes and source integration checked.
- No production deployment or authenticated browser cross-device test performed.
- Course progress text is read from existing dashboard cards and may initially show Not started until dashboard data loads.
- `user_metadata` is user-editable; appropriate for preferences, **not** authoritative certification.
- Onboarding is triggered for first-time registration; older accounts are offered setup in My Learning rather than forced through onboarding.
- Experience level is saved but not yet used for proficiency placement or skipping course lessons.
- Career path completion/certification is deliberately not awarded.
