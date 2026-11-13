import assert from 'node:assert/strict';
import {restrictedKind,readServerToken,verifyAccount,verifyAdmin,tokenSecondsLeft,sessionCookie,clearSessionCookies,PRIVATE_HEADERS} from '../lib/server-auth.js';
import handler from '../api/auth/session.js';
const userId='aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
const learnerId='bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb';
const oldFetch=global.fetch;
function token(seconds=3600){const body=Buffer.from(JSON.stringify({exp:Math.floor(Date.now()/1000)+seconds})).toString('base64url');return 'x.'+body+'.'+('t'.repeat(64))}
function mockFetchFor(id,isAdmin=true,fail=false){return async (url,init)=>{
 if(fail)throw new Error('offline');
 if(String(url).includes('/auth/v1/user'))return new Response(JSON.stringify({id,is_anonymous:false}),{status:200});
 if(String(url).includes('/rest/v1/site_admins'))return new Response(JSON.stringify(isAdmin?[{user_id:id}]:[]),{status:200});
 throw Error('Unexpected URL '+url);
};}
function fakeRes(){return {headers:{},statusCode:0,setHeader(k,v){this.headers[k]=v},end(v){this.body=v===undefined?undefined:this.headers['Content-Type']?.includes('application/json')?JSON.parse(v):v}}}
assert.equal(restrictedKind('/admin.html'),'adminPage');
assert.equal(restrictedKind('/reviewer'),'adminPage');
assert.equal(restrictedKind('/progress.html'),'adminPage');
assert.equal(restrictedKind('/assets/scripts/admin-dashboard.js'),'adminAsset');
assert.equal(restrictedKind('/assets/styles/admin.css'),'adminAsset');
assert.equal(restrictedKind('/OWNER_SETUP.sql'),'deny');
assert.equal(restrictedKind('/lib/server-auth.js'),'deny');
assert.equal(restrictedKind('/courses/sql.html'),'appPage');
assert.equal(restrictedKind('/'),'public');
assert.equal(restrictedKind('/assets/scripts/academy-app.js'),'appAsset');
assert.equal(restrictedKind('/api/tutor'),'appApi');
assert.equal(restrictedKind('/auth.html'),'public');
assert.equal(restrictedKind('/assets/scripts/auth-flow.js'),'public');
assert.equal(readServerToken('foo=bar; __Host-dalp_session=abc%2Edef; another=x'),'abc.def');
assert.equal(readServerToken('not-a-session=aaa'),null);
assert.ok(tokenSecondsLeft(token(600))<=600);
assert.equal(tokenSecondsLeft(token(-30)),0);
assert.match(sessionCookie('test',60,true),/^__Host-dalp_session=test; Path=\/; HttpOnly; SameSite=Lax; Max-Age=60; Secure$/);
assert.ok(clearSessionCookies().some(c=>c.includes('Max-Age=0')));
assert.match(PRIVATE_HEADERS['Cache-Control'],/no-store/);
assert.deepEqual(await verifyAccount(token(),mockFetchFor(userId)),{ok:true,userId});
assert.equal((await verifyAccount(token(),mockFetchFor(userId,true,true))).status,503);
assert.equal((await verifyAdmin(token(),userId,mockFetchFor(userId,true))).ok,true);
assert.equal((await verifyAdmin(token(),learnerId,mockFetchFor(learnerId,false))).ok,false);
assert.equal((await verifyAdmin(token(),userId,mockFetchFor(userId,true,true))).status,503);
const realToken=token();
// A redirect after cookie renewal must be same-origin and must not leak tokens.
function refreshMock(id){return async (url,init)=>{
 if(String(url).includes('/auth/v1/token'))return new Response(JSON.stringify({access_token:token(),refresh_token:'rotated-refresh'}),{status:200});
 return mockFetchFor(id)(url,init);
};}

const req={method:'POST',headers:{origin:'https://school.example','host':'school.example',authorization:'Bearer '+realToken},body:{refresh_token:'test-refresh-session-value'}};
try{
 global.fetch=mockFetchFor(userId);
 let res=fakeRes();await handler(req,res);assert.equal(res.statusCode,200);assert.equal(res.body.ok,true);assert.equal(res.headers['Set-Cookie'].length,2);assert(res.headers['Set-Cookie'].every(s=>s.includes('HttpOnly')));
 res=fakeRes();await handler({...req,headers:{...req.headers,origin:'https://evil.example'}},res);assert.equal(res.statusCode,403);assert.ok(!res.headers['Set-Cookie']);
 res=fakeRes();await handler({...req,headers:{...req.headers,authorization:'Bearer '+token(-5)}},res);assert.equal(res.statusCode,401);
 res=fakeRes();await handler({...req,method:'DELETE'},res);assert.equal(res.statusCode,200);assert.equal(res.headers['Set-Cookie'].length,4);
 res=fakeRes();await handler({...req,method:'GET',headers:{...req.headers,cookie:'__Host-dalp_session='+realToken+'; __Host-dalp_refresh=test-refresh-session-value'}},res);assert.equal(res.statusCode,200);assert.equal(res.body.refresh_token,'test-refresh-session-value');
 res=fakeRes();await handler({...req,method:'GET',url:'/api/auth/session?continue=%2Faccount.html%3Ftab%3Dprogress',headers:{...req.headers,cookie:'__Host-dalp_session='+realToken+'; __Host-dalp_refresh=test-refresh-session-value'}},res);
 assert.equal(res.statusCode,303);assert.equal(res.headers.Location,'/account.html?tab=progress');assert.equal(res.body,undefined);
 res=fakeRes();await handler({...req,method:'GET',url:'/api/auth/session?continue=https%3A%2F%2Fevil.example%2Fleak',headers:{...req.headers,cookie:'__Host-dalp_session='+realToken+'; __Host-dalp_refresh=test-refresh-session-value'}},res);
 assert.equal(res.statusCode,303);assert.equal(res.headers.Location,'/index.html','open redirects must not be possible');
 global.fetch=refreshMock(userId);
 res=fakeRes();await handler({...req,method:'GET',url:'/api/auth/session?continue=%2Faccount.html',headers:{...req.headers,cookie:'__Host-dalp_session='+token(-10)+'; __Host-dalp_refresh=test-refresh-session-value'}},res);
 assert.equal(res.statusCode,303);assert.equal(res.headers.Location,'/account.html');assert.equal(res.headers['Set-Cookie'].length,2);
 assert(res.headers['Set-Cookie'].every(s=>s.includes('HttpOnly')));
 // Regression: a rejected refresh must NEVER expose raw API JSON on page navigation.
 global.fetch=async (url,init)=>String(url).includes('/auth/v1/token')
   ?new Response(JSON.stringify({error:'invalid_grant'}),{status:400})
   :mockFetchFor(userId)(url,init);
 res=fakeRes();await handler({...req,method:'GET',url:'/api/auth/session?continue=%2Fcourses%2Fexcel.html',headers:{...req.headers,cookie:'__Host-dalp_session='+token(-10)+'; __Host-dalp_refresh=stale-refresh'}},res);
 assert.equal(res.statusCode,303);assert.equal(res.headers.Location,'/auth.html?return=%2Fcourses%2Fexcel.html');
 assert.equal(res.body,undefined,'Never show JSON Session expired on a navigation');
 assert.equal(res.headers['Set-Cookie'].length,4,'Clear invalid session and refresh cookies');
 // A still-live token should not spuriously rotate the refresh token on reload.
 res=fakeRes();await handler({...req,method:'GET',headers:{...req.headers,cookie:'__Host-dalp_session='+token(65)+'; __Host-dalp_refresh=valid-refresh'}},res);
 assert.equal(res.statusCode,200);assert.equal(res.body.refresh_token,'valid-refresh');
 // Transient Auth network failures display a human-readable Retry page, not JSON.
 global.fetch=async()=>{throw Error('network unavailable')};
 res=fakeRes();await handler({...req,method:'GET',url:'/api/auth/session?continue=%2Fpractice.html',headers:{...req.headers,cookie:'__Host-dalp_session='+token(-10)+'; __Host-dalp_refresh=valid-refresh'}},res);
 assert.equal(res.statusCode,503);assert.match(res.headers['Content-Type'],/text\/html/);
 assert.match(res.body,/Retry session/);assert(!res.body.includes('{"error":'));
 // A missing refresh cookie also recovers to sign-in without raw JSON.
 res=fakeRes();await handler({...req,method:'GET',url:'/api/auth/session?continue=%2Ftutor.html',headers:{...req.headers,cookie:''}},res);
 assert.equal(res.statusCode,303);assert.match(res.headers.Location,/auth\.html/);
}finally{global.fetch=oldFetch}
console.log('Server-side authorization, session cookie, expiry, role separation, and CSRF regression tests passed.');
