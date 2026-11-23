# Release 15 — Appearance sidebar destination

Admin sidebar now contains **Appearance**. Selecting it navigates to `admin.html#admin-appearance`, a dedicated, isolated settings view with the existing branding controls, preview and Supabase-backed publishing. The sidebar remains visible and Appearance is highlighted. Other admin panels are hidden and inert while Appearance is active. Browser back/forward and direct deep links work through the existing admin view router. No database migration is required beyond Release 14.
