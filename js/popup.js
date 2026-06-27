// ============================================================
//  popup.js — Lead Generation Popup for One Fitness
//  Timer persists across page navigation via sessionStorage.
//  Shown once per browser session; dismissed state in localStorage.
// ============================================================

(function () {
  const POPUP_SHOWN_KEY   = 'onefitness_popup_shown';
  const TIMER_START_KEY   = 'onefitness_popup_timer_start';
  const DELAY_MS          = 5000; // 5 seconds total across pages
  const WEB3FORMS_KEY     = 'be07ce67-c90a-4c8a-a29d-3699a1e990a4';

  // ── Guard: never show again once dismissed/submitted ──────
  if (localStorage.getItem(POPUP_SHOWN_KEY)) return;

  // ── Timer: record first-ever visit timestamp ───────────────
  if (!sessionStorage.getItem(TIMER_START_KEY)) {
    sessionStorage.setItem(TIMER_START_KEY, Date.now().toString());
  }

  const elapsed  = Date.now() - parseInt(sessionStorage.getItem(TIMER_START_KEY), 10);
  const remaining = Math.max(0, DELAY_MS - elapsed);

  // ── Inject popup HTML ──────────────────────────────────────
  function injectPopup() {
    const overlay = document.createElement('div');
    overlay.id = 'of-popup-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'of-popup-heading');

    overlay.innerHTML = `
      <div id="of-popup-card">
        <button id="of-popup-close" aria-label="Close popup">&times;</button>

        <div id="of-popup-badge">LIMITED OFFER</div>

        <h2 id="of-popup-heading">🎉 Claim Your FREE Trial</h2>
        <p id="of-popup-subtitle">
          Experience One Fitness before joining.<br>Fill in your details below.
        </p>

        <form id="of-popup-form" novalidate>
          <div class="of-field-group">
            <label for="of-name">Full Name</label>
            <input
              type="text"
              id="of-name"
              name="name"
              placeholder="John"
              required
              autocomplete="name"
            />
          </div>

          <div class="of-field-group">
            <label for="of-email">Email Address</label>
            <input
              type="email"
              id="of-email"
              name="email"
              placeholder="@example.com"
              required
              autocomplete="email"
            />
          </div>

          <div class="of-field-group">
            <label for="of-phone">Phone Number</label>
            <input
              type="tel"
              id="of-phone"
              name="phone"
              placeholder="+91 98765 43210"
              required
              autocomplete="tel"
            />
          </div>

          <!-- Web3Forms honeypot -->
          <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" aria-hidden="true">

          <button type="submit" id="of-popup-submit">
            <span id="of-submit-text">Claim Free Trial</span>
            <span id="of-submit-spinner" hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </span>
          </button>
        </form>

        <p id="of-popup-privacy">
          🔒 We respect your privacy. No spam, ever.
        </p>
      </div>
    `;

    document.body.appendChild(overlay);
    // Trigger fade-in on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('of-popup-visible'));
    });

    bindEvents(overlay);
  }

  // ── Success modal ──────────────────────────────────────────
  function showSuccessModal() {
    const modal = document.createElement('div');
    modal.id = 'of-success-overlay';
    modal.innerHTML = `
      <div id="of-success-card">
        <div id="of-success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12l3 3 5-5"/>
          </svg>
        </div>
        <h3>You're All Set! 💪</h3>
        <p>Thank you! Your free trial request has been received.<br>Our team will contact you shortly.</p>
        <button id="of-success-close">Got it!</button>
      </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => modal.classList.add('of-popup-visible'));
    });
    document.getElementById('of-success-close').addEventListener('click', () => {
      modal.classList.remove('of-popup-visible');
      setTimeout(() => modal.remove(), 350);
    });
  }

  // ── Close popup cleanly ────────────────────────────────────
  function closePopup(overlay) {
    overlay.classList.remove('of-popup-visible');
    setTimeout(() => overlay.remove(), 350);
    localStorage.setItem(POPUP_SHOWN_KEY, '1');
  }

  // ── Event bindings ─────────────────────────────────────────
  function bindEvents(overlay) {
    // Close button
    document.getElementById('of-popup-close')
      .addEventListener('click', () => closePopup(overlay));

    // Click outside card
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup(overlay);
    });

    // Escape key
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closePopup(overlay);
        document.removeEventListener('keydown', escHandler);
      }
    });

    // Form submit
    document.getElementById('of-popup-form')
      .addEventListener('submit', handleSubmit.bind(null, overlay));
  }

  // ── Form submission via Web3Forms ──────────────────────────
  async function handleSubmit(overlay, e) {
    e.preventDefault();
    const form    = e.target;
    const submitBtn  = document.getElementById('of-popup-submit');
    const submitText = document.getElementById('of-submit-text');
    const spinner    = document.getElementById('of-submit-spinner');

    // Basic client-side validation
    const name  = form.querySelector('#of-name').value.trim();
    const email = form.querySelector('#of-email').value.trim();
    const phone = form.querySelector('#of-phone').value.trim();

    if (!name || !email || !phone) {
      shakeForm(form);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.querySelector('#of-email').focus();
      shakeField(form.querySelector('#of-email'));
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitText.hidden  = true;
    spinner.hidden     = false;

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject:    'New Free Trial Request — One Fitness',
        from_name:  'One Fitness Website',
        name,
        email,
        phone,
        botcheck: form.querySelector('[name="botcheck"]').checked,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        closePopup(overlay);
        setTimeout(showSuccessModal, 380);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('[One Fitness Popup]', err);
      submitBtn.disabled = false;
      submitText.hidden  = false;
      spinner.hidden     = true;
      showInlineError(form, 'Something went wrong. Please try again.');
    }
  }

  // ── Micro-interactions ─────────────────────────────────────
  function shakeForm(form) {
    form.classList.add('of-shake');
    form.addEventListener('animationend', () => form.classList.remove('of-shake'), { once: true });
  }
  function shakeField(field) {
    field.classList.add('of-shake');
    field.addEventListener('animationend', () => field.classList.remove('of-shake'), { once: true });
  }
  function showInlineError(form, msg) {
    let err = form.querySelector('.of-inline-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'of-inline-error';
      form.appendChild(err);
    }
    err.textContent = msg;
  }

  // ── Kick off timer ─────────────────────────────────────────
  setTimeout(injectPopup, remaining);
})();