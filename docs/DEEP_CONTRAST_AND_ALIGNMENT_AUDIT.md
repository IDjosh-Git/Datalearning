# Deep website contrast and alignment audit

**Date:** 1 November 2026  
**Baseline:** `Data_Analysis_Learning_Path_Course_Icons_Clickable_Cards_Fixed.zip`  
**Scope:** 38 HTML routes, including public pages, six course tracks, 12 roadmaps/extensions, and account/admin entry layouts.

## Confirmed defects and corrections

1. **AI Integration course:** The final-assessment callout inherited white text but no background because its historic `--ui-hero` variable was not defined. The callout now has an explicit dark-slate surface and readable light text. Its resource links and hero are horizontally aligned with the teaching content, rather than sitting against the viewport edge.
2. **Excel, SQL, Power BI, Python:** White-background statistics within the dark course banners inherited white headings/labels. Set card text to ink on white without affecting the light text on the dark banner. Corrected formerly light resource links within light instructional inset cards, and plain Sign In links in dark course topbars.
3. **Course week badges:** Badges with medium/dark blue surfaces inherited very dark ink labels. These now use white text. Foundation process labels were also lightened to meet normal-text contrast on blue.
4. **Practice Arena:** Legacy selectors repeatedly repainted the masthead white while retaining white text. Removed identified legacy declarations from the shared practice selectors and assigned a dark-slate masthead with readable light headings and links.
5. **Course roadmaps and extensions:** Plain “Return to course” links inside dark bottom panels were overridden by the global indigo link rule. Exempted dark-panel links from that rule while retaining ordinary plain-link styling elsewhere.
6. **Learner Progress and Review Desk:** Protected intro headers retained light text on a pale surface. They now use an intentional deep-slate banner; the surrounding workspace remains light. The introductory eyebrow, descriptions and access notices have explicit readable colours.
7. **Sample Preview and Certificate Verification:** Repaired text/badge contrast on their dark headers, including a retired teal eyebrow colour on verification.
8. **Content insets:** Increased the inner padding of compact course lesson cards, practice mini-cards, course resource navigation, and three-session learning cards; preserved responsive layout and unboxed resource links.
9. **Stylesheet conflict:** Adjusted the global plain-link selector so its dark-indigo colour is **not** forced into dark footers, roadmap action panels, AI final-assessment sections or course topbars. The maintained `design-system.css` remains the shared design-system layer; no new global override stylesheet was added.
10. **Offline assets:** Bumped the public service-worker cache namespace to avoid older CSS persisting after redeployment.

## Verification evidence

| Verification | Result |
| --- | --- |
| HTML pages examined | 38 |
| Rendered viewport checks | 114 |
| Tested widths | 360px, 768px, 1280px |
| Visible direct text-node instances evaluated across renderings | 30,247 |
| Static text/background pairs below 4.5:1 | 0 after fixes |
| Page-level horizontal overflows | 0 in tested renderings |
| Course/tool inset audit | No remaining under-padded tracked cards on representative pages |
| Project build | Passed |
| Project lint | Passed |
| Full project automated suite | Passed |
| Added regression check | `tests/cross-page-contrast-alignment.mjs` |

**Method:** Headless Chromium computed-style audits of stylesheet-inlined HTML at 360/768/1280 widths. The contrast test walks ancestor background colours and evaluates visible text-node foregrounds using WCAG relative luminance and a 4.5:1 threshold. The audit detects regular text/background pairs and page-wide overflow; it is not a substitute for all visual or accessibility testing.

## Important scope limits

- The browser environment blocks navigation to locally hosted HTTP pages. The rendered checks therefore used stylesheet-inlined documents **without executing application scripts**. Live-loaded lessons, dynamic assessment states, data-driven admin tables, API content, external embeds, hover/interaction states, and logged-in layouts were not completely visually exercised.
- The screenshot/contrast method may not completely model background images, SVG paint, composited translucency or overlapping elements. It cannot prove that every possible user state or device has no issue.
- Authentication, permission, learning and navigation regression tests passed in the existing test suite. Production sign-in, database latency, external content and deployment caching still require a real staging/deployment test.
- All learning content, lessons, routes, progress and authorization rules remain untouched by the visual fixes.
