# Burnt Wood color audit — 2026-11-13

The previous hex-color audit did not cover old RGB and RGBA literals. This pass inspected CSS, HTML, JavaScript, and SVG and replaced 171 legacy RGB/RGBA references across the app. These included previous cornflower blue, pistachio green, cool mist, older brown, and intermediate cool-gray values.

The corrected references now use Burnt Wood colors and warm neutrals: charcoal #0B0909, midnight blue #023048, burnt red #770101, ivory #F0EDDE, copper #C58A69, sand #D9BFA4, plus readable off-white and neutral shades.

The audit is enforced by tests/burnt-wood-rgb-audit.mjs. Pure white and black remain intentionally for accessibility, and functional status/third-party content may have distinct colors. Raster illustrations and third-party UI content cannot be exhaustively certified by a text-source audit. Verify rendered pages on the live deployment and clear deployment caches.
