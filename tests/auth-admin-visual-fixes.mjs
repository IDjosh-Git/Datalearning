import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = file => fs.readFileSync(file, 'utf8');
const auth = read('auth.html');
const authCss = read('assets/styles/auth-entry-premium.css');
const admin = read('admin.html');
const adminCss = read('assets/styles/admin-unified-premium.css');

// The isolated sign-in stylesheet must win over generic primary-button rules.
const links = [...auth.matchAll(/<link\b[^>]*?href="([^"]+\.css(?:\?[^\"]*)?)"[^>]*>/gi)].map(m=>m[1]);
assert(links.some(h=>h.includes('auth-entry-premium.css?v=20261113-auth-v4')) && links.at(-1)?.includes('premium-color-system.css') && links.some(h=>h.includes('responsive-quality-pass.css')), 'Sign-in stylesheet must be cache-busted and shared responsive overrides last');
assert(links.some(h=>h.includes('burnt-wood-theme.css')), 'Burnt Wood base tokens must be loaded');
assert(authCss.includes('linear-gradient(123deg,#0B0909 0%,#023048 42%,#770101 100%)'), 'Hero must show all three Burnt Wood gradient colors');
assert(authCss.includes('.auth-tab.active{color:#FFFFFF;background:#770101'), 'Active sign-in tab must be visibly burnt red');
assert(authCss.includes('body.auth-page button.auth-submit[type="submit"]'), 'Auth action must outrank generic button styling');
assert(authCss.includes('background-image:linear-gradient(108deg,#770101'), 'Submit action must have Burnt Wood gradient');
assert(authCss.includes('@media(max-width:600px)') && authCss.includes('prefers-reduced-motion:reduce'), 'Mobile and reduced-motion support must remain');
for(const id of ['loginForm','signupForm','signInTab','createTab','loginPanel','signupPanel'])
 assert(auth.includes(`id="${id}"`), `Auth flow element ${id} must remain`);

// The snapshot is flush with the admin canvas; individual KPI cards remain.
assert.match(admin, /aria-labelledby="acSnapshotHeading" class="ac-section ac-performance-section"/);
assert.match(admin, /admin-unified-premium\.css\?v=20261113-snapshot-clean-v1/);
assert(adminCss.includes('#adminWorkspace .ac-performance-section'), 'Scoped snapshot reset must exist');
assert(adminCss.includes('background:transparent!important;background-image:none!important'), 'Snapshot underlay must be transparent');
assert(adminCss.includes('border:0!important;outline:0!important;box-shadow:none!important'), 'Snapshot frame and shadow must be removed');
assert(adminCss.includes('.ac-performance-section::before') && adminCss.includes('.ac-performance-section::after'), 'Snapshot pseudo overlays must be removed');
assert(admin.includes('class="dalp-admin-stats ac-kpis"'), 'Four KPI cards must be preserved');
console.log('PASS Burnt Wood sign-in visual hierarchy, final stylesheet precedence, and overlay-free admin Performance Snapshot');
