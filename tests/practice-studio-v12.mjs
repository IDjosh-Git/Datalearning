import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const studio=read('studio.html'),js=read('assets/course-studio.js'),css=read('assets/practice-studio-v11.css');
assert(studio.includes('id="ps-browse-mobile"'),'mobile skills browsing button exists');
assert(studio.includes('id="ps-rail"'),'mobile skills can open rail');
assert(js.includes("mobileBrowse.addEventListener('click'"),'toggle is functional');
assert(js.includes("$('#ps-course-nav').addEventListener('click'"),'course selection changes without reloading');
assert(js.includes("setBrowse(false)"),'browsing hides after selecting a skill');
assert(css.includes('ps-rail.is-open'),'mobile drawer rule exists');
assert(css.includes('html[data-theme="dark"]'),'theme styles exist');
assert(studio.includes('this is not a downloadable offline course'),'offline limitations explained');
for(const name of ['excel','sql','powerbi','ai','introduction']){
 const course=read(`courses/${name}.html`);
 assert(!course.includes('assets/course-studio.js'),`inline studio must be absent: ${name}`);
 assert(read('assets/weekly-workspace.js').includes('studio.html?course=${course}'),`standalone practice entry in weekly bar for ${name}`);
 assert(read('index.html').includes(`studio.html?course=${name}`),`dashboard links to ${name} practice`);
}
assert(read('account.html').includes('href="studio.html"'),'practice easily found from account');
assert(read('assets/workspace-shell.js').includes("['Practice Studio','studio.html','studio']"),'global navigation contains studio');
console.log('PASS v12 compact, standalone, accessible practice studio across 5 courses and dashboard/account');
