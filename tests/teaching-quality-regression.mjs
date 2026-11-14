import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const curriculum=fs.readFileSync('assets/scripts/academy-curriculum.js','utf8');
const context={window:{}}; vm.runInNewContext(curriculum,context); vm.runInNewContext(fs.readFileSync('assets/scripts/specialist-course-data.js','utf8'),context); const courses=context.window.DALP_ACADEMY;
assert.equal(courses.length,9);
const app=fs.readFileSync('assets/scripts/academy-app.js','utf8');
const depth=fs.readFileSync('assets/scripts/course-educator-depth.js','utf8');
for(const phrase of ['Show hint','Show solution','Check your work before viewing the solution','Apply the skill to a new situation','If you are stuck','self-paced study']) assert(app.includes(phrase),phrase);
assert(app.indexOf('Show hint')<app.indexOf('Show solution'));
for(const c of courses){
 assert.equal(c.weeks.length,10,c.slug);
 assert(fs.existsSync(`courses/${c.slug}.html`));
 for(const w of c.weeks){for(const k of ['outcome','example','exercise','solution','pitfall']) assert(String(w[k]||'').trim(),`${c.slug} week ${w.week}: ${k}`);}
 assert(depth.includes(`"${c.slug}":[`),`${c.slug}: depth`);
}
console.log('PASS 9 courses / 90 modules: source content, hint-before-solution, success checks, transfer and support');
