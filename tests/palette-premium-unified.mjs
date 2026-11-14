import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const pages=[...fs.readdirSync('.').filter(x=>x.endsWith('.html')),...fs.readdirSync('courses').filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)];
const theme=fs.readFileSync('assets/styles/palette-premium-20261113.css','utf8');
const loader=fs.readFileSync('assets/styles/page-loader.css','utf8');
assert.equal(pages.length,38);
for(const page of pages){
 const html=fs.readFileSync(page,'utf8');
 assert.equal((html.match(/palette-premium-20261113\.css/g)||[]).length,1,`${page}: exactly one canonical palette`);
 assert(!/#(?:F27329|254559|203F58|35637C|F9F7F6)(?![0-9a-f])/i.test(html),`${page}: retired brand color`);
}
for(const token of ['#0B0909','#023048','#023048','#675D58','#AFA39A','#E2DCD3','#F0EDDE','#C58A69','#D9BFA4'])assert(theme.includes(token),`missing ${token}`);
assert(loader.includes('background:rgba(2,48,72,.24)'),'translucent page-visible loader');
assert(loader.includes('backdrop-filter:blur(22px)'),'glass loader blur');
assert(loader.includes('prefers-reduced-motion:reduce'),'reduced motion retained');
console.log('PASS premium unified palette across 38 pages, page-visible blurred loader, accessibility');
