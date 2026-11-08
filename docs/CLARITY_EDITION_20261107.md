# DataLearning — Clarity Edition

**Release:** 7 November 2026  
**Baseline:** `DataLearning_Premium_Unified_UI_Supabase_Reliability_20261107.zip`  
**Status:** Locally modified and tested. Not deployed to Vercel. No Supabase database operations were performed.

## Product changes

**Simpler public experience.** The Discover page removes its redundant trust strip and condenses optional “Where should I start?” / “What progress means” content into expandable disclosures with visible +/− controls. The Overview page, Capstone guide and Learning Lab now use the same disclosure pattern for long secondary information. Primary course links, data, learning content and actions remain in the document and accessible via keyboard.

**Consistent mobile navigation.** The public navigation is a scrollable, viewport-height menu below the header at widths <=1200px. Course and Study Tools sections expand natively, remain within the viewport, and close via the toggle, link selection, outside click, or Escape. Background page scrolling is locked while the mobile menu is open. At narrow widths, the course flyout switches from two columns to one.

**Single course sidebar.** The six course players use a dark-navy, Library-Manager-inspired lesson rail with clear active indicators, numeric week badges, and improved contrast. The original content-internal week picker and horizontal week strip were removed from `assets/scripts/weekly-workspace.js`; lesson selection now uses the sidebar only. Existing Previous/Next controls, course deep links, per-user remembered lesson, completion tracking, quiz logic and Practice Studio links remain. The Introduction course uses its corresponding original sidebar and Previous/Next controls.

**Premium knowledge checks.** Quiz questions render as compact, content-sized white cards on a soft section surface. Answers use touch-sized radio rows, distinct selected states, and accessible focus. Reveal/score actions are preserved and require no changed scoring logic. The **Learn / Practise / Check knowledge** tabs are compact and responsive.

**Simplified capstone.** The decorative hero award card was removed. “Project guide and submission requirements” is a small collapsible disclosure; submissions, evidence upload, grading, certificate generation and authenticated access rules were not changed.

## File and style consolidation

Original stylesheet count: **48**. Current stylesheet count: **41**. Original load order is preserved within each bundle.

| Removed old layers | Maintained bundle |
|---|---|
| `public-vibrant.css` + `public-motion.css` | `public-experience.css` |
| `home.css` + `home-refinements.css` | `home.css` |
| `capstone.css` + `capstone-layout.css` | `capstone.css` |
| `capstone-guide.css` + `capstone-guide-layout.css` | `capstone-guide.css` |
| `learning-lab-foundation.css` + `learning-lab-layout.css` | `learning-lab.css` |
| `preview-foundation.css` + `preview-layout.css` | `preview.css` |
| `course-ai.css` + `course-ai-content.css` | `course-ai.css` |

The final maintained cross-page override remains `assets/styles/premium-unified.css`; the Clarity Edition rules are in a clearly delimited section at its end. Existing page-specific styles required by active routes were deliberately **not** deleted. Page assets were rewritten to use the bundles, and source-level regression tests were updated to reflect deliberate changes rather than obsolete design requirements. No new production dependencies were added.

## Verified locally

- `npm run verify:deployment` (build + lint + all application tests)
- `tests/clarity-edition-contract.mjs` covers single week navigator, quiz presence, optional disclosures, menu accessibility, removed capstone overlay and CSS cleanup
- Isolated Chromium layout verification: Excel knowledge-check tab showed all five questions at 390px without page-wide horizontal overflow; initial public and course views, navigation menu and capstone were rendered as layout references
- Browser test pages were loaded from isolated HTML/CSS; local-storage/history warnings due to `about:blank` origin are **not** evidence of failures on the deployed site

## Deployment checklist

1. Unzip at the root of your DataLearning repository, replacing the original project files.
2. Run `npm install`, then `npm run verify:deployment` with Node.js 24.
3. Deploy to Vercel and test all six courses at 320, 390, 768 and 1440px. Open the public menu, the course drawer and Check knowledge; mark a week complete and verify cloud sync after signing in.
4. Check a capstone as learner and as reviewer/admin; never expose service-role secrets to the browser.
5. There is no new Supabase migration in this release. Live production end-to-end validation is still required.
