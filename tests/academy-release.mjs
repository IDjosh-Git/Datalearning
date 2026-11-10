/** Seven-course Academy release checks. Zero network dependency. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const paths=JSON.parse(read('assets/data/academy-curriculum.json'));
const slugs=['introduction','excel','sql','powerbi','tableau','powerquery','statistics'];
assert.deepEqual(paths.map(p=>p.slug),slugs);
assert.equal(paths.length,7);
const counts={weeks:0,questions:0};
for(const p of paths){
 assert.equal(p.weeks.length,10,`Ten weeks expected for ${p.slug}`);
 assert(p.tagline.length>35);
 assert(fs.existsSync(path.join(root,'courses',p.slug+'.html')),`${p.slug} route missing`);
 const html=read('courses/'+p.slug+'.html');
 assert(html.includes(`data-course="${p.slug}"`));
 assert(html.includes('zaLessonActions')&&html.includes('zaWeekList')&&html.includes('zaAsideClose'));
 assert(html.includes('floating-learning-ai.js')&&html.includes('progress-cloud.js'));
 for(const [i,w] of p.weeks.entries()){
  assert.equal(w.week,i+1,`${p.slug} week sequence`);
  for(const k of ['title','outcome','example','exercise','solution','pitfall'])assert(w[k].length>=(k==='solution'?1:8),`${p.slug} week${i+1} missing ${k}`);
  assert(w.questions.length>=3,`${p.slug} week${i+1} needs quiz questions`);
  for(const q of w.questions){
   assert(q.q.length>=8 && q.why.length>=10);
   assert(q.choices.length>=3 && q.choices.every(c=>c.length>0));
   assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.choices.length);
   counts.questions++;
  }
  counts.weeks++;
 }
}
assert.equal(counts.weeks,70);assert(counts.questions>=250);
const rootPages=['index.html','catalog.html','quiz.html','overview.html'];
for(const f of rootPages){
 const source=read(f);
 for(const s of ['assets/styles/academy.css','assets/scripts/academy-app.js','assets/scripts/academy-curriculum.js','assets/scripts/progress-cloud.js','assets/scripts/floating-learning-ai.js','assets/scripts/supabase-client.js']) assert(source.includes(s),`${f} missing ${s}`);
 assert(source.includes('zaMenuClose'),`${f} missing close button`);
}
const js=read('assets/scripts/academy-app.js');
for(const expected of ['saveWeek(slug,week,true)','quiz_results','mastery_results','Questions to Try','aria-expanded','role="group"']) assert(js.includes(expected),`Academy integration missing ${expected}`);
assert(js.includes('escape')||js.includes('safe'));
for(const s of slugs){
 assert(read('assets/scripts/progress-cloud.js').includes(s+':'),`Progress cloud missing ${s}`);
 assert(read('assets/scripts/capstone.js').includes(s+':'),`Capstone missing ${s}`);
 assert(read('capstone.html').includes(`data-course="${s}"`),`Capstone selector missing ${s}`);
}
assert(read('assets/styles/academy.css').includes('100dvh'));
assert(read('assets/styles/academy.css').includes('prefers-reduced-motion'));
assert(read('database/migrations/seven_path_academy_20261110.sql').includes('ENABLE ROW LEVEL SECURITY'));
for(const f of ['assets/scripts/academy-app.js','assets/scripts/academy-curriculum.js','assets/scripts/progress-cloud.js','assets/scripts/capstone.js']) execFileSync(process.execPath,['--check',path.join(root,f)],{stdio:'pipe'});
console.log(`✓ Seven paths, ${counts.weeks} modules, ${counts.questions} practice questions; all essential routes and integrations verified.`);
