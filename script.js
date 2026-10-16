/* ============================================================
   A Little Universe Made for You — interactions
   Plain vanilla JS. Everything here is decorative or an
   enhancement: if this file never loads, the whole site
   still reads fine from top to bottom.
   ============================================================ */
(function () {
  'use strict';

  // --- 0A. Logika Halaman Password ---
  var authScreen = document.getElementById('auth-screen');
  var authBtn = document.getElementById('auth-btn');
  var authInput = document.getElementById('auth-input');
  var authError = document.getElementById('auth-error');
  var correctPassword = "251109"; // <--- GANTI PASSWORD DI SINI

  if (authBtn) {
    authBtn.addEventListener('click', function() {
      if (authInput.value.toLowerCase() === correctPassword) {
        authScreen.classList.add('hidden');
        setTimeout(function() { authScreen.remove(); }, 800);
      } else {
        authError.style.opacity = '1';
        setTimeout(function() { authError.style.opacity = '0'; }, 2000);
      }
    });
  }

  // --- 0B. Transisi Latar Belakang Perlahan Saat Scroll ---
  window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    var docHeight = document.body.scrollHeight - window.innerHeight;
    var scrollPercent = Math.min(1, Math.max(0, scrolled / docHeight));
    
    // Dari Midnight (8,20,38) ke nuansa yang sedikit keunguan romantis
    var r = Math.round(8 + (15 * scrollPercent));
    var g = Math.round(20 - (5 * scrollPercent));
    var b = Math.round(38 + (12 * scrollPercent));
    
    document.documentElement.style.setProperty('--midnight', 'rgb(' + r + ', ' + g + ', ' + b + ')');
  });

  // Lets CSS hide .reveal elements only when JS is actually running.
  document.documentElement.classList.add('js');

  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function prefersReducedMotion() {
    return reduceMotionQuery.matches;
  }

  /* ---------------------------------------------------------
     1. Soft entrance: fade + blur + small translateY when a section
        scrolls into view.
  --------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function showInstantly(el) {
    el.classList.add('is-visible');
  }

  if ('IntersectionObserver' in window && !prefersReducedMotion()) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(showInstantly);
  }

  /* ---------------------------------------------------------
     2. "Open Your Little Surprise" — Queue Animation
  --------------------------------------------------------- */
  var openButton = document.getElementById('open-surprise');
  var letterSection = document.getElementById('letter');
  var queueOverlay = document.getElementById('queue-overlay');
  var queueWord = document.getElementById('queue-word');

  if (openButton && letterSection && queueOverlay) {
    openButton.addEventListener('click', function () {
      // Kata-kata indah yang akan muncul berurutan, silakan ganti sesuai selera
      var words = ["Cantik...", "Baik...", "Perhatian...", "Sempurna..."];
      var i = 0;
      
      queueOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Kunci layar agar tidak bisa di-scroll
      
      var cycle = setInterval(function() {
        if (i < words.length) {
          queueWord.textContent = words[i];
          queueWord.classList.add('show');
          
          setTimeout(function() {
            queueWord.classList.remove('show');
          }, 800); // Teks muncul selama 800ms
          
          i++;
        } else {
          clearInterval(cycle);
          setTimeout(function() {
            queueOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Buka kunci layar
            letterSection.scrollIntoView({
              behavior: prefersReducedMotion() ? 'auto' : 'smooth',
              block: 'start'
            });
          }, 500);
        }
      }, 1200); // Waktu jeda antar kata
    });
  }

  /* ---------------------------------------------------------
     3. Very light parallax on the paper-cut layers.
        Each layer carries data-parallax="speed"; the moon and
        stars drift slower than the hills, which fakes depth.
  --------------------------------------------------------- */
  var parallaxLayers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var hero = document.querySelector('.hero');
  var ticking = false;

  function updateParallax() {
    ticking = false;
    if (!hero) return;
    var scrolled = window.scrollY || window.pageYOffset;
    if (scrolled > hero.offsetHeight) return; // hero is off-screen, skip work
    parallaxLayers.forEach(function (layer) {
      var speed = parseFloat(layer.getAttribute('data-parallax')) || 0;
      layer.style.transform = 'translateY(' + (scrolled * speed).toFixed(1) + 'px)';
    });
  }

  if (parallaxLayers.length && !prefersReducedMotion()) {
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateParallax);
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     4. Memory lightbox — click, Enter/Space, arrow keys, Esc.
  --------------------------------------------------------- */
  var memoryButtons = Array.prototype.slice.call(document.querySelectorAll('.memory-button'));
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var closeButton = document.getElementById('lightbox-close');
  var prevButton = document.getElementById('lightbox-prev');
  var nextButton = document.getElementById('lightbox-next');

  var currentIndex = 0;
  var lastFocused = null;

  function renderLightbox(index) {
    var button = memoryButtons[index];
    var img = button.querySelector('img');
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = button.getAttribute('data-caption') || '';
    currentIndex = index;
  }

  function openLightbox(index) {
    lastFocused = document.activeElement;
    renderLightbox(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden'; // stop the page scrolling behind
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = '';
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function stepLightbox(delta) {
    var next = (currentIndex + delta + memoryButtons.length) % memoryButtons.length;
    renderLightbox(next);
  }

  if (lightbox && memoryButtons.length) {
    memoryButtons.forEach(function (button, index) {
      button.addEventListener('click', function () { openLightbox(index); });
    });

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', function () { stepLightbox(-1); });
    nextButton.addEventListener('click', function () { stepLightbox(1); });

    lightbox.addEventListener('click', function (event) {
      if (event.target.hasAttribute('data-lightbox-close')) closeLightbox();
    });

    document.addEventListener('keydown', function (event) {
      if (lightbox.hidden) return;
      if (event.key === 'Escape') { closeLightbox(); }
      else if (event.key === 'ArrowLeft') { stepLightbox(-1); }
      else if (event.key === 'ArrowRight') { stepLightbox(1); }
      else if (event.key === 'Tab') {
        // Keep focus cycling inside the dialog
        var focusables = [closeButton, prevButton, nextButton];
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    });
  }

  /* ---------------------------------------------------------
     5. "Make a Little Wish" — a few paper stars drift upward
        and the moon glows a touch warmer. Kept brief and calm.
  --------------------------------------------------------- */
  var wishButton = document.getElementById('wish-button');
  var wishScene = document.getElementById('wish-scene');
  var wishStatus = document.getElementById('wish-status');
  var wishInFlight = false;

  function makeOneStar() {
    var star = document.createElement('span');
    star.className = 'wish-star';
    var size = 6 + Math.random() * 9;                       // 6–15px
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = (12 + Math.random() * 76) + '%';      // spread across the sky
    star.style.top = (55 + Math.random() * 35) + '%';       // start near the moon
    star.style.setProperty('--rise-delay', (Math.random() * 900).toFixed(0) + 'ms');
    star.style.setProperty('--rise-duration', (2000 + Math.random() * 1400).toFixed(0) + 'ms');
    wishScene.appendChild(star);
    // Clean up after the animation ends (+ delay headroom)
    window.setTimeout(function () { star.remove(); }, 4600);
  }

  if (wishButton && wishScene && wishStatus) {
    wishButton.addEventListener('click', function () {
      if (wishInFlight) return;
      wishInFlight = true;

      wishStatus.textContent = 'Your wish is on its way to the stars.';
      wishStatus.classList.add('is-showing');

      if (!prefersReducedMotion()) {
        wishScene.classList.add('is-glowing');
        for (var i = 0; i < 14; i++) { makeOneStar(); }
        window.setTimeout(function () {
          wishScene.classList.remove('is-glowing');
        }, 3800);
      }

      window.setTimeout(function () {
        wishStatus.classList.remove('is-showing');
        wishInFlight = false;
      }, 4600);
    });
  }
})();
