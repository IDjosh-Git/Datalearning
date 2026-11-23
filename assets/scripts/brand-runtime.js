/* Shared published branding: fetch from server on every page; never use local storage as authority. */
(()=>{'use strict';
 const fallback={name:'DataLearning',primary:'#023048',secondary:'#0B0909',accent:'#C58A69',background:'#F0EDDE',logo:null};
 let current=null;const originalTitle=document.title;
 const validHex=x=>/^#[0-9a-fA-F]{6}$/.test(x||'');
 function apply(input){
  const b={...fallback,...input};if(!['primary','secondary','accent','background'].every(k=>validHex(b[k])))return;
  const root=document.documentElement;const values={'--dl-brand-primary':b.primary,'--dl-brand-secondary':b.secondary,'--dl-brand-accent':b.accent,'--dl-brand-background':b.background,'--ui-accent':b.primary,'--ui-accent-strong':b.primary,'--ui-blue':b.secondary,'--ui-deep':b.secondary,'--ui-ink':b.secondary,'--brand-navy':b.secondary,'--brand-blue':b.secondary,'--brand-orange':b.primary,'--brand-accent':b.accent,'--auth-navy':b.secondary,'--auth-coral':b.primary,'--accent':b.primary,'--primary':b.secondary,'--ink':b.secondary,'--navy':b.secondary,'--bw-midnight':b.secondary,'--bw-burgundy':b.primary,'--bw-copper':b.accent,'--ui-paper':b.background,'--paper':b.background,'--bw-ivory':b.background,'--bw-nav-gradient':`linear-gradient(145deg,${b.secondary},${b.primary})`,'--bw-top-gradient':`linear-gradient(105deg,${b.secondary},${b.primary})`};
  for(const [k,v] of Object.entries(values))root.style.setProperty(k,v);
  root.style.setProperty('--ui-gradient',`linear-gradient(116deg,${b.secondary},${b.primary})`);root.style.setProperty('--dl-gradient-hero',`linear-gradient(115deg,${b.secondary},${b.primary})`);
  root.dataset.brandReady='true';
  const name=String(b.name||fallback.name).trim();
  document.title=originalTitle.replace(/DataLearning|Data Analysis Learning Path|data learning/gi,name);
  document.querySelectorAll('meta[name="theme-color"]').forEach(el=>el.content=b.secondary);
  document.querySelectorAll('.dlp-brand span,.dlu-brand-name,.dlx-loader-wordmark,.brand-name,[data-brand-name]').forEach(el=>{if(el.dataset.brandOriginal===undefined)el.dataset.brandOriginal=el.textContent||'';el.textContent=name});
  if(b.logo){document.querySelectorAll('img[src*="da-logo"],img[data-brand-logo],.dlp-brand img').forEach(el=>{el.src=b.logo;el.alt=name+' logo'});}
  current=b;window.dispatchEvent(new CustomEvent('datalearning:brand',{detail:{...b}}));
 }
 async function refresh(){try{const r=await fetch('/api/branding',{cache:'no-store',credentials:'same-origin'});if(!r.ok)throw Error('unavailable');const data=await r.json();apply(data)}catch{if(!current)apply(fallback)}}
 window.DataLearningBrand={refresh,apply,defaults:fallback,get current(){return current}};
 refresh();document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
 window.addEventListener('focus',()=>refresh());
 // Refresh while a tab remains open, including on other devices, without requiring sign-in.
 setInterval(()=>{if(!document.hidden)refresh()},30000);
})();
