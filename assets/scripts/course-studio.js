/* Dedicated practice studio. Preserves course content; does not auto-inject into lesson pages. */
(()=>{'use strict';
if(!document.body.classList.contains('ps-page'))return;
const catalog=window.COURSE_STUDIO_DATA||{};
const metadata={introduction:{name:'Foundations',page:'courses/introduction.html',icon:'◈'},excel:{name:'Excel',page:'courses/excel.html',icon:'▦'},sql:{name:'SQL',page:'courses/sql.html',icon:'⌘'},powerbi:{name:'Power BI',page:'courses/powerbi.html',icon:'▤'},tableau:{name:'Tableau',page:'courses/tableau.html',icon:'▧'},powerquery:{name:'Power Query',page:'courses/powerquery.html',icon:'≋'},statistics:{name:'Statistics',page:'courses/statistics.html',icon:'◫'},ai:{name:'AI Integration',page:'courses/ai.html',icon:'✧'}};
const allowed=Object.keys(metadata).filter(k=>Array.isArray(catalog[k])&&catalog[k].length);
if(!allowed.length)return;
const $=s=>document.querySelector(s);
const qparam=new URL(location.href).searchParams.get('course');
let course=allowed.includes(qparam)?qparam:'introduction';let focus=0,filter='all',query='',reveal=false;
let uid='',records={};
const scopedKey=id=>'data-learning-studio-v3:'+id;
const legacyKey='data-learning-studio-v2';
const getUser=()=>window.DALP_AUTH_USER?.id||'';
const load=()=>{uid=getUser();try{records=uid?JSON.parse(localStorage.getItem(scopedKey(uid))||'{}'):{};}catch{records={}};
 if(!records||typeof records!=='object'||Array.isArray(records))records={};
 const restore=$('#ps-restore');let old={};try{old=JSON.parse(localStorage.getItem(legacyKey)||'{}')}catch{}
 const canRestore=uid&&Object.keys(old).some(k=>allowed.some(c=>k.startsWith(c+':')))&&!Object.keys(records).length;
 restore.hidden=!canRestore;};
const save=()=>{if(!uid)return;try{localStorage.setItem(scopedKey(uid),JSON.stringify(records))}catch{status('Device storage is unavailable. Your practice may not remain after closing this page.')}};
const data=()=>catalog[course]||[];
const key=i=>course+':'+i;
const done=i=>!!records[key(i)]?.done;
const count=()=>data().filter((_,i)=>done(i)).length;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const status=s=>{$('#ps-status').textContent=s;};
const mobileBrowse=$('#ps-browse-mobile'),skillRail=$('#ps-rail');
const railClose=document.createElement('button');
railClose.type='button';railClose.id='ps-rail-close';railClose.className='ps-rail-close';
railClose.setAttribute('aria-label','Close skills list');
railClose.innerHTML='<span aria-hidden="true">&#215;</span><span>Close</span>';
skillRail.querySelector('.ps-rail-head')?.append(railClose);
railClose.addEventListener('click',()=>{setBrowse(false);mobileBrowse.focus({preventScroll:true})});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&skillRail.classList.contains('is-open')&&matchMedia('(max-width:780px)').matches){
  event.preventDefault();setBrowse(false);mobileBrowse.focus({preventScroll:true});
 }
});
function setBrowse(open){skillRail.classList.toggle('is-open',Boolean(open));mobileBrowse.setAttribute('aria-expanded',String(Boolean(open)));}
mobileBrowse.addEventListener('click',()=>{const opening=!skillRail.classList.contains('is-open');setBrowse(opening);if(opening)skillRail.scrollIntoView({behavior:'smooth',block:'nearest'});});
function validIndexes(){return data().map((_,i)=>i).filter(i=>{let u=data()[i];return (!query||u.join(' ').toLowerCase().includes(query))&&(filter==='all'||(filter==='done'?done(i):!done(i)));});}
function drawCourses(){const el=$('#ps-course-nav');el.innerHTML=allowed.map(k=>{
 const n=catalog[k].filter((_,i)=>records[k+':'+i]?.done).length;
 return `<a class="ps-course-pill ${k===course?'is-active':''}" href="studio.html?course=${k}" ${k===course?'aria-current="page"':''}><span class="ps-course-icon">${metadata[k].icon}</span><span>${escape(metadata[k].name)}<small>${n} of ${catalog[k].length} skills</small></span></a>`;
 }).join('');}
function drawList(){const items=validIndexes();const list=$('#ps-skill-list');list.innerHTML=items.length?items.map(i=>`<button type="button" class="ps-skill ${focus===i?'is-active':''}" data-skill="${i}" aria-current="${focus===i?'step':'false'}"><span class="ps-skill-num">${String(i+1).padStart(2,'0')}</span><span class="ps-skill-copy"><strong>${escape(data()[i][0])}</strong><small>${escape(data()[i][1])}</small></span><span class="ps-skill-indicator" aria-label="${done(i)?'Complete':'Not completed'}">${done(i)?'✓':'○'}</span></button>`).join(''):'<p class="ps-empty">No matching skills. Try another search or filter.</p>';
 $('#ps-list-count').textContent=`${items.length} ${items.length===1?'skill':'skills'}`;
}
function drawFocus(){const units=data();const u=units[focus];if(!u)return;
 $('#ps-course-label').textContent=metadata[course].name+' · Skill '+(focus+1)+' of '+units.length;
 $('#ps-skill-title').textContent=u[0];$('#ps-skill-description').textContent=u[1];
 $('#ps-example').textContent=u[2];$('#ps-prompt').textContent=u[3];
 $('#ps-answer').value=records[key(focus)]?.answer||'';
 const solution=$('#ps-solution');solution.hidden=!reveal;
 $('#ps-solution-copy').textContent=u[4];$('#ps-pitfall').textContent=u[5];
 $('#ps-reveal').textContent=reveal?'Hide explanation':'Check explanation';
 $('#ps-complete').textContent=done(focus)?'✓ Completed — practise again':'Mark skill complete';
 $('#ps-complete').setAttribute('aria-pressed',String(done(focus)));
 const items=validIndexes(),ix=items.indexOf(focus),hasPrev=ix>0,hasNext=ix>=0&&ix<items.length-1;
 $('#ps-prev').disabled=!hasPrev;$('#ps-next').disabled=!hasNext;
 $('#ps-back-course').href=metadata[course].page;
 const url=new URL(location.href);url.searchParams.set('course',course);url.searchParams.set('skill',String(focus+1));history.replaceState(null,'',url.pathname+url.search);
}
function drawProgress(){const n=count(),total=data().length;$('#ps-progress-total').textContent=`${n} / ${total}`;$('#ps-progress-fill').style.width=(total?Math.round(n/total*100):0)+'%';
 $('#ps-progress-label').textContent=(total?Math.round(n/total*100):0)+'% of skills completed';
 $('#ps-skill-total').textContent=String(total);
}
function refresh(){drawCourses();drawList();drawFocus();drawProgress();$('#ps-browse-label').textContent=`Browse ${data().length} ${metadata[course].name} skills`;}
function select(i,{scroll=false}={}){if(!(i>=0&&i<data().length))return;focus=i;reveal=false;refresh();if(scroll){setBrowse(false);$('#ps-focus-area').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}}
function findFirst(){const arr=validIndexes();return arr.includes(focus)?focus:(arr[0]??-1)}
function switchFilter(){const next=findFirst();drawList();if(next>=0){$('#ps-focus-area').hidden=false;select(next);}else{$('#ps-skill-title').textContent='No matching skills';$('#ps-skill-description').textContent='Change your filters or search to continue.';$('#ps-focus-area').hidden=true;$('#ps-prev').disabled=true;$('#ps-next').disabled=true;}}
$('#ps-course-nav').addEventListener('click',e=>{const a=e.target.closest('a.ps-course-pill');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const next=new URL(a.href,location.href).searchParams.get('course');if(!allowed.includes(next)||next===course)return;
 e.preventDefault();course=next;query='';filter='all';$('#ps-search').value='';$('#ps-filter').value='all';focus=Math.max(0,data().findIndex((_,i)=>!done(i)));reveal=false;setBrowse(false);refresh();$('#ps-focus-area').hidden=false;
 document.querySelector('.ps-focus').scrollIntoView({behavior:'smooth',block:'nearest'});status('Subject changed. Choose an exercise to continue.');});
$('#ps-skill-list').addEventListener('click',e=>{const b=e.target.closest('[data-skill]');if(b)select(Number(b.dataset.skill),{scroll:true})});
$('#ps-search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();$('#ps-focus-area').hidden=false;switchFilter()});
$('#ps-filter').addEventListener('change',e=>{filter=e.target.value;$('#ps-focus-area').hidden=false;switchFilter()});
$('#ps-prev').addEventListener('click',()=>{let a=validIndexes(),i=a.indexOf(focus);if(i>0)select(a[i-1],{scroll:true})});
$('#ps-next').addEventListener('click',()=>{let a=validIndexes(),i=a.indexOf(focus);if(i>=0&&i<a.length-1)select(a[i+1],{scroll:true})});
$('#ps-reveal').addEventListener('click',()=>{reveal=!reveal;$('#ps-solution').hidden=!reveal;$('#ps-reveal').textContent=reveal?'Hide explanation':'Check explanation'});
$('#ps-answer').addEventListener('input',e=>{if(!uid)return;let k=key(focus);records[k]={...(records[k]||{}),answer:e.target.value,updated:new Date().toISOString()};save();status('Your draft is saved on this device.')});
$('#ps-complete').addEventListener('click',()=>{if(!uid){status('Sign in to save your progress.');return;}let k=key(focus);records[k]={...(records[k]||{}),done:!records[k]?.done,updated:new Date().toISOString()};save();refresh();status(done(focus)?'Skill complete. Nice work!':'Moved back to your practice list.')});
$('#ps-restore').addEventListener('click',()=>{if(!uid)return;let legacy={};try{legacy=JSON.parse(localStorage.getItem(legacyKey)||'{}')}catch{}
 if(!window.confirm('Only restore these saved exercises if this device previously belonged to your own learner account. On a shared device, the old practice may belong to someone else. Continue?'))return;
 for(const [k,v] of Object.entries(legacy)){if(allowed.some(c=>k.startsWith(c+':'))&&/^\w+:\d+$/.test(k)&&v&&typeof v==='object')records[k]={done:!!v.done,updated:v.updated||''};}
 save();$('#ps-restore').hidden=true;refresh();status('Previous device practice has been restored to this account.');});
function init(){load();const requested=Number(new URL(location.href).searchParams.get('skill'));focus=Number.isInteger(requested)&&requested>=1&&requested<=data().length?requested-1:Math.max(0,data().findIndex((_,i)=>!done(i)));
 refresh();$('#ps-focus-area').hidden=false;status('Practice work is saved privately on this device.');}
window.addEventListener('dalp:auth-ready',()=>{let last=uid;load();if(last!==uid)init();else refresh()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
