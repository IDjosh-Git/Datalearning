/** Supabase diagnostic contract: never report a local session as proof of live DB health. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=file=>fs.readFileSync(file,'utf8');
const connection=read('connection-test.html');
const sync=read('sync-test.html');
const cloud=read('assets/scripts/progress-cloud.js');
assert.match(connection,/db\.client\.auth\.getUser\(\)/,'Live user identity request required');
assert.match(connection,/\.from\('site_admins'\)\.select\('user_id'\)/,'Live database permission query required');
assert.doesNotMatch(connection,/getSession\(\)/,'Local getSession alone cannot validate the network');
assert.match(connection,/connectionRetry/,'Admin must be able to retry');
for(const slug of ['introduction','excel','sql','powerbi','python','ai']){
 assert.match(sync,new RegExp(`id="${slug}"`),`Sync diagnostics missing ${slug}`);
}
assert.match(sync,/ZAHProgressCloud\.syncAll\(\)/);
assert.match(cloud,/courseWriteLanes/);
for(const [label,html] of [['connection-test',connection],['sync-test',sync]]){
 const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
 for(const inline of scripts){if(!inline.trim())continue;new vm.Script(inline,{filename:label+'.html'});}
}
console.log('PASS live Supabase diagnostic checks, all six progress routes, and admin retry UI');
