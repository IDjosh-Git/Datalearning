import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(process.cwd());const read=x=>fs.readFileSync(path.join(root,x),'utf8');
const ai=read('courses/ai.html');
for(let i=1;i<=10;i++){
  const beg=ai.indexOf('id="week'+i+'"');
  const end=i===10?ai.indexOf('class="finish"',beg):ai.indexOf('id="week'+(i+1)+'"',beg);
  assert(beg>=0&&end>beg,'AI week '+i+' section');
  const section=ai.slice(beg,end);
  for(const part of ['class="expanded-lessons"','class="quiz ai-quiz"','class="tool-deep-dive"','class="completeBox"']){
    assert(section.includes(part),'AI week '+i+' missing '+part);
  }
  assert.equal((section.match(/class="question"/g)||[]).length,5,'Five quiz questions in week '+i);
}
assert(read('assets/course-sync.js').includes("e.target?.closest?.('button')"),'Quiz button click detection');
const prompts=[];const context={window:{}};vm.runInNewContext(read('assets/prompt-library-data.js'),context);assert.equal(context.window.DALP_PROMPTS.length,300);
const ids=new Set(),topics=new Set(),titles=new Set();for(const p of context.window.DALP_PROMPTS){assert(p.prompt.includes('independent ways to check'),'Verification instruction '+p.id);assert(!ids.has(p.id));assert(!titles.has(p.title));ids.add(p.id);titles.add(p.title);topics.add(p.category)}
assert.equal(topics.size,20);assert(read('prompt-library.html').includes('id="promptGrid"'));
for(const c of ['excel','sql','powerbi']){const txt=read('courses/'+c+'.html');assert.equal((txt.match(/class="job-ready-extension"/g)||[]).length,10,c+' real world mastery tasks');assert(txt.includes('prompt-library.html'));}
assert(read('AI_COURSE_DATABASE_MIGRATION.sql').includes('DALP-(EXL|PBI|SQL|AIA)'));
assert(read('downloads/WORKED_SOLUTIONS.md').includes('14,248,255'));
console.log('PASS 4 full tracks | AI 10 deep lessons + 50 quiz questions | 30 mastery tasks | 300 distinct prompts across 20 topics | ID migration');
