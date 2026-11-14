/* Server-side app-wide protection. Never infer access from a browser-selected role. */
export const AUTH_URL = process.env.DALP_AUTH_URL || 'https://hotysnqorkqbiconjskl.supabase.co';
// This value is a public Supabase publishable key; never use a service-role key here.
export const PUBLIC_KEY = process.env.DALP_AUTH_PUBLISHABLE_KEY || 'sb_publishable_T_xSbZxYjmx-EA5ItbQ1VA_GhlURXmP';
export const SESSION_COOKIE = '__Host-dalp_session';
export const LOCAL_COOKIE = 'dalp_session_local';
export const REFRESH_COOKIE = '__Host-dalp_refresh';
export const LOCAL_REFRESH_COOKIE = 'dalp_refresh_local';
const PRIVATE_ROOT = new Set(['/OWNER_SETUP.sql','/ADMIN_LEARNER_MIGRATION.sql','/supabase_setup.sql','/AI_COURSE_DATABASE_MIGRATION.sql','/SUPABASE_SETUP.txt']);
const ADMIN_PAGES = new Set(['admin.html','progress.html','reviewer.html','connection-test.html','sync-test.html']);
const ADMIN_ASSETS = new Set(['admin-dashboard.js','admin-console.js','progress-admin.js','reviewer.js','admin.css','admin-workspace.css','admin-unified-premium.css','progress.css','reviewer.css','connection-test-layout.css','sync-test-layout.css']);
// Only files strictly needed to load sign-in, registration and password recovery are public.
const SIGN_IN_ASSETS = new Set([
  '/assets/scripts/supabase-config.js','/assets/scripts/server-session.js','/assets/scripts/supabase-client.js',
  '/assets/scripts/auth-options.js','/assets/scripts/auth-flow.js','/assets/styles/auth-entry-premium.css',
  '/assets/icons/da-logo.svg','/assets/icons/favicon.svg','/assets/icons/favicon-32.png',
  '/assets/icons/favicon-180.png','/favicon.ico'
]);
export function restrictedKind(pathname){
 let clean;
 try{clean=decodeURIComponent(pathname).replace(/\/+$/,'')||'/'}catch{return 'deny'}
 if(/[\x00\\]/.test(clean)||clean.includes('/../')||clean.includes('/./')||PRIVATE_ROOT.has(clean))return 'deny';
 if(/^\/(?:tests|lib|database|docs|tools)(?:\/|$)/.test(clean)||/\/\./.test(clean))return 'deny';
 if(clean==='/'||clean==='/landing.html'||clean==='/public-pages/landing.html'||clean==='/public-pages/start-here.html'||clean==='/start-here'||clean==='/start-here.html'||clean==='/assets/icons/da-logo.svg'||clean==='/assets/icons/favicon.svg'||clean==='/assets/icons/favicon-32.png'||clean==='/assets/icons/favicon-180.png'||clean==='/favicon.ico'||clean==='/public-course-guide.css'||clean==='/courses'||clean==='/course-info/catalog.html'||(/^\/courses\/(introduction|excel|sql|powerbi|tableau|powerquery|statistics|python|ai)$/.test(clean)||/^\/course-info\/(introduction|excel|sql|powerbi|tableau|powerquery|statistics|python|ai)\.html$/.test(clean))||clean==='/public-course-guide.css')return 'public';
 if(clean==='/auth.html'||clean==='/auth'||clean==='/api/auth/session'||SIGN_IN_ASSETS.has(clean))return 'public';
 if(clean.startsWith('/api/'))return 'appApi';
 const name=clean.split('/').pop().toLowerCase();
 if(clean.startsWith('/assets/scripts/')||clean.startsWith('/assets/styles/')){
  return ADMIN_ASSETS.has(name)?'adminAsset':'appAsset';
 }
 if(clean.startsWith('/assets/')||clean.startsWith('/downloads/'))return 'appAsset';
 if((ADMIN_PAGES.has(name)||ADMIN_PAGES.has(name+'.html')) && clean.split('/').length===2)return 'adminPage';
 return 'appPage';
}
export function parseCookie(header='',name=SESSION_COOKIE){
 const pair=String(header).split(';').map(v=>v.trim()).find(v=>v.startsWith(name+'='));
 if(!pair)return null;
 try{return decodeURIComponent(pair.substring(name.length+1))}catch{return null}
}
export function readServerToken(header=''){return parseCookie(header,SESSION_COOKIE)||parseCookie(header,LOCAL_COOKIE)}
export function readRefreshCookie(header=''){return parseCookie(header,REFRESH_COOKIE)||parseCookie(header,LOCAL_REFRESH_COOKIE)}
export function tokenSecondsLeft(token){
 try{
  const payload=token.split('.')[1];if(!payload)return 0;
  const normalized=payload.replace(/-/g,'+').replace(/_/g,'/');
  const json=atob(normalized+'='.repeat((4-normalized.length%4)%4));
  const body=JSON.parse(json);
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
  if(body?.is_anonymous)return {ok:false,status:401};
  if(!r.ok||!body?.id)return {ok:false,status:r.status===401||r.status===403?401:503};
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
