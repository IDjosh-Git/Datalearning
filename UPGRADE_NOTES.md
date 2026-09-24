# Upgrade notes — learner progress + theme pass

## What changed

- Added an instructor-only **Learner Progress** workspace at `progress.html`.
- The dashboard includes the 8-lesson **Introduction** plus Excel, SQL and Power BI.
- Added learner search, learning-path filter, status filter, completion percentage, quiz summary, capstone status, certificate status, last activity and lesson/week drill-down.
- Introduction lesson checkmarks now sync to Supabase for signed-in learners, so progress can follow the same account across phone and laptop.
- Existing Introduction checkmarks already stored on a device migrate to the account when that upgraded device is opened while signed in.
- Introduction remains separate from specialist certificate eligibility.
- Added a shared final light/dark theme layer across all main pages and early theme initialization to reduce theme flashes and inconsistent colours.
- Pinned the Supabase browser client used by the static pages to the tested version.

## Required after deployment

1. Back up the current Supabase project.
2. Run the latest `supabase_setup.sql` in the **same** project.
3. Deploy all files from this package.
4. Sign in with the instructor account already listed in `capstone_reviewers` and open **My Learning → Learner Progress**.
5. To migrate old Introduction progress from a phone, open the upgraded Introduction page on that phone while signed into the learner account. Then open the same account on the laptop.

Anonymous/local progress cannot automatically move between devices until the learner signs in and the device containing that local progress syncs it to the account.
