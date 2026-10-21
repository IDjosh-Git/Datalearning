/* Request-time authorization. The browser never provides or chooses its own role. */
export const AUTH_URL = process.env.DALP_AUTH_URL || 'https://hotysnqorkqbiconjskl.supabase.co';
// This is a public/publishable API key. Never embed service-role or secret keys.
export const PUBLIC_KEY = process.env.DALP_AUTH_PUBLISHABLE_KEY || 'sb_publishable_T_xSbZxYjmx-EA5ItbQ1VA_GhlURXmP';
export const SESSION_COOKIE = '__Host-dalp_session';
export const LOCAL_COOKIE = 'dalp_session_local';
const PAGE_SET = new Set(['admin.html','progress.html','reviewer.html','connection-test.html','sync-test.html']);
const ASSET_SET = new Set(['admin-dashboard.js','admin-console.js','progress-admin.js','reviewer.js',
 'admin-dashboard.css','admin-console.css','progress-admin.css','reviewer.css']);
const PRIVATE_ROOT = new Set(['OWNER_SETUP.sql','ADMIN_LEARNER_MIGRATION.sql','supabase_setup.sql','AI_COURSE_DATABASE_MIGRATION.sql','SUPABASE_SETUP.txt']);
export function restrictedKind(pathname){
 let clean;
 try { clean = decodeURIComponent(pathname).replace(/\/+$/,'') } catch { return 'deny' }
 if (/\x00|\\/.test(clean)) return 'deny';
 if(clean.startsWith('/tests/') || clean.startsWith('/lib/') || clean.startsWith('/.'))return 'deny';
 if(PRIVATE_ROOT.has(clean.slice(1)))return 'deny';
 if(clean.startsWith('/assets/') && ASSET_SET.has(clean.slice(8)))return 'adminAsset';
 const name=clean.split('/').pop().toLowerCase();
 if(clean.startsWith('/courses/'))return null;
 if(PAGE_SET.has(name) && clean==='/' + name)return 'adminPage';
 if(['admin','progress','reviewer','connection-test','sync-test'].includes(name) && clean==='/' + name)return 'adminPage';
 return null;
}
export function parseCookie(header='',name=SESSION_COOKIE){
 const pair=String(header).split(';').map(v=>v.trim()).find(v=>v.startsWith(name+'='));
 if(!pair)return null;
 try{return decodeURIComponent(pair.substring(name.length+1))}catch{return null}
}
export function readServerToken(header=''){return parseCookie(header,SESSION_COOKIE)||parseCookie(header,LOCAL_COOKIE)}
export function tokenSecondsLeft(token){
 try{
  const payload=token.split('.')[1];if(!payload)return 0;
  const body=JSON.parse(Buffer.from(payload,'base64url').toString('utf8'));
  if(!Number.isFinite(body.exp))return 0;
  return Math.max(0,Math.min(3600,Math.floor(body.exp-Date.now()/1000)-30));
 }catch{return 0}
}
const headers=token=>({apikey:PUBLIC_KEY,Authorization:'Bearer '+token,'Cache-Control':'no-store'});
async function jsonOrNull(response){try{return await response.json()}catch{return null}}
export async function verifyAccount(token,fetchFn=fetch){
 if(!token||token.length>6000||!AUTH_URL.startsWith('https://')||!PUBLIC_KEY)return {ok:false,status:401};
 try{
  const r=await fetchFn(AUTH_URL+'/auth/v1/user',{method:'GET',headers:headers(token),signal:AbortSignal.timeout(7000),cache:'no-store'});
  const body=await jsonOrNull(r);
  if(!r.ok||!body?.id||body.is_anonymous)return {ok:false,status:r.status===401||r.status===403?401:503};
  return {ok:true,userId:body.id};
 }catch{return {ok:false,status:503}}
}
export async function verifyAdmin(token,userId,fetchFn=fetch){
 if(!userId||!/^[0-9a-f-]{36}$/i.test(userId))return {ok:false,status:403};
 try{
  const url=AUTH_URL+'/rest/v1/site_admins?select=user_id&user_id=eq.'+encodeURIComponent(userId)+'&limit=1';
  const r=await fetchFn(url,{method:'GET',headers:headers(token),signal:AbortSignal.timeout(7000),cache:'no-store'});
  const rows=await jsonOrNull(r);
  if(!r.ok||!Array.isArray(rows))return {ok:false,status:503};
  return {ok:rows.some(x=>x?.user_id===userId),status:403};
 }catch{return {ok:false,status:503}}
}
export const PRIVATE_HEADERS={'Cache-Control':'private, no-store, max-age=0','X-Content-Type-Options':'nosniff','Vary':'Cookie'};
export function sessionCookie(token,seconds,isSecure=true){
 const name=isSecure?SESSION_COOKIE:LOCAL_COOKIE;
 return name+'='+encodeURIComponent(token)+'; Path=/; HttpOnly; SameSite=Lax; Max-Age='+Math.floor(seconds)+(isSecure?'; Secure':'');
}
export function clearSessionCookies(){return [SESSION_COOKIE+'=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0',LOCAL_COOKIE+'=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0']}
