/** Administrator visual architecture regression (preserves the real auth/data paths). */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const routes=['admin.html','reviewer.html','progress.html'];
const nav=read('assets/scripts/private-navigation.js');
const skin=read('assets/styles/admin-workspace.css');
for(const route of routes){
 const html=read(route);
 assert.match(html,/data-private-workspace="true"/,`${route}: role-gated page`);
 assert.match(html,/assets\/scripts\/auth-gate\.js/,`${route}: auth gate`);
 assert.match(html,/assets\/scripts\/private-navigation\.js/,`${route}: one private navigation`);
 assert.match(html,/assets\/styles\/admin-workspace\.css/,`${route}: shared premium skin`);
 assert(!html.includes('admin-premium.css'),`${route}: no redundant second admin skin`);
}
for(const href of ['admin.html#admin-learners','admin.html#admin-courses','admin.html#admin-assessments','reviewer.html','progress.html'])
 assert(nav.includes(href),`Missing admin destination: ${href}`);
for(const key of ['adminPendingHero','adminPending','adminSearch','adminExport','adminLearnerRows','adminCourseCards','adminLearnerDetail'])
 assert(read('admin.html').includes(`id="${key}"`),`Admin data control missing: ${key}`);
assert(read('assets/scripts/admin-dashboard.js').includes("$('adminPendingHero').textContent=pendingCount"),'Hero pending count must reflect live records, not mock numbers');
for(const fragment of ['.ac-command-hero','.ac-admin-actions','.ac-admin-capstone','.review-shell','.ac-mobile-menu','prefers-reduced-motion:reduce'])
 assert(skin.includes(fragment),`Admin V6 styles missing ${fragment}`);
assert(skin.includes('@import url("./private-workspace.css")'),'Retain shared protected workspace');
for(const id of ['reviewSearch','reviewCourse','reviewFilter','reviewList','reviewSelected','gradingFields','publishReview','reviewForm'])
 assert(read('reviewer.html').includes(`id="${id}"`),`Review workflow missing ${id}`);
for(const id of ['progressLearner','progressCourse','progressStatus','progressBody','refreshProgress','learnerDetail'])
 assert(read('progress.html').includes(`id="${id}"`),`Progress workflow missing ${id}`);
const cap=read('capstone.html'), guide=read('capstone-guide.html'), cs=read('assets/styles/capstone-premium.css');
for(const id of ['capstoneForm','evidenceInput','submitCapstone','reviewStatus','certificateControls','certificatePaper','courseProgress'])
 assert(cap.includes(`id="${id}"`),`Capstone learner workflow missing ${id}`);
assert(cap.includes('cap-hero-card'),'Capstone page needs visible learning pathway');
for(const page of [cap,guide])assert(page.includes('assets/styles/capstone-premium.css'),'Capstone page missing new responsive visual layer');
for(const query of ['max-width:760px','max-width:380px','prefers-reduced-motion:reduce','cap-hero-layout','cap-track-picker'])
 assert(cs.includes(query),`Capstone responsive CSS missing ${query}`);
console.log('PASS admin V6: role-safe navigation, live metrics, accessible review, progress, learner capstone, responsive premium styling.');
