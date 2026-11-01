import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
for(const page of ['reference.html','prompt-library.html','capstone.html','tutor.html','studio.html','learning-lab.html']){
 const html=read(page);
 assert.doesNotMatch(html,/src=["']assets\/scripts\/auth-gate\.js/,'unexpected sign-in gate: '+page);
 assert.doesNotMatch(html,/classList\.add\(['"]dalp-auth-checking/,'hidden while waiting for auth: '+page);
}
const library=read('reference.html');
assert.equal((library.match(/<header class="nav-shell"/g)||[]).length,1);
assert.match(library,/workspace-shell\.js/);
assert.match(read('assets/scripts/workspace-shell.js'),/data-responsive-page'\)==='reference'/);
for(const page of ['admin.html','account.html','progress.html','reviewer.html'])assert.match(read(page),/auth-gate\.js/);
console.log('Public library access and protected route references OK');
