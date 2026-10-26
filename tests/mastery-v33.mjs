import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const tracks=['sql','excel','powerbi','python','ai'];
const data=JSON.parse(read('curriculum/mastery_content.json'));
assert.deepEqual(Object.keys(data),tracks);
for(const t of tracks){
 assert.equal(data[t].length,10,`${t} modules`);
 const html=read(`courses/${t}.html`);
 assert.equal((html.match(/class="course-mastery"/g)||[]).length,10,`${t} static lessons`);
 assert.equal((html.match(/class="mastery-check"/g)||[]).length,20,`${t} solved knowledge checks`);
 assert.equal((html.match(/class="mastery-trap"/g)||[]).length,0,'CSS class is shared in combined list');
 assert.equal((html.match(/mastery-callout mastery-trap/g)||[]).length,10,`${t} traps`);
 assert.match(html,/mastery-accessibility-v33\.css/);
 for(const [i,mod] of data[t].entries()){
  for(const key of ['title','objective','why','how','example','result','tip','trap','recap'])assert.ok(mod[key]&&mod[key].length>0,`${t} week ${i+1}: ${key}`);
  assert.equal(mod.checks.length,2,`${t} week ${i+1} checks`);
  for(const check of mod.checks)assert.ok(check.question.length>5&&check.solution.length>12);
 }
}
assert.doesNotMatch(read('courses/python.html'),/Applied mastery: SQL|alt="SQL icon"/);
assert.match(read('index.html'),/courses\/python\.html/);
assert.match(read('assets/modern.js'),/python/);
assert.match(read('assets/progress-cloud.js'),/python/);
assert.match(read('assets/theme-editor-v33.css'),/--editor-bg/);
assert.match(read('assets/theme-editor-v33.js'),/autocorrect:'off'/);
assert.doesNotMatch(read('curriculum/MASTER_CURRICULUM_V33.md'),/\{m\[|f\*\*/);
for(const path of ['downloads/mastery_orders.csv','downloads/mastery_orders.sqlite','downloads/MASTERY_DATA_DICTIONARY.md','PYTHON_COURSE_DATABASE_MIGRATION_V33.sql'])assert.ok(existsSync(join(root,path)),path);
const css=read('assets/mastery-accessibility-v33.css');
const colors=[];for(const mode of ['light','dark']){
 const block=(mode==='light'?css.slice(css.indexOf(':root'),css.indexOf('html[data-theme="dark"]')):css.slice(css.indexOf('html[data-theme="dark"]'),css.indexOf('body.dlp-course-v29')));
 const val=k=>{const m=block.match(new RegExp(`--${k}:(#[\\da-fA-F]{6})`));assert.ok(m,`${mode}: ${k}`);return m[1]};
 const luma=h=>{const rgb=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4));return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]};
 const ratio=(a,b)=>{let x=luma(a),y=luma(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
 for(const key of ['editor-text-color','syntax-keyword','syntax-string','syntax-number','syntax-comment','syntax-function','syntax-operator']){
  const r=ratio(val('editor-bg'),val(key));assert.ok(r>=4.5,`${mode}:${key} ${r.toFixed(2)} < WCAG AA`);colors.push({mode,token:key,contrast:Number(r.toFixed(2))});
 }
 for(const key of ['text-primary','text-secondary','link-primary'])assert.ok(ratio(val('surface-primary'),val(key))>=4.5,`${mode}:${key}`);
}
console.log(`Mastery v33 PASS: ${tracks.length} courses, 50 lessons, 100 solved checks, theme AA syntax contrast on ${colors.length} token pairs.`);
console.log('Contrast ratios:',JSON.stringify(colors));
