/* Shared published branding: fetch from server on every page; never use local storage as authority. */
(()=>{'use strict';
 const fallback={name:'DataLearning',primary:'#123B4A',secondary:'#183047',accent:'#B66B42',background:'#F8FAFC',logo:null};
 let current=null;const originalTitle=document.title;
 const validHex=x=>/^#[0-9a-fA-F]{6}$/.test(x||'');
 const readableOnWhite=hex=>{
  const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)
    .map(channel=>channel<=.04045?channel/12.92:((channel+.055)/1.055)**2.4);
  return 1.05/(.05+.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2])>=4.5;
 };
 function apply(input){
  const b={...fallback,...input};if(!['primary','secondary','accent','background'].every(k=>validHex(b[k])))return;
  for(const key of ['primary','secondary'])if(!readableOnWhite(b[key]))b[key]=fallback[key];
  const root=document.documentElement;const values={'--dl-brand-primary':b.primary,'--dl-brand-secondary':b.secondary,'--dl-brand-accent':b.accent,'--dl-brand-background':b.background,'--dl-paper':b.background,'--dl-ink':b.secondary,'--dl-accent':b.accent,'--dl-accent-dark':b.primary,'--dl-outline':'#D8E1E8','--ui-accent':b.primary,'--ui-accent-strong':b.primary,'--ui-blue':b.secondary,'--ui-deep':b.secondary,'--ui-ink':b.secondary,'--brand-navy':b.secondary,'--brand-blue':b.secondary,'--brand-orange':b.primary,'--brand-accent':b.accent,'--auth-navy':b.secondary,'--auth-coral':b.primary,'--accent':b.primary,'--primary':b.secondary,'--ink':b.secondary,'--navy':b.secondary,'--bw-midnight':b.secondary,'--bw-burgundy':b.primary,'--bw-copper':b.accent,'--ui-paper':b.background,'--paper':b.background,'--bw-ivory':b.background,'--bw-nav-gradient':`linear-gradient(145deg,${b.secondary},${b.primary})`,'--bw-top-gradient':`linear-gradient(105deg,${b.secondary},${b.primary})`};
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
 async function refresh(initial=false){
  try{
   const response=initial&&window.DataLearningFirstBrand
     ? await window.DataLearningFirstBrand
     : await fetch('/api/branding',{cache:'no-store',credentials:'same-origin'}).then(r=>r.ok?r.json():null);
   if(response)apply(response);
  }catch{
   // Keep the last validated palette on a transient network failure.
  }finally{
   if(!current)apply(fallback);
   if(initial)delete document.documentElement.dataset.brandPending;
  }
 }
 window.DataLearningBrand={refresh,apply,defaults:fallback,get current(){return current}};
 void refresh(true);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
 window.addEventListener('focus',()=>{if(current)void refresh()});
 // Refresh while a tab remains open, including on other devices, without requiring sign-in.
 setInterval(()=>{if(!document.hidden)refresh()},30000);
})();
