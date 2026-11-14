import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../practice.html',import.meta.url),'utf8');
const labels=[...html.matchAll(/<svg\b[^>]*aria-labelledby="([^"]+)"[^>]*>/g)].map(m=>m[1]);
assert(labels.length>=2,'Expected both Python icon labels');
assert.equal(new Set(labels).size,labels.length,'SVG accessible label references must be unique');
for(const id of labels){
 const escaped=id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 assert.equal([...html.matchAll(new RegExp('\\bid="'+escaped+'"','g'))].length,1,`SVG title ${id} must exist exactly once`);
}
console.log('PASS Practice Arena SVG accessible title references are unique');
