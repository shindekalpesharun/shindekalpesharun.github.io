// ===== THEME WITH RIPPLE ANIMATION =====
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const rippleContainer = document.getElementById('theme-ripple');
const saved = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', saved);

themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  // Get button position for ripple origin
  const rect = themeBtn.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  // Calculate the max radius needed to cover the whole viewport
  const maxDist = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY)
  );
  const diameter = maxDist * 2;

  // Ripple color = the NEXT theme's background color
  const rippleColor = next === 'dark' ? '#0a0a0a' : '#f2f2f2';

  // Create ripple element
  const circle = document.createElement('div');
  circle.className = 'ripple-circle';
  Object.assign(circle.style, {
    width: diameter + 'px',
    height: diameter + 'px',
    left: (originX - maxDist) + 'px',
    top: (originY - maxDist) + 'px',
    background: rippleColor,
  });

  rippleContainer.appendChild(circle);

  // Trigger animation on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      circle.classList.add('expanding');
    });
  });

  // Icon spin
  themeBtn.classList.remove('spinning');
  void themeBtn.offsetWidth; // reflow to restart animation
  themeBtn.classList.add('spinning');
  themeBtn.addEventListener('animationend', () => themeBtn.classList.remove('spinning'), { once: true });

  // Switch theme at midpoint of animation — freeze all transitions so
  // colors snap instantly under the ripple (no blank-page flash on reveal)
  setTimeout(() => {
    document.body.classList.add('no-transition');
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    // Re-enable transitions after one paint frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.remove('no-transition');
      });
    });
  }, 250);

  // Remove ripple after animation ends
  circle.addEventListener('animationend', () => {
    circle.remove();
  });
});

// ===== SPA NAVIGATION =====
const pages = {
  home: document.getElementById('page-home'),
  projects: document.getElementById('page-projects'),
  blog: document.getElementById('page-blog'),
};
const navLinks = document.querySelectorAll('.nav-link');

function showPage(name) {
  Object.values(pages).forEach(p => p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));
  if (pages[name]) pages[name].classList.add('active');
  const activeLink = document.querySelector(`.nav-link[data-page="${name}"]`);
  if (activeLink) activeLink.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    showPage(page);
    history.pushState({ page }, '', '#' + page);
  });
});

window.addEventListener('popstate', (e) => {
  const page = e.state?.page || 'home';
  showPage(page);
});

// Init from hash
const initHash = location.hash.replace('#', '') || 'home';
showPage(['home','projects','blog'].includes(initHash) ? initHash : 'home');

// Global nav helpers for buttons
window.goToProjects = () => { showPage('projects'); history.pushState({ page: 'projects' }, '', '#projects'); };
window.goToBlog = () => { showPage('blog'); history.pushState({ page: 'blog' }, '', '#blog'); };

// ===== ACCORDION: EXPERIENCE =====
window.toggleExp = (id) => {
  const item = document.getElementById(id);
  if (!item) return;
  item.classList.toggle('open');
};

// Open first exp by default
document.getElementById('exp-1')?.classList.add('open');

// ===== ACCORDION: OPEN SOURCE =====
window.toggleOss = (id) => {
  const item = document.getElementById(id);
  if (!item) return;
  item.classList.toggle('open');
};
