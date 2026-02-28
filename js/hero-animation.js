/**
 * Hero Animation JS
 * Dynamically handles the cinemantic image slideshow and typing animation for the hero section.
 */

class HeroSlider {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Detect base path based on folder depth
        const depth = window.location.pathname.split('/').filter(p => p).length;
        this.basePath = (window.location.pathname.includes('/html/')) ? '../' : './';

        this.images = images.map(img => this.basePath + img);
        this.currentIndex = 0;
        this.slides = [];

        this.init();
    }

    init() {
        const overlay = document.createElement('div');
        overlay.className = 'hero-slider-overlay';
        this.container.appendChild(overlay);

        this.images.forEach((src, index) => {
            const slide = document.createElement('div');
            // Assign a unique animation class based on index for varied motion
            const animations = ['ken-burns-in', 'ken-burns-out', 'ken-burns-left', 'ken-burns-right'];
            const animClass = animations[index % animations.length];

            slide.className = `hero-slide ${animClass}`;
            if (index === 0) slide.classList.add('active');
            slide.style.backgroundImage = `url('${src}')`;
            this.container.appendChild(slide);
            this.slides.push(slide);
        });

        this.interval = setInterval(() => this.nextSlide(), 8000); // 8 seconds for a more relaxed pace
    }

    nextSlide() {
        const prevIndex = this.currentIndex;
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.slides[prevIndex].classList.remove('active');
        this.slides[prevIndex].classList.add('prev');
        this.slides[this.currentIndex].classList.add('active');
        setTimeout(() => {
            this.slides[prevIndex].classList.remove('prev');
        }, 3000); // Match new 3s CSS transition duration
    }
}

class HeroTypewriter {
    constructor(elementId, text, speed = 80) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.currentText = '';
        this.init();
    }

    init() {
        this.element.innerHTML = '<span class="typing-text"></span>';
        this.typingSpan = this.element.querySelector('.typing-text');
        // Initial delay before typing starts
        setTimeout(() => this.type(), 800);
    }

    type() {
        if (this.index < this.text.length) {
            const char = this.text.charAt(this.index);

            // Handle HTML tags properly
            if (char === '<') {
                const tagEnd = this.text.indexOf('>', this.index);
                const tag = this.text.substring(this.index, tagEnd + 1);
                this.currentText += tag;
                this.index = tagEnd + 1;
                // Don't wait after a tag, move to next char immediately or with very short delay
                this.type();
                return;
            } else {
                this.currentText += char;
                this.index++;
            }

            this.typingSpan.innerHTML = this.currentText;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.typingSpan.classList.add('finished');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Animation Integration
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Clean up the HTML: remove newlines and collapse multiple spaces to a single space
        const originalHTML = heroTitle.innerHTML
            .replace(/\n\s*/g, '') // Remove newline and all following indentation
            .replace(/\s{2,}/g, ' ') // Collapse remaining multiple spaces
            .trim();

        heroTitle.id = 'hero-typing-title';
        new HeroTypewriter('hero-typing-title', originalHTML, 150);
    }

    // 2. Hero Slider Integration
    const projectImages = [
        'RESIDENCIAL/THE OVERHANGE HOUSE/1.png',
        'RESIDENCIAL/OFFSET TOWERS/3.png',
        'INTERIOR/THE TERRA CANVAS/1.png',
        'COMMERCIAL/FACTORY SHED/1.png',
        'LANDSCAPE/VILLAGE HOME LANDSCAPE/1_10 - Photo.jpg',
        'RESIDENCIAL/THE SCREEN HOUSE/1_1 - Photo.jpg',
        'INTERIOR/THE GILDED QUARRY/1.png'
    ];

    let heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const sliderContainer = document.createElement('div');
        sliderContainer.id = 'heroSlider';
        sliderContainer.className = 'hero-slider-container';
        heroBackground.prepend(sliderContainer);
        new HeroSlider('heroSlider', projectImages);

        const existingMedia = heroBackground.querySelectorAll('video, img:not(.hero-slide)');
        existingMedia.forEach(el => {
            el.style.opacity = '0';
            el.style.position = 'absolute';
            el.style.zIndex = '-1';
        });
    }
});
