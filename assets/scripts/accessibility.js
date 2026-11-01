/* Progressive enhancement: preserve native controls and author-provided names. */
(() => {
 'use strict';
 function init(){
   const main=document.querySelector('main');
   if(main){if(!main.id)main.id='main-content';
   // Private pages deliberately omit the skip control; public pages retain their authored link.
   if(!document.body.matches('[data-private-workspace="true"]') && !document.querySelector('.dalp-skip-link, .dlp-skip-link')){
     const skip=document.createElement('a');skip.className='dlp-skip-link';skip.href='#'+main.id;skip.textContent='Skip to main content';document.body.prepend(skip);
   }}
   // Accessible live status for connectivity without disrupting the learner's focus.
   const status=document.createElement('div');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.className='dlp-network-status';
   status.style.cssText='position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)';document.body.append(status);
   let last=navigator.onLine;
   function update(){ if(last===navigator.onLine)return;last=navigator.onLine;status.textContent=last?'Connection restored. Your progress can synchronize.':'You are offline. Cached lessons may still be available.';if(last)window.dispatchEvent(new Event('dalp:online')); }
   window.addEventListener('online',update);window.addEventListener('offline',update);
   document.querySelectorAll('button:not([aria-label])').forEach(b=>{if(b.textContent.trim()||b.getAttribute('title'))return;const img=b.querySelector('img[alt]');if(img?.alt)b.setAttribute('aria-label',img.alt);});
   if('serviceWorker' in navigator && location.protocol==='https:'){
      // Resolve from the shared script asset so nested course pages use the root worker.
      const asset=document.querySelector('script[src*="accessibility.js"]');
      if(asset){
        const worker=new URL('../../service-worker.js',asset.src);
        const scope=new URL('../../',asset.src).pathname;
        window.addEventListener('load',()=>navigator.serviceWorker.register(worker.href,{scope}).catch(error=>console.warn('Offline caching unavailable',error)),{once:true});
      }
   }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
