// ============================================
// KONFIGURASI OAUTH
// Ganti dengan Client ID milikmu (lihat README)
// ============================================
const CONFIG = {
  google: {
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    redirectUri: window.location.origin + '/dashboard.html',
    scope: 'openid email profile',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth'
  },
  github: {
    clientId: 'YOUR_GITHUB_CLIENT_ID',
    redirectUri: window.location.origin + '/dashboard.html',
    scope: 'read:user user:email',
    authUrl: 'https://github.com/login/oauth/authorize'
  }
};

// ============================================
// INIT: JALANKAN SETELAH DOM SIAP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const isAuthPage = document.getElementById('loginForm') || document.getElementById('registerForm');
  if (isAuthPage) initAuthPage();
  if (window.location.pathname.includes('dashboard')) handleOAuthCallback();
});

function initAuthPage() {
  // Auto-tab register dari hash URL
  if (window.location.hash === '#register') switchTab('register');

  // Handler register
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  // Handler login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
}

// ============================================
// TAB SWITCHING
// ============================================
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabs = document.querySelectorAll('.tab');
  if (!loginForm || !registerForm) return;

  tabs.forEach(t => t.classList.remove('active'));

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    if (tabs[0]) tabs[0].classList.add('active');
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    if (tabs[1]) tabs[1].classList.add('active');
  }

  // Reset pesan
  const msg = document.getElementById('authMessage');
  if (msg) {
    msg.textContent = '';
    msg.className = 'auth-message';
  }
}

// ============================================
// HANDLER REGISTER
// ============================================
function handleRegister(e) {
  e.preventDefault();

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!name) return showMessage('Nama wajib diisi!', 'error');
  if (!email.includes('@')) return showMessage('Email tidak valid!', 'error');
  if (password.length < 6) return showMessage('Password minimal 6 karakter!', 'error');

  // Simpan ke localStorage (untuk demo)
  const users = JSON.parse(localStorage.getItem('zc_users') || '[]');

  if (users.find(u => u.email === email)) {
    return showMessage('Email sudah terdaftar!', 'error');
  }

  users.push({
    name,
    email,
    password: btoa(password), // base64 (BUKAN untuk production)
    createdAt: Date.now()
  });

  localStorage.setItem('zc_users', JSON.stringify(users));

  showMessage('✅ Pendaftaran berhasil! Silakan masuk.', 'success');

  setTimeout(() => {
    document.getElementById('registerForm').reset();
    switchTab('login');
  }, 1500);
}

// ============================================
// HANDLER LOGIN
// ============================================
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('zc_users') || '[]');
  const user = users.find(u => u.email === email && u.password === btoa(password));

  if (!user) {
    return showMessage('❌ Email atau password salah!', 'error');
  }

  localStorage.setItem('zc_current_user', JSON.stringify({
    name: user.name,
    email: user.email,
    provider: 'email'
  }));

  showMessage('✅ Login berhasil! Mengalihkan...', 'success');

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 800);
}

// ============================================
// OAUTH: GOOGLE (GMAIL)
// ============================================
function loginWithGoogle() {
  const { clientId, redirectUri, scope, authUrl } = CONFIG.google;

  if (clientId.includes('YOUR_')) {
    return showMessage('⚠️ Google Client ID belum diisi. Lihat README.md', 'error');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'token',
    scope: scope,
    include_granted_scopes: 'true'
  });

  window.location.href = `${authUrl}?${params}`;
}

// ============================================
// OAUTH: GITHUB
// ============================================
function loginWithGitHub() {
  const { clientId, redirectUri, scope, authUrl } = CONFIG.github;

  if (clientId.includes('YOUR_')) {
    return showMessage('⚠️ GitHub Client ID belum diisi. Lihat
