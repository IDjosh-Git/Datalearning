/** Verify 90 progressive courses, instructional depth, visual examples and capstone readiness. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const modules=JSON.parse(read('assets/data/ten-week-tool-to-report.json'));
const ordered=['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'];
assert.deepEqual(Object.keys(modules).sort(),ordered.slice().sort());
const ctx={window:{}};
vm.runInNewContext(read('assets/scripts/week-learning-resources.js'),ctx);
const media=ctx.window.DALP_WEEK_MEDIA;
const curriculum=JSON.parse(read('assets/data/academy-curriculum.json'));
let count=0, words=0;
for(const slug of ordered){
 const weeks=modules[slug];assert.equal(weeks.length,10,`${slug} requires a 10-week progression`);
 const first=weeks[0].title.toLowerCase();assert(/workspace|environment|interface|databases|python|tools|finding|discovering|analyst/.test(first),`${slug} must orient tool beginners`);
 assert.match(weeks[7].title.toLowerCase(),/dashboard|report|layout|reporting|planning/,`${slug} week 8 should teach report/dashboard building`);
 assert.match(weeks[8].title.toLowerCase(),/present|report|optimis|review|pipeline|publish|story|explain|writing|reading|hypothesis/,`${slug} week 9 should teach communication / handover`);
 assert.match(weeks[9].title.toLowerCase(),/capstone|portfolio/,`${slug} week 10 must be a project`);
 assert.equal(media[slug].length,10);
 const page=read(`courses/${slug}.html`);
 for(const resource of ['ten-week-tool-to-report-data.js','ten-week-masterclass.js','ten-week-masterclass.css'])assert(page.includes(resource),`${slug}: missing masterclass resource ${resource}`);
 for(const m of weeks){
  assert.equal(m.slug,slug);assert.equal(m.topics.length,4);
  assert.equal(m.guide.steps.length,4);
  const copy=[m.guide.concept,m.guide.reason,m.guide.case,m.guide.verify,...m.guide.steps,m.where,m.business,m.task,m.check,m.worked,...m.topics.map(t=>t.explanation)].join(' ');
  const size=copy.split(/\s+/).filter(Boolean).length;assert(size>=540,`${slug} ${m.week}: too shallow (${size} words)`);
  words+=size;
  assert.equal(media[slug][m.week-1].week,m.week);
  const worksheet=read(`downloads/weekly/${slug}-week-${String(m.week).padStart(2,'0')}.md`);
  assert(worksheet.includes(m.title));assert(worksheet.includes(m.task));assert(worksheet.includes(m.check));
  const download=path.join(root,'downloads',media[slug][m.week-1].dataset);
  assert(fs.existsSync(download),`${slug} ${m.week}: missing downloadable dataset`);
  if([8,9,10].includes(m.week)){
   const ext=m.week===9?'report-storyboard':'dashboard-wireframe';
   assert(fs.existsSync(path.join(root,`assets/images/dashboard-samples/${slug}-${ext}.svg`)));
  }
  if(m.week===10){
   assert(worksheet.includes(`capstone.html?course=${slug}`));
   assert(worksheet.includes('70/100'));
  }
  count++;
 }
 if(['python','ai'].includes(slug)){
  assert(read(`assets/scripts/week10-capstone-${slug}.js`).includes('DALP_REBUILT_CAPSTONE'),`${slug}: no duplicate Week 10 brief`);
 }
}
assert.equal(count,90);
for(const original of curriculum){
 assert(original.weeks.every((w,i)=>w.title===modules[original.slug][i].title));
 assert(original.weeks.every(w=>w.questions.length>=4));
}
for(const slug of ['python','ai'])assert(read('capstone.html').includes(`data-course="${slug}"`),`Missing capstone chooser ${slug}`);
const renderer=read('assets/scripts/ten-week-masterclass.js');
for(const x of ['renderCore','renderCapstone','specialists','dlm-layout-sample','capstone.html?course=','70/100'])assert(renderer.includes(x));
const css=read('assets/styles/ten-week-masterclass.css');
for(const x of ['@media(max-width:540px)','dlm-topic-grid','dlm-capstone','dlm-image-top','focus-visible'])assert(css.includes(x));
console.log(`PASS: ${count} rewritten 10-week modules, ~${Math.round(words/count)} instructional words/week, 90 worksheets and datasets, 18 dashboard/report images, 9 capstone routes and preserved identifiers`);
