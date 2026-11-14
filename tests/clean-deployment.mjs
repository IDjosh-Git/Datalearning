import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const config=JSON.parse(fs.readFileSync('vercel.json','utf8'));assert.equal(config.outputDirectory,'dist');
const redirects=new Map(config.redirects.map(r=>[r.source,r.destination]));
for(const file of ['catalog.html','overview.html','progress.html']){assert(!fs.existsSync('dist/'+file),file+' duplicate must not deploy');assert(redirects.has('/'+file),'old links keep a compatible redirect');}
for(const file of ['tests','docs','database','lib','package.json','assets/scripts/progress-admin.js','assets/styles/progress.css'])assert(!fs.existsSync('dist/'+file),file+' must not be in the static deployment');
let refs=0;const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
for(const file of walk('dist').filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(file,'utf8');for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
 const raw=m[1];if(/^(?:https?:|\/\/|data:|mailto:|tel:|#)/.test(raw))continue;
 const url=new URL(raw,'https://app.test/'+path.relative('dist',file).replaceAll('\\','/'));
 if(!path.extname(url.pathname))continue;
 assert(fs.existsSync('dist'+decodeURIComponent(url.pathname))||redirects.has(url.pathname),`${file}: missing deployment resource ${raw}`);refs++;
}}
console.log(`PASS clean deployment excludes duplicate views and development files; ${refs} published resource references resolve`);
