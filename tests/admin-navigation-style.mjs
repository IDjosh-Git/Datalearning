import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const admin=readFileSync('admin.html','utf8');
const home=readFileSync('index.html','utf8');
const css=readFileSync('assets/styles/design-system.css','utf8');
assert.match(admin, /src="assets\/scripts\/site\.js"/, 'Admin mobile navigation must load click handler');
assert.equal((home.match(/class="[^"]*\blp-studio-cta\b[^"]*"/g)||[]).length,6);
assert.match(css,/Remove ALL button\/card treatments from course-card Practice Studio links/);
console.log('PASS admin menu script and unboxed Practice Studio links');
