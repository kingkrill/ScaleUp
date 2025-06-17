class AnimationManager {
    constructor() {
        this.initializeScrollAnimations();
        this.initializeParallaxEffects();
        this.initializeHoverEffects();
        this.initializeTextAnimations();
        this.setupReviewsSlider();
        this.initializeCounters();
        this.initializeParticles();
    }

    initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.fade-up, .fade-in, .scale-in, .slide-in, .reveal-up, .reveal-left, .reveal-right'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('counter')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        animatedElements.forEach(element => observer.observe(element));
    }

    initializeParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    initializeHoverEffects() {
        const cards = document.querySelectorAll('.card, .amenity-card, .location-card, .plan-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // Add shine effect
                const shine = card.querySelector('.card-shine') || this.createShineElement(card);
                const shineSizeMultiplier = 2;
                const shineSize = Math.max(card.offsetWidth, card.offsetHeight) * shineSizeMultiplier;
                
                shine.style.width = shine.style.height = `${shineSize}px`;
                shine.style.left = `${x - shineSize/2}px`;
                shine.style.top = `${y - shineSize/2}px`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouse-x', '0px');
                card.style.setProperty('--mouse-y', '0px');
            });
        });
    }

    createShineElement(card) {
        const shine = document.createElement('div');
        shine.className = 'card-shine';
        card.appendChild(shine);
        return shine;
    }

    initializeTextAnimations() {
        const textElements = document.querySelectorAll('.animate-text');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'char';
                span.style.animationDelay = `${index * 0.1}s`;
                element.appendChild(span);
            });
        });
    }

    setupReviewsSlider() {
        const slider = document.querySelector('.reviews-slider');
        if (!slider) return;

        const track = slider.querySelector('.reviews-track');
        const reviews = track.querySelectorAll('.review-card');
        
        // Clone reviews for infinite scroll
        reviews.forEach(review => {
            const clone = review.cloneNode(true);
            track.appendChild(clone);
        });

        // Pause animation on hover
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });

        // Touch events for mobile
        let startX, scrollLeft;
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const x = e.touches[0].pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    initializeParticles() {
        const canvas = document.createElement('canvas');
        canvas.className = 'particles-canvas';
        document.querySelector('.hero-section')?.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.reset();
                if (this.y < 0 || this.y > canvas.height) this.reset();
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        const createParticles = () => {
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        };

        createParticles();
        animate();
    }

    addFloatingAnimation(element) {
        element.classList.add('floating');
    }

    removeFloatingAnimation(element) {
        element.classList.remove('floating');
    }

    // Utility method to add loading state
    addLoadingState(element, text = 'Loading...') {
        const originalContent = element.innerHTML;
        element.setAttribute('data-original-content', originalContent);
        element.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            ${text}
        `;
        element.disabled = true;
    }

    // Utility method to remove loading state
    removeLoadingState(element) {
        const originalContent = element.getAttribute('data-original-content');
        if (originalContent) {
            element.innerHTML = originalContent;
            element.removeAttribute('data-original-content');
        }
        element.disabled = false;
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationManager = new AnimationManager();

    // Add floating animation to specific elements
    document.querySelectorAll('.hero-image, .feature-icon').forEach(element => {
        animationManager.addFloatingAnimation(element);
    });
});

export default AnimationManager;