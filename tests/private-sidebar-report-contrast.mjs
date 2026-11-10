import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const nav=read('assets/scripts/private-navigation.js');
const primary=nav.split('const adminNav=')[1]?.split('const adminMoreNav=')[0];
const secondary=nav.split('const adminMoreNav=')[1]?.split('const adminPages=')[0];
assert(primary,'Primary administration routes must exist');
assert.match(primary,/\['Progress reports','progress\.html','progress'\]/,'Progress reports must be a primary Administration route');
assert(!primary.includes("'Student management'"),'Student management must not duplicate progress in the sidebar');
assert(!secondary.includes("'Progress reports'"),'Progress reports must not be repeated in secondary tools');
assert(!nav.includes("'admin.html#admin-learners','learners'"),'Learner directory is not a sidebar item');
assert(nav.includes("hash==='#admin-learners'")&&read('admin.html').includes('id="admin-learners"'),'Admin Overview retains accessible student management drill-down');
assert(nav.includes("const active=current==='overview'?(h==='#admin-courses'?'courses':'overview')"),'Overview remains selected when accessed through its directory shortcut');
assert(!nav.includes("'progress'].includes(current)"),'Primary Progress reports should not force the admin tools accordion open');
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
console.log('PASS Administration has one primary Progress Reports destination, no duplicate Learners item, accessible student-directory drill-down and shared contrast-safe hover styling on all eight private pages');
