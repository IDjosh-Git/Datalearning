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
function fakeRes(){return {headers:{},statusCode:0,setHeader(k,v){this.headers[k]=v},end(v){this.body=JSON.parse(v)}}}
assert.equal(restrictedKind('/admin.html'),'adminPage');
assert.equal(restrictedKind('/reviewer'),'adminPage');
assert.equal(restrictedKind('/progress.html'),'adminPage');
assert.equal(restrictedKind('/assets/scripts/admin-dashboard.js'),'adminAsset');
assert.equal(restrictedKind('/assets/styles/admin.css'),'adminAsset');
assert.equal(restrictedKind('/OWNER_SETUP.sql'),'deny');
assert.equal(restrictedKind('/lib/server-auth.js'),'deny');
assert.equal(restrictedKind('/courses/sql.html'),'appPage');
assert.equal(restrictedKind('/'),'appPage');
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
const req={method:'POST',headers:{origin:'https://school.example','host':'school.example',authorization:'Bearer '+realToken},body:{refresh_token:'test-refresh-session-value'}};
try{
 global.fetch=mockFetchFor(userId);
 let res=fakeRes();await handler(req,res);assert.equal(res.statusCode,200);assert.equal(res.body.ok,true);assert.equal(res.headers['Set-Cookie'].length,2);assert(res.headers['Set-Cookie'].every(s=>s.includes('HttpOnly')));
 res=fakeRes();await handler({...req,headers:{...req.headers,origin:'https://evil.example'}},res);assert.equal(res.statusCode,403);assert.ok(!res.headers['Set-Cookie']);
 res=fakeRes();await handler({...req,headers:{...req.headers,authorization:'Bearer '+token(-5)}},res);assert.equal(res.statusCode,401);
 res=fakeRes();await handler({...req,method:'DELETE'},res);assert.equal(res.statusCode,200);assert.equal(res.headers['Set-Cookie'].length,4);
 res=fakeRes();await handler({...req,method:'GET',headers:{...req.headers,cookie:'__Host-dalp_session='+realToken+'; __Host-dalp_refresh=test-refresh-session-value'}},res);assert.equal(res.statusCode,200);assert.equal(res.body.refresh_token,'test-refresh-session-value');
}finally{global.fetch=oldFetch}
console.log('Server-side authorization, session cookie, expiry, role separation, and CSRF regression tests passed.');
