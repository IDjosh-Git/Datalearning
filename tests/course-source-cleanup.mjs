/** Maintain one clean course styling architecture without dropping instructional content. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const shared=read('assets/styles/course-shared-responsiveness.css');
assert(shared.includes('Shared responsive player and lesson styling'));
assert(shared.includes('Final course page improvements'),'Responsive and content styles must share a final course layer');
for(const track of ['excel','sql','powerbi','python']){
 const page=read(`courses/${track}.html`);
 const sheets=[...page.matchAll(/<link[^>]+href="\.\.\/assets\/styles\/([^"]+)"[^>]*>/g)].map(x=>x[1]);
 assert.equal(sheets.length,9,`${track} must use exactly 9 purposeful stylesheet layers`);
 assert.equal(new Set(sheets).size,sheets.length,`${track} duplicate stylesheets`);
 assert.equal(sheets.at(-1),'public-motion.css',`${track} theme order`);
 assert(sheets.includes('course-shared-responsiveness.css'),`${track} shared lesson layout missing`);
 assert(sheets.some(x=>x.startsWith('course-foundation-')),`${track} foundation missing`);
 assert(!/<style\b/i.test(page),`${track} obsolete inline course styles`);
 assert(!page.includes('portal-home-btn')&&!page.includes('learner-account-btn'),`${track} unwanted floating nav styling`);
 assert(!page.includes('course-learning-rhythm'),`${track} duplicated study instructions`);
 assert(!page.includes('capstone-path-v74'),`${track} abandoned capstone layer`);
 assert(page.includes('class="course-portal-links"'),`${track} course resources must remain`);
 assert(page.includes('class="sidebar"'),`${track} lesson outline must remain`);
 assert(page.includes('course-sync.js'),`${track} progress sync must remain`);
 assert(page.includes('course-checkpoints.js'),`${track} quizzes/checkpoints must remain`);
 assert(page.includes('class="quiz'),`${track} quizzes must remain`);
}
for(const track of ['ai','introduction']){
 const page=read(`courses/${track}.html`);
 assert(!/<style\b/i.test(page),`${track} must have no old inline presentation layer`);
 assert(page.includes('class="course-portal-links"'));
 assert(page.includes('course-checkpoints.js'));
}
for(const removed of ['course-capstones.css','course-certificate-ui.css']){
 assert(!fs.existsSync(`assets/styles/${removed}`),`${removed}: obsolete standalone layer`);
}
assert(!shared.includes('.course-learning-rhythm{'),'Dead onboarding styles must stay removed');
for(const name of ['course-navigation.css','course-python-overrides.css','course-powerbi-overrides.css','course-ai-content.css']){
 const css=read(`assets/styles/${name}`);
 assert(css.length<80000,`${name}: the duplicate 100KB tail was reintroduced`);
}
console.log('PASS course cleanup: 6 course pages, 9 purposeful stylesheets per player, no repeated inline/floating UI, resource/quiz/progress controls preserved');
