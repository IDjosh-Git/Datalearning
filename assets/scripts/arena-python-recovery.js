(()=>{'use strict';
function init(){
 const py=window.DALP_PY_CHALLENGES, button=document.querySelector('[data-arena-subject="Python"]');
 const select=document.getElementById('practiceKind'), list=document.getElementById('practiceList');
 const detail=document.getElementById('practiceDetail');
 if(!button||!select||!list||!detail)return;
 function launch(event){
  // The arena itself owns challenge selection and grading. Never replace its handlers.
  const search=document.getElementById('hubSearch'),progress=document.getElementById('practiceStatus');
  if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));}
  if(progress){progress.value='all';progress.dispatchEvent(new Event('change',{bubbles:true}));}
  select.value='Python';select.dispatchEvent(new Event('change',{bubbles:true}));
  let cards=Array.from(list.querySelectorAll('button[data-id]'));
  const pyids=new Set((window.DALP_PY_CHALLENGES||[]).map(c=>c.id));
  const first=cards.find(c=>pyids.has(c.dataset.id));
  if(first){first.click();document.querySelector('#challengeModal')?.setAttribute('hidden','');document.body.classList.remove('hub-modal-open');detail.scrollIntoView({block:'start',behavior:'auto'});}
  else {const message=document.getElementById('pythonRecoveryStatus');if(message){message.hidden=false;message.textContent=pyids.size?'Python challenges could not be rendered. Reload this page to refresh the Arena scripts.':'Python challenges failed to load. Please refresh the page or check your connection.';}}
 }
 // Capture click to recover from older handlers that keep stale filters.
 button.addEventListener('click',()=>queueMicrotask(()=>{
  const current=detail.querySelector('.pc-overline')?.textContent||'';
  if(!current.includes('Python')) launch();
 }));
 const status=document.createElement('p');status.id='pythonRecoveryStatus';status.hidden=true;status.setAttribute('role','alert');status.className='python-recovery-status';button.closest('.arena-subject-launcher')?.appendChild(status);
 const count=document.getElementById('pythonLibraryCount');if(count)count.textContent=String(py?.length||0)+' Python challenges';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
