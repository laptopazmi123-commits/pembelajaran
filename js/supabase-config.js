const SUPABASE_URL = 'https://rltrzuqtcndnljwdvnuj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aPcSz5LgNmLr5ZK2zzCRYQ_VicKSb4p';

const supabaseScript = document.createElement('script');
supabaseScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
supabaseScript.onload = () => {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.dispatchEvent(new Event('supabase-ready'));
  console.log('✅ Supabase terhubung:', SUPABASE_URL);
};
document.head.appendChild(supabaseScript);
