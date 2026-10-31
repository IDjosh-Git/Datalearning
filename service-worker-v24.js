/* v91: serve current published files first; use known-safe public cache only if offline. */
const CACHE='dalp-public-v24-1';
const PRIVATE=/(?:^|\/)(?:api|admin|auth|account|progress|reviewer|capstone|certificate|verify|connection-test|sync-test)(?:\/|\.|$)/i;
const PUBLIC=/\.(?:html|css|js|svg|png|webp|jpg|jpeg|woff2?|csv|md|sqlite)$/i;
self.addEventListener('install',event=>{event.waitUntil(self.skipWaiting())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k.startsWith('dalp-public-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})())});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||request.headers.has('authorization')||request.headers.has('range'))return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin||PRIVATE.test(url.pathname)||!PUBLIC.test(url.pathname))return;
 event.respondWith((async()=>{
   const cache=await caches.open(CACHE);
   try{
     const response=await fetch(request);
     const policy=response.headers.get('cache-control')||'';
     if(response.ok&&response.type==='basic'&&!/private|no-store/i.test(policy)){
       await cache.put(request,response.clone());
     }
     return response;
   }catch{
     const cached=await cache.match(request);
     return cached||Response.error();
   }
 })());
});
