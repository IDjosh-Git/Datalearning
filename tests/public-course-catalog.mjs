import assert from 'node:assert/strict';import fs from 'node:fs';import {restrictedKind} from '../lib/server-auth.js';
const catalog=fs.readFileSync('course-info/catalog.html','utf8');
const slugs=['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'];
assert.equal(restrictedKind('/courses'),'public');assert.equal(restrictedKind('/courses/excel'),'public');
assert.equal(restrictedKind('/courses/excel.html'),'appPage');assert.equal(restrictedKind('/overview.html'),'appPage');
assert.equal(restrictedKind('/assets/scripts/admin-dashboard.js'),'adminAsset');
for(const slug of slugs){assert.match(catalog,new RegExp(`href="/courses/${slug}"`));const page=fs.readFileSync(`course-info/${slug}.html`,'utf8');for(const title of ['What learners will be able to do','Is this course right for you?','Course at a glance','How learning works','Course map','Assessments and progress','Capstone project','Practice data and resources','Support and troubleshooting','FAQs'])assert.ok(page.includes(title),`${slug}: ${title}`);assert.match(page,/<details>/);}
assert.equal((catalog.match(/class="card"/g)||[]).length,9);
console.log('PASS public catalogue, nine course links, shared syllabus and private lesson access');
