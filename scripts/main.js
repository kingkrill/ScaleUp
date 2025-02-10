class MainApp {
    constructor() {
        this.isMobile = this.checkIfMobile();
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.menuOpen = false;
        this.initializeBookingButtons();
        this.init();
    }

    checkIfMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    init() {
        this.initializeTheme();
        this.initializeComponents();
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeFormsValidation();
        this.initializeScrollEffects();
        this.initializeStars();
        this.initializeMobileMenu();
        this.initializeTouchEvents();
        this.initializeWorkspaceSection();
        this.initializeBookTourButtons();
        if (this.isMobile) {
            this.optimizeForMobile();
        }
    }
    initializeBookTourButtons() {
        const bookTourButtons = document.querySelectorAll('.book-tour-btn');
        
        bookTourButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showBookingModal();
            });
        });
    }

    showBookingModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="bookingModalLabel">Book a Tour</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="bookingForm" class="needs-validation" novalidate>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Full Name *</label>
                                    <input type="text" class="form-control" id="name" name="name" required>
                                    <div class="invalid-feedback">Please enter your name</div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email Address *</label>
                                    <input type="email" class="form-control" id="email" name="email" required>
                                    <div class="invalid-feedback">Please enter a valid email address</div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="phone" class="form-label">Phone Number *</label>
                                    <input type="tel" class="form-control" id="phone" name="phone" required>
                                    <div class="invalid-feedback">Please enter your phone number</div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="preferredDate" class="form-label">Preferred Date *</label>
                                    <input type="date" class="form-control" id="preferredDate" name="preferredDate" required>
                                    <div class="invalid-feedback">Please select a date</div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="preferredTime" class="form-label">Preferred Time *</label>
                                    <select class="form-select" id="preferredTime" name="preferredTime" required>
                                        <option value="">Choose a time...</option>
                                        <option value="morning">Morning (9AM - 12PM)</option>
                                        <option value="afternoon">Afternoon (1PM - 4PM)</option>
                                        <option value="evening">Evening (5PM - 7PM)</option>
                                    </select>
                                    <div class="invalid-feedback">Please select a time</div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="message" class="form-label">Additional Notes</label>
                                    <textarea class="form-control" id="message" name="message" rows="3"></textarea>
                                </div>

                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">Submit Booking Request</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to document if it doesn't exist
        if (!document.getElementById('bookingModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        // Initialize modal
        const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
        modal.show();

        // Handle form submission
        const form = document.getElementById('bookingForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';

            try {
                // Collect form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                this.showNotification('success', 'Your booking request has been sent! We\'ll contact you shortly.');
                
                // Close modal
                modal.hide();
                
                // Reset form
                form.reset();
                form.classList.remove('was-validated');

            } catch (error) {
                console.error('Booking error:', error);
                this.showNotification('error', 'Something went wrong. Please try again.');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Submit Booking Request';
            }
        });

        // Set minimum date to today
        const dateInput = document.getElementById('preferredDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', 'dark');
        
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }
    
    initializeWorkspaceSection() {
        if (this.isMobile) {
            this.adjustWorkspaceMobileLayout();
        }
        
        // Handle resize events
        window.addEventListener('resize', () => {
            if (this.isMobile) {
                this.adjustWorkspaceMobileLayout();
            }
        });
    }

    adjustWorkspaceMobileLayout() {
        const workspaceSection = document.querySelector('.workspaces-section');
        const workspaceCards = document.querySelectorAll('.workspace-card');
        
        if (workspaceSection && workspaceCards.length) {
            // Reset any existing styles
            workspaceSection.style.height = 'auto';
            workspaceCards.forEach(card => {
                card.style.height = 'auto';
                card.style.width = '100%';
                card.style.margin = '10px 0';
            });

            // Add mobile-specific styles
            workspaceSection.classList.add('mobile-workspace-layout');
        }
    }

    initializeMobileMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileNav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-overlay');
        const mobileMenuItems = document.querySelectorAll('.mobile-nav .nav-item');

        if (hamburger && mobileNav) {
            hamburger.addEventListener('click', () => {
                this.toggleMobileMenu(hamburger, mobileNav, overlay);
            });

            // Close menu when clicking overlay
            if (overlay) {
                overlay.addEventListener('click', () => {
                    this.closeMobileMenu(hamburger, mobileNav, overlay);
                });
            }

            // Handle mobile menu items
            mobileMenuItems.forEach(item => {
                const dropdownToggle = item.querySelector('.dropdown-toggle');
                if (dropdownToggle) {
                    dropdownToggle.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.toggleMobileSubmenu(item);
                    });
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.menuOpen) {
                    this.closeMobileMenu(hamburger, mobileNav, overlay);
                }
            });
        }
    }

    toggleMobileMenu(hamburger, mobileNav, overlay) {
        this.menuOpen = !this.menuOpen;
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = this.menuOpen ? 'hidden' : '';
        
        if (this.menuOpen) {
            // Animate menu items
            const menuItems = mobileNav.querySelectorAll('.nav-item');
            menuItems.forEach((item, index) => {
                item.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
            });
        }
    }

    closeMobileMenu(hamburger, mobileNav, overlay) {
        this.menuOpen = false;
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleMobileSubmenu(item) {
        const submenu = item.querySelector('.dropdown-menu');
        const arrow = item.querySelector('.dropdown-arrow');
        
        if (submenu && arrow) {
            const isExpanded = submenu.classList.contains('show');
            
            // Close other open submenus
            const otherSubmenus = document.querySelectorAll('.mobile-nav .dropdown-menu.show');
            const otherArrows = document.querySelectorAll('.mobile-nav .dropdown-arrow.rotated');
            
            otherSubmenus.forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove('show');
                    menu.style.maxHeight = null;
                }
            });
            
            otherArrows.forEach(arr => {
                if (arr !== arrow) {
                    arr.classList.remove('rotated');
                }
            });

            // Toggle current submenu
            submenu.classList.toggle('show');
            arrow.classList.toggle('rotated');
            
            if (!isExpanded) {
                submenu.style.maxHeight = submenu.scrollHeight + "px";
            } else {
                submenu.style.maxHeight = null;
            }
        }
    }
    initializeComponents() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: this.isMobile ? 'click' : 'hover'
        }));

        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
            trigger: this.isMobile ? 'click' : 'hover'
        }));

        this.initializeModals();
        this.initializePricingToggle();
        this.initializeGallery();
        this.initializeSliderTouchSupport();
    }

    initializeTouchEvents() {
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            // Calculate swipe distance
            const diffX = this.touchEndX - this.touchStartX;
            const diffY = touchEndY - touchStartY;

            // Only handle horizontal swipes if they're more horizontal than vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
                this.handleSwipe(diffX);
            }
        }, { passive: true });

        // Add touch feedback for interactive elements
        const interactiveElements = document.querySelectorAll(
            'button, .btn, .nav-link, .gallery-item, .card'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
                element.style.opacity = '0.8';
            }, { passive: true });

            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
            }, { passive: true });
        });
    }

    handleSwipe(diff) {
        const swipeThreshold = 50;
        const mobileNav = document.querySelector('.mobile-nav');
        const hamburger = document.querySelector('.hamburger-menu');
        const overlay = document.querySelector('.mobile-overlay');

        if (Math.abs(diff) > swipeThreshold) {
            // Handle gallery swipe
            const galleryModal = document.querySelector('.gallery-modal.show');
            if (galleryModal) {
                if (diff > 0) {
                    this.showPreviousImage(galleryModal);
                } else {
                    this.showNextImage(galleryModal);
                }
                return;
            }

            // Handle mobile menu swipe
            if (mobileNav && hamburger) {
                if (diff < 0 && !this.menuOpen) {
                    // Swipe left to open menu
                    this.toggleMobileMenu(hamburger, mobileNav, overlay);
                } else if (diff > 0 && this.menuOpen) {
                    // Swipe right to close menu
                    this.closeMobileMenu(hamburger, mobileNav, overlay);
                }
            }
        }
    }

    optimizeForMobile() {
        // Reduce animations and effects for better performance
        document.body.classList.add('mobile-optimized');

        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Optimize scroll performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleMobileScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Adjust font sizes for better readability
        const textElements = document.querySelectorAll('p, .card-text, .nav-link');
        textElements.forEach(element => {
            const currentSize = window.getComputedStyle(element).fontSize;
            const newSize = Math.max(16, parseInt(currentSize)) + 'px';
            element.style.fontSize = newSize;
        });

        // Increase touch targets
        const touchTargets = document.querySelectorAll('button, .btn, .nav-link, a');
        touchTargets.forEach(target => {
            target.style.minHeight = '44px';
            target.style.minWidth = '44px';
            target.style.padding = '12px';
        });
    }

    handleMobileScroll() {
        // Handle header visibility
        const header = document.querySelector('.site-header');
        if (header) {
            const currentScroll = window.pageYOffset;
            if (currentScroll > this.lastScroll && currentScroll > 100) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            this.lastScroll = currentScroll;
        }

        // Update active section in mobile menu
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.mobile-nav .nav-link');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    initializeSliderTouchSupport() {
        const sliders = document.querySelectorAll('.slider-container');
        
        sliders.forEach(slider => {
            let startX;
            let scrollLeft;
            let isDown = false;
            let momentum = 0;
            let animationFrame;

            const handleDragStart = (e) => {
                isDown = true;
                slider.classList.add('active');
                startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
                scrollLeft = slider.scrollLeft;
                cancelAnimationFrame(animationFrame);
            };

            const handleDragEnd = () => {
                isDown = false;
                slider.classList.remove('active');
                
                // Apply momentum scrolling
                const scroll = () => {
                    if (Math.abs(momentum) > 0.1) {
                        slider.scrollLeft += momentum;
                        momentum *= 0.95;
                        animationFrame = requestAnimationFrame(scroll);
                    }
                };
                scroll();
            };

            const handleDragMove = (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
                const walk = (x - startX) * 2;
                const prevScroll = slider.scrollLeft;
                slider.scrollLeft = scrollLeft - walk;
                momentum = slider.scrollLeft - prevScroll;
            };

            // Mouse Events
            slider.addEventListener('mousedown', handleDragStart);
            slider.addEventListener('mouseleave', handleDragEnd);
            slider.addEventListener('mouseup', handleDragEnd);
            slider.addEventListener('mousemove', handleDragMove);

            // Touch Events
            slider.addEventListener('touchstart', handleDragStart, { passive: true });
            slider.addEventListener('touchend', handleDragEnd);
            slider.addEventListener('touchmove', handleDragMove, { passive: false });
        });
    }

    initializeGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        let currentIndex = 0;

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (this.isMobile) {
                    this.showMobileGalleryPreview(item, index);
                } else {
                    const modalId = item.getAttribute('data-modal-target');
                    const modal = new bootstrap.Modal(document.getElementById(modalId));
                    modal.show();
                }
            });
        });

        // Add swipe navigation for mobile gallery
        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer && this.isMobile) {
            let touchStartX = 0;
            let touchEndX = 0;

            galleryContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            galleryContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                const diff = touchEndX - touchStartX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0 && currentIndex > 0) {
                        currentIndex--;
                        this.showGalleryItem(currentIndex);
                    } else if (diff < 0 && currentIndex < galleryItems.length - 1) {
                        currentIndex++;
                        this.showGalleryItem(currentIndex);
                    }
                }
            }, { passive: true });
        }
    }

    showMobileGalleryPreview(item, index) {
        const preview = document.createElement('div');
        preview.className = 'mobile-gallery-preview';
        preview.innerHTML = `
            <div class="preview-content">
                <img src="${item.getAttribute('data-full-img')}" alt="${item.getAttribute('data-title')}">
                <div class="preview-info">
                    <h3>${item.getAttribute('data-title')}</h3>
                    <p>${item.getAttribute('data-description')}</p>
                </div>
                <div class="preview-controls">
                    <button class="prev-btn" ${index === 0 ? 'disabled' : ''}>Previous</button>
                    <button class="close-btn">Close</button>
                    <button class="next-btn" ${index === document.querySelectorAll('.gallery-item').length - 1 ? 'disabled' : ''}>Next</button>
                </div>
            </div>
        `;

        document.body.appendChild(preview);
        document.body.style.overflow = 'hidden';

        // Handle preview controls
        const closeBtn = preview.querySelector('.close-btn');
        const prevBtn = preview.querySelector('.prev-btn');
        const nextBtn = preview.querySelector('.next-btn');

        closeBtn.addEventListener('click', () => {
            preview.remove();
            document.body.style.overflow = '';
        });

        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                preview.remove();
                this.showMobileGalleryPreview(
                    document.querySelectorAll('.gallery-item')[index - 1],
                    index - 1
                );
            }
        });

        nextBtn.addEventListener('click', () => {
            const items = document.querySelectorAll('.gallery-item');
            if (index < items.length - 1) {
                preview.remove();
                this.showMobileGalleryPreview(items[index + 1], index + 1);
            }
        });
                // Add pinch-to-zoom functionality for mobile gallery preview
                const previewImage = preview.querySelector('img');
                let currentScale = 1;
                let initialDistance = 0;
        
                preview.addEventListener('touchstart', (e) => {
                    if (e.touches.length === 2) {
                        initialDistance = Math.hypot(
                            e.touches[0].pageX - e.touches[1].pageX,
                            e.touches[0].pageY - e.touches[1].pageY
                        );
                    }
                }, { passive: true });
        
                preview.addEventListener('touchmove', (e) => {
                    if (e.touches.length === 2) {
                        const currentDistance = Math.hypot(
                            e.touches[0].pageX - e.touches[1].pageX,
                            e.touches[0].pageY - e.touches[1].pageY
                        );
                        
                        const scale = currentDistance / initialDistance;
                        currentScale = Math.min(Math.max(1, currentScale * scale), 3);
                        previewImage.style.transform = `scale(${currentScale})`;
                        e.preventDefault();
                    }
                }, { passive: false });
            }
        
            initializeFormsValidation() {
                const forms = document.querySelectorAll('.needs-validation');
                forms.forEach(form => {
                    // Mobile-specific form handling
                    if (this.isMobile) {
                        const inputs = form.querySelectorAll('input, textarea, select');
                        inputs.forEach(input => {
                            // Prevent zoom on focus for iOS
                            input.style.fontSize = '16px';
        
                            // Smooth scroll to input when focused
                            input.addEventListener('focus', () => {
                                setTimeout(() => {
                                    input.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'center'
                                    });
                                }, 300);
                            });
        
                            // Add clear button for text inputs
                            if (['text', 'email', 'tel', 'search'].includes(input.type)) {
                                const clearButton = document.createElement('button');
                                clearButton.type = 'button';
                                clearButton.className = 'clear-input';
                                clearButton.innerHTML = '×';
                                clearButton.style.display = 'none';
        
                                input.parentNode.style.position = 'relative';
                                input.parentNode.appendChild(clearButton);
        
                                input.addEventListener('input', () => {
                                    clearButton.style.display = input.value ? 'block' : 'none';
                                });
        
                                clearButton.addEventListener('click', () => {
                                    input.value = '';
                                    clearButton.style.display = 'none';
                                    input.focus();
                                });
                            }
                        });
                    }
        
                    // Enhanced form validation
                    form.addEventListener('submit', this.handleFormSubmit.bind(this));
                    
                    // Real-time validation
                    form.querySelectorAll('input, textarea, select').forEach(input => {
                        input.addEventListener('blur', () => {
                            this.validateField(input);
                        });
                    });
                });
            }
        
            validateField(field) {
                const validityState = field.validity;
                const errorElement = field.nextElementSibling?.classList.contains('invalid-feedback') 
                    ? field.nextElementSibling 
                    : null;
        
                if (!validityState.valid) {
                    field.classList.add('is-invalid');
                    if (errorElement) {
                        errorElement.textContent = this.getValidationMessage(field, validityState);
                    }
                } else {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid');
                }
            }
        
            getValidationMessage(field, validityState) {
                if (validityState.valueMissing) return `${field.name} is required`;
                if (validityState.typeMismatch) {
                    switch (field.type) {
                        case 'email': return 'Please enter a valid email address';
                        case 'tel': return 'Please enter a valid phone number';
                        case 'url': return 'Please enter a valid URL';
                        default: return 'Please enter a valid value';
                    }
                }
                if (validityState.tooShort) return `Minimum ${field.minLength} characters required`;
                if (validityState.tooLong) return `Maximum ${field.maxLength} characters allowed`;
                if (validityState.patternMismatch) return field.dataset.errorPattern || 'Please match the requested format';
                
                return 'Please enter a valid value';
            }
        
            async handleFormSubmit(event) {
                event.preventDefault();
                const form = event.target;
                const submitButton = form.querySelector('button[type="submit"]');
        
                if (!form.checkValidity()) {
                    event.stopPropagation();
                    form.classList.add('was-validated');
                    
                    // Scroll to first invalid field
                    const firstInvalid = form.querySelector(':invalid');
                    if (firstInvalid) {
                        firstInvalid.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        firstInvalid.focus();
                    }
                    return;
                }
        
                try {
                    submitButton.disabled = true;
                    submitButton.innerHTML = `
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="ms-2">Processing...</span>
                    `;
        
                    // Collect form data
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
        
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1500));
        
                    this.showNotification('success', 'Form submitted successfully!');
                    form.reset();
                    form.classList.remove('was-validated');
        
                    // Close modal if form is in modal
                    const modal = form.closest('.modal');
                    if (modal) {
                        bootstrap.Modal.getInstance(modal).hide();
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    this.showNotification('error', 'Something went wrong. Please try again.');
                } finally {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Submit';
                }
            }
            showNotification(type, message) {
                // Check if we should use mobile-optimized notifications
                if (this.isMobile) {
                    const notification = document.createElement('div');
                    notification.className = `mobile-notification ${type}`;
                    notification.innerHTML = `
                        <div class="notification-content">
                            <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                            <span class="notification-message">${message}</span>
                        </div>
                    `;
        
                    document.body.appendChild(notification);
        
                    // Animate notification
                    setTimeout(() => notification.classList.add('show'), 100);
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => notification.remove(), 300);
                    }, 3000);
                } else {
                    // Use SweetAlert for desktop
                    Swal.fire({
                        icon: type,
                        text: message,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer);
                            toast.addEventListener('mouseleave', Swal.resumeTimer);
                        }
                    });
                }
            }
        
            getNotificationIcon(type) {
                switch (type) {
                    case 'success': return '✓';
                    case 'error': return '✕';
                    case 'warning': return '!';
                    case 'info': return 'i';
                    default: return '';
                }
            }
        
            initializeAnimations() {
                // Optimize animations for mobile
                if (this.isMobile) {
                    this.initializeMobileAnimations();
                } else {
                    this.initializeDesktopAnimations();
                }
            }
        
            initializeMobileAnimations() {
                const animatedElements = document.querySelectorAll('.animate-on-scroll');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animated');
                            // Unobserve after animation to save resources
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.2,
                    rootMargin: '50px'
                });
        
                animatedElements.forEach(element => observer.observe(element));
            }
        
            initializeDesktopAnimations() {
                // More complex animations for desktop
                const fadeElements = document.querySelectorAll('.fade-in');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, {
                    threshold: 0.1
                });
        
                fadeElements.forEach(element => observer.observe(element));
            }
        }
        
        // ReviewsSlider Class
        class ReviewsSlider {
            constructor() {
                this.container = document.querySelector('.reviews-slider-container');
                this.track = document.querySelector('.reviews-track');
                this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                this.init();
            }
        
            init() {
                if (!this.container || !this.track) return;
        
                // Clone items for seamless scrolling
                const items = this.track.querySelectorAll('.review-item');
                items.forEach(item => {
                    const clone = item.cloneNode(true);
                    this.track.appendChild(clone);
                });
        
                if (this.isMobile) {
                    this.initializeMobileReviews();
                } else {
                    this.initializeDesktopReviews();
                }
            }
        
            initializeMobileReviews() {
                let startX, currentX;
                const sensitivity = 0.5;
        
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    this.track.style.transition = 'none';
                }, { passive: true });
        
                this.track.addEventListener('touchmove', (e) => {
                    if (!startX) return;
                    currentX = e.touches[0].clientX;
                    const diff = (currentX - startX) * sensitivity;
                    this.track.style.transform = `translateX(${diff}px)`;
                }, { passive: true });
        
                this.track.addEventListener('touchend', () => {
                    this.track.style.transition = 'transform 0.3s ease-out';
                    this.track.style.transform = 'translateX(0)';
                    startX = null;
                });
            }
        
            initializeDesktopReviews() {
                this.container.addEventListener('mouseenter', () => {
                    this.track.style.animationPlayState = 'paused';
                });
        
                this.container.addEventListener('mouseleave', () => {
                    this.track.style.animationPlayState = 'running';
                });
            }
        }
        
        // Initialize the application when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            const app = new MainApp();
            window.app = app; // Make app instance available globally if needed
        });