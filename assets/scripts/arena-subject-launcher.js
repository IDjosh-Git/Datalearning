/* One challenge library: subject tiles filter the shared selector rather than duplicating challenges. */
(()=>{'use strict';
 function init(){
  const buttons=[...document.querySelectorAll('[data-arena-subject]')];
  const kindControl=document.getElementById('practiceKind');
  const search=document.getElementById('hubSearch');
  const status=document.getElementById('practiceStatus');
  const heading=document.getElementById('hubDialogTitle');
  const valid=new Set(['SQL','Excel','Python']);
  if(!buttons.length||!kindControl)return;
  function pressed(kind){buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.arenaSubject===kind)));}
  function selectSubject(kind,openLibrary){
   if(!valid.has(kind))return;
   if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));}
   if(status){status.value='all';status.dispatchEvent(new Event('change',{bubbles:true}));}
   kindControl.value=kind;
   kindControl.dispatchEvent(new Event('change',{bubbles:true}));
   pressed(kind);
   if(heading)heading.innerHTML='Explore '+kind+' challenges<span class="hub-title-dot">.</span>';
   if(openLibrary){
    if(window.DALP_HUB?.open)window.DALP_HUB.open();
    else document.getElementById('hubOpen')?.click();
   }
  }
  for(const button of buttons)button.addEventListener('click',()=>selectSubject(button.dataset.arenaSubject,true));
  document.getElementById('hubOpen')?.addEventListener('click',()=>{
   if(heading&&kindControl.value==='All')heading.innerHTML='Find your next challenge<span class="hub-title-dot">.</span>';
  });
  window.addEventListener('popstate',()=>{
   const u=new URL(location.href),kind=u.searchParams.get('tool')||'';
   const subject=buttons.find(b=>b.dataset.arenaSubject.toLowerCase()===kind.toLowerCase());
   pressed(subject?.dataset.arenaSubject||null);
  });
  const requested=new URLSearchParams(location.search).get('tool')||'';
  const chosen=buttons.find(b=>b.dataset.arenaSubject.toLowerCase()===requested.toLowerCase());
  pressed(chosen?.dataset.arenaSubject||null);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
