/* Premium page loader: only actual initial document loading, never an artificial navigation blocker. */
(()=>{
  'use strict';
  const root=document.documentElement;
  const loader=document.getElementById('dlpPageLoader');
  if(!loader){root.classList.remove('dlp-loader-pending');return;}
  const shownAt=performance.now();
  const MIN_VISIBLE=480; // visible on fast cached pages, without a long fake wait
  const MAX_VISIBLE=2800; // never trap a learner behind a CDN or deferred-script stall
  let leaving=false;
  let waiting=null;
  function finish(){
    if(leaving)return;
    const rest=Math.max(0,MIN_VISIBLE-(performance.now()-shownAt));
    if(rest){if(waiting===null)waiting=setTimeout(()=>{waiting=null;finish()},rest);return;}
    leaving=true;
    root.classList.remove('dlp-loader-pending');
    root.classList.add('dlp-loader-leaving');
    loader.setAttribute('aria-hidden','true');
    setTimeout(()=>{loader.remove();root.classList.remove('dlp-loader-leaving');},260);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',finish,{once:true});
  else finish();
  // Fonts and remote scripts can hang; loading should never hide the page indefinitely.
  setTimeout(finish,MAX_VISIBLE);
  window.addEventListener('pageshow',event=>{if(event.persisted)finish()});
})();
