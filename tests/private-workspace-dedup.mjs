/** Only protected routes: one menu, one sign-out, no inherited public UI. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const base=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(base,p),'utf8');
const privateRoutes=['admin','progress','reviewer','account','certificate','connection-test','sync-test'];
const inherited=['site.js','modern.js','responsive.js','embedded-palette-sync.js','learning-experience.js','experience.js'];
for(const route of privateRoutes){
 const html=read(`${route}.html`);
 assert.equal((html.match(/src="assets\/scripts\/private-navigation\.js(?:\?v=[^\"]+)?"/g)||[]).length,1,`${route}: one nav component`);
 assert.match(html,/data-private-workspace="true"/,`${route}: protected marker`);
 assert.match(html,/auth-gate\.js/,`${route}: identity check retained`);
 for(const name of inherited)assert(!html.includes(`src="assets/scripts/${name}"`),`${route}: redundant public script ${name}`);
 assert(!html.includes('ac-mobile-tabs'),`${route}: no duplicate tabs`);
}
const nav=read('assets/scripts/private-navigation.js');
for(const url of ['admin.html','admin.html#admin-courses','progress.html','reviewer.html','account.html','catalog.html','index.html','connection-test.html','sync-test.html']){
 assert(nav.includes(`'${url}'`)||nav.includes(`href=\\"${url}\\"`)||nav.includes(`href="${url}"`),`Private nav route missing: ${url}`);
 const clean=url.split('#')[0];assert(fs.existsSync(path.join(base,clean)),`${url} destination missing`);
}
assert(nav.includes('ac-admin-more-details')&&nav.includes('data-admin-only'),'Admin diagnostics available only via an expandable admin section');
assert(nav.includes('group.hidden=!admin')&&nav.includes("window.DALP_ROLE==='admin'"),'No learner exposure of admin links');
assert(nav.includes('ac-mobile-menu')&&nav.includes("e.key==='Escape'"),'Accessible single mobile drawer');
assert.equal((nav.match(/className='ac-logout'/g)||[]).length,1,'One sign-out control per private workspace');
const account=read('account.html');
assert(!account.includes('id="logout"'),'Duplicate account sign-out was removed');
assert(!account.includes('id="instructorAccess"'),'Duplicated administrator instructions were removed');
assert(account.includes('<summary>Course completion guide</summary>'),'Expanded help remains on demand');
for(const id of ['accountSyncStatus','quizBody','certBody','accountCapstones'])assert(account.includes(`id="${id}"`),`Learner data unchanged: ${id}`);
const css=read('assets/styles/private-workspace.css');
assert(css.includes('overflow-y:auto')&&css.includes('box-sizing:border-box'),'Sidebar overlap/overflow fix');
assert(read('assets/styles/account.css').includes('.course-progress-grid>.progress-card{height:auto'),'No overlapping account cards');
console.log('PASS seven streamlined private pages; no duplicate controls/scripts; all role-aware links valid; accessible diagnostic menu and protected user data');
