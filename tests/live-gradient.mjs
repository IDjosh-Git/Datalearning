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

assert.match(css,/--ambient-a:rgba\(143,111,205/,'Light mode uses a soft pastel ambient palette');
assert.match(css,/html\[data-theme="dark"\][\s\S]*?--ambient-a:rgba\(94,79,207/,'Dark mode uses a subdued indigo palette');
assert.match(css,/animation:dalp-ambient-drift 32s ease-in-out infinite alternate/,'Ambient motion is slow and continuous');
assert.match(css,/transform:translate3d/,'Motion is transform-only');
assert.match(css,/@media\(prefers-reduced-motion:reduce\)[\s\S]*?animation:none/,'Reduced motion disables the ambient loop');
assert.match(controller,/document\.documentElement\.dataset\.theme=dark\?'dark':'light'/,'Theme switch updates the shared theme state');
console.log(`PASS ambient themes: ${pages.length} shared surfaces, light/dark palettes, reduced motion, and transform-only animation`);
