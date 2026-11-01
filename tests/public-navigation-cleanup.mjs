import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const routes=['index.html','catalog.html','reference.html','capstone.html','prompt-library.html','tutor.html','practice.html','studio.html','learning-lab.html','account.html',...['excel','sql','powerbi','python','introduction','ai'].map(n=>`courses/${n}.html`)];
const targets=['index.html','catalog.html','courses/ai.html','prompt-library.html','reference.html','capstone.html','tutor.html','account.html'];
const names=['Dashboard','Learn','AI Course','AI Prompt Library','Reference Library','Capstone Studio','AI Tutor','My Learning'];
for(const route of routes){
 const src=fs.readFileSync(path.join(root,route),'utf8');
 assert.equal((src.match(/class="dalp-global-header"/g)||[]).length,1,route+' duplicate header');
 assert.equal((src.match(/class="dalp-global-nav"/g)||[]).length,1,route+' duplicate nav');
 assert.equal((src.match(/public-navigation\.js/g)||[]).length,1,route+' duplicate nav handler');
 assert(!src.includes('workspace-shell.js'),route+' obsolete nav reference');
 const nav=src.match(/<nav[^>]*class="dalp-global-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
 assert(nav,route+' missing nav');
 const anchors=[...nav.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
 assert.equal(anchors.length,targets.length,route+' inconsistent nav count');
 anchors.forEach((m,i)=>{
  const href=m[1].match(/href="([^"]+)"/)?.[1];
  assert.equal(m[2].replace(/<[^>]*>/g,'').trim(),names[i],route+' nav label');
  assert.equal(path.resolve(root,path.dirname(route),href),path.resolve(root,targets[i]),route+' wrong target for '+names[i]);
 });
}
assert(!fs.existsSync(path.join(root,'assets/scripts/workspace-shell.js')),'Legacy dynamic header file not removed');
console.log('PASS public navigation cleanup: '+routes.length+' pages, eight correct destinations per page, no duplicate headers or obsolete script');
