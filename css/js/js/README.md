# ZimzzCode - Platform Belajar Coding Gratis

## 🔑 Setup (WAJIB Sebelum Jalan)

### 1. Buat Project Supabase (Gratis)
1. Buka https://supabase.com → Sign up
2. New Project → isi nama, password, region (Singapore)
3. Tunggu ~2 menit
4. Settings → API → copy **Project URL** & **anon public key**

### 2. Edit `js/supabase-config.js`
```js
const SUPABASE_URL = 'https://xxxxx.supabase.co';        // paste Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIs...';    // paste anon key
