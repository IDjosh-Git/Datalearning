
(function(){
  const cfg = window.ZAH_SUPABASE || {};
  const configured =
    cfg.url &&
    cfg.publishableKey &&
    !cfg.url.includes("YOUR_SUPABASE") &&
    !cfg.publishableKey.includes("YOUR_SUPABASE");

  window.ZAH_DB = {
    configured,
    client: null,
    async user(){
      if(!this.configured || !this.client) return null;
      const { data } = await this.client.auth.getUser();
      return data?.user || null;
    }
  };

  // Only a real authenticated DataLearning session can register an app user.
  // Merely creating a Supabase Auth account or opening a public page anonymously
  // never adds a learner. The RPC derives identity from a verified JWT.
  const usageKey = 'dalp-app-use-record';
  window.DALP_APP_USAGE = {
    async record(event = 'use') {
      if (!window.ZAH_DB.client || !['use', 'sign_in'].includes(event)) return false;
      try {
        const client = window.ZAH_DB.client;
        const { data: verified, error: verifyError } = await client.auth.getUser();
        if (verifyError || !verified?.user?.id || verified.user.is_anonymous) return false;
        if (event === 'use') {
          let cached;
          try { cached = JSON.parse(sessionStorage.getItem(usageKey) || 'null'); } catch { cached = null; }
          if (cached?.id === verified.user.id && Date.now() - Number(cached.time || 0) < 300000) return true;
        }
        const { data, error } = await client.rpc('record_datalearning_use', { p_event: event });
        if (error) throw error;
        if (data === true) {
          try { sessionStorage.setItem(usageKey, JSON.stringify({ id: verified.user.id, time: Date.now() })); } catch { /* Storage optional */ }
        }
        return data === true;
      } catch (error) {
        // Migration may not yet have been applied. Tracking must never block a learner.
        if (!window.DALP_APP_USAGE_WARNING_SHOWN) {
          window.DALP_APP_USAGE_WARNING_SHOWN = true;
          console.info('DataLearning activity tracking unavailable until the database migration is applied.');
        }
        return false;
      }
    }
  };

  if(configured && window.supabase){
    window.ZAH_DB.client = window.supabase.createClient(
      cfg.url,
      cfg.publishableKey,
      {
        auth:{
          persistSession:true,
          autoRefreshToken:true,
          detectSessionInUrl:true
        }
      }
    );
    const registerActualVisit = () => { void window.DALP_APP_USAGE.record('use'); };
    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', registerActualVisit, { once: true });
    else registerActualVisit();
  }
})();
