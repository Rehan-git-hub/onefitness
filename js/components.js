/**
 * ONE FITNESS — components.js
 * Injects the shared header + footer into every page,
 * then wires up all shared behaviours (scroll, menu, reveal, counters).
 *
 * Usage in any HTML page:
 *   1. Put  <div id="header-root"></div>  right after <body>
 *   2. Put  <div id="footer-root"></div>  just before </body>
 *   3. Add  <script src="js/components.js"></script>  at bottom of body
 */

(function () {
  'use strict';

  /* ── Active-page detection ──────────────────────────────── */
  const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  function ac(href) { return page === href ? ' class="active"' : ''; }

  /* ══════════════════════════════════════════════════════════
     HEADER HTML
  ══════════════════════════════════════════════════════════ */
  const HEADER = `
<header class="site-header" id="site-header">
  <div class="wrap nav-inner">

    <a href="index.html" class="logo-wrap" aria-label="One Fitness Home">
      <img src="images/logowithoutbg.png" alt="One Fitness Logo"
           onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
      <span class="logo-text" style="display:none;">One <span>Fitness</span></span>
    </a>

    <nav class="nav-links" aria-label="Main Navigation">
      <a href="index.html"${ac('index.html')}>Home</a>
      <a href="about.html"${ac('about.html')}>About</a>
      <a href="trainers.html"${ac('trainers.html')}>Trainers</a>
      <a href="membership.html"${ac('membership.html')}>Membership</a>
      <a href="contact.html"${ac('contact.html')}>Contact</a>
    </nav>

    <a href="#contact-strip" class="btn-primary nav-cta">Join Now</a>

    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

  </div>
</header>

<nav class="mobile-menu" id="mobile-menu" aria-label="Mobile Navigation">
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="trainers.html">Trainers</a>
  <a href="membership.html">Membership</a>
  <a href="contact.html">Contact</a>
  <a href="contact.html" class="btn-primary mob-cta">Join Now</a>
</nav>`;

  /* ══════════════════════════════════════════════════════════
     FOOTER HTML
  ══════════════════════════════════════════════════════════ */
  const FOOTER = `
<footer class="site-footer" aria-label="Site footer">
  <div class="wrap">
    <div class="footer-top">

      <div class="footer-brand">
        <img src="images/logowithoutbg.png" alt="One Fitness"
             onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <span class="footer-logo-text" style="display:none;">One <span>Fitness</span></span>
        <p>Bengaluru's go-to gym for serious training and real results. Located on Mosque Road, open daily and ready when you are.</p>
        <div class="social-row">
          <a href="#" class="social-btn" aria-label="Instagram">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" class="social-btn" aria-label="Facebook">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://wa.me/919980522000" class="social-btn" aria-label="WhatsApp">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h6>Pages</h6>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="trainers.html">Our Trainers</a></li>
          <li><a href="membership.html">Membership</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="terms.html">Terms &amp; Conditions</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
        </ul>
      </div>



      <div class="footer-col">
        <h6>Contact</h6>
        <ul>
          <li><a href="tel:+919980522000">099805 22000</a></li>
          <li><a href="https://maps.google.com/?q=13+Mosque+Road+Bengaluru" target="_blank" rel="noopener">13 Mosque Road, Bengaluru</a></li>
          <li><a href="#">Mon–Sat · 6 AM - 11 PM</a></li>
          <li><a href="#">Sunday · Closed</a></li>
          <li><a href="https://wa.me/919980522000">WhatsApp Us</a></li>
        </ul>
      </div>

    </div>
    <div class="footer-bottom">
      <p>© 2025 One Fitness. All rights reserved.</p>
      <p>Built by <a href="#">Built Yo Work</a></p>
    </div>
  </div>
</footer>`;

  /* ══════════════════════════════════════════════════════════
     INJECT
  ══════════════════════════════════════════════════════════ */
  const headerRoot = document.getElementById('header-root');
  const footerRoot = document.getElementById('footer-root');

  if (headerRoot) headerRoot.outerHTML = HEADER;
  if (footerRoot) footerRoot.outerHTML = FOOTER;

  /* ══════════════════════════════════════════════════════════
     SHARED INIT (runs after DOM update)
  ══════════════════════════════════════════════════════════ */
  requestAnimationFrame(init);

  function init() {
    /* Header scroll */
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
      window.addEventListener('scroll', function () {
        siteHeader.classList.toggle('scrolled', window.scrollY > 60);
      }, { passive: true });
    }

    /* Hamburger / mobile menu */
    const ham     = document.getElementById('hamburger');
    const mobMenu = document.getElementById('mobile-menu');
    if (ham && mobMenu) {
      ham.addEventListener('click', function () {
        const open = ham.classList.toggle('open');
        mobMenu.classList.toggle('open', open);
        ham.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mobMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          ham.classList.remove('open');
          mobMenu.classList.remove('open');
          ham.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
          ham.classList.remove('open');
          mobMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    /* Scroll reveal */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
      const revObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { revObs.observe(el); });
    }

    /* Animated counters */
    const counters = document.querySelectorAll('.counter');
    const statsBar = document.querySelector('.stats-bar');
    if (counters.length && statsBar && 'IntersectionObserver' in window) {
      var ran = false;
      var cntObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !ran) {
          ran = true;
          counters.forEach(function (el) {
            var target = parseInt(el.dataset.target, 10);
            var dur    = 1800;
            var start  = performance.now();
            (function tick(now) {
              var t = Math.min((now - start) / dur, 1);
              el.textContent = Math.floor((1 - Math.pow(1 - t, 3)) * target);
              if (t < 1) requestAnimationFrame(tick);
              else el.textContent = target;
            })(performance.now());
          });
        }
      }, { threshold: 0.6 });
      cntObs.observe(statsBar);
    }
  }

})();
