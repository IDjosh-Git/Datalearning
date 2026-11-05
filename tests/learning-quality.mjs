/** Semantic teaching-content and interaction affordance checks for every learning track. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let tables=0,examples=0;
for(const course of ['introduction','excel','sql','powerbi','python','ai']){
 const html=fs.readFileSync(path.join(ROOT,'courses',course+'.html'),'utf8');
 const expected=course==='introduction'?8:10;
 const chunks=[...html.matchAll(/<section\b[^>]*class="learning-clarity(?: learning-intro-clarity)?"[^>]*>([\s\S]*?)<\/section>/g)].map(x=>x[1]);
 assert.equal(chunks.length,expected,course+': all units must have teaching tables');
 for(const [index,chunk] of chunks.entries()){
  assert.match(chunk,/<table class="learning-table">/,course+' module '+(index+1)+' missing semantic table');
  assert.match(chunk,/<caption>[^<]+<\/caption>/,course+' module '+(index+1)+' missing table caption');
  assert.match(chunk,/<thead>[\s\S]*scope="col"/,course+' module '+(index+1)+' missing column scope');
  assert.equal((chunk.match(/scope="row"/g)||[]).length,3,course+' module '+(index+1)+' needs three explained concepts');
  assert.equal((chunk.match(/<td>/g)||[]).length,6,course+' module '+(index+1)+' needs six substantive cells');
  assert.match(chunk,/role="region" tabindex="0"/,course+' module '+(index+1)+' table keyboard scroll');
  if(course!=='introduction'){
   assert.match(chunk,/class="learning-scenario-task"/,course+' missing independent application');
   assert.match(chunk,/class="learning-result"/,course+' missing verification');
   assert.match(chunk,/class="learning-caution"/,course+' missing pitfall guidance');
   assert.match(chunk,/<summary>Reveal the verification guide<\/summary>/,course+' check needs learner-controlled reveal');
   examples++;
  }
  tables++;
 }
 assert.match(html,/assets\/styles\/design-system\.css/,course+' missing shared responsive presentation');
 assert.match(html,/assets\/scripts\/experience\.js/,course+' missing accessible navigation enhancements');
}
assert.equal(tables,58);assert.equal(examples,50);
const stylesheet=fs.readFileSync(path.join(ROOT,'assets/styles/design-system.css'),'utf8');
for(const term of ['prefers-reduced-motion:reduce','forced-colors:active','@media(max-width:680px)','@media(max-width:900px)','learning-table-scroll'])assert(stylesheet.includes(term),term+' missing');
console.log('PASS teaching quality: 58 semantic tables, 174 explained concepts, 50 guided practice and verification panels, keyboard scrolling, reduced-motion support.');
