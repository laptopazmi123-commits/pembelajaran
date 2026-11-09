const COURSE_ID = 'css-dasar';
let supabaseDB = null;
let currentUser = null;
let completedLessons = new Set();
let currentLessonId = null;

const LESSONS = [
  { 
    id: 'css-1', 
    title: '1. Pengenalan CSS', 
    content: `
      <h2>Membuat Website Jadi Cantik (CSS)</h2>
      <p>Jika HTML adalah kerangka rumah, maka <strong>CSS (Cascading Style Sheets)</strong> adalah cat, dekorasi, dan interiornya. CSS bertugas mengatur warna, ukuran, jarak, dan tata letak elemen HTML.</p>
      <h3>Cara Menulis CSS</h3>
      <p>Ada 3 cara, tapi yang paling disarankan adalah menggunakan <strong>Tag &lt;style&gt;</strong> di dalam file HTML (untuk pemula) atau file terpisah.</p>
      <pre>&lt;style&gt;
  h1 {
    color: blue;
    font-size: 40px;
  }
&lt;/style&gt;</pre>
      <p><strong>📝 Tugas:</strong> Ubah warna teks di editor sebelah kanan menjadi warna merah!</p>
    `, 
    starter: '<style>\n  h1 {\n    color: red;\n  }\n</style>\n\n<h1>Belajar CSS</h1>\n<p>Lihat warna judul di atas!</p>' 
  },
  { 
    id: 'css-2', 
    title: '2. Warna & Background', 
    content: `
      <h2>Warna & Latar Belakang</h2>
      <p>Kamu bisa mengubah warna teks dengan <code>color</code>, dan warna latar belakang dengan <code>background-color</code>.</p>
      <pre>&lt;style&gt;
  body {
    background-color: lightblue;
  }
  p {
    color: white;
    background-color: darkblue;
    padding: 10px;
  }
&lt;/style&gt;</pre>
      <p><strong>📝 Tugas:</strong> Buat latar belakang halaman menjadi warna kuning, dan teks paragraf menjadi warna hijau!</p>
    `, 
    starter: '<style>\n  body {\n    background-color: #f0f0f0;\n  }\n  h2 {\n    color: green;\n  }\n</style>\n\n<h2>Judul Berwarna</h2>\n<p>Coba ubah warna latar belakang halaman ini.</p>' 
  },
  { 
    id: 'css-3', 
    title: '3. Border & Ukuran', 
    content: `
      <h2>Garis Tepi & Ukuran</h2>
      <p>Kita bisa menambahkan garis tepi menggunakan <code>border</code> dan mengatur ukuran elemen dengan <code>width</code> dan <code>height</code>.</p>
      <pre>&lt;style&gt;
  .kotak {
    width: 200px;
    height: 100px;
    border: 3px solid blue;
    border-radius: 10px;
  }
&lt;/style&gt;</pre>
      <p><code>border-radius</code> membuat sudut kotak menjadi tumpul/melengkung.</p>
      <p><strong>📝 Tugas:</strong> Buat sebuah kotak dengan garis putus-putus (dashed) berwarna merah!</p>
    `, 
    starter: '<style>\n  .kotak {\n    width: 200px;\n    padding: 20px;\n    border: 2px solid black;\n    margin-top: 20px;\n  }\n</style>\n\n<div class="kotak">\n  Saya adalah sebuah kotak.\n</div>' 
  }
];

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
  document.getElementById('progressText').textContent = `${done}/${total}`;
  document.getElementById('progressFill').style.width = percent + '%';
}

function renderLessonList() {
  const list = document.getElementById('lessonList');
  if (!list) return;
  list.innerHTML = LESSONS.map(l => `
    <li class="lesson-item ${completedLessons.has(l.id) ? 'completed' : ''}" data-id="${l.id}" onclick="openLesson('${l.id}')">
      <span class="lesson-check">${completedLessons.has(l.id) ? '✅' : '⬜'}</span>
      <span>${l.title}</span>
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
  
  container.innerHTML = `
    <div class="lesson-header">
      <h1>${lesson.title}</h1>
      ${isCompleted ? `<span class="badge-done">✅ Selesai</span>` : `<span class="badge-todo">Belum selesai</span>`}
    </div>
    <div class="lesson-text">${lesson.content}</div>
    <hr style="margin: 30px 0; border: 1px solid #eee;">
    <h3>🔧 Coba Sendiri</h3>
    <div class="playground">
      <div class="playground-header">
        <div class="playground-buttons">
          <button class="btn-sm btn-run" onclick="runPreview()">▶ Jalankan</button>
          <button class="btn-sm btn-reset" onclick="resetCode('${lessonId}')">↻ Reset</button>
        </div>
      </div>
      <div class="editor-wrapper">
        <textarea id="codeInput" class="code-input" spellcheck="false">${lesson.starter}</textarea>
      </div>
      <div class="preview-wrapper">
        <iframe id="previewFrame" class="preview-frame"></iframe>
      </div>
    </div>
    <div class="lesson-actions">
      <button class="btn-success" onclick="markComplete('${lessonId}')" ${isCompleted ? 'disabled' : ''}>✓ Tandai Selesai</button>
    </div>
  `;
  runPreview();
}

function runPreview() {
  const code = document.getElementById('codeInput')?.value || '';
  const frame = document.getElementById('previewFrame');
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>body{font-family:Poppins,sans-serif;padding:15px;}</style></head><body>${code}</body></html>`);
  doc.close();
}

function resetCode(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  document.getElementById('codeInput').value = lesson.starter; 
  runPreview();
}

async function markComplete(lessonId) {
  completedLessons.add(lessonId);
  updateProgressUI();
  renderLessonList();
  openLesson(lessonId);

  if (supabaseDB && currentUser) {
    await supabaseDB.from('user_progress').upsert({
      user_id: currentUser.id, course_id: COURSE_ID, lesson_id: lessonId, completed: true
    }, { onConflict: 'user_id,course_id,lesson_id' });
  }
}

function toggleTheme() { document.body.classList.toggle('dark-mode'); }
function toggleFocus() { document.body.classList.toggle('focus-mode'); }

window.openLesson = openLesson; window.runPreview = runPreview; window.resetCode = resetCode; window.markComplete = markComplete; window.toggleTheme = toggleTheme; window.toggleFocus = toggleFocus;
