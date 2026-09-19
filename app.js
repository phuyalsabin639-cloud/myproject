const root = document.body;
const showcaseGrid = document.getElementById('showcaseGrid');
const layoutButtons = document.querySelectorAll('.layout-option');
const themeButtons = document.querySelectorAll('.theme-option');
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.main-nav');
const speedControl = document.getElementById('speedControl');
const densityControl = document.getElementById('densityControl');
const speedValue = document.getElementById('speedValue');
const densityValue = document.getElementById('densityValue');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');
const modalStatOne = document.getElementById('modalStatOne');
const modalStatTwo = document.getElementById('modalStatTwo');
const modalStatThree = document.getElementById('modalStatThree');
const countEls = document.querySelectorAll('[data-count]');

const state = { speed: Number(speedControl.value), density: Number(densityControl.value), theme: root.dataset.theme || 'aurora' };

function updateSliderLabels() {
  speedValue.textContent = `${state.speed.toFixed(1)}x`;
  densityValue.textContent = `${state.density}%`;
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButtons.forEach((button) => button.classList.toggle('active', button.dataset.theme === theme));
  state.theme = theme;
}

function setLayout(layout) {
  showcaseGrid.dataset.layout = layout;
  layoutButtons.forEach((button) => button.classList.toggle('active', button.dataset.layout === layout));
}

function updateCounts() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  countEls.forEach((element) => {
    const target = Number(element.dataset.count || 0);
    if (prefersReducedMotion) {
      element.textContent = target;
      return;
    }

    let value = 0;
    const step = Math.max(1, target / 40);
    const timer = setInterval(() => {
      value += step;
      if (value >= target) {
        element.textContent = target.toString();
        clearInterval(timer);
        return;
      }
      element.textContent = Number(value.toFixed(1)).toString();
    }, 16);
  });
}

speedControl.addEventListener('input', (event) => {
  state.speed = Number(event.target.value);
  updateSliderLabels();
});

densityControl.addEventListener('input', (event) => {
  state.density = Number(event.target.value);
  updateSliderLabels();
});

themeButtons.forEach((button) => button.addEventListener('click', () => applyTheme(button.dataset.theme)));
layoutButtons.forEach((button) => button.addEventListener('click', () => setLayout(button.dataset.layout)));

mobileToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
});

function closeMobileNav() {
  nav.classList.remove('open');
  mobileToggle.setAttribute('aria-expanded', 'false');
}

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileNav));

const cards = document.querySelectorAll('.showcase-card');

function openModal(card) {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modalImage.src = card.dataset.image;
  modalImage.alt = `${card.dataset.title} showcase`;
  modalCategory.textContent = card.dataset.category;
  modalTitle.textContent = card.dataset.title;
  modalDescription.textContent = card.dataset.description;

  modalTags.innerHTML = '';
  card.dataset.tags.split(',').forEach((tag) => {
    const item = document.createElement('span');
    item.textContent = tag.trim();
    modalTags.appendChild(item);
  });

  modalStatOne.textContent = card.dataset.statOne;
  modalStatTwo.textContent = card.dataset.statTwo;
  modalStatThree.textContent = card.dataset.statThree;
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

cards.forEach((card) => {
  card.addEventListener('click', () => openModal(card));
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    const rotateY = (offsetX - 0.5) * 22;
    const rotateX = (0.5 - offsetY) * 22;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(card);
    }
  });
});

modal.addEventListener('click', (event) => {
  if (event.target.matches('[data-close="modal"]')) closeModal();
});

document.querySelector('.modal-close').addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

updateSliderLabels();
setLayout('grid');
applyTheme('aurora');
updateCounts();

const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
const pointer = { x: 0, y: 0, active: false };
let particles = [];

const themes = {
  aurora: ['#7cf6ff', '#a78bfa', '#60a5fa', '#b4f7d5'],
  cyber: ['#60a5fa', '#22d3ee', '#f472b6', '#a78bfa'],
  warm: ['#ffbe7b', '#ff8d5c', '#f9d976', '#f0b4a4'],
  mono: ['#f3f5f7', '#dfe4ea', '#bec7d2', '#ffffff']
};

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const targetCount = Math.max(40, Math.min(112, Math.round((rect.width * rect.height) / 18 * (state.density / 100))));
  particles = Array.from({ length: targetCount }, () => ({
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    radius: Math.random() * 2.4 + 1.2
  }));
}

function drawBackground() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
}

function drawParticles() {
  const rect = canvas.getBoundingClientRect();
  const colors = themes[state.theme] || themes.aurora;

  for (let i = 0; i < particles.length; i += 1) {
    const particle = particles[i];

    if (pointer.active) {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance < 160) {
        const force = (160 - distance) / 160;
        particle.vx -= (dx / distance) * force * 0.08;
        particle.vy -= (dy / distance) * force * 0.08;
      }
    }

    particle.x += particle.vx * state.speed * 1.7;
    particle.y += particle.vy * state.speed * 1.7;

    if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;

    particle.x = Math.min(Math.max(0, particle.x), rect.width);
    particle.y = Math.min(Math.max(0, particle.y), rect.height);

    for (let j = i + 1; j < particles.length; j += 1) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.hypot(dx, dy) || 1;

      if (distance < 110) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(124, 246, 255, ${0.15 - distance / 900})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const fill = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
  }
}

function animateCanvas() {
  drawBackground();
  drawParticles();
  requestAnimationFrame(animateCanvas);
}

canvas.addEventListener('pointermove', (event) => {
  const rect = canvas.getBoundingClientRect();
  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;
  pointer.active = true;
});
canvas.addEventListener('pointerleave', () => { pointer.active = false; });
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateCanvas();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) {
  state.speed = 0.8;
  speedControl.value = String(state.speed);
  updateSliderLabels();
}
