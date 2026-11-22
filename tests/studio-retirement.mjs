import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = file => fs.readFileSync(file, 'utf8');
const retired = read('studio.html');
assert.match(retired, /http-equiv="refresh" content="0; url=practice\.html"/);
assert.match(retired, /location\.replace\('practice\.html'/);
for (const file of ['study-tools.html','assets/scripts/private-navigation.js','assets/scripts/premium-search.js']) {
  assert(!read(file).includes("'studio.html'") && !read(file).includes('href="studio.html"'), `${file}: obsolete Studio destination`);
}
assert(read('practice.html').includes('practiceDetail'), 'Practice Arena remains available');
console.log('PASS Studio retired, legacy URL redirected, Practice Arena retained');
