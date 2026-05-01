// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Contact form submission handler
const submitBtn = document.querySelector('.btn-submit');
if (submitBtn) {
  submitBtn.addEventListener('click', function() {
    const name = document.querySelector('input[placeholder="John"]')?.value;
    const email = document.querySelector('input[type="email"]')?.value;
    if (!name || !email) {
      alert('Please fill in your name and email.');
      return;
    }
    alert('Thank you! We will be in touch shortly.');
  });
}

// Animate stats counters on scroll into view
function animateCounter(el, target, suffix, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

const statConfig = [
  { suffix: '+', val: 500 },
  { suffix: '+', val: 30 },
  { suffix: '%', val: 100 },
];

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-num').forEach((el, i) => {
          if (statConfig[i]) animateCounter(el, statConfig[i].val, statConfig[i].suffix);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// Fade-in service cards on scroll
const cards = document.querySelectorAll('.service-card');
if (cards.length && 'IntersectionObserver' in window) {
  cards.forEach(card => { card.style.opacity = '0'; card.style.transform = 'translateY(24px)'; card.style.transition = 'opacity .5s ease, transform .5s ease'; });
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => cardObserver.observe(card));
}
