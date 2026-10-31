import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');
const guard=read('assets/auth-gate.js');
assert(guard.includes('const deadline='));
assert(guard.includes('if(adminPage)'));
assert(guard.includes('if(result?.error){console.warn')); 
assert(guard.includes('if(!adminPage){'));
assert(guard.includes('void deadline(window.DALP_SERVER_SESSION.establish')); 
assert(guard.includes('Return to sign-in'));
const auth=read('assets/auth-flow.js');
assert(auth.includes('needsServerSession && !hostingSessionOk'));
assert(auth.includes('let target=destination()'));
assert(auth.includes('Hosting session could not be established'));
const cache=read('service-worker-v24.js');
assert(cache.indexOf('await fetch(request)') < cache.indexOf('await cache.match(request)'));
assert(!cache.includes('cache.match(request);return'));
const urls=['index.html','tutor.html','courses/sql.html','courses/excel.html','courses/python.html'];
for(const path of urls){const html=read(path);assert(html.includes('auth-gate.js?v=20261031.92'));assert(html.includes('accessibility-v23.js?v=20261031.91'));}
assert(!read('practice.html').includes('dalp-auth-checking'));
assert(!read('practice.html').includes('auth-gate.js'));
assert(read('assets/accessibility-v23.js').includes('service-worker-v24.js'));
assert(JSON.parse(read('vercel.json')).headers.some(x=>x.source==='/service-worker-v24.js'));
// Source syntax sanity in the same Node runtime used by the app's tests.
for(const file of ['assets/auth-gate.js','assets/auth-flow.js','assets/accessibility-v23.js','service-worker-v24.js'])new vm.Script(read(file),{filename:file});
console.log('PASS v92: bounded auth verification, safe learner fallback, strict admin gate, network-first fresh cache');
