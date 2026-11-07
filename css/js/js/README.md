# ZimzzCode - Setup OAuth

## 🔑 Setup Google OAuth (Gmail)

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru → **APIs & Services** → **Credentials**
3. Klik **Create Credentials** → **OAuth client ID**
4. Pilih **Web application**
5. Authorized JavaScript origins: `http://localhost:5500` (atau domainmu)
6. Authorized redirect URIs: `http://localhost:5500/dashboard.html`
7. Copy **Client ID**, tempel di `js/auth.js` → `CONFIG.google.clientId`

## 🐙 Setup GitHub OAuth

1. Buka [GitHub Developer Settings](https://github.com/settings/developers)
2. **New OAuth App**
3. Homepage URL: `http://localhost:5500`
4. Authorization callback URL: `http://localhost:5500/dashboard.html`
5. Copy **Client ID**, tempel di `js/auth.js` → `CONFIG.github.clientId`

> ⚠️ **PENTING**: Untuk GitHub, penukaran `code` → `access_token` memerlukan `client_secret`
> yang HARUS dilakukan di backend (Node.js/PHP). Frontend saja tidak aman.

## 🚀 Menjalankan

```bash
# Gunakan Live Server (VS Code) atau:
npx serve .
# atau
python -m http.server 5500
