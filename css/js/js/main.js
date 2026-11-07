// Proteksi halaman dashboard
const currentUser = JSON.parse(localStorage.getItem('zc_current_user') || 'null');

if (!currentUser && window.location.pathname.includes('dashboard')) {
  window.location.href = 'login.html';
}

if (currentUser) {
  const nameEl = document.getElementById('welcomeName');
  const userEl = document.getElementById('userName');
  if (nameEl) nameEl.textContent = currentUser.name || 'Siswa';
  if (userEl) userEl.textContent = `👤 ${currentUser.name || currentUser.email}`;
}
