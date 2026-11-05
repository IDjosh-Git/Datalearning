# DataLearning — Discover Learning Hub & Premium Navigation

## Purpose
The original Home page and Overview page had overlapping purposes. The site now has distinct destinations:

- **Discover** (`index.html`) is an actionable entry point: choose a learning goal, open a first lesson, try a challenge, get help from the Tutor, or resume your account work.
- **Overview** (`overview.html`) is reserved for platform-wide learning activity, privacy-safe course popularity and the daily study planner.
- **My Learning** (`account.html`) continues to hold authenticated personal progress, assessments and certificates.

Existing routes are preserved to prevent broken bookmarks. Public navigation links were relabelled from **Home** to **Discover** across all 30 public pages; the private workspace now links to “Discover new skills.”

## Changes
1. Replaced the analytics-themed homepage hero with a practical four-stage learning route and clear actions.
2. Added an interactive four-goal course selector (Foundations, Excel, SQL, Power BI). Recommended lesson links change when the selection changes. The selected goal may be stored in localStorage on this browser only. No telemetry or profile changes were added.
3. Added new, strongly differentiated Practice Arena and Tutor entry cards, plus a simple My Learning return link.
4. Preserved the existing course cards, course finder/pathfinder, reference and practice features, 39 routes, six course players, progress sync and protected functionality.
5. Removed the oversized returning-learner dashboard injection from the Discover page to avoid duplicate account/overview presentations. The full dashboard remains at `account.html`.
6. Updated the shared public navigation with a compact SaaS-inspired pill surface, better contrast, purposeful whitespace, dropdown focus/hover states and a visually prominent My Learning action. Retained original accessible `<details>` menus, search dialog and responsive mobile drawer.
7. Updated footer and practice breadcrumbs to use Discover naming. Updated public service-worker cache key to `dalp-public-discover-horizon-nav-v34`.
8. Added source regression checks for separate Discover/Overview purposes, functional course recommendations, 30 consistent nav bars, preserved destinations and contrast.

## Verification
- `npm run verify:deployment` — PASS in the local source environment.
- Chromium inline HTML/CSS preview at 1440px, 1280px, 768px and 390px; goal switching, mobile menu open/close and horizontal overflow checks passed.
- No live Vercel deployment or real authenticated cloud user session was changed/tested in this release.

## Deploying
Publish the extracted **project files**, not the ZIP itself, to the Git repository linked to Vercel. Deploy a preview, inspect public and signed-in pages, then promote only after review. The latest source must be committed; redeploying an old commit does not publish these changes.
