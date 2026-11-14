/* Authentication is required for every DataLearning route other than sign-in and its minimal assets. */
import { next } from '@vercel/functions';
import { rewrite } from '@vercel/functions';
import { restrictedKind,readServerToken,verifyAccount,verifyAdmin,PRIVATE_HEADERS,readRefreshCookie,tokenSecondsLeft } from './lib/server-auth.js';

// Vercel invokes this at the edge before serving public and private static HTML and bundles.
export const config = { matcher: ['/:path*'] };
const cache=new Map();
const CACHE_MS=15000;
async function verifiedUser(token){
 // Short server-memory validation cache avoids dozens of remote Auth requests per lesson image.
 // Never grant access on expiry and never persist JWTs to the learner's browser.
 if(!token||tokenSecondsLeft(token)<1)return {ok:false,status:401};
 const now=Date.now();const saved=cache.get(token);
 if(saved&&saved.until>now)return saved.value;
 const value=await verifyAccount(token);
 if(value.ok){cache.set(token,{value,until:now+CACHE_MS});if(cache.size>100){for(const [key,item] of cache){if(item.until<now||cache.size>80)cache.delete(key)}}}
 return value;
}
function fail(status,message){return new Response(message,{status,headers:{...PRIVATE_HEADERS,'Content-Type':'text/plain; charset=utf-8'}})}
function login(url){const nextUrl=new URL('/auth.html',url);nextUrl.searchParams.set('return',url.pathname+url.search+url.hash);return Response.redirect(nextUrl,302)}
function continueSession(url){
 // One short server round trip refreshes the existing signed-in account;
 // the browser never receives or stores a refresh token in a URL.
 const resume=new URL('/api/auth/session',url);
 resume.searchParams.set('continue',url.pathname+url.search+url.hash);
 return Response.redirect(resume,303);
}
export default async function middleware(request){
 const url=new URL(request.url);
 // Root index.html is the authenticated Discover page. A config rewrite alone
 // can lose to Vercel's filesystem index resolution; select the public entry
 // here before the filesystem is consulted, without exposing private assets.
 if(url.pathname==='/'){
  const landing=new URL(url);landing.pathname='/public-pages/landing.html';
  return rewrite(landing,{headers:{'Cache-Control':'no-store, max-age=0'}});
 }
 const kind=restrictedKind(url.pathname);
 if(kind==='deny')return fail(404,'Not found');
 if(kind==='public')return next({headers:{'Cache-Control':'no-store, max-age=0'}});
 const cookies=request.headers.get('cookie')||'';
 const token=readServerToken(cookies);
 const canRenew=!!readRefreshCookie(cookies) && (kind==='appPage'||kind==='adminPage');
 if(!token || tokenSecondsLeft(token)<1){
  if(canRenew)return continueSession(url);
  if(kind==='appApi')return fail(401,'Sign in required');
  if(kind==='appAsset'||kind==='adminAsset')return fail(403,'Sign in required');
  return login(url);
 }
 const user=await verifiedUser(token);
 if(!user.ok){
  if(user.status===401&&canRenew)return continueSession(url);
  if(user.status===503)return fail(503,'Unable to verify your learning account. Please retry.');
  if(kind==='appApi')return fail(401,'Sign in required');
  if(kind==='appAsset'||kind==='adminAsset')return fail(403,'Sign in required');
  return login(url);
 }
 if(kind==='adminPage'||kind==='adminAsset'){
  const admin=await verifyAdmin(token,user.userId);
  if(!admin.ok)return fail(admin.status===503?503:403,admin.status===503?'Administrator verification unavailable. Please retry.':'This area is for administrators.');
 }
 return next({headers:PRIVATE_HEADERS});
}
