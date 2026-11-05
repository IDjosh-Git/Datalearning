/* Fast public responses, current published assets first; never cache private records. */
const CACHE = 'dalp-public-tutor-premium-v42';
const PRIVATE = /(?:^|\/)(?:api|admin(?:-workspace)?|auth|account|progress|reviewer|capstone|certificate|verify|connection-test|sync-test)(?:\/|\.|$)/i;
const PUBLIC = /\.(?:html|css|js|svg|ico|png|webp|jpg|jpeg|woff2?|csv|md|sqlite)$/i;
self.addEventListener('install', event => {event.waitUntil(self.skipWaiting());});
self.addEventListener('activate', event => {event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k.startsWith('dalp-public-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})());});
self.addEventListener('fetch', event => {
 const request=event.request;
 if(request.method!=='GET'||request.headers.has('authorization')||request.headers.has('range'))return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin||PRIVATE.test(url.pathname)||!PUBLIC.test(url.pathname))return;
 event.respondWith((async()=>{
   try {
     const response=await fetch(request);
     const policy=response.headers.get('cache-control')||'';
     if(response.ok&&response.type==='basic'&&!/private|no-store/i.test(policy)){
       // Saving to Cache Storage can be surprisingly slow on entry-level phones.
       // Return the network response now; finish the offline copy in background.
       const copy=response.clone();
       event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{}));
     }
     return response;
   }catch {
     const cache=await caches.open(CACHE);
     return (await cache.match(request))||Response.error();
   }
 })());
});
