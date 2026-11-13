/** Sidebar regression contract: all mobile drawer families share visible Close and safe state. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const privatePages=['account','admin','progress','reviewer','profile','certificate','connection-test','sync-test'];
for(const name of privatePages){
 const html=read(name+'.html');
 assert.match(html,/sidebar-consistency\.css\?v=sidebar-audit-20261110-r1/,`${name}: shared drawer styles missing`);
 assert.match(html,/private-navigation\.js\?v=sidebar-audit-20261110-r1/,`${name}: current drawer controller required`);
}
const shell=read('assets/scripts/private-navigation.js');
for(const required of ['ac-drawer-header','ac-close-label','aria-label\',\'Close workspace navigation','drawerClose.focus','if(e.key===\'Escape\'','backdrop.addEventListener(\'click\',closeMenu)'])assert(shell.includes(required),`Shared protected drawer missing ${required}`);
const common=read('assets/styles/sidebar-consistency.css');
for(const required of ['max-width:1024px','min(360px,calc(100vw - 20px))','.ac-drawer-header','.ac-more-details>summary',':focus-visible','@media(max-width:1050px)','#lessonRailBackdrop:not([hidden])','max-width:780px','.ps-rail-close','prefers-reduced-motion:reduce'])assert(common.includes(required),`Shared sidebar CSS missing ${required}`);
for(const page of ['python','ai']){
 const html=read('courses/'+page+'.html');
 for(const marker of ['id="zaCourseAside"','id="zaAsideOpen"','id="zaAsideClose"','id="zaAsideBackdrop"','course-experience-premium.css','academy-app.js'])assert(html.includes(marker),`${page}: Academy lesson drawer ${marker} missing`);
 assert(!html.includes('course-premium-sidebar.js'),`${page}: obsolete specialist drawer should be removed`);
}
const sharedLesson=read('assets/scripts/academy-app.js');
for(const required of ["open?.addEventListener('click'","close?.addEventListener('click'","event.key==='Escape'","const setAside=show=>","close?.focus()"] )assert(sharedLesson.includes(required),`Modern Academy lesson drawer missing ${required}`);
const studio=read('assets/scripts/course-studio.js');
assert(studio.includes("railClose.setAttribute('aria-label','Close skills list')")&&studio.includes('railClose.addEventListener(\'click\'')&&studio.includes("event.key==='Escape'"),'Studio rail needs labelled close and Escape');
for(const p of ['studio.html','tutor.html','practice.html'])assert.match(read(p),/sidebar-consistency\.css\?v=sidebar-audit-20261110-r1/);
assert(read('practice.html').includes('id="hubClose" type="button"><span aria-hidden="true">&#11212D;</span><span>Close</span>'),'Practice Arena challenge sheet has a labelled Close action');
assert(read('assets/scripts/public-header-unified.js').includes("close.innerHTML='<span aria-hidden"),'All public pages need a labelled navigation close');
assert(read('assets/scripts/learner-companion.js').includes('<span>Close</span>'),'Study Pulse needs a labelled close');
assert(read('assets/styles/public-header-unified.css').includes('Study Pulse follows the same legible mobile close-button convention'));
assert(read('assets/scripts/tutor-workspace.js').includes("closeButton?.addEventListener('click',()=>close(true))"),'Keep existing premium Tutor drawer');
console.log('PASS sidebar consolidation: eight private routes, two native Academy lesson drawers, Studio skills, AI Tutor, public navigation and Study Pulse');
