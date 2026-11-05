(() => {
 const button=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');
 if(button&&nav){button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));button.textContent=open?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false');button.textContent='☰'}));}
 const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
})();
