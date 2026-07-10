'use strict';

/* ══════════════════════════════════════════════════════════
   ADMIN DASHBOARD — Main JavaScript
   All edits save to localStorage under key 'birthdayData'
   The main site (app.js) reads from the same key.
   ══════════════════════════════════════════════════════════ */

/* ─── STORAGE KEY ─── */
const STORAGE_KEY = 'birthdayData';
const PASS_KEY    = 'adminPassword';
const DEFAULT_PASS = 'birthday';

/* ─── DEFAULT DATA (mirrors app.js DATA object) ─── */
const DEFAULTS = {
  hero: {
    title:    'Happy Birthday ❤️',
    subtitle: 'I wanted to build something instead of buying something.',
    btnText:  'Begin the Adventure →',
    badge:    '🎂 Today is Special'
  },
  timeline: [
    { icon: '✨', title: 'The Day We Met',          chapter: 'Chapter 1', body: 'It started the way all great stories do — completely unexpectedly. One moment everything was ordinary, and the next moment, there you were. The universe has a funny way of doing that.' },
    { icon: '😂', title: 'Our First Funny Moment',  chapter: 'Chapter 2', body: 'I honestly can\'t remember what started the laughing, but I remember not being able to stop. That\'s when I realized — you make the ordinary hilarious. Every single time.' },
    { icon: '😅', title: 'Our First Fight',         chapter: 'Chapter 3', body: 'We disagreed. Loudly. About something that definitely seemed very important at the time. Looking back? I can barely remember what it was. But I do remember we figured it out.' },
    { icon: '❤️', title: 'My Favorite Memory',     chapter: 'Chapter 4', body: 'If I had to pick just one moment to keep forever, it would be this one. No fancy setting. No big occasion. Just you, exactly as you are. That was enough. That was everything.' },
    { icon: '🎂', title: 'Today',                   chapter: 'Chapter 5 — Right Now', body: 'Today you\'re another year older, another year wiser, and somehow even more wonderful than yesterday. I built this entire website just to remind you of that. Happy Birthday. ❤️' }
  ],
  quiz: [
    { q: 'Who gets angry first?',              options: ['You', 'Definitely You', '100% You'] },
    { q: 'Who takes longer to get ready?',     options: ['Obviously You', 'You (no contest)', 'You, but make it glamorous'] },
    { q: 'Who apologizes last?',               options: ['You, eventually', 'Still You', 'You (but gracefully)'] },
    { q: 'Who is the funnier one?',            options: ['Objectively You', 'You, always', 'Is this even a question? You.'] },
    { q: 'Who has better taste in everything?',options: ['Clearly You', 'You (obviously)', 'You, and everyone knows it'] },
    { q: 'Who deserves the best birthday ever?',options: ['YOU ❤️', 'YOU!! ❤️❤️', 'YOU (obviously, duh) ❤️❤️❤️'] }
  ],
  reasons: [
    { icon: '😊', label: 'Your smile',           detail: 'The kind that lights up a room before you even say a word.' },
    { icon: '😂', label: 'Your laugh',            detail: 'Infectious, unfiltered, and absolutely my favorite sound.' },
    { icon: '💛', label: 'Your kindness',         detail: 'You give it freely and never keep score. Rare.' },
    { icon: '🧘', label: 'Your patience',         detail: 'Especially with me. That alone earns you a medal.' },
    { icon: '✨', label: 'Your confidence',       detail: 'Even when you don\'t feel it, it shows. Trust me.' },
    { icon: '👀', label: 'Your beautiful eyes',   detail: 'They say everything you\'re thinking. All of it.' },
    { icon: '🤝', label: 'Your support',          detail: 'You show up. Quietly, consistently, without being asked.' },
    { icon: '🤭', label: 'Your cute expressions', detail: 'I could watch your face all day and never get bored.' },
    { icon: '🧠', label: 'Your intelligence',     detail: 'Sharp, thoughtful, and always five steps ahead.' },
    { icon: '💪', label: 'Your strength',         detail: 'You\'ve handled things that would have broken most people.' },
    { icon: '🎶', label: 'Your taste',            detail: 'In music, in food, in people — you just know.' },
    { icon: '🌙', label: 'Your depth',            detail: 'There\'s more to you than most people will ever get to see.' },
    { icon: '🐾', label: 'Your soft side',        detail: 'Hidden from most, but I know it\'s there. And I love it.' },
    { icon: '🌸', label: 'Your presence',         detail: 'Every room is just better when you\'re in it.' },
    { icon: '🎯', label: 'Your focus',            detail: 'When you want something, you go after it. No half-measures.' },
    { icon: '🌈', label: 'Your optimism',         detail: 'You find the silver lining even when it\'s raining hard.' },
    { icon: '🍕', label: 'Your food opinions',    detail: 'Strongly held. Never wrong. (Mostly.)' },
    { icon: '📖', label: 'Your curiosity',        detail: 'You ask the questions most people are too afraid to ask.' },
    { icon: '🎁', label: 'The way you care',      detail: 'Little things. Big things. You notice everything that matters.' },
    { icon: '🌟', label: 'Just you',              detail: 'Entirely and completely. Exactly as you are. Always.' }
  ],
  gallery: [
    { src: null, caption: 'The beginning ✨',         icon: '📷', bg: '#fff0f5' },
    { src: null, caption: 'That one perfect day 🌸', icon: '🌸', bg: '#f5f0ff' },
    { src: null, caption: 'Couldn\'t stop laughing 😂', icon: '😂', bg: '#fff8f0' },
    { src: null, caption: 'Our favorite place 🗺️',   icon: '🗺️', bg: '#f0fff5' },
    { src: null, caption: 'Spontaneous adventure 🎢', icon: '🎢', bg: '#fff0ff' },
    { src: null, caption: 'The quiet moments ☕',     icon: '☕', bg: '#fffbf0' },
    { src: null, caption: 'Best decision ever 💛',    icon: '💛', bg: '#f5fff0' },
    { src: null, caption: 'This one\'s my favorite ❤️', icon: '❤️', bg: '#fff0f5' }
  ],
  letter: [
    'To the most wonderful person I know,',
    'Today is your day. Not just a date on a calendar, but a moment the universe decided you were needed here. And honestly? Best decision it ever made.',
    'I\'ve been trying to think of something to say that\'s as meaningful as you are to me. I thought about a big gesture — flowers, a cake, something wrapped with a bow. But none of that felt like enough.',
    'So I built this instead. Every section, every animation, every little heart floating up the screen — that\'s me, trying to translate something that words alone can\'t fully hold.',
    'You make life softer. Funnier. Warmer. You make ordinary Tuesday evenings feel like something worth remembering. And on your birthday of all days, I just want you to know that — clearly, completely, without a single doubt.',
    'You are loved. You are valued. You are the kind of person that makes the world measurably better just by existing in it.',
    'Happy Birthday. Thank you for being you. ❤️'
  ],
  letterSignature: 'Someone who really means it ❤️',
  footer: {
    name: 'Someone Who Wanted to Make You Smile',
    sub:  'Happy Birthday. You deserve every bit of this. 🎂'
  }
};

/* ══════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════ */
let currentData = {};    /* working copy — saved to localStorage on Save */
let isDirty     = false; /* unsaved changes flag */

/* ══════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════ */

/** Deep-merge b into a (non-destructive) */
function deepMerge(a, b) {
  const out = { ...a };
  for (const key of Object.keys(b)) {
    if (Array.isArray(b[key])) {
      out[key] = b[key];
    } else if (b[key] && typeof b[key] === 'object') {
      out[key] = deepMerge(a[key] || {}, b[key]);
    } else {
      out[key] = b[key];
    }
  }
  return out;
}

/** Load saved data from localStorage, merge with defaults */
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : {};
    currentData = deepMerge(JSON.parse(JSON.stringify(DEFAULTS)), saved);
  } catch (e) {
    currentData = JSON.parse(JSON.stringify(DEFAULTS));
  }
}

/** Persist currentData to localStorage */
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
  isDirty = false;
  document.getElementById('unsaved-badge').classList.add('hidden');
  showToast('✅ All changes saved!', 'success');
}

/** Mark dirty (unsaved changes) */
function markDirty() {
  if (!isDirty) {
    isDirty = true;
    document.getElementById('unsaved-badge').classList.remove('hidden');
  }
}

/** Show toast message */
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.add('hidden'), 2800);
}

/* ══════════════════════════════════════════════
   PASSWORD GATE
   ══════════════════════════════════════════════ */
(function initGate() {
  const gate    = document.getElementById('gate');
  const admin   = document.getElementById('admin');
  const input   = document.getElementById('gate-input');
  const btn     = document.getElementById('gate-btn');
  const errEl   = document.getElementById('gate-error');

  function tryUnlock() {
    const pass = localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
    if (input.value === pass) {
      gate.classList.add('hidden');
      admin.classList.remove('hidden');
      initAdmin();
    } else {
      errEl.classList.remove('hidden');
      input.value = '';
      input.focus();
      setTimeout(() => errEl.classList.add('hidden'), 2500);
    }
  }

  btn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryUnlock(); });
  input.focus();
})();

/* ══════════════════════════════════════════════
   ADMIN INIT — runs after unlock
   ══════════════════════════════════════════════ */
function initAdmin() {
  loadData();

  initSidebar();
  initTopbar();

  renderHero();
  renderTimeline();
  renderQuiz();
  renderReasons();
  renderGallery();
  renderLetter();
  renderFooter();

  initSettings();

  /* Warn on page leave if unsaved */
  window.addEventListener('beforeunload', (e) => {
    if (isDirty) { e.preventDefault(); e.returnValue = ''; }
  });
}

/* ══════════════════════════════════════════════
   SIDEBAR & NAVIGATION
   ══════════════════════════════════════════════ */
function initSidebar() {
  const items    = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.editor-section');
  const titles   = {
    hero: 'Hero Section', timeline: 'Timeline Cards', quiz: 'Quiz Questions',
    reasons: '20 Reasons', gallery: 'Gallery', letter: 'Love Letter',
    footer: 'Footer', settings: 'Settings'
  };

  items.forEach(item => {
    item.addEventListener('click', () => {
      const sec = item.dataset.section;
      items.forEach(i => i.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      item.classList.add('active');
      document.getElementById(`section-${sec}`).classList.add('active');
      document.getElementById('topbar-title').textContent = titles[sec];
      /* Close mobile sidebar */
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  /* Mobile toggle */
  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

/* ══════════════════════════════════════════════
   TOPBAR ACTIONS
   ══════════════════════════════════════════════ */
function initTopbar() {
  /* Save */
  document.getElementById('btn-save').addEventListener('click', () => {
    collectAll();
    saveData();
  });

  /* Export JSON */
  document.getElementById('btn-export').addEventListener('click', () => {
    collectAll();
    const blob = new Blob([JSON.stringify(currentData, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'birthday-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📦 JSON exported!', 'success');
  });

  /* Import JSON */
  document.getElementById('import-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        currentData = deepMerge(JSON.parse(JSON.stringify(DEFAULTS)), imported);
        /* Re-render all sections */
        renderHero(); renderTimeline(); renderQuiz();
        renderReasons(); renderGallery(); renderLetter(); renderFooter();
        markDirty();
        showToast('✅ Data imported! Review and save.', 'success');
      } catch {
        showToast('❌ Invalid JSON file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; /* reset so same file can be re-imported */
  });
}

/* ══════════════════════════════════════════════
   COLLECT ALL — reads DOM fields into currentData
   ══════════════════════════════════════════════ */
function collectAll() {
  collectHero();
  collectTimeline();
  collectQuiz();
  collectReasons();
  collectGallery(); /* gallery already updates currentData.gallery directly */
  collectLetter();
  collectFooter();
}

/* ══════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════ */
function renderHero() {
  const d = currentData.hero;
  setVal('hero-title',    d.title);
  setVal('hero-subtitle', d.subtitle);
  setVal('hero-btn-text', d.btnText);
  setVal('hero-badge',    d.badge);

  ['hero-title','hero-subtitle','hero-btn-text','hero-badge'].forEach(id => {
    document.getElementById(id).addEventListener('input', markDirty);
  });
}

function collectHero() {
  currentData.hero = {
    title:   getVal('hero-title'),
    subtitle:getVal('hero-subtitle'),
    btnText: getVal('hero-btn-text'),
    badge:   getVal('hero-badge')
  };
}

/* ══════════════════════════════════════════════
   TIMELINE
   ══════════════════════════════════════════════ */
function renderTimeline() {
  const container = document.getElementById('timeline-editor');
  container.innerHTML = '';

  currentData.timeline.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'tl-card';
    card.dataset.idx = i;

    card.innerHTML = `
      <div class="tl-card-head">
        <span class="tl-num">${i + 1}</span>
        <span class="tl-card-title">${escHtml(item.title)}</span>
        <span class="tl-chevron">▼</span>
      </div>
      <div class="tl-card-body">
        <div class="tl-row">
          <div class="field-group">
            <label class="field-label">Icon</label>
            <input type="text" class="field-input tl-icon" value="${escHtml(item.icon)}" placeholder="✨" maxlength="4" />
          </div>
          <div class="field-group">
            <label class="field-label">Title</label>
            <input type="text" class="field-input tl-title" value="${escHtml(item.title)}" placeholder="Chapter Title" />
          </div>
          <div class="field-group">
            <label class="field-label">Label</label>
            <input type="text" class="field-input tl-chapter" value="${escHtml(item.chapter)}" placeholder="Chapter 1" />
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Body Text</label>
          <textarea class="field-textarea tl-body" rows="4" placeholder="Tell your story…">${escHtml(item.body)}</textarea>
        </div>
      </div>
    `;

    /* Toggle expand */
    card.querySelector('.tl-card-head').addEventListener('click', () => {
      card.classList.toggle('open');
    });

    /* Update title label live */
    card.querySelector('.tl-title').addEventListener('input', (e) => {
      card.querySelector('.tl-card-title').textContent = e.target.value || `Chapter ${i + 1}`;
      markDirty();
    });

    card.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', markDirty));
    container.appendChild(card);
  });
}

function collectTimeline() {
  document.querySelectorAll('.tl-card').forEach((card, i) => {
    currentData.timeline[i] = {
      icon:    card.querySelector('.tl-icon').value,
      title:   card.querySelector('.tl-title').value,
      chapter: card.querySelector('.tl-chapter').value,
      body:    card.querySelector('.tl-body').value
    };
  });
}

/* ══════════════════════════════════════════════
   QUIZ
   ══════════════════════════════════════════════ */
function renderQuiz() {
  const container = document.getElementById('quiz-editor');
  container.innerHTML = '';

  currentData.quiz.forEach((item, qi) => {
    const card = document.createElement('div');
    card.className = 'quiz-q-card';
    card.dataset.idx = qi;

    const optsHtml = item.options.map((opt, oi) => `
      <div class="quiz-opt-row">
        <span class="quiz-opt-num">${String.fromCharCode(65 + oi)}</span>
        <input type="text" class="field-input quiz-opt" data-opt="${oi}" value="${escHtml(opt)}" placeholder="Option ${oi + 1}" />
      </div>
    `).join('');

    card.innerHTML = `
      <span class="quiz-q-label">Question ${qi + 1}</span>
      <input type="text" class="field-input quiz-q" value="${escHtml(item.q)}" placeholder="Type your question…" />
      <div class="quiz-opts">${optsHtml}</div>
    `;

    card.querySelectorAll('input').forEach(el => el.addEventListener('input', markDirty));
    container.appendChild(card);
  });
}

function collectQuiz() {
  document.querySelectorAll('.quiz-q-card').forEach((card, qi) => {
    currentData.quiz[qi] = {
      q:       card.querySelector('.quiz-q').value,
      options: [...card.querySelectorAll('.quiz-opt')].map(el => el.value)
    };
  });
}

/* ══════════════════════════════════════════════
   REASONS
   ══════════════════════════════════════════════ */
function renderReasons() {
  const container = document.getElementById('reasons-editor');
  container.innerHTML = '';

  currentData.reasons.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'reason-ed-card';
    card.dataset.idx = i;

    card.innerHTML = `
      <div class="reason-ed-top">
        <span class="reason-ed-num">#${i + 1}</span>
        <input type="text" class="reason-ed-icon-input reason-icon" value="${escHtml(item.icon)}" maxlength="4" title="Emoji icon" />
      </div>
      <div class="field-group">
        <label class="field-label">Front Label</label>
        <input type="text" class="field-input reason-label" value="${escHtml(item.label)}" placeholder="Your smile" />
      </div>
      <div class="field-group">
        <label class="field-label">Back Detail</label>
        <textarea class="field-textarea reason-detail" rows="2" placeholder="The longer detail shown when flipped…">${escHtml(item.detail)}</textarea>
      </div>
    `;

    card.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', markDirty));
    container.appendChild(card);
  });
}

function collectReasons() {
  document.querySelectorAll('.reason-ed-card').forEach((card, i) => {
    currentData.reasons[i] = {
      icon:   card.querySelector('.reason-icon').value,
      label:  card.querySelector('.reason-label').value,
      detail: card.querySelector('.reason-detail').value
    };
  });
}

/* ══════════════════════════════════════════════
   GALLERY
   ══════════════════════════════════════════════ */
function renderGallery() {
  const grid = document.getElementById('gallery-editor-grid');
  grid.innerHTML = '';
  currentData.gallery.forEach((item, i) => addGalleryCard(item, i));
  initDropZone();
}

function addGalleryCard(item, i) {
  const grid = document.getElementById('gallery-editor-grid');
  const div  = document.createElement('div');
  div.className = 'gallery-ed-item';
  div.dataset.idx = i;

  const hasImg = !!item.src;

  div.innerHTML = `
    ${hasImg
      ? `<img class="gallery-ed-thumb" src="${item.src}" alt="${escHtml(item.caption)}" />`
      : `<div class="gallery-ed-placeholder" title="Click to upload">${item.icon || '📷'}</div>`
    }
    <div class="gallery-ed-change">
      <label class="btn-change-img" for="change-img-${i}">Change Photo</label>
      <input type="file" id="change-img-${i}" accept="image/*" class="hidden" />
    </div>
    <button class="gallery-ed-del" title="Remove" data-idx="${i}">✕</button>
    <div class="gallery-ed-caption">
      <input type="text" value="${escHtml(item.caption)}" placeholder="Caption…" data-idx="${i}" class="gallery-caption-input" />
    </div>
  `;

  /* Delete button */
  div.querySelector('.gallery-ed-del').addEventListener('click', () => {
    currentData.gallery.splice(parseInt(div.dataset.idx), 1);
    renderGallery();
    markDirty();
  });

  /* Caption change */
  div.querySelector('.gallery-caption-input').addEventListener('input', (e) => {
    currentData.gallery[i].caption = e.target.value;
    markDirty();
  });

  /* Change/upload image */
  const fileInput = div.querySelector(`#change-img-${i}`);
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) readImageFile(file, i);
  });

  /* Click placeholder to upload */
  const placeholder = div.querySelector('.gallery-ed-placeholder');
  if (placeholder) {
    placeholder.addEventListener('click', () => fileInput.click());
  }

  grid.appendChild(div);
}

function readImageFile(file, idx) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    if (idx >= 0 && idx < currentData.gallery.length) {
      currentData.gallery[idx].src = ev.target.result;
    } else {
      /* New item */
      currentData.gallery.push({
        src:     ev.target.result,
        caption: file.name.replace(/\.[^.]+$/, ''),
        icon:    '📷',
        bg:      '#fff0f5'
      });
    }
    renderGallery();
    markDirty();
  };
  reader.readAsDataURL(file);
}

function collectGallery() {
  /* Gallery is updated in-place on every change — nothing extra to collect */
}

function initDropZone() {
  const zone   = document.getElementById('drop-zone');
  const upload = document.getElementById('gallery-upload');

  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    [...e.dataTransfer.files].forEach(file => {
      if (file.type.startsWith('image/')) readImageFile(file, -1);
    });
  });

  upload.addEventListener('change', (e) => {
    [...e.target.files].forEach(file => readImageFile(file, -1));
    e.target.value = '';
  });
}

/* ══════════════════════════════════════════════
   LETTER
   ══════════════════════════════════════════════ */
function renderLetter() {
  const container = document.getElementById('letter-editor');
  container.innerHTML = '';

  currentData.letter.forEach((para, i) => addLetterPara(para, i));

  setVal('letter-signature', currentData.letterSignature || DEFAULTS.letterSignature);
  document.getElementById('letter-signature').addEventListener('input', markDirty);
}

function addLetterPara(text, i) {
  const container = document.getElementById('letter-editor');
  const row = document.createElement('div');
  row.className = 'letter-para-row';
  row.dataset.idx = i;

  row.innerHTML = `
    <span class="letter-para-num">${i + 1}</span>
    <textarea class="letter-para-textarea" rows="3" placeholder="Write a paragraph…">${escHtml(text)}</textarea>
    <button class="letter-para-del" title="Delete paragraph">✕</button>
  `;

  row.querySelector('.letter-para-del').addEventListener('click', () => {
    currentData.letter.splice(parseInt(row.dataset.idx), 1);
    renderLetter();
    markDirty();
  });

  row.querySelector('textarea').addEventListener('input', markDirty);
  container.appendChild(row);
}

document.getElementById('btn-add-para').addEventListener('click', () => {
  currentData.letter.push('');
  renderLetter();
  /* Focus the new field */
  const rows = document.querySelectorAll('.letter-para-row');
  if (rows.length) rows[rows.length - 1].querySelector('textarea').focus();
  markDirty();
});

function collectLetter() {
  currentData.letter = [...document.querySelectorAll('.letter-para-textarea')]
    .map(el => el.value);
  currentData.letterSignature = getVal('letter-signature');
}

/* ══════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════ */
function renderFooter() {
  setVal('footer-name', currentData.footer.name);
  setVal('footer-sub',  currentData.footer.sub);
  ['footer-name','footer-sub'].forEach(id =>
    document.getElementById(id).addEventListener('input', markDirty)
  );
}

function collectFooter() {
  currentData.footer = {
    name: getVal('footer-name'),
    sub:  getVal('footer-sub')
  };
}

/* ══════════════════════════════════════════════
   SETTINGS
   ══════════════════════════════════════════════ */
function initSettings() {
  document.getElementById('btn-change-pw').addEventListener('click', () => {
    const newPw = document.getElementById('new-password').value.trim();
    if (!newPw) { showToast('❌ Password cannot be empty.', 'error'); return; }
    localStorage.setItem(PASS_KEY, newPw);
    document.getElementById('new-password').value = '';
    showToast('🔑 Password updated!', 'success');
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    if (!confirm('Reset ALL content to defaults? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    currentData = JSON.parse(JSON.stringify(DEFAULTS));
    renderHero(); renderTimeline(); renderQuiz();
    renderReasons(); renderGallery(); renderLetter(); renderFooter();
    isDirty = false;
    document.getElementById('unsaved-badge').classList.add('hidden');
    showToast('🔄 Reset to defaults!', 'success');
  });
}

/* ══════════════════════════════════════════════
   DOM HELPERS
   ══════════════════════════════════════════════ */
function setVal(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = val || '';
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
