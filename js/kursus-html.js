// ============================================
// MODE GELAP / TERANG
// ============================================
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('zc_theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

// Load theme tersimpan
(function loadTheme() {
  const saved = localStorage.getItem('zc_theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = '☀️';
  }
})();

// ============================================
// MODE FOKUS
// ============================================
function toggleFocus() {
  document.body.classList.toggle('focus-mode');
  const isFocus = document.body.classList.contains('focus-mode');

  // Hapus tombol exit lama
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

// Escape untuk keluar mode fokus
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('focus-mode')) {
    toggleFocus();
  }
});

// ============================================
// MODE KUIS / LATIHAN
// ============================================
const QUIZZES = {
  'html-1': [
    {
      q: 'HTML singkatan dari...',
      options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'],
      answer: 0
    },
    {
      q: 'Tag untuk konten yang terlihat adalah...',
      options: ['<head>', '<body>', '<html>', '<title>'],
      answer: 1
    }
  ],
  'html-2': [
    {
      q: 'Heading terbesar adalah...',
      options: ['<h6>', '<h1>', '<h3>', '<header>'],
      answer: 1
    },
    {
      q: 'Tag untuk paragraf adalah...',
      options: ['<p>', '<para>', '<text>', '<paragraph>'],
      answer: 0
    }
  ],
  'html-3': [
    {
      q: 'Atribut untuk URL link adalah...',
      options: ['src', 'link', 'href', 'url'],
      answer: 2
    },
    {
      q: 'Atribut teks alternatif gambar adalah...',
      options: ['title', 'alt', 'desc', 'text'],
      answer: 1
    }
  ],
  'html-4': [
    {
      q: 'List berurutan menggunakan tag...',
      options: ['<ul>', '<ol>', '<list>', '<dl>'],
      answer: 1
    }
  ],
  'html-5': [
    {
      q: 'Input untuk email menggunakan type...',
      options: ['text', 'mail', 'email', 'gmail'],
      answer: 2
    },
    {
      q: 'Tag untuk tombol adalah...',
      options: ['<btn>', '<button>', '<input type="button">', '<click>'],
      answer: 1
    }
  ],
  'html-6': [
    {
      q: 'Div adalah elemen...',
      options: ['inline', 'block-level', 'hidden', 'form'],
      answer: 1
    },
    {
      q: 'Span adalah elemen...',
      options: ['inline', 'block-level', 'table', 'form'],
      answer: 0
    }
  ],
  'html-7': [
    {
      q: 'Tag untuk baris tabel adalah...',
      options: ['<td>', '<tr>', '<th>', '<row>'],
      answer: 1
    }
  ],
  'html-8': [
    {
      q: 'Tag untuk navigasi adalah...',
      options: ['<menu>', '<nav>', '<navigate>', '<link>'],
      answer: 1
    },
    {
      q: 'Tag untuk konten utama adalah...',
      options: ['<content>', '<main>', '<body>', '<center>'],
      answer: 1
    }
  ]
};

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

  let answered = 0;
  let correct = 0;

  container.innerHTML = quiz.map((q, qi) => `
    <div class="quiz-question" data-q="${qi}">
      <p>${qi + 1}. ${q.q}</p>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `
          <button class="quiz-option" onclick="answerQuiz(${qi}, ${oi})">${opt}</button>
        `).join('')}
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

// ============================================
// EXPOSE GLOBAL
// ============================================
window.toggleTheme = toggleTheme;
window.toggleFocus = toggleFocus;
