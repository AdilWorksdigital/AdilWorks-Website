// Mobile menu toggle
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');
burger.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => mainNav.classList.remove('open'))
);

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// Animated stat counters (trigger once, when hero is in view)
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCount);
      obs.disconnect();
    }
  });
}, { threshold: 0.4 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// Scroll reveal for section cards
const revealTargets = document.querySelectorAll(
  '.about-card, .service-card, .case-card, .testimonial-card, .process-step, .faq-item'
);
revealTargets.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => revealObserver.observe(el));

// Contact form — sends via Formspree so submissions land in hello.adilworks@gmail.com
// Setup: create a free form at https://formspree.io, connect it to hello.adilworks@gmail.com,
// then replace YOUR_FORM_ID in index.html's <form action="..."> with your real Formspree form ID.
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formNote.textContent = "Sending...";
  const data = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      formNote.textContent = "Thanks! We'll get back to you within a day.";
      form.reset();
    } else {
      formNote.textContent = "Something went wrong. Please try WhatsApp instead.";
    }
  } catch (err) {
    formNote.textContent = "Something went wrong. Please try WhatsApp instead.";
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
