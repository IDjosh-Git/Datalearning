import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const nav=read('assets/scripts/private-navigation.js');
const primary=nav.split('const adminNav=')[1]?.split('const adminMoreNav=')[0];
const secondary=nav.split('const adminMoreNav=')[1]?.split('const adminPages=')[0];
assert(primary,'Primary administration routes must exist');
assert.match(primary,/\['Learners & Progress','admin\.html#admin-learners','learners'\]/,'One unified admin directory and progress page in the sidebar');
assert.match(primary,/\['Courses analysis','admin\.html#admin-courses','courses'\]/,'Course intelligence is still available independently');
assert(!primary.includes("'Progress reports'"),'Old progress-report duplicate removed');
assert(!secondary.includes("'Progress reports'"),'Old admin link removed from more-tools');
assert(nav.includes("hash==='#admin-learners'")&&read('admin.html').includes('id="admin-learners"'),'Unified admin page exists');
assert(nav.includes("h==='#admin-learners'?'learners'"),'Learners section is actively selected when opened');
const admin=read('admin.html');
assert(!admin.includes('href="progress.html"'),'No retired destination in admin shortcuts');
assert.match(admin,/id="adminRole"/,'Admin and learner role filter included');
assert.match(admin,/ac-roster-summary/,'Compact verified account overview included');
assert(nav.includes("className='ac-side-identity'"),'Shared sidebar shows verified role and email');
const css=read('assets/styles/private-experience-v3.css');
for(const marker of [
 '.ac-sidebar .ac-side-nav a.ac-side-link:is(:hover,:focus-visible,.ac-selected,[aria-current="page"])',
 '.ac-sidebar .ac-side-nav .ac-more-details>summary:is(:hover,:focus-visible)',
 '.ac-sidebar .ac-side-account:is(:hover,:focus-visible,.ac-selected)',
 '.ac-page-area .ac-hero-secondary',
 'background:#edf7f0!important', 'color:#173e51!important', '-webkit-text-fill-color:#173e51!important',
 'transition:transform .15s ease,box-shadow .15s ease!important'
])assert(css.includes(marker),`Private hover fix missing ${marker}`);
for(const file of ['admin','account','progress','reviewer','profile','certificate','connection-test','sync-test']){
 const html=read(`${file}.html`);
 assert(html.includes('private-navigation.js?v=sidebar-audit-20261110-r1'),`${file}: new sidebar JS cache version`);
 assert(html.includes('private-experience-v3.css?v=sidebar-20261110-r6'),`${file}: new contrast CSS cache version`);
 assert(html.includes('auth-gate.js'),`${file}: protected route retained`);
}
console.log('PASS Administration has one unified Learners & Progress destination and account identity in the sidebar, with shared responsive styles');
