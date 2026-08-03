// ==========================================================================
// CHEEZI UP — script.js
// ==========================================================================

// IMPORTANT: replace this with your real WhatsApp number (country code, no + or spaces)
// e.g. Pakistan number 0300-1234567 becomes "923001234567"
const WHATSAPP_NUMBER = "923106044622";

/* ---------- Real photo fallback ----------
   Every menu item and the hero try to load a real photo from /images/.
   If that photo file doesn't exist yet, this swaps in the built-in
   illustrated placeholder instead of leaving an empty box.
   Called directly from onerror="" attributes in index.html. */
function handleImgError(imgEl) {
  imgEl.style.display = 'none';
  const fallback = imgEl.nextElementSibling;
  if (fallback) fallback.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  initNavToggle();
  initMenuTabs();
  initOrderButtons();
  initScrollReveal();
  initBackToTop();
});

/* ---------- Footer year ---------- */
function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Menu category tabs ---------- */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.item-card');
  if (!tabs.length || !cards.length) return;

  function showCategory(category) {
    cards.forEach((card) => {
      card.classList.toggle('show', card.dataset.category === category);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      showCategory(tab.dataset.category);
    });
  });

  // Show the first category (Pizza) by default
  showCategory(tabs[0].dataset.category);
}

/* ---------- Per-item WhatsApp order buttons ---------- */
function initOrderButtons() {
  const buttons = document.querySelectorAll('.btn-order');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item || 'an item';
      const price = btn.dataset.price || '';
      const message = `Hi CHEEZI UP! I'd like to order: ${item} (${price}).`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- Back to top button ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 480);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
