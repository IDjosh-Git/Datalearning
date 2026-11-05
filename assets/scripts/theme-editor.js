/* Practice Arena v33 native-input safeguards. The existing highlighter owns rendering;
   this script does NOT intercept typing, Space, Tab, or input/composition events. */
(()=>{'use strict';
 const attrs={spellcheck:'false',autocorrect:'off',autocapitalize:'off',autocomplete:'off'};
 function configure(element){
  if(!element||!element.matches('textarea, input, [contenteditable="true"]'))return;
  if(!element.matches('#practiceAnswer,#ideFormulaBar,.sql-editor-textarea,.cm-content,.monaco-editor textarea'))return;
  for(const [name,value] of Object.entries(attrs))if(element.getAttribute(name)!==value)element.setAttribute(name,value);
  if(element.matches('textarea')){
   if(element.getAttribute('wrap')!=='soft')element.setAttribute('wrap','soft');
   element.style.setProperty('letter-spacing','normal');element.style.setProperty('word-spacing','normal');
  }
 }
 function inspect(scope){scope.querySelectorAll?.('#practiceAnswer,#ideFormulaBar,.sql-editor-textarea,.cm-content,.monaco-editor textarea').forEach(configure)}
 function start(){
  const root=document.getElementById('practiceDetail');if(!root)return;inspect(root);
  // Dynamically selected challenges reconstruct the textarea. Observe only element
  // insertion, not character data, to avoid reacting to syntax paints every keystroke.
  let queued=false;
  new MutationObserver(mutations=>{
   if(!mutations.some(m=>m.addedNodes.length))return;
   if(queued)return;queued=true;
   queueMicrotask(()=>{queued=false;inspect(root)});
  }).observe(root,{childList:true,subtree:true});
  root.addEventListener('focusin',e=>configure(e.target),{passive:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
