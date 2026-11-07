// ============================================
// MAIN - Dashboard Helper
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('dashboard')) {
    setTimeout(() => {
      if (!window.supabaseClient) {
        console.error('Supabase tidak ter-load. Cek js/supabase-config.js');
      }
    }, 3000);
  }
});
