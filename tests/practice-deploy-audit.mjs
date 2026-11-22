import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const config=JSON.parse(read('vercel.json'));
const pkg=JSON.parse(read('package.json'));
assert.equal(config.framework,null,'Deploy as Vercel Other/Static');
assert.equal(config.cleanUrls,false,'Preserve existing .html navigation and course link behavior');
assert.equal(config.outputDirectory,'dist','Static HTML output must use the generated clean deployment directory');
assert(fs.existsSync('dist/practice.html'),'Build must include the functional practice workspace');
assert(config.rewrites.some(r=>r.source==='/practice'&&r.destination==='/practice.html'),'Missing /practice rewrite');
assert(!config.rewrites.some(r=>['/(.*)','/:path*','/:path(.*)'].includes(r.source)),'Catch-all rewrite can shadow API/static paths');
assert(fs.existsSync(path.join(root,'api/auth/session.js')));
assert(fs.existsSync(path.join(root,'api/tutor.js')));
assert(fs.existsSync(path.join(root,'lib/server-auth.js')));
assert(pkg.scripts['verify:deployment'],'Missing deployment verification command');
let count=0;
for (const page of ['practice.html','index.html']) {
 const html=read(page);
 for(const hit of html.matchAll(/<(?:script|link|img|source)\b[^>]*?\b(?:src|href)\s*=\s*(["'])(.*?)\1/gi)) {
  const uri=hit[2];if(/^(?:[a-z]+:|\/\/|#)/i.test(uri))continue;
  const name=uri.split(/[?#]/)[0];if(!name)continue;
  const resolved=path.resolve(root,name.replace(/^\//,''));
  assert(resolved.startsWith(root+path.sep),`Unsafe path ${page}: ${uri}`);
  assert(fs.existsSync(resolved),`Missing asset in ${page}: ${uri}`);count++;
 }
}
for(const name of ['assets/scripts/practice.js','assets/scripts/execution-engine.js','assets/scripts/formula-engine.js','assets/scripts/arena-ide.js','assets/scripts/arena-stability.js']) assert(fs.existsSync(path.join(root,name)),`Missing runtime: ${name}`);
for(const name of ['downloads/retail_orders.csv','downloads/retail_customers.csv','downloads/retail_sqlite_setup.sql']) assert(fs.existsSync(path.join(root,name)),`Missing downloadable dataset: ${name}`);
for (const r of config.rewrites){if(r.destination?.endsWith('.html')&&!r.destination.includes(':'))assert(fs.existsSync(path.join(root,r.destination.replace(/^\//,''))),`Unresolved route: ${r.source}`)}
console.log(`PASS Practice Arena deployment audit: ${count} HTML resource references, API functions, datasets, scoped routes and runtime assets`);
