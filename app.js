/* ══════════════════════════════════════════════════════════
   BIRTHDAY WEBSITE — Main JavaScript
   Author: Built with ❤️
   Data is loaded from localStorage (set by admin.html) first,
   falling back to the built-in defaults below.
   ══════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────
   DATA
   Loaded from data.js (which is rewritten by the local server on Save)
   ──────────────────────────────────────────────*/
const DATA = window.DATA || {};

/* Apply admin-editable hero fields to DOM */
(function applyDynamicFields() {
  /* Hero heading */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && DATA.hero) {
    heroTitle.innerHTML = (DATA.hero.title || 'Happy Birthday ❤️')
      .replace('❤️', '<span class="hero-heart-accent">❤️</span>');
  }
  /* Hero subtitle */
  const heroSub = document.querySelector('.hero-subtitle');
  if (heroSub && DATA.hero) heroSub.textContent = DATA.hero.subtitle || '';

  /* Hero button */
  const heroCta = document.getElementById('hero-cta');
  if (heroCta && DATA.hero && DATA.hero.btnText) {
    heroCta.childNodes[0].textContent = DATA.hero.btnText.replace('→', '') + ' ';
  }

  /* Hero badge */
  const badge = document.querySelector('.hero-badge');
  if (badge && DATA.hero) badge.textContent = DATA.hero.badge || '';

  /* Footer name */
  const footerName = document.querySelector('.footer-name');
  if (footerName && DATA.footer) footerName.textContent = DATA.footer.name || '';

  /* Footer sub */
  const footerSub = document.querySelector('.footer-sub');
  if (footerSub && DATA.footer) footerSub.textContent = DATA.footer.sub || '';

  /* Timeline cards */
  if (DATA.timeline) {
    document.querySelectorAll('.timeline-card').forEach((card, i) => {
      const d = DATA.timeline[i];
      if (!d) return;
      const iconEl    = card.querySelector('.timeline-icon');
      const titleEl   = card.querySelector('.timeline-title');
      const dateEl    = card.querySelector('.timeline-date');
      const bodyParas = card.querySelectorAll('.timeline-body p:not(.timeline-note)');
      if (iconEl)  iconEl.textContent  = d.icon    || '';
      if (titleEl) titleEl.textContent = d.title   || '';
      if (dateEl)  dateEl.textContent  = d.chapter || '';
      if (bodyParas[0]) bodyParas[0].textContent = d.body || '';
    });
  }

  /* Letter signature */
  const sigName = document.querySelector('.letter-name');
  if (sigName && DATA.letterSignature) sigName.textContent = DATA.letterSignature;
})();

/* ──────────────────────────────────────────────
   LOADING SCREEN
   ──────────────────────────────────────────────*/
(function initLoading() {
  const screen    = document.getElementById('loading-screen');
  const bar       = document.getElementById('progress-bar');
  const percent   = document.getElementById('loading-percent');
  const message   = document.getElementById('loading-message');
  const particles = document.getElementById('loading-particles');
  const emojis    = ['❤️','💕','🎂','✨','🎉','💖','🌸','💝'];

  /* Create floating background particles */
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span');
    p.className = 'loading-particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 4}s`;
    p.style.animationDuration = `${3 + Math.random() * 3}s`;
    particles.appendChild(p);
  }

  const messages = [
    'Loading Memories…',
    'Counting Reasons…',
    'Wrapping Hearts…',
    'Adding Confetti…',
    'Almost Ready… ❤️'
  ];

  let progress = 0;
  let msgIdx   = 0;

  const interval = setInterval(() => {
    /* Accelerate progress realistically */
    const step = progress < 60 ? 2.5 : progress < 85 ? 1.2 : 0.6;
    progress = Math.min(progress + step, 100);

    bar.style.width = progress + '%';
    percent.textContent = Math.floor(progress) + '%';

    /* Cycle messages at milestones */
    const milestone = Math.floor(progress / 20);
    if (milestone > msgIdx && msgIdx < messages.length - 1) {
      msgIdx = milestone;
      /* Set transition once upfront, not inside the timeout */
      message.style.transition = 'opacity 0.4s ease';
      message.style.opacity = '0';
      setTimeout(() => {
        message.textContent = messages[Math.min(msgIdx, messages.length - 1)];
        message.style.opacity = '1';
      }, 200);
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        screen.classList.add('hidden');
        /* Trigger hero animations once visible */
        setTimeout(startHeroAnimations, 300);
      }, 400);
    }
  }, 40);
})();

/* ──────────────────────────────────────────────
   CUSTOM CURSOR GLOW
   ──────────────────────────────────────────────*/
(function initCursor() {
  /* Only initialise cursor glow on devices with a fine pointer (mouse) */
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const glow = document.getElementById('cursor-glow');
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* Smooth follow with lerp */
  function animateCursor() {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    glow.style.left = curX + 'px';
    glow.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* Expand on hover over interactive elements */
  document.querySelectorAll('a, button, .timeline-card, .reason-card, .polaroid').forEach(el => {
    el.addEventListener('mouseenter', () => {
      glow.style.width  = '80px';
      glow.style.height = '80px';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width  = '40px';
      glow.style.height = '40px';
    });
  });
})();

/* ──────────────────────────────────────────────
   SPARKLE ON CLICK
   ──────────────────────────────────────────────*/
document.addEventListener('click', (e) => {
  const sparks = ['✨', '💖', '⭐', '🌸', '💫'];
  const spark = document.createElement('span');
  spark.className = 'sparkle';
  spark.textContent = sparks[Math.floor(Math.random() * sparks.length)];
  spark.style.left = e.clientX + 'px';
  spark.style.top  = e.clientY + 'px';
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 900);
});

/* ──────────────────────────────────────────────
   NAVIGATION
   ──────────────────────────────────────────────*/
(function initNav() {
  const nav    = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  /* Scroll → frosted glass nav */
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* Mobile menu toggle */
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  /* Close on link click */
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
})();

/* ──────────────────────────────────────────────
   HERO CANVAS — soft particles
   ──────────────────────────────────────────────*/
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');
  const particles = [];

  function resize() {
    /* Use clientWidth/clientHeight — offsetWidth can be 0 before first paint */
    canvas.width  = canvas.clientWidth  || canvas.parentElement.clientWidth;
    canvas.height = canvas.clientHeight || canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* Create soft bokeh particles */
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 2 + Math.random() * 5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: -0.2 - Math.random() * 0.4,
      alpha: 0.1 + Math.random() * 0.4,
      color: Math.random() > 0.5 ? '255,133,171' : '201,168,232'
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10 || p.x > canvas.width + 10) {
        p.dx *= -1;
      }
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();

/* ──────────────────────────────────────────────
   FLOATING HEARTS (hero)
   ──────────────────────────────────────────────*/
function startHeroAnimations() {
  const container = document.getElementById('hero-hearts');
  const heartEmojis = ['❤️','💕','💖','💗','💝','🌸'];

  function spawnHeart() {
    const h = document.createElement('span');
    h.className = 'float-heart';
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left = `${Math.random() * 100}%`;
    h.style.bottom = `-${20 + Math.random() * 20}px`;
    h.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
    h.style.animationDuration = `${6 + Math.random() * 6}s`;
    h.style.animationDelay = '0s';
    container.appendChild(h);
    setTimeout(() => h.remove(), 12000);
  }

  /* Initial burst then interval */
  for (let i = 0; i < 5; i++) setTimeout(spawnHeart, i * 400);
  setInterval(spawnHeart, 1800);
}

/* ──────────────────────────────────────────────
   GLOBAL FLOATING HEARTS (subtle background)
   ──────────────────────────────────────────────*/
(function initGlobalHearts() {
  const container = document.getElementById('global-hearts');
  const emojis = ['❤️', '💕', '💖', '🌸'];

  setInterval(() => {
    const h = document.createElement('span');
    h.className = 'g-heart';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = `${Math.random() * 100}%`;
    h.style.fontSize = `${0.6 + Math.random() * 0.8}rem`;
    h.style.animationDuration = `${10 + Math.random() * 10}s`;
    h.style.animationDelay = '0s';
    container.appendChild(h);
    setTimeout(() => h.remove(), 20000);
  }, 3000);
})();

/* ──────────────────────────────────────────────
   HERO CTA RIPPLE
   ──────────────────────────────────────────────*/
document.getElementById('hero-cta').addEventListener('click', function(e) {
  const btn = this;
  const ripple = document.createElement('span');
  const rect   = btn.getBoundingClientRect();
  ripple.className = 'ripple';
  ripple.style.width  = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
  ripple.style.left = `${e.clientX - rect.left - rect.width / 2}px`;
  ripple.style.top  = `${e.clientY - rect.top  - rect.height / 2}px`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

/* ──────────────────────────────────────────────
   SCROLL REVEAL
   ──────────────────────────────────────────────*/
(function initReveal() {
  const items = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {   /* removed unused 'i' parameter */
      if (entry.isIntersecting) {
        /* Stagger siblings */
        const delay = (Array.from(entry.target.parentElement.children).indexOf(entry.target)) * 80;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
})();

/* ──────────────────────────────────────────────
   TIMELINE — expand/collapse on click
   ──────────────────────────────────────────────*/
(function initTimeline() {
  document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('click', () => {
      const wasActive = card.classList.contains('active');
      /* Close all */
      document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('active'));
      /* Open clicked if wasn't open */
      if (!wasActive) card.classList.add('active');
    });
  });
})();

/* ──────────────────────────────────────────────
   QUIZ
   ──────────────────────────────────────────────*/
(function initQuiz() {
  const questions   = DATA.quiz;
  const questionEl  = document.getElementById('quiz-question');
  const optionsEl   = document.getElementById('quiz-options');
  const cardEl      = document.getElementById('quiz-card');
  const resultEl    = document.getElementById('quiz-result');
  const resultText  = document.getElementById('quiz-result-text');
  const nextBtn     = document.getElementById('quiz-next-btn');
  const finalEl     = document.getElementById('quiz-final');
  const progressBar = document.getElementById('quiz-progress-bar');
  const countEl     = document.getElementById('quiz-count');
  const restartBtn  = document.getElementById('quiz-restart-btn');

  let currentQ = 0;

  const funnyResults = [
    "Correct 😂❤️",
    "Absolutely right! 😂",
    "Nailed it! 💯",
    "As expected 😂❤️",
    "You know yourself! 🎉",
    "Obviously! ❤️😂"
  ];

  function loadQuestion() {
    const q = questions[currentQ];
    questionEl.textContent = q.q;
    optionsEl.innerHTML = '';

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.id = `quiz-opt-${currentQ}-${i}`;
      btn.addEventListener('click', () => handleAnswer(btn));
      optionsEl.appendChild(btn);
    });

    /* Update progress */
    progressBar.style.width = `${(currentQ / questions.length) * 100}%`;
    countEl.textContent = `Question ${currentQ + 1} of ${questions.length}`;

    /* Animate in */
    cardEl.classList.remove('slide-out');
    cardEl.classList.add('slide-in');
    setTimeout(() => cardEl.classList.remove('slide-in'), 400);
  }

  function handleAnswer(btn) {
    /* Disable all options */
    optionsEl.querySelectorAll('.quiz-option').forEach(b => {
      b.disabled = true;
      b.style.opacity = '0.5';
    });
    btn.style.opacity = '1';
    btn.style.background = 'linear-gradient(135deg, rgba(255,133,171,0.2), rgba(201,168,232,0.2))';
    btn.style.borderColor = '#ff85ab';

    /* Slide out card, show result */
    setTimeout(() => {
      cardEl.style.display = 'none';
      resultText.textContent = funnyResults[currentQ] || "Correct 😂❤️";
      resultEl.classList.add('visible');
    }, 500);
  }

  nextBtn.addEventListener('click', () => {
    currentQ++;
    resultEl.classList.remove('visible');

    if (currentQ >= questions.length) {
      /* Show final */
      progressBar.style.width = '100%';
      finalEl.classList.add('visible');
    } else {
      cardEl.style.display = '';
      loadQuestion();
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQ = 0;
    finalEl.classList.remove('visible');
    cardEl.style.display = '';
    loadQuestion();
  });

  loadQuestion();
})();

/* ──────────────────────────────────────────────
   REASONS — flip cards
   ──────────────────────────────────────────────*/
(function initReasons() {
  const grid = document.getElementById('reasons-grid');

  DATA.reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card reveal-up';
    card.id = `reason-card-${i}`;
    card.innerHTML = `
      <div class="reason-card-front">
        <span class="reason-icon">${r.icon}</span>
        <span class="reason-number">#${i + 1}</span>
        <span class="reason-text">${r.label}</span>
      </div>
      <div class="reason-card-back">
        <span class="reason-icon">${r.icon}</span>
        <span class="reason-back-text">${r.detail}</span>
      </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    grid.appendChild(card);
  });

  /* Re-observe newly created elements */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.children);
        const delay = (siblings.indexOf(entry.target) % 5) * 80;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  grid.querySelectorAll('.reason-card').forEach(card => observer.observe(card));
})();

/* ──────────────────────────────────────────────
   GALLERY — Polaroid grid + modal
   ──────────────────────────────────────────────*/
(function initGallery() {
  const grid    = document.getElementById('gallery-grid');
  const overlay = document.getElementById('modal-overlay');
  const imgWrap = document.getElementById('modal-image-wrap');
  const caption = document.getElementById('modal-caption');
  const closeBtn= document.getElementById('modal-close');

  DATA.gallery.forEach((item, i) => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid reveal-up';
    polaroid.id = `polaroid-${i}`;

    const imageDiv = document.createElement('div');
    imageDiv.className = 'polaroid-image';

    if (item.src) {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption;
      imageDiv.appendChild(img);
    } else {
      imageDiv.style.background = `linear-gradient(135deg, ${item.bg}, #f5f0ff)`;
      imageDiv.innerHTML = `
        <div class="polaroid-placeholder">
          <span class="polaroid-placeholder-icon">${item.icon}</span>
          <span class="polaroid-placeholder-text">Add your photo here</span>
        </div>
      `;
    }

    const cap = document.createElement('p');
    cap.className = 'polaroid-caption';
    cap.textContent = item.caption;

    polaroid.appendChild(imageDiv);
    polaroid.appendChild(cap);
    grid.appendChild(polaroid);

    polaroid.addEventListener('click', () => openModal(item, i));
  });

  function openModal(item, i) {
    /* Reset background so placeholder bg doesn't bleed onto real images */
    imgWrap.style.background = '';
    imgWrap.innerHTML = '';

    if (item.src) {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption;
      imgWrap.appendChild(img);
    } else {
      imgWrap.style.background = `linear-gradient(135deg, ${item.bg}, #f5f0ff)`;
      imgWrap.innerHTML = `
        <div class="polaroid-placeholder">
          <span class="polaroid-placeholder-icon" style="font-size:4rem">${item.icon}</span>
          <span class="polaroid-placeholder-text">Your photo goes here ❤️<br><small>Replace src: null with your image path in app.js</small></span>
        </div>
      `;
    }

    caption.textContent = item.caption;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* Observe polaroids */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.children);
        const delay = (siblings.indexOf(entry.target) % 4) * 100;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  grid.querySelectorAll('.polaroid').forEach(p => observer.observe(p));
})();

/* ──────────────────────────────────────────────
   SECRET BUTTON + CONFETTI
   ──────────────────────────────────────────────*/
(function initSecret() {
  const btn       = document.getElementById('secret-btn');
  const overlay   = document.getElementById('celebration-overlay');
  const closeBtn  = document.getElementById('celebration-close');
  const canvas    = document.getElementById('confetti-canvas');
  const ctx       = canvas.getContext('2d');
  let confettiActive = false;
  let confettiPieces = [];

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* Confetti piece factory */
  function createPiece() {
    const colors = ['#ff85ab','#ff4d80','#c9a8e8','#a87dd1','#ffb3cb','#ffd6e7','#ffffff','#ff6b9d'];
    return {
      x: Math.random() * canvas.width,
      y: -10,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      dx: (Math.random() - 0.5) * 4,
      dy: 2 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      dAngle: (Math.random() - 0.5) * 0.2,
      alpha: 1
    };
  }

  function launchConfetti() {
    confettiActive = true;
    for (let i = 0; i < 200; i++) {
      setTimeout(() => confettiPieces.push(createPiece()), i * 12);
    }

    function drawConfetti() {
      /* Guard at every frame entry so rAF stops immediately on flag flip */
      if (!confettiActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPieces = confettiPieces.filter(p => p.y < canvas.height + 20);

      confettiPieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        p.x += p.dx;
        p.y += p.dy;
        p.angle += p.dAngle;
        p.dy += 0.08; /* gravity */
        if (p.y > canvas.height * 0.7) p.alpha -= 0.02;
      });

      requestAnimationFrame(drawConfetti);
    }
    drawConfetti();
  }

  btn.addEventListener('click', () => {
    /* Shake */
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);

    /* Show overlay after shake */
    setTimeout(() => {
      overlay.classList.add('active');
      launchConfetti();
    }, 400);
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    confettiActive = false;
    confettiPieces = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
})();

/* ──────────────────────────────────────────────
   LETTER TYPING ANIMATION
   ──────────────────────────────────────────────*/
(function initLetter() {
  const bodyEl   = document.getElementById('letter-body');
  const dateEl   = document.getElementById('letter-date');
  const letter   = DATA.letter;

  /* Set date */
  const today = new Date();
  dateEl.textContent = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  let started = false;

  /* Only start when section is visible */
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      typeLetter();
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(document.getElementById('letter'));

  function typeLetter() {
    bodyEl.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'letter-cursor';

    let paraIdx = 0;
    let charIdx = 0;
    let currentPara = null;

    function typeNext() {
      if (paraIdx >= letter.length) {
        /* Done — leave cursor blinking */
        bodyEl.appendChild(cursor);
        return;
      }

      if (charIdx === 0) {
        /* Start new paragraph */
        currentPara = document.createElement('p');
        currentPara.style.marginBottom = '1rem';
        bodyEl.appendChild(currentPara);
        bodyEl.appendChild(cursor);
      }

      const text = letter[paraIdx];

      if (charIdx < text.length) {
        currentPara.textContent += text[charIdx];
        charIdx++;
        const delay = text[charIdx - 1] === '.' || text[charIdx - 1] === ',' ? 60 : 22;
        setTimeout(typeNext, delay);
      } else {
        /* End of paragraph */
        paraIdx++;
        charIdx = 0;
        /* Brief pause between paragraphs */
        setTimeout(typeNext, 500);
      }
    }

    typeNext();
  }
})();

/* ──────────────────────────────────────────────
   COUNTDOWN — to next birthday
   ──────────────────────────────────────────────*/
(function initCountdown() {
  const daysEl  = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('cu-hours');
  const minsEl  = document.getElementById('cu-mins');
  const secsEl  = document.getElementById('cu-secs');
  const ring    = document.getElementById('countdown-ring-fill');
  const RING_CIRCUMFERENCE = 565;

  function updateCountdown() {
    const now         = new Date();
    const thisYear    = now.getFullYear();
    /* Next birthday = next year, same month/day as today */
    let nextBday = new Date(thisYear + 1, now.getMonth(), now.getDate());

    const diff  = nextBday - now;
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent  = days;
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent  = String(mins).padStart(2, '0');
    secsEl.textContent  = String(secs).padStart(2, '0');

    /* Ring progress — how far through the year we are */
    const yearProgress = 1 - (days / 365);
    ring.style.strokeDashoffset = RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * yearProgress);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

/* ──────────────────────────────────────────────
   FOOTER HEARTS
   ──────────────────────────────────────────────*/
(function initFooterHearts() {
  const container = document.getElementById('footer-hearts');
  const emojis = ['❤️','💕','💖','💗','🌸'];

  for (let i = 0; i < 20; i++) {
    const h = document.createElement('span');
    h.style.cssText = `
      position: absolute;
      font-size: ${0.6 + Math.random() * 1}rem;
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 100}%;
      opacity: ${0.2 + Math.random() * 0.3};
      animation: floatHeart ${6 + Math.random() * 8}s linear ${Math.random() * 6}s infinite;
      pointer-events: none;
    `;
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    container.appendChild(h);
  }
})();

/* ──────────────────────────────────────────────
   BACK TO TOP
   ──────────────────────────────────────────────*/
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ──────────────────────────────────────────────
   BUTTON RIPPLE — all primary buttons
   ──────────────────────────────────────────────*/
document.querySelectorAll('.quiz-next-btn, .quiz-restart-btn, .celebration-close').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width  = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top  = `${e.clientY - rect.top  - size / 2}px`;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

/* ──────────────────────────────────────────────
   SMOOTH SCROLL for anchor links
   ──────────────────────────────────────────────*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('%c❤️ Happy Birthday! This website was made with a lot of love.', 
  'color: #ff4d80; font-size: 16px; font-family: serif; padding: 8px;');
