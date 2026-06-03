(function () {
  // ── Active nav link ──────────────────────────────────────────────
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop().split('#')[0] || 'index.html';

    if (linkFile === filename) {
      link.classList.add('active');
    }
    // Home page: treat empty or index.html as the same
    if ((filename === '' || filename === 'index.html') && (linkFile === 'index.html' || href === '/')) {
      link.classList.add('active');
    }
  });

  // ── Hamburger / mobile nav ───────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside tap
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Scroll: shrink nav shadow ────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(2,12,27,0.5)'
        : 'none';
    }, { passive: true });
  }

  // ── Hero animation: typing intro → staggered fade-in ─────────────
  const introEl = document.querySelector('.hero-intro');
  if (introEl) {
    const fullText = introEl.textContent.trim();
    introEl.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    introEl.appendChild(cursor);

    let i = 0;
    function typeNext() {
      if (i < fullText.length) {
        introEl.insertBefore(document.createTextNode(fullText[i]), cursor);
        i++;
        setTimeout(typeNext, 55);
      } else {
        // Blink cursor briefly, then remove and cascade the rest in
        setTimeout(() => {
          cursor.remove();
          const targets = ['.hero-name', '.hero-tagline', '.hero-badges', '.hero-desc', '.hero-ctas', '.hero-photo-wrap'];
          targets.forEach((sel, idx) => {
            const el = document.querySelector(sel);
            if (!el) return;
            setTimeout(() => el.classList.add('anim-in'), idx * 140);
          });
        }, 500);
      }
    }

    setTimeout(typeNext, 400);
  }
})();
