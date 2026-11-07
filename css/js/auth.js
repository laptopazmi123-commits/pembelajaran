// ============================================
// KONFIGURASI OAUTH
// GANTI DENGAN CLIENT ID MILIKMU
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
// TAB SWITCHING
// ============================================
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabs = document.querySelectorAll('.tab');
  
  tabs.forEach(t => t.classList.remove('active'));
  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    tabs[0].classList.add('active');
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    tabs[1].classList.add('active');
  }
}

// Cek hash URL untuk auto-tab register
if (window.location.hash === '#register') switchTab('register');

// ============================================
// REGISTER DENGAN EMAIL
// ============================================
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!email.endsWith('@gmail.com') && !email.includes('@')) {
    return showMessage('Gunakan email yang valid', 'error');
  }

  // Simpan ke localStorage (untuk demo)
  // PRODUCTION: gunakan Firebase Auth / backend
  const users = JSON.parse(localStorage.getItem('zc_users') || '[]');
  if (users.find(u => u.email === email)) {
    return showMessage('Email sudah terdaftar!', 'error');
  }

  users.push({ name, email, password: btoa(password), createdAt: Date.now() });
  localStorage.setItem('zc_users', JSON.stringify(users));
  
  showMessage('✅ Pendaftaran berhasil! Silakan masuk.', 'success');
  setTimeout(() => switchTab('login'), 1500);
});

// ============================================
// LOGIN DENGAN EMAIL
// ============================================
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('zc_users') || '[]');
  const user = users.find(u => u.email === email && u.password === btoa(password));

  if (!user) return showMessage('❌ Email atau password salah!', 'error');

  localStorage.setItem('zc_current_user', JSON.stringify({ name: user.name, email: user.email, provider: 'email' }));
  showMessage('✅ Login berhasil! Mengalihkan...', 'success');
  setTimeout(() => window.location.href = 'dashboard.html', 800);
});

// ============================================
// LOGIN DENGAN GOOGLE (OAuth 2.0)
// ============================================
function loginWithGoogle() {
  const { clientId, redirectUri, scope, authUrl } = CONFIG.google;
  if (clientId.includes('YOUR_')) {
    return showMessage('⚠️ Konfigurasi Google Client ID belum diisi. Lihat README.md', 'error');
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
// LOGIN DENGAN GITHUB (OAuth 2.0)
// ============================================
function loginWithGitHub() {
  const { clientId, redirectUri, scope, authUrl } = CONFIG.github;
  if (clientId.includes('YOUR_')) {
    return showMessage('⚠️ Konfigurasi GitHub Client ID belum diisi. Lihat README.md', 'error');
  }
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope
  });
  window.location.href = `${authUrl}?${params}`;
}

// ============================================
// UTILITAS
// ============================================
function showMessage(msg, type) {
  const el = document.getElementById('authMessage');
  if (!el) return alert(msg);
  el.textContent = msg;
  el.className = `auth-message ${type}`;
}

function logout() {
  localStorage.removeItem('zc_current_user');
  window.location.href = 'index.html';
}

// ============================================
// HANDLE OAUTH CALLBACK (di dashboard)
// ============================================
async function handleOAuthCallback() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const code = params.get('code');

  // Google: token di hash
  if (accessToken && window.location.pathname.includes('dashboard')) {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const user = await res.json();
      localStorage.setItem('zc_current_user', JSON.stringify({
        name: user.name, email: user.email, picture: user.picture, provider: 'google'
      }));
      window.history.replaceState({}, document.title, window.location.pathname);
      location.reload();
    } catch (err) {
      console.error('Gagal ambil data Google:', err);
    }
  }

  // GitHub: token didapat via backend exchange (code flow)
  // Untuk demo, kita tidak handle code exchange di frontend (butuh client_secret)
  if (code && window.location.pathname.includes('dashboard')) {
    console.warn('GitHub OAuth code diterima. Perlu backend untuk exchange token.');
  }
}

handleOAuthCallback();
