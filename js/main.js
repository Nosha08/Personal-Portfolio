(function () {
  'use strict';

  // ── 1. CUSTOM CURSOR ──────────────────────────────────────────────
  const follower = document.getElementById('cursorFollower');
  const ring = document.getElementById('cursorRing');

  if (follower && window.matchMedia('(hover: hover)').matches) {
    const dot = follower.querySelector('.cursor-dot');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    // Move dot instantly, independent of ring
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
    }, { passive: true });

    // Ring lerps behind — container stays at 0,0
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px) translate(-50%, -50%)';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Expand ring on interactive elements
    const interactives = 'a, button, [role="button"], .bento-card, .project-card, .skill-tag';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactives)) {
        ring.classList.add('expanded');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactives)) {
        ring.classList.remove('expanded');
      }
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function () {
      follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      follower.style.opacity = '1';
    });
  }

  // ── 2. NAV SCROLL ─────────────────────────────────────────────────
  const nav = document.getElementById('main-nav') || document.querySelector('nav');
  if (nav) {
    function handleNavScroll() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run once on load
  }

  // ── 3. TYPEWRITER ─────────────────────────────────────────────────
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const words = [
      'Developer.',
      'Entrepreneur.',
      'Civic Leader.',
      'AI Builder.',
      "Wharton '30."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function tick() {
      const currentWord = words[wordIndex];

      if (isPaused) {
        isPaused = false;
        isDeleting = true;
        setTimeout(tick, 80);
        return;
      }

      if (!isDeleting) {
        // Typing forward
        charIndex++;
        typewriterEl.textContent = currentWord.slice(0, charIndex);
        if (charIndex === currentWord.length) {
          // Pause at end of word
          isPaused = true;
          setTimeout(tick, 1600);
        } else {
          setTimeout(tick, 80 + Math.random() * 40);
        }
      } else {
        // Deleting
        charIndex--;
        typewriterEl.textContent = currentWord.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, 320);
        } else {
          setTimeout(tick, 45);
        }
      }
    }

    // Start after a short delay
    setTimeout(tick, 800);
  }

  // ── 4. SCROLL REVEAL ──────────────────────────────────────────────
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    animatedEls.forEach(function (el) {
      el.classList.add('animated');
    });
  }

  // ── 5. HAMBURGER MENU ─────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── 6. CARD TILT ──────────────────────────────────────────────────
  const tiltCards = document.querySelectorAll('.project-card, .bento-card');

  tiltCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
      const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
      const rotX = (-dy * 5).toFixed(2);
      const rotY = ( dx * 5).toFixed(2);
      card.style.transition = 'transform 0.08s ease, border-color 0.3s';
      card.style.transform = 'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateZ(6px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform 0.5s ease, border-color 0.3s';
      card.style.transform = '';
    });
  });

  // ── ACTIVE NAV LINK ───────────────────────────────────────────────
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop().split('#')[0] || 'index.html';
    if (linkFile === filename) {
      link.classList.add('active');
    }
    if ((filename === '' || filename === 'index.html') && (linkFile === 'index.html' || href === '/')) {
      link.classList.add('active');
    }
  });

})();
