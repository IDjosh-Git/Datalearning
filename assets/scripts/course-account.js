/* Use the global verified session instead of repeating an auth network request. */
(()=>{'use strict';const a=document.getElementById('learnerAccountBtn');if(!a)return;
function apply(){const user=window.DALP_AUTH_USER;if(!user)return;a.textContent='My account';a.href='../account.html';}
if(window.DALP_AUTH_USER)apply();else window.addEventListener('dalp:auth-ready',apply,{once:true});
})();
