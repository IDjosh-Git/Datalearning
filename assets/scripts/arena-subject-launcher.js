/* v93: Public, first-class Arena entry; selectors delegate to the existing practice engine. */
(()=>{'use strict';
 function init(){
  const buttons=[...document.querySelectorAll('[data-arena-subject]')];
  const panel=document.getElementById('arenaEntryList');
  const list=document.getElementById('arenaEntryItems');
  const title=document.getElementById('arenaEntryListTitle');
  const summary=document.getElementById('arenaEntryListSummary');
  const browse=document.getElementById('arenaEntryBrowseAll');
  const kindControl=document.getElementById('practiceKind');
  const filterSearch=document.getElementById('hubSearch');
  const filterStatus=document.getElementById('practiceStatus');
  if(!buttons.length||!kindControl||!panel||!list)return;
  const all=[...(window.DALP_PRACTICE||[]),...(window.DALP_PY_CHALLENGES||[])];
  const allowed=new Set(['SQL','Excel','Python']);
  const tasksFor=kind=>all.filter(task=>task.kind===kind);
  let currentKind=null;
  const updatePressed=kind=>buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.arenaSubject===kind)));
  function selectedChallenge(){return new URLSearchParams(location.search).get('challenge');}
  function render(kind){
   if(!allowed.has(kind))return;
   currentKind=kind;
   const tasks=tasksFor(kind);
   title.textContent=kind+' challenges';
   summary.textContent=`${tasks.length} ${kind} challenges · Select one to open its practice workspace. Attempts are saved in this browser only.`;
   list.replaceChildren();
   // This shortlist and the full library both select through the original challenge list.
   for(const task of tasks.slice(0,6)){
    const item=document.createElement('button');item.type='button';item.className='arena-entry-item';
    item.dataset.challengeId=task.id;
    const selected=selectedChallenge()===task.id;
    item.setAttribute('aria-current',selected?'true':'false');
    const label=document.createElement('strong');label.textContent=task.title;
    const meta=document.createElement('small');meta.textContent=task.topic+' · '+task.id;
    const arrow=document.createElement('span');arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';
    item.append(label,meta,arrow);
    list.append(item);
   }
   panel.hidden=false;
   updatePressed(kind);
  }
  function choose(id){
   const button=[...document.querySelectorAll('#practiceList button[data-id]')].find(node=>node.dataset.id===id);
   if(!button)return false;
   button.click();
   render(currentKind);
   return true;
  }
  function selectTool(kind){
   if(!allowed.has(kind))return;
   if(filterSearch){filterSearch.value='';filterSearch.dispatchEvent(new Event('input',{bubbles:true}));}
   if(filterStatus){filterStatus.value='all';filterStatus.dispatchEvent(new Event('change',{bubbles:true}));}
   kindControl.value=kind;
   kindControl.dispatchEvent(new Event('change',{bubbles:true}));
   // The practice engine selects the first appropriate task on filter change.
   const first=tasksFor(kind)[0];
   if(first)choose(first.id);
   render(kind);
   panel.scrollIntoView({behavior:'auto',block:'nearest'});
  }
  for(const button of buttons){button.addEventListener('click',()=>selectTool(button.dataset.arenaSubject));}
  list.addEventListener('click',event=>{
   const item=event.target.closest('button[data-challenge-id]');
   if(!item||!choose(item.dataset.challengeId))return;
   document.getElementById('practiceDetail')?.scrollIntoView({behavior:'auto',block:'start'});
  });
  browse?.addEventListener('click',()=>{window.DALP_HUB?.open();});
  window.addEventListener('popstate',()=>{
   const u=new URL(location.href),id=u.searchParams.get('challenge');
   const task=all.find(x=>x.id===id);const kind=task?.kind||buttons.find(x=>x.dataset.arenaSubject.toLowerCase()===u.searchParams.get('tool')?.toLowerCase())?.dataset.arenaSubject;
   if(kind)render(kind);
  });
  document.addEventListener('dalp:arena-editor-selected',event=>{
   if(currentKind&&event.detail?.subject===currentKind)render(currentKind);
  });
  // Preserve direct deep links. The original practice.js resolves and renders the requested challenge.
  const params=new URLSearchParams(location.search),task=all.find(x=>x.id===params.get('challenge'));
  const kind=task?.kind||buttons.find(x=>x.dataset.arenaSubject.toLowerCase()===(params.get('tool')||'').toLowerCase())?.dataset.arenaSubject;
  if(kind)render(kind);else updatePressed(null);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
