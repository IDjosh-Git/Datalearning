/* Site-wide nav for legacy DataLearning pages. No auth, grade or database side effects. */
(()=>{'use strict';
 function init(){const overlay=document.getElementById('dlxNavDialog'),open=document.querySelector('.dlx-menu-button'),close=document.querySelector('.dlx-nav-close');if(!overlay||!open||!close)return;let prior=null;
 const focusable=()=>[...overlay.querySelectorAll('a[href],button:not(:disabled)')].filter(e=>e.getClientRects().length>0);
 function toggle(show){if(show){prior=document.activeElement;overlay.hidden=false;open.setAttribute('aria-expanded','true');document.body.classList.add('dlx-menu-open');close.focus();}else{overlay.hidden=true;open.setAttribute('aria-expanded','false');document.body.classList.remove('dlx-menu-open');if(prior?.isConnected)prior.focus();else open.focus();}}
 open.addEventListener('click',()=>toggle(true));close.addEventListener('click',()=>toggle(false));overlay.addEventListener('click',e=>{if(e.target===overlay)toggle(false)});document.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape'){e.preventDefault();toggle(false);return}if(e.key!=='Tab')return;const xs=focusable();if(!xs.length)return;if(e.shiftKey&&document.activeElement===xs[0]){e.preventDefault();xs.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===xs.at(-1)){e.preventDefault();xs[0].focus()}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
