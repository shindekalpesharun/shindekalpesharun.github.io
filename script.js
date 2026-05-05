/**
 * Portfolio Interaction Logic
 * "Nebula Glass" Theme
 */

document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    initBackgroundAnimation();
    initSmoothScroll();
    initMagneticButtons();
    initCustomCursor();
});

// --- Custom Cursor ---
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const links = document.querySelectorAll('a, button, .glass, .skill-pill');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('active'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

// --- Smooth Reveal Animations ---
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- Background Blob Movement ---
function initBackgroundAnimation() {
    const blobs = document.querySelectorAll('.blob');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth) - 0.5;
        const yPercent = (clientY / window.innerHeight) - 0.5;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const x = xPercent * speed;
            const y = yPercent * speed;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// --- Smooth Scrolling ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- Magnetic Button Effect ---
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .social-links a, .glass');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
}
