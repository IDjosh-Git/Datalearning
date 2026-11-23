import assert from 'node:assert/strict';
import fs from 'node:fs';
const policy=fs.readFileSync('assets/scripts/notification-policy.js','utf8');
assert.match(policy,/kind === 'critical'/);
assert.match(policy,/dl-inline-feedback/);
for(const page of ['reference','prompt-library']){
 const html=fs.readFileSync(`${page}.html`,'utf8');
 const js=fs.readFileSync(`assets/scripts/${page}.js`,'utf8');
 assert.match(html,/notification-policy\.js/);
 assert.match(js,/DALP_NOTIFICATION_POLICY\.feedback/);
}
assert.match(fs.readFileSync('assets/scripts/cloud-workspace.js','utf8'),/Review saved draft/);
console.log('PASS learner routine feedback inline, critical notifications retained, draft recovery retained');
