# Release 18 — Unified Academy Navigation

All Academy public pages and learner-facing private pages share the same canonical desktop and mobile header markup from `index.html`, rather than diverging into separate header systems. My Learning retains its secondary page-specific section tabs and Release 18 explicitly makes those tabs visible and horizontally scrollable on narrow screens.

The Admin console and authentication pages retain their purpose-specific shells. Shared navigation uses existing controllers and retains signed-in links. `career-paths.html` and `free-lesson.html` no longer use the older `dlp` header.

Deployment is separate from packaging. Verify signed-in browser behavior and sidebar/header interaction on mobile after deployment.
