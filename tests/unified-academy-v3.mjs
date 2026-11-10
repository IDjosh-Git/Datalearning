import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const ROOT=path.resolve(import.meta.dirname,'..');
const load=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const publicRoutes=['auth','capstone','capstone-guide','tutor','practice','learning-lab','reference','prompt-library','studio','preview','verify'];
const privateRoutes=['account','profile','admin','progress','reviewer','certificate','connection-test','sync-test'];
const curriculum=['introduction','excel','sql','powerbi','tableau','powerquery','statistics'];
for(const route of publicRoutes){const src=load(route+'.html');assert.match(src,/unified-academy-v3\.css/);assert.match(src,/unified-academy-shell\.js/);assert.match(src,/class="dlx-header"/);assert.match(src,/class="dlx-nav-dialog"/);assert.match(src,/class="dlx-nav-close"/);for(const slug of curriculum)assert.match(src,new RegExp(`courses/${slug}\\.html`));if(route!=='auth' && src.includes('class="dalp-global-header"'))assert.match(src,/class="dalp-global-header"[^>]*aria-hidden="true"[^>]*style="display:none!important"/);}
for(const route of privateRoutes){const src=load(route+'.html');assert.match(src,/unified-academy-v3\.css/);assert.match(src,/dlx-rebuilt/);assert.doesNotMatch(src,/class="dlx-header"/,'Protected routes should retain role-aware private navigation');}
const account=load('account.html');for(const slug of curriculum)assert.match(account,new RegExp(`data-track="${slug}"`));assert.match(account,/completedUnits\/70\*100/);assert.match(account,/primaryTracks\.has/);
const auth=load('auth.html');assert.match(auth,/class="auth-topbar" aria-hidden="true" style="display:none!important"/);assert.match(auth,/Browse all seven courses/);
const css=load('assets/styles/unified-academy-v3.css');assert.match(css,/dlx-nav-dialog:not\(\[hidden\]\)/);assert.match(css,/dlx-menu-open \.dl-float-coach/);assert.match(css,/admin-page \.ac-command-hero/);assert.match(css,/dalp-feature-header\.dalp-themed-hero/);
const nav=load('assets/scripts/unified-academy-shell.js');for(const token of ['aria-expanded','Escape','shiftKey','focus()'])assert.ok(nav.includes(token));
for(const [f,required] of [['tutor.html','chatForm'],['practice.html','practiceDetail'],['capstone.html','capstoneForm'],['auth.html','signupForm'],['learning-lab.html','ss-plan-form'],['certificate.html','dalp-cert-viewer']])assert.ok(load(f).includes(required),`${f}: missing ${required}`);
console.log(`PASS unified academy: ${publicRoutes.length} public screens, ${privateRoutes.length} protected screens, seven course cards, preserved feature IDs and full-screen nav`);
