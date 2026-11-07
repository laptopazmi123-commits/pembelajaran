// ============================================
// KURSUS HTML INTERAKTIF
// ============================================

const COURSE_ID = 'html-dasar';

// Data 5 materi
const LESSONS = [
  {
    id: 'html-1',
    title: '1. Apa itu HTML?',
    content: `
      <h2>Apa itu HTML?</h2>
      <p><strong>HTML</strong> (HyperText Markup Language) adalah bahasa dasar untuk membuat website.</p>
      <p>HTML menggunakan <strong>tag</strong> untuk menandai bagian-bagian halaman. Contoh:</p>
      <pre>&lt;h1&gt;Halo Dunia&lt;/h1&gt;
&lt;p&gt;Ini paragraf pertama saya.&lt;/p&gt;</pre>
      <p>Coba tulis di editor di bawah dan lihat hasilnya!</p>
    `,
    starter: '<h1>Halo, nama saya ...</h1>\n<p>Saya sedang belajar HTML.</p>'
  },
  {
    id: 'html-2',
    title: '2. Heading & Paragraf',
    content: `
      <h2>Heading & Paragraf</h2>
      <p>Ada 6 level heading: <code>&lt;h1&gt;</code> sampai <code>&lt;h6&gt;</code>.</p>
      <p><code>&lt;h1&gt;</code> paling besar, <code>&lt;h6&gt;</code> paling kecil.</p>
      <p>Paragraf pakai tag <code>&lt;p&gt;</code>.</p>
    `,
    starter: '<h1>Judul Besar</h1>\n<h2>Sub Judul</h2>\n<p>Ini paragraf.</p>'
  },
  {
    id: 'html-3',
    title: '3. Link & Gambar',
    content: `
      <h2>Link & Gambar</h2>
      <p>Link: <code>&lt;a href="https://google.com"&gt;Google&lt;/a&gt;</code></p>
      <p>Gambar: <code>&lt;img src="url-gambar" alt="deskripsi"&gt;</code></p>
      <p>Coba buat link ke website favoritmu!</p>
    `,
    starter: '<h2>Website Favorit Saya</h2>\n<a href="https://google.com">Buka Google</a>'
  },
  {
    id: 'html-4',
    title: '4. List (Daftar)',
    content: `
      <h2>List</h2>
      <p>Daftar berurutan: <code>&lt;ol&gt;</code> dengan <code>&lt;li&gt;</code>.</p>
      <p>Daftar tidak berurutan: <code>&lt;ul&gt;</code> dengan <code>&lt;li&gt;</code>.</p>
    `,
    starter: '<h2>Buah Favorit</h2>\n<ul>\n  <li>Apel</li>\n  <li>Mangga</li>\n  <li>Jeruk</li>\n</ul>'
  },
  {
    id: 'html-5',
    title: '5. Form Input',
    content: `
      <h2>Form Input</h2>
      <p>Form memungkinkan user memasukkan data.</p>
      <p>Tag <code>&lt;input&gt;</code>, <code>&lt;button&gt;</code>, dan <code>&lt;label&gt;</code>.</p>
    `,
    starter: '<h2>Form Sederhana</h2>\n<label>Nama:</label>\n<input type="text" placeholder="Ketik nama">\n<button>Kirim</button>'
  }
];

let sb = null;
let currentUser = null;
let completedLessons = new Set();

// ============================================
// INIT
// ============================================
window.addEventListener('supabase-ready', async () => {
  sb = window.supabaseClient;
  await loadUser();
  await loadProgress();
  renderLessonList();
  openLesson(LESSONS[0].id);
});

document.addEventListener('DOMContentLoaded', () => {
  if (window.supabaseClient && !sb) {
    setTimeout(async () => {
      sb = window.supabaseClient;
      await loadUser();
      await loadProgress();
      renderLessonList();
      openLesson(LESSONS[0].id);
    }, 500);
  }
});

async function loadUser() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return;
  }
  currentUser = session.user;
  const name = currentUser.user_metadata?.full_name
    || currentUser.user_metadata?.name
    || currentUser.user_metadata?.user_name
    || currentUser.email?.split('@')[0]
    || 'Siswa';
  const el = document.getElementById('userName');
  if (el) el.textContent = `👤 ${name}`;
}

async function loadProgress() {
  const { data, error } = await sb
    .from('user_progress')
    .select('lesson_id')
    .eq('course_id', COURSE_ID)
    .eq('completed', true);

  if (!error && data) {
    completedLessons = new Set(data.map(d => d.lesson_id));
  }
  updateProgressUI();
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

// ============================================
// RENDER DAFTAR MATERI
// ============================================
function renderLessonList() {
  const list = document.getElementById('lessonList');
  if (!list) return;

  list.innerHTML = LESSONS.map(l => `
    <li class="lesson-item ${completedLessons.has(l.id) ? 'completed' : ''}" 
        data-id="${l.id}" onclick="openLesson('${l.id}')">
      <span class="lesson-check">${completedLessons.has(l.id) ? '✅' : '⬜'}</span>
      ${l.title}
    </li>
  `).join('');
}

// ============================================
// BUKA MATERI
// ============================================
function openLesson(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;

  // Highlight active
  document.querySelectorAll('.lesson-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === lessonId);
  });

  const isCompleted = completedLessons.has(lessonId);

  const container = document.getElementById('lessonContent');
  container.innerHTML = `
    <div class="lesson-header">
      <h1>${lesson.title}</h1>
      ${isCompleted 
        ? '<span class="badge-done">✅ Selesai</span>' 
        : '<span class="badge-todo">Belum selesai</span>'}
    </div>
    <div class="lesson-text">${lesson.content}</div>

    <h3>🔧 Coba Sendiri</h3>
    <div class="playground">
      <textarea id="codeInput" class="code-input" spellcheck="false">${lesson.starter}</textarea>
      <div class="preview-box">
        <div class="preview-label">Preview:</div>
        <iframe id="previewFrame" class="preview-frame"></iframe>
      </div>
    </div>

    <div class="lesson-actions">
      <button class="btn-primary" onclick="runPreview()">▶ Jalankan</button>
      <button class="btn-success" onclick="markComplete('${lessonId}')" ${isCompleted ? 'disabled' : ''}>
        ${isCompleted ? '✅ Sudah Selesai' : '✓ Tandai Selesai'}
      </button>
    </div>
  `;

  runPreview();
}

function runPreview() {
  const code = document.getElementById('codeInput')?.value || '';
  const frame = document.getElementById('previewFrame');
  if (!frame) return;

  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>body{font-family:Poppins,sans-serif;padding:15px;}</style></head><body>${code}</body></html>`);
  doc.close();
}

// ============================================
// TANDAI SELESAI
// ============================================
async function markComplete(lessonId) {
  if (!sb || !currentUser) return alert('Belum login');

  const { error } = await sb
    .from('user_progress')
    .upsert({
      user_id: currentUser.id,
      course_id: COURSE_ID,
      lesson_id: lessonId,
      completed: true
    }, { onConflict: 'user_id,course_id,lesson_id' });

  if (error) {
    alert('Gagal simpan progress: ' + error.message);
    return;
  }

  completedLessons.add(lessonId);
  updateProgressUI();
  renderLessonList();
  openLesson(lessonId);
}
