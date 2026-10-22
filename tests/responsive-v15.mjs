import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd(), courses=path.join(root,'courses');
const routes=[...fs.readdirSync(root).filter(n=>n.endsWith('.html')),...fs.readdirSync(courses).filter(n=>n.endsWith('.html')).map(n=>'courses/'+n)];
assert.equal(routes.length,22);
for(const route of routes){
 const html=fs.readFileSync(path.join(root,route),'utf8');
 const rel=route.startsWith('courses/')?'../':'';
 assert.equal(html.split(`${rel}assets/responsive-system-v15.css?v=20261022.15`).length-1,1,'Missing single final stylesheet: '+route);
 assert.equal(html.split(`${rel}assets/theme-control-v14.js?v=20261022.16`).length-1,1,'Missing theme script: '+route);
}
const css=fs.readFileSync(path.join(root,'assets/responsive-system-v15.css'),'utf8');
for(const req of ['max-width:359px','max-width:760px','min-width:761px','min-width:1450px','safe-area-inset-bottom','dalpThemeToggle','account-studio-link','cw-weekstrip','focus-visible'])assert(css.includes(req),'Missing adaptive rule '+req);
const js=fs.readFileSync(path.join(root,'assets/theme-control-v14.js'),'utf8');
assert(js.includes('dlp-appearance-row')&&!js.includes('ensureReachable'),'v16 replaces floating fallback with dedicated appearance row');
console.log('PASS v15: 22 routes load consistent theme and adaptive CSS, safe mobile controls, wide-screen and fallback coverage');
