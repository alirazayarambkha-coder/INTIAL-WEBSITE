const WHATSAPP_NUMBER = '923106044622';

const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const tabs = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.menu-card');
const orderButtons = document.querySelectorAll('.menu-card button');
const whatsappFloat = document.querySelector('[data-whatsapp]');
const year = document.querySelector('[data-year]');

if (year) year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
});

navToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    tabs.forEach((item) => {
      item.classList.toggle('active', item === tab);
      item.setAttribute('aria-selected', String(item === tab));
    });
    cards.forEach((card) => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

function openWhatsApp(item = 'a CHEEZI UP order', price = '') {
  const detail = price ? `${item} (${price})` : item;
  const message = `Hi CHEEZI UP! I would like to order ${detail}.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

orderButtons.forEach((button) => {
  button.addEventListener('click', () => openWhatsApp(button.dataset.item, button.dataset.price));
});

whatsappFloat?.addEventListener('click', (event) => {
  event.preventDefault();
  openWhatsApp();
});

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('in-view');
});
