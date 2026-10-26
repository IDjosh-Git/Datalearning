/* Practice Arena UI enhancement: preserves existing exercise grading and offline SQL subset. */
(()=>{'use strict';
const $=(s,root=document)=>root.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const presets=[['All orders','SELECT * FROM orders LIMIT 5'],['Top orders','SELECT order_id, amount FROM orders ORDER BY amount DESC LIMIT 5'],['Revenue by region','SELECT region, SUM(amount) AS revenue FROM orders GROUP BY region'],['Customers','SELECT customer_name, city FROM customers'],['Join orders + customers','SELECT o.order_id, c.customer_name, o.amount FROM orders o JOIN customers c ON o.customer_id=c.customer_id'],['Window ranking','SELECT order_id, amount, ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank FROM orders']];
const schema={orders:['order_id','customer_id','amount','region','status','order_date'],customers:['customer_id','customer_name','city','country'],products:['product_id','product_name','category','unit_price'],order_items:['item_id','order_id','product_id','quantity']};
function distance(a,b){const d=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=d[0];d[0]=i;for(let j=1;j<=b.length;j++){let old=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old}}return d[b.length]}
function diagnose(query,error){const msg=String(error?.message||error||'The query could not be executed.');let hint='Check the SELECT syntax and supported clauses. This practice engine supports a read-only SQL subset.',fix=null;
 if(!/\bFROM\b/i.test(query)&&/^\s*SELECT\b/i.test(query)){hint='Add FROM followed by a table name (orders or customers).'; const m=query.match(/^([\s\S]*?)(\s+(?:WHERE|GROUP|ORDER|LIMIT)\b[\s\S]*)?$/i);fix=(m?m[1]:query).trim()+' FROM orders'+(m?.[2]||'');}
 else if((query.match(/'/g)||[]).length%2){hint='A string literal has an unclosed single quote. Close it with another single quote.';fix=query+"'";}
 else if(/Unknown column/i.test(msg)){const bad=msg.match(/Unknown column\s+([\w.]+)/i)?.[1];const table=query.match(/\bFROM\s+(orders|customers)\b/i)?.[1]?.toLowerCase();const names=table?schema[table]:Object.values(schema).flat();const good=bad&&names.map(n=>({n,d:distance(bad.toLowerCase(),n)})).sort((a,b)=>a.d-b.d)[0];if(good&&good.d<=Math.max(2,Math.floor(bad.length/3))){hint=`Unknown column “${bad}”. Did you mean “${good.n}”?`;fix=query.replace(new RegExp('\\b'+bad+'\\b','gi'),good.n)}else hint=`Unknown column “${bad||''}”. Check the column names in the schema above.`;}
 else if(/Unsupported SQL syntax/i.test(msg)){const tm=query.match(/\bFROM\s+(\w+)/i);if(tm&&!schema[tm[1].toLowerCase()]){let nearest=Object.keys(schema).map(n=>({n,d:distance(tm[1].toLowerCase(),n)})).sort((a,b)=>a.d-b.d)[0];hint=`Table “${tm[1]}” is unavailable. Available tables: orders and customers.`;if(nearest.d<=3){hint+=` Did you mean “${nearest.n}”?`;fix=query.replace(/\bFROM\s+\w+/i,'FROM '+nearest.n)}}}
 else if(/Only one read-only/i.test(msg))hint='Use one SELECT statement only. INSERT, UPDATE, DELETE and multi-statement queries are not permitted.';
 return {msg,hint,fix:fix!==query?fix:null};}
/* Tokenise raw SQL before escaping it. Never apply regex replacements to HTML markup. */
const sqlKeywords=new Set('SELECT FROM WHERE GROUP BY ORDER HAVING LIMIT DISTINCT AS DESC ASC COUNT SUM AVG MIN MAX IS NOT NULL LIKE BETWEEN AND OR JOIN LEFT RIGHT INNER OUTER FULL CROSS ON USING WITH RECURSIVE UNION ALL CASE WHEN THEN ELSE END EXISTS IN TRUE FALSE OFFSET CAST COALESCE ROUND OVER PARTITION ROW_NUMBER RANK DENSE_RANK CURRENT_DATE STRFTIME IFNULL'.split(' '));
const sqlToken=/--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$)|'(?:''|[^'])*'|"(?:""|[^"])*"|`(?:``|[^`])*`|\[[^\]\r\n]*\]|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z_0-9]*\b/g;
function highlight(src){
 const input=String(src??'');let html='',last=0;
 sqlToken.lastIndex=0;
 for(const match of input.matchAll(sqlToken)){
  const token=match[0];html+=esc(input.slice(last,match.index));
  let type='';
  if(token.startsWith('--')||token.startsWith('/*'))type='arena-comment';
  else if(/^[\'"`\[]/.test(token))type='arena-string';
  else if(/^\d/.test(token))type='arena-number';
  else if(sqlKeywords.has(token.toUpperCase()))type='arena-kw';
  html+=type?`<span class="${type}">${esc(token)}</span>`:esc(token);
  last=match.index+token.length;
 }
 return html+esc(input.slice(last));
}
/* Leave text insertion to the native textarea; highlight at most once per frame. */
function attachEditor(textarea){
 const wrapper=textarea.closest('.arena-workspace');
 const code=wrapper?.querySelector('#arenaHighlight');
 const lines=wrapper?.querySelector('#arenaLines');
 if(!code||!lines)return;
 textarea.setAttribute('spellcheck','false');
 textarea.setAttribute('autocorrect','off');
 textarea.setAttribute('autocapitalize','off');
 textarea.setAttribute('autocomplete','off');
 textarea.setAttribute('wrap','soft');
 textarea.classList.add('sql-editor-textarea');
 let frame=0,composing=false;
 const alignScroll=()=>{code.scrollTop=textarea.scrollTop;code.scrollLeft=textarea.scrollLeft;lines.scrollTop=textarea.scrollTop};
 const paint=()=>{frame=0;if(!textarea.isConnected)return;
  code.innerHTML=highlight(textarea.value)+'\n';
  lines.textContent=Array.from({length:Math.max(5,textarea.value.split('\n').length)},(_,i)=>i+1).join('\n');
  alignScroll();
 };
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint)};
 textarea.addEventListener('input',()=>{if(!composing)schedule()});
 textarea.addEventListener('scroll',alignScroll,{passive:true});
 textarea.addEventListener('compositionstart',()=>{composing=true});
 textarea.addEventListener('compositionend',()=>{composing=false;schedule()});
 textarea.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)&&!e.isComposing&&!composing){e.preventDefault();$('#practiceCheck')?.click()}
  // Tab and Space are intentionally not intercepted: native typing and
  // keyboard focus traversal are more reliable, including mobile keyboards.
 });
 paint();
}
function tab(which){document.querySelectorAll('[data-arena-tab]').forEach(b=>{let selected=b.dataset.arenaTab===which;b.classList.toggle('is-active',selected);b.setAttribute('aria-selected',String(selected))});document.querySelectorAll('[data-arena-panel]').forEach(el=>{el.hidden=el.dataset.arenaPanel!==which})}
function decorate(task){if(task.kind!=='SQL')return;const textarea=$('#practiceAnswer');if(!textarea)return;textarea.setAttribute('aria-label','SQL editor');textarea.setAttribute('autocomplete','off');const wrapper=document.createElement('div');wrapper.className='arena-workspace';textarea.parentNode.insertBefore(wrapper,textarea);wrapper.innerHTML=`<div class="arena-heading"><span class="arena-dot"></span> SQL Playground <small>Read-only · Local sample data</small></div><div class="arena-preset-bar" aria-label="Query examples">${presets.map(([label,sql],i)=>`<button type="button" data-arena-preset="${i}" title="${esc(sql)}">${esc(label)}</button>`).join('')}</div><div class="arena-grid"><div class="arena-editor-pane"><div class="arena-pane-heading">query.sql <span>SQL</span></div><div class="arena-editor"><div class="arena-lines" id="arenaLines" aria-hidden="true"></div><div class="arena-code"><pre id="arenaHighlight" aria-hidden="true"></pre><div id="arenaInputHost"></div></div></div><div class="arena-shortcut">Ctrl / ⌘ + Enter to run</div></div><div class="arena-output-pane"><div class="arena-tabs" role="tablist" aria-label="Query output"><button role="tab" type="button" data-arena-tab="results" aria-selected="true" class="is-active">Data results</button><button role="tab" type="button" data-arena-tab="console" aria-selected="false">Execution console</button></div><div class="arena-panel" data-arena-panel="results" role="tabpanel" id="arenaResults"><div class="arena-idle">Run a SQL query to preview the results here.</div></div><div class="arena-panel" data-arena-panel="console" role="tabpanel" id="arenaConsole" hidden><div class="arena-idle">The execution log and diagnostics appear here.</div></div></div></div>`;$('#arenaInputHost').append(textarea);attachEditor(textarea);wrapper.addEventListener('click',e=>{const preset=e.target.closest('[data-arena-preset]');if(preset){textarea.value=presets[Number(preset.dataset.arenaPreset)][1];textarea.dispatchEvent(new Event('input',{bubbles:true}));textarea.focus();return}const b=e.target.closest('[data-arena-tab]');if(b)tab(b.dataset.arenaTab);const fix=e.target.closest('[data-arena-fix]');if(fix){textarea.value=wrapper._fix||textarea.value;textarea.dispatchEvent(new Event('input',{bubbles:true}));textarea.focus();tab('results')}});}
function report({query,rows,error,duration,passed}){const wrapper=$('.arena-workspace');if(!wrapper)return;const results=$('#arenaResults'),consoleEl=$('#arenaConsole'),time=Math.max(0,Number(duration)||0).toFixed(1);if(error){const d=diagnose(query,error);wrapper._fix=d.fix;results.innerHTML=`<div class="arena-error" role="alert"><strong>Query could not execute</strong><p>${esc(d.msg)}</p><p>${esc(d.hint)}</p>${d.fix?'<button type="button" data-arena-fix>Apply suggested correction</button>':''}</div>`;consoleEl.innerHTML=`<div class="arena-log arena-log-error">ERROR · ${esc(time)} ms<br>${esc(d.msg)}<br>${esc(d.hint)}</div>`;tab('results');return}
 const data=Array.isArray(rows)?rows:[];const from=query.match(/\bFROM\s+(orders|customers|products|order_items)\b/i)?.[1]?.toLowerCase();const cols=data.length?Object.keys(data[0]):from&&/^\s*SELECT\s+\*\s+FROM\b/i.test(query)?schema[from]:[];const badge=`⚡ ${data.length} row${data.length===1?'':'s'} returned in ${time}ms`;
 results.innerHTML=`<div class="arena-summary"><span>${badge}</span><span>${passed?'Challenge passed':'Query executed'}</span></div>${data.length?`<div class="arena-table-scroll"><table class="arena-table"><thead><tr>${cols.map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${data.map((row,i)=>`<tr>${cols.map(k=>`<td>${row[k]===null?'<span class="arena-null">NULL</span>':esc(row[k])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:'<div class="arena-empty"><strong>Query executed successfully</strong><p>No matching records were found for this query. Try adjusting your filter conditions.</p></div>'}`;
 consoleEl.innerHTML=`<div class="arena-log">SUCCESS · ${esc(time)} ms<br>${data.length} row(s) returned. ${passed?'The answer also passed the grading datasets.':'Execution success does not necessarily mean the challenge answer is correct.'}</div>`;tab('results')}
window.DALP_ARENA_UPGRADE={decorate,report,diagnose};})();
