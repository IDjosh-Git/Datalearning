import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(p,'utf8');
const tracks=['introduction','excel','sql','powerbi','python','ai'];
const theme=read('assets/styles/public-experience.css');
for(const c of tracks){
 for(const suffix of ['','-roadmap','-extension']){
  const f=`courses/${c}${suffix}.html`,html=read(f);
  assert(html.includes('data-premium-course-v7="true"'),`${f} missing premium contract`);
  assert(html.includes(`data-course-theme="${c}"`),`${f} missing course palette`);
  assert(html.includes('assets/styles/public-experience.css'),`${f} needs final visual sheet`);
  if(!suffix)assert(html.includes('assets/scripts/course-reading-tables.js'),`${f} missing accessible table enhancement`);
 }
}
assert(theme.includes('Premium Course Reading Experience V7'));
for(const required of ['.dalp-lesson-next','.learning-table-scroll','.guide-block','.intro-lesson','.dalp-next-primary','prefers-reduced-motion','--pc-tint'])assert(theme.includes(required),`missing ${required}`);
const tabler=read('assets/scripts/course-reading-tables.js');
assert(tabler.includes('aria-label') && tabler.includes('tabIndex=0') && tabler.includes('Swipe to view more columns'));
assert(!read('assets/styles/design-system.css').includes('body :is(.learning-table,.ip-table,.dalp-admin-table,.account-table){min-width:max-content;white-space:nowrap}'), 'course tables must not be forced nowrap');
console.log('Premium course layout V7: 18 pages, six identities, accessible tables and compact next-step panel verified.');
