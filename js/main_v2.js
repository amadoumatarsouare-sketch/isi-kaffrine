/* =========================
   UTILITAIRES
========================= */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

/* =========================
   MENU MOBILE
========================= */
const menuToggle = $('#menu-toggle');
const navMenu = $('#nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });
}

/* =========================
   HEADER SCROLL + SCROLL TOP
   (UN SEUL LISTENER SCROLL)
========================= */
const header = $('#header');
const scrollTopBtn = $('#scrollTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Header
  if (header) {
    header.classList.toggle('scrolled', scrollY > 100);
  }

  // Bouton scroll top
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('visible', scrollY > 300);
  }
});

/* =========================
   SCROLL TOP CLICK
========================= */
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================
   NAVIGATION ACTIVE AU SCROLL
========================= */
const sections = $$('section[id]');
const navLinks = $$('#nav-menu a');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = $(`#nav-menu a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach(section => observer.observe(section));

/* =========================
   LIGHTBOX (IMAGES & VIDEOS)
========================= */
const lightbox = $('#lightbox');

if (lightbox) {
  const lightboxContent = lightbox.querySelector('.content');
  const lightboxClose = lightbox.querySelector('.close');

  $$('.lightbox-item').forEach(media => {
    media.addEventListener('click', () => {
      lightboxContent.innerHTML = '';
      const clone = media.cloneNode(true);
      clone.controls = true;
      lightboxContent.appendChild(clone);
      lightbox.classList.add('show');
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightbox.classList.remove('show');
    lightboxContent.innerHTML = '';
  });
}

/* =========================
   FERMETURE AVEC ESC
========================= */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (navMenu) navMenu.classList.remove('active');
    if (lightbox) lightbox.classList.remove('show');
  }
});

/* =========================
   LAZY LOADING IMAGES
========================= */
const lazyImages = $$('img[data-src]');

const lazyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      lazyObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => lazyObserver.observe(img));

/* =========================
   NEWSLETTER (SANS ALERT)
========================= */
const newsletterForm = $('#newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newsletterForm.querySelector('.message');
    if (message) {
      message.textContent = 'Merci pour votre inscription ✅';
      message.classList.add('success');
    }
    newsletterForm.reset();
  });
}

/* =========================
   ANIMATION AU SCROLL
========================= */
const animatedItems = $$('.animate');

const animateObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      animateObserver.unobserve(entry.target);
    }
  });
});

animatedItems.forEach(item => animateObserver.observe(item));

