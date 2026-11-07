// ============================================
// KONFIGURASI SUPABASE
// GANTI DENGAN MILIKMU DARI SETTINGS > API
// ============================================
const SUPABASE_URL = 'https://xxxxx.supabase.co';        // GANTI
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....'; // GANTI

// Load Supabase dari CDN
const supabaseScript = document.createElement('script');
supabaseScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
supabaseScript.onload = () => {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.dispatchEvent(new Event('supabase-ready'));
};
document.head.appendChild(supabaseScript);
