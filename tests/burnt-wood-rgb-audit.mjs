import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const legacy = new Set(['214,232,245','155,183,101','77,146,197','234,243,250','234,243,210','251,251,248','204,208,207','164,92,66','181,180,174','120,67,41','104,112,120','220,235,174','25,28,76','242,246,247','234,240,243','243,248,252']);
const extensions = new Set(['.css','.html','.js','.svg']);
const files=[];
function walk(dir){for(const name of readdirSync(dir)){if(['node_modules','.git','tests','docs'].includes(name))continue;const p=join(dir,name);if(statSync(p).isDirectory())walk(p);else if(extensions.has(extname(p)))files.push(p)}}
walk('.');
for(const file of files){const s=readFileSync(file,'utf8');const matches=s.matchAll(/rgba?\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)/gi);for(const m of matches)assert.ok(!legacy.has(`${+m[1]},${+m[2]},${+m[3]}`),`Legacy RGB color in ${file}: ${m[0]}`)}
console.log(`PASS Burnt Wood RGB audit across ${files.length} active source files`);
