// ============================================
// KURSUS JAVASCRIPT - MATERI LENGKAP
// ============================================
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
      <h2>Menghidupkan Website (JavaScript)</h2>
      <p>Jika HTML adalah kerangka, dan CSS adalah tampilan, maka <strong>JavaScript (JS)</strong> adalah otaknya. JS membuat website bisa berpikir dan bereaksi terhadap tindakan pengguna.</p>
      
      <h3>Analogi: Mobil</h3>
      <p>HTML adalah bodi mobil, CSS adalah cat dan velg racing, sedangkan JavaScript adalah mesin dan setirnya. Tanpa JS, mobil hanya bisa dipajang, tidak bisa dikendarai.</p>

      <h3>Mencoba JS Pertama Kali</h3>
      <p>Kita menggunakan tag <code>&lt;script&gt;</code> untuk menulis JS. Fungsi <code>alert()</code> akan memunculkan kotak pesan popup.</p>
      <pre>&lt;script&gt;
  alert("Halo, ini pesan dari JavaScript!");
&lt;/script&gt;</pre>
      <p><strong>📝 Tugas:</strong> Jalankan kode di kanan. Kamu akan melihat popup peringatan muncul di layar!</p>
    `, 
    starter: '<h1>Belajar JavaScript</h1>\n<p>Lihat pesan yang muncul saat halaman dimuat.</p>\n\n<script>\n  alert("Selamat datang di JavaScript!");\n</script>' 
  },
  { 
    id: 'js-2', 
    title: '2. Variabel & Tipe Data', 
    content: `
      <h2>Menyimpan Data (Variabel)</h2>
      <p>Variabel adalah "kotak" atau "wadah" untuk menyimpan nilai. Di JavaScript modern, kita menggunakan kata kunci <code>let</code> (bisa diubah) atau <code>const</code> (tidak bisa diubah).</p>
      
      <h3>Tipe Data Dasar:</h3>
      <ul>
        <li><strong>String</strong> : Teks, ditulis dalam tanda kutip. Contoh: <code>"Budi"</code>.</li>
        <li><strong>Number</strong> : Angka. Contoh: <code>17</code> atau <code>3.14</code>.</li>
        <li><strong>Boolean</strong> : Nilai benar/salah. Contoh: <code>true</code> atau <code>false</code>.</li>
      </ul>

      <pre>let nama = "Budi"; // String
let umur = 17;      // Number
const negara = "Indonesia"; // Tidak bisa diubah</pre>
      
      <p>Untuk menampilkan hasil ke halaman web, kita gunakan <code>document.getElementById()</code>.</p>
      <p><strong>📝 Tugas:</strong> Ubah variabel <code>nama</code> di editor dengan namamu sendiri, lalu jalankan!</p>
    `, 
    starter: '<h1>Mencoba Variabel</h1>\n<p id="demo">Nama saya adalah ...</p>\n\n<script>\n  let nama = "Budi";\n  let umur = 17;\n  \n  document.getElementById("demo").innerText = "Nama saya adalah " + nama + ", umur " + umur + " tahun.";\n</script>' 
  },
  { 
    id: 'js-3', 
    title: '3. Fungsi (Function)', 
    content: `
      <h2>Membuat Fungsi</h2>
      <p>Fungsi adalah blok kode yang bisa dipanggil berkali-kali untuk melakukan tugas tertentu. Ini membuat kode kita rapi dan tidak berulang (DRY: Don't Repeat Yourself).</p>
      
      <h3>Cara Membuat Fungsi</h3>
      <pre>function sapa(nama) {
  return "Halo, " + nama + "!";
}</pre>
      <ul>
        <li><code>function</code> : Kata kunci untuk membuat fungsi.</li>
        <li><code>sapa</code> : Nama fungsi (bebas).</li>
        <li><code>(nama)</code> : Parameter, data yang bisa dimasukkan ke fungsi.</li>
        <li><code>return</code> : Mengembalikan nilai hasil fungsi.</li>
      </ul>

      <p><strong>📝 Tugas:</strong> Buat sebuah fungsi baru bernama <code>kaliTiga</code> yang menerima angka, lalu kalikan angka tersebut dengan 3, dan tampilkan hasilnya di halaman!</p>
    `, 
    starter: '<h1>Belajar Fungsi</h1>\n<p id="hasil">Hasil: </p>\n\n<script>\n  function kaliDua(angka) {\n    return angka * 2;\n  }\n\n  let nilai = kaliDua(10);\n  document.getElementById("hasil").innerText = "Hasil: " + nilai;\n</script>' 
  },
  { 
    id: 'js-4', 
    title: '4. Event & DOM', 
    content: `
      <h2>Bereaksi terhadap Klik (Event)</h2>
      <p>JavaScript bisa mendengarkan aksi pengguna, seperti klik tombol. Ini disebut <strong>Event</strong>. Kita menggunakan HTML <code>onclick</code> untuk memanggil fungsi JS.</p>
      
      <h3>Memanipulasi DOM</h3>
      <p>DOM (Document Object Model) adalah representasi halaman HTML di mata JavaScript. Kita bisa mengubah teks, warna, atau menyembunyikan elemen menggunakan JS.</p>
      <pre>&lt;button onclick="ubahTeks()"&gt;Klik Saya&lt;/button&gt;
&lt;p id="pesan"&gt;Teks awal&lt;/p&gt;

&lt;script&gt;
  function ubahTeks() {
    document.getElementById("pesan").innerText = "Teks telah diubah!";
    document.getElementById("pesan").style.color = "blue";
  }
&lt;/script&gt;</pre>
      <p><strong>📝 Tugas:</strong> Buat tombol yang jika diklik bisa mengubah warna latar belakang halaman menjadi hitam (<code>document.body.style.backgroundColor = "black"</code>).</p>
    `, 
    starter: '<h1>Belajar Event</h1>\n<button onclick="gantiWarna()" style="padding:10px; cursor:pointer;">Klik Saya!</button>\n<p id="pesan">Warna belum berubah.</p>\n\n<script>\n  function gantiWarna() {\n    document.getElementById("pesan").innerText = "Berhasil! Tombol telah diklik.";\n    document.getElementById("pesan").style.color = "red";\n  }\n</script>' 
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
