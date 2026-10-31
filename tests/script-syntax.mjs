import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let files=0;
for(const folder of ['assets/scripts','lib','api','api/auth']){
 const dir=path.join(root,folder);
 if(!fs.existsSync(dir))continue;
 for(const name of fs.readdirSync(dir)){
  const file=path.join(dir,name);if(!file.endsWith('.js')||!fs.statSync(file).isFile())continue;
  execFileSync(process.execPath,['--check',file],{stdio:'pipe'});files++;
 }
}
for(const file of ['middleware.js','service-worker.js','assets/python-worker.js']){
 execFileSync(process.execPath,['--check',path.join(root,file)],{stdio:'pipe'});files++;
}
console.log(`PASS syntax lint: ${files} application JavaScript modules/scripts compile`);
