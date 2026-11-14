import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('assets/scripts/auth-gate.js','utf8');
function make(authStatus,previousOwner,{page="courses/sql.html",admin=false,roleError=false}={}){
 const url=new URL('https://learn.example/'+page+(page==='courses/sql.html'?'?week=5':''));
 const store=new Map();
 if(previousOwner)store.set('dalpLastLearnerId',previousOwner);
 if(previousOwner||authStatus==='signed_out'){store.set('excelRoadmapProgress','{"1":true}');store.set('zahPendingAnonymous:excel','{"1":true}');}
 let redirect=null,ready=false,user=null,authChange;
 const classes=new Set(['dalp-auth-checking']);
 const listeners={};
 const doc={currentScript:{src:'https://learn.example/assets/scripts/auth-gate.js'},readyState:'loading',body:null,
 documentElement:{classList:{add:k=>classes.add(k),remove:k=>classes.delete(k)}},
 addEventListener:(event,cb)=>{listeners[event]=cb},getElementById:()=>null,querySelector:()=>null};
 const auth={
  getSession:async()=>({data:{session:authStatus==='signed_out'?null:{access_token:'stub'}},error:null}),
  getUser:async()=>({data:{user:authStatus==='signed_in'?{id:'new-user',email:'student@test.com'}:null},error:null}),
  onAuthStateChange:cb=>{authChange=cb;return {data:{subscription:{unsubscribe(){}}}};}};
 const from=()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:admin?{user_id:"new-user"}:null,error:roleError?{message:"permission denied"}:null})})})});
 const memory={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)};
 const context={document:doc,location:{pathname:url.pathname,search:url.search,hash:url.hash,href:url.href,replace:val=>{redirect=val}},URL,
 console,setTimeout,clearTimeout,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},
 sessionStorage:{removeItem:()=>{}},window:{DALP_STORAGE:memory,DALP_CLOUD_WORKSPACE:{setOwner:(id)=>{if(previousOwner&&previousOwner!==id){store.clear();}}},ZAH_DB:{configured:true,client:{auth,from}}}};
 vm.runInNewContext(source,context);
 return {async finish(){await new Promise(r=>setTimeout(r,40));return {redirect,classes,store,user:context.window.DALP_AUTH_USER,gate:context.window.DALP_AUTH_GATE}},emit:event=>authChange(event),listeners};
}
let a=make('signed_out');let r=await a.finish();
assert(r.redirect?.startsWith('https://learn.example/auth.html?return='),'Signed-out visitor redirected');
assert(new URL(r.redirect).searchParams.get('return')==='/courses/sql.html?week=5','Deep link preserved');
assert(r.store.has('excelRoadmapProgress'),'Legacy anonymous progress preserved for first signup');
a=make('signed_in','different-user');r=await a.finish();
assert(!r.redirect,'Valid learner must not redirect');
assert(!r.classes.has('dalp-auth-checking'),'Valid learner can see page');
assert(r.user?.id==='new-user','Valid user must be available');
assert(!r.store.has('excelRoadmapProgress'),'Previous learner progress cleared');
assert(!r.store.has('zahPendingAnonymous:excel'),'Anonymous queue cleared on learner change');
assert(!r.store.has('dalpLastLearnerId'),'No persistent browser ownership marker');
a=make('signed_in',null,{page:'admin.html'});r=await a.finish();assert(r.classes.has('dalp-auth-checking'),'Learner denied admin route');
a=make('signed_in',null,{page:'admin.html',admin:true});r=await a.finish();assert(!r.classes.has('dalp-auth-checking'),'Administrator can open admin route');
a=make('signed_in',null,{page:'index.html',roleError:true});r=await a.finish();assert(!r.classes.has('dalp-auth-checking'),'Role-service errors must not block verified learner pages');
a=make('signed_in',null,{page:'admin.html',roleError:true});r=await a.finish();assert(r.classes.has('dalp-auth-checking'),'Admin access must fail closed when role service is unavailable');
for(const page of ['index.html','courses/sql.html']){a=make('signed_in',null,{page});await a.finish();a.emit('SIGNED_OUT');r=await a.finish();assert.equal(r.redirect,'https://learn.example/','Sign-out returns to public homepage from '+page);}
const privateNav=fs.readFileSync('assets/scripts/private-navigation.js','utf8');assert(privateNav.includes("finally{location.replace('/')}"),'Private workspace sign-out returns to homepage even when sign-out fails');
console.log('PASS runtime auth guard: protected deep links, verified access, account isolation and homepage sign-out from root/nested/private pages');
