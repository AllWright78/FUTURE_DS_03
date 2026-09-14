// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Booking form — client-side validation + demo submission
const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const arrivee = new Date(data.get('arrivee'));
  const depart = new Date(data.get('depart'));

  if (data.get('arrivee') && data.get('depart') && depart <= arrivee) {
    status.textContent = "La date de départ doit être postérieure à la date d'arrivée.";
    status.style.color = '#B3261E';
    return;
  }

  // In production this would POST to a reservation endpoint / the Mini CRM API.
  status.style.color = '';
  status.textContent = `Merci ${data.get('nom') || ''} ! Votre demande pour la ${data.get('suite')} a bien été reçue. Notre équipe vous recontacte sous 24h.`;
  form.reset();
});

// Reveal-on-scroll for section headers
const revealTargets = document.querySelectorAll('.section-title, .about-copy, .booking-intro');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});
