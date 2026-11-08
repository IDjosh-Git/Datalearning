# DataLearning — Capstone, Profile & Mobile Navigation Update

**Release:** 8 November 2026. Based on the Premium Finish / Focused Tutor edition. **40 HTML routes**, including new `profile.html`.

## Capstone
- Reworked the editorial hero into one clean dark-navy/violet header with no overlapping white or glass panel.
- `assets/scripts/capstone.js` distinguishes a signed-out visitor from an authenticated account with zero submissions and from a genuine service/network failure.
- The original generic “couldn't load submissions” warning is not shown when someone is simply signed out. Signed-out users get a clear sign-in link. A genuine failure gets an explanatory warning and **Retry loading**, and the upload form stays unavailable until prior submissions are verified.
- Re-fetching progress, submissions, and certificates uses a request sequence guard, so switching courses during loading does not render stale results.

## Signed-in profile
- A small status avatar/profile button now appears in public and private top navigation. Guests get **Sign in**; signed-in users can open **Edit profile** directly. Small screens use a status dot and compact avatar.
- `profile.html` allows updating full name, professional headline, phone, location, study goal, short bio, email (confirmation may be required), and password.
- Upload, replace, and remove photo with client-side resizing; images are stored in **private** Supabase Storage and presented using short-lived signed URLs. The avatar control has a keyboard-accessible upload button.
- For safety, profile-only fields are stored in `auth.users.user_metadata`, *not* used to grant roles. The existing `learner_profiles` name is synchronized using the owner's existing RLS policy.

## Discover and mobile navigation
- Discover's four real learning steps receive a subtle sequential highlight animation, which pauses in background tabs and stops under reduced-motion preferences.
- Mobile header has clean spacing, legible links, scrollable full-height menu, focus states, and a dedicated account state button without reducing course navigation coverage.
- All changes use the final `assets/styles/premium-unified.css` stylesheet; no additional theme layers were introduced.

## Supabase setup and scope
- The avatar bucket `datalearning-avatars` was created in the linked DataLearning Supabase project on 8 November 2026. It is **private**, limited to 2 MB per image and configured with owner-only SELECT, INSERT, UPDATE, DELETE storage policies.
- For a **different Supabase project** run `database/20261108_datalearning_profile_avatars.sql` once in the Supabase SQL Editor. Do not use the public `portfolio-media` bucket for learner photos.
- No existing learner, course progress, or capstone rows were changed by this release.
- Do not expose any service-role keys in frontend code.

## Verification
- `npm run verify:deployment` and `node tests/capstone-profile-release.mjs` passed.
- Connected Supabase checks confirmed the private bucket and all four storage object policies.
- A rendered-browser visual check was attempted, but this execution environment blocks Chromium navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`. Before rolling out broadly, test a real account's photo upload and Capstone submission history on a phone and desktop.
- This archive is a code release, not a deployment; the existing production Vercel site is not updated by downloading it.
