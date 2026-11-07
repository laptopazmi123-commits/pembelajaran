// ============================================
// MAIN - Dashboard Helper
// ============================================

// Re-check auth setiap load dashboard
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('dashboard')) {
    // Delay sampai supabase ready
    const check = setInterval(() => {
      if (window.supabaseClient) {
        clearInterval(check);
        // Jika auth.js belum handle, ini fallback
        if (typeof checkDashboardAuth === 'function') {
          // sudah di-handle auth.js
        }
      }
    }, 300);

    // Timeout 5 detik - kalau tidak ready, redirect
    setTimeout(() => {
      if (!window.supabaseClient) {
        console.error('Supabase tidak ter-load. Cek js/supabase-config.js');
      }
    }, 5000);
  }
});
