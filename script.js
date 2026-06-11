// ============================================================
//  RENDER ENGINE — reads from data.js and builds the DOM
// ============================================================

// ── Helpers ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

// Build thumb: either a CSS class or an image URL
function thumbStyle(thumb) {
  if (thumb.startsWith('http') || thumb.startsWith('/') || thumb.startsWith('.')) {
    return `style="background-image:url('${thumb}');background-size:cover;background-position:center;"`;
  }
  return `class="project-thumb ${thumb}"`;
}

// ── Render: Profile / Hero ────────────────────────────────────
function renderHero() {
  const githubSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`;

  const socialsHtml = PROFILE.socials.map(s => {
    const inner = s.icon === 'github' ? githubSvg : s.label;
    return `<a href="${s.url}" title="${s.title}" class="social-btn" ${s.url.startsWith('http') ? 'target="_blank"' : ''}>${inner}</a>`;
  }).join('');

  const heroHtml = `
    <div class="kaizen-bg" aria-hidden="true">改善</div>
    <div class="hero-profile">
      <div class="avatar-wrap">
        <img src="${PROFILE.avatar}"
             onerror="this.src='https://ui-avatars.com/api/?name=Kalpesh+Shinde&background=3b82f6&color=fff&size=120'"
             alt="${PROFILE.name}" class="avatar" />
      </div>
      <div class="hero-info">
        <h1>${PROFILE.name} <span class="verified">✓</span></h1>
        <p class="hero-sub mono">${PROFILE.tagline}</p>
        <div class="social-icons">${socialsHtml}</div>
      </div>
    </div>`;

  document.querySelectorAll('.hero-section').forEach(s => s.innerHTML = heroHtml);
}

// ── Render: About ─────────────────────────────────────────────
function renderAbout() {
  document.querySelectorAll('.about-text').forEach(el => el.textContent = PROFILE.about);
}

// ── Render: Experience ────────────────────────────────────────
function renderExperience() {
  const html = EXPERIENCE.map(e => `
    <div class="exp-item${e.openByDefault ? ' open' : ''}" id="${e.id}">
      <div class="exp-header" onclick="toggleAccordion('${e.id}')">
        <div class="exp-left">
          <div class="exp-logo">${e.logo}</div>
          <span class="mono exp-company-name">${e.company}</span>
          <span class="mono exp-role">/ ${e.role}</span>
        </div>
        <div class="exp-right">
          <span class="mono exp-date">${e.period}</span>
          <span class="exp-chevron">⌄</span>
        </div>
      </div>
      <div class="exp-body">
        <ul>${e.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>
    </div>`).join('');

  document.querySelectorAll('.exp-list').forEach(c => c.innerHTML = html);
}

// ── Render: Projects ──────────────────────────────────────────
function buildProjectCard(p) {
  const linksHtml = p.links.map(l =>
    `<a href="${l.url}" target="_blank" class="proj-link-btn">${l.label}</a>`
  ).join('');
  const tagsHtml = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  const isUrl = p.thumb.startsWith('http') || p.thumb.startsWith('/') || p.thumb.startsWith('.');

  return `
    <div class="project-card">
      <div class="project-thumb ${isUrl ? '' : p.thumb}"${isUrl ? ` style="background-image:url('${p.thumb}');background-size:cover;background-position:center;"` : ''}>
        <div class="thumb-overlay"><span>${p.name}</span></div>
      </div>
      <div class="project-info">
        <div class="project-top">
          <h3 class="project-name">${p.name}</h3>
          <div class="project-links">${linksHtml}</div>
        </div>
        <p class="project-desc mono">${p.desc}</p>
        <div class="project-tags">${tagsHtml}</div>
      </div>
    </div>`;
}

function renderProjects() {
  // Home: limited list
  const homeList = $('project-list-home');
  if (homeList) {
    homeList.innerHTML = PROJECTS.slice(0, HOME_PROJECTS_LIMIT).map(buildProjectCard).join('');
  }
  // Projects page: full list
  const allList = $('project-list-all');
  if (allList) {
    allList.innerHTML = PROJECTS.map(buildProjectCard).join('');
  }
}

// ── Render: Open Source ───────────────────────────────────────
function renderOSS() {
  const html = OPEN_SOURCE.map(o => {
    const parts = o.repo.split(o.repoBold);
    const repoHtml = parts[0] + `<strong>${o.repoBold}</strong>` + (parts[1] || '');
    return `
      <div class="oss-item" id="${o.id}">
        <div class="oss-header" onclick="toggleAccordion('${o.id}')">
          <div class="oss-left">
            <span class="oss-icon ${o.iconClass}">⑂</span>
            <span class="mono oss-repo">${repoHtml}</span>
            <span class="mono oss-desc">${o.summary}</span>
          </div>
          <span class="exp-chevron">⌄</span>
        </div>
        <div class="oss-body mono">${o.detail}</div>
      </div>`;
  }).join('');

  document.querySelectorAll('.oss-list').forEach(c => c.innerHTML = html);
}

// ── Render: Skills ────────────────────────────────────────────
function renderSkills() {
  const html = SKILLS.map(s => `<span class="skill-chip">${s}</span>`).join('');
  document.querySelectorAll('.skills-wrap').forEach(c => c.innerHTML = html);
}

// ── Render: Blog ──────────────────────────────────────────────
function buildBlogItem(b) {
  return `
    <div class="blog-item">
      <div class="blog-left">
        <h3 class="blog-title">${b.title}</h3>
        <p class="blog-excerpt mono">${b.excerpt}</p>
        <a href="${b.url}" target="_blank" class="read-more mono">Read more →</a>
      </div>
      <span class="blog-date mono">${b.date}</span>
    </div>`;
}

function renderBlogs() {
  const homeList = $('blog-list-home');
  if (homeList) {
    homeList.innerHTML = BLOGS.slice(0, HOME_BLOGS_LIMIT).map(buildBlogItem).join('');
  }
  const allList = $('blog-list-all');
  if (allList) {
    allList.innerHTML = BLOGS.map(buildBlogItem).join('');
  }
}

// ── Accordion (shared for exp + oss) ─────────────────────────
window.toggleAccordion = (id) => {
  const item = $(id);
  if (item) item.classList.toggle('open');
};

// ── Run all renders ───────────────────────────────────────────
function renderAll() {
  renderHero();
  renderAbout();
  renderExperience();
  renderProjects();
  renderOSS();
  renderSkills();
  renderBlogs();
}

// ============================================================
//  THEME WITH RIPPLE ANIMATION
// ============================================================
const root = document.documentElement;
const themeBtn = $('theme-toggle');
const rippleContainer = $('theme-ripple');
const saved = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', saved);

themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  const rect = themeBtn.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const maxDist = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY)
  );
  const diameter = maxDist * 2;
  const rippleColor = next === 'dark' ? '#0a0a0a' : '#f2f2f2';

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

  requestAnimationFrame(() => requestAnimationFrame(() => circle.classList.add('expanding')));

  // Icon spin
  themeBtn.classList.remove('spinning');
  void themeBtn.offsetWidth;
  themeBtn.classList.add('spinning');
  themeBtn.addEventListener('animationend', () => themeBtn.classList.remove('spinning'), { once: true });

  // Snap theme under the ripple at midpoint — no flash
  setTimeout(() => {
    document.body.classList.add('no-transition');
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove('no-transition')));
  }, 250);

  circle.addEventListener('animationend', () => circle.remove());
});

// ============================================================
//  SPA NAVIGATION
// ============================================================
const pages = {
  home: $('page-home'),
  projects: $('page-projects'),
  blog: $('page-blog'),
};
const navLinks = document.querySelectorAll('.nav-link');

function showPage(name) {
  Object.values(pages).forEach(p => p && p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));
  if (pages[name]) pages[name].classList.add('active');
  const activeLink = document.querySelector(`.nav-link[data-page="${name}"]`);
  if (activeLink) activeLink.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    showPage(page);
    history.pushState({ page }, '', '#' + page);
  });
});

window.addEventListener('popstate', e => showPage(e.state?.page || 'home'));

window.goToProjects = () => { showPage('projects'); history.pushState({ page: 'projects' }, '', '#projects'); };
window.goToBlog     = () => { showPage('blog');     history.pushState({ page: 'blog' },     '', '#blog');     };

// ── Boot ──────────────────────────────────────────────────────
renderAll();
const initHash = location.hash.replace('#', '');
showPage(['home', 'projects', 'blog'].includes(initHash) ? initHash : 'home');
