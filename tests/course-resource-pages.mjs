/** Functional integrity regression for course plans, extensions and checkpoint banks. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const ROOT=process.cwd();
const read=file=>fs.readFileSync(path.join(ROOT,file),'utf8');
const slugs=['introduction','excel','sql','powerbi','python','ai'];
const text=read('assets/scripts/course-checkpoints.js');
const start=text.indexOf('const bank='),end=text.indexOf('const course=');
assert(start>=0 && end>start,'Checkpoint bank and additions must exist');
const bank=JSON.parse(vm.runInNewContext(`(()=>{${text.slice(start,end)} return JSON.stringify(bank)})()`));
for(const slug of slugs){
 const course=read(`courses/${slug}.html`);
 assert.match(course,new RegExp(`href="${slug}-roadmap\\.html"`),`${slug}: visible roadmap link absent`);
 assert.match(course,new RegExp(`href="${slug}-extension\\.html"`),`${slug}: visible extension link absent`);
 assert(course.includes('dalp-course-resource-links'),`${slug}: resource links must appear near the course heading`);
 assert(!course.includes('class="cv88-roadmap"'),`${slug}: long module roadmap still occupies the course page`);
 assert(!course.includes('class="cv88-map'),`${slug}: course preparation moved to roadmap page`);
 assert(!course.includes('class="dlp29-guide'),`${slug}: legacy milestone panel remains on course page`);
 assert(!course.includes('class="course-map'),`${slug}: inline course map remains on lesson page`);
 assert(!course.includes('id="applied-mastery"'),`${slug}: expanded applied curriculum still occupies the course page`);
 const roadmap=read(`courses/${slug}-roadmap.html`),extension=read(`courses/${slug}-extension.html`);
 for(const [name,html] of [['roadmap',roadmap],['extension',extension]]){
  assert(html.includes('data-theme="light"'),`${slug} ${name}: light-only guide missing`);
  assert(html.includes('course-guide-pages.css'),`${slug} ${name}: responsive guide CSS missing`);
  assert(html.includes(`href="${slug}.html`),`${slug} ${name}: cannot return to course`);
  assert(html.includes('href="#main-content"'),`${slug} ${name}: missing skip link`);
  const refs=[...html.matchAll(/href="([^"#]+\.html)#([^"]+)"/g)];
  for(const [,file,fragment] of refs){
   if(fragment==='course-mastery-checkpoint')continue; // This target is created on DOM ready.
   const htmlFile=read('courses/'+file);
   assert(htmlFile.includes(`id="${fragment}"`),`${slug} ${name}: broken deep link ${file}#${fragment}`);
  }
 }
 assert(roadmap.includes('guide-modules')||roadmap.includes('Learn it'),`${slug}: learning plan missing module details`);
 assert(roadmap.includes('guide-brief-content'),`${slug}: prior course brief must be preserved on roadmap page`);
 assert(extension.includes('dlp-module'),`${slug}: extension needs practical learning activities`);
 assert.equal(bank[slug]?.length,10,`${slug}: expected ten mastery questions`);
 for(const [i,q] of bank[slug].entries()){
  assert.equal(q.length,4,`${slug} Q${i+1}: incomplete item`);
  assert.equal(q[1].length,4,`${slug} Q${i+1}: four answer options required`);
  assert.equal(new Set(q[1]).size,4,`${slug} Q${i+1}: duplicate answers`);
  assert(Number.isInteger(q[2]) && q[2]>=0 && q[2]<4,`${slug} Q${i+1}: invalid answer key`);
  assert(q[3].length>35,`${slug} Q${i+1}: missing explanation`);
 }
}
assert(!read('practice.html').includes('class="pc-brand-strip"'),'Practice hero badges should be removed');
assert(text.includes("location.hash==='#course-mastery-checkpoint'"),'Deep-linked mastery checkpoint must scroll after render');
const css=read('assets/styles/course-page-improvements.css');
assert(css.includes('repeat(2,minmax(0,1fr))'),'Desktop checkpoint must use available width');
assert(css.includes('max-width:100%!important'),'Checkpoint width must not be locked to 900px');
const pagesCSS=read('assets/styles/course-guide-pages.css');
assert(pagesCSS.includes('prefers-reduced-motion'),'Standalone guide must respect reduced-motion preferences');
assert(!read('assets/scripts/learning-catalog.js').includes('dlp97-outline-row'), 'Old tall JavaScript roadmap is still injected');
assert(read('assets/scripts/learning-catalog.js').includes('dalp-quick-guide-links'), 'Compact roadmap navigation missing');
console.log('PASS 12 linked study-guide pages; six compact course resource menus; 60 mastery questions; responsive checkpoint and Arena header.');
