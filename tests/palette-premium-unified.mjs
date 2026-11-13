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
for(const token of ['#06141B','#11212D','#253745','#4A5C6A','#9BA8AB','#CCD0CF','#FBFBF8','#6AA6DA','#C5E384'])assert(theme.includes(token),`missing ${token}`);
assert(loader.includes('rgba(6,20,27,.27)')&&loader.includes('rgba(37,55,69,.22)'),'transparent overlay around 75%');
assert(loader.includes('backdrop-filter:blur(14px)'),'glass loader blur');
assert(loader.includes('prefers-reduced-motion:reduce'),'reduced motion retained');
console.log('PASS premium unified palette across 38 pages, transparent gradient loader, accessibility');
