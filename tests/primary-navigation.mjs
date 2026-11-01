import fs from 'node:fs';
import assert from 'node:assert/strict';
const home=fs.readFileSync('index.html','utf8');
assert.equal((home.match(/<header class="nav-shell"/g)||[]).length,1,'Expected one primary header');
assert.equal((home.match(/class="wrap lp-context-bar"/g)||[]).length,0,'Duplicate secondary navigation must not render');
for(const dest of ['index.html','catalog.html','reference.html','account.html']){
 assert.ok(home.includes(`href="${dest}"`),`Missing primary navigation destination: ${dest}`);
 assert.ok(fs.existsSync(dest),`Broken destination: ${dest}`);
}
console.log('Primary navigation checks passed');
