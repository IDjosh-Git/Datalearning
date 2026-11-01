# AI Learning Workspace — Width, Question Layout and Course Outline Control

## Baseline

Updates start from `Data_Analysis_Learning_Path_Private_Nav_Colour_AI_Alignment.zip`. The six course routes, progress controls, quizzes, course links, administrative permissions and lesson data are preserved.

## Issues confirmed

- The AI knowledge-check quiz inherited a 920px width cap even when its lesson panel had more room, leaving a conspicuous empty area at desktop widths.
- Detailed mastery-question content inherited a separate 760px cap and large automatic side margins.
- The AI learning-workspace heading shared a horizontal row with its actions, compressing the learning outcome and leaving uneven spacing.
- The sidebar Show/Hide Course Outline button used a pale appearance that did not stand out clearly against light topbars.
- AI course-wide frames topped out at 1248px even on wider displays.

## Corrective changes

1. Removed the quiz width cap while retaining full-width question cards, readable interior padding and constrained paragraph line lengths.
2. Expanded AI mastery panels into the space available within their actual lesson container.
3. Arranged the workspace heading, outcome and actions in a consistent top-to-bottom flow.
4. Increased the AI page's maximum course frame to 1400px, maintaining compact horizontal gutters on phone and tablet.
5. Restyled the Course Outline toggle with white text on vivid indigo when expanded and deep slate blue when collapsed. The JavaScript state and `aria-expanded` attribute remain intact; the button stays keyboard accessible.
6. Revised the public service-worker cache namespace so previously cached CSS is less likely to persist.

## Verification

- `npm run build`: PASS
- `npm run lint`: PASS
- `npm test`: PASS, including added `tests/ai-workspace-width-outline.mjs`
- Rendered in an isolated browser preview with locally inlined styles/scripts at 360px, 768px, 1280px, and 1600px: PASS, no page-level horizontal overflow.
- Quiz width as share of its visible tab panel: approximately 89%, 96%, 96%, 96% respectively (difference is the surrounding panel padding).
- Course Outline control backgrounds: `#3035B0` (expanded), `#29476B` (collapsed), both with white text; computed colour contrast ratios approximately 9.28:1 and 9.51:1.

## Limitations

Browser layout testing used an isolated static rendering with the learning-workspace script; it does not replicate a full deployed authentication session or database-backed progress synchronization. Reconfirm live loading, signed-in progress and external links on deployment.
