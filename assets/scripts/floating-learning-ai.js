/** DataLearning site-wide assistant: guest-safe offline guide plus authenticated provider AI. */
(() => {
  'use strict';
  // Tutor Studio already provides its own full AI interface. Do not create a second coach.
  if (/(?:^|\/)tutor\.html$/i.test(location.pathname) || document.body?.dataset.responsivePage === 'tutor') return;
  const BASE = location.pathname.includes('/courses/') ? '../' : '';
  const CHAT_URL = '/api/tutor';
  const HISTORY_URL = '/api/ai-history';
  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3 14.4 9.6 21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3z"/><path d="M19 3v4M17 5h4"/></svg>';
  const CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6 18 18M18 6 6 18"/></svg>';
  const SEND = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m4 12 16-8-5 16-3.5-6.5L4 12zM11.5 13.5 20 4"/></svg>';
  const TOPICS = ['foundations','excel','sql','powerbi','python','statistics','ai','tableau','powerquery'];
  const TOPIC_LABELS = {foundations:'Data Analysis',excel:'Excel',sql:'SQL',powerbi:'Power BI / DAX',python:'Python',statistics:'Statistics',ai:'AI Integration',tableau:'Tableau',powerquery:'Power Query'};
  function pageContext() {
    const url = new URL(location.href), path = url.pathname.toLowerCase();
    const slug = (path.match(/\/courses\/([a-z-]+)\.html/) || [])[1] || url.searchParams.get('course') || '';
    const topic = ({introduction:'foundations',dax:'powerbi',powerbi:'powerbi',powerquery:'powerquery'}[slug] || slug);
    const heading = document.querySelector('main h1, .lesson-title, h1')?.textContent?.trim().slice(0,90) || '';
    const weekMatch = (heading + ' ' + url.searchParams.toString()).match(/week[=\s-]*(\d{1,2})/i);
    return {topic:TOPICS.includes(topic)?topic:'general', heading, week:weekMatch?Number(weekMatch[1]):null};
  }
  function promptsFor(context) {
    const subject = TOPIC_LABELS[context.topic] || 'data analysis';
    const scope = context.week ? `${subject} Week ${context.week}` : subject;
    return [`Give me a hint for ${scope}`,`Explain a ${subject} concept`,`Show a worked ${subject} example`,`Check my ${subject} approach`];
  }
  const STOP = new Set(['a','an','the','is','are','of','to','in','at','and','or','what','how','why','can','i','do','does','for','with','me','please','explain','about','my','your','difference','between','on','use','using','from','when','it','this']);
  let mode = 'guide', liveEnabled = false, providerName = 'AI', history = [], abort = null, guidePromise = null;
  const context = pageContext();
  let lastQuestion = '', responseStyle = 'explain', cloudReady = false, generation = 0;
  const path = BASE + 'tutor.html';
  const sanitize = value => String(value || '').slice(0, 10000);
  const tokenize = value => [...new Set(sanitize(value).toLowerCase().match(/[a-z0-9][a-z0-9+_.-]*/g) || [])].filter(x => x.length >= 2 && !STOP.has(x));
  function loadGuide() {
    if (Array.isArray(window.DALP_KNOWLEDGE)) return Promise.resolve(window.DALP_KNOWLEDGE);
    if (guidePromise) return guidePromise;
    guidePromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = BASE + 'assets/scripts/offline-knowledge.js';
      script.async = true;
      script.onload = () => resolve(Array.isArray(window.DALP_KNOWLEDGE) ? window.DALP_KNOWLEDGE : []);
      script.onerror = () => reject(new Error('Could not load the offline study guide.'));
      document.head.append(script);
    });
    return guidePromise;
  }
  function matchGuide(question, entries) {
    const tokens = tokenize(question);
    let best = null, bestScore = 0;
    for (const entry of entries) {
      if (!entry || typeof entry.question !== 'string' || typeof entry.explanation !== 'string') continue;
      const title = entry.question.toLowerCase(), keys = String(entry.keywords || '').toLowerCase(), text = title + ' ' + keys;
      const score = tokens.reduce((sum,t) => sum + (title.includes(t) ? 5 : 0) + (keys.includes(t) ? 3 : 0), 0)
        + (title.includes(question.toLowerCase().trim()) ? 12 : 0);
      if (score > bestScore) {best = entry;bestScore = score;}
    }
    return bestScore >= (tokens.length > 1 ? 5 : 4) ? best : null;
  }
  // Shared renderer is loaded before this script on every floating-coach page.
  function renderAnswer(container, input) {
    window.DALP_AI_RESPONSE.render(container, sanitize(input));
  }
  window.DALP_FLOAT_AI_FORMAT = Object.freeze({renderAnswer});
  function init() {
    if (document.getElementById('dl-float-coach')) return;
    const root = document.createElement('aside');
    root.id = 'dl-float-coach';root.className = 'dl-float-coach';root.setAttribute('aria-label','Floating learning coach');
    root.innerHTML = `
      <button class="dl-float-launcher" type="button" aria-expanded="false" aria-controls="dl-float-panel" aria-label="Open AI learning coach">${ICON}</button>
      <section id="dl-float-panel" class="dl-float-panel" aria-label="AI learning coach" role="dialog" aria-modal="false" hidden>
        <header class="dl-float-head">
          <span class="dl-float-head-icon">${ICON}</span>
          <span class="dl-float-head-copy"><strong>Learning AI</strong><small id="dl-float-mode-label">On-demand study guidance</small></span>
          <button class="dl-float-expand" type="button" aria-label="Expand AI panel" aria-pressed="false" title="Expand panel">⛶</button>
          <button class="dl-float-new" type="button" aria-label="New Chat" title="New Chat">✎</button>
          <button class="dl-float-close" type="button" aria-label="Close learning coach">${CLOSE}</button>
        </header>
        <div class="dl-float-mode" role="group" aria-label="Choose coach mode">
          <button class="dl-float-mode-btn is-active" data-mode="guide" type="button" aria-pressed="true">Study guide</button>
          <button class="dl-float-mode-btn" data-mode="live" type="button" aria-pressed="false" disabled>Live AI</button>
        </div>
        <div class="dl-float-context" id="dl-float-context"></div>
        <div class="dl-float-actions" role="group" aria-label="Choose how to learn">
          <button type="button" data-style="hint">Give a hint</button><button type="button" data-style="explain" class="is-active">Explain</button><button type="button" data-style="example">Worked example</button><button type="button" data-style="check">Check my answer</button>
        </div>
        <p class="dl-float-status" id="dl-float-status" role="status">Your learning assistant is available in your signed-in workspace. Live AI requires a configured provider.</p>
        <div class="dl-float-messages" id="dl-float-messages" role="log" aria-label="Coach conversation" aria-live="polite"></div>
        <div class="dl-float-request-actions"><button class="dl-float-stop" type="button" hidden>Stop generating</button><button class="dl-float-retry" type="button" hidden>Retry last question</button></div>
        <div class="dl-float-suggestions" id="dl-float-suggestions" aria-label="Suggested study questions"></div>
        <form class="dl-float-composer" id="dl-float-form">
          <label class="dl-float-sr" for="dl-float-question">Ask a learning question</label>
          <textarea id="dl-float-question" rows="2" maxlength="2000" placeholder="Ask about Excel, SQL, Power BI…" required></textarea>
          <button type="submit" class="dl-float-send" aria-label="Send question">${SEND}</button>
        </form>
        <footer class="dl-float-footer"><span>Do not share passwords or sensitive data.</span><a href="${path}">Open Tutor Studio</a></footer>
      </section>`;
    document.body.append(root);
    const launcher = root.querySelector('.dl-float-launcher'), panel = root.querySelector('.dl-float-panel'), close = root.querySelector('.dl-float-close');
    const log = root.querySelector('#dl-float-messages'), status = root.querySelector('#dl-float-status');
    const textarea = root.querySelector('#dl-float-question'), form = root.querySelector('#dl-float-form');
    const send = root.querySelector('.dl-float-send'), guide = root.querySelector('[data-mode="guide"]'), live = root.querySelector('[data-mode="live"]');
    const suggestions = root.querySelector('#dl-float-suggestions'), label = root.querySelector('#dl-float-mode-label');
    const note = (msg) => {status.textContent = msg;};
    const stop = root.querySelector('.dl-float-stop'), retry = root.querySelector('.dl-float-retry');
    const contextLabel = root.querySelector('#dl-float-context');
    contextLabel.textContent = context.topic === 'general' ? 'General study help' : `${TOPIC_LABELS[context.topic]}${context.week?' · Week '+context.week:''}`;
    const styleButtons = [...root.querySelectorAll('[data-style]')];
    styleButtons.forEach(button=>button.addEventListener('click',()=>{
      responseStyle=button.dataset.style;
      styleButtons.forEach(b=>{b.classList.toggle('is-active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    }));
    root.querySelector('.dl-float-expand').addEventListener('click',event=>{
      const expanded=root.classList.toggle('is-expanded');event.currentTarget.setAttribute('aria-pressed',String(expanded));
      event.currentTarget.setAttribute('aria-label',expanded?'Restore panel size':'Expand AI panel');
    });
    const saveHistory=async()=>{if(!cloudReady)return;try{await fetch(HISTORY_URL,{method:'PUT',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history.slice(-40)})})}catch{note('History could not be saved; check your connection.')}};
    async function restoreHistory(){
      try{
        await Promise.resolve(window.DALP_AUTH_RESTORE).catch(()=>{});
        const response=await fetch(HISTORY_URL,{credentials:'same-origin',cache:'no-store'});
        if(!response.ok){cloudReady=false;return}
        const data=await response.json();cloudReady=true;
        if(Array.isArray(data.messages)&&!history.length){
          history=data.messages.filter(m=>['user','assistant'].includes(m.role)&&typeof m.content==='string').slice(-40);
          if(history.length){log.replaceChildren();history.forEach(m=>bubble(m.content,m.role,m.role==='assistant'?'Previous AI answer':undefined));note('Your saved conversation was restored from your account.');}
        }
      }catch{cloudReady=false}
    }
    root.querySelector('.dl-float-new').addEventListener('click',async()=>{if(abort)abort.abort();generation++;history=[];lastQuestion='';log.replaceChildren();retry.hidden=true;note('New chat started.');if(cloudReady){try{await fetch(HISTORY_URL,{method:'DELETE',credentials:'same-origin',headers:{'Content-Type':'application/json'}})}catch{note('Could not clear saved history.')}}textarea.focus();});
    stop.addEventListener('click',()=>{if(abort)abort.abort();note('Response stopped.');});
    retry.addEventListener('click',()=>{if(lastQuestion&&!send.disabled){textarea.value=lastQuestion;form.requestSubmit();}});
    function bubble(text, who, heading) {
      const el = document.createElement('div');el.className = 'dl-float-bubble ' + (who === 'user' ? 'is-user' : 'is-guide');
      if (heading) {const name = document.createElement('strong');name.textContent = heading;el.append(name);}
      if(who==='user') {const body=document.createElement('p');body.textContent=sanitize(text);el.append(body)}
      else {const body=document.createElement('div');body.className='dl-float-answer';renderAnswer(body,text);el.append(body)}
      log.append(el);
      if(who!=='user' && !heading?.includes('Thinking')) {
        const copy=document.createElement('button');copy.type='button';copy.className='dl-float-copy';copy.textContent='Copy answer';
        copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(sanitize(text));copy.textContent='Copied';}catch{copy.textContent='Copy unavailable';}});
        el.append(copy);
      }
      log.scrollTop = log.scrollHeight;return el;
    }
    function syncMode() {
      guide.classList.toggle('is-active',mode==='guide');live.classList.toggle('is-active',mode==='live');
      guide.setAttribute('aria-pressed',String(mode==='guide'));live.setAttribute('aria-pressed',String(mode==='live'));
      label.textContent = mode==='live' ? `Live AI · ${providerName}` : 'Curated study guide';
      note(mode==='live' ? 'Live questions go to the configured AI provider. Sign-in is required.' : 'Study guide responses come from the built-in learning library. No AI request is sent.');
    }
    function open() {
      panel.hidden = false;launcher.setAttribute('aria-expanded','true');root.classList.add('is-open');
      if (!log.children.length) bubble(`Ask me about ${TOPIC_LABELS[context.topic]||'your current lesson'}. Choose Hint, Explain, Worked example or Check my answer. The study guide works without live AI.`, 'assistant', 'Welcome');
      textarea.focus({preventScroll:true});
      if (!root.dataset.historyChecked){root.dataset.historyChecked='true';restoreHistory();}
      if (!root.dataset.checked) {
        root.dataset.checked = 'true';
        fetch(CHAT_URL,{credentials:'same-origin',cache:'no-store'}).then(r => r.ok ? r.json() : null).then(data => {
          liveEnabled = data?.aiEnabled === true;
          providerName = data?.provider === 'groq' ? 'Groq' : data?.provider === 'openai' ? 'OpenAI' : 'AI';
          live.disabled = !liveEnabled;
          syncMode();
        }).catch(() => {live.disabled = true;note('The study guide is available; live AI status could not be checked.');});
      }
    }
    function hide() {if (abort) abort.abort();panel.hidden = true;root.classList.remove('is-open');launcher.setAttribute('aria-expanded','false');launcher.focus({preventScroll:true});}
    launcher.addEventListener('click',()=>panel.hidden?open():hide());close.addEventListener('click',hide);
    document.addEventListener('keydown',event => {if (!panel.hidden && event.key === 'Escape'){event.preventDefault();hide();}});
    for (const prompt of promptsFor(context)) {const button = document.createElement('button');button.type='button';button.textContent=prompt;button.addEventListener('click',()=>{textarea.value=prompt;form.requestSubmit();});suggestions.append(button);}
    [guide,live].forEach(button => button.addEventListener('click',()=>{if(button.disabled)return;mode=button.dataset.mode;syncMode();}));
    async function offlineAnswer(question) {
      try {
        const match = matchGuide(question, await loadGuide());
        if (!match) {
          bubble('I could not find a close enough match in the offline library. Try asking about data cleaning, SQL joins, DAX, Excel formulas, Power BI models or dashboard design. For a more specific question, open Tutor Studio.', 'assistant','Study guide · no close match');return;
        }
        let answer = responseStyle==='hint' ? (match.practice ? `**Hint**\n\n${match.practice}\n\nTry it first, then ask for an explanation.` : `**Hint**\n\nThink about the key idea in: ${match.question}. What would your first step be?`) : match.explanation;
        if (responseStyle!=='hint' && match.example) answer += '\n\n**Example**\n\n' + match.example;
        if (responseStyle!=='hint' && match.practice) answer += '\n\n**Try this**\n\n' + match.practice;
        if (responseStyle!=='hint' && match.pitfall) answer += '\n\n**Watch out for**\n\n' + match.pitfall;
        bubble(answer, 'assistant', 'From the DataLearning study guide');
      } catch {bubble('The offline guide could not load. Open Tutor Studio or try again with a connection.', 'assistant', 'Unavailable');}
    }
    async function liveAnswer(question) {
      const controller = new AbortController();abort = controller;stop.hidden=false;
      const requestGeneration=generation;
      const pending=bubble('Connecting to live AI…','assistant','Live AI');
      let answer='',finished=false;
      try {
        const response=await fetch(CHAT_URL,{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json','Accept':'text/event-stream'},body:JSON.stringify({stream:true,question:`Learning mode: ${responseStyle}. ${responseStyle==='hint'?'Give only a scaffolded hint, not the final solution.':responseStyle==='check'?'Critique the learner approach and ask for missing work before providing a solution.':''} Context: ${TOPIC_LABELS[context.topic]||'General'}${context.week?' Week '+context.week:''}. ${question}`.slice(0,2000),topic:context.topic,history:history.slice(-6).map(m=>({...m,content:m.content.slice(0,900)}))}),signal:controller.signal});
        if(!response.ok){const data=await response.json().catch(()=>({}));pending.remove();bubble(data.error||'Live AI is unavailable. Please try again.','assistant',response.status===401?'Sign-in required':'Live AI error');return}
        if(!response.body)throw new Error('Streaming unavailable');
        const body=pending.querySelector('.dl-float-answer');const reader=response.body.getReader();const decoder=new TextDecoder();let buffer='';
        while(true){
          const {done,value}=await reader.read();if(done)break;
          if(controller.signal.aborted||generation!==requestGeneration){await reader.cancel();return}
          buffer+=decoder.decode(value,{stream:true});
          const frames=buffer.split(/\r?\n\r?\n/);buffer=frames.pop()||'';
          for(const frame of frames){
            const type=frame.match(/^event:\s*(\S+)/m)?.[1];const dataLine=frame.split(/\r?\n/).find(line=>line.startsWith('data:'));
            if(!dataLine)continue;
            let data;try{data=JSON.parse(dataLine.slice(5))}catch{continue}
            if(type==='delta'&&typeof data.text==='string'){answer+=data.text;renderAnswer(body,answer);log.scrollTop=log.scrollHeight}
            if(type==='done')finished=true;
            if(type==='error')throw new Error(data.error||'Stream interrupted');
          }
        }
        pending.remove();
        if(!answer.trim()||!finished)throw new Error('Incomplete response');
        bubble(answer,'assistant',`${providerName} · AI response`);
        history=[...history,{role:'user',content:question.slice(0,5000)},{role:'assistant',content:answer.slice(0,5000)}].slice(-40);
        await saveHistory();
      }catch(error){
        pending.remove();if(controller.signal.aborted||generation!==requestGeneration)return;
        bubble(answer?`The response stopped early. Partial text:\n\n${answer}`:'The AI service did not respond. Retry or use the Study guide.','assistant','Connection issue');
      }finally{if(abort===controller)abort=null;stop.hidden=true}
    }
    form.addEventListener('submit', async event => {
      event.preventDefault();const question = textarea.value.trim();if (!question || send.disabled)return;
      lastQuestion=question;retry.hidden=true;send.disabled = true;textarea.disabled = true;
      bubble(question, 'user');
      try {if (mode==='live' && liveEnabled) await liveAnswer(question);else await offlineAnswer(question);textarea.value='';}
      finally {send.disabled=false;textarea.disabled=false;retry.hidden=false;textarea.focus({preventScroll:true});}
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
