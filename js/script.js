/* ============================================================
   Dr. Bhati Dental Clinic — script.js
   Scroll Reveal · Form handler · Smooth UX
   ============================================================ */

// ---------- Reveal on Scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // trigger only once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// ---------- Navbar: hide/show on scroll (throttled via rAF) ----------
const nav = document.querySelector('nav');
nav.style.transition = 'transform 0.4s ease, opacity 0.4s ease';

let lastScrollY = window.scrollY;
let ticking = false;   // rAF guard — prevents multiple frames queuing

function updateNav() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    nav.style.transform = 'translateX(-50%) translateY(-100px)';
    nav.style.opacity = '0';
  } else {
    nav.style.transform = 'translateX(-50%) translateY(0)';
    nav.style.opacity = '1';
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

// passive: true tells browser we won't call preventDefault()
// — browser can scroll immediately without waiting for JS
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNav); // run once per frame max
    ticking = true;
  }
}, { passive: true });

// ---------- Form Submit ----------
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = '✓ Request Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.disabled = true;

    btn.style.animation = 'bounceUp .6s cubic-bezier(.34,1.56,.64,1)';

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.animation = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ---------- Smooth Anchor Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---------- Lazy load images (mobile bandwidth save) ----------
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy load supported
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
    img.decoding = 'async';
  });
}