// ============================================
// KURSUS CSS - MATERI LENGKAP
// ============================================
const COURSE_ID = 'css-dasar';
let supabaseDB = null;
let currentUser = null;
let completedLessons = new Set();
let currentLessonId = null;

const LESSONS = [
  { 
    id: 'css-1', 
    title: '1. Pengenalan & Sintaks CSS', 
    content: `
      <h2>Membuat Website Jadi Cantik (CSS)</h2>
      <p>Jika HTML adalah kerangka rumah, maka <strong>CSS (Cascading Style Sheets)</strong> adalah cat, dekorasi, dan interiornya. CSS bertugas mengatur warna, ukuran, jarak, dan tata letak elemen HTML agar enak dilihat.</p>
      
      <h3>Analogi Sederhana</h3>
      <p>Bayangkan kamu punya sebuah kotak kardus (HTML). Tanpa CSS, kardus itu terlihat polos, coklat, dan membosankan. Dengan CSS, kamu bisa mewarnai kardus itu jadi biru, memberi pita merah, atau membuat sudutnya membulat.</p>

      <h3>Cara Menulis CSS</h3>
      <p>CSS ditulis dengan aturan: <em>Pilih elemen HTML-nya, lalu tentukan gaya yang ingin diubah.</em></p>
      <pre>h1 {
  color: blue;
  font-size: 40px;
}</pre>
      <ul>
        <li><code>h1</code> disebut <strong>Selector</strong> (target yang ingin diubah).</li>
        <li><code>color: blue;</code> disebut <strong>Property & Value</strong> (warna diubah menjadi biru).</li>
      </ul>
      <p><strong>📝 Tugas:</strong> Di editor sebelah kanan, coba ubah <code>color: red;</code> menjadi warna lain (misal: <code>green</code> atau <code>purple</code>) dan klik "Jalankan"!</p>
    `, 
    starter: '<style>\n  h1 {\n    color: red;\n    text-align: center;\n  }\n</style>\n\n<h1>Belajar CSS</h1>\n<p>Lihat warna judul di atas!</p>' 
  },
  { 
    id: 'css-2', 
    title: '2. Warna & Teks', 
    content: `
      <h2>Mengatur Warna dan Teks</h2>
      <p>Ada beberapa properti CSS yang paling sering dipakai untuk mengatur teks:</p>
      <ul>
        <li><code>color</code> : Warna teks.</li>
        <li><code>background-color</code> : Warna latar belakang.</li>
        <li><code>font-family</code> : Jenis huruf (misal: Arial, Times New Roman).</li>
        <li><code>text-align</code> : Perataan teks (left, center, right).</li>
      </ul>

      <h3>Format Warna</h3>
      <p>Kamu bisa menulis warna dengan nama (<code>red</code>, <code>blue</code>), kode Hex (<code>#ff0000</code>), atau RGB (<code>rgb(255, 0, 0)</code>).</p>
      <pre>p {
  color: white;
  background-color: darkblue;
  font-family: Arial, sans-serif;
  padding: 10px;
}</pre>
      <p><strong>📝 Tugas:</strong> Ubah warna latar belakang halaman menjadi warna kuning muda (<code>lightyellow</code>), dan ubah jenis huruf h2 menjadi <code>Courier New</code>!</p>
    `, 
    starter: '<style>\n  body {\n    background-color: #f0f0f0;\n  }\n  h2 {\n    color: green;\n    text-align: center;\n  }\n  p {\n    color: #333;\n  }\n</style>\n\n<h2>Judul Berwarna</h2>\n<p>Coba ubah warna latar belakang halaman ini menjadi kuning.</p>' 
  },
  { 
    id: 'css-3', 
    title: '3. Box Model (Padding, Border, Margin)', 
    content: `
      <h2>Konsep Kotak (Box Model)</h2>
      <p>Setiap elemen HTML di layar sebenarnya adalah sebuah kotak. Kotak ini memiliki 3 lapisan pelindung dari dalam ke luar:</p>
      <ol>
        <li><strong>Padding</strong> : Jarak antara teks di dalam kotak dengan garis tepi kotak.</li>
        <li><strong>Border</strong> : Garis tepi kotak itu sendiri.</li>
        <li><strong>Margin</strong> : Jarak antara kotak ini dengan kotak lain di luarnya.</li>
      </ol>
      
      <h3>Contoh Penerapan</h3>
      <pre>.kotak {
  width: 200px;
  padding: 20px;          /* Jarak dalam */
  border: 3px solid blue; /* Garis tepi */
  margin-top: 20px;       /* Jarak luar */
  border-radius: 10px;    /* Sudut membulat */
}</pre>
      <p><strong>📝 Tugas:</strong> Buat sebuah kotak baru dengan garis putus-putus (<code>dashed</code>) berwarna merah, lalu tambahkan jarak luar (<code>margin</code>) sebesar 30px!</p>
    `, 
    starter: '<style>\n  .kotak {\n    width: 200px;\n    padding: 20px;\n    border: 2px solid black;\n    margin-top: 20px;\n  }\n</style>\n\n<div class="kotak">\n  Saya adalah sebuah kotak.<br>\n  Ubah CSS di atas untuk menghias saya!\n</div>' 
  },
  { 
    id: 'css-4', 
    title: '4. Class & ID', 
    content: `
      <h2>Selector Spesifik: Class & ID</h2>
      <p>Kadang kita ingin memberikan gaya yang berbeda untuk dua paragraf yang berbeda. Kita tidak bisa menggunakan tag <code>p</code> karena akan mengenai semua paragraf.</p>
      
      <h3>Class (.)</h3>
      <p>Class ditandai dengan titik (<code>.</code>) di CSS, dan atribut <code>class="..."</code> di HTML. Bisa dipakai untuk banyak elemen.</p>
      <pre>.teks-merah { color: red; }</pre>

      <h3>ID (#)</h3>
      <p>ID ditandai dengan pagar (<code>#</code>) di CSS, dan atribut <code>id="..."</code> di HTML. ID harus <strong>unik</strong>, hanya boleh ada satu di satu halaman.</p>
      <pre>#judul-utama { font-size: 50px; }</pre>
      <p><strong>📝 Tugas:</strong> Di HTML kanan, tambahkan class <code>teks-biru</code> pada paragraf kedua, lalu buat CSS-nya agar teks tersebut berwarna biru!</p>
    `, 
    starter: '<style>\n  .teks-merah {\n    color: red;\n  }\n  #judul {\n    text-align: center;\n    color: purple;\n  }\n</style>\n\n<h2 id="judul">Judul Halaman</h2>\n<p class="teks-merah">Paragraf ini berwarna merah.</p>\n<p>Paragraf ini warna biasa.</p>' 
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderLessonList();
  if (LESSONS.length > 0) openLesson(LESSONS[0].id);
  setTimeout(() => { if (window.supabaseClient) { supabaseDB = window.supabaseClient; checkUserSession(); } }, 1000);
});

async function checkUserSession() {
  const { data: { session } } = await supabaseDB.auth.getSession();
  if (session) { currentUser = session.user; await loadProgress(); }
}

async function loadProgress() {
  if (!currentUser) return;
  const { data, error } = await supabaseDB.from('user_progress').select('lesson_id').eq('course_id', COURSE_ID).eq('completed', true);
  if (!error && data) {
    completedLessons = new Set(data.map(d => d.lesson_id));
    renderLessonList(); updateProgressUI(); if (currentLessonId) openLesson(currentLessonId);
  }
}

function updateProgressUI() {
  const total = LESSONS.length; const done = completedLessons.size;
  document.getElementById('progressText').textContent = `${done}/${total}`;
  document.getElementById('progressFill').style.width = Math.round((done / total) * 100) + '%';
}

function renderLessonList() {
  document.getElementById('lessonList').innerHTML = LESSONS.map(l => `
    <li class="lesson-item ${completedLessons.has(l.id) ? 'completed' : ''}" data-id="${l.id}" onclick="openLesson('${l.id}')">
      <span class="lesson-check">${completedLessons.has(l.id) ? '✅' : '⬜'}</span>
      <span>${l.title}</span>
    </li>
  `).join('');
}

function openLesson(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  currentLessonId = lessonId;
  document.querySelectorAll('.lesson-item').forEach(el => el.classList.toggle('active', el.dataset.id === lessonId));
  const isCompleted = completedLessons.has(lessonId);
  
  document.getElementById('lessonContent').innerHTML = `
    <div class="lesson-header"><h1>${lesson.title}</h1>${isCompleted ? `<span class="badge-done">✅ Selesai</span>` : `<span class="badge-todo">Belum selesai</span>`}</div>
    <div class="lesson-text">${lesson.content}</div>
    <hr style="margin: 30px 0; border: 1px solid #eee;">
    <h3>🔧 Coba Sendiri</h3>
    <div class="playground">
      <div class="playground-header"><div class="playground-buttons"><button class="btn-sm btn-run" onclick="runPreview()">▶ Jalankan</button><button class="btn-sm btn-reset" onclick="resetCode('${lessonId}')">↻ Reset</button></div></div>
      <div class="editor-wrapper"><textarea id="codeInput" class="code-input" spellcheck="false">${lesson.starter}</textarea></div>
      <div class="preview-wrapper"><iframe id="previewFrame" class="preview-frame"></iframe></div>
    </div>
    <div class="lesson-actions"><button class="btn-success" onclick="markComplete('${lessonId}')" ${isCompleted ? 'disabled' : ''}>✓ Tandai Selesai</button></div>
  `;
  runPreview();
}

function runPreview() {
  const frame = document.getElementById('previewFrame'); const code = document.getElementById('codeInput').value;
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open(); doc.write(`<!DOCTYPE html><html><head><style>body{font-family:Poppins,sans-serif;padding:15px;}</style></head><body>${code}</body></html>`); doc.close();
}

function resetCode(lessonId) {
  document.getElementById('codeInput').value = LESSONS.find(l => l.id === lessonId).starter; runPreview();
}

async function markComplete(lessonId) {
  completedLessons.add(lessonId); updateProgressUI(); renderLessonList(); openLesson(lessonId);
  if (supabaseDB && currentUser) {
    await supabaseDB.from('user_progress').upsert({ user_id: currentUser.id, course_id: COURSE_ID, lesson_id: lessonId, completed: true }, { onConflict: 'user_id,course_id,lesson_id' });
  }
}

function toggleTheme() { document.body.classList.toggle('dark-mode'); }
function toggleFocus() { document.body.classList.toggle('focus-mode'); }
window.openLesson = openLesson; window.runPreview = runPreview; window.resetCode = resetCode; window.markComplete = markComplete; window.toggleTheme = toggleTheme; window.toggleFocus = toggleFocus;
