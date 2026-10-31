/* Keep same-origin embedded documents and editor skins aligned to the light palette. */
(()=>{'use strict';
 const root=document.documentElement;
 const keys=['--primary','--primary-hover','--on-primary','--background','--surface','--surface-raised','--surface-alt','--surface-hover','--text-main','--text-muted','--border-subtle','--border-strong','--focus-ring','--editor-background','--editor-text','--code-background','--code-text'];
 let scheduled=false;
 function syncFrame(frame){
  try {
   const doc=frame.contentDocument;
   if(!doc || !doc.documentElement || !doc.head) return; // Cross-origin frames cannot be restyled.
   const target=doc.documentElement;
   target.dataset.theme='light';
   target.style.colorScheme=target.dataset.theme;
   let style=doc.getElementById('dalp-embedded-theme');
   if(!style){style=doc.createElement('style');style.id='dalp-embedded-theme';doc.head.append(style);}
   const computed=getComputedStyle(root);
   style.textContent=':root{'+keys.map(key=>key+':'+computed.getPropertyValue(key).trim()+';').join('')+'}html,body{color-scheme:'+target.dataset.theme+';}';
  }catch{/* Cross-origin, PDF viewers, and sandboxed documents are intentionally left alone. */}
 }
 function update(){scheduled=false;document.querySelectorAll('iframe').forEach(syncFrame);
  const mode='light';
  document.querySelectorAll('.monaco-editor,.cm-editor,.CodeMirror,.ace_editor').forEach(node=>node.dataset.dalpTheme=mode);
  window.dispatchEvent(new CustomEvent('dalp:themechange',{detail:{theme:mode}}));
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
 // Appearance is fixed to light; no theme preference observer is necessary.
 const dom=new MutationObserver(records=>{for(const record of records){for(const node of record.addedNodes){if(node.nodeType===1&&(node.matches?.('iframe')||node.querySelector?.('iframe'))){schedule();return;}}}});
 function boot(){dom.observe(document.body,{childList:true,subtree:true});document.addEventListener('load',event=>{if(event.target instanceof HTMLIFrameElement) syncFrame(event.target)},true);schedule();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
