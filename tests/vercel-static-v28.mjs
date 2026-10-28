import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const filenames=[...fs.readdirSync(root).filter(x=>x.endsWith('.html')), ...fs.readdirSync(path.join(root,'courses')).filter(x=>x.endsWith('.html')).map(x=>`courses/${x}`)];
assert.equal(filenames.length,23,'Review route count before changing the rollout scope');
const config=JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8'));
assert.equal(config.framework,null,'Vercel framework must remain Other/static');
assert.equal(config.cleanUrls,false,'Existing .html links require non-clean URLs');
assert(!Object.hasOwn(config,'outputDirectory'),'Serve root static files directly; do not point Vercel to a nonexistent dist folder');
assert(config.rewrites.some(r=>r.source==='/courses/:course' && r.destination==='/courses/:course.html'));
assert(config.rewrites.every(r=>!['/(.*)','/:path*','/:path(.*)'].includes(r.source)),'Never mask serverless API endpoints with a SPA fallback');
assert(config.headers.some(h=>h.source==='/service-worker-v23.js'&&h.headers.some(x=>/no-cache/.test(x.value))));
const internal=new Set();
for(const filename of filenames){
  const html=fs.readFileSync(path.join(root,filename),'utf8');
  const links=[...html.matchAll(/<(?:script|img|link|source)\b[^>]*(?:src|href)\s*=\s*(["'])(.*?)\1/gi)].map(x=>x[2]);
  for(const uri of links){
    if(/^(?:https?:|data:|\/\/|mailto:|#|javascript:)/i.test(uri))continue;
    const target=uri.split(/[?#]/)[0];if(!target)continue;
    const dest=path.resolve(target.startsWith('/')?root:path.dirname(path.join(root,filename)),target.replace(/^\//,''));
    assert(dest.startsWith(root+path.sep),`Asset path traversal: ${filename} => ${uri}`);
    assert(fs.existsSync(dest),`Missing static file: ${filename} => ${uri}`);
    internal.add(dest);
  }
  const prefix=filename.startsWith('courses/')?'../':'';
  const expected=`${prefix}assets/dashboard-analytics-v28.css?v=20261023.28`;
  assert.equal(html.split(expected).length-1,1,`Expected exactly one v28 sheet in ${filename}`);
  assert(html.lastIndexOf('dashboard-analytics-v28.css')>html.lastIndexOf('data-atmosphere-v27.css'),`v28 sheet must win cascade in ${filename}`);
}
for(const cssName of ['assets/dashboard-analytics-v28.css']){
  const css=fs.readFileSync(path.join(root,cssName),'utf8');
  for(const result of css.matchAll(/url\(\s*["']?([^'"\)]+)["']?\s*\)/g)){
    const uri=result[1].trim();if(/^(?:data:|https?:|\/\/)/i.test(uri))continue;
    assert(fs.existsSync(path.resolve(root,'assets',uri)),`CSS motif or font missing: ${uri}`);
  }
  for(const token of ['--bg-dashboard','--bg-card','--grid-line','--accent-glow','prefers-reduced-motion','max-width:560px','.dl-home-grid','.dl-track-grid'])assert(css.includes(token),`Missing v28 design safeguard: ${token}`);
}
assert(!fs.existsSync(path.join(root,'dist')),'No dist output should be required by this root-static project');
console.log(`PASS Vercel static v28: ${filenames.length} pages, ${internal.size} unique linked local assets, scoped rewrites, service worker header and responsive theme CSS`);
