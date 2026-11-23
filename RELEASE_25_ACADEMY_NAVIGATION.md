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


## Discover Courses layout update

The signed-in Discover Courses hero and the public course catalogue intro use less vertical space. The Discover photo, actions and course statistics remain in the layout, with a shorter photo crop and a compact statistics row on phones.

## Navigation and visual polish

- Explore Courses opens the Discover study grid. Its dropdown lists nine study workspaces, with the public catalogue and previews grouped below them.
- Desktop and mobile use matching disclosure icons and link cards. The course links remain keyboard accessible.
- Learner and public heroes use the published palette. Study Tools, Practice Hub, Reference, Profile and Start Here have adjusted narrow-screen layouts.
- Pages request the published palette early and hold content during the short initial theme check. The default palette is available if the branding request fails.
