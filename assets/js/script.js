// JavaScript untuk website PT. Karyaghoni Prima Lestari

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initNavbarScroll();
    initAnimations();
    initContactForm();
    initScrollToTop();
    initPortfolioFilter();
    initCounters();
    initProfessionalParallax();
    initPreloader();
    initCertificationFilter();
    initLoadMore();
});

// Loading screen
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'fixed inset-0 bg-white z-50 flex items-center justify-center';
    preloader.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
            <div class="space-y-2">
                <h2 class="text-2xl font-bold text-secondary">
                    PT. Karyaghoni Prima Lestari
                </h2>
                <div class="w-16 h-0.5 bg-primary mx-auto"></div>
                <p class="text-sm text-gray-500 font-medium">Building Excellence Since 2009</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 800);
    });
}

// Menu mobile
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                // Close menu
                mobileMenu.style.maxHeight = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            } else {
                // Open menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            }
            
            // Toggle hamburger icon with animation
            const icon = mobileMenuButton.querySelector('svg');
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            
            if (!isOpen) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.style.maxHeight = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                
                const icon = mobileMenuButton.querySelector('svg');
                icon.style.transform = 'rotate(0deg)';
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            });
        });
    }
}

// Enhanced smooth scrolling with offset
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavigation(this.getAttribute('href'));
            }
        });
    });
}

// Update active navigation item
function updateActiveNavigation(activeHref) {
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.classList.remove('text-primary');
        link.classList.add('text-secondary');
    });
    
    document.querySelectorAll(`a[href="${activeHref}"]`).forEach(link => {
        link.classList.remove('text-secondary');
        link.classList.add('text-primary');
    });
}

// Enhanced navbar with glassmorphism effect
function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    
    if (navbar) {
        window.addEventListener('scroll', debounce(function() {
            if (window.scrollY > 50) {
                navbar.classList.add('backdrop-blur-md', 'bg-white/95', 'shadow-lg', 'navbar-modern');
                navbar.style.borderBottom = '1px solid rgba(226, 232, 240, 0.8)';
            } else {
                navbar.classList.remove('backdrop-blur-md', 'bg-white/95', 'shadow-lg', 'navbar-modern');
                navbar.style.borderBottom = 'none';
            }
        }, 10));
    }
}

// Professional scroll animations with Intersection Observer
function initAnimations() {
    // More conservative observer options for professional feel
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add subtle professional animation classes
                target.style.opacity = '0';
                target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }, 50);
                
                // Staggered animation for child elements (very subtle)
                const children = target.querySelectorAll('.portfolio-item, .cert-item, .service-card');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(15px)';
                    
                    setTimeout(() => {
                        child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 80 + 200);
                });
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Only observe main sections, not individual cards
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Fungsi filter portfolio
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-white', 'text-secondary');
            });
            
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-white', 'text-secondary');
            
            // Professional filter animation - subtle and smooth
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-counter, [class*="text-3xl"], [class*="text-4xl"]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const numbers = text.match(/\d+/);
                
                if (numbers) {
                    const finalNumber = parseInt(numbers[0]);
                    const prefix = text.replace(/\d+/, '');
                    const suffix = text.split(finalNumber)[1] || '';
                    
                    animateCounter(target, 0, finalNumber, 2000, prefix, suffix);
                    counterObserver.unobserve(target);
                }
            }
        });
    }, observerOptions);
    
    // Find elements that contain numbers for counting
    const statsNumbers = document.querySelectorAll('.hero-stats .text-3xl, .hero-stats .text-4xl');
    statsNumbers.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Counter animation function
function animateCounter(element, start, end, duration, prefix = '', suffix = '') {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = prefix + current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + end + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Efek parallax profesional
function initProfessionalParallax() {
    let ticking = false;
    
    
    const parallaxElements = {
        bg: document.querySelectorAll('.parallax-bg'),
        slow: document.querySelectorAll('.parallax-slow'),
        medium: document.querySelectorAll('.parallax-medium'),
        fast: document.querySelectorAll('.parallax-fast'),
        elements: document.querySelectorAll('.parallax-element')
    };
    
    // Observer untuk animasi
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
            }
        });
    }, observerOptions);
    
    
    parallaxElements.elements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Handler scroll yang optimal
    function updateParallax() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                const windowHeight = window.innerHeight;
                
                
                parallaxElements.bg.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    if (rect.bottom >= 0 && rect.top <= windowHeight) {
                        const speed = 0.3; // Subtle movement
                        const yPos = -(scrollTop * speed);
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    }
                });
                
                
                parallaxElements.slow.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    if (rect.bottom >= 0 && rect.top <= windowHeight) {
                        const speed = 0.1;
                        const yPos = -(scrollTop * speed);
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    }
                });
                
                parallaxElements.medium.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    if (rect.bottom >= 0 && rect.top <= windowHeight) {
                        const speed = 0.2;
                        const yPos = -(scrollTop * speed);
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    }
                });
                
                parallaxElements.fast.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    if (rect.bottom >= 0 && rect.top <= windowHeight) {
                        const speed = 0.4;
                        const yPos = -(scrollTop * speed);
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Parallax mouse untuk elemen interaktif
    function initMouseParallax() {
        const interactiveElements = document.querySelectorAll('.floating-element');
        
        document.addEventListener('mousemove', throttle((e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            interactiveElements.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 10;
                const y = (mouseY - 0.5) * speed * 10;
                
                element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
        }, 16));
    }
    
    // Inisialisasi parallax scroll
    window.addEventListener('scroll', updateParallax, { passive: true });
    
    // Inisialisasi parallax mouse
    initMouseParallax();
    
    // Inisialisasi saat load
    updateParallax();
}

// Form kontak dengan validasi
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        // Efek label mengambang
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentNode.classList.remove('focused');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Comprehensive validation
            let isValid = true;
            const errors = [];
            
            if (!firstName || firstName.length < 2) {
                errors.push('First name must be at least 2 characters');
                isValid = false;
            }
            
            if (!lastName || lastName.length < 2) {
                errors.push('Last name must be at least 2 characters');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }
            
            if (!message || message.length < 10) {
                errors.push('Message must be at least 10 characters');
                isValid = false;
            }
            
            if (!isValid) {
                showNotification(errors.join('<br>'), 'error');
                return;
            }
            
            // Simulate form submission with enhanced UX
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('opacity-75');
            
            // Simulate API call with realistic delay
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-75');
                
                // Trigger confetti effect
                createConfetti();
            }, 2000);
        });
    }
}

// Field validation with visual feedback
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing validation classes
    field.classList.remove('border-red-500', 'border-green-500');
    
    let isValid = true;
    
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            isValid = value.length >= 2;
            break;
        case 'email':
            isValid = isValidEmail(value);
            break;
        case 'message':
            isValid = value.length >= 10;
            break;
        default:
            isValid = true;
    }
    
    if (value && fieldName !== 'company') {
        field.classList.add(isValid ? 'border-green-500' : 'border-red-500');
    }
    
    return isValid;
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system with animations
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-6 rounded-xl shadow-2xl max-w-md transform transition-all duration-500 border-l-4`;
    
    const colors = {
        success: 'bg-green-50 text-green-800 border-green-500',
        error: 'bg-red-50 text-red-800 border-red-500',
        info: 'bg-blue-50 text-blue-800 border-blue-500',
        warning: 'bg-yellow-50 text-yellow-800 border-yellow-500'
    };
    
    const icons = {
        success: 'fas fa-check-circle text-green-500',
        error: 'fas fa-exclamation-circle text-red-500',
        info: 'fas fa-info-circle text-blue-500',
        warning: 'fas fa-exclamation-triangle text-yellow-500'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.innerHTML = `
        <div class="flex items-start">
            <i class="${icons[type] || icons.info} text-xl mr-3 mt-1"></i>
            <div class="flex-1">
                <div class="font-semibold mb-1">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="text-sm leading-relaxed">${message}</div>
            </div>
            <button class="ml-4 text-current opacity-70 hover:opacity-100 transition-opacity" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add entrance animation
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    
    document.body.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Auto remove after 7 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 7000);
}

// Confetti effect for successful form submission
function createConfetti() {
    const colors = ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.transition = 'all 3s cubic-bezier(0.23, 1, 0.320, 1)';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = window.innerHeight + 10 + 'px';
            confetti.style.transform = 'rotate(' + (Math.random() * 360 + 720) + 'deg)';
            confetti.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Enhanced scroll to top with progress indicator
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-dark-blue transition-all duration-300 z-40 opacity-0 invisible flex items-center justify-center group';
    scrollButton.innerHTML = `
        <svg class="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
        <div class="absolute inset-0 rounded-full border-2 border-white/30">
            <div class="scroll-progress absolute inset-0 rounded-full border-2 border-white border-l-transparent border-r-transparent" style="transform: rotate(-90deg)"></div>
        </div>
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const progressRing = scrollButton.querySelector('.scroll-progress');
        
        if (window.scrollY > 500) {
            scrollButton.classList.remove('opacity-0', 'invisible');
            scrollButton.classList.add('opacity-100', 'visible');
        } else {
            scrollButton.classList.add('opacity-0', 'invisible');
            scrollButton.classList.remove('opacity-100', 'visible');
        }
        
        // Update progress ring
        if (progressRing) {
            const circumference = 2 * Math.PI * 22; // radius of 22px
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;
            
            progressRing.style.strokeDasharray = strokeDasharray;
            progressRing.style.strokeDashoffset = strokeDashoffset;
        }
    }, 16));
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring for development
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('📊 Performance Metrics:');
                    console.log('⚡ Page Load Time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
                    console.log('🚀 DOM Content Loaded:', Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart), 'ms');
                    console.log('📱 First Contentful Paint:', Math.round(perfData.responseEnd - perfData.requestStart), 'ms');
                }
            }, 0);
        });
    }
}

// Fungsi filter sertifikat
function initCertificationFilter() {
    const filterButtons = document.querySelectorAll('.cert-filter');
    const certItems = document.querySelectorAll('.cert-item');
    
    if (filterButtons.length > 0 && certItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-primary', 'text-white');
                    btn.classList.add('bg-white', 'text-secondary', 'hover:bg-primary', 'hover:text-white');
                });
                
                this.classList.add('active', 'bg-primary', 'text-white');
                this.classList.remove('bg-white', 'text-secondary', 'hover:bg-primary', 'hover:text-white');
                
                // Professional filter animation for certificates
                certItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(8px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 40);
                    } else {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(-8px)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Load More untuk Portfolio dan Certificates di Mobile
function initLoadMore() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    const portfolioLoadMore = document.getElementById('portfolio-load-more');
    const certificateGrid = document.getElementById('certificate-grid');
    const certificateLoadMore = document.getElementById('certificate-load-more');
    
    let portfolioItemsPerPage = 3;
    let portfolioCurrentItems = 0;
    let certificateItemsPerPage = 3;
    let certificateCurrentItems = 0;
    
    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth < 1024;
    }
    
    // Portfolio Load More
    if (portfolioGrid && portfolioLoadMore) {
        const portfolioItems = Array.from(portfolioGrid.querySelectorAll('.portfolio-item'));
        
        function showPortfolioItems() {
            const itemsToShow = portfolioItems.slice(portfolioCurrentItems, portfolioCurrentItems + portfolioItemsPerPage);
            
            itemsToShow.forEach((item, index) => {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
            
            portfolioCurrentItems += portfolioItemsPerPage;
            
            if (portfolioCurrentItems >= portfolioItems.length) {
                portfolioLoadMore.style.display = 'none';
            }
        }
        
        function resetPortfolio() {
            portfolioCurrentItems = 0;
            portfolioItems.forEach(item => {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
        }
        
        // Initialize portfolio display
        if (isMobile()) {
            resetPortfolio();
            showPortfolioItems();
            portfolioLoadMore.style.display = 'block';
        } else {
            portfolioItems.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
            portfolioLoadMore.style.display = 'none';
        }
        
        // Add click event to load more button
        const portfolioBtn = portfolioLoadMore.querySelector('button');
        if (portfolioBtn) {
            portfolioBtn.addEventListener('click', showPortfolioItems);
        }
    }
    
    // Certificate Load More
    if (certificateGrid && certificateLoadMore) {
        const certificateItems = Array.from(certificateGrid.querySelectorAll('.cert-item'));
        
        function showCertificateItems() {
            const itemsToShow = certificateItems.slice(certificateCurrentItems, certificateCurrentItems + certificateItemsPerPage);
            
            itemsToShow.forEach((item, index) => {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
            
            certificateCurrentItems += certificateItemsPerPage;
            
            if (certificateCurrentItems >= certificateItems.length) {
                certificateLoadMore.style.display = 'none';
            }
        }
        
        function resetCertificates() {
            certificateCurrentItems = 0;
            certificateItems.forEach(item => {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
        }
        
        // Initialize certificate display
        if (isMobile()) {
            resetCertificates();
            showCertificateItems();
            certificateLoadMore.style.display = 'block';
        } else {
            certificateItems.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
            certificateLoadMore.style.display = 'none';
        }
        
        // Add click event to load more button
        const certificateBtn = certificateLoadMore.querySelector('button');
        if (certificateBtn) {
            certificateBtn.addEventListener('click', showCertificateItems);
        }
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!isMobile()) {
                // Desktop - show all items
                if (portfolioGrid) {
                    portfolioGrid.querySelectorAll('.portfolio-item').forEach(item => {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                    if (portfolioLoadMore) portfolioLoadMore.style.display = 'none';
                }
                
                if (certificateGrid) {
                    certificateGrid.querySelectorAll('.cert-item').forEach(item => {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                    if (certificateLoadMore) certificateLoadMore.style.display = 'none';
                }
            } else {
                // Mobile - reset to load more functionality
                if (portfolioGrid && portfolioLoadMore) {
                    resetPortfolio();
                    showPortfolioItems();
                    portfolioLoadMore.style.display = 'block';
                }
                
                if (certificateGrid && certificateLoadMore) {
                    resetCertificates();
                    showCertificateItems();
                    certificateLoadMore.style.display = 'block';
                }
            }
        }, 100);
    });
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    logPerformance();
    console.log('🎉 PT. Karyaghoni Prima Lestari Website Loaded Successfully!');
}
