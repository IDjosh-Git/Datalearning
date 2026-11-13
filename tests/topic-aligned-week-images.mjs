import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
const base=join(process.cwd(),'assets/images/lesson-interfaces');
const courses=['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'];
const titles=new Set();
for(const slug of courses){
 for(let week=1;week<=10;week++){
  const ext=slug==='excel'&&week===1?'png':'svg';
  const f=join(base,`${slug}-week-${week}.${ext}`);
  assert.ok(existsSync(f),`Missing image ${f}`);
  if(ext==='svg'){
   const svg=readFileSync(f,'utf8');
   assert.match(svg,/<svg\s/);
   assert.match(svg,/<\/svg>/);
   assert.match(svg,new RegExp(`WEEK ${String(week).padStart(2,'0')}`));
   assert.match(svg,/LEARNING CHECK/);
   const title=svg.match(/aria-label="([^"]+)"/)?.[1];
   assert.ok(title?.includes('week '+week+':'),`Missing topic alt text ${f}`);
   titles.add(title);
  }
 }
}
assert.equal(titles.size,89);
const app=readFileSync('assets/scripts/academy-app.js','utf8');
assert.match(app,/<h2>\$\{safe\(record\.title\)\}<\/h2>/);
console.log('PASS all 90 weekly images exist, 89 topic-specific diagrams have unique descriptive titles');
