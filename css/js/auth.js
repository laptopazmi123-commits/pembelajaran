// ============================================
// AUTH LOGIC - Supabase
// ============================================

let supabase = null;

// Tunggu Supabase siap
window.addEventListener('supabase-ready', () => {
  supabase = window.supabaseClient;
  initAuth();
});

// Fallback jika supabase-config sudah load duluan
document.addEventListener('DOMContentLoaded', () => {
  if (window.supabaseClient) {
    supabase = window.supabaseClient;
    initAuth();
  }
});

function initAuth() {
  const isAuthPage = document.getElementById('loginForm') || document.getElementById('registerForm');
  if (isAuthPage) initAuthPage();
  if (window.location.pathname.includes('dashboard')) checkDashboardAuth();
}

// ============================================
// AUTH PAGE
// ============================================
function initAuthPage() {
  if (window.location.hash === '#register') switchTab('register');

  const registerForm = document.getElementById('registerForm');
  if (registerForm) registerForm.addEventListener('submit', handleRegister);

  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);
}

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

  const msg = document.getElementById('authMessage');
  if (msg) { msg.textContent = ''; msg.className = 'auth-message'; }
}

// ============================================
// REGISTER (Email/Password)
// ============================================
async function handleRegister(e) {
  e.preventDefault();

  if (!supabase) return showMessage('⏳ Memuat... coba lagi sebentar', 'error');

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!name) return showMessage('Nama wajib diisi!', 'error');
  if (!email.includes('@')) return showMessage('Email tidak valid!', 'error');
  if (password.length < 6) return showMessage('Password minimal 6 karakter!', 'error');

  showMessage('⏳ Mendaftar...', 'success');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } }
  });

  if (error) {
    return showMessage('❌ ' + error.message, 'error');
  }

  showMessage('✅ Pendaftaran berhasil! Silakan masuk.', 'success');
  setTimeout(() => {
    document.getElementById('registerForm').reset();
    switchTab('login');
  }, 1500);
}

// ============================================
// LOGIN (Email/Password)
// ============================================
async function handleLogin(e) {
  e.preventDefault();

  if (!supabase) return showMessage('⏳ Memuat... coba lagi sebentar', 'error');

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  showMessage('⏳ Masuk...', 'success');

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return showMessage('❌ ' + error.message, 'error');
  }

  showMessage('✅ Login berhasil! Mengalihkan...', 'success');
  setTimeout(() => window.location.href = 'dashboard.html', 500);
}

// ============================================
// LOGIN GOOGLE
// ============================================
async function loginWithGoogle() {
  if (!supabase) return showMessage('⏳ Memuat... coba lagi sebentar', 'error');

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/dashboard.html'
    }
  });

  if (error) {
    showMessage('❌ ' + error.message, 'error');
  }
}

// ============================================
// LOGIN GITHUB
// ============================================
async function loginWithGitHub() {
  if (!supabase) return showMessage('⏳ Memuat... coba lagi sebentar', 'error');

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin + '/dashboard.html'
    }
  });

  if (error) {
    showMessage('❌ ' + error.message, 'error');
  }
}

// ============================================
// SHOW MESSAGE
// ============================================
function showMessage(msg, type) {
  const el = document.getElementById('authMessage');
  if (!el) { alert(msg); return; }
  el.textContent = msg;
  el.className = `auth-message ${type}`;
}

// ============================================
// LOGOUT
// ============================================
async function logout() {
  if (supabase) await supabase.auth.signOut();
  localStorage.removeItem('zc_current_user');
  window.location.href = 'index.html';
}

// ============================================
// DASHBOARD AUTH CHECK
// ============================================
async function checkDashboardAuth() {
  if (!supabase) {
    // Coba lagi setelah 500ms
    return setTimeout(checkDashboardAuth, 500);
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = 'login.html';
    return;
  }

  const user = session.user;
  const name = user.user_metadata?.full_name
    || user.user_metadata?.name
    || user.user_metadata?.user_name
    || user.email?.split('@')[0]
    || 'Siswa';

  const nameEl = document.getElementById('welcomeName');
  const userEl = document.getElementById('userName');
  if (nameEl) nameEl.textContent = name;
  if (userEl) userEl.textContent = `👤 ${name}`;
}
