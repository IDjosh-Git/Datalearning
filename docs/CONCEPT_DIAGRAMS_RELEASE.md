# Concept diagram learning upgrade

Added 20 responsive, self-contained SVG concept diagrams for selected lessons across Data Analysis, Excel, SQL, Power BI, Power Query, Tableau, Statistics, Python and AI. They supplement (rather than replace) the existing 90 weekly interface illustrations.

## Teaching pattern
Each selected lesson now includes a concept diagram, a concise explanation, and a learner prompt to trace inputs, connections, and outputs. Power BI Week 3 compares star and snowflake structures in two panels. Diagram labels are illustrative and do not substitute for specifying model cardinality, relationship direction, or join keys in the real tool.

## Engineering
- Assets: `assets/images/lesson-concepts/*.svg`
- Registry: `assets/scripts/academy-concept-diagrams.js` and `assets/data/lesson-concept-diagrams.json`
- Styling: `assets/styles/academy-concept-diagrams.css`
- Rendering: `assets/scripts/academy-app.js` within the weekly lesson reader
- Existing progress IDs, assessment data and lesson content are unchanged.

## Verification
`npm run verify:deployment` passed locally on Node 22 (project targets Node 24). Authenticated visual inspection on mobile and desktop remains outstanding. Production has not been deployed.
