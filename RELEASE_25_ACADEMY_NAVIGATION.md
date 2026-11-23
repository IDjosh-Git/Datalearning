# DataLearning Release 25

Source baseline was the locally available Release 23 archive. The Release 24 download was visible in the earlier ChatGPT conversation, but its archived file was inaccessible in this workspace.

## Changes

- One Academy component renders desktop dropdowns and the mobile navigation dialog from one route list. The public landing and guidance pages, all nine generated syllabi, and the learner workspace use it.
- The header highlights the current Academy group on both screen sizes. My Learning section links track the current fragment, including links using the old course-progress anchor.
- Shared search uses public course syllabi for visitors and the course workspaces for signed-in learners. Profile and sign-out use the verified learner session.
- A shared footer owns its contrast rules and uses the published Admin Appearance colours. The current theme guards primary and secondary backgrounds against insufficient white-text contrast.
- Updated the Vercel Functions dependency and included the npm lockfile. Install with Node 24 and npm ci.

## Verification

The configured deployment verification includes public generation, clean static output, lint, the Academy and learning-platform regressions, and authentication and authorization tests. Separate release-route, learner-journey and quality checks also ran.

Edge was checked locally at 1440 and 390 CSS pixels. Coverage included the public landing page, Start Here, Free Lesson, Career Paths, the catalogue, all nine syllabi, My Learning, AI Tutor, Profile, Certificates, Practice Hub and Study Tools. Signed-in visual checks used a simulated learner. The branding endpoint also used simulated published colours. Live Supabase sign-in, Admin Appearance publishing and production behaviour were outside local verification.

No production deployment was made.

