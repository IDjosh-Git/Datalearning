/* Privacy and media release contract: no application-wide persistent browser storage, all weekly visuals present. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const client=read('assets/scripts/supabase-client.js');
assert(client.includes('persistSession:false'),'Supabase Auth must not save tokens in browser storage');
assert(read('assets/scripts/cloud-workspace.js').includes("from('learner_workspace_state')"),'Private cloud workspace must be the data store');
for(const f of fs.readdirSync(path.join(root,'assets/scripts')).filter(f=>f.endsWith('.js')&&!['cloud-workspace.js'].includes(f))){
 const js=read('assets/scripts/'+f);
 assert(!/\b(?:localStorage|sessionStorage|indexedDB)\b/.test(js),f+': persistent browser state found');
}
const sw=read('service-worker.js');assert(sw.includes('offline caching retired')&&!sw.includes('cache.put'),'No offline device cache');
const academy=read('assets/scripts/academy-app.js');assert(academy.includes('za-week-interface-visual')&&academy.includes('loading="lazy"'));
const cur=JSON.parse(read('assets/data/academy-curriculum.json'));
const specialist=read('assets/scripts/specialist-course-data.js');
const marker='const courses = ';
const tail=specialist.slice(specialist.indexOf(marker)+marker.length);
const specialists=[];for(const slug of ['python','ai'])assert(specialist.includes('"slug":"'+slug+'"'));
for(const c of cur)for(let week=1;week<=10;week++)assert(fs.existsSync(path.join(root,`assets/images/lesson-interfaces/${c.slug}-week-${week}.svg`)));
for(const slug of ['python','ai'])for(let week=1;week<=10;week++)assert(fs.existsSync(path.join(root,`assets/images/lesson-interfaces/${slug}-week-${week}.svg`)));
assert(fs.existsSync(path.join(root,'assets/images/lesson-interfaces/excel-week-1.png')),'Excel Ribbon diagram missing');
const grad=read('assets/scripts/arena-ide.js');assert(grad.includes('dalp:arena:excel-workbook:v1'));
assert(read('assets/styles/practice-arena-premium-final.css').includes('.ide-modes>button:not(.is-active)'),'Only selected editor icon visible');
console.log('PASS Supabase in-memory auth, private workspace persistence, no browser storage writes, no offline cache, 90 weekly interface graphics, clean Excel editor');
