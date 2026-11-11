/** Latest release: scoped styles and fail-closed administrator navigation. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=[...fs.readdirSync(root).filter(x=>x.endsWith('.html')).map(x=>x),
 ...fs.readdirSync(path.join(root,'courses')).filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)];
const practiceOnly='practice-workspace-premium.css';
const allStyles=fs.readdirSync(path.join(root,'assets/styles')).filter(x=>x.endsWith('.css'));
let unusedLinks=0;
for(const page of pages){
 const html=read(page);
 const linked=[...html.matchAll(/<link\b[^>]*\bhref=["']([^"']+\.css(?:\?[^"']*)?)["'][^>]*>/gi)].map(x=>x[1].split('?')[0]);
 assert.equal(linked.length,new Set(linked).size,`${page}: duplicate stylesheet linked`);
 for(const href of linked){
  if(/^https?:\/\//.test(href))continue;
  assert(fs.existsSync(path.resolve(root,path.dirname(page),href)),`${page}: missing CSS ${href}`);
 }
 if(html.includes(practiceOnly)){
  assert.equal(page,'studio.html',`${page}: obsolete Practice Studio stylesheet is loaded outside Studio`);
 }else if(page!=='practice.html'&&page!=='studio.html')unusedLinks++;
 if(!['admin.html','progress.html','reviewer.html','connection-test.html','sync-test.html'].includes(page)){
  assert(!/<a[^>]+href=["'](?:\.\.\/)?(?:admin|reviewer|progress|connection-test|sync-test)\.html["']/i.test(html),`${page}: admin link exposed in learner markup`);
 }
}
const files=[...pages.map(read),...fs.readdirSync(path.join(root,'assets/scripts')).filter(x=>x.endsWith('.js')).map(x=>read('assets/scripts/'+x)),...allStyles.map(x=>read('assets/styles/'+x))];
for(const css of allStyles){
 assert(files.some(content=>content.includes(css)),`Unreferenced CSS file: ${css}`);
}
const nav=read('assets/scripts/private-navigation.js');
assert(nav.includes("window.DALP_ROLE==='admin'"),'Admin menu must check verified role');
assert(nav.includes("wrap.hidden=true")&&nav.includes('group.hidden=!admin'),'Admin menu must start hidden and only show for admins');
const style=read('assets/styles/sidebar-consistency.css');
assert(style.includes('[data-admin-only][hidden]')&&style.includes('display: none !important'),'Admin nav requires an explicit hidden override');
const gate=read('middleware.js');
assert(gate.includes('verifyAdmin(token,user.userId)'),'Middleware must verify administrator role');
assert(gate.includes('403'),'Middleware must deny non-admin users');
console.log(`PASS style hygiene: ${pages.length} routes, ${allStyles.length} referenced CSS files, no duplicate links, Studio-specific styles isolated, admin nav hidden by default`);
