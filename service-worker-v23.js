/* Public learning documents only. Never cache sessions, API responses, or user data. */
const CACHE='dalp-public-v23-1';
const STATIC=/\.(?:html|css|js|svg|png|webp|jpg|jpeg|woff2?|csv|md|sqlite)$/i;
const PRIVATE=/(?:^|\/)(?:api|admin|auth|account|progress|reviewer|capstone|certificate|verify|connection-test|sync-test)(?:\/|\.|$)/i;
self.addEventListener('install',event=>{event.waitUntil(self.skipWaiting());});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('dalp-public-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||req.headers.has('authorization')||req.headers.has('range'))return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin||PRIVATE.test(url.pathname)||!STATIC.test(url.pathname))return;
 if(req.mode==='navigate'){
  event.respondWith((async()=>{try{const response=await fetch(req);if(response.ok&&response.type==='basic'&&response.headers.get('cache-control')?.includes('no-store')!==true){const cache=await caches.open(CACHE);await cache.put(req,response.clone());}return response;}catch{const cached=await caches.match(req);return cached||Response.error();}})());
 }else{
  event.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(req);const fresh=fetch(req).then(async res=>{if(res.ok&&res.type==='basic'&&!/private|no-store/i.test(res.headers.get('cache-control')||''))await cache.put(req,res.clone());return res;});if(cached){event.waitUntil(fresh.catch(()=>{}));return cached;}return fresh;})());
 }
});
