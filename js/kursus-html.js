// ============================================
// KURSUS HTML INTERAKTIF - VERSI SIMPEL
// ============================================
const COURSE_ID = 'html-dasar';
let currentLang = 'id';
let sb = null;
let currentUser = null;
let completedLessons = new Set();
let currentLessonId = null;

const LESSONS = [
  { id: 'html-1', title: { id: '1. Pengenalan HTML', en: '1. Intro to HTML' }, content: { id: '<h2>Apa itu HTML?</h2><p>HTML adalah bahasa markup untuk web.</p>', en: '<h2>What is HTML?</h2><p>HTML is a markup language for the web.</p>' }, starter: '<h1>Halo Dunia</h1>' },
  { id: 'html-2', title: { id: '2. Heading & Paragraf', en: '2. Headings' }, content: { id: '<h2>Heading & Paragraf</h2><p>Gunakan &lt;h1&gt; sampai &lt;h6&gt;.</p>', en: '<h2>Headings & Paragraphs</h2><p>Use &lt;h1&gt; to &lt;h6&gt;.</p>' }, starter: '<h1>Judul</h1>\n<p>Paragraf</p>' },
  { id: 'html-3', title: { id: '3. Link & Gambar', en: '3. Links & Images' }, content: { id: '<h2>Link & Gambar</h2><p>Gunakan &lt;a&gt; dan &lt;img&gt;.</p>', en: '<h2>Links & Images</h2><p>Use &lt;a&gt; and &lt;img&gt;.</p>' }, starter: '<a href="#">Link</a>' },
  { id: 'html-4', title: { id: '4. List', en: '4. Lists' }, content: { id: '<h2>List</h2><p>Gunakan &lt;ul&gt; atau &lt;ol&gt;.</p>', en: '<h2>Lists</h2><p>Use &lt;ul&gt; or &lt;ol&gt;.</p>' }, starter: '<ul><li>Item</li></ul>' },
  { id: 'html-5', title: { id: '5. Form', en: '5. Forms' }, content: { id: '<h2>Form</h2><p>Gunakan &lt;input&gt;.</p>', en: '<h2>Forms</h2><p>Use &lt;input&gt;.</p>' }, starter: '<input type="text">' },
  { id: 'html-6', title: { id: '6. Div & Span', en: '6. Div & Span' }, content: { id: '<h2>Div & Span</h2><p>Div untuk block, Span untuk inline.</p>', en: '<h2>Div & Span</h2><p>Div for block, Span for inline.</p>' }, starter: '<div>Block</div>' },
  { id: 'html-7', title: { id: '7. Tabel', en: '7. Tables' }, content: { id: '<h2>Tabel</h2><p>Gunakan &lt;table&gt;.</p>', en: '<h2>Tables</h2><p>Use &lt;table&gt;.</p>' }, starter: '<table border="1"><tr><td>Data</td></tr></table>' },
  { id: 'html-8', title: { id: '8. Semantic', en: '8. Semantic' }, content: { id: '<h2>Semantic HTML</h2><p>Gunakan &lt;header&gt;, &lt;main&gt;, &lt;footer&gt;.</p>', en: '<h2>Semantic HTML</h2><p>Use &lt;header&gt;, &lt;main&gt;, &lt;footer&gt;.</p>' }, starter: '<header>Header</header>' }
];

// 1. TAMPILKAN MATERI LANGSUNG TANPA MENUNGGU SUPABASE
document.addEventListener('DOMContentLoaded', () => {
  renderLessonList();
  if (LESSONS.length > 0) openLesson(LESSONS[0].id);
  
  // Coba hubungkan ke Supabase untuk cek login (opsional)
  setTimeout(() => {
    if (window.supabaseClient) {
      sb = window.supabaseClient;
      loadUser();
      loadProgress();
    }
  }, 1000);
});

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
  
  container.innerHTML = `
    <div class="lesson-header">
      <h1>${getText(lesson.title)}</h1>
      ${isCompleted ? `<span class="badge-done">✅ Selesai</span>` : `<span class="badge-todo">Belum selesai</span>`}
    </div>
    <div class="lesson-text">${getText(lesson.content)}</div>
    <div class="playground">
      <div class="playground-header">
        <h3>🔧 Coba Sendiri</h3>
        <div class="playground-buttons">
          <button class="btn-sm btn-run" onclick="runPreview()">▶ Jalankan</button>
          <button class="btn-sm btn-reset" onclick="resetCode('${lessonId}')">↻ Reset</button>
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
  doc.write(`<!DOCTYPE html><html><head><style>body{font-family:Poppins,sans-serif;padding:15px;}</style></head><body>${code}</body></html>`);
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

// 2. FITUR LOGIN & PROGRESS (Berjalan di belakang layar)
async function loadUser() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    currentUser = session.user;
    const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Siswa';
    const el = document.getElementById('userName');
    if (el) el.textContent = `👤 ${name}`;
  }
}

async function loadProgress() {
  if (!currentUser) return;
  const { data, error } = await sb.from('user_progress').select('lesson_id').eq('course_id', COURSE_ID).eq('completed', true);
  if (!error && data) {
    completedLessons = new Set(data.map(d => d.lesson_id));
    renderLessonList();
  }
}

async function markComplete(lessonId) {
  if (!sb || !currentUser) { 
    completedLessons.add(lessonId);
    renderLessonList();
    openLesson(lessonId);
    return; 
  }
  const { error } = await sb.from('user_progress').upsert({
    user_id: currentUser.id, course_id: COURSE_ID, lesson_id: lessonId, completed: true
  }, { onConflict: 'user_id,course_id,lesson_id' });
  
  if (!error) {
    completedLessons.add(lessonId);
    renderLessonList();
    openLesson(lessonId);
  }
}

// 3. MODE GELAP & FOKUS
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

// Expose ke HTML
window.openLesson = openLesson;
window.runPreview = runPreview;
window.resetCode = resetCode;
window.markComplete = markComplete;
window.changeLanguage = changeLanguage;
window.toggleTheme = toggleTheme;
window.toggleFocus = toggleFocus;
