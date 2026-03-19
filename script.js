/* =========================================================
   VESELIN MARTINOV PORTFOLIO — script.js
   ========================================================= */

// ── SCREENSHOT CLICK TO FOCUS ─────────────────────────────
document.querySelectorAll('.screenshot-stack').forEach(stack => {
  const shots = stack.querySelectorAll('.screenshot');
  shots.forEach(img => {
    img.addEventListener('click', () => {
      const isAlreadyFocused = img.classList.contains('is-focused');
      // remove focused from all in this stack
      shots.forEach(s => s.classList.remove('is-focused'));
      // toggle — click focused image again to unfocus
      if (!isAlreadyFocused) img.classList.add('is-focused');
    });
  });
});


const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});


// ── HAMBURGER ─────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 6px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -6px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});


// ── TERMINAL ANIMATION ────────────────────────────────────
const lines = [
  { type: 'prompt', text: 'python manage.py runserver' },
  { type: 'out',    text: 'Watching for file changes...' },
  { type: 'out',    text: 'Starting development server at http://127.0.0.1:8000/' },
  { type: 'blank' },
  { type: 'prompt', text: 'docker-compose up -d' },
  { type: 'success',text: '✓ db             Running' },
  { type: 'success',text: '✓ web            Running' },
  { type: 'success',text: '✓ nginx          Running' },
  { type: 'blank' },
  { type: 'prompt', text: 'python manage.py test' },
  { type: 'out',    text: 'Running 42 tests...' },
  { type: 'success',text: 'OK (42 tests, 0 failures)' },
  { type: 'blank' },
  { type: 'comment',text: '# Ready to ship. 🚀' },
];

const terminal = document.getElementById('terminal');
let lineIndex = 0;

function typeNextLine() {
  if (lineIndex >= lines.length) {
    setTimeout(() => {
      terminal.innerHTML = '';
      lineIndex = 0;
      setTimeout(typeNextLine, 800);
    }, 3000);
    return;
  }

  const line = lines[lineIndex];
  lineIndex++;

  if (line.type === 'blank') {
    terminal.insertAdjacentHTML('beforeend', '<span class="t-line">&nbsp;</span>');
    setTimeout(typeNextLine, 100);
    return;
  }

  const span = document.createElement('span');
  span.className = 't-line';

  let html = '';
  if (line.type === 'prompt')  html = `<span class="t-prompt">→ </span><span class="t-cmd">${line.text}</span>`;
  if (line.type === 'out')     html = `<span class="t-out">  ${line.text}</span>`;
  if (line.type === 'success') html = `<span class="t-success">  ${line.text}</span>`;
  if (line.type === 'comment') html = `<span class="t-comment">  ${line.text}</span>`;

  span.innerHTML = html;
  terminal.appendChild(span);
  terminal.scrollTop = terminal.scrollHeight;

  const delay = line.type === 'prompt' ? 900 : 200;
  setTimeout(typeNextLine, delay);
}

setTimeout(typeNextLine, 1200);


// ── INTERSECTION OBSERVER (fade-in + skill bars) ──────────
const fadeEls = document.querySelectorAll('.fade-in');
const barFills = document.querySelectorAll('.bar-fill');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(el => barObserver.observe(el));


// ── FADE-IN CLASSES ON SCROLL ELEMENTS ───────────────────
document.querySelectorAll('.project-card, .cert-card, .contact-link, .about-grid').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});


// ── CERT MODAL ────────────────────────────────────────────
const certModal     = document.getElementById('certModal');
const certModalImg  = document.getElementById('certModalImg');
const certModalLink = document.getElementById('certModalLink');
const certModalTitle= document.getElementById('certModalTitle');
const certModalClose= document.getElementById('certModalClose');

function openCertModal(img, pdf, title) {
  certModalImg.src       = img;
  certModalImg.alt       = title;
  certModalLink.href     = pdf;
  certModalTitle.textContent = title;
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCertModal() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.cert-node').forEach(node => {
  node.querySelector('.cert-node-card').addEventListener('click', () => {
    openCertModal(
      node.dataset.img,
      node.dataset.pdf,
      node.dataset.title
    );
  });
});

certModalClose.addEventListener('click', closeCertModal);
certModal.querySelector('.cert-modal-backdrop').addEventListener('click', closeCertModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCertModal(); });

// Diploma toggle
const diplomaCard = document.querySelector('.cert-diploma-card');
if (diplomaCard) {
  diplomaCard.querySelector('.cert-diploma-header').addEventListener('click', () => {
    diplomaCard.classList.toggle('is-open');
  });
}
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.opacity = '0.6';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.opacity = '1';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));