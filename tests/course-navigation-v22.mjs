import fs from 'node:fs';
import assert from 'node:assert/strict';
const css=fs.readFileSync('assets/course-navigation-v22.css','utf8');
const compact=fs.readFileSync('assets/course-mobile-v21.css','utf8');
for(const c of ['excel','sql','powerbi','ai','introduction']){
 const html=fs.readFileSync(`courses/${c}.html`,'utf8');
 assert(html.includes('course-navigation-v22.css?v=20261022.22'),`Missing final navigation stylesheet: ${c}`);
 assert(html.includes('course-mobile-v21.css?v=20261022.22'),`Stale compact navigation CSS cache key: ${c}`);
 assert(html.includes('course-mobile-v21.js?v=20261022.22'),`Stale compact navigation JS cache key: ${c}`);
}
assert(css.includes('position:relative!important') && css.includes('.app .topbar') && css.includes('max-width:950px'), 'No course secondary sticky header fix');
assert(compact.includes('@media(max-width:950px)'), 'Compact layout does not align with the app tablet breakpoint');
console.log('PASS v22 course header scroll/compact navigation coverage across all five courses');
