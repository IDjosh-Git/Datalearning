(()=>{'use strict';
function init(){
  const buttons=[...document.querySelectorAll('.arena-subject-options button[data-arena-subject]')];
  const filter=document.getElementById('practiceKind');
  if(!buttons.length||!filter)return;
  const known=new Set(buttons.map(b=>b.dataset.arenaSubject));
  function sync(value){
    const selected=known.has(value)?value:'';
    for(const b of buttons){
      const active=b.dataset.arenaSubject===selected;
      b.setAttribute('aria-pressed',String(active));
      b.classList.toggle('is-active',active);
    }
  }
  // Keep the card appearance aligned with the native challenge subject filter.
  filter.addEventListener('change',()=>sync(filter.value));
  buttons.forEach(b=>b.addEventListener('click',()=>{
    // Update immediately; the existing launcher controls actual challenge navigation.
    sync(b.dataset.arenaSubject);
  }));
  document.addEventListener('dalp:arena-editor-selected',event=>sync(event.detail?.subject));
  const current=document.getElementById('practiceDetail')?.dataset.activeEditor;
  sync(current||filter.value);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
