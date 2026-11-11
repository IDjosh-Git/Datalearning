/* Tutor Studio v87: optional authenticated server-side AI; original offline tutor remains intact. */
(()=>{'use strict';
 const $=id=>document.getElementById(id);
 const form=$('chatForm'),input=$('chatQuestion'),log=$('chatMessages');if(!form||!input||!log)return;
 const live=$('tutorModeAi'),offline=$('tutorModeOffline'),help=$('tutorModeHelp'),topic=$('tutorTopic');
 const status=$('aiStatus'),note=$('chatNote'),followups=$('tutorFollowups'),send=$('sendQuestion'),cancel=$('cancelTutor');
 const privacy=$('tutorPrivacy');
 let enabled=false,mode='offline',provider='AI',model='',history=[],controller=null,lastPrompt='';
 const MAX_HISTORY=6;
 const safeText=(node,str)=>node.append(document.createTextNode(str));
 function statusText(message){status.textContent=message}
 function updateMode(){
  live.setAttribute('aria-pressed',String(mode==='live'));offline.setAttribute('aria-pressed',String(mode==='offline'));
  live.disabled=!enabled;
  help.textContent=mode==='live'?`${provider} · ${model} · account sign-in required. Usage limits apply.`:enabled?`Offline knowledge guide. Switch to ${provider} for live questions.`:'Live AI is not set up. The built-in knowledge guide remains available.';
  statusText(mode==='live'?`Live AI · ${provider}`:'Offline guide · ready');
  note.textContent=mode==='live'?'Enter to send · Shift+Enter for a new line. Messages stay in this tab; responses are AI-generated.':'Enter to send · Shift+Enter for a new line. Offline knowledge progress syncs to Supabase when signed in.';
  if(privacy)privacy.firstChild.textContent=mode==='live'?`Live AI sends your question and up to ${MAX_HISTORY} recent messages to ${provider}. Provider retention and processing policies apply. `:'Offline guide answers do not send your question to an AI provider. ';
  const policy=$('tutorProviderPrivacy');if(policy){policy.hidden=mode!=='live';policy.href=provider==='OpenAI'?'https://developers.openai.com/api/docs/guides/your-data':'https://console.groq.com/docs/your-data';}
  followups.hidden=mode!=='live'||!history.some(x=>x.role==='assistant');
 }
 async function inspect(){
  try{const r=await fetch('/api/tutor',{credentials:'same-origin',cache:'no-store'});if(!r.ok)throw Error('status');const info=await r.json();
   enabled=info.aiEnabled===true;provider=info.provider==='groq'?'GroqCloud':info.provider==='openai'?'OpenAI':'AI';model=info.model||'';
   mode=enabled?'live':'offline';
   if(!enabled)help.textContent=`Live AI not configured. Offline learning works now; the administrator can enable ${provider}.`;
  }catch{enabled=false;mode='offline';help.textContent='Could not check AI availability. Offline guide is available; check your connection to use live AI.'}
  updateMode();
 }
 function newMode(value){
  if(value==='live'&&!enabled)return;
  if(controller)controller.abort();
  mode=value;history=[];followups.hidden=true;
  // Avoid accidentally forwarding a prior offline exercise as live AI conversation context.
  updateMode();
 }
 live.addEventListener('click',()=>newMode('live'));offline.addEventListener('click',()=>newMode('offline'));
 // Live Tutor and the floating coach share one safe DOM-based Markdown renderer.
 function richAnswer(text){
  const body=document.createElement('div');body.className='tutor-answer';
  return window.DALP_AI_RESPONSE.render(body,String(text||''));
 }
 function addBubble(content,role='assistant',title='AI tutor'){
  const box=document.createElement('div');box.className='bubble tutor-ai-message'+(role==='user'?' user':'');
  if(role!=='user'){const b=document.createElement('b');b.textContent=title;box.append(b)}
  box.append(role==='assistant'?richAnswer(content):document.createTextNode(content));log.append(box);
  log.scrollTop=log.scrollHeight;return box;
 }
 function setBusy(flag){send.disabled=flag;cancel.disabled=!flag;input.setAttribute('aria-busy',String(flag));if(flag){send.textContent='Thinking…';statusText(`Asking ${provider}…`)}else{send.textContent='Send ↗';updateMode()}}
 async function sendAI(question){
  if(!enabled||controller)return;
  const original=question.trim();if(!original)return;
  lastPrompt=original;const historyAtStart=history.slice(-MAX_HISTORY);
  controller=new AbortController();const signal=controller.signal;
  setBusy(true);
  const waiting=addBubble('Working through your question…','assistant','AI tutor · generating');waiting.classList.add('tutor-loading');
  try{
   const response=await fetch('/api/tutor',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',cache:'no-store',body:JSON.stringify({question:original,topic:topic.value,history:historyAtStart}),signal});
   const data=await response.json().catch(()=>({}));
   if(!response.ok)throw Error(typeof data.error==='string'?data.error:'The request could not be completed.');
   if(typeof data.answer!=='string'||!data.answer.trim())throw Error('No answer was returned. Please retry.');
   waiting.remove();addBubble(original,'user');addBubble(data.answer,'assistant',`${provider} · AI explanation`);
   history=[...history,{role:'user',content:original.slice(0,900)},{role:'assistant',content:data.answer.slice(0,900)}].slice(-MAX_HISTORY);
   input.value='';lastPrompt='';
   const related=Array.isArray(data.resources)?data.resources:[];
   if(related.length){const resources=document.createElement('div');resources.className='tutor-ai-resources';safeText(resources,'Related learning resources: ');
    for(const r of related){if(typeof r?.title!=='string'||typeof r?.href!=='string'||!/^\/(courses\/(introduction|excel|sql|powerbi|python|ai)\.html|practice\.html|reference\.html|capstone-guide\.html)$/.test(r.href))continue;
     const a=document.createElement('a');a.textContent=r.title;a.href=r.href;resources.append(a)}log.append(resources)}
   followups.hidden=false;
  }catch(e){
   waiting.remove();if(signal.aborted){statusText('Generation stopped. Your draft is still available.');return}
   const box=document.createElement('div');box.className='tutor-ai-error';box.setAttribute('role','alert');const p=document.createElement('p');p.textContent=(e?.message||'The AI service is unavailable.')+' Your question has not been discarded.';
   const retry=document.createElement('button');retry.type='button';retry.textContent='Retry question';retry.addEventListener('click',()=>sendAI(lastPrompt||original));box.append(p,retry);log.append(box);log.scrollTop=log.scrollHeight;
  }finally{controller=null;setBusy(false);input.focus()}
 }
 form.addEventListener('submit',e=>{if(mode!=='live')return;e.preventDefault();e.stopImmediatePropagation();const question=input.value.trim();if(!question){input.focus();return}void sendAI(question)},true);
 cancel.addEventListener('click',()=>{if(controller){controller.abort();statusText('Request cancelled.');}},true);
 function afterNativeClear(){if(log.querySelectorAll('.bubble').length>1)return;history=[];controller?.abort();followups.hidden=true;}
 $('clearChat').addEventListener('click',afterNativeClear);
 $('topReset').addEventListener('click',afterNativeClear);
 followups.querySelectorAll('[data-followup]').forEach(b=>b.addEventListener('click',()=>{if(mode!=='live'||controller)return;const q=b.dataset.followup;input.value=q;void sendAI(q)}));
 // The original offline tutor wired the original prompt chip nodes. Replace them with equivalent
 // accessible chips to send through whichever real mode is currently selected.
 document.querySelectorAll('.prompt-chip').forEach(old=>{const fresh=old.cloneNode(true);old.replaceWith(fresh);fresh.addEventListener('click',()=>{if(controller)return;input.value=fresh.dataset.prompt||'';form.requestSubmit()})});
 // On small screens the live/offline choice and topic belong above the chat,
 // not below a long resource rail. Move the same controls; never duplicate state.
 const sidebar=document.querySelector('.tutor-sidebar');
 const movable=['.tutor-mode-block','.tutor-topic-label','#tutorTopic','.tutor-topic-help','.tutor-prompt-heading','.tutor-prompt-list']
  .map(q=>sidebar?.querySelector(q)).filter(Boolean);
 const homes=movable.map(el=>{const mark=document.createComment('tutor-home');el.before(mark);return mark});
 const quick=document.createElement('section');quick.className='tutor-quickstart';quick.setAttribute('aria-label','Tutor setup and example questions');
 const examples=document.createElement('details');examples.className='tutor-mobile-examples';
 const summary=document.createElement('summary');summary.textContent='Browse example questions';examples.append(summary);
 quick.append(examples);sidebar?.querySelector('.tutor-suggestions')?.before(quick);
 const mobile=window.matchMedia('(max-width: 900px)');
 function arrange(){
  if(mobile.matches){
   for(let i=0;i<movable.length;i++){
    const el=movable[i];if(i>=4)examples.append(el);else quick.insertBefore(el,examples);
   }
  }else{
   for(let i=0;i<movable.length;i++)homes[i].after(movable[i]);
  }
 }
 if(mobile.addEventListener)mobile.addEventListener('change',arrange);else mobile.addListener?.(arrange);
 arrange();
 // Clear is intentionally session-only: chat messages are never saved to window.DALP_STORAGE.
 const qp=new URLSearchParams(location.search);if(qp.get('topic')&&[...topic.options].some(o=>o.value===qp.get('topic')))topic.value=qp.get('topic');
 topic.addEventListener('change',()=>{history=[];followups.hidden=true;statusText(`Context changed to ${topic.options[topic.selectedIndex].text}`)});
 void inspect();
})();
