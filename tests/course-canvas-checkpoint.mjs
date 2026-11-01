import assert from 'node:assert/strict';
import fs from 'node:fs';
const css=fs.readFileSync('assets/styles/course-shared-responsiveness.css','utf8');
const js=fs.readFileSync('assets/scripts/course-checkpoints.js','utf8');
const navigation=fs.readFileSync('assets/scripts/learning-catalog.js','utf8');
assert(!navigation.includes('dlp97-course-resources'), 'Shared sidebar must not create a second roadmap menu');
const courses=['introduction','excel','sql','powerbi','python','ai'];
for(const slug of courses){
 const html=fs.readFileSync(`courses/${slug}.html`,'utf8');
 assert.match(html,slug==='introduction'?/course-page-improvements\.css/:/course-shared-responsiveness\.css/,`${slug}: final shared course design must load`);
 assert.match(html,/course-checkpoints\.js/,`${slug}: mastery questions must be generated`);
 assert.equal((html.match(new RegExp(`href="${slug}-roadmap\\.html"`, 'g'))||[]).length,1,`${slug}: the course must show exactly one roadmap link`);
 assert.match(html,new RegExp(`href="${slug}-roadmap\\.html"`),`${slug}: standalone roadmap must remain linked`);
}
for(const token of ['--course-page-canvas: #f6f8f6', 'background-image: none !important', '.course-mastery-questions', 'columns: 2 480px', 'break-inside: avoid-column','grid-template-columns: repeat(2,minmax(0,1fr))']){
 assert(css.includes(token),`Course design is missing ${token}`);
}
assert(js.includes('class="course-mastery-question"'), 'Mastery question card markup changed unexpectedly');
assert(js.includes('class="course-mastery-options"'), 'Mastery options markup changed unexpectedly');
assert(js.includes('const questions=bank[course]'), 'Question bank must remain active for all tracks');
console.log('PASS unified course backgrounds and responsive full-width mastery cards across six tracks');
