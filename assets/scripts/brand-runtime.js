/* Resolve the published palette before revealing a new page. */
(()=>{'use strict';
 const fallback={name:'DataLearning',primary:'#123B4A',secondary:'#183047',accent:'#B66B42',background:'#F8FAFC',logo:null};
 const root=document.documentElement;
 root.dataset.brandPending='';
 let current=null, originalTitle;
 const validHex=x=>/^#[0-9a-fA-F]{6}$/.test(x||'');
 const readableOnWhite=hex=>{
  const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)
    .map(channel=>channel<=.04045?channel/12.92:((channel+.055)/1.055)**2.4);
  return 1.05/(.05+.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2])>=4.5;
 };
 function apply(input){
  const b={...fallback,...input};if(current?.version>0&&b.version<current.version)return false;if(!['primary','secondary','accent','background'].every(k=>validHex(b[k])))return false;
  for(const key of ['primary','secondary'])if(!readableOnWhite(b[key]))b[key]=fallback[key];
  const values={'--dl-brand-primary':b.primary,'--dl-brand-secondary':b.secondary,'--dl-brand-accent':b.accent,'--dl-brand-background':b.background,'--dl-paper':b.background,'--dl-ink':b.secondary,'--dl-accent':b.accent,'--dl-accent-dark':b.primary,'--dl-outline':'#D8E1E8','--ui-accent':b.primary,'--ui-accent-strong':b.primary,'--ui-blue':b.secondary,'--ui-deep':b.secondary,'--ui-ink':b.secondary,'--brand-navy':b.secondary,'--brand-blue':b.secondary,'--brand-orange':b.primary,'--brand-accent':b.accent,'--auth-navy':b.secondary,'--auth-coral':b.primary,'--accent':b.primary,'--primary':b.secondary,'--ink':b.secondary,'--navy':b.secondary,'--bw-midnight':b.secondary,'--bw-burgundy':b.primary,'--bw-copper':b.accent,'--ui-paper':b.background,'--paper':b.background,'--bw-ivory':b.background,'--bw-nav-gradient':`linear-gradient(145deg,${b.secondary},${b.primary})`,'--bw-top-gradient':`linear-gradient(105deg,${b.secondary},${b.primary})`};
  for(const [k,v] of Object.entries(values))root.style.setProperty(k,v);
  root.style.setProperty('--ui-gradient',`linear-gradient(116deg,${b.secondary},${b.primary})`);root.style.setProperty('--dl-gradient-hero',`linear-gradient(115deg,${b.secondary},${b.primary})`);
  root.dataset.brandReady='true';
  current=b;
  if(document.readyState!=='loading')updateDocument();
  return true;
 }
 function updateDocument(){
  if(!current)return;
  const b=current;
  originalTitle??=document.title;
  const name=String(b.name||fallback.name).trim();
  document.title=originalTitle.replace(/DataLearning|Data Analysis Learning Path|data learning/gi,name);
  document.querySelectorAll('meta[name="theme-color"]').forEach(el=>el.content=b.secondary);
  document.querySelectorAll('.dlp-brand span,.dlu-brand-name,.dlx-loader-wordmark,.brand-name,[data-brand-name]').forEach(el=>{if(el.dataset.brandOriginal===undefined)el.dataset.brandOriginal=el.textContent||'';el.textContent=name});
  if(b.logo){document.querySelectorAll('img[src*="da-logo"],img[data-brand-logo],.dlp-brand img').forEach(el=>{el.src=b.logo;el.alt=name+' logo'});}
  window.dispatchEvent(new CustomEvent('datalearning:brand',{detail:{...b}}));
 }
 let pending;
 function refresh(){
  if(pending)return pending;
  pending=(async()=>{
   try{
    const response=await fetch('/api/branding',{cache:'no-store',credentials:'same-origin',signal:AbortSignal.timeout(8500)});
    if(response.ok)apply(await response.json());
   }catch{
    // Keep the last validated palette when the branding service is unavailable.
   }finally{
    if(!current)apply(fallback);
    if(root.dataset.brandPending!==undefined){
     delete root.dataset.brandPending;
     window.dispatchEvent(new Event('datalearning:brand-settled'));
    }
    pending=null;
   }
  })();
  return pending;
 }
 document.addEventListener('DOMContentLoaded',updateDocument,{once:true});
 window.DataLearningBrand={refresh,apply,defaults:fallback,get current(){return current}};
 void refresh();document.addEventListener('visibilitychange',()=>{if(!document.hidden&&current)void refresh()});
 window.addEventListener('focus',()=>{if(current)void refresh()});
 // Refresh while a tab remains open, including on other devices, without requiring sign-in.
 setInterval(()=>{if(!document.hidden)refresh()},30000);
})();




/* Load the app-wide published palette after every route stylesheet and use its uploaded logo in the loader. */
(()=>{'use strict';const brand=window.DataLearningBrand;if(!brand)return;function paint(input){const b={...brand.defaults,...input};const root=document.documentElement;const mix=(c,p)=>'color-mix(in srgb,'+c+' '+p+'%, '+b.background+')';for(const [k,v] of Object.entries({'--dl-text':b.secondary,'--dl-muted':mix(b.secondary,66),'--dl-surface':mix('#fff',94),'--dl-border':mix(b.secondary,16),'--dl-soft':mix(b.primary,9),'--dl-paper':b.background,'--dl-ink':b.secondary,'--dl-outline':mix(b.secondary,16),'--dl-focus':b.accent,'--premium-ink':b.secondary,'--premium-surface':mix('#fff',94),'--premium-canvas':b.background,'--bw-midnight':b.secondary,'--bw-burgundy':b.primary,'--bw-sand':b.accent,'--bw-ivory':b.background,'--v5-ink':b.secondary,'--v5-orange':b.primary,'--v5-melon':b.accent,'--v5-canvas':b.background,'--workspace-raised':mix('#fff',94),'--workspace-line':mix(b.secondary,16)}))root.style.setProperty(k,v);root.style.setProperty('--dl-gradient-header','linear-gradient(135deg,'+b.secondary+','+b.primary+')');root.style.setProperty('--dl-gradient-hero','linear-gradient(115deg,'+b.secondary+','+b.primary+')');let link=document.getElementById('dl-published-appearance');if(!link){link=document.createElement('link');link.id='dl-published-appearance';link.rel='stylesheet';link.href='/assets/styles/brand-runtime.css?v=r27';}document.head.append(link);const art=document.querySelector('#dlxPageLoader .dlx-loader-art');if(art){art.classList.toggle('has-brand-logo',!!b.logo);let img=art.querySelector('.dlx-loader-brand-logo');if(b.logo){if(!img){img=document.createElement('img');img.className='dlx-loader-brand-logo';img.decoding='async';art.append(img);}img.src=b.logo;img.alt=(b.name||brand.defaults.name)+' logo';}else img?.remove();}document.querySelectorAll('img[src*=da-logo],img[data-brand-logo],.dlp-brand img,.dlu-brand img,.ac-brand img').forEach(el=>{if(el.dataset.brandOriginalSrc===undefined)el.dataset.brandOriginalSrc=el.getAttribute('src')||'';if(b.logo){el.src=b.logo;el.alt=(b.name||brand.defaults.name)+' logo';}else if(el.dataset.brandOriginalSrc)el.src=el.dataset.brandOriginalSrc;});}window.addEventListener('datalearning:brand',e=>paint(e.detail));window.addEventListener('datalearning:brand-settled',()=>paint(brand.current||brand.defaults));document.addEventListener('DOMContentLoaded',()=>paint(brand.current||brand.defaults),{once:true});if(brand.current)paint(brand.current);})();
