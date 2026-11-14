# Public guide theme alignment

Start Here, the public course catalogue, and all nine public syllabi now share the authenticated app's midnight blue (#023048), burgundy (#770101), ivory (#F0EDDE), copper and sand palette. The public homepage retains its own layout. Signed-in pages and learning logic are unchanged. The Vercel root-routing correction is retained.

Dark navigation and hero panels use ivory text and sand labels. White course cards use navy headings and readable muted copy. Burgundy buttons use white labels, with a sand border on dark backgrounds. Light preview panels use dark text explicitly to avoid inheriting the hero's light text. Keyboard focus colours adapt to light and dark surfaces. Mobile layouts stack navigation, cards and actions.

The shared stylesheet is scoped to `body.public-guide`. The public-page generator now emits that class and embeds the latest stylesheet. Start Here also embeds the updated stylesheet. This keeps the colours consistent after deployment builds and if the external stylesheet fails.

`tests/public-guide-theme.mjs` measures ten text/background combinations and verifies all eleven guide pages carry the current embedded stylesheet. Normal-text contrast is at least 5.78:1 across these tested pairs (above the WCAG AA 4.5:1 threshold). The test is included in `npm run lint`.

An attempted browser screenshot run could not start Edge under this session's execution restrictions; fresh browser screenshots are not claimed for this colour update. The earlier preview files show the homepage, not this update.

Deploy the enclosed `datalearning` directory as the project root, preserving `middleware.js`, `vercel.json` and existing environment variables. This ZIP has not been published to the live site by this chat.
