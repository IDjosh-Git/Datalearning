import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=x=>fs.readFileSync(path.join(root,x),'utf8');
const names=['introduction','excel','sql','powerbi','ai'];
const css=read('assets/course-system-v17.css');
const script=read('assets/course-checkpoints.js');
const workspace=read('assets/weekly-workspace.js');
assert(css.includes('html[data-theme="light"]')&&css.includes('html[data-theme="dark"]'),'Missing theme tokens');
assert(css.includes('max-width:900px!important'),'Mastery layout unconstrained');
assert(css.includes('.course-mastery-option')&&css.includes('.quiz:not(.intro-quiz)'),'Assessment styles missing');
assert(script.includes("anchor=main.querySelector('.content')||main.querySelector('.course-wrap')||main"),'Checkpoint not placed in course container');
assert(script.includes("grid.insertAdjacentElement('afterend',shell)"),'Intro checkpoint is not aligned');
assert(workspace.includes("!n.classList.contains('course-mastery-wrap')"),'Navigator may hide checkpoint');
assert(workspace.includes('href="#course-mastery-checkpoint"'),'Mastery shortcut is missing');
for(const name of names){
 const html=read(`courses/${name}.html`);
 assert.equal(html.split('course-system-v17.css?v=20261022.17').length-1,1,`${name}: missing/duplicated stylesheet`);
 assert.equal(html.split('course-checkpoints.js?v=20261022.17').length-1,1,`${name}: missing/duplicated checkpoint logic`);
 assert(html.indexOf('course-system-v17.css')>html.indexOf('theme-navigation-v16.css'),`${name}: new theme layer not last`);
 assert(html.includes('weekly-workspace.js'),`${name}: weekly lesson navigator removed`);
 assert(html.includes('theme-control-v14.js'),`${name}: theme switch removed`);
 if(name!=='introduction'){
  assert.equal((html.match(/class="quiz(?:\s[^"]*)?"/g)||[]).length,10,`${name}: missing weekly knowledge quizzes`);
  assert.equal((html.match(/data-answer="[a-z]"/g)||[]).length,50,`${name}: expected 50 graded weekly questions`);
 }else{
  assert(html.includes('id="introQuiz"')&&html.includes('data-lesson="8"'),'Introduction knowledge check/lessons missing');
 }
}
const ids={};
for(const name of names){
 const html=read(`courses/${name}.html`);
 const found=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 const duplicates=found.filter((id,i)=>found.indexOf(id)!==i);
 assert.equal(duplicates.length,0,`${name}: duplicate IDs ${duplicates.join(', ')}`);
 ids[name]=found.length;
}
console.log('PASS v17 course consistency: 5 tracks, 4×10 weekly quizzes (200 questions), 8 intro lessons, versioned shared theme, bounded mastery, quiz integration and direct learning route');
