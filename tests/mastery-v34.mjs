import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const courses=['sql','excel','powerbi','python','ai'];
const json=JSON.parse(read('curriculum/mastery_content_v34.json'));
const workspace=read('assets/weekly-workspace.js');
const curriculum=read('MASTER_CURRICULUM_V34.md');
const curriculumSource=read('curriculum/MASTER_CURRICULUM_V34.md');
assert.equal(curriculum,curriculumSource,'Root and curriculum teaching guides stay in sync');
assert.equal((curriculum.match(/\*\*Solved checks:\*\*/g)||[]).length,50,'One solved-check section per week');
assert.doesNotMatch(curriculum,/^\s*\d+\. question\s*$/m,'Solved checks are not placeholders');
assert.doesNotMatch(curriculum,/\*\*Solution:\*\* solution/i,'Solved answers are not placeholders');
assert.match(workspace,/python:'Python for Data Analytics'/);
assert.match(workspace,/python:\{main:\['Download Python practice CSV'/);
for(const c of courses){
 const html=read(`courses/${c}.html`);
 assert.equal((html.match(/class="mastery-deep-dive"/g)||[]).length,10,`${c}: one rich explanation per week`);
 assert.equal((html.match(/class="v34-action-steps"/g)||[]).length,10,`${c}: three-step lessons`);
 assert.equal((html.match(/class="v34-independence"/g)||[]).length,10,`${c}: independent mini-tasks`);
 assert.equal((html.match(/class="mastery-check"/g)||[]).length,20,`${c}: original worked questions kept`);
 assert.match(html,/weekly-mastery-v34\.css/);
 assert.equal(json[c].length,10,`${c} weeks`);
 for(const entry of json[c]){
  assert.equal(entry.guided_steps.length,3,`${c}: ordered three-step walkthrough`);
  for(const f of ['simple_explanation','how_to_read_the_result','independent_practice'])assert.ok(entry[f].length>40,`${c} ${entry.title}: ${f}`);
  assert.equal(entry.checks.length,2,`${c} ${entry.title}: two worked checks`);
  for(const check of entry.checks){
   assert.ok(check.question.trim().length>0&&!/^(question|placeholder)$/i.test(check.question.trim()),`${c} ${entry.title}: check question`);
   assert.ok(check.solution.trim().length>20,`${c} ${entry.title}: worked solution`);
  }
 }
}
const py=read('courses/python.html');
assert.equal((py.match(/class="guided-lab v34-guided-lab"/g)||[]).length,10);
assert.equal((py.match(/class="quiz v34-python-quiz"/g)||[]).length,10);
assert.equal((py.match(/class="question" data-answer="[abc]"/g)||[]).length,30);
assert.ok(existsSync(join(root,'downloads/PYTHON_GETTING_STARTED_V34.md')));
console.log('PASS v34 curriculum: 50 guided modules, 150 ordered walkthrough steps, 50 independent tasks, 100 solved checks, Python 10 labs and 30 scored quiz items.');
