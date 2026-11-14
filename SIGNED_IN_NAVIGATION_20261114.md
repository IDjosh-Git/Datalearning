# Signed-in navigation correction

Courses now opens `index.html#zaDiscoverCards`, the authenticated Discover course grid, from all 29 signed-in page headers and mobile menus. Nested course pages use the correct relative path. Shared workspace navigation, footer course discovery, search's All Courses result, quiz back links and Tutor app-guide course shortcuts use the same destination. The legacy `catalog.html` redirect also leads to authenticated Discover; the public `/courses` catalogue remains public.

The mobile header menu now closes through its shared toggle function on link selection, resetting `aria-expanded`, scroll locking and focus consistently. Current-page indicators distinguish Discover from its Courses section, update on hash navigation, and recognise supported clean URL aliases. Course-grid anchor scrolling leaves space for the fixed header.

`tests/signed-in-navigation.mjs` checks 29 signed-in headers and 261 local destinations against actual files and access classifications. It executes the shared navigation controller against a small DOM fixture to check opening, link selection, Escape, keyboard focus wrapping, resizing and active-link state. This test is part of lint. Existing private-navigation contracts were updated to require the new Discover course destination.

`npm run verify:deployment` passed, including the application's build, lint, academy, security, practice, tutor and cloud-media regression suites. The expanded mobile-link navigation test and final Tutor app-guide changes also passed their targeted checks. These tests use mocked authentication and service responses; they do not prove every live account or production integration works. Live sign-in with a real account and browser visual checks were not performed for this update.

The earlier Vercel homepage routing correction and public course colour improvements are retained. Deploy the enclosed `datalearning` directory as the project root, including `middleware.js` and `vercel.json`, and preserve the existing environment variables. This archive has not been deployed to production by this chat.
