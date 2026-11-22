# Practice Studio retirement — regression update

- Updated legacy regression contracts to exclude the retired `studio.html` redirect from active-page layout, theme, authentication UI, favicon, and page-loader assertions.
- Added `tests/studio-retirement.mjs` to verify redirect, removal from primary Study Tools/navigation/search, and availability of Practice Arena.
- Removed unused retired Studio stylesheet and controller files; retained `course-studio-data.js` because `connection-test.html` still references it.
- Removed residual Practice Studio destinations from private navigation and premium search.
- Preserved active Practice Arena worksheet, exercise, Tutor, authentication, and cloud test coverage.
- Verified with `npm run verify:deployment` (exit code 0). Actual live Vercel deployment and physical-device scrolling performance not tested.
