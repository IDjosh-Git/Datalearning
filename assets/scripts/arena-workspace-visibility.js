/* The editor and output must remain visible in the page flow at every width. */
(()=>{'use strict';
 const root=document.getElementById('practiceDetail');if(!root)return;
 function wire(){
  const shell=root.querySelector('.ide-shell');if(!shell)return;
  const bar=shell.querySelector('.ide-editor-toolbar > div');
  if(bar&&!bar.querySelector('.arena-editor-toggle')){
   const toggle=document.createElement('button');toggle.type='button';
   toggle.className='arena-editor-toggle';toggle.textContent='⤢ Expand editor';
   toggle.setAttribute('aria-pressed','false');
   toggle.addEventListener('click',()=>{
    const on=shell.classList.toggle('is-editor-expanded');
    toggle.setAttribute('aria-pressed',String(on));
    toggle.textContent=on?'⤡ Standard layout':'⤢ Expand editor';
    shell.querySelector('.ide-primary')?.scrollIntoView({block:'nearest',behavior:'auto'});
   });bar.prepend(toggle);
  }
  const nav=shell.querySelector('.ide-mobile-nav');
  if(nav&&nav.dataset.jumpNavigation!=='true'){
   nav.dataset.jumpNavigation='true';
   nav.setAttribute('aria-label','Jump to workspace panel');
   nav.querySelectorAll('button[data-pane]').forEach(button=>{
    button.textContent=button.dataset.pane==='output'?'↓ View results':'↑ View editor';
   });
   nav.addEventListener('click',event=>{
    const btn=event.target.closest('button[data-pane]');if(!btn)return;
    const panel=btn.dataset.pane==='output'?shell.querySelector('.ide-secondary'):shell.querySelector('.ide-primary');
    panel?.scrollIntoView({block:'start',behavior:'auto'});
   });
  }
 }
 let pending=false;
 new MutationObserver(()=>{if(!pending){pending=true;queueMicrotask(()=>{pending=false;wire()})}})
   .observe(root,{childList:true,subtree:true});
 wire();
})();
