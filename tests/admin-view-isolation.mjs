import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=(file)=>fs.readFileSync(file,'utf8');
const html=read('admin.html');
const nav=read('assets/scripts/private-navigation.js');
const css=read('assets/styles/private-experience-v3.css');
const utilityCss=read('assets/styles/private-utilities-premium.css');
assert.match(html,/data-admin-console="overview" data-admin-view="overview"/,'Default admin view must be overview');
assert.equal((html.match(/data-admin-panel="overview"/g)||[]).length,2,'Hero and overview data grouped in one view');
for (const view of ['courses','learners']) assert.equal((html.match(new RegExp(`data-admin-panel="${view}"`,'g'))||[]).length,1,`${view} has exactly one view`);
assert.match(css,/\.ac-admin-view:not\(\[data-active\]\)\{display:none!important/,'Inactive sections must never render');
assert.match(nav,/function showAdminView\(\)/,'Shared sidebar must implement route view switcher');
assert.match(nav,/panel\.toggleAttribute\('data-active',active\)/,'Switching must activate only one admin panel');
assert.match(nav,/panel\.setAttribute\('aria-hidden',String\(!active\)\)/,'Hidden view must not be exposed to assistive technology');
assert.match(nav,/dialog\.hidden=true/,'Switching views closes learner record modal');
assert.match(nav,/shade\.hidden=true/,'Switching views hides the modal backdrop');
assert.match(nav,/window\.addEventListener\('popstate',switchAdminView\)/,'Browser back/forward must restore the right view');
assert.match(nav,/history\.pushState\(null,'',target\.hash\|\|target\.pathname\+target\.search\)/,'Sidebar view navigation must not re-stack hash sections');
for (const page of ['connection-test.html','sync-test.html']) {
 const contents=read(page);
 assert.match(contents,/private-utilities-premium\.css/,'Both private diagnostics use the same premium design system');
 assert.match(contents,/private-navigation\.js\?v=sidebar-audit-20261110-r1/,'Updated shared sidebar is cache busted');
 assert.match(contents,/auth-gate\.js/,'Utility operations remain authenticated');
 assert.match(contents,/px-utility-hero/,'Premium banner is maintained');
}
for (const stale of ['connection-test-layout.css','sync-test-layout.css']) {
 assert(!fs.existsSync(`assets/styles/${stale}`),`${stale} should be removed`);
}
assert.match(utilityCss,/px-sync-list>\.row/,'Per-course sync statuses use individual premium cards');
assert.match(utilityCss,/px-connection-steps li/,'Live connection diagnostics use accessible step cards');
assert.match(utilityCss,/@media\(max-width:500px\)/,'Utility pages must have a mobile layout');
console.log('PASS exclusive Admin/Courses/Learners navigation; back-forward restoration, modal overlays closed, consolidated premium connection/sync designs');
