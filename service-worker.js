/* DataLearning offline caching retired. Remove old cached assets and unregister. */
self.addEventListener('install',event=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('dalp-public-')).map(k=>caches.delete(k)));await self.registration.unregister();})()));
