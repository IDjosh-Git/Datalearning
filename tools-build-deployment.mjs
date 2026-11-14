import fs from 'node:fs';
import path from 'node:path';
const root=import.meta.dirname;
const output=path.join(root,'dist');
// Only this explicitly resolved generated directory may be replaced.
if(path.dirname(output)!==root||path.basename(output)!=='dist')throw Error('Invalid build output');
fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output);
const retired=new Set(['catalog.html','overview.html','progress.html']);
for(const file of fs.readdirSync(root).filter(x=>x.endsWith('.html')&&!retired.has(x)))fs.copyFileSync(path.join(root,file),path.join(output,file));
for(const dir of ['assets','courses','downloads','course-info','public-pages'])fs.cpSync(path.join(root,dir),path.join(output,dir),{recursive:true});
// Retire legacy standalone extension pages; the nine canonical course pages own these journeys.
for(const old of ['ai-extension.html','python-extension.html'])fs.rmSync(path.join(output,'courses',old),{force:true});
for(const file of ['assets/scripts/progress-admin.js','assets/styles/progress.css'])fs.rmSync(path.join(output,file));
for(const file of ['favicon.ico','public-course-guide.css','service-worker.js'])fs.copyFileSync(path.join(root,file),path.join(output,file));
console.log('Built clean static deployment: duplicate catalogue and progress pages, source, tests, database scripts and release reports excluded.');
