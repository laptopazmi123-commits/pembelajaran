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

  if (!supabase
