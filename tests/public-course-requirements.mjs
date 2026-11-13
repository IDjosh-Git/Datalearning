import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const slugs=['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'];
const catalog=read('course-info/catalog.html');
assert.equal((catalog.match(/class="card"/g)||[]).length,9);
for(const slug of slugs){
 assert.match(catalog,new RegExp(`href="/courses/${slug}"`));
 const html=read(`course-info/${slug}.html`);
 for(const heading of ['Course facts','What learners will be able to do','Is this course right for you?','Course at a glance','How learning works','Course map','Weekly learning activities','Assessments and progress','Capstone project','Practice data and resources','Support and troubleshooting','FAQs']) assert.ok(html.includes(heading),`${slug}: ${heading}`);
 assert.equal((html.match(/class="week"/g)||[]).length,10,`${slug}: ten weekly activities`);
 for(const item of ['Learning outcome:','Estimated time:','Hands-on task','Success criteria','Hint: where to start','Worked example and explanation','If you get stuck:','Connection to the final project:']) assert.ok(html.includes(item),`${slug}: ${item}`);
 assert.ok(!html.includes('externally accredited'),`${slug}: accreditation claim`);
}
const home=read('index.html');
assert.ok(home.includes('<b>09</b> guided learning paths'));
assert.ok(!home.includes('instructor review and a verified certificate'));
console.log('PASS public catalogue, nine syllabus structures, practice scaffolding, count and certificate caution');
