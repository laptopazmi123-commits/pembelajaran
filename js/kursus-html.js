// ============================================
// KURSUS HTML INTERAKTIF - FINAL
// ============================================
const COURSE_ID = 'html-dasar';
let currentLang = 'id';
let sb = null;
let currentUser = null;
let completedLessons = new Set();
let currentLessonId = null;

const TRANSLATIONS = {
  id: { progress: 'Progress', run: '▶ Jalankan', reset: '↻ Reset', markDone: '✓ Tandai Selesai', done: '✅ Sudah Selesai', editor: 'Editor Kode', preview: 'Preview', tryIt: '🔧 Coba Sendiri', completed: '✅ Selesai', notCompleted: 'Belum selesai' },
  en: { progress: 'Progress', run: '▶ Run', reset: '↻ Reset', markDone: '✓ Mark as Done', done: '✅ Completed', editor: 'Code Editor', preview: 'Preview', tryIt: '🔧 Try It Yourself', completed: '✅ Completed', notCompleted: 'Not completed' },
  ja: { progress: '進捗', run: '▶ 実行', reset: '↻ リセット', markDone: '✓ 完了にする', done: '✅ 完了', editor: 'コードエディタ', preview: 'プレビュー', tryIt: '🔧 自分で試す', completed: '✅ 完了', notCompleted: '未完了' },
  zh: { progress: '进度', run: '▶ 运行', reset: '↻ 重置', markDone: '✓ 标记完成', done: '✅ 已完成', editor: '代码编辑器', preview: '预览', tryIt: '🔧 自己试试', completed: '✅ 已完成', notCompleted: '未完成' },
  ko: { progress: '진행률', run: '▶ 실행', reset: '↻ 초기화', markDone: '✓ 완료 표시', done: '✅ 완료됨', editor: '코드 에디터', preview: '미리보기', tryIt: '🔧 직접 해보기', completed: '✅ 완료', notCompleted: '미완료' }
};

const LESSONS = [
  { id: 'html-1', title: { id: '1. Pengenalan HTML', en: '1. Intro to HTML', ja: '1. HTML入門', zh: '1. HTML简介', ko: '1. HTML 소개' }, content: { id: '<h2>Apa itu HTML?</h2><p>HTML adalah bahasa markup untuk web.</p>', en: '<h2>What is HTML?</h2><p>HTML is a markup language for the web.</p>', ja: '<h2>HTMLとは？</h2><p>HTMLはウェブのマークアップ言語です。</p>', zh: '<h2>什么是HTML？</h2><p>HTML是网页的标记语言。</p>', ko: '<h2>HTML이란?</h2><p>HTML은 웹을 위한 마크업 언어입니다.</p>' }, starter: '<h1>Halo Dunia</h1>' },
  { id: 'html-2', title: { id: '2. Heading & Paragraf', en: '2. Headings', ja: '2. 見出し', zh: '2. 标题', ko: '2. 제목' }, content: { id: '<h2>Heading & Paragraf</h2><p>Gunakan &lt;h1&gt; sampai &lt;h6&gt;.</p>', en: '<h2>Headings & Paragraphs</h2><p>Use &lt;h1&gt; to &lt;h6&gt;.</p>', ja: '<h2>見出しと段落</h2><p>&lt;h1&gt;から&lt;h6&gt;まで。</p>', zh: '<h2>标题和段落</h2><p>使用&lt;h1&gt;到&lt;h6&gt;。</p>', ko: '<h2>제목과 단락</h2><p>&lt;h1&gt;부터 &lt;h6&gt;까지.</p>' }, starter: '<h1>Judul</h1>\n<p>Paragraf</p>' },
  { id: 'html-3', title: { id: '3. Link & Gambar', en: '3. Links & Images', ja: '3. リンク', zh: '3. 链接', ko: '3. 링크' }, content: { id: '<h2>Link & Gambar</h2><p>Gunakan &lt;a&gt; dan &lt;img&gt;.</p>', en: '<h2>Links & Images</h2><p>Use &lt;a&gt; and &lt;img&gt;.</p>', ja: '<h2>リンクと画像</h2><p>&lt;a&gt;と&lt;img&gt;を使用。</p>', zh: '<h2>链接和图片</h2><p>使用&lt;a&gt;和&lt;img&gt;。</p>', ko: '<h2>링크와 이미지</h2><p>&lt;a&gt;와 &lt;img&gt;를 사용하세요.</p>' }, starter: '<a href="#">Link</a>' },
  { id: 'html-4', title: { id: '4. List', en: '4. Lists', ja: '4. リスト', zh: '4. 列表', ko: '4. 목록' }, content: { id: '<h2>List</h2><p>Gunakan &lt;ul&gt; atau &lt;ol&gt;.</p>', en: '<h2>Lists</h2><p>Use &lt;ul&gt; or &lt;ol&gt;.</p>', ja: '<h2>リスト</h2><p>&lt;ul&gt;または&lt;ol&gt;を使用。</p>', zh: '<h2>列表</h2><p>使用&lt;ul&gt;或&lt;ol&gt;。</p>', ko: '<h2>목록</h2><p>&lt;ul&gt; 또는 &lt;ol&gt;을 사용하세요.</p>' }, starter: '<ul><li>Item</li></ul>' },
  { id: 'html-5', title: { id: '5. Form', en: '5. Forms', ja: '5. フォーム', zh: '5. 表单', ko: '5. 폼' }, content: { id: '<h2>Form</h2><p>Gunakan &lt;input&gt;.</p>', en: '<h2>Forms</h2><p>Use &lt;input&gt;.</p>', ja: '<h2>フォーム</h2><p>&lt;input&gt;を使用。</p>', zh: '<h2>表单</h2><p>使用&lt;input&gt;。</p>', ko: '<h2>폼</h2><p>&lt;input&gt;을 사용하세요.</p>' }, starter: '<input type="text">' },
  { id: 'html-6', title: { id: '6. Div & Span', en: '6. Div & Span', ja: '6. DivとSpan', zh: '6. Div和Span', ko: '6. Div와 Span' }, content: { id: '<h2>Div & Span</h2><p>Div untuk block, Span untuk inline.</p>', en: '<h2>Div & Span</h2><p>Div for block, Span for inline.</p>', ja: '<h2>DivとSpan</h2><p>Divはブロック、Spanはインライン。</p>', zh: '<h2>Div和Span</h2><p>Div用于块，Span用于内联。</p>', ko: '<h2>Div와 Span</h2><p>Div는 블록, Span은 인라인.</p>' }, starter: '<div>Block</div>' },
  { id: 'html-7', title: { id: '7. Tabel', en: '7. Tables', ja: '7. テーブル', zh: '7. 表格', ko: '7. 테이블' }, content: { id: '<h2>Tabel</h2><p>Gunakan &lt;table&gt;.</p>', en: '<h2>Tables</h2><p>Use &lt;table&gt;.</p>', ja: '<h2>テーブル</h2><p>&lt;table&gt;を使用。</p>', zh: '<h2>表格</h2><p>使用&lt;table&gt;。</p>', ko: '<h2>테이블</h2><p>&lt;table&gt;을 사용하세요.</p>' }, starter: '<table border="1"><tr><td>Data</td></tr></table>' },
  { id: 'html-8', title: { id: '8. Semantic', en: '8. Semantic', ja: '8. セマンティック', zh: '8. 语义化', ko: '8. 시맨틱' }, content: { id: '<h2>Semantic HTML</h2><p>Gunakan &lt;header&gt;, &lt;main&gt;, &lt;footer&gt;.</p>', en: '<h2>Semantic HTML</h2><p>Use &lt;header&gt;, &lt;main&gt;, &lt;footer&gt;.</p>', ja: '<h2>セマンティックHTML</h2><p>&lt;header&gt;、&lt;main&gt;、&lt;footer&gt;を使用。</p>', zh: '<h2>语义化HTML</h2><p>使用&lt;header&gt;、&lt;main&gt;、&lt;footer&gt;。</p>', ko: '<h2>시맨틱 HTML</h2><p>&lt;header&gt;, &lt;main&gt;, &lt;footer&gt;를 사용하세요.</p>' }, starter: '<header>Header</header>' }
];

const QUIZZES = {
  'html-1': [{ q: 'HTML singkatan dari?', options: ['HyperText Markup Language', 'High Tech Language', 'Home Tool', 'Hyperlink'], answer: 0 }],
  'html-2': [{ q: 'Heading terbesar?', options: ['<h6>', '<h1>', '<h3>', '<header>'], answer: 1 }],
  'html-3': [{ q: 'Atribut URL link?', options: ['src', 'link', 'href', 'url'], answer: 2 }],
  'html-4': [{ q: 'List berurutan?', options: ['<ul>', '<ol>', '<list>', '<dl>'], answer: 1 }],
  'html-5': [{ q: 'Input email?', options: ['text', 'mail', 'email', 'gmail'], answer: 2 }],
  'html-6': [{ q: 'Div adalah?', options: ['inline', 'block', 'hidden', 'form'], answer: 1 }],
  'html-7': [{ q: 'Baris tabel?', options: ['<td>', '<tr>', '<th>', '<row>'], answer: 1 }],
  'html-8': [{ q: 'Navigasi?', options: ['<menu>', '<nav>', '<navigate>', '<link>'], answer: 1 }]
};

// --- INISIALISASI ---
window.addEventListener('supabase-ready', async () => {
  sb = window.supabaseClient;
  await initCourse();
});

document.addEventListener('DOMContentLoaded', () => {
  if (window.supabaseClient && !sb) {
    setTimeout(async () => { sb = window.supabaseClient; await initCourse(); }, 500);
  }
});

async function initCourse() {
  await loadUser();
  await loadProgress();
  renderLessonList();
  if (LESSONS.length > 0) openLesson(LESSONS[0].id);
}

async function loadUser() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { window.location.href = 'login.html'; return; }
  currentUser = session.user;
  const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Siswa';
  const el = document.getElementById('userName');
  if (el) el.textContent = `👤 ${name}`;
}

async function loadProgress() {
  const { data, error } = await sb.from('user_progress').select('lesson_id').eq('course_id', COURSE_ID).eq('completed', true);
  if (!error && data) completedLessons = new Set(data.map(d => d.lesson_id));
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

function changeLanguage(lang) {
  currentLang = lang;
  renderLessonList();
  if (currentLessonId) openLesson(currentLessonId);
}

function t(key) { return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.id[key] || key; }
function getText(obj) { return typeof obj === 'string' ? obj : (obj[currentLang] || obj.id); }

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
      ${isCompleted ? `<span class="badge-done">${t('completed')}</span>` : `<span class="badge-todo">${t('notCompleted')}</span>`}
    </div>
    <div class="lesson-text">${getText(lesson.content)}</div>
    ${renderQuiz(lessonId)}
    <div class="playground">
      <div class="playground-header">
        <h3>${t('tryIt')}</h3>
        <div class="playground-buttons">
          <button class="btn-sm btn-run" onclick="runPreview()">${t('run')}</button>
          <button class="btn-sm btn-reset" onclick="resetCode('${lessonId}')">${t('reset')}</button>
        </div>
      </div>
      <div class="editor-wrapper">
        <div class="editor-label">${t('editor')}</div>
        <textarea id="codeInput" class="code-input" spellcheck="false">${lesson.starter}</textarea>
      </div>
      <div class="preview-wrapper">
        <div class="preview-label">${t('preview')}</div>
        <iframe id="previewFrame" class="preview-frame"></iframe>
      </div>
    </div>
    <div class="lesson-actions">
      <button class="btn-success" onclick="markComplete('${lessonId}')" ${isCompleted ? 'disabled' : ''}>
        ${isCompleted ? t('done') : t('markDone')}
      </button>
    </div>
  `;
  runPreview();
  initQuiz(lessonId);
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

function resetCode(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  const input = document.getElementById('codeInput');
  if (lesson && input) { input.value = lesson.starter; runPreview(); }
}

async function markComplete(lessonId) {
  if (!sb || !currentUser) return alert('Belum login');
  const { error } = await sb.from('user_progress').upsert({
    user_id: currentUser.id, course_id: COURSE_ID, lesson_id: lessonId, completed: true
  }, { onConflict: 'user_id,course_id,lesson_id' });
  
  if (error) { alert('Gagal simpan: ' + error.message); return; }
  
  completedLessons.add(lessonId);
  updateProgressUI();
  renderLessonList();
  openLesson(lessonId);
}

// --- MODE FUNCTIONS ---
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('zc_theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}
(function loadTheme() {
  if (localStorage.getItem('zc_theme') === 'dark') {
    document.body.classList.add('dark-mode');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = '☀️';
  }
})();

function toggleFocus() {
  document.body.classList.toggle('focus-mode');
  const isFocus = document.body.classList.contains('focus-mode');
  const oldBtn = document.getElementById('focusExitBtn');
  if (oldBtn) oldBtn.remove();
  
  if (isFocus) {
    const exitBtn = document.createElement('button');
    exitBtn.id = 'focusExitBtn';
    exitBtn.className = 'focus-exit-btn';
    exitBtn.textContent = '✕ Keluar Mode Fokus';
    exitBtn.onclick = toggleFocus;
    document.body.appendChild(exitBtn);
  }
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('focus-mode')) toggleFocus();
});

// --- QUIZ FUNCTIONS ---
function renderQuiz(lessonId) {
  const quiz = QUIZZES[lessonId];
  if (!quiz) return '';
  return `
    <div class="quiz-container" id="quizBox">
      <div class="quiz-header">
        <h3>🧠 Kuis Latihan</h3>
        <span class="quiz-score" id="quizScore">0/${quiz.length}</span>
      </div>
      <div id="quizQuestions"></div>
      <div class="quiz-feedback" id="quizFeedback"></div>
    </div>
  `;
}

function initQuiz(lessonId) {
  const quiz = QUIZZES[lessonId];
  if (!quiz) return;
  const container = document.getElementById('quizQuestions');
  const feedback = document.getElementById('quizFeedback');
  const scoreEl = document.getElementById('quizScore');
  if (!container) return;

  let answered = 0, correct = 0;
  container.innerHTML = quiz.map((q, qi) => `
    <div class="quiz-question" data-q="${qi}">
      <p>${qi + 1}. ${q.q}</p>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `<button class="quiz-option" onclick="answerQuiz(${qi}, ${oi})">${opt}</button>`).join('')}
      </div>
    </div>
  `).join('');

  window.answerQuiz = (qi, oi) => {
    const q = quiz[qi];
    const questionEl = container.querySelector(`[data-q="${qi}"]`);
    if (questionEl.dataset.answered) return;
    questionEl.dataset.answered = '1';
    
    const options = questionEl.querySelectorAll('.quiz-option');
    options.forEach((btn, i) => {
      if (i === q.answer) btn.classList.add('correct');
      else if (i === oi) btn.classList.add('wrong');
      btn.disabled = true;
    });
    
    answered++;
    if (oi === q.answer) {
      correct++;
      feedback.textContent = '✅ Benar!';
      feedback.className = 'quiz-feedback show correct';
    } else {
      feedback.textContent = `❌ Salah. Jawaban benar: ${q.options[q.answer]}`;
      feedback.className = 'quiz-feedback show wrong';
    }
    
    if (scoreEl) scoreEl.textContent = `${correct}/${quiz.length}`;
    if (answered === quiz.length) {
      setTimeout(() => {
        feedback.textContent = `🎉 Selesai! Skor: ${correct}/${quiz.length}`;
        feedback.className = 'quiz-feedback show ' + (correct === quiz.length ? 'correct' : 'wrong');
      }, 800);
    }
  };
}

// Expose ke global window agar bisa dipanggil dari HTML
window.openLesson = openLesson;
window.runPreview = runPreview;
window.resetCode = resetCode;
window.markComplete = markComplete;
window.changeLanguage = changeLanguage;
window.toggleTheme = toggleTheme;
window.toggleFocus = toggleFocus;
