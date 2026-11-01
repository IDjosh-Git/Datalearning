/** Verify legacy progress stays account-scoped and auth scripts remain functional. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {discoverPages,assertReferences} from './page-assets.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const cloud=read('assets/scripts/progress-cloud.js');
assert(cloud.includes("const MIGRATION_VERSION='v4'"),'Existing progress migration marker must remain unchanged');
assert(cloud.includes('recoverCurrentDevice'),'Legacy recovery function is required');
assert(cloud.includes('local[key]===true'),'Completed progress recovery must survive');
assert(read('auth.html').includes('assets/scripts/progress-cloud.js'),'Login must load progress recovery engine');
assert(read('assets/scripts/auth-flow.js').includes('window.ZAHProgressCloud.recoverCurrentDevice(user)'));
assert(!cloud.includes('forceLegacyMigration:true}); }'),'Shared-device migration leakage must remain blocked');
assert(read('auth.html').includes('assets/styles/auth.css'),'Login styling bundle missing');
for(const p of discoverPages()){
 assertReferences(assert,[p]);
 assert(p.html.includes('design-system.css'),p.route+' missing current light-only styles');
 assert(p.html.includes('data-theme="light"'),p.route+' should be light-only');
}
console.log('PASS progress recovery, account-scoped migration, login scripts, current page asset URLs');
