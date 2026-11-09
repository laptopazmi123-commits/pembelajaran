const COURSE_ID = 'js-dasar';
let supabaseDB = null;
let currentUser = null;
let completedLessons = new Set();
let currentLessonId = null;

const LESSONS = [
  { 
    id: 'js-1', 
    title: '1. Pengenalan JavaScript', 
    content: `
      <h2>Membuat Website Interaktif (JavaScript)</h2>
      <p>HTML adalah struktur, CSS adalah tampilan, dan <strong>JavaScript (JS)</strong> adalah otak/kelakuannya. JS membuat website bisa merespon klik, menghitung, atau menampilkan peringatan.</p>
      <h3>Mencoba JS Pertama Kali</h3>
      <p>Kita menggunakan tag <code>&lt;script&gt;</code> untuk menulis JS. Fungsi <code>alert()</code> akan memunculkan kotak pesan.</p>
      <pre>&lt;script&gt;
  alert("Halo, ini pesan dari JavaScript!");
&lt;/script&gt;</pre>
      <p><strong>📝 Tugas:</strong> Jalankan kode di kanan. Kamu akan melihat popup (peringatan) muncul!</p>
    `, 
    starter: '<h1>Belajar JavaScript</h1>\n<p>Lihat pesan yang muncul saat halaman dimuat.</p>\n\n<script>\n  alert("Selamat datang di JavaScript!");\n</script>' 
  },
  { 
    id: 'js-2', 
    title: '2. Variabel & console.log', 
    content: `
      <h2>Menyimpan Data (Variabel)</h2>
      <p>Variabel adalah "kotak" untuk menyimpan nilai, seperti angka atau teks. Kita gunakan kata kunci <code>let</code> atau <code>const</code>.</p>
      <p>Untuk melihat hasilnya tanpa mengganggu halaman, kita gunakan <code>console.log()</code>. (Tekan F12 -> Console untuk melihat hasilnya).</p>
      <pre>&lt;script&gt;
  let nama = "Budi";
  let umur = 17;
  console.log("Nama saya: " + nama);
&lt;/script&gt;</pre>
      <p><strong>📝 Tugas:</strong> Ubah variabel <code>nama</code> di editor dengan namamu sendiri, lalu jalankan. Lihat perubahan di kotak preview!</p>
    `, 
    starter: '<h1>Mencoba Variabel</h1>\n<p id="demo">Nama saya adalah ...</p>\n\n<script>\n  let nama = "Budi";\n  document.getElementById("demo").innerText = "Nama saya adalah " + nama;\n</script>' 
  },
  { 
    id: 'js-3', 
    title: '3. Fungsi (Function)', 
    content: `
      <h2>Membuat Fungsi</h2>
      <p>Fungsi adalah blok kode yang bisa dipanggil berkali-kali untuk melakukan tugas tertentu. Ini membuat kode kita rapi dan tidak berulang.</p>
      <pre>&lt;script&gt;
  function sapa(nama) {
    return "Halo, " + nama + "!";
  }
  
  // Memanggil fungsi
  let pesan = sapa("Andi");
  alert(pesan);
&lt;/script&gt;</pre>
      <p>Dalam contoh di atas, kita membuat fungsi bernama <code>sapa</code>. Saat kita memanggilnya, kita memberikan data "Andi".</p>
      <p><strong>📝 Tugas:</strong> Buat sebuah fungsi yang menerima angka, lalu kalikan angka tersebut dengan 2, dan tampilkan hasilnya di halaman!</p>
    `, 
    starter: '<h1>Belajar Fungsi</h1>\n<p id="hasil">Hasil: </p>\n\n<script>\n  function kaliDua(angka) {\n    return angka * 2;\n  }\n\n  let nilai = kaliDua(10);\n  document.getElementById("hasil").innerText = "Hasil: " + nilai;\n</script>' 
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
