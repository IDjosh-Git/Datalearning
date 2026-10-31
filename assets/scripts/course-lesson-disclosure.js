/* Keep the secondary lesson index collapsed until needed. */
(()=>{'use strict';
 const init=()=>{const panel=document.getElementById('courseLessonIndex');if(!panel)return;
  const shouldOpen=()=>/^#(?:week|module)\d+/.test(location.hash);
  if(shouldOpen())panel.open=true;
  window.addEventListener('hashchange',()=>{if(shouldOpen())panel.open=true;});
  const search=document.getElementById('searchInput');
  search?.addEventListener('input',()=>{if(search.value.trim())panel.open=true;});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
