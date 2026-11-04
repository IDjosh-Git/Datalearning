# Data Learning — Course organization & footer restoration (4 Nov 2026)

This is an additive repair to the verified Premium Redesign baseline; the previous course content, authentic user progress, permissions and tool experiences are unchanged.

## Restored

- Three-stage learning route on the homepage and catalogue: Foundations (Introduction); Core Analytics (Excel / SQL / Power BI); Advanced Practice (Python / AI). Each of the six original course cards, pages, roadmaps, extensions, lessons and quizzes is preserved.
- Catalogue stage headings are integrated with the existing search/subject filtering so empty headings are hidden and card counters stay accurate.
- Kept the original course-by-subject learning sidebar and mobile menu; added a prominent route summary before the full course cards.
- Reinstated the original unified, four-column dark navy footer across 30 public learner/course pages, including nested course routes and mobile stacking. The footer's singleton JS script is now loaded at the bottom without `defer` and renders immediately when the body exists, avoiding dependency on delayed third-party deferred scripts.
- Made the footer full width on desktop catalogue/course pages despite the fixed 248px sidebar; isolated protected account/admin/diagnostics remain unchanged.
- Retained the shared grouped Study Tools navigation, dark-header colour/contrast, colored icons, course gradient cards, Tutor section sidebar, Practice Arena expanded editor/results and mobile responsiveness.
- Advanced service worker cache revision to avoid stale styles.

## Limits

- Source-level tests do not prove live authenticated routing, Supabase sync or visual pixel parity with an unavailable earlier screenshot.
- Not deployed to production. Use a preview deployment to compare signed-in pages and mobile layouts.
