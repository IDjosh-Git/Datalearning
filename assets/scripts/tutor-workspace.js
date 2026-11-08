/* Premium Tutor: accessible compact settings drawer, preserving the existing AI/offline controller. */
(() => {
  'use strict';
  function ready(){
    const trigger=document.getElementById('tutorToolsToggle');
    const drawer=document.getElementById('tutorToolsPanel');
    const backdrop=document.getElementById('tutorToolsScrim');
    const chat=document.querySelector('.tutor-chat');
    const input=document.getElementById('chatQuestion');
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
      if(!mobile.matches)opened=false;
    }
    function close(returnFocus=false){
      if(!opened)return;
      opened=false;sync();if(returnFocus)trigger.focus({preventScroll:true});
    }
    trigger.addEventListener('click',()=>{opened=!opened;sync();if(opened){const select=drawer.querySelector('#tutorTopic');(select||drawer.querySelector('summary'))?.focus({preventScroll:true})}});
    backdrop.addEventListener('click',()=>close(true));
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&opened){event.preventDefault();close(true)}
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
