/**
 * Portfolio Interaction Logic
 * Synced with Resume Content
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initTypewriter();
    init3DTilt();
    initMobileNav();
    initRevealAnimations();
    initSmoothScroll();
    initProjectFiltering();
    initTerminalAnimation();
});

// --- Theme Switcher ---
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// --- Typewriter Effect ---
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const professions = [
        "Mobile Lead Developer",
        "Flutter & Android Expert",
        "Full-Stack Engineer",
        "System Architect"
    ];
    let profIndex = 0; let charIndex = 0; let isDeleting = false; let typeSpeed = 100;

    function type() {
        const currentText = professions[profIndex];
        typewriterElement.textContent = isDeleting ? currentText.substring(0, charIndex - 1) : currentText.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) { isDeleting = true; typeSpeed = 2000; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; profIndex = (profIndex + 1) % professions.length; typeSpeed = 500; }
        setTimeout(type, typeSpeed);
    }
    if (typewriterElement) type();
}

// --- 3D Tilt Effect ---
function init3DTilt() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const centerX = rect.width / 2; const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10; const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    });
}

// --- Terminal Animation ---
function initTerminalAnimation() {
    const terminal = document.getElementById('terminal');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const command = "kalpesh --skills";
    let hasRun = false;

    const skillsData = {
        "languages": ["TypeScript", "JavaScript", "Dart", "Kotlin", "Java", "Python", "Go"],
        "mobile": ["Flutter", "Android (Jetpack Compose)", "iOS", "BLoC", "MVVM", "Clean Architecture", "Hilt DI"],
        "backend": ["Node.js", "Express.js", "Next.js", "FastAPI", "Prisma ORM"],
        "databases": ["PostgreSQL", "Redis", "Firebase", "MongoDB", "SQLite", "MySQL", "Room"],
        "cloud_devops": ["AWS (EC2, S3)", "Docker", "Git", "GitHub Actions", "CI/CD", "Codemagic"],
        "tools": ["Xcode", "Android Studio", "Firebase Crashlytics", "ExifTool", "REST APIs", "GraphQL"]
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasRun) {
            hasRun = true;
            typeCommand();
        }
    }, { threshold: 0.5 });

    if (terminal) observer.observe(terminal);

    function typeCommand() {
        let i = 0;
        const interval = setInterval(() => {
            input.textContent += command[i];
            i++;
            if (i === command.length) {
                clearInterval(interval);
                setTimeout(showOutput, 500);
            }
        }, 100);
    }

    function showOutput() {
        const jsonStr = JSON.stringify(skillsData, null, 2);
        let i = 0;
        const interval = setInterval(() => {
            let char = jsonStr[i];
            if (char === '{' || char === '}' || char === '[' || char === ']') char = `<span class="json-bracket">${char}</span>`;
            output.innerHTML += char;
            i++;
            if (i === jsonStr.length) clearInterval(interval);
        }, 2);
    }
}

// --- Utilities ---
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initSmoothScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        });
    });
}

function initProjectFiltering() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                const tags = card.getAttribute('data-tags');
                if (tags) card.style.display = (filter === 'all' || tags.includes(filter)) ? 'flex' : 'none';
            });
        });
    });
}
