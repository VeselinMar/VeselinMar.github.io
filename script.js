/* =========================================================
   VESELIN MARTINOV PORTFOLIO — script.js
   ========================================================= */

/* ─────────────────────────────────────────────
   PROJECT GALLERIES
   ───────────────────────────────────────────── */

const fullscreen =
  document.getElementById('imageFullscreen');

const fullscreenImage =
  document.getElementById('fullscreenImage');

const fullscreenStage =
  document.getElementById('fullscreenStage');

const fullscreenPrev =
  document.getElementById('fullscreenPrev');

const fullscreenNext =
  document.getElementById('fullscreenNext');

const fullscreenClose =
  document.getElementById('fullscreenClose');

const fullscreenCurrent =
  document.getElementById('fullscreenCurrent');

const fullscreenTotal =
  document.getElementById('fullscreenTotal');

const zoomIn =
  document.getElementById('zoomIn');

const zoomOut =
  document.getElementById('zoomOut');

const zoomLevel =
  document.getElementById('zoomLevel');


let activeGallery = null;
let activeImages = [];
let activeIndex = 0;

let zoom = 1;

let panX = 0;
let panY = 0;

let isDragging = false;

let dragStartX = 0;
let dragStartY = 0;

let startPanX = 0;
let startPanY = 0;


/* ─────────────────────────────────────────────
   PROJECT GALLERIES
   ───────────────────────────────────────────── */

document.querySelectorAll('.project-gallery').forEach(gallery => {

  const mainImage =
    gallery.querySelector('.gallery-main-image');

  const thumbnails =
    [...gallery.querySelectorAll('.gallery-thumb')];

  const previous =
    gallery.querySelector('.gallery-prev');

  const next =
    gallery.querySelector('.gallery-next');

  const currentCounter =
    gallery.querySelector('.gallery-current');

  const totalCounter =
    gallery.querySelector('.gallery-total');


  let currentIndex = 0;


  function showImage(index) {

    if (index < 0) {
      index = thumbnails.length - 1;
    }

    if (index >= thumbnails.length) {
      index = 0;
    }

    currentIndex = index;

    const thumbnail =
      thumbnails[index];

    mainImage.src =
      thumbnail.dataset.image;

    mainImage.alt =
      thumbnail.dataset.alt;


    thumbnails.forEach((thumb, i) => {

      thumb.classList.toggle(
        'is-active',
        i === index
      );

    });


    currentCounter.textContent =
      String(index + 1).padStart(2, '0');

    totalCounter.textContent =
      String(thumbnails.length).padStart(2, '0');

  }


  thumbnails.forEach((thumbnail, index) => {

    thumbnail.addEventListener('click', () => {
      showImage(index);
    });

  });


  previous.addEventListener('click', () => {
    showImage(currentIndex - 1);
  });


  next.addEventListener('click', () => {
    showImage(currentIndex + 1);
  });


  /* ─────────────────────────────────────────
     OPEN FULLSCREEN
     ───────────────────────────────────────── */

  mainImage.addEventListener('click', async () => {

    activeGallery = gallery;

    activeImages =
      thumbnails.map(thumbnail => ({
        src: thumbnail.dataset.image,
        alt: thumbnail.dataset.alt
      }));

    activeIndex = currentIndex;

    openFullscreen();

  });


  showImage(0);

});

/* ─────────────────────────────────────────────
   FULLSCREEN
   ───────────────────────────────────────────── */

async function openFullscreen() {

  zoom = 1;

  panX = 0;
  panY = 0;

  updateFullscreenImage();

  fullscreen.setAttribute(
    'aria-hidden',
    'false'
  );


  try {

    await fullscreen.requestFullscreen();

  } catch (error) {

    console.error(
      'Fullscreen unavailable:',
      error
    );

  }

}


function updateFullscreenImage() {

  const image =
    activeImages[activeIndex];

  if (!image) return;

  fullscreenImage.src =
    image.src;

  fullscreenImage.alt =
    image.alt;


  fullscreenCurrent.textContent =
    String(activeIndex + 1).padStart(2, '0');

  fullscreenTotal.textContent =
    String(activeImages.length).padStart(2, '0');


  resetZoom();

}


function showFullscreenImage(index) {

  if (index < 0) {
    index = activeImages.length - 1;
  }

  if (index >= activeImages.length) {
    index = 0;
  }

  activeIndex = index;

  updateFullscreenImage();

}

fullscreenPrev.addEventListener(
  'click',
  event => {

    event.stopPropagation();

    showFullscreenImage(
      activeIndex - 1
    );

  }
);


fullscreenNext.addEventListener(
  'click',
  event => {

    event.stopPropagation();

    showFullscreenImage(
      activeIndex + 1
    );

  }
);

/* ─────────────────────────────────────────────
   ZOOM
   ───────────────────────────────────────────── */

function updateZoom() {

  fullscreenImage.style.transform =
    `translate(${panX}px, ${panY}px) scale(${zoom})`;

  zoomLevel.textContent =
    `${Math.round(zoom * 100)}%`;
}


function resetZoom() {

  zoom = 1;

  panX = 0;
  panY = 0;

  updateZoom();
}


function changeZoom(amount) {

  zoom += amount;

  zoom =
    Math.max(
      1,
      Math.min(4, zoom)
    );

  if (zoom === 1) {

    panX = 0;
    panY = 0;

  }

  updateZoom();
}


zoomIn.addEventListener(
  'click',
  event => {

    event.stopPropagation();

    changeZoom(0.25);

  }
);


zoomOut.addEventListener(
  'click',
  event => {

    event.stopPropagation();

    changeZoom(-0.25);

  }
);

fullscreenStage.addEventListener(
  'wheel',
  event => {

    event.preventDefault();

    const amount =
      event.deltaY < 0
        ? 0.15
        : -0.15;

    changeZoom(amount);

  },
  { passive: false }
);

fullscreenImage.addEventListener(
  'dblclick',
  event => {

    event.preventDefault();

    if (zoom === 1) {

      zoom = 2;

    } else {

      zoom = 1;

      panX = 0;
      panY = 0;

    }

    updateZoom();

  }
);

fullscreenImage.addEventListener(
  'mousedown',
  event => {

    if (zoom <= 1) return;

    isDragging = true;

    fullscreenStage.classList.add(
      'is-dragging'
    );

    dragStartX = event.clientX;
    dragStartY = event.clientY;

    startPanX = panX;
    startPanY = panY;

  }
);


window.addEventListener(
  'mousemove',
  event => {

    if (!isDragging) return;

    panX =
      startPanX +
      (event.clientX - dragStartX);

    panY =
      startPanY +
      (event.clientY - dragStartY);

    updateZoom();

  }
);


window.addEventListener(
  'mouseup',
  () => {

    isDragging = false;

    fullscreenStage.classList.remove(
      'is-dragging'
    );

  }
);

document.addEventListener(
  'keydown',
  event => {

    if (
      !document.fullscreenElement ||
      document.fullscreenElement !== fullscreen
    ) {
      return;
    }


    switch (event.key) {

      case 'ArrowLeft':

        event.preventDefault();

        showFullscreenImage(
          activeIndex - 1
        );

        break;


      case 'ArrowRight':

        event.preventDefault();

        showFullscreenImage(
          activeIndex + 1
        );

        break;


      case '+':

      case '=':

        event.preventDefault();

        changeZoom(0.25);

        break;


      case '-':

      case '_':

        event.preventDefault();

        changeZoom(-0.25);

        break;


      case '0':

        event.preventDefault();

        resetZoom();

        break;

    }

  }
);

fullscreenClose.addEventListener(
  'click',
  event => {

    event.stopPropagation();

    closeFullscreen();

  }
);


async function closeFullscreen() {

  if (document.fullscreenElement) {

    try {

      await document.exitFullscreen();

    } catch (error) {

      console.error(
        'Could not exit fullscreen:',
        error
      );

    }

  }

}

document.addEventListener(
  'fullscreenchange',
  () => {

    const isFullscreen =
      document.fullscreenElement === fullscreen;


    fullscreen.setAttribute(
      'aria-hidden',
      String(!isFullscreen)
    );


    if (!isFullscreen) {

      activeGallery = null;

      activeImages = [];

      activeIndex = 0;

      resetZoom();

    }

  }
);


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
  { type: 'comment',text: '# Ready to ship. ' },
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