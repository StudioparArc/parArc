// ========== MODERN ENHANCEMENTS JS ==========

// ========== CUSTOM CURSOR ==========
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.dotX = 0;
        this.dotY = 0;
        this.init();
    }

    init() {
        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';

        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor-dot';

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);

        // Hide system cursor globally on desktop
        if (window.innerWidth > 768) {
            document.documentElement.style.cursor = 'none';
            // Also force none on all interactive elements
            const style = document.createElement('style');
            style.innerHTML = `
                * { cursor: none !important; }
            `;
            document.head.appendChild(style);
        }

        // Track global mouse position
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Animation loop for "surfing" follow effect
        const render = () => {
            // LERP for smooth follow (Linear Interpolation)
            // Outer circle is slower (0.1) for the surfing feel
            this.cursorX += (this.mouseX - this.cursorX) * 0.1;
            this.cursorY += (this.mouseY - this.cursorY) * 0.1;

            // Inner dot is faster (0.3) for responsiveness
            this.dotX += (this.mouseX - this.dotX) * 0.35;
            this.dotY += (this.mouseY - this.dotY) * 0.35;

            this.cursor.style.transform = `translate3d(${this.cursorX}px, ${this.cursorY}px, 0) translate(-50%, -50%)`;
            this.cursorDot.style.transform = `translate3d(${this.dotX}px, ${this.dotY}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(render);
        };
        render();

        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .service-card, .nav-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.cursorDot.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.cursorDot.classList.remove('cursor-hover');
            });
        });
    }
}

// ========== SCROLL PROGRESS INDICATOR ==========
class ScrollProgress {
    constructor() {
        this.init();
    }

    init() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}

// ========== MAGNETIC BUTTONS ==========
class MagneticButtons {
    constructor() {
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.btn, .project-card');

        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ========== ENHANCED SCROLL ANIMATIONS ==========
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }
}

// ========== PARALLAX EFFECTS ==========
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Hero parallax
            const heroImage = document.querySelector('.hero-image');
            const heroContent = document.querySelector('.hero-content');

            if (heroImage && scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * 0.4}px) scale(1.1)`;
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                    heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.6));
                }
            }

            // Parallax for project images
            const projectImages = document.querySelectorAll('.project-image-container img');
            projectImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = 0.1;
                    const yPos = -(rect.top * speed);
                    img.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }
}

// ========== LOADING ANIMATION ==========
class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';

        // Find logo source robustly
        let logoSrc = 'logo.png';
        const logoImg = document.querySelector('.logo-image') || document.querySelector('.logo img') || document.querySelector('img[src*="logo.png"]');

        if (logoImg) {
            logoSrc = logoImg.src;
        } else {
            // Intelligent fallback: try to find the project root from current script path
            const scripts = document.getElementsByTagName('script');
            const currentScript = Array.from(scripts).find(s => s.src.includes('modern-enhancements.js'));
            if (currentScript) {
                logoSrc = currentScript.src.replace('js/modern-enhancements.js', 'logo.png');
            }
        }

        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo-wrapper">
                    <img src="${logoSrc}" alt="parArc Logo" class="loader-logo-image" onerror="this.src='logo.png'">
                </div>
                <div class="loader-bar"></div>
            </div>
        `;
        document.body.appendChild(loader);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('loaded');
                setTimeout(() => loader.remove(), 600);
            }, 800);
        });
    }
}

// ========== SMOOTH SCROLL ==========
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ========== BACK TO TOP BUTTON ==========
class BackToTop {
    constructor() {
        this.init();
    }

    init() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML = '<i data-lucide="arrow-up" style="width: 20px; height: 20px;"></i>';
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// ========== IMAGE LAZY LOADING WITH BLUR ==========
class LazyLoadImages {
    constructor() {
        this.init();
    }

    init() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ========== TEXT REVEAL ANIMATION ==========
class TextReveal {
    constructor() {
        this.init();
    }

    init() {
        const titles = document.querySelectorAll('.hero-title, .section-title');

        titles.forEach(title => {
            const text = title.textContent;
            const words = text.split(' ');
            title.innerHTML = words.map(word =>
                `<span class="word"><span class="word-inner">${word}</span></span>`
            ).join(' ');
        });
    }
}

// ========== CONTENT PROTECTION ==========
class ContentProtection {
    constructor() {
        this.init();
    }

    init() {
        // Prevent Right Click globally
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Prevent dragging of images manually via JS
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
                e.preventDefault();
            }
        });

        // Prevent keyboard shortcuts for saving/copying
        document.addEventListener('keydown', (e) => {
            // Check for Ctrl or Cmd keys
            if (e.ctrlKey || e.metaKey) {
                const key = e.key.toLowerCase();
                // Block C (Copy), S (Save), U (View Source), P (Print)
                if (key === 'c' || key === 's' || key === 'u' || key === 'p') {
                    e.preventDefault();
                }
            }
            // Block Dev Tools shortcuts (Ctrl+Shift+I/J/C)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
                const key = e.key.toLowerCase();
                if (key === 'i' || key === 'j' || key === 'c') {
                    e.preventDefault();
                }
            }
            // Block F12
            if (e.key === 'F12') {
                e.preventDefault();
            }
        });
    }
}

// ========== INITIALIZE ALL ENHANCEMENTS ==========
document.addEventListener('DOMContentLoaded', () => {
    // Check if on desktop (cursor only for desktop)
    const isDesktop = window.innerWidth > 768;

    new PageLoader();
    new ScrollProgress();
    new ScrollAnimations();
    new ParallaxEffect();
    new SmoothScroll();
    new BackToTop();
    new LazyLoadImages();
    new MagneticButtons();
    new ContentProtection();

    if (isDesktop) {
        new CustomCursor();
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
