import fs from 'node:fs';import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const api=read('api/assessment-test.js');const page=read('reviewer.html');const auth=read('lib/server-auth.js');const grading=read('api/assessment-grade.js');
assert.match(api,/verifyAdmin\(token,user\.userId\)/);assert.match(api,/sameOrigin\(req\)/);assert.match(api,/grade\(/);assert.match(api,/persisted:false,certificateIssued:false/);assert.doesNotMatch(api,/\.insert\(|\.update\(|\.upsert\(|\.rpc\(/);assert.match(page,/id="assessmentTestForm"/);assert.match(page,/assessment-test\.js/);assert.match(auth,/assessment-test\.js/);assert.match(auth,/assessment-test\.css/);assert.match(grading,/export async function grade/);
console.log('PASS isolated admin assessment test: authenticated, no writes, shared rubric, UI assets protected');
