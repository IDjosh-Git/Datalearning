# Release 10 — Premium grouped navigation

Based on Release 9. Five primary navigation links remain direct links. Each has a separate keyboard-accessible dropdown toggle and grouped secondary destinations. Mobile drawer uses five expandable groups with the same destinations, including nine course paths. Learning Coach, Prompt Library, Reference Lab, Learning Lab, Practice Arena, Question Bank, Quizzes, Capstones, Certificates and Career Roadmap remain discoverable.

Coverage: 28 shared-header pages including course pages. Existing private/admin navigation remains untouched. Release 10 assets: `assets/styles/release-10-navigation.css`, `assets/scripts/release-10-navigation.js`. Regression test: `tests/release-10-navigation.mjs`. Existing signed-in navigation regression updated to verify five top-level links and groups.

Validation: `npm run verify:deployment` passed under local Node 22. Application declares Node 24 for Vercel. Browser device testing and staging deployment are not performed.
