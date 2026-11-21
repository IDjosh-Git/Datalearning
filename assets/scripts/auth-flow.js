/* Registration, sign-in, recovery, and sign-out using the existing Supabase project. */
(function(){
  'use strict';
  const $=id=>document.getElementById(id), db=()=>window.ZAH_DB?.client;
  const panels={login:'loginPanel',create:'signupPanel',forgot:'forgotPanel',reset:'resetPanel'};
  const text={
    login:['Welcome back','Sign in to pick up exactly where you left off.'],
    create:['Create your account','Start your learning journey and keep all your progress together.'],
    forgot:['Reset your password','We’ll email a secure link to help you regain access.'],
    reset:['Choose a new password','Create a new password to secure your learner account.']
  };
  const landing=new URL('index.html',location.href);
  const learnerDashboard=new URL('account.html',location.href);
  function destination(){
    try{
      const val=new URLSearchParams(location.search).get('return');if(!val)return learnerDashboard.href;
      const u=new URL(val,location.href),base=landing.pathname.slice(0,-'index.html'.length);
      if(u.origin!==location.origin||!u.pathname.startsWith(base)||u.pathname.endsWith('/auth.html'))return learnerDashboard.href;
      return u.href;
    }catch(_){return learnerDashboard.href}
  }
  // Make account-gated deep links transparent while retaining their full path and query.
  function explainReturnDestination(){
    const raw=new URLSearchParams(location.search).get('return');
    if(!raw)return;
    const intended=new URL(destination());
    const labels={
      'practice.html':'Practice Arena', 'studio.html':'Practice Studio',
      'tutor.html':'Tutor Studio', 'capstone.html':'Capstone Studio',
      'account.html':'your Learning Dashboard', 'reference.html':'Reference Library'
    };
    const filename=intended.pathname.split('/').pop();
    const route=labels[filename]||(/\/courses\/.+\.html$/.test(intended.pathname)?'your selected course':null);
    if(!route)return;
    const note=document.createElement('p');
    note.id='dalp90-return-notice';note.setAttribute('role','status');
    note.textContent='Sign in to continue to '+route+'. After a successful sign-in, you will return to your requested page'+(filename==='practice.html'&&intended.searchParams.has('challenge')?' and selected challenge':'')+'.';
    const head=$('authTitle')?.closest('.auth-heading')||$('authTitle')?.parentElement;
    if(head)head.append(note);
  }
  function nextAuthUrl(mode){
    const url=new URL('auth.html',location.href);
    const dest=new URL(destination());
    if(new URLSearchParams(location.search).has('return'))url.searchParams.set('return',dest.pathname+dest.search+dest.hash);
    if(mode)url.searchParams.set('mode',mode);
    return url.href;
  }
  function setMode(mode){
    if(!panels[mode])mode='login';
    Object.entries(panels).forEach(([k,id])=>$(id).hidden=k!==mode);
    $('authTabs').hidden=mode==='forgot'||mode==='reset';
    ['signInTab','createTab'].forEach((id,i)=>{$(id).classList.toggle('active',(i===0?mode==='login':mode==='create'));$(id).setAttribute('aria-selected',String(i===0?mode==='login':mode==='create'))});
    $('authTitle').textContent=text[mode][0];$('authSubtitle').textContent=text[mode][1];
    document.body.dataset.authMode=mode;
    ['signInTab','createTab'].forEach(id=>{$(id).tabIndex=$(id).getAttribute('aria-selected')==='true'?0:-1;});
  }
  function message(id,text,kind='warn'){
    const el=$(id);el.hidden=false;el.textContent=text;el.className='auth-msg '+kind;el.style.display='block';
  }
  function clearMessage(id){const e=$(id);e.hidden=true;e.style.display='none';e.textContent=''}
  function busy(button,flag,label){button.disabled=flag;button.textContent=flag?button.dataset.busyText:label}
  function errorText(e){
    const m=e?.message||'We couldn’t complete that request. Please try again.';
    if(/invalid login credentials/i.test(m))return 'Email or password is incorrect. Try again, or reset your password.';
    if(/email not confirmed/i.test(m))return 'Please confirm your email using the link we sent you, then sign in.';
    if(/rate limit/i.test(m))return 'Too many attempts. Please try again a little later.';
    if(/(network|fetch|timeout|connection)/i.test(m))return 'We couldn’t connect right now. Check your internet connection and try again.';
    if(/(database|schema|supabase|provider|jwt|postgrest|config|500|502|503)/i.test(m))return 'Something went wrong while opening your account. Please try again later.';
    if(/already registered|already been registered/i.test(m))return 'This email already has an account. Please sign in instead.';
    if(/weak password|password.{0,30}(length|short|weak)/i.test(m))return 'Choose a stronger password and try again.';
    console.warn('Account request failed:', e);
    return 'We couldn’t complete your request right now. Please try again or contact support.';
  }
  const emailOk=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  let completing=false;
  async function enter(user,msgId,justRegistered=false){
    if(completing)return;
    completing=true;
    // Register a verified DataLearning login before navigation. The DB trigger
    // creates/updates the matching learner_profiles directory row. This avoids
    // a race where the admin roster counts fewer users than Supabase.
    try { if (window.DALP_APP_USAGE?.record) await window.DALP_APP_USAGE.record('sign_in'); }
    catch (_) { console.warn('App-user sync will retry on the learning page'); }
    const el=msgId?$(msgId):null;
    if(el)message(msgId,'Signed in. Preparing your personal learning space…','success');
    try{
      window.DALP_AUTH_GATE?.prepareWorkspace(user);
      // Recovery is best-effort. Pages repeat cloud sync after navigation.
      if(window.ZAHProgressCloud?.recoverCurrentDevice){
        await Promise.race([
          window.ZAHProgressCloud.recoverCurrentDevice(user).catch(e=>console.warn('Progress sync will retry on learning page',e)),
          new Promise(resolve=>setTimeout(resolve,4500))
        ]);
      }
    }catch(e){console.warn('Post-login preparation will retry',e)}
    let target=destination();
    const firstVisit=justRegistered || new URLSearchParams(location.search).get('mode')==='welcome';
    // New learners arrive at the homepage; returning learners open their Learning Dashboard.
    // An explicit deep link takes precedence over the default destination.
    if(firstVisit && !new URLSearchParams(location.search).has('return') && !user?.user_metadata?.dalp_career_setup_at) target=new URL('career-setup.html',location.href).href;
    // Administrators use the same credentials and form as learners. An
    // explicit requested destination always takes precedence.
    try {
      const hasExplicitReturn=new URLSearchParams(location.search).has('return');
      if(!hasExplicitReturn && window.ZAH_DB?.client && user?.id){
        const result=await Promise.race([
          window.ZAH_DB.client.from('site_admins').select('user_id').eq('user_id',user.id).maybeSingle(),
          new Promise((_,reject)=>setTimeout(()=>reject(new Error('Role check timed out')),8000))
        ]);
        if(!result?.error && result?.data)target=new URL('admin.html',location.href).href;
      }
    }catch(error){console.warn('Role landing lookup deferred to page gate')}
    // Every page is server-gated. A valid hosting session is mandatory for
    // learners and administrators alike; never redirect without confirmation.
    try {
      const {data,error}=await db().auth.getSession();
      if(error||!data?.session)throw new Error('Sign-in session is unavailable.');
      if(!window.DALP_SERVER_SESSION?.establish)throw new Error('Secure session service is unavailable.');
      await Promise.race([
        window.DALP_SERVER_SESSION.establish(data.session),
        new Promise((_,reject)=>setTimeout(()=>reject(new Error('Secure session timed out')),9000))
      ]);
    }catch(error){
      completing=false;
      message(msgId||'loginMsg','Your identity was confirmed, but the secure app session could not be opened. Check your connection and select Sign in again.');
      return false;
    }
    location.replace(target);
  }
  const dbReady=()=>{
    if(db())return true;
    message('configWarn','We can’t open sign-in right now. Please check your connection and try again. If the problem continues, contact support.');
    return false;
  };
  $('signInTab').addEventListener('click',()=>setMode('login'));
  $('createTab').addEventListener('click',()=>setMode('create'));
  // WAI-ARIA tabs: left/right and Home/End work without a pointing device.
  const authTabButtons=[$('signInTab'),$('createTab')];
  $('authTabs').addEventListener('keydown',event=>{
    const key=event.key;
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(key))return;
    event.preventDefault();
    const current=Math.max(0,authTabButtons.indexOf(document.activeElement));
    const next=key==='Home'?0:key==='End'?authTabButtons.length-1:
      (current+(key==='ArrowRight'?1:-1)+authTabButtons.length)%authTabButtons.length;
    authTabButtons[next].focus();authTabButtons[next].click();
  });
  // A visible error message is accompanied by a field-level cue and focus.
  const flagInvalid=id=>{const input=$(id);if(!input)return;input.setAttribute('aria-invalid','true');input.focus();};
  document.querySelectorAll('.auth-field input').forEach(input=>
    input.addEventListener('input',()=>input.removeAttribute('aria-invalid')));

  document.querySelectorAll('button[data-auth-mode]').forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.authMode)));
  document.querySelectorAll('[data-password-toggle]').forEach(btn=>btn.addEventListener('click',()=>{
    const input=$(btn.dataset.passwordToggle),visible=input.type==='text';input.type=visible?'password':'text';btn.textContent=visible?'Show':'Hide';btn.setAttribute('aria-label',(visible?'Show':'Hide')+' password');
  }));
  $('loginForm').addEventListener('submit',async e=>{
    e.preventDefault();clearMessage('loginMsg');if(!dbReady())return;
    const email=$('loginEmail').value.trim(),password=$('loginPassword').value;
    if(!emailOk(email)||!password){flagInvalid(!emailOk(email)?'loginEmail':'loginPassword');message('loginMsg','Enter a valid email address and password.');return;}
    const button=$('loginBtn');busy(button,true,'Sign in');
    try{
      const {data,error}=await db().auth.signInWithPassword({email,password});
      if(error)throw error;
      if(!data?.user||!data?.session)throw new Error('Sign-in could not be confirmed. Please try again.');
      const entered=await enter(data.user,'loginMsg');
      if(entered===false)busy(button,false,'Sign in');
    }catch(error){message('loginMsg',errorText(error));busy(button,false,'Sign in')}
  });
  $('signupForm').addEventListener('submit',async e=>{
    e.preventDefault();clearMessage('signupMsg');if(!dbReady())return;
    const full_name=$('fullName').value.trim(),email=$('signupEmail').value.trim(),password=$('signupPassword').value,confirmation=$('signupConfirm').value;
    if(full_name.length<2){flagInvalid('fullName');message('signupMsg','Enter your full name to create an account.');return;}
    if(!emailOk(email)){flagInvalid('signupEmail');message('signupMsg','Enter a valid email address.');return;}
    if(password.length<8){flagInvalid('signupPassword');message('signupMsg','Choose a password with at least 8 characters.');return;}
    if(password!==confirmation){flagInvalid('signupConfirm');message('signupMsg','The passwords do not match.');return;}
    const button=$('signupBtn');busy(button,true,'Create account');
    try{
      const {data,error}=await db().auth.signUp({email,password,options:{data:{full_name},emailRedirectTo:nextAuthUrl('welcome')}});
      if(error)throw error;
      // Preserve the first-visit destination across email confirmation.
      // When email confirmation is disabled, open the homepage immediately.
      if(data?.session && data?.user){
        const entered=await enter(data.user,'signupMsg',true);
        if(entered===false)busy(button,false,'Create account');
        return;
      }
      $('loginEmail').value=email;
      setMode('login');
      message('loginMsg','Account request received. Check your email for the verification link, then sign in to set up your career roadmap.','success');
      $('loginEmail').focus();
    }catch(error){message('signupMsg',errorText(error))}
    finally{busy(button,false,'Create account')}
  });
  $('forgotForm').addEventListener('submit',async e=>{
    e.preventDefault();clearMessage('forgotMsg');if(!dbReady())return;
    const email=$('forgotEmail').value.trim();
    if(!emailOk(email)){flagInvalid('forgotEmail');message('forgotMsg','Enter the email address linked to your account.');return;}
    const button=$('forgotBtn');busy(button,true,'Send reset link');
    try{
      const {error}=await db().auth.resetPasswordForEmail(email,{redirectTo:nextAuthUrl('reset')});
      if(error)throw error;
      message('forgotMsg','If this address has an account, we’ll send a password-reset link. Check your inbox and spam folder.','success');
    }catch(error){message('forgotMsg',errorText(error))}
    finally{busy(button,false,'Send reset link')}
  });
  $('resetForm').addEventListener('submit',async e=>{
    e.preventDefault();clearMessage('resetMsg');if(!dbReady())return;
    const password=$('newPassword').value,confirm=$('confirmNewPassword').value;
    if(password.length<8){flagInvalid('newPassword');message('resetMsg','Use at least 8 characters.');return;}
    if(password!==confirm){flagInvalid('confirmNewPassword');message('resetMsg','The passwords do not match.');return;}
    const button=$('resetBtn');busy(button,true,'Update password');
    try{
      const {data,error:sErr}=await db().auth.getSession();
      if(sErr||!data.session)throw new Error('Your reset link has expired. Request another link.');
      const {error}=await db().auth.updateUser({password});
      if(error)throw error;
      await window.DALP_SERVER_SESSION?.clear();
      await db().auth.signOut({scope:'local'});
      setMode('login');
      message('loginMsg','Your password has been updated. Sign in with your new password.','success');
    }catch(error){message('resetMsg',errorText(error))}
    finally{busy(button,false,'Update password')}
  });
  const googleEnabled=Boolean(window.DALP_AUTH_OPTIONS?.googleOAuthEnabled);
  document.querySelectorAll('.auth-google').forEach(button=>{
    button.hidden=!googleEnabled;
    if(button.tagName!=='BUTTON')return;
    button.addEventListener('click',async()=>{
      if(!dbReady())return;
      button.disabled=true;
      const {error}=await db().auth.signInWithOAuth({provider:'google',options:{redirectTo:nextAuthUrl()}});
      if(error){message(document.body.dataset.authMode==='create'?'signupMsg':'loginMsg',errorText(error));button.disabled=false}
    });
  });
  explainReturnDestination();
  const mode=new URLSearchParams(location.search).get('mode');
  const resetCallback=mode==='reset' || /(?:^|[&#])type=recovery(?:&|$)/.test(location.hash);
  setMode(resetCallback?'reset':mode==='create'?'create':'login');
  (async()=>{
    if(!dbReady())return;
    db().auth.onAuthStateChange((event)=>{if(event==='PASSWORD_RECOVERY'){setMode('reset')}});
    try{
      await Promise.resolve(window.DALP_AUTH_RESTORE).catch(()=>false);
      const {data,error}=await db().auth.getUser();
      if(error && !/session missing/i.test(error.message||''))console.info('No confirmed user session yet',error.message);
      if(data?.user && !resetCallback){await enter(data.user,null)}
      if(resetCallback && !data?.user){setMode('forgot');message('forgotMsg','The password-reset link is missing or has expired. Request a new link.');}
    }catch(e){console.warn('Session check failed',e)}
  })();
})();
