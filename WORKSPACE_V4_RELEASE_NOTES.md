# Data Analysis Learning Path — Learning Workspace v4.0

## What's new

The application has been reorganized as a coherent learner workspace with a shared top navigation, course entry points, practice and learning tools, progress tracking and a personalized learning homepage. The design draws on common conventions in mature learning platforms: a visible Continue Learning action, a clear course catalogue, persistent navigation and consistent tool discovery. No third-party designs or proprietary artwork have been copied.

### Learning experience
- Personalized signed-in homepage with five learning paths, next steps, course progress, course cards and learning shortcuts.
- One responsive workspace navigation across the main student-facing pages, with Courses, Practice, AI Tutor, Learning Lab, Library and Progress, plus an Admin link for authorized administrators.
- Keyboard-friendly Quick Find with Ctrl/Cmd+K, keyboard dismissal and a mobile menu.
- Consistent course headers, responsive mobile course control sizing and reduced oversized image treatment.
- Reworked sign-in page styling and readable desktop/mobile typography, while preserving Supabase authentication and role-based routing.
- Redundant floating shortcuts suppressed on workspace pages so they do not obscure content on mobile.

### Performance work
- Initial reference library rendering reduced from all **603** cards to **24**, with Load More and debounced filtering.
- Removed duplicate course-studio-data script includes on course pages; off-course loading happens on demand when the learner opens the coach.
- Removed unused third-party QR script loads on selected course pages.
- Non-critical document scripts load with `defer` while the authentication gate still initializes early.
- Course progress synchronization runs the five course operations concurrently instead of serially.
- Skips an unnecessary follow-up cloud read when a sync makes no changes, and uses a validated user session when available.
- Throttles redundant tab-focus/pageshow progress fetches. Persisted user progress is not discarded.
- Added Vercel response cache headers for versioned assets; dynamic account/admin/auth HTML is not cached.

These are code-level optimizations expected to improve perceived load and navigation responsiveness. No audited real-world Lighthouse/LCP/INP performance measurements are claimed.

### Authentication & data
- Login/registration/password recovery and authenticated learner page gating retained.
- Supabase `site_admins` role detection and the administrator dashboard retained; admins use the same login as learners.
- Supabase learner_profiles, learner ownership of progress/quiz/capstone records, existing Row Level Security, and account-scoped offline progress retained.
- The standalone static HTML files still require hosting-level authorization controls if the course source itself must be secret: frontend page gating is not the same as server-side file protection. Supabase data is protected by applicable RLS policies.

### Validation carried out
- `npm test` passed, including auth, admin role, all course content, Vercel API mocks, sync regression and review flows.
- `npm run test:responsive` passed its coverage checks for 20 HTML pages.
- `npm run test:workspace` passed new learning-workspace regression coverage.
- Playwright static visual checks at 390px and 1440px for the homepage, authentication screen, Excel course and admin page; no horizontal overflow at those widths in those rendered pages.
- Playwright DOM interactions passed: mobile menu, Escape close, Quick Find, reference Load More and reference filtering.
- Referenced local assets checked across all 20 HTML pages: no missing files.
- Real HTTP navigation was blocked in the automated environment. Full end-to-end browser tests against a deployed website, email verification, and live Supabase sign-in should be performed after deployment.

### Deployment
1. Deploy the contents of `Datalearningpath/` (not the parent ZIP) to your current Vercel site. Preserve the existing `api/` folder and environment settings.
2. Keep Supabase project URL / publishable key as configured; **never** put a Supabase service-role key in frontend code.
3. Open a private browsing session: verify that the login page loads first; sign up and confirm email; sign in as a learner and verify course/progress isolation.
4. Sign out, then sign in with the authorized administrator account and verify access to Admin, learner directory and capstone review tools.
5. Test on a real Android device, iPhone and Windows machine, including throttled network conditions. Inspect Vercel performance logs and collect Lighthouse measurements for a true before/after speed comparison.
6. After deployment, review Supabase's existing security advisories for leaked-password protection and inherited security-definer function permissions.

### Testing commands

```
npm test
npm run test:responsive
npm run test:workspace
```

The project is static and can be deployed without an npm build, although the package scripts may be used for verification.
