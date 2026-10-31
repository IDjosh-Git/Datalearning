import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=process.cwd(),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const arena=read('practice.html');
for(const banned of ['dalp-auth-checking','dalp-auth-gate','dalp-arena-load-recovery','assets/auth-gate.js','assets/auth-gate.css'])assert(!arena.includes(banned),`Public Arena must not include ${banned}`);
for(const kind of ['SQL','Excel','Python'])assert(arena.includes(`data-arena-subject="${kind}"`),`Missing public ${kind} choice`);
assert(arena.indexOf('arena-subject-launcher')<arena.indexOf('arena-start-guide'),'Tool selection must appear before secondary guidance');
assert(arena.includes('id="arenaEntryList"')&&arena.includes('id="arenaEntryItems"'),'Learners need a visible tool-specific challenge list');
assert(arena.includes('assets/arena-subject-launcher-v44.js?v=20261031.93'),'Tool selector must not use cached v92 code');
assert(arena.includes('assets/arena-entry-v93.css?v=93'),'Missing entry styling');
const js=read('assets/arena-subject-launcher-v44.js');
for(const required of ['data-arena-subject','practiceKind','practiceList button[data-id]','practiceDetail','URLSearchParams(location.search)','aria-pressed','challengeId'])assert(js.includes(required),'Missing tool/deeplink behavior '+required);
const context={window:{}};vm.createContext(context);
for(const n of ['practice-data.js','practice-extra.js','python-challenges-v42.js'])vm.runInContext(read('assets/'+n),context,{filename:n});
const tasks=[...context.window.DALP_PRACTICE,...context.window.DALP_PY_CHALLENGES];
assert.equal(tasks.length,149);
const counts=Object.fromEntries(['SQL','Excel','Python'].map(kind=>[kind,tasks.filter(t=>t.kind===kind).length]));
assert.deepEqual(counts,{SQL:45,Excel:50,Python:54});
const pages=['index.html','account.html','progress.html','learning-lab.html',...fs.readdirSync(path.join(root,'courses')).filter(p=>p.endsWith('.html')).map(p=>'courses/'+p)];
let found=0;
for(const file of pages){
 const html=read(file);
 for(const match of html.matchAll(/<a\b([^>]*?)>([\s\S]*?)<\/a>/gi)){
  const attrs=match[1],label=match[2].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  if(!/(?:practice arena|open practice)(?!\s+studio)/i.test(label))continue;
  const href=attrs.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
  assert(href,`${file}: ${label} missing href`);
  const target=new URL(href,'https://learn.test/'+file);
  assert.equal(target.pathname,'/practice.html',`${file}: ${label} must open Practice Arena, not ${target.pathname}`);
  const id=target.searchParams.get('challenge');if(id)assert(tasks.some(t=>t.id===id),`${file}: invalid deep-link challenge ${id}`);
  const tool=target.searchParams.get('tool');if(tool)assert(['sql','excel','python'].includes(tool.toLowerCase()),`${file}: invalid Arena tool ${tool}`);
  found++;
 }
}
assert(found>=7,`Not enough Arena entry points audited: ${found}`);
const shell=read('assets/workspace-shell.js'),courseLinks=read('assets/learning-experience-v84.js');
assert(shell.includes("['Practice Arena','practice.html'")&&shell.includes("['Practice',root+'practice.html'"),'Global navigation must link Arena');
assert(courseLinks.includes('practice.html?challenge=')&&courseLinks.includes('practice.html?tool='),'Course lessons must preserve deep links');
assert(read('vercel.json').includes('"source": "/practice"')&&read('vercel.json').includes('"destination": "/practice.html"'),'Pretty URL must map to Arena route');
console.log(`PASS v93: public entry, visible 3-tool selector, ${tasks.length} real challenges, ${found} course/home/account Arena links, challenge/query preservation`);
