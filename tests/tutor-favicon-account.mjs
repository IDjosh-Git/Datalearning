/** Regression: unified browser icon, accessible Tutor layout and clean private-page navigation. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const htmlFiles=[];
function visit(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 if(['node_modules','.git','dist'].includes(entry.name))continue;
 const file=path.join(dir,entry.name);
 if(entry.isDirectory())visit(file);else if(entry.name.endsWith('.html'))htmlFiles.push(file);
}} visit(root);
for(const page of htmlFiles.filter(p=>path.basename(p)!=='studio.html')){
 const html=fs.readFileSync(page,'utf8');
 const prefix=path.basename(path.dirname(page))==='courses'?'../':'';
 for(const [icon,suffix] of [['favicon.svg','image/svg+xml'],['favicon-32.png','image/png'],['favicon-180.png',null]]) {
  assert(html.includes(`${prefix}assets/icons/${icon}`),`${page}: missing or invalid ${icon}`);
 }
 assert.equal((html.match(/rel="icon"/g)||[]).length,2,`${page}: duplicate or missing favicon links`);
}
for(const file of ['assets/icons/favicon.svg','assets/icons/favicon-32.png','assets/icons/favicon-180.png','favicon.ico']){
 assert(fs.existsSync(path.join(root,file)),`Browser icon not found: ${file}`);
}
const account=fs.readFileSync(path.join(root,'account.html'),'utf8');
assert(!account.includes('class="dalp-skip-link"'), 'Account must not render the removed private skip link');
assert(account.includes('id="main-content"'), 'Account must retain its main-content landmark');
const tutor=fs.readFileSync(path.join(root,'tutor.html'),'utf8');
const tutorStyle=fs.readFileSync(path.join(root,'assets/styles/tutor.css'),'utf8');
for(const id of ['chatForm','chatQuestion','sendQuestion','chatMessages','tutorModeAi','tutorModeOffline','clearChat','cancelTutor']){
 assert(tutor.includes(`id="${id}"`),`Tutor UI lost ${id}`);
}
for(const selector of ['.tutor-chat .messages','.tutor-chat .tutor-composer','.tutor-chat .tutor-toolbar','@media(max-width:560px)']){
 assert(tutorStyle.includes(selector),`Tutor layout missing ${selector}`);
}
console.log(`PASS Tutor UI, clean account header and consistent favicons across ${htmlFiles.length} pages`);
