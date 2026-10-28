(()=>{'use strict';
function init(){
 const buttons=document.querySelectorAll('[data-arena-subject]');
 for(const button of buttons){button.addEventListener('click',()=>{
  const subject=button.dataset.arenaSubject;
  const select=document.getElementById('practiceKind');
  const search=document.getElementById('hubSearch');
  const status=document.getElementById('practiceStatus');
  if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));}
  if(status){status.value='all';status.dispatchEvent(new Event('change',{bubbles:true}));}
  if(select){select.value=subject;select.dispatchEvent(new Event('change',{bubbles:true}));}
  // Let the existing challenge system re-render the subject-filtered list first.
  const first=document.querySelector('#practiceList button[data-id]');
  if(first){first.click();document.getElementById('practiceDetail')?.scrollIntoView({behavior:'auto',block:'start'});}
  else document.getElementById('hubOpen')?.click();
 });}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
