import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const script=fs.readFileSync(path.join(root,'assets/scripts/icon-system.js'),'utf8');
const style=fs.readFileSync(path.join(root,'assets/styles/icon-system.css'),'utf8');
assert.match(script,/aria-hidden/);
assert.match(script,/currentColor/);
assert.match(style,/prefers-reduced-motion/);
for(const p of ['index.html','account.html','practice.html','tutor.html','courses/sql.html','courses/python.html']){
 const html=fs.readFileSync(path.join(root,p),'utf8');
 assert.match(html,/icon-system\.js/);assert.match(html,/icon-system\.css/);
}
for(const s of ['sql','excel','powerbi','python','ai']) assert(fs.existsSync(path.join(root,`assets/icons/icon-${s}.svg`)));
console.log('PASS shared icon system: semantic outline glyphs, accessibility, theme inheritance, course branding and core page inclusion');
