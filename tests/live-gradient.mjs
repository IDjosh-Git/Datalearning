import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(join(root,path),'utf8');
const pages=[
 'index.html','account.html','admin.html','capstone.html','practice.html',
 'progress.html','reference.html','reviewer.html','studio.html',
 'courses/introduction.html','courses/excel.html','courses/sql.html',
 'courses/powerbi.html','courses/python.html','courses/ai.html'
];
const css=read('assets/theme-unified-v10.css');
const controller=read('assets/theme-control-v14.js');

for(const page of pages){
 const html=read(page);
 assert.match(html,/theme-unified-v10\.css/,`${page}: shared appearance stylesheet`);
 assert.match(html,/theme-control-v14\.js/,`${page}: persisted light/dark switch`);
}

const active=read('assets/ambient-background-v35.css');
assert.match(active,/--ambient-sky: rgba\(56, 189, 248/, 'Light palette is sky blue');
assert.match(active,/--motion-b: rgba\(139,92,246/, 'Dark palette has violet ambient glow');
assert.match(active,/animation: dalp-ambient-drift/, 'Ambient glow moves');
assert.match(active,/transform: translate3d/, 'Animation uses transform');
assert.match(active,/prefers-reduced-motion: reduce/, 'Reduced motion supported');
assert.match(controller,/document\.documentElement\.dataset\.theme=dark\?'dark':'light'/,'Theme switch updates the shared theme state');
console.log(`PASS ambient themes: ${pages.length} shared surfaces, light/dark palettes, reduced motion, and transform-only animation`);
