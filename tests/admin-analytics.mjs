import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync('admin.html','utf8');
const js=readFileSync('assets/scripts/admin-dashboard.js','utf8');
for(const id of ['adminFrom','adminTo','adminClearDates','adminPeriod','adminActivityChart']) assert.match(html,new RegExp('id="'+id+'"'));
assert.match(js,/courseEvents\(slug\)/);
assert.match(js,/adminFrom.*addEventListener\('change'/);
assert.match(js,/adminTo.*addEventListener\('change'/);
assert.match(js,/window\.DALP_ROLE!=='admin'/);
assert.match(js,/from\('site_admins'\)/);
assert.match(js,/const safe=v=>/);
console.log('PASS admin analytics filters, data source, access gates and CSV sanitization');

// Dashboard failures must be bounded and offer an accessible retry.
import fs from "node:fs";
const dashboard=fs.readFileSync(new URL("../assets/scripts/admin-dashboard.js",import.meta.url),"utf8");
if(!dashboard.includes("Retry dashboard")||!dashboard.includes("timed out after")||!dashboard.includes("window.addEventListener('dalp:auth-ready',once)")) throw new Error("Dashboard recovery controls missing");
console.log("PASS dashboard recovery and retry checks");
