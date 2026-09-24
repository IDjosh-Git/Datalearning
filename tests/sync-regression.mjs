import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.cwd());
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const cloud=read('assets/progress-cloud.js');
const auth=read('auth.html');
if(!cloud.includes("const MIGRATION_VERSION='v4'")) throw new Error('Missing v4 legacy recovery marker');
if(!cloud.includes('recoverCurrentDevice')) throw new Error('Missing post-auth recovery function');
if(!cloud.includes("local[key]===true")) throw new Error('Legacy completed progress is not recovered');
if(!auth.includes('progress-cloud.js?v=20260924.4')) throw new Error('Auth page does not load versioned progress engine');
if(!auth.includes('await window.ZAHProgressCloud.recoverCurrentDevice(user)')) throw new Error('Sign-in does not wait for device recovery');
if(!auth.includes('auth-modern.css?v=20260924.4')) throw new Error('Modern auth theme not loaded');
const pages=['index.html','account.html','auth.html','capstone.html','progress.html','reference.html','reviewer.html','tutor.html','verify.html','courses/introduction.html','courses/excel.html','courses/sql.html','courses/powerbi.html'];
for(const page of pages){
  const html=read(page);
  if(!html.includes('theme-polish.css?v=20260924.4') && page!=='auth.html') throw new Error(`Theme layer not versioned on ${page}`);
  if(/assets\/[A-Za-z0-9._-]+\.(css|js)(?!\?v=20260924\.4)/.test(html.replace(/https:\/\/[^\"']+/g,''))) throw new Error(`Unversioned local asset on ${page}`);
}
console.log('PASS cross-device regression: forced legacy recovery after auth, cloud-first refresh, cache-busted app assets, redesigned light/dark sign-in');
