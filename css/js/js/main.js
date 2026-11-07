// ============================================
// DASHBOARD PROTECTION & USER INFO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('zc_current_user') || 'null');
  const isDashboard = window.location.pathname.includes('dashboard');

  // Proteksi halaman dashboard
  if (isDashboard && !currentUser) {
    window.location.href = 'login.html';
    return;
  }

  // Tampilkan nama user
  if (currentUser && isDashboard) {
    const nameEl = document.getElementById('welcomeName');
    const userEl = document.getElementById('userName');
    if (nameEl) nameEl.textContent = currentUser.name || 'Siswa';
    if (userEl) userEl.textContent = `👤 ${currentUser.name || currentUser.email}`;
  }
});
