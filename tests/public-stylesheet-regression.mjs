import fs from 'node:fs';
import assert from 'node:assert/strict';
const css=fs.readFileSync(new URL('../public-course-guide.css',import.meta.url),'utf8');
assert(!css.includes('{{'),'Malformed doubled CSS braces must not return');
let depth=0;
for(const char of css){if(char==='{')depth++;if(char==='}')depth--;assert(depth>=0,'Unexpected CSS closing brace');}
assert.equal(depth,0,'Unbalanced CSS rules');
for(const selector of ['.premium-hero{','.hero-visual{','.brand img{','.landing-options{'])assert(css.includes(selector),`Missing ${selector}`);
assert(css.includes('@media(max-width:760px)'), 'Missing responsive layout');
console.log('PASS public stylesheet valid brace structure and premium responsive selectors');
