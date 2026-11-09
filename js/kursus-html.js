// ============================================
// KURSUS HTML INTERAKTIF - MATERI LENGKAP
// ============================================
const COURSE_ID = 'html-dasar';
let currentLang = 'id';
let supabaseDB = null;
let currentUser = null;
let completedLessons = new Set();
let currentLessonId = null;

const LESSONS = [
  { 
    id: 'html-1', 
    title: { id: '1. Pengenalan HTML', en: '1. Intro to HTML' }, 
    content: { 
      id: `
        <h2>Selamat Datang di Dunia Web! 🌐</h2>
        <p>Sebelum kita mulai menulis kode, bayangkan kamu sedang membangun sebuah rumah. HTML adalah <strong>kerangka atau fondasi</strong> dari rumah tersebut. Tanpa kerangka, rumah tidak akan berdiri.</p>
        
        <p>Begitu juga dengan website. <strong>HTML (HyperText Markup Language)</strong> adalah bahasa yang digunakan untuk membuat struktur dasar sebuah halaman web. HTML memberi tahu browser (seperti Chrome atau Safari): <em>"Ini adalah judul", "Ini adalah paragraf", "Ini adalah tombol".</em></p>

        <h3>Analogi: Rumah vs Website</h3>
        <ul>
          <li><strong>HTML</strong> = Kerangka bangunan, tiang, dan dinding.</li>
          <li><strong>CSS</strong> = Cat tembok, warna, dan dekorasi ruangan (agar cantik).</li>
          <li><strong>JavaScript</strong> = Aliran listrik, saklar, dan sistem keamanan (agar interaktif).</li>
        </ul>

        <h3>Struktur Dasar HTML</h3>
        <p>Setiap website di dunia dibangun dengan struktur dasar ini:</p>
        <pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Website Pertamaku&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Halo Dunia!&lt;/h1&gt;
    &lt;p&gt;Ini adalah paragraf pertamaku.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>

        <h3>Penjelasan Tiap Baris:</h3>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code> : Memberitahu browser bahwa ini adalah dokumen HTML versi ke-5 (terbaru).</li>
          <li><code>&lt;html&gt;</code> : Pembungkus utama seluruh halaman web.</li>
          <li><code>&lt;head&gt;</code> : Bagian "otak" website. Berisi informasi yang <strong>tidak terlihat</strong> oleh pengunjung, seperti judul di tab browser.</li>
          <li><code>&lt;body&gt;</code> : Bagian "tubuh" website. Semua yang <strong>terlihat</strong> di layar (teks, gambar, tombol) ditulis di sini.</li>
        </ul>
        
        <p><strong>📝 Tugas Latihan:</strong> Di editor sebelah kanan, coba ganti tulisan "Halo Dunia" dengan namamu, lalu lihat hasilnya di kotak Preview!</p>
      `, 
      en: '<h2>Welcome!</h2><p>HTML is the skeleton of the web...</p>' 
    }, 
    starter: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Latihan Pertama</title>\n</head>\n<body>\n  <h1>Halo Dunia</h1>\n  <p>Saya sedang belajar HTML.</p>\n</body>\n</html>' 
  },
  { 
    id: 'html-2', 
    title: { id: '2. Heading & Paragraf', en: '2. Headings & Paragraphs' }, 
    content: { 
      id: `
        <h2>Mengatur Teks: Heading & Paragraf</h2>
        <p>Di dalam koran atau buku, kamu pasti melihat judul besar dan teks paragraf. Di HTML, kita bisa mengaturnya dengan <em>tag</em>.</p>

        <h3>1. Heading (Judul)</h3>
        <p>Heading digunakan untuk membuat judul atau sub-judul. Ada 6 level heading, dari <code>&lt;h1&gt;</code> sampai <code>&lt;h6&gt;</code>.</p>
        <ul>
          <li><code>&lt;h1&gt;</code> adalah judul paling besar dan paling penting (biasanya hanya dipakai sekali di halaman).</li>
          <li><code>&lt;h6&gt;</code> adalah sub-judul terkecil.</li>
        </ul>
        <pre>&lt;h1&gt;Judul Utama&lt;/h1&gt;
&lt;h2&gt;Sub Judul&lt;/h2&gt;
&lt;h3&gt;Sub-sub Judul&lt;/h3&gt;</pre>

        <h3>2. Paragraf</h3>
        <p>Untuk menulis teks panjang seperti ini, kita menggunakan tag <code>&lt;p&gt;</code> (paragraf). Browser akan otomatis memberikan jarak antar paragraf agar nyaman dibaca.</p>
        <pre>&lt;p&gt;Ini adalah paragraf pertama saya.&lt;/p&gt;
&lt;p&gt;Ini paragraf kedua, terpisah dari paragraf pertama.&lt;/p&gt;</pre>

        <h3>3. Tag Format (Tebal, Miring, Garis Bawah)</h3>
        <p>Kamu bisa membuat teks jadi tebal atau miring:</p>
        <ul>
          <li><code>&lt;strong&gt;Teks Tebal&lt;/strong&gt;</code> untuk menandakan hal penting.</li>
          <li><code>&lt;em&gt;Teks Miring&lt;/em&gt;</code> untuk menekankan kata.</li>
        </ul>

        <p><strong>📝 Tugas Latihan:</strong> Buatlah 1 heading utama (h1), 2 sub judul (h2), dan 2 paragraf yang menceritakan hobi kamu!</p>
      `, 
      en: '<h2>Headings & Paragraphs</h2>...' 
    }, 
    starter: '<h1>Hobi Saya</h1>\n<p>Saya sangat suka bermain <strong>sepak bola</strong>.</p>\n\n<h2>Kenapa Saya Suka?</h2>\n<p>Karena olahraga ini membuat badan saya <em>sehat</em> dan bugar.</p>' 
  },
  { 
    id: 'html-3', 
    title: { id: '3. Link & Gambar', en: '3. Links & Images' }, 
    content: { 
      id: `
        <h2>Menghubungkan Dunia: Link & Gambar</h2>
        <p>Website tidak akan seru kalau tidak ada gambar dan tautan (link).</p>

        <h3>1. Link (Tautan)</h3>
        <p>Link memungkinkan pengunjung untuk berpindah ke halaman lain. Kita menggunakan tag <code>&lt;a&gt;</code> (anchor). Atribut <code>href</code> adalah tempat kita menaruh alamat tujuan.</p>
        <pre>&lt;a href="https://google.com"&gt;Klik untuk ke Google&lt;/a&gt;</pre>
        <p>Jika kamu ingin link terbuka di tab baru, tambahkan <code>target="_blank"</code>.</p>
        <pre>&lt;a href="https://google.com" target="_blank"&gt;Buka di Tab Baru&lt;/a&gt;</pre>

        <h3>2. Gambar</h3>
        <p>Gambar di HTML menggunakan tag <code>&lt;img&gt;</code>. Tag ini tidak butuh penutup. Kita butuh dua atribut wajib:</p>
        <ul>
          <li><code>src</code> : Alamat/URL dari gambar tersebut.</li>
          <li><code>alt</code> : Teks alternatif. Muncul jika gambar gagal dimuat, dan sangat penting untuk pembaca layar (tunanetra).</li>
        </ul>
        <pre>&lt;img src="https://via.placeholder.com/150" alt="Gambar Kotak Abu-abu"&gt;</pre>

        <p><strong>📝 Tugas Latihan:</strong> Buatlah sebuah link menuju website favoritmu, dan tampilkan sebuah gambar (bebas gambar apa saja).</p>
      `, 
      en: '<h2>Links & Images</h2>...' 
    }, 
    starter: '<h2>Website Favorit Saya</h2>\n<p>Saya sering belajar di:</p>\n<a href="https://wikipedia.org" target="_blank">Wikipedia</a>\n\n<h3>Gambar Pemandangan:</h3>\n<img src="https://picsum.photos/200/100" alt="Pemandangan Acak">' 
  },
  { 
    id: 'html-4', 
    title: { id: '4. List (Daftar)', en: '4. Lists' }, 
    content: { 
      id: `
        <h2>Membuat Daftar (List)</h2>
        <p>Di kehidupan sehari-hari, kita sering membuat daftar belanja atau daftar tugas. HTML menyediakan dua jenis daftar utama:</p>

        <h3>1. Unordered List (Daftar Tanpa Urutan)</h3>
        <p>Menggunakan tag <code>&lt;ul&gt;</code>. Biasanya ditampilkan dengan simbol titik/bulatan (bullet). Cocok untuk daftar yang tidak mementingkan urutan.</p>
        <pre>&lt;h3&gt;Daftar Belanja:&lt;/h3&gt;
&lt;ul&gt;
  &lt;li&gt;Apel&lt;/li&gt;
  &lt;li&gt;Susu&lt;/li&gt;
  &lt;li&gt;Roti&lt;/li&gt;
&lt;/ul&gt;</pre>

        <h3>2. Ordered List (Daftar Berurutan)</h3>
        <p>Menggunakan tag <code>&lt;ol&gt;</code>. Ditampilkan dengan angka (1, 2, 3). Cocok untuk langkah-langkah atau tutorial.</p>
        <pre>&lt;h3&gt;Cara Membuat Kopi:&lt;/h3&gt;
&lt;ol&gt;
  &lt;li&gt;Didihkan air.&lt;/li&gt;
  &lt;li&gt;Masukkan kopi ke cangkir.&lt;/li&gt;
  &lt;li&gt;Tuang air panas.&lt;/li&gt;
&lt;/ol&gt;</pre>

        <p>Ingat: Di dalam <code>&lt;ul&gt;</code> atau <code>&lt;ol&gt;</code>, setiap item harus dibungkus dengan tag <code>&lt;li&gt;</code> (list item).</p>

        <p><strong>📝 Tugas Latihan:</strong> Buatlah daftar 3 makanan favoritmu menggunakan <code>&lt;ul&gt;</code>, dan daftar 3 langkah mencuci tangan menggunakan <code>&lt;ol&gt;</code>.</p>
      `, 
      en: '<h2>Lists</h2>...' 
    }, 
    starter: '<h2>Makanan Favorit</h2>\n<ul>\n  <li>Nasi Goreng</li>\n  <li>Mie Ayam</li>\n  <li>Bakso</li>\n</ul>\n\n<h2>Langkah Mencuci Tangan</h2>\n<ol>\n  <li>Basahi tangan.</li>\n  <li>Gunakan sabun.</li>\n  <li>Bilas dengan air.</li>\n</ol>' 
  },
  { 
    id: 'html-5', 
    title: { id: '5. Form Input', en: '5. Forms' }, 
    content: { 
      id: `
        <h2>Berinteraksi dengan Pengunjung (Form)</h2>
        <p>Bagaimana website bisa tahu nama atau email kamu? Jawabannya adalah <strong>Form</strong>. Form memungkinkan website mengumpulkan data dari pengunjung.</p>

        <h3>Elemen Dasar Form</h3>
        <ul>
          <li><code>&lt;form&gt;</code> : Pembungkus utama form.</li>
          <li><code>&lt;input&gt;</code> : Kotak isian. Ada banyak tipenya (teks, email, password, angka, dll).</li>
          <li><code>&lt;button&gt;</code> : Tombol untuk mengirim data.</li>
          <li><code>&lt;label&gt;</code> : Tulisan penjelas di atas atau samping kotak isian.</li>
        </ul>

        <h3>Contoh Form Sederhana</h3>
        <pre>&lt;form&gt;
  &lt;label&gt;Nama Lengkap:&lt;/label&gt;&lt;br&gt;
  &lt;input type="text" placeholder="Ketik nama..."&gt;&lt;br&gt;&lt;br&gt;

  &lt;label&gt;Email:&lt;/label&gt;&lt;br&gt;
  &lt;input type="email" placeholder="email@contoh.com"&gt;&lt;br&gt;&lt;br&gt;

  &lt;button&gt;Kirim Data&lt;/button&gt;
&lt;/form&gt;</pre>

        <h3>Tipe Input yang Sering Dipakai:</h3>
        <ul>
          <li><code>text</code> : Teks biasa.</li>
          <li><code>password</code> : Teks disembunyikan (jadi titik-titik).</li>
          <li><code>email</code> : Memastikan user mengetik format email yang benar.</li>
          <li><code>checkbox</code> : Kotak centang.</li>
        </ul>

        <p><strong>📝 Tugas Latihan:</strong> Buatlah form yang meminta "Nama" (text) dan "Password" (password), lalu tambahkan tombol "Login".</p>
      `, 
      en: '<h2>Forms</h2>...' 
    }, 
    starter: '<h2>Form Pendaftaran Siswa</h2>\n<form>\n  <label>Nama Lengkap:</label><br>\n  <input type="text" placeholder="Tulis namamu">\n  <br><br>\n  \n  <label>Email:</label><br>\n  <input type="email" placeholder="email@sekolah.com">\n  <br><br>\n  \n  <button>Daftar Sekarang</button>\n</form>' 
  },
  { 
    id: 'html-6', 
    title: { id: '6. Div & Span', en: '6. Div & Span' }, 
    content: { 
      id: `
        <h2>Kotak Ajaib: Div & Span</h2>
        <p>Bayangkan kamu punya banyak barang di kamar, dan kamu ingin mengelompokkannya ke dalam kardus-kardus. Di HTML, kita punya <code>&lt;div&gt;</code> dan <code>&lt;span&gt;</code> sebagai "kardus" untuk mengelompokkan elemen agar mudah diatur dengan CSS nanti.</p>

        <h3>1. Div (Division)</h3>
        <p><code>&lt;div&gt;</code> adalah wadah <em>block-level</em>. Artinya, ia akan mengambil satu baris penuh di layar. Biasanya digunakan untuk mengelompokkan bagian-bagian besar website (seperti header, menu, konten utama).</p>
        <pre>&lt;div style="background-color: lightblue;"&gt;
  &lt;h2&gt;Ini Judul di dalam Div&lt;/h2&gt;
  &lt;p&gt;Ini paragraf di dalam Div.&lt;/p&gt;
&lt;/div&gt;</pre>

        <h3>2. Span</h3>
        <p><code>&lt;span&gt;</code> adalah wadah <em>inline</em>. Artinya, ia hanya mengambil ruang sebesar teks di dalamnya. Biasanya digunakan untuk mewarnai satu atau dua kata di tengah paragraf.</p>
        <pre>&lt;p&gt;Teks biasa, tapi &lt;span style="color: red;"&gt;kata ini berwarna merah&lt;/span&gt; di tengah.&lt;/p&gt;</pre>

        <p><strong>📝 Tugas Latihan:</strong> Buatlah satu <code>&lt;div&gt;</code> dengan background warna kuning, lalu di dalamnya buat paragraf yang salah satu katanya dibungkus <code>&lt;span&gt;</code> dan diberi warna biru.</p>
      `, 
      en: '<h2>Div & Span</h2>...' 
    }, 
    starter: '<h2>Percobaan Div dan Span</h2>\n\n<div style="background-color: yellow; padding: 10px;">\n  <p>Ini paragraf di dalam kotak kuning.</p>\n  <p>Saya suka makan <span style="color: blue; font-weight: bold;">Nasi Padang</span>.</p>\n</div>' 
  },
  { 
    id: 'html-7', 
    title: { id: '7. Tabel', en: '7. Tables' }, 
    content: { 
      id: `
        <h2>Menyajikan Data dengan Tabel</h2>
        <p>Tabel digunakan untuk menampilkan data yang terstruktur dalam bentuk baris dan kolom (seperti jadwal pelajaran atau daftar nilai).</p>

        <h3>Struktur Tabel</h3>
        <ul>
          <li><code>&lt;table&gt;</code> : Pembungkus tabel.</li>
          <li><code>&lt;tr&gt;</code> (Table Row) : Membuat baris baru.</li>
          <li><code>&lt;th&gt;</code> (Table Header) : Sel untuk judul kolom (teksnya otomatis tebal).</li>
          <li><code>&lt;td&gt;</code> (Table Data) : Sel untuk isi data biasa.</li>
        </ul>

        <h3>Contoh Tabel</h3>
        <pre>&lt;table border="1"&gt;
  &lt;tr&gt;
    &lt;th&gt;Nama&lt;/th&gt;
    &lt;th&gt;Nilai&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Budi&lt;/td&gt;
    &lt;td&gt;90&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Siti&lt;/td&gt;
    &lt;td&gt;85&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>

        <p><em>Catatan: Atribut <code>border="1"</code> digunakan agar garis tabel terlihat. Pengaturan garis yang lebih cantik biasanya dilakukan dengan CSS.</em></p>

        <p><strong>📝 Tugas Latihan:</strong> Buatlah tabel yang berisi daftar 3 siswa dan nilai matematika mereka.</p>
      `, 
      en: '<h2>Tables</h2>...' 
    }, 
    starter: '<h2>Daftar Nilai Kelas</h2>\n<table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">\n  <tr>\n    <th>No</th>\n    <th>Nama Siswa</th>\n    <th>Nilai</th>\n  </tr>\n  <tr>\n    <td>1</td>\n    <td>Andi</td>\n    <td>88</td>\n  </tr>\n  <tr>\n    <td>2</td>\n    <td>Rina</td>\n    <td>92</td>\n  </tr>\n</table>' 
  },
  { 
    id: 'html-8', 
    title: { id: '8. Semantic HTML', en: '8. Semantic HTML' }, 
    content: { 
      id: `
        <h2>HTML yang Bermakna (Semantic)</h2>
        <p>Di masa lalu, orang membuat website hanya menggunakan tag <code>&lt;div&gt;</code> untuk semuanya. Tapi itu membuat bingung mesin pencari (Google) dan pembaca layar tunanetra.</p>
        <p>Sekarang, kita punya <strong>Tag Semantic</strong>. Tag ini memberitahu browser dan Google tentang <em>apa fungsi</em> bagian tersebut.</p>

        <h3>Tag Semantic Populer:</h3>
        <ul>
          <li><code>&lt;header&gt;</code> : Bagian atas website (biasanya berisi logo dan menu).</li>
          <li><code>&lt;nav&gt;</code> : Bagian navigasi (kumpulan link menu).</li>
          <li><code>&lt;main&gt;</code> : Konten utama dari halaman ini.</li>
          <li><code>&lt;section&gt;</code> : Bagian/kategori tertentu dari konten.</li>
          <li><code>&lt;article&gt;</code> : Artikel mandiri (seperti postingan blog).</li>
          <li><code>&lt;footer&gt;</code> : Bagian bawah website (berisi hak cipta, kontak).</li>
        </ul>

        <h3>Contoh Struktur Semantic</h3>
        <pre>&lt;body&gt;
  &lt;header&gt;
    &lt;h1&gt;Website Saya&lt;/h1&gt;
    &lt;nav&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/nav&gt;
  &lt;/header&gt;
  
  &lt;main&gt;
    &lt;article&gt;
      &lt;h2&gt;Artikel Pertama&lt;/h2&gt;
      &lt;p&gt;Isi artikel...&lt;/p&gt;
    &lt;/article&gt;
  &lt;/main&gt;
  
  &lt;footer&gt;
    &lt;p&gt;&amp;copy; 2025 ZimzzCode&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;</pre>

        <p><strong>📝 Tugas Latihan:</strong> Susunlah tag header, main, dan footer menjadi satu halaman website lengkap dengan teks bebas di dalamnya.</p>
      `, 
      en: '<h2>Semantic HTML</h2>...' 
    }, 
    starter: '<body>\n  <header style="background: #f0f0f0; padding: 10px;">\n    <h1>Blog Pribadi Saya</h1>\n  </header>\n\n  <main style="padding: 20px;">\n    <article>\n      <h2>Belajar HTML Itu Mudah</h2>\n      <p>HTML adalah fondasi awal untuk menjadi Web Developer.</p>\n    </article>\n  </main>\n\n  <footer style="background: #333; color: white; padding: 10px; text-align: center;">\n    <p>Dibuat dengan ❤️ oleh Siswa</p>\n  </footer>\n</body>' 
  }
];

// ============================================
// LOGIKA APLIKASI (Tidak perlu diubah)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  renderLessonList();
  if (LESSONS.length > 0) openLesson(LESSONS[0].id);
  
  setTimeout(() => {
    if (window.supabaseClient) {
      supabaseDB = window.supabaseClient;
      checkUserSession();
    }
  }, 1000);
});

async function checkUserSession() {
  const { data: { session } } = await supabaseDB.auth.getSession();
  if (session) {
    currentUser = session.user;
    const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Siswa';
    const el = document.getElementById('userName');
    if (el) el.textContent = `👤 ${name}`;
    await loadProgress();
  }
}

async function loadProgress() {
  if (!currentUser) return;
  const { data, error } = await supabaseDB.from('user_progress').select('lesson_id').eq('course_id', COURSE_ID).eq('completed', true);
  if (!error && data) {
    completedLessons = new Set(data.map(d => d.lesson_id));
    renderLessonList();
    updateProgressUI();
    if (currentLessonId) openLesson(currentLessonId);
  }
}

function updateProgressUI() {
  const total = LESSONS.length;
  const done = completedLessons.size;
  const percent = Math.round((done / total) * 100);
  const text = document.getElementById('progressText');
  const fill = document.getElementById('progressFill');
  if (text) text.textContent = `${done}/${total}`;
  if (fill) fill.style.width = percent + '%';
}

function renderLessonList() {
  const list = document.getElementById('lessonList');
  if (!list) return;
  list.innerHTML = LESSONS.map(l => `
    <li class="lesson-item ${completedLessons.has(l.id) ? 'completed' : ''}" data-id="${l.id}" onclick="openLesson('${l.id}')">
      <span class="lesson-check">${completedLessons.has(l.id) ? '✅' : '⬜'}</span>
      <span>${getText(l.title)}</span>
    </li>
  `).join('');
}

function openLesson(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  currentLessonId = lessonId;
  
  document.querySelectorAll('.lesson-item').forEach(el => el.classList.toggle('active', el.dataset.id === lessonId));
  const isCompleted = completedLessons.has(lessonId);
  const container = document.getElementById('lessonContent');
  if (!container) return;
  
  // Desain kotak penjelasan yang lebih cantik dan mudah dibaca
  container.innerHTML = `
    <div class="lesson-header">
      <h1>${getText(lesson.title)}</h1>
      ${isCompleted ? `<span class="badge-done">✅ Selesai</span>` : `<span class="badge-todo">Belum selesai</span>`}
    </div>
    
    <div class="lesson-text" style="line-height: 1.8; font-size: 1.05rem; color: #333;">
      ${getText(lesson.content)}
    </div>
    
    <hr style="margin: 30px 0; border: 1px solid #eee;">

    <h3>🔧 Coba Sendiri</h3>
    <div class="playground">
      <div class="playground-header">
        <div class="playground-buttons">
          <button class="btn-sm btn-run" onclick="runPreview()">▶ Jalankan</button>
          <button class="btn-sm btn-reset" onclick="resetCode('${lessonId}')">↻ Reset Kode</button>
        </div>
      </div>
      <div class="editor-wrapper">
        <div class="editor-label">Editor Kode</div>
        <textarea id="codeInput" class="code-input" spellcheck="false">${lesson.starter}</textarea>
      </div>
      <div class="preview-wrapper">
        <div class="preview-label">Preview</div>
        <iframe id="previewFrame" class="preview-frame"></iframe>
      </div>
    </div>
    <div class="lesson-actions">
      <button class="btn-success" onclick="markComplete('${lessonId}')" ${isCompleted ? 'disabled' : ''}>
        ${isCompleted ? '✅ Sudah Selesai' : '✓ Tandai Selesai'}
      </button>
    </div>
  `;
  runPreview();
}

function getText(obj) { return typeof obj === 'string' ? obj : (obj[currentLang] || obj.id); }

function runPreview() {
  const code = document.getElementById('codeInput')?.value || '';
  const frame = document.getElementById('previewFrame');
  if (!frame) return;
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>body{font-family:Poppins,sans-serif;padding:15px; color:#333;}</style></head><body>${code}</body></html>`);
  doc.close();
}

function resetCode(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  const input = document.getElementById('codeInput');
  if (lesson && input) { input.value = lesson.starter; runPreview(); }
}

function changeLanguage(lang) {
  currentLang = lang;
  renderLessonList();
  if (currentLessonId) openLesson(currentLessonId);
}

async function markComplete(lessonId) {
  completedLessons.add(lessonId);
  updateProgressUI();
  renderLessonList();
  openLesson(lessonId);

  if (!supabaseDB || !currentUser) return;

  const { error } = await supabaseDB.from('user_progress').upsert({
    user_id: currentUser.id, course_id: COURSE_ID, lesson_id: lessonId, completed: true
  }, { onConflict: 'user_id,course_id,lesson_id' });
  
  if (error) console.error("Gagal simpan:", error.message);
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('zc_theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function toggleFocus() {
  document.body.classList.toggle('focus-mode');
}

window.openLesson = openLesson;
window.runPreview = runPreview;
window.resetCode = resetCode;
window.markComplete = markComplete;
window.changeLanguage = changeLanguage;
window.toggleTheme = toggleTheme;
window.toggleFocus = toggleFocus;
