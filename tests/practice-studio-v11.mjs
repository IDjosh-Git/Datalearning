import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const page=read('studio.html');const src=read('assets/course-studio.js');const home=read('index.html');
assert.match(page,/<title>Practice Studio/);assert(page.includes('assets/auth-gate.js'));
for(const course of ['introduction','excel','sql','powerbi','ai']){
 const html=read(`courses/${course}.html`);
 assert(!html.includes('assets/course-studio.js'),`${course} must not inject practice studio into lessons`);
 assert(html.includes('assets/weekly-workspace.js'),`${course} must retain week/lesson navigator`);
 assert(home.includes(`studio.html?course=${course}`),`${course} must have a practice link on course card`);
 assert(src.includes(`course:'${course}'`)===false,'Navigation must not use an unverified generated course array');
}
const weekly=read('assets/weekly-workspace.js');
assert(weekly.includes('cw-studio-promo')&&weekly.includes("'../studio.html?course='+course"));
assert(read('assets/workspace-shell.js').includes("['Practice Studio','studio.html','studio']"));
for(const id of ['ps-course-nav','ps-skill-list','ps-skill-title','ps-answer','ps-complete','ps-reveal','ps-prev','ps-next','ps-search','ps-filter'])assert(page.includes(`id="${id}"`));
assert(src.includes('data-learning-studio-v3:')&&src.includes('data-learning-studio-v2'));
assert(src.includes('dalp:auth-ready')&&src.includes('window.DALP_AUTH_USER'));
assert(read('assets/practice-studio-v11.css').includes('html[data-theme="dark"]'));
assert(page.includes('this is not a downloadable offline course'),'Do not overpromise disconnected course access');
console.log('PASS v11 separate studio, account-scoped local practice, visible per-course links and preserved course navigation');
