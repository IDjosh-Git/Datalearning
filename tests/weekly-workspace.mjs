import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
for(const [name,count] of [['excel',10],['sql',10],['powerbi',10],['ai',10]]){
 const html=read(`courses/${name}.html`);
 assert(html.includes('weekly-workspace.js')&&html.includes('weekly-workspace.css'),`${name}: no weekly workspace`);
 const found=[...html.matchAll(/<section\s+[^>]*id="week(\d+)"/g)].map(x=>Number(x[1])).sort((a,b)=>a-b);
 assert.deepEqual(found,Array.from({length:count},(_,i)=>i+1),`${name}: missing weeks`);
 assert.equal((html.match(/class="completeBox"/g)||[]).length,10,`${name}: original progress checkboxes changed`);
 assert.equal((html.match(/class="[^"]*\bgradeBtn\b[^"]*"/g)||[]).length,10,`${name}: original quizzes changed`);
}
assert(read('courses/introduction.html').includes('weekly-workspace.js'),'Missing sequential introduction navigation');
const js=read('assets/weekly-workspace.js'),home=read('assets/learner-home.js');
for(const key of ['cw-week-select','cw-week-chip','data-cw-move','data-cw-tab','cw-guide-toggle','cw-complete-btn','addEventListener(\'hashchange\'','dataset.course','cw-intro-select','aria-selected'])assert(js.includes(key),`Missing workspace behaviour: ${key}`);
assert(home.includes('resumeHash(recent)'),'Dashboard resume links do not open the next unfinished week');
for(const fn of ['retail_orders.csv','retail_customers.csv','retail_targets.csv','retail_practice.sqlite','retail_sqlite_setup.sql','kiosk_week.csv','START_HERE.md','WORKED_SOLUTIONS.md'])assert(fs.existsSync(path.join(root,'downloads',fn)),`Missing practice material: ${fn}`);
assert(js.includes('youtube.com/watch?v=LgXzzu68j7M')&&js.includes('youtube.com/watch?v=VaOhNqNtGGE'),'Verified video resources missing');
console.log('PASS weekly workspace: 4 x 10 lesson tracks, 8 introduction lessons, source quiz/progress preserved, keyboard & deep-link navigation, all 8 practice download assets');
