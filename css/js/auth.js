async function loginWithGoogle() {
  if (!supabase) return showMessage('⏳ Memuat... coba lagi sebentar', 'error');

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/dashboard.html',
      scopes: 'https://www.googleapis.com/auth/userinfo.email'
    }
  });

  if (error) {
    showMessage('❌ ' + error.message, 'error');
  }
}
