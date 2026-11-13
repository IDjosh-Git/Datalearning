import assert from 'node:assert/strict';
import fs from 'node:fs';
import {restrictedKind} from '../lib/server-auth.js';
const config=JSON.parse(fs.readFileSync(new URL('../vercel.json',import.meta.url)));
const names=['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'];
assert.equal(config.rewrites.filter(x=>x.source==='/courses/:course').length,0,'ambiguous course wildcard');
for(const name of names){assert.equal(config.rewrites.filter(x=>x.source==='/courses/'+name&&x.destination==='/course-info/'+name+'.html').length,1);assert.equal(restrictedKind('/courses/'+name),'public');assert.equal(restrictedKind('/course-info/'+name+'.html'),'public');assert.equal(restrictedKind('/courses/'+name+'.html'),'appPage');}
for(const p of ['/','/start-here','/courses'])assert.equal(restrictedKind(p),'public');
assert.equal(restrictedKind('/dashboard'),'appPage');
console.log('PASS: no competing course rewrites, nine public syllabi, private lessons and dashboard');
