// ============================================
// KURSUS HTML INTERAKTIF - LENGKAP
// ============================================
const COURSE_ID = 'html-dasar';
let currentLang = 'id';

const TRANSLATIONS = {
  id: {
    progress: 'Progress',
    run: '▶ Jalankan',
    reset: '↻ Reset',
    markDone: '✓ Tandai Selesai',
    done: '✅ Sudah Selesai',
    editor: 'Editor Kode',
    preview: 'Preview',
    tryIt: '🔧 Coba Sendiri',
    completed: '✅ Selesai',
    notCompleted: 'Belum selesai',
    selectLesson: 'Pilih materi di sebelah kiri untuk mulai belajar.'
  },
  en: {
    progress: 'Progress',
    run: '▶ Run',
    reset: '↻ Reset',
    markDone: '✓ Mark as Done',
    done: '✅ Completed',
    editor: 'Code Editor',
    preview: 'Preview',
    tryIt: '🔧 Try It Yourself',
    completed: '✅ Completed',
    notCompleted: 'Not completed',
    selectLesson: 'Select a lesson on the left to start learning.'
  },
  ja: {
    progress: '進捗',
    run: '▶ 実行',
    reset: '↻ リセット',
    markDone: '✓ 完了にする',
    done: '✅ 完了',
    editor: 'コードエディタ',
    preview: 'プレビュー',
    tryIt: '🔧 自分で試す',
    completed: '✅ 完了',
    notCompleted: '未完了',
    selectLesson: '左のレッスンを選択して学習を始めましょう。'
  },
  zh: {
    progress: '进度',
    run: '▶ 运行',
    reset: '↻ 重置',
    markDone: '✓ 标记完成',
    done: '✅ 已完成',
    editor: '代码编辑器',
    preview: '预览',
    tryIt: '🔧 自己试试',
    completed: '✅ 已完成',
    notCompleted: '未完成',
    selectLesson: '选择左侧课程开始学习。'
  },
  ko: {
    progress: '진행률',
    run: '▶ 실행',
    reset: '↻ 초기화',
    markDone: '✓ 완료 표시',
    done: '✅ 완료됨',
    editor: '코드 에디터',
    preview: '미리보기',
    tryIt: '🔧 직접 해보기',
    completed: '✅ 완료',
    notCompleted: '미완료',
    selectLesson: '왼쪽에서 레슨을 선택하여 학습을 시작하세요.'
  }
};

const LESSONS = [
  {
    id: 'html-1',
    title: { id: '1. Pengenalan HTML', en: '1. Introduction to HTML', ja: '1. HTML入門', zh: '1. HTML简介', ko: '1. HTML 소개' },
    content: {
      id: `
        <h2>Apa itu HTML?</h2>
        <p><strong>HTML</strong> (HyperText Markup Language) adalah bahasa markup standar untuk membuat halaman web. HTML bukan bahasa pemrograman — ia tidak memiliki logika seperti if/else atau loop. Tugasnya hanya <strong>menandai</strong> bagian-bagian konten agar browser tahu cara menampilkannya.</p>
        <h3>Struktur Dasar</h3>
        <p>Setiap dokumen HTML memiliki struktur dasar:</p>
        <pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Judul Halaman&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Halo Dunia&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code> — memberi tahu browser ini HTML5</li>
          <li><code>&lt;html&gt;</code> — elemen root</li>
          <li><code>&lt;head&gt;</code> — informasi halaman (tidak terlihat)</li>
          <li><code>&lt;body&gt;</code> — konten yang terlihat</li>
        </ul>
        <div class="tip-box"><strong>💡 Tips:</strong> HTML itu case-insensitive, tapi konvensinya tag ditulis huruf kecil.</div>
      `,
      en: `
        <h2>What is HTML?</h2>
        <p><strong>HTML</strong> (HyperText Markup Language) is the standard markup language for creating web pages. HTML is not a programming language — it has no logic like if/else or loops. Its job is only to <strong>mark up</strong> content so the browser knows how to display it.</p>
        <h3>Basic Structure</h3>
        <p>Every HTML document has a basic structure:</p>
        <pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code> — tells the browser this is HTML5</li>
          <li><code>&lt;html&gt;</code> — root element</li>
          <li><code>&lt;head&gt;</code> — page information (not visible)</li>
          <li><code>&lt;body&gt;</code> — visible content</li>
        </ul>
        <div class="tip-box"><strong>💡 Tip:</strong> HTML is case-insensitive, but the convention is lowercase tags.</div>
      `,
      ja: `
        <h2>HTMLとは？</h2>
        <p><strong>HTML</strong>（HyperText Markup Language）は、Webページを作成するための標準的なマークアップ言語です。HTMLはプログラミング言語ではありません。if/elseやループなどのロジックはありません。役割はコンテンツを<strong>マークアップ</strong>して、ブラウザが表示方法を理解できるようにすることだけです。</p>
        <h3>基本構造</h3>
        <p>すべてのHTML文書には基本構造があります：</p>
        <pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;ページタイトル&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;こんにちは世界&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code> — これがHTML5であることをブラウザに伝えます</li>
          <li><code>&lt;html&gt;</code> — ルート要素</li>
          <li><code>&lt;head&gt;</code> — ページ情報（表示されない）</li>
          <li><code>&lt;body&gt;</code> — 表示されるコンテンツ</li>
        </ul>
        <div class="tip-box"><strong>💡 ヒント：</strong> HTMLは大文字小文字を区別しませんが、慣例として小文字で書きます。</div>
      `,
      zh: `
        <h2>什么是HTML？</h2>
        <p><strong>HTML</strong>（超文本标记语言）是创建网页的标准标记语言。HTML不是编程语言——它没有if/else或循环之类的逻辑。它的作用只是<strong>标记</strong>内容，让浏览器知道如何显示。</p>
        <h3>基本结构</h3>
        <p>每个HTML文档都有基本结构：</p>
        <pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;页面标题&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;你好世界&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code> — 告诉浏览器这是HTML5</li>
          <li><code>&lt;html&gt;</code> — 根元素</li>
          <li><code>&lt;head&gt;</code> — 页面信息（不可见）</li>
          <li><code>&lt;body&gt;</code> — 可见内容</li>
        </ul>
        <div class="tip-box"><strong>💡 提示：</strong> HTML不区分大小写，但约定使用小写标签。</div>
      `,
      ko: `
        <h2>HTML이란?</h2>
        <p><strong>HTML</strong>(HyperText Markup Language)은 웹 페이지를 만들기 위한 표준 마크업 언어입니다. HTML은 프로그래밍 언어가 아닙니다. if/else나 반복문 같은 로직이 없습니다. 역할은 콘텐츠를 <strong>마크업</strong>하여 브라우저가 표시 방법을 알 수 있게 하는 것뿐입니다.</p>
        <h3>기본 구조</h3>
        <p>모든 HTML 문서에는 기본 구조가 있습니다:</p>
        <pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;페이지 제목&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;안녕하세요&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code> — 브라우저에 이것이 HTML5임을 알림</li>
          <li><code>&lt;html&gt;</code> — 루트 요소</li>
          <li><code>&lt;head&gt;</code> — 페이지 정보 (보이지 않음)</li>
          <li><code>&lt;body&gt;</code> — 보이는 콘텐츠</li>
        </ul>
        <div class="tip-box"><strong>💡 팁:</strong> HTML은 대소문자를 구분하지 않지만 관례적으로 소문자를 사용합니다.</div>
      `
    },
    starter: '<h1>Halo, nama saya ...</h1>\n<p>Saya sedang belajar HTML.</p>'
  },
  {
    id: 'html-2',
    title: { id: '2. Heading & Paragraf', en: '2. Headings & Paragraphs', ja: '2. 見出しと段落', zh: '2. 标题和段落', ko: '2. 제목과 단락' },
    content: {
      id: `
        <h2>Heading & Paragraf</h2>
        <p>Heading digunakan untuk judul dan subjudul. Ada 6 level: <code>&lt;h1&gt;</code> sampai <code>&lt;h6&gt;</code>. <code>&lt;h1&gt;</code> paling besar dan paling penting (biasanya hanya satu per halaman), <code>&lt;h6&gt;</code> paling kecil.</p>
        <h3>Contoh</h3>
        <pre>&lt;h1&gt;Judul Utama&lt;/h1&gt;
&lt;h2&gt;Sub Judul&lt;/h2&gt;
&lt;h3&gt;Sub-sub Judul&lt;/h3&gt;
&lt;p&gt;Ini paragraf teks biasa.&lt;/p&gt;</pre>
        <h3>Paragraf</h3>
        <p>Tag <code>&lt;p&gt;</code> digunakan untuk paragraf. Browser otomatis menambahkan jarak antar paragraf.</p>
        <div class="tip-box"><strong>💡 Tips SEO:</strong> Gunakan <code>&lt;h1&gt;</code> hanya sekali per halaman untuk hasil SEO terbaik.</div>
      `,
      en: `
        <h2>Headings & Paragraphs</h2>
        <p>Headings are used for titles and subtitles. There are 6 levels: <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>. <code>&lt;h1&gt;</code> is the largest and most important (usually only one per page), <code>&lt;h6&gt;</code> is the smallest.</p>
        <h3>Example</h3>
        <pre>&lt;h1&gt;Main Title&lt;/h1&gt;
&lt;h2&gt;Subtitle&lt;/h2&gt;
&lt;h3&gt;Sub-subtitle&lt;/h3&gt;
&lt;p&gt;This is a regular text paragraph.&lt;/p&gt;</pre>
        <h3>Paragraphs</h3>
        <p>The <code>&lt;p&gt;</code> tag is used for paragraphs. The browser automatically adds spacing between paragraphs.</p>
        <div class="tip-box"><strong>💡 SEO Tip:</strong> Use <code>&lt;h1&gt;</code> only once per page for best SEO results.</div>
      `,
      ja: `
        <h2>見出しと段落</h2>
        <p>見出しはタイトルやサブタイトルに使われます。6つのレベルがあります：<code>&lt;h1&gt;</code>から<code>&lt;h6&gt;</code>まで。<code>&lt;h1&gt;</code>が最も大きく重要で（通常1ページに1つ）、<code>&lt;h6&gt;</code>が最も小さいです。</p>
        <h3>例</h3>
        <pre>&lt;h1&gt;メインタイトル&lt;/h1&gt;
&lt;h2&gt;サブタイトル&lt;/h2&gt;
&lt;h3&gt;サブサブタイトル&lt;/h3&gt;
&lt;p&gt;これは通常のテキスト段落です。&lt;/p&gt;</pre>
        <h3>段落</h3>
        <p><code>&lt;p&gt;</code>タグは段落に使われます。ブラウザは段落間に自動的にスペースを追加します。</p>
        <div class="tip-box"><strong>💡 SEOのヒント：</strong> 最高のSEO結果を得るために、<code>&lt;h1&gt;</code>は1ページに1回だけ使用してください。</div>
      `,
      zh: `
        <h2>标题和段落</h2>
        <p>标题用于标题和副标题。有6个级别：<code>&lt;h1&gt;</code>到<code>&lt;h6&gt;</code>。<code>&lt;h1&gt;</code>最大且最重要（通常每页只有一个），<code>&lt;h6&gt;</code>最小。</p>
        <h3>示例</h3>
        <pre>&lt;h1&gt;主标题&lt;/h1&gt;
&lt;h2&gt;副标题&lt;/h2&gt;
&lt;h3&gt;副副标题&lt;/h3&gt;
&lt;p&gt;这是一个普通的文本段落。&lt;/p&gt;</pre>
        <h3>段落</h3>
        <p><code>&lt;p&gt;</code>标签用于段落。浏览器会自动在段落之间添加间距。</p>
        <div class="tip-box"><strong>💡 SEO提示：</strong> 为了获得最佳SEO效果，每页只使用一次<code>&lt;h1&gt;</code>。</div>
      `,
      ko: `
        <h2>제목과 단락</h2>
        <p>제목은 타이틀과 부제목에 사용됩니다. 6개의 레벨이 있습니다: <code>&lt;h1&gt;</code>부터 <code>&lt;h6&gt;</code>까지. <code>&lt;h1&gt;</code>이 가장 크고 중요하며(보통 페이지당 하나), <code>&lt;h6&gt;</code>이 가장 작습니다.</p>
        <h3>예제</h3>
        <pre>&lt;h1&gt;메인 제목&lt;/h1&gt;
&lt;h2&gt;부제목&lt;/h2&gt;
&lt;h3&gt;부부제목&lt;/h3&gt;
&lt;p&gt;이것은 일반 텍스트 단락입니다.&lt;/p&gt;</pre>
        <h3>단락</h3>
        <p><code>&lt;p&gt;</code> 태그는 단락에 사용됩니다. 브라우저는 단락 사이에 자동으로 간격을 추가합니다.</p>
        <div class="tip-box"><strong>💡 SEO 팁:</strong> 최상의 SEO 결과를 위해 페이지당 <code>&lt;h1&gt;</code>을 한 번만 사용하세요.</div>
      `
    },
    starter: '<h1>Judul Besar</h1>\n<h2>Sub Judul</h2>\n<p>Ini paragraf.</p>'
  },
  {
    id: 'html-3',
    title: { id: '3. Link & Gambar', en: '3. Links & Images', ja: '3. リンクと画像', zh: '3. 链接和图片', ko: '3. 링크와 이미지' },
    content: {
      id: `
        <h2>Link & Gambar</h2>
        <h3>Link (Tautan)</h3>
        <p>Tag <code>&lt;a&gt;</code> digunakan untuk membuat link. Atribut <code>href</code> menentukan tujuan.</p>
        <pre>&lt;a href="https://google.com"&gt;Buka Google&lt;/a&gt;
&lt;a href="https://google.com" target="_blank"&gt;Buka di Tab Baru&lt;/a&gt;</pre>
        <h3>Gambar</h3>
        <p>Tag <code>&lt;img&gt;</code> digunakan untuk menampilkan gambar. Atribut <code>src</code> untuk URL gambar, <code>alt</code> untuk teks alternatif.</p>
        <pre>&lt;img src="https://via.placeholder.com/200" alt="Contoh gambar"&gt;</pre>
        <div class="tip-box"><strong>💡 Aksesibilitas:</strong> Selalu isi <code>alt</code> — ini penting untuk pembaca layar dan saat gambar gagal dimuat.</div>
      `,
      en: `
        <h2>Links & Images</h2>
        <h3>Links</h3>
        <p>The <code>&lt;a&gt;</code> tag is used to create links. The <code>href</code> attribute specifies the destination.</p>
        <pre>&lt;a href="https://google.com"&gt;Open Google&lt;/a&gt;
&lt;a href="https://google.com" target="_blank"&gt;Open in New Tab&lt;/a&gt;</pre>
        <h3>Images</h3>
        <p>The <code>&lt;img&gt;</code> tag is used to display images. The <code>src</code> attribute is for the image URL, <code>alt</code> for alternative text.</p>
        <pre>&lt;img src="https://via.placeholder.com/200" alt="Example image"&gt;</pre>
        <div class="tip-box"><strong>💡 Accessibility:</strong> Always fill in <code>alt</code> — it's important for screen readers and when images fail to load.</div>
      `,
      ja: `
        <h2>リンクと画像</h2>
        <h3>リンク</h3>
        <p><code>&lt;a&gt;</code>タグはリンクを作成するために使われます。<code>href</code>属性がリンク先を指定します。</p>
        <pre>&lt;a href="https://google.com"&gt;Googleを開く&lt;/a&gt;
&lt;a href="https://google.com" target="_blank"&gt;新しいタブで開く&lt;/a&gt;</pre>
        <h3>画像</h3>
        <p><code>&lt;img&gt;</code>タグは画像を表示するために使われます。<code>src</code>属性は画像URL、<code>alt</code>は代替テキストです。</p>
        <pre>&lt;img src="https://via.placeholder.com/200" alt="サンプル画像"&gt;</pre>
        <div class="tip-box"><strong>💡 アクセシビリティ：</strong> 常に<code>alt</code>を記入してください。スクリーンリーダーや画像の読み込み失敗時に重要です。</div>
      `,
      zh: `
        <h2>链接和图片</h2>
        <h3>链接</h3>
        <p><code>&lt;a&gt;</code>标签用于创建链接。<code>href</code>属性指定目标。</p>
        <pre>&lt;a href="https://google.com"&gt;打开谷歌&lt;/a&gt;
&lt;a href="https://google.com" target="_blank"&gt;在新标签页打开&lt;/a&gt;</pre>
        <h3>图片</h3>
        <p><code>&lt;img&gt;</code>标签用于显示图片。<code>src</code>属性是图片URL，<code>alt</code>是替代文本。</p>
        <pre>&lt;img src="https://via.placeholder.com/200" alt="示例图片"&gt;</pre>
        <div class="tip-box"><strong>💡 无障碍：</strong> 始终填写<code>alt</code>——这对屏幕阅读器和图片加载失败时很重要。</div>
      `,
      ko: `
        <h2>링크와 이미지</h2>
        <h3>링크</h3>
        <p><code>&lt;a&gt;</code> 태그는 링크를 만드는 데 사용됩니다. <code>href</code> 속성이 목적지를 지정합니다.</p>
        <pre>&lt;a href="https://google.com"&gt;구글 열기&lt;/a&gt;
&lt;a href="https://google.com" target="_blank"&gt;새 탭에서 열기&lt;/a&gt;</pre>
        <h3>이미지</h3>
        <p><code>&lt;img&gt;</code> 태그는 이미지를 표시하는 데 사용됩니다. <code>src</code> 속성은 이미지 URL, <code>alt</code>는 대체 텍스트입니다.</p>
        <pre>&lt;img src="https://via.placeholder.com/200" alt="예제 이미지"&gt;</pre>
        <div class="tip-box"><strong>💡 접근성:</strong> 항상 <code>alt</code>를 채우세요. 화면 읽기 프로그램과 이미지 로드 실패 시 중요합니다.</div>
      `
    },
    starter: '<h2>Website Favorit Saya</h2>\n<a href="https://google.com">Buka Google</a>'
  },
  {
    id: 'html-4',
    title: { id: '4. List (Daftar)', en: '4. Lists', ja: '4. リスト', zh: '4. 列表', ko: '4. 목록' },
    content: {
      id: `
        <h2>List (Daftar)</h2>
        <p>Ada dua jenis list di HTML:</p>
        <h3>1. Unordered List (tidak berurutan)</h3>
        <p>Menggunakan <code>&lt;ul&gt;</code> dengan item <code>&lt;li&gt;</code>. Ditampilkan dengan bullet.</p>
        <pre>&lt;ul&gt;
  &lt;li&gt;Apel&lt;/li&gt;
  &lt;li&gt;Mangga&lt;/li&gt;
  &lt;li&gt;Jeruk&lt;/li&gt;
&lt;/ul&gt;</pre>
        <h3>2. Ordered List (berurutan)</h3>
        <p>Menggunakan <code>&lt;ol&gt;</code>. Ditampilkan dengan angka.</p>
        <pre>&lt;ol&gt;
  &lt;li&gt;Langkah pertama&lt;/li&gt;
  &lt;li&gt;Langkah kedua&lt;/li&gt;
  &lt;li&gt;Langkah ketiga&lt;/li&gt;
&lt;/ol&gt;</pre>
        <div class="tip-box"><strong>💡 Penggunaan:</strong> Pakai <code>&lt;ol&gt;</code> untuk langkah-langkah berurutan (resep, tutorial). Pakai <code>&lt;ul&gt;</code> untuk daftar tanpa urutan khusus.</div>
      `,
      en: `
        <h2>Lists</h2>
        <p>There are two types of lists in HTML:</p>
        <h3>1. Unordered List</h3>
        <p>Uses <code>&lt;ul&gt;</code> with <code>&lt;li&gt;</code> items. Displayed with bullets.</p>
        <pre>&lt;ul&gt;
  &lt;li&gt;Apple&lt;/li&gt;
  &lt;li&gt;Mango&lt;/li&gt;
  &lt;li&gt;Orange&lt;/li&gt;
&lt;/ul&gt;</pre>
        <h3>2. Ordered List</h3>
        <p>Uses <code>&lt;ol&gt;</code>. Displayed with numbers.</p>
        <pre>&lt;ol&gt;
  &lt;li&gt;First step&lt;/li&gt;
  &lt;li&gt;Second step&lt;/li&gt;
  &lt;li&gt;Third step&lt;/li&gt;
&lt;/ol&gt;</pre>
        <div class="tip-box"><strong>💡 Usage:</strong> Use <code>&lt;ol&gt;</code> for sequential steps (recipes, tutorials). Use <code>&lt;ul&gt;</code> for lists without specific order.</div>
      `,
      ja: `
        <h2>リスト</h2>
        <p>HTMLには2種類のリストがあります：</p>
        <h3>1. 順序なしリスト</h3>
        <p><code>&lt;ul&gt;</code>と<code>&lt;li&gt;</code>アイテムを使用。箇条書きで表示されます。</p>
        <pre>&lt;ul&gt;
  &lt;li&gt;りんご&lt;/li&gt;
  &lt;li&gt;マンゴー&lt;/li&gt;
  &lt;li&gt;オレンジ&lt;/li&gt;
&lt;/ul&gt;</pre>
        <h3>2. 順序付きリスト</h3>
        <p><code>&lt;ol&gt;</code>を使用。番号で表示されます。</p>
        <pre>&lt;ol&gt;
  &lt;li&gt;最初のステップ&lt;/li&gt;
  &lt;li&gt;2番目のステップ&lt;/li&gt;
  &lt;li&gt;3番目のステップ&lt;/li&gt;
&lt;/ol&gt;</pre>
        <div class="tip-box"><strong>💡 使い方：</strong> 順序のあるステップ（レシピ、チュートリアル）には<code>&lt;ol&gt;</code>、特定の順序がないリストには<code>&lt;ul&gt;</code>を使います。</div>
      `,
      zh: `
        <h2>列表</h2>
        <p>HTML中有两种列表：</p>
        <h3>1. 无序列表</h3>
        <p>使用<code>&lt;ul&gt;</code>和<code>&lt;li&gt;</code>项目。用项目符号显示。</p>
        <pre>&lt;ul&gt;
  &lt;li&gt;苹果&lt;/li&gt;
  &lt;li&gt;芒果&lt;/li&gt;
  &lt;li&gt;橙子&lt;/li&gt;
&lt;/ul&gt;</pre>
        <h3>2. 有序列表</h3>
        <p>使用<code>&lt;ol&gt;</code>。用数字显示。</p>
        <pre>&lt;ol&gt;
  &lt;li&gt;第一步&lt;/li&gt;
  &lt;li&gt;第二步&lt;/li&gt;
  &lt;li&gt;第三步&lt;/li&gt;
&lt;/ol&gt;</pre>
        <div class="tip-box"><strong>💡 用法：</strong> 对顺序步骤（食谱、教程）使用<code>&lt;ol&gt;</code>。对没有特定顺序的列表使用<code>&lt;ul&gt;</code>。</div>
      `,
      ko: `
        <h2>목록</h2>
        <p>HTML에는 두 가지 유형의 목록이 있습니다:</p>
        <h3>1. 순서 없는 목록</h3>
        <p><code>&lt;ul&gt;</code>과 <code>&lt;li&gt;</code> 항목을 사용합니다. 글머리 기호로 표시됩니다.</p>
        <pre>&lt;ul&gt;
  &lt;li&gt;사과&lt;/li&gt;
  &lt;li&gt;망고&lt;/li&gt;
  &lt;li&gt;오렌지&lt;/li&gt;
&lt;/ul&gt;</pre>
        <h3>2. 순서 있는 목록</h3>
        <p><code>&lt;ol&gt;</code>을 사용합니다. 숫자로 표시됩니다.</p>
        <pre>&lt;ol&gt;
  &lt;li&gt;첫 번째 단계&lt;/li&gt;
  &lt;li&gt;두 번째 단계&lt;/li&gt;
  &lt;li&gt;세 번째 단계&lt;/li&gt;
&lt;/ol&gt;</pre>
        <div class="tip-box"><strong>💡 사용법:</strong> 순차적 단계(레시피, 튜토리얼)에는 <code>&lt;ol&gt;</code>을, 특별한 순서가 없는 목록에는 <code>&lt;ul&gt;</code>을 사용하세요.</div>
      `
    },
    starter: '<h2>Buah Favorit</h2>\n<ul>\n  <li>Apel</li>\n  <li>Mangga</li>\n  <li>Jeruk</li>\n</ul>'
  },
  {
    id: 'html-5',
    title: { id: '5. Form Input', en: '5. Forms', ja: '5. フォーム', zh: '5. 表单', ko: '5. 폼' },
    content: {
      id: `
        <h2>Form Input</h2>
        <p>Form memungkinkan user memasukkan data dan mengirimkannya ke server.</p>
        <h3>Elemen Form Dasar</h3>
        <pre>&lt;form&gt;
  &lt;label&gt;Nama:&lt;/label&gt;
  &lt;input type="text" placeholder="Ketik nama"&gt;
  &lt;br&gt;
  &lt;label&gt;Email:&lt;/label&gt;
  &lt;input type="email" placeholder="email@contoh.com"&gt;
  &lt;br&gt;
  &lt;button&gt;Kirim&lt;/button&gt;
&lt;/form&gt;</pre>
        <h3>Tipe Input</h3>
        <ul>
          <li><code>text</code> — teks biasa</li>
          <li><code>email</code> — validasi email otomatis</li>
          <li><code>password</code> — teks tersembunyi</li>
          <li><code>number</code> — angka saja</li>
          <li><code>checkbox</code> — centang</li>
        </ul>
        <div class="tip-box"><strong>💡 Aksesibilitas:</strong> Selalu pasangkan <code>&lt;label&gt;</code> dengan input untuk aksesibilitas.</div>
      `,
      en: `
        <h2>Forms</h2>
        <p>Forms allow users to input data and send it to a server.</p>
        <h3>Basic Form Elements</h3>
        <pre>&lt;form&gt;
  &lt;label&gt;Name:&lt;/label&gt;
  &lt;input type="text" placeholder="Enter name"&gt;
  &lt;br&gt;
  &lt;label&gt;Email:&lt;/label&gt;
  &lt;input type="email" placeholder="email@example.com"&gt;
  &lt;br&gt;
  &lt;button&gt;Send&lt;/button&gt;
&lt;/form&gt;</pre>
        <h3>Input Types</h3>
        <ul>
          <li><code>text</code> — plain text</li>
          <li><code>email</code> — automatic email validation</li>
          <li><code>password</code> — hidden text</li>
          <li><code>number</code> — numbers only</li>
          <li><code>checkbox</code> — check</li>
        </ul>
        <div class="tip-box"><strong>💡 Accessibility:</strong> Always pair <code>&lt;label&gt;</code> with inputs for accessibility.</div>
      `,
      ja: `
        <h2>フォーム</h2>
        <p>フォームはユーザーがデータを入力し、サーバーに送信できるようにします。</p>
        <h3>基本的なフォーム要素</h3>
        <pre>&lt;form&gt;
  &lt;label&gt;名前:&lt;/label&gt;
  &lt;input type="text" placeholder="名前を入力"&gt;
  &lt;br&gt;
  &lt;label&gt;メール:&lt;/label&gt;
  &lt;input type="email" placeholder="email@example.com"&gt;
  &lt;br&gt;
  &lt;button&gt;送信&lt;/button&gt;
&lt;/form&gt;</pre>
        <h3>入力タイプ</h3>
        <ul>
          <li><code>text</code> — プレーンテキスト</li>
          <li><code>email</code> — 自動メール検証</li>
          <li><code>password</code> — 非表示テキスト</li>
          <li><code>number</code> — 数字のみ</li>
          <li><code>checkbox</code> — チェック</li>
        </ul>
        <div class="tip-box"><strong>💡 アクセシビリティ：</strong> アクセシビリティのために常に<code>&lt;label&gt;</code>を入力とペアにしてください。</div>
      `,
      zh: `
        <h2>表单</h2>
        <p>表单允许用户输入数据并发送到服务器。</p>
        <h3>基本表单元素</h3>
        <pre>&lt;form&gt;
  &lt;label&gt;姓名:&lt;/label&gt;
  &lt;input type="text" placeholder="输入姓名"&gt;
  &lt;br&gt;
  &lt;label&gt;邮箱:&lt;/label&gt;
  &lt;input type="email" placeholder="email@example.com"&gt;
  &lt;br&gt;
  &lt;button&gt;发送&lt;/button&gt;
&lt;/form&gt;</pre>
        <h3>输入类型</h3>
        <ul>
          <li><code>text</code> — 纯文本</li>
          <li><code>email</code> — 自动邮箱验证</li>
          <li><code>password</code> — 隐藏文本</li>
          <li><code>number</code> — 仅数字</li>
          <li><code>checkbox</code> — 勾选</li>
        </ul>
        <div class="tip-box"><strong>💡 无障碍：</strong> 为了无障碍性，始终将<code>&lt;label&gt;</code>与输入配对。</div>
      `,
      ko: `
        <h2>폼</h2>
        <p>폼을 통해 사용자는 데이터를 입력하고 서버로 보낼 수 있습니다.</p>
        <h3>기본 폼 요소</h3>
        <pre>&lt;form&gt;
  &lt;label&gt;이름:&lt;/label&gt;
  &lt;input type="text" placeholder="이름 입력"&gt;
  &lt;br&gt;
  &lt;label&gt;이메일:&lt;/label&gt;
  &lt;input type="email" placeholder="email@example.com"&gt;
  &lt;br&gt;
  &lt;button&gt;보내기&lt;/button&gt;
&lt;/form&gt;</pre>
        <h3>입력 유형</h3>
        <ul>
          <li><code>text</code> — 일반 텍스트</li>
          <li><code>email</code> — 자동 이메일 검증</li>
          <li><code>password</code> — 숨겨진 텍스트</li>
          <li><code>number</code> — 숫자만</li>
          <li><code>checkbox</code> — 체크</li>
        </ul>
        <div class="tip-box"><strong>💡 접근성:</strong> 접근성을 위해 항상 <code>&lt;label&gt;</code>을 입력과 쌍으로 사용하세요.</div>
      `
    },
    starter: '<h2>Form Sederhana</h2>\n<label>Nama:</label>\n<input type="text" placeholder="Ketik nama">\n<button>Kirim</button>'
  },
  {
    id: 'html-6',
    title: { id: '6. Div & Span', en: '6. Div & Span', ja: '6. DivとSpan', zh: '6. Div和Span', ko: '6. Div와 Span' },
    content: {
      id: `
        <h2>Div & Span</h2>
        <p><code>&lt;div&gt;</code> dan <code>&lt;span&gt;</code> adalah elemen container yang tidak memiliki makna semantik. Keduanya digunakan untuk mengelompokkan konten agar mudah diatur dengan CSS atau JavaScript.</p>
        <h3>Perbedaan</h3>
        <ul>
          <li><code>&lt;div&gt;</code> — block-level, mengambil satu baris penuh</li>
          <li><code>&lt;span&gt;</code> — inline, hanya selebar kontennya</li>
        </ul>
        <pre>&lt;div style="background: lightblue; padding: 10px;"&gt;
  &lt;p&gt;Ini paragraf di dalam div.&lt;/p&gt;
  &lt;p&gt;Teks &lt;span style="color: red;"&gt;berwarna merah&lt;/span&gt; di tengah.&lt;/p&gt;
&lt;/div&gt;</pre>
        <div class="tip-box"><strong>💡 Semantik:</strong> Kalau bisa pakai tag semantik seperti <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, gunakan itu daripada <code>&lt;div&gt;</code>.</div>
      `,
      en: `
        <h2>Div & Span</h2>
        <p><code>&lt;div&gt;</code> and <code>&lt;span&gt;</code> are container elements with no semantic meaning. Both are used to group content for easy styling with CSS or manipulation with JavaScript.</p>
        <h3>Differences</h3>
        <ul>
          <li><code>&lt;div&gt;</code> — block-level, takes a full line</li>
          <li><code>&lt;span&gt;</code> — inline, only as wide as its content</li>
        </ul>
        <pre>&lt;div style="background: lightblue; padding: 10px;"&gt;
  &lt;p&gt;This is a paragraph inside a div.&lt;/p&gt;
  &lt;p&gt;Text with &lt;span style="color: red;"&gt;red color&lt;/span&gt; in the middle.&lt;/p&gt;
&lt;/div&gt;</pre>
        <div class="tip-box"><strong>💡 Semantics:</strong> If you can use semantic tags like <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, use those instead of <code>&lt;div&gt;</code>.</div>
      `,
      ja: `
        <h2>DivとSpan</h2>
        <p><code>&lt;div&gt;</code>と<code>&lt;span&gt;</code>は意味を持たないコンテナ要素です。どちらもCSSでのスタイリングやJavaScriptでの操作を容易にするためにコンテンツをグループ化するために使われます。</p>
        <h3>違い</h3>
        <ul>
          <li><code>&lt;div&gt;</code> — ブロックレベル、1行全体を占める</li>
          <li><code>&lt;span&gt;</code> — インライン、コンテンツの幅だけ</li>
        </ul>
        <pre>&lt;div style="background: lightblue; padding: 10px;"&gt;
  &lt;p&gt;これはdiv内の段落です。&lt;/p&gt;
  &lt;p&gt;途中に&lt;span style="color: red;"&gt;赤い色&lt;/span&gt;のテキスト。&lt;/p&gt;
&lt;/div&gt;</pre>
        <div class="tip-box"><strong>💡 セマンティクス：</strong> <code>&lt;header&gt;</code>、<code>&lt;nav&gt;</code>、<code>&lt;section&gt;</code>などのセマンティックタグが使える場合は、<code>&lt;div&gt;</code>の代わりにそれらを使ってください。</div>
      `,
      zh: `
        <h2>Div和Span</h2>
        <p><code>&lt;div&gt;</code>和<code>&lt;span&gt;</code>是没有语义含义的容器元素。两者都用于对内容进行分组，以便用CSS轻松样式化或用JavaScript操作。</p>
        <h3>区别</h3>
        <ul>
          <li><code>&lt;div&gt;</code> — 块级，占据一整行</li>
          <li><code>&lt;span&gt;</code> — 行内，只有内容宽度</li>
        </ul>
        <pre>&lt;div style="background: lightblue; padding: 10px;"&gt;
  &lt;p&gt;这是div内的段落。&lt;/p&gt;
  &lt;p&gt;中间有&lt;span style="color: red;"&gt;红色&lt;/span&gt;的文本。&lt;/p&gt;
&lt;/div&gt;</pre>
        <div class="tip-box"><strong>💡 语义：</strong> 如果可以使用<code>&lt;header&gt;</code>、<code>&lt;nav&gt;</code>、<code>&lt;section&gt;</code>等语义标签，请使用它们而不是<code>&lt;div&gt;</code>。</div>
      `,
      ko: `
        <h2>Div와 Span</h2>
        <p><code>&lt;div&gt;</code>와 <code>&lt;span&gt;</code>은 의미가 없는 컨테이너 요소입니다. 둘 다 CSS로 스타일링하거나 JavaScript로 조작하기 쉽도록 콘텐츠를 그룹화하는 데 사용됩니다.</p>
        <h3>차이점</h3>
        <ul>
          <li><code>&lt;div&gt;</code> — 블록 레벨, 전체 줄을 차지함</li>
          <li><code>&lt;span&gt;</code> — 인라인, 콘텐츠 너비만큼만</li>
        </ul>
        <pre>&lt;div style="background: lightblue; padding: 10px;"&gt;
  &lt;p&gt;이것은 div 내부의 단락입니다.&lt;/p&gt;
  &lt;p&gt;중간에 &lt;span style="color: red;"&gt;빨간색&lt;/span&gt; 텍스트.&lt;/p&gt;
&lt;/div&gt;</pre>
        <div class="tip-box"><strong>💡 시맨틱:</strong> <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>과 같은 시맨틱 태그를 사용할 수 있다면 <code>&lt;div&gt;</code> 대신 사용하세요.</div>
      `
    },
    starter: '<div style="background: lightblue; padding: 10px;">\n  <p>Ini paragraf di dalam div.</p>\n  <p>Teks <span style="color: red;">berwarna merah</span> di tengah.</p>\n</div>'
  },
  {
    id: 'html-7',
    title: { id: '7. Tabel', en: '7. Tables', ja: '7. テーブル', zh: '7. 表格', ko: '7. 테이블' },
    content: {
      id: `
        <h2>Tabel</h2>
        <p>Tabel digunakan untuk menampilkan data tabular (baris dan kolom).</p>
        <h3>Struktur Tabel</h3>
        <pre>&lt;table border="1"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Nama&lt;/th&gt;
      &lt;th&gt;Umur&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Budi&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Siti&lt;/td&gt;
      &lt;td&gt;23&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
        <ul>
          <li><code>&lt;table&gt;</code> — tabel</li>
          <li><code>&lt;thead&gt;</code> — header tabel</li>
          <li><code>&lt;tbody&gt;</code> — isi tabel</li>
          <li><code>&lt;tr&gt;</code> — baris</li>
          <li><code>&lt;th&gt;</code> — sel header (tebal)</li>
          <li><code>&lt;td&gt;</code> — sel data</li>
        </ul>
        <div class="tip-box"><strong>💡 Catatan:</strong> Jangan gunakan tabel untuk layout halaman — gunakan CSS Grid atau Flexbox. Tabel hanya untuk data tabular.</div>
      `,
      en: `
        <h2>Tables</h2>
        <p>Tables are used to display tabular data (rows and columns).</p>
        <h3>Table Structure</h3>
        <pre>&lt;table border="1"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Age&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;John&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Jane&lt;/td&gt;
      &lt;td&gt;23&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
        <ul>
          <li><code>&lt;table&gt;</code> — table</li>
          <li><code>&lt;thead&gt;</code> — table header</li>
          <li><code>&lt;tbody&gt;</code> — table body</li>
          <li><code>&lt;tr&gt;</code> — row</li>
          <li><code>&lt;th&gt;</code> — header cell (bold)</li>
          <li><code>&lt;td&gt;</code> — data cell</li>
        </ul>
        <div class="tip-box"><strong>💡 Note:</strong> Don't use tables for page layout — use CSS Grid or Flexbox. Tables are only for tabular data.</div>
      `,
      ja: `
        <h2>テーブル</h2>
        <p>テーブルは表形式のデータ（行と列）を表示するために使われます。</p>
        <h3>テーブル構造</h3>
        <pre>&lt;table border="1"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;名前&lt;/th&gt;
      &lt;th&gt;年齢&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;太郎&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;花子&lt;/td&gt;
      &lt;td&gt;23&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
        <ul>
          <li><code>&lt;table&gt;</code> — テーブル</li>
          <li><code>&lt;thead&gt;</code> — テーブルヘッダー</li>
          <li><code>&lt;tbody&gt;</code> — テーブル本体</li>
          <li><code>&lt;tr&gt;</code> — 行</li>
          <li><code>&lt;th&gt;</code> — ヘッダーセル（太字）</li>
          <li><code>&lt;td&gt;</code> — データセル</li>
        </ul>
        <div class="tip-box"><strong>💡 注意：</strong> ページレイアウトにテーブルを使わないでください。CSS GridかFlexboxを使ってください。テーブルは表形式のデータ専用です。</div>
      `,
      zh: `
        <h2>表格</h2>
        <p>表格用于显示表格数据（行和列）。</p>
        <h3>表格结构</h3>
        <pre>&lt;table border="1"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;姓名&lt;/th&gt;
      &lt;th&gt;年龄&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;小明&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;小红&lt;/td&gt;
      &lt;td&gt;23&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
        <ul>
          <li><code>&lt;table&gt;</code> — 表格</li>
          <li><code>&lt;thead&gt;</code> — 表格头部</li>
          <li><code>&lt;tbody&gt;</code> — 表格主体</li>
          <li><code>&lt;tr&gt;</code> — 行</li>
          <li><code>&lt;th&gt;</code> — 表头单元格（粗体）</li>
          <li><code>&lt;td&gt;</code> — 数据单元格</li>
        </ul>
        <div class="tip-box"><strong>💡 注意：</strong> 不要用表格做页面布局——使用CSS Grid或Flexbox。表格只用于表格数据。</div>
      `,
      ko: `
        <h2>테이블</h2>
        <p>테이블은 표 형식 데이터(행과 열)를 표시하는 데 사용됩니다.</p>
        <h3>테이블 구조</h3>
        <pre>&lt;table border="1"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;이름&lt;/th&gt;
      &lt;th&gt;나이&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;철수&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;영희&lt;/td&gt;
      &lt;td&gt;23&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
        <ul>
          <li><code>&lt;table&gt;</code> — 테이블</li>
          <li><code>&lt;thead&gt;</code> — 테이블 헤더</li>
          <li><code>&lt;tbody&gt;</code> — 테이블 본문</li>
          <li><code>&lt;tr&gt;</code> — 행</li>
          <li><code>&lt;th&gt;</code> — 헤더 셀(굵게)</li>
          <li><code>&lt;td&gt;</code> — 데이터 셀</li>
        </ul>
        <div class="tip-box"><strong>💡 참고:</strong> 페이지 레이아웃에 테이블을 사용하지 마세요. CSS Grid나 Flexbox를 사용하세요. 테이블은 표 형식 데이터에만 사용합니다.</div>
      `
    },
    starter: '<h2>Daftar Siswa</h2>\n<table border="1" style="border-collapse: collapse;">\n  <tr><th>Nama</th><th>Umur</th></tr>\n  <tr><td>Budi</td><td>25</td></tr>\n  <tr><td>Siti</td><td>23</td></tr>\n</table>'
  },
  {
    id: 'html-8',
    title: { id: '8. Semantic HTML', en: '8. Semantic HTML', ja: '8. セマンティックHTML', zh: '8. 语义化HTML', ko: '8. 시맨틱 HTML' },
    content: {
      id: `
        <h2>Semantic HTML</h2>
        <p>Tag semantik memberi <strong>makna</strong> pada struktur halaman. Browser dan mesin pencari bisa memahami bagian mana yang header, navigasi, konten utama, dll.</p>
        <h3>Tag Semantik Umum</h3>
        <ul>
          <li><code>&lt;header&gt;</code> — bagian atas halaman</li>
          <li><code>&lt;nav&gt;</code> — navigasi/menu</li>
          <li><code>&lt;main&gt;</code> — konten utama</li>
          <li><code>&lt;section&gt;</code> — bagian konten</li>
          <li><code>&lt;article&gt;</code> — artikel mandiri</li>
          <li><code>&lt;aside&gt;</code> — sidebar/konten samping</li>
          <li><code>&lt;footer&gt;</code> — bagian bawah</li>
        </ul>
        <h3>Contoh</h3>
        <pre>&lt;header&gt;
  &lt;h1&gt;Website Saya&lt;/h1&gt;
  &lt;nav&gt;
    &lt;a href="/"&gt;Home&lt;/a&gt;
    &lt;a href="/about"&gt;About&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;Judul Artikel&lt;/h2&gt;
    &lt;p&gt;Isi artikel...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;
  &lt;p&gt;&copy; 2025&lt;/p&gt;
&lt;/footer&gt;</pre>
        <div class="tip-box"><strong>💡 Manfaat:</strong> SEO lebih baik, aksesibilitas meningkat, kode lebih mudah dibaca dan dipelihara.</div>
      `,
      en: `
        <h2>Semantic HTML</h2>
        <p>Semantic tags give <strong>meaning</strong> to the page structure. Browsers and search engines can understand which part is the header, navigation, main content, etc.</p>
        <h3>Common Semantic Tags</h3>
        <ul>
          <li><code>&lt;header&gt;</code> — top of page</li>
          <li><code>&lt;nav&gt;</code> — navigation/menu</li>
          <li><code>&lt;main&gt;</code> — main content</li>
          <li><code>&lt;section&gt;</code> — content section</li>
          <li><code>&lt;article&gt;</code> — standalone article</li>
          <li><code>&lt;aside&gt;</code> — sidebar/side content</li>
          <li><code>&lt;footer&gt;</code> — bottom part</li>
        </ul>
        <h3>Example</h3>
        <pre>&lt;header&gt;
  &lt;h1&gt;My Website&lt;/h1&gt;
  &lt;nav&gt;
    &lt;a href="/"&gt;Home&lt;/a&gt;
    &lt;a href="/about"&gt;About&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;Article Title&lt;/h2&gt;
    &lt;p&gt;Article content...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;
  &lt;p&gt;&copy; 2025&lt;/p&gt;
&lt;/footer&gt;</pre>
        <div class="tip-box"><strong>💡 Benefits:</strong> Better SEO, improved accessibility, more readable and maintainable code.</div>
      `,
      ja: `
        <h2>セマンティックHTML</h2>
        <p>セマンティックタグはページ構造に<strong>意味</strong>を与えます。ブラウザと検索エンジンは、どの部分がヘッダー、ナビゲーション、メインコンテンツなどを理解できます。</p>
        <h3>一般的なセマンティックタグ</h3>
        <ul>
          <li><code>&lt;header&gt;</code> — ページ上部</li>
          <li><code>&lt;nav&gt;</code> — ナビゲーション/メニュー</li>
          <li><code>&lt;main&gt;</code> — メインコンテンツ</li>
          <li><code>&lt;section&gt;</code> — コンテンツセクション</li>
          <li><code>&lt;article&gt;</code> — 独立した記事</li>
          <li><code>&lt;aside&gt;</code> — サイドバー/サイドコンテンツ</li>
          <li><code>&lt;footer&gt;</code> — 下部</li>
        </ul>
        <h3>例</h3>
        <pre>&lt;header&gt;
  &lt;h1&gt;私のウェブサイト&lt;/h1&gt;
  &lt;nav&gt;
    &lt;a href="/"&gt;ホーム&lt;/a&gt;
    &lt;a href="/about"&gt;概要&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;記事タイトル&lt;/h2&gt;
    &lt;p&gt;記事の内容...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;
  &lt;p&gt;&copy; 2025&lt;/p&gt;
&lt;/footer&gt;</pre>
        <div class="tip-box"><strong>💡 利点：</strong> SEOが向上し、アクセシビリティが向上し、コードが読みやすく保守しやすくなります。</div>
      `,
      zh: `
        <h2>语义化HTML</h2>
        <p>语义标签为页面结构赋予<strong>含义</strong>。浏览器和搜索引擎可以理解哪部分是页眉、导航、主要内容等。</p>
        <h3>常用语义标签</h3>
        <ul>
          <li><code>&lt;header&gt;</code> — 页面顶部</li>
          <li><code>&lt;nav&gt;</code> — 导航/菜单</li>
          <li><code>&lt;main&gt;</code> — 主要内容</li>
          <li><code>&lt;section&gt;</code> — 内容部分</li>
          <li><code>&lt;article&gt;</code> — 独立文章</li>
          <li><code>&lt;aside&gt;</code> — 侧边栏/侧边内容</li>
          <li><code>&lt;footer&gt;</code> — 底部</li>
        </ul>
        <h3>示例</h3>
        <pre>&lt;header&gt;
  &lt;h1&gt;我的网站&lt;/h1&gt;
  &lt;nav&gt;
    &lt;a href="/"&gt;首页&lt;/a&gt;
    &lt;a href="/about"&gt;关于&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;文章标题&lt;/h2&gt;
    &lt;p&gt;文章内容...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;
  &lt;p&gt;&copy; 2025&lt;/p&gt;
&lt;/footer&gt;</pre>
        <div class="tip-box"><strong>💡 好处：</strong> SEO更好、无障碍性提高、代码更易读易维护。</div>
      `,
      ko: `
        <h2>시맨틱 HTML</h2>
        <p>시맨틱 태그는 페이지 구조에 <strong>의미</strong>를 부여합니다. 브라우저와 검색 엔진은 어느 부분이 헤더, 내비게이션, 메인 콘텐츠인지 이해할 수 있습니다.</p>
        <h3>일반적인 시맨틱 태그</h3>
        <ul>
          <li><code>&lt;header&gt;</code> — 페이지 상단</li>
          <li><code>&lt;nav&gt;</code> — 내비게이션/메뉴</li>
          <li><code>&lt;main&gt;</code> — 메인 콘텐츠</li>
          <li><code>&lt;section&gt;</code> — 콘텐츠 섹션</li>
          <li><code>&lt;article&gt;</code> — 독립 기사</li>
          <li><code>&lt;aside&gt;</code> — 사이드바/사이드 콘텐츠</li>
          <li><code>&lt;footer&gt;</code> — 하단</li>
        </ul>
        <h3>예제</h3>
        <pre>&lt;header&gt;
  &lt;h1&gt;내 웹사이트&lt;/h1&gt;
  &lt;nav&gt;
    &lt;a href="/"&gt;홈&lt;/a&gt;
    &lt;a href="/about"&gt;소개&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;기사 제목&lt;/h2&gt;
    &lt;p&gt;기사 내용...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;
  &lt;p&gt;&copy; 2025&lt;/p&gt;
&lt;/footer&gt;</pre>
        <div class="tip-box"><strong>💡 이점:</strong> SEO 향상, 접근성 개선, 더 읽기 쉽고 유지보수하기 쉬운 코드.</div>
      `
    },
    starter: '<header style="background:#f0f0f0;padding:15px;">\n  <h1>Website Saya</h1>\n  <nav>\n    <a href="#">Home</a> |\n    <a href="#">About</a>\n  </nav>\n</header>\n<main style="padding:15px;">\n  <h2>Selamat Datang</h2>\n  <p>Ini konten utama.</p>\n</main>\n<footer style="background:#333;color:#fff;padding:10px;text-align:center;">\n  &copy; 2025 ZimzzCode\n</footer>'
  }
];

let sb = null;
let currentUser = null;
let completedLessons = new Set();
let currentLessonId = null;

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

// ============================================
// USER
// ============================================
async function loadUser() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { window.location.href = 'login.html'; return; }
  currentUser = session.user;
  const name = currentUser.user_metadata?.full_name
    || currentUser.user_metadata?.name
    || currentUser.user_metadata?.user_name
    || currentUser.email?.split('@')[0]
    || 'Siswa';
  const el = document.getElementById('userName');
  if (el) el.textContent = `👤 ${name}`;
}

// ============================================
// PROGRESS
// ============================================
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
// LANGUAGE
// ============================================
function changeLanguage(lang) {
  currentLang = lang;
  renderLessonList();
  if (currentLessonId) openLesson(currentLessonId);
}

function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.id[key] || key;
}

function getText(obj) {
  if (typeof obj === 'string') return obj;
  return obj[currentLang] || obj.id;
}

// ============================================
// RENDER LIST
// ============================================
function renderLessonList() {
  const list = document.getElementById('lessonList');
  if (!list) return;
  list.innerHTML = LESSONS.map(l => `
    <li class="lesson-item ${completedLessons.has(l.id) ? 'completed' : ''}" 
        data-id="${l.id}" onclick="openLesson('${l.id}')">
      <span class="lesson-check">${completedLessons.has(l.id) ? '✅' : '⬜'}</span>
      <span>${getText(l.title)}</span>
    </li>
  `).join('');
}

// ============================================
// OPEN LESSON
// ============================================
function openLesson(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  currentLessonId = lessonId;

  document.querySelectorAll('.lesson-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === lessonId);
  });

  const isCompleted = completedLessons.has(lessonId);
  const container = document.getElementById('lessonContent');
  container.innerHTML = `
    <div class="lesson-header">
      <h1>${getText(lesson.title)}</h1>
      ${isCompleted 
        ? `<span class="badge-done">${t('completed')}</span>` 
        : `<span class="badge-todo">${t('notCompleted')}</span>`}
    </div>
    <div class="lesson-text">${getText(lesson.content)}</div>

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
}

// ============================================
// PLAYGROUND
// ============================================
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
  if (!lesson) return;
  const input = document.getElementById('codeInput');
  if (input) {
    input.value = lesson.starter;
    runPreview();
  }
}

// ============================================
// MARK COMPLETE
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

  if (error) { alert('Gagal simpan progress: ' + error.message); return; }

  completedLessons.add(lessonId);
  updateProgressUI();
  renderLessonList();
  openLesson(lessonId);
}

// ============================================
// EXPOSE GLOBAL
// ============================================
window.openLesson = openLesson;
window.runPreview = runPreview;
window.resetCode = resetCode;
window.markComplete = markComplete;
window.changeLanguage = changeLanguage;
