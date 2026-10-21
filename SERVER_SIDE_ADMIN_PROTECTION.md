# Server-side administrator protection (v9)

## What this changes

The hosting server now intercepts all administrator HTML pages and administrator-only JavaScript and CSS before serving them. Signed-out visitors are directed to the ordinary sign-in page. Signed-in learners receive `403 Access denied` and cannot download the protected content. Signed-in administrators continue directly to the requested page. Admin role is checked against the database on **each protected request**, never against browser-controlled storage or client-declared metadata.

Protected page URLs: `/admin.html`, `/progress.html`, `/reviewer.html`, `/connection-test.html`, `/sync-test.html` and their short-path aliases. Admin-only assets are also protected. Sensitive setup SQL, tests, and server helper paths are denied.

## Hosting prerequisites

Deploy the **contents of `Datalearningpath/` as the project root** to Vercel with `package.json`, `middleware.js`, `lib/server-auth.js`, and `api/auth/session.js` intact. Routing Middleware and `/api/auth/session` are required. A plain static file host or file:// preview does **not** offer server-side protection. Set the project root to this folder if your repository contains the outer directory.

The existing public account project URL and **publishable** API key are used as defaults for a working upgrade; they may also be set as `DALP_AUTH_URL` and `DALP_AUTH_PUBLISHABLE_KEY`. Never set or expose a service-role key in frontend assets. The server endpoint accepts an access JWT over HTTPS, verifies it with the account provider, and places it in a Secure HttpOnly SameSite=Lax first-party cookie for up to its original token lifetime (never more than 3600 seconds). Sign-out clears this cookie.

## Manual acceptance test on the actual deployment

1. **Guest**: Open `/admin.html` in a private/incognito window. Confirm that the server responds with 302 to `/auth.html?return=...`, with no admin HTML in the response. Try `/assets/admin-dashboard.js`: must be 403.
2. **Learner**: Sign in as a genuine learner. Open `/admin.html`, `/progress.html`, `/reviewer.html` and the admin-only JavaScript directly. All should return 403. Course pages must still work. Verify learners cannot read anyone else's learning data.
3. **Administrator**: Sign in using the normal login form. Confirm admin workspace loads, all three admin pages work, and the browser can fetch the protected admin JS/CSS. Refresh an admin page directly; it must continue to load.
4. **Log out**: Open `/admin.html` again. Confirm it returns to sign-in. Check `/api/auth/session` responds 405 to GET and 403 on a cross-origin POST.
5. **Expiry and outage**: Expired/invalid tokens must redirect or reject. If account-role validation is unavailable, protected content must not be served (`503`).
6. **Headers**: Protected requests must carry `Cache-Control: private, no-store` so a CDN/shared device does not cache administrator content.

## Important limitations

The existing pages for learners remain publicly fetchable HTML (although their browser-side gate and database RLS restrict access). This update specifically protects the **administrator interface**. The app's static course files would require extending the middleware to all learning routes if you want the complete course HTML files confidential too. Keep RLS and function authorization in place as the ultimate data protection.

This release is code packaged for deployment, not a claim that it is deployed or that the target hosting project was verified. Test against the actual hosted URL before going public.
