/** Regression coverage for course surfaces, visible editor, and single Arena browser. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const text=file=>fs.readFileSync(file,'utf8');
const practice=text('practice.html');
const editorCss=text('assets/styles/public-experience.css');
const js=text('assets/scripts/practice.js');
const coach=text('assets/scripts/learner-companion.js');
const icons=text('assets/scripts/premium-menu-icons.js');
assert(practice.includes('id="practiceDetail"'),'The interactive editor mount is required');
assert(practice.includes('id="practiceList"'),'A single challenge catalogue is required');
assert.equal((practice.match(/id="practiceList"/g)||[]).length,1,'Only one challenge list');
assert.equal((practice.match(/id="challengeModal"/g)||[]).length,1,'Only one challenge browser');
assert(!practice.includes('id="arenaEntryList"'),'No duplicate subject challenge shortlist');
assert(!practice.includes('id="hubMobileFeatured"'),'No duplicate featured challenge selector');
assert(!practice.includes('hub-featured'),'No duplicate featured challenge card');
for(const script of ['assets/scripts/practice.js','assets/scripts/challenge-hub.js','assets/scripts/arena-ide.js','assets/scripts/arena-workspace-visibility.js','assets/scripts/arena-subject-launcher.js','assets/scripts/python-lab.js','assets/scripts/sqlite-bridge.js','assets/scripts/formula-engine.js']) {
 assert(practice.includes(`src="${script}"`),`${script}: editor functionality must stay connected`);
 assert(fs.existsSync(script),`${script}: implementation missing`);
}
assert(js.includes('practiceDetail'),'The grader must populate the editor mount');
assert(editorCss.includes('.ide-content>.arena-task-panel'),'The brief spans the full desktop workspace');
assert(editorCss.includes('.arena-editor'),'The editor is laid out alongside its gutter');
assert(coach.includes('placeLaunch'),'Learning Coach remains reachable');
assert(coach.includes('dalp-tool-grid'),'Coach remains in Study Tools');
assert(icons.includes('dalp-course-option')&&icons.includes('dalp-tool-option'),'Both menu types have icons');
const courses=['introduction','excel','sql','powerbi','python','ai'];
let checked=0;
for(const course of courses){
 for(const suffix of ['', '-roadmap', '-extension']){
  const file=`courses/${course}${suffix}.html`;
  if(!fs.existsSync(file))continue;
  const page=text(file);
  assert(page.includes(`data-ui-course="${course}"`),`${file}: subject theme missing`);
  assert(page.includes('data-learning-subject='),`${file}: subject identity missing`);
  assert(page.includes('public-experience.css'),`${file}: theme CSS missing`);
  checked++;
 }
}
assert(checked>=18,`Expected 18 course and guide pages, found ${checked}`);
let menuPages=0;
for(const folder of ['.','courses']) for(const file of fs.readdirSync(folder).filter(f=>f.endsWith('.html'))){
 const page=text(path.join(folder,file));
 if(!page.includes('class="dalp-global-header"'))continue;
 assert(page.includes('assets/scripts/premium-menu-icons.js'),`${file}: menu icon initializer missing`);
 menuPages++;
}
assert(menuPages>=20,`Expected all public navigation pages, found ${menuPages}`);
console.log(`PASS premium UX restoration: one Arena browser, retained editor/grading, ${checked} course pages, ${menuPages} navigation pages`);
