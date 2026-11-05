/* Administrator-only learner-detail overlay. The shared navigation is in private-navigation.js. */
(()=>{'use strict';
 if(!['overview','progress','reviews'].includes(document.body?.dataset.adminConsole))return;
 const root=document.body;let previouslyFocused=null;
 // Detail sheet works with the existing page scripts, but offers an accessible overlay.
 const dialog=document.getElementById('adminLearnerDetail'),shade=document.getElementById('adminDetailBackdrop');
 if(dialog&&shade){
  const observer=new MutationObserver(()=>{const open=!dialog.hidden;shade.hidden=!open;root.classList.toggle('ac-detail-open',open);if(open){if(!previouslyFocused)previouslyFocused=document.activeElement;dialog.focus({preventScroll:true})}else if(previouslyFocused){previouslyFocused.focus?.({preventScroll:true});previouslyFocused=null;}});
  observer.observe(dialog,{attributes:true,attributeFilter:['hidden']});
  shade.addEventListener('click',()=>{dialog.hidden=true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden){dialog.hidden=true;}if(e.key==='Tab'&&!dialog.hidden){const focusable=[...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled])')].filter(el=>el.getClientRects().length);if(!focusable.length){e.preventDefault();return;}if(e.shiftKey&&document.activeElement===focusable[0]){focusable.at(-1).focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===focusable.at(-1)){focusable[0].focus();e.preventDefault();}}});
 }
})();
