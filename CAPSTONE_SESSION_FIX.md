# Capstone Studio sign-in regression

Root cause: `supabase-client.js` configures Supabase with `persistSession:false` and restores the signed-in account asynchronously through `DALP_AUTH_RESTORE` using the secure hosting session cookie. `capstone.js` previously called `getSession()` immediately during page initialization, racing the restoration and falsely showing the sign-in prompt.

Fix: `refresh()` now awaits the existing `DALP_AUTH_RESTORE` promise before checking the session. The course/refresh race guard remains intact. No new authentication flow, second login, or insecure localStorage persistence was added.

Expected: a signed-in learner navigating from My Learning to Capstone Studio remains signed in and can submit once the ten completed weeks and submission status have been verified.

Checks: JavaScript syntax and ZIP integrity. Actual browser verification against the live secure cookie, Vercel deployment and capstone submission were not performed.
