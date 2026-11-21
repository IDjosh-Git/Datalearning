import assert from 'node:assert/strict';import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('assets/data/course-educator-depth.json','utf8'));
let n=0;for(const [slug,lessons] of Object.entries(data)){assert.equal(lessons.length,10);for(const l of lessons){for(const k of ['whyItMatters','walkthrough','outputMeaning','commonMistake','guidedPractice','independentPractice','verification','reflection'])assert(l[k]&&l[k].length>0,`${slug} week ${l.week}: ${k}`);assert(l.walkthrough.length>=4);n++;}}
const app=fs.readFileSync('assets/scripts/academy-app.js','utf8');assert(app.includes('za-teacher-journey'));assert(app.includes('educator.walkthrough.map'));assert(app.includes('safe(educator.commonMistake)'));
assert(data.excel[2].walkthrough.some(x=>x.includes('$F$1')));assert(data.sql[2].commonMistake.includes('HAVING'));
console.log(`PASS: ${n} lessons expose seven teaching stages, explicit demonstrations, error diagnosis and independent practice`);
