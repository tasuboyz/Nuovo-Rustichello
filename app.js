// Nuovo Rustichello - Modern Restaurant Website JavaScript
// ES6+ Implementation with modern features

class NuovoRustichelloApp {
    constructor() {
        this.currentSlide = 0;
        this.galleryItems = [];
        this.menuItems = [];
        this.currentModalIndex = 0;
        this.isLoading = true;
        this.observers = new Map(); // For Intersection Observers
        
    // Bind methods
    // handleScroll: throttle calls to updateScrollEffects (there is no prototype method named handleScroll)
    this.handleScroll = this.throttle(this.updateScrollEffects.bind(this), 100);
    this.handleResize = this.debounce(this.handleResize.bind(this), 250);
        
        this.init();
    }

    async init() {
        await this.showLoadingScreen();
        this.initNavigation();
        this.initHeroSlider();
        this.loadGalleryData();
        this.loadMenuData();
        this.initScrollAnimations();
        this.initModal();
        this.initFilters();
        this.initForm();
        this.initScrollEffects();
        this.initMapInteractions();
        this.hideLoadingScreen();
        this.setupEventListeners();
    }

    // ===== LOADING SCREEN =====
    async showLoadingScreen() {
        return new Promise(resolve => {
            const progressBar = document.getElementById('loading-progress');
            let progress = 0;
            
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(resolve, 500);
                }
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            }, 100);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    // ===== NAVIGATION =====
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection.offsetTop - 80);
                    
                    // Close mobile menu
                    navToggle?.classList.remove('active');
                    navMenu?.classList.remove('active');
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        });
    }

    // ===== HERO SLIDER =====
    initHeroSlider() {
        const backgrounds = document.querySelectorAll('.hero-bg');
        if (backgrounds.length === 0) return;

        const words = document.querySelectorAll('.word');
        
        // Animate words
        words.forEach((word, index) => {
            const delay = parseInt(word.dataset.delay) || 0;
            setTimeout(() => {
                word.style.animationDelay = `${delay}ms`;
                word.style.opacity = '1';
            }, delay);
        });

        // Background slideshow
        setInterval(() => {
            backgrounds[this.currentSlide].classList.remove('active');
            this.currentSlide = (this.currentSlide + 1) % backgrounds.length;
            backgrounds[this.currentSlide].classList.add('active');
        }, 5000);
    }

    // ===== GALLERY DATA =====
    loadGalleryData() {
        this.galleryItems = [
            {
                id: 1,
                category: 'atmosfera',
                title: 'Esterno del Ristorante',
                description: 'Il caratteristico esterno del Nuovo Rustichello nel cuore di Brescia',
                image: './images/esterno.jpg'
            },
            {
                id: 2,
                category: 'atmosfera',
                title: 'Ambiente Interno',
                description: 'La calda atmosfera familiare che ci contraddistingue',
                image: './images/interno.jpg'
            },
            {
                id: 3,
                category: 'piatti',
                title: 'Selezione di Piatti',
                description: 'Una ricca varietà di specialità della tradizione lombarda',
                image: './images/piatti.jpg'
            },
            {
                id: 4,
                category: 'piatti',
                title: 'Pasta Fatta in Casa',
                description: 'Pasta fresca preparata quotidianamente nelle nostre cucine',
                image: './images/pastasciutta.jpg'
            },
            {
                id: 5,
                category: 'specialita',
                title: 'Risotto Cacio e Pepe',
                description: 'Una delle nostre specialità più apprezzate',
                image: './images/RISOTTO Cacio e Pepe.jpg'
            },
            {
                id: 6,
                category: 'specialita',
                title: 'Risotto della Settimana',
                description: 'Creazione settimanale con ingredienti di stagione e abbinamento vini',
                image: './images/🟣 RISOTTO DELLA SETTIMANA 🟣Vino rosso CurtefrancaCaprinoNoccioleVieni a provarlo ☎️ 030 25203.webp'
            }
        ];

        this.renderGallery();
    }

    renderGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = this.galleryItems.map(item => `
            <div class="gallery-item" data-category="${item.category}" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click listeners for modal
        galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const itemId = parseInt(item.dataset.id);
                this.openModal(itemId);
            });
        });
    }

    // ===== MENU DATA =====
    loadMenuData() {
        this.menuItems = [
            {
                id: 1,
                category: 'antipasti',
                title: 'Antipasto della Casa',
                description: 'Selezione di salumi e formaggi lombardi con mostarda di Cremona',
                price: '€15',
                image: './images/piatti.jpg'
            },
            {
                id: 2,
                category: 'antipasti',
                title: 'Bruschette della Tradizione',
                description: 'Bruschette con pomodorini freschi, basilico e olio extravergine',
                price: '€8',
                image: './images/piatti.jpg'
            },
            {
                id: 3,
                category: 'primi',
                title: 'Tortellini in Brodo',
                description: 'Tortellini fatti a mano serviti nel tradizionale brodo di cappone',
                price: '€12',
                image: './images/pastasciutta.jpg'
            },
            {
                id: 4,
                category: 'primi',
                title: 'Tagliatelle al Ragù',
                description: 'Pasta fresca con ragù di carne cotto a fuoco lento per 4 ore',
                price: '€14',
                image: './images/pastasciutta.jpg'
            },
            {
                id: 5,
                category: 'risotti',
                title: 'Risotto alla Milanese',
                description: 'Il classico risotto con zafferano, burro e Parmigiano Reggiano',
                price: '€16',
                image: './images/RISOTTO Cacio e Pepe.jpg'
            },
            {
                id: 6,
                category: 'risotti',
                title: 'Risotto Cacio e Pepe',
                description: 'La nostra interpretazione del classico romano con tocco lombardo',
                price: '€18',
                image: './images/RISOTTO Cacio e Pepe.jpg'
            },
            {
                id: 7,
                category: 'risotti',
                title: 'Risotto della Settimana',
                description: 'Creazione settimanale con ingredienti di stagione selezionati',
                price: '€20',
                image: './images/🟣 RISOTTO DELLA SETTIMANA 🟣Vino rosso CurtefrancaCaprinoNoccioleVieni a provarlo ☎️ 030 25203.webp'
            },
            {
                id: 8,
                category: 'secondi',
                title: 'Cotoletta alla Milanese',
                description: 'Cotoletta di vitello impanata e fritta secondo tradizione',
                price: '€22',
                image: './images/piatti.jpg'
            },
            {
                id: 9,
                category: 'secondi',
                title: 'Brasato al Barolo',
                description: 'Brasato di manzo cotto lentamente nel vino Barolo',
                price: '€24',
                image: './images/piatti.jpg'
            },
            {
                id: 10,
                category: 'dolci',
                title: 'Tiramisù della Casa',
                description: 'Il classico dolce preparato con la nostra ricetta segreta',
                price: '€7',
                image: './images/piatti.jpg'
            },
            {
                id: 11,
                category: 'dolci',
                title: 'Panna Cotta ai Frutti di Bosco',
                description: 'Delicata panna cotta servita con coulis di frutti di bosco freschi',
                price: '€6',
                image: './images/piatti.jpg'
            }
        ];

        this.renderMenu();
    }

    renderMenu() {
        const menuGrid = document.getElementById('menu-grid');
        if (!menuGrid) return;

        menuGrid.innerHTML = this.menuItems.map(item => `
            <div class="menu-item" data-category="${item.category}">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="menu-item-price">${item.price}</div>
                </div>
                <div class="menu-item-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    // ===== FILTERS =====
    initFilters() {
        // Gallery filters
        const galleryFilters = document.querySelectorAll('.filter-btn');
        galleryFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                galleryFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.filterGallery(filter);
            });
        });

        // Menu category filters
        const menuFilters = document.querySelectorAll('.category-btn');
        menuFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                menuFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.filterMenu(category);
            });
        });
    }

    filterGallery(filter) {
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            const category = item.dataset.category;
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    filterMenu(category) {
        const items = document.querySelectorAll('.menu-item');
        
        items.forEach(item => {
            const itemCategory = item.dataset.category;
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // ===== MODAL GALLERY =====
    initModal() {
        const modal = document.getElementById('gallery-modal');
        const closeBtn = document.getElementById('modal-close');
        const prevBtn = document.getElementById('modal-prev');
        const nextBtn = document.getElementById('modal-next');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateModal(-1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateModal(1));
        }

        // Close modal on overlay click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal && modal.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.navigateModal(-1);
                        break;
                    case 'ArrowRight':
                        this.navigateModal(1);
                        break;
                }
            }
        });
    }

    openModal(itemId) {
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');

        const item = this.galleryItems.find(i => i.id === itemId);
        if (!item || !modal) return;

        this.currentModalIndex = this.galleryItems.indexOf(item);

        modalImage.src = item.image;
        modalImage.alt = item.title;
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description;

        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;

        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);

        // Restore body scroll
        document.body.style.overflow = '';
    }

    navigateModal(direction) {
        this.currentModalIndex += direction;
        
        if (this.currentModalIndex < 0) {
            this.currentModalIndex = this.galleryItems.length - 1;
        } else if (this.currentModalIndex >= this.galleryItems.length) {
            this.currentModalIndex = 0;
        }

        const item = this.galleryItems[this.currentModalIndex];
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');

        if (modalImage && modalTitle && modalDescription) {
            modalImage.src = item.image;
            modalImage.alt = item.title;
            modalTitle.textContent = item.title;
            modalDescription.textContent = item.description;
        }
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.section-header, .gallery-item, .menu-item, .timeline-item, .location-card, .storia-text');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the visible class so CSS .slide-up.visible/.fade-in.visible rules apply
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.classList.add('slide-up');
            observer.observe(el);
        });

        // Store observer for cleanup
        this.observers.set('scrollAnimations', observer);
    }

    // ===== FORM HANDLING =====
    initForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Prenotazione Inviata!';
                submitBtn.style.background = 'var(--success-color)';
                
                // Show success message
                this.showNotification('Prenotazione inviata con successo! Ti contatteremo presto.', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
                
            } catch (error) {
                // Error state
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Errore';
                this.showNotification('Errore nell\'invio. Riprova o chiamaci direttamente.', 'error');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Questo campo è obbligatorio';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Inserisci un indirizzo email valido';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Inserisci un numero di telefono valido';
            }
        }

        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }

    showFieldError(field, isValid, errorMessage) {
        // Remove existing error
        this.clearFieldError(field);

        if (!isValid) {
            field.style.borderColor = '#e74c3c';
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '0.8rem';
            errorDiv.style.marginTop = '0.25rem';
            
            field.parentNode.appendChild(errorDiv);
        }
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // ===== SCROLL EFFECTS =====
    initScrollEffects() {
    // Use the pre-bound throttled handler attached in the constructor
    window.addEventListener('scroll', this.handleScroll);
    }

    updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax effect on hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        // Update active navigation link
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== MAP INTERACTIONS =====
    initMapInteractions() {
        // Map functions are defined globally for iframe interaction
        window.openInGoogleMaps = () => {
            const lat = 45.5416; // Brescia coordinates
            const lng = 10.2118;
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            window.open(url, '_blank');
        };

        window.viewLargerMap = () => {
            const lat = 45.5416;
            const lng = 10.2118;
            const url = `https://www.google.com/maps/@${lat},${lng},17z`;
            window.open(url, '_blank');
        };

        window.getDirections = () => {
            window.openInGoogleMaps();
        };
    }

    // ===== UTILITY FUNCTIONS =====
    smoothScrollTo(targetPosition, duration = 1000) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#27ae60' : '#e74c3c',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    setupEventListeners() {
        // Window resize handler
        window.addEventListener('resize', this.handleResize);

        // Handle mobile orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 500);
        });

        // Service worker registration for PWA capabilities
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                console.log('Service Worker registration failed');
            });
        }
    }

    handleResize() {
        // Recalculate layout on resize
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (window.innerWidth > 768) {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    }

    // ===== CLEANUP =====
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();

        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }
}

// Global utility functions for scroll navigation
window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const app = window.rustichelloApp;
        if (app) {
            app.smoothScrollTo(section.offsetTop - 80);
        } else {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rustichelloApp = new NuovoRustichelloApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NuovoRustichelloApp;
}
