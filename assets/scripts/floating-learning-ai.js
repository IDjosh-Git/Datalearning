/** DataLearning site-wide assistant: guest-safe offline guide plus authenticated provider AI. */
(() => {
  'use strict';
  const BASE = location.pathname.includes('/courses/') ? '../' : '';
  const CHAT_URL = '/api/tutor';
  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3 14.4 9.6 21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3z"/><path d="M19 3v4M17 5h4"/></svg>';
  const CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6 18 18M18 6 6 18"/></svg>';
  const SEND = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m4 12 16-8-5 16-3.5-6.5L4 12zM11.5 13.5 20 4"/></svg>';
  const SUGGESTIONS = ['What is data analytics?', 'Explain SQL joins', 'What is filter context in DAX?'];
  const STOP = new Set(['a','an','the','is','are','of','to','in','at','and','or','what','how','why','can','i','do','does','for','with','me','please','explain','about','my','your','difference','between','on','use','using','from','when','it','this']);
  let mode = 'guide', liveEnabled = false, providerName = 'AI', history = [], abort = null, guidePromise = null;
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
  /** Render a conservative Markdown subset with DOM text nodes only, never provider HTML. */
  function renderInline(node, text) {
    const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*\n]+)\*\*|`([^`\n]+)`|\*([^*\n]+)\*/g;
    let cursor = 0, match;
    while ((match = pattern.exec(text))) {
      if (match.index > cursor) node.append(document.createTextNode(text.slice(cursor,match.index)));
      let element;
      if (match[1] && match[2]) {
        element=document.createElement('a');element.textContent=match[1];
        try {const u=new URL(match[2]);if(!['https:','http:'].includes(u.protocol))throw Error('Invalid URL');element.href=u.href;element.rel='noopener noreferrer';element.target='_blank'}
        catch{element=document.createElement('span');element.textContent=match[1]}
      } else if (match[3]) {element=document.createElement('strong');element.textContent=match[3]}
      else if (match[4]) {element=document.createElement('code');element.textContent=match[4]}
      else {element=document.createElement('em');element.textContent=match[5]}
      node.append(element);cursor=pattern.lastIndex;
    }
    if(cursor<text.length)node.append(document.createTextNode(text.slice(cursor)));
  }
  function renderAnswer(container, input) {
    const value = sanitize(input).replace(/\r\n?/g,'\n').replace(/[\u200b\u200c\u200d\ufeff]/g,'');
    const lines = value.split('\n');
    let i=0;
    const addParagraph=content=>{if(!content.trim())return;const p=document.createElement('p');renderInline(p,content.trim());container.append(p)};
    while(i<lines.length){
      const line=lines[i].trimEnd(), trimmed=line.trim();
      if(!trimmed){i++;continue}
      const fence=trimmed.match(/^```\s*([a-zA-Z0-9_+#.-]*)\s*$/);
      if(fence){const lang=fence[1],body=[];i++;while(i<lines.length&&!/^```\s*$/.test(lines[i].trim())){body.push(lines[i]);i++}if(i<lines.length)i++;
        const wrap=document.createElement('div');wrap.className='dl-float-code-wrap';
        if(lang){const header=document.createElement('div');header.className='dl-float-code-lang';header.textContent=lang;wrap.append(header)}
        const pre=document.createElement('pre'),code=document.createElement('code');code.textContent=body.join('\n');pre.append(code);wrap.append(pre);container.append(wrap);continue;
      }
      const heading=trimmed.match(/^(#{1,4})\s+(.+)$/);
      if(heading){const h=document.createElement(heading[1].length<3?'h3':'h4');renderInline(h,heading[2]);container.append(h);i++;continue}
      const unordered=/^[-*+]\s+(.+)$/,ordered=/^\d+[.)]\s+(.+)$/;
      const item=trimmed.match(unordered)||trimmed.match(ordered);
      if(item){const ol=!!trimmed.match(ordered),list=document.createElement(ol?'ol':'ul');
        while(i<lines.length){const t=lines[i].trim(),m=t.match(ol?ordered:unordered);if(!m)break;
          const li=document.createElement('li');renderInline(li,m[1]);list.append(li);i++;
        }container.append(list);continue;
      }
      if(/^>\s+/.test(trimmed)){const quote=document.createElement('blockquote');renderInline(quote,trimmed.replace(/^>\s+/,''));container.append(quote);i++;continue}
      if(/^(-{3,}|\*{3,})$/.test(trimmed)){container.append(document.createElement('hr'));i++;continue}
      const paragraph=[];
      while(i<lines.length){const t=lines[i].trim();if(!t||/^```|^#{1,4}\s|^[-*+]\s|^\d+[.)]\s|^>\s/.test(t))break;paragraph.push(t);i++}
      if(paragraph.length)addParagraph(paragraph.join(' '));else {addParagraph(trimmed);i++}
    }
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
          <button class="dl-float-close" type="button" aria-label="Close learning coach">${CLOSE}</button>
        </header>
        <div class="dl-float-mode" role="group" aria-label="Choose coach mode">
          <button class="dl-float-mode-btn is-active" data-mode="guide" type="button" aria-pressed="true">Study guide</button>
          <button class="dl-float-mode-btn" data-mode="live" type="button" aria-pressed="false" disabled>Live AI</button>
        </div>
        <p class="dl-float-status" id="dl-float-status" role="status">Study guide works without signing in. Live AI requires a configured provider and sign-in.</p>
        <div class="dl-float-messages" id="dl-float-messages" role="log" aria-label="Coach conversation" aria-live="polite"></div>
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
    function bubble(text, who, heading) {
      const el = document.createElement('div');el.className = 'dl-float-bubble ' + (who === 'user' ? 'is-user' : 'is-guide');
      if (heading) {const name = document.createElement('strong');name.textContent = heading;el.append(name);}
      if(who==='user') {const body=document.createElement('p');body.textContent=sanitize(text);el.append(body)}
      else {const body=document.createElement('div');body.className='dl-float-answer';renderAnswer(body,text);el.append(body)}
      log.append(el);
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
      if (!log.children.length) bubble('Ask me about a data analysis concept. I can find explanations and practice tasks from the app’s study guide. Switch to Live AI when signed in and configured.', 'assistant', 'Welcome');
      textarea.focus({preventScroll:true});
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
    for (const prompt of SUGGESTIONS) {const button = document.createElement('button');button.type='button';button.textContent=prompt;button.addEventListener('click',()=>{textarea.value=prompt;form.requestSubmit();});suggestions.append(button);}
    [guide,live].forEach(button => button.addEventListener('click',()=>{if(button.disabled)return;mode=button.dataset.mode;history=[];syncMode();}));
    async function offlineAnswer(question) {
      try {
        const match = matchGuide(question, await loadGuide());
        if (!match) {
          bubble('I could not find a close enough match in the offline library. Try asking about data cleaning, SQL joins, DAX, Excel formulas, Power BI models or dashboard design. For a more specific question, open Tutor Studio.', 'assistant','Study guide · no close match');return;
        }
        let answer = match.explanation;
        if (match.example) answer += '\n\n**Example**\n\n' + match.example;
        if (match.practice) answer += '\n\n**Try this**\n\n' + match.practice;
        if (match.pitfall) answer += '\n\n**Watch out for**\n\n' + match.pitfall;
        bubble(answer, 'assistant', 'From the DataLearning study guide');
      } catch {bubble('The offline guide could not load. Open Tutor Studio or try again with a connection.', 'assistant', 'Unavailable');}
    }
    async function liveAnswer(question) {
      const controller = new AbortController();abort = controller;
      const pending = bubble('Thinking through your question…','assistant','Live AI');
      try {
        const response = await fetch(CHAT_URL,{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,topic:'general',history:history.slice(-6)}),signal:controller.signal});
        const data = await response.json().catch(()=>({}));pending.remove();
        if (!response.ok) {
          if (response.status===401) {
            note('Please sign in to use Live AI. Study guide remains available.');
            bubble('Live AI requires a signed-in learner account. Use the Study guide tab for an offline explanation or sign in to continue.', 'assistant','Sign-in required');
            const link = document.createElement('a');link.href = BASE+'auth.html';link.className='dl-float-signin';link.textContent='Sign in for Live AI';log.append(link);
          } else if (response.status===503) {note('Live AI is temporarily unavailable; Study guide remains available.');bubble(data.error || 'Live AI is not currently available. You can switch to the Study guide.', 'assistant','Service unavailable');}
          else bubble(data.error || 'The AI request could not be completed. Your question remains available.', 'assistant','Try again');
          return;
        }
        if (typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('Empty AI response');
        bubble(data.answer,'assistant',`${providerName} · AI response`);
        history = [...history,{role:'user',content:question.slice(0,900)},{role:'assistant',content:data.answer.slice(0,900)}].slice(-6);
      } catch (error) {
        pending.remove();if (controller.signal.aborted)return;
        bubble('The AI service did not respond. Switch to the Study guide or retry your question.', 'assistant','Connection issue');
      } finally {abort=null;}
    }
    form.addEventListener('submit', async event => {
      event.preventDefault();const question = textarea.value.trim();if (!question || send.disabled)return;
      send.disabled = true;textarea.disabled = true;
      bubble(question, 'user');
      try {if (mode==='live' && liveEnabled) await liveAnswer(question);else await offlineAnswer(question);textarea.value='';}
      finally {send.disabled=false;textarea.disabled=false;textarea.focus({preventScroll:true});}
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
