/* Premium Tutor: accessible compact settings drawer, preserving the existing AI/offline controller. */
(() => {
  'use strict';
  function ready(){
    const trigger=document.getElementById('tutorToolsToggle');
    const drawer=document.getElementById('tutorToolsPanel');
    const backdrop=document.getElementById('tutorToolsScrim');
    const chat=document.querySelector('.tutor-chat');
    const input=document.getElementById('chatQuestion');
    const closeButton=document.getElementById('tutorCloseSettings');
    if(!trigger || !drawer || !backdrop || !chat) return;
    const mobile=matchMedia('(max-width:900px)');
    let opened=false;
    function sync(){
      const active=opened&&mobile.matches;
      drawer.classList.toggle('tutor-drawer-open',active);
      backdrop.classList.toggle('tutor-scrim-open',active);
      trigger.setAttribute('aria-expanded',String(active));
      trigger.setAttribute('aria-label',active?'Close tutor settings':'Open tutor settings');
      drawer.toggleAttribute('inert',mobile.matches&&!active);
      backdrop.toggleAttribute('inert',!active);
      document.body.classList.toggle('tutor-settings-open',active);
      document.documentElement.classList.toggle('tutor-drawer-active',active);
      // The panel is only modal on mobile; desktop keeps a normal aside.
      if(active){drawer.setAttribute('role','dialog');drawer.setAttribute('aria-modal','true');}
      else{drawer.removeAttribute('role');drawer.removeAttribute('aria-modal');}
      if(!mobile.matches)opened=false;
    }
    function close(returnFocus=false){
      if(!opened)return;
      opened=false;sync();if(returnFocus)trigger.focus({preventScroll:true});
    }
    trigger.addEventListener('click',()=>{opened=!opened;sync();if(opened)requestAnimationFrame(()=>setTimeout(()=>closeButton?.focus({preventScroll:true}),40))});
    backdrop.addEventListener('click',()=>close(true));
    closeButton?.addEventListener('click',()=>close(true));
    document.addEventListener('keydown',event=>{
      if(!opened||!mobile.matches)return;
      if(event.key==='Escape'){event.preventDefault();close(true);return;}
      if(event.key!=='Tab')return;
      const focusable=[...drawer.querySelectorAll('button:not(:disabled),a[href],select:not(:disabled),input:not(:disabled),textarea:not(:disabled),summary,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.closest('[hidden],[inert]')&&el.getClientRects().length>0);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&(document.activeElement===first||!drawer.contains(document.activeElement))){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||!drawer.contains(document.activeElement))){event.preventDefault();first.focus();}
    });
    drawer.addEventListener('click',event=>{
      if(event.target.closest('a[href]'))close(false);
      // Starter prompts send a question; immediately return to the chat.
      if(event.target.closest('.prompt-chip')){close(false);input?.focus({preventScroll:true})}
    });
    if(mobile.addEventListener)mobile.addEventListener('change',()=>{opened=false;sync()});
    else mobile.addListener?.(()=>{opened=false;sync()});
    sync();
    // Keep the send box one line until typed text needs additional room.
    if(input){
      const resize=()=>{input.style.setProperty('height','auto','important');input.style.setProperty('height',Math.max(39,Math.min(input.scrollHeight,144))+'px','important')};
      input.addEventListener('input',resize);
      input.addEventListener('change',resize);
      document.getElementById('chatForm')?.addEventListener('submit',()=>{
        requestAnimationFrame(resize);
      });
      resize();
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();
})();
