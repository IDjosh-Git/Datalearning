# Release 16 — colour quality and Explore Courses

- Main desktop and mobile Explore Courses actions now open the homepage Discover cards (`index.html#zaDiscoverCards`) rather than the retired `catalog.html` route. Detailed Course Catalogue remains available at `/courses`.
- Modern default branding: primary #123B4A, secondary #183047, accent #B66B42, background #F8FAFC. Copper #B66B42 is decorative only (4.06:1 on white; not AA for ordinary small text). Stable readable text #172B3A, muted #526475, borders #D8E1E8, white cards.
- Shared CSS controls navigation, main actions, forms, focus rings and common cards while retaining semantic red. The central Appearance panel continues to publish overrides to every page.
- Existing Supabase published brand settings remain authoritative. **To activate the new colours on an existing installation, use Admin → Appearance to publish these four colours.** Updating source defaults does not silently overwrite an existing database row.
- Existing legacy CSS/artwork still contains hardcoded historic colours; this release improves shared components, but is not a verified pixel-perfect complete replacement. Browser visual and accessibility audits are still required before claiming full WCAG AA.
- Not deployed to Vercel.
