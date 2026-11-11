/** Regression: Study Pulse reflects authenticated Supabase state, never old device-only claims. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const src=fs.readFileSync('assets/scripts/learner-companion.js','utf8');
const cloudSrc=fs.readFileSync('assets/scripts/cloud-workspace.js','utf8');
for(const old of ['Private and offline-first','Auto-saved on this device','stay in your browser unless'])assert(!src.includes(old),`Legacy Study Pulse copy returned: ${old}`);
assert(src.includes("window.addEventListener('dalp:cloud-hydrated'"));
assert(src.includes('DALP_CLOUD_WORKSPACE?.persist?.(KEY)'));
assert(cloudSrc.includes('async function persist(key)'),'Workspace must confirm a completed cloud save even after background debounce');

// Simulate the real floating panel with a tiny DOM and authenticated state.
const records=new Map();const statusNode={textContent:'',dataset:{}};
const listeners={};
function element(){return {dataset:{},hidden:false,isConnected:true,innerHTML:'',style:{},classList:{add(){},remove(){}},setAttribute(){},focus(){},addEventListener(type,cb){this.events??={};this.events[type]=cb},querySelector(){return {focus(){}}},querySelectorAll(){return [statusNode]}}}
const launch=element(),backdrop=element(),panel=element();let n=0;
const hostListeners={};
const doc={body:{dataset:{},append(){},classList:{add(){},remove(){}}},createElement:()=>[launch,panel,backdrop][n++],addEventListener(type,cb){listeners[type]=cb},querySelector(){return null},readyState:'complete'};
let persistSuccess=true,writeCalls=0;
const cloud={userId:'test-user',hydrate:async()=>true,persist:async()=>{writeCalls++;return persistSuccess}};
const ctx={window:{DALP_AUTH_USER:{id:'test-user'},DALP_CLOUD_WORKSPACE:cloud,DALP_STORAGE:{getItem:k=>records.get(k)||null,setItem:(k,v)=>records.set(k,v)},COURSE_STUDIO_DATA:{},addEventListener(type,cb){hostListeners[type]=cb}},document:doc,location:{pathname:'/index.html',hash:''},setTimeout,clearTimeout,Date,Promise,console};
vm.runInNewContext(src,ctx,{filename:'learner-companion.js'});
await launch.onclick();
assert(panel.innerHTML.includes('Connected to your secure Supabase account.'),'Signed-in, hydrated Study Pulse should show a cloud-ready footer');
assert(!panel.innerHTML.includes('on this device'));
assert(!panel.innerHTML.includes('offline-first'));
panel.events.click({target:{closest:()=>({dataset:{action:'study'}})}});
assert.equal(statusNode.textContent,'Saving changes to your account…');
await new Promise(resolve=>setTimeout(resolve,760));
assert.equal(statusNode.textContent,'Saved securely to your Supabase account.');
assert.equal(writeCalls,1);
persistSuccess=false;
panel.events.input({target:{id:'lc-notes',value:'A useful SQL lesson'}});
await new Promise(resolve=>setTimeout(resolve,760));
assert.equal(statusNode.textContent,'Cloud save unavailable. Changes are in memory only and may be lost when this page closes.');
cloud.userId='';ctx.window.DALP_AUTH_USER=null;
hostListeners['dalp:cloud-hydrated']();
assert(panel.innerHTML.includes('Sign in to save notes, habits and bookmarks to your account.'),'Guest state must not claim a cloud save');
console.log('PASS Study Pulse cloud-aware footer: ready, saving, saved, unsynced and signed-out states; no browser-only copy');
