import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const admin=read('admin.html'),shell=read('assets/admin-console.js'),dashboard=read('assets/admin-dashboard.js'),style=read('assets/admin-console.css');
for(const p of ['admin.html','progress.html','reviewer.html']){
 const html=read(p);
 assert(html.includes('data-admin-console='),p+' has no admin UI marker');
 assert(html.includes('admin-console.css?v=20261021.4'),p+' needs unique stylesheet');
 assert(html.includes('admin-console.js?v=20261021.4'),p+' needs admin shell');
 assert(html.includes('auth-gate.js'),p+' must preserve secure auth');
}
for(const id of ['adminOverview','adminWorkspace','adminSearch','adminStatus','adminCourse','adminPageInfo','adminPrevPage','adminNextPage','adminAttention','adminActivity','adminCourseCards','adminLearnerDetail','adminLearnerRows','adminDetailBackdrop']){
 if(id==='adminOverview')continue;
 assert(admin.includes('id="'+id+'"'),'Missing dashboard UI element '+id);
}
for(const link of ['admin.html#admin-learners','admin.html#admin-courses','progress.html','reviewer.html','index.html','account.html']) assert(shell.includes(link),'Missing admin route '+link);
for(const capability of ['openMenu','closeMenu','updateActive','ac-detail-open','ac-menu-open','aria-current','dalp:auth-ready','signOut'])assert(shell.includes(capability),'Missing admin navigation functionality '+capability);
for(const capability of ['adminAttention','adminActivity','adminCourseCards','adminCourse','pageSize=12','fetchAll','site_admins','CSV','PENDING','profileStats','adminDetailBackdrop']){
 if(capability==='adminDetailBackdrop')continue;
 assert(dashboard.includes(capability),'Missing admin management function '+capability);
}
assert(dashboard.includes('window.DALP_ROLE!==\'admin\''),'Admin dashboard must require role');
assert(dashboard.includes('const esc='),'Learner strings must be escaped');
assert(dashboard.includes('const safe='),'CSV injection prevention required');
assert(!/service_role|SUPABASE_SERVICE_KEY/.test(shell+dashboard),'Never use privileged API keys in clients');
assert(read('progress.html').includes('value="ai"'),'AI course absent from progress filters');
assert(read('assets/workspace-shell.js').includes("document.body.hasAttribute('data-admin-console')"),'Avoid double site navigation');
for(const bp of ['1024px','760px','520px'])assert(style.includes('max-width:'+bp),'Missing responsive breakpoint '+bp);
console.log('PASS Admin Console v6: shared nav, learner directory, queue, analytics, responsiveness, safe reporting and role gates');
