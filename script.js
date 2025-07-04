// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // PWA - Detectar si la app está instalada
    const isInStandaloneMode = () => 
        (window.matchMedia('(display-mode: standalone)').matches) || 
        (window.navigator.standalone) || 
        document.referrer.includes('android-app://');

    // Si la app está instalada, ocultar el botón de instalación
    if (isInStandaloneMode()) {
        const installButton = document.querySelector('.install-button');
        if (installButton) {
            installButton.style.display = 'none';
        }
    }

    // PWA - Detectar si está online/offline
    const updateOnlineStatus = () => {
        const statusIndicator = document.createElement('div');
        statusIndicator.id = 'online-status';
        statusIndicator.style.position = 'fixed';
        statusIndicator.style.bottom = '70px';
        statusIndicator.style.right = '20px';
        statusIndicator.style.padding = '8px 15px';
        statusIndicator.style.borderRadius = '20px';
        statusIndicator.style.fontSize = '14px';
        statusIndicator.style.fontWeight = 'bold';
        statusIndicator.style.zIndex = '9999';
        statusIndicator.style.transition = 'opacity 0.5s';
        
        if (navigator.onLine) {
            statusIndicator.textContent = '✅ Online';
            statusIndicator.style.backgroundColor = '#4CAF50';
            statusIndicator.style.color = 'white';
            
            // Ocultar después de 3 segundos
            setTimeout(() => {
                statusIndicator.style.opacity = '0';
                setTimeout(() => {
                    if (statusIndicator.parentNode) {
                        statusIndicator.parentNode.removeChild(statusIndicator);
                    }
                }, 500);
            }, 3000);
        } else {
            statusIndicator.textContent = '⚠️ Offline - Modo sin conexión';
            statusIndicator.style.backgroundColor = '#FF9800';
            statusIndicator.style.color = 'white';
        }
        
        // Eliminar el indicador anterior si existe
        const existingIndicator = document.getElementById('online-status');
        if (existingIndicator) {
            existingIndicator.parentNode.removeChild(existingIndicator);
        }
        
        document.body.appendChild(statusIndicator);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Comprobar estado inicial
    updateOnlineStatus();

    // Location Button - Open Map Modal
    const locationBtn = document.getElementById('location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            const locationModal = new bootstrap.Modal(document.getElementById('locationModal'));
            locationModal.show();
        });
    }
    
    // Toggle Map Type (Satellite/Roadmap)
    const toggleMapBtn = document.getElementById('toggle-map-type');
    if (toggleMapBtn) {
        toggleMapBtn.addEventListener('click', function() {
            const mapIframe = document.querySelector('#map-container iframe');
            const currentSrc = mapIframe.src;
            
            if (currentSrc.includes('maptype=satellite')) {
                // Change to roadmap view
                mapIframe.src = currentSrc.replace('maptype=satellite', 'maptype=roadmap');
                toggleMapBtn.innerHTML = '<i class="fas fa-satellite me-2"></i>Vista satélite';
            } else if (currentSrc.includes('maptype=roadmap')) {
                // Change to satellite view
                mapIframe.src = currentSrc.replace('maptype=roadmap', 'maptype=satellite');
                toggleMapBtn.innerHTML = '<i class="fas fa-map me-2"></i>Vista normal';
            } else {
                // Add roadmap view if no maptype parameter exists
                mapIframe.src = currentSrc + '&maptype=roadmap';
                toggleMapBtn.innerHTML = '<i class="fas fa-satellite me-2"></i>Vista satélite';
            }
        });
    }
    
    // Catalog Modal Animation
    const catalogModal = document.getElementById('catalogModal');
    if (catalogModal) {
        catalogModal.addEventListener('show.bs.modal', function() {
            // Animate entrance of game cards
            setTimeout(() => {
                const gameCards = document.querySelectorAll('.game-card');
                gameCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('show-card');
                    }, 100 * index);
                });
            }, 300);
        });
    }
    
    // Catalog Float Button Animation
    const catalogFloatBtn = document.getElementById('catalog-float-btn');
    if (catalogFloatBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                catalogFloatBtn.style.opacity = '1';
                catalogFloatBtn.style.visibility = 'visible';
            } else {
                catalogFloatBtn.style.opacity = '0';
                catalogFloatBtn.style.visibility = 'hidden';
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'linear-gradient(to right, rgba(18, 18, 18, 0.98), rgba(18, 18, 18, 0.95))';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'linear-gradient(to right, rgba(18, 18, 18, 0.95), rgba(18, 18, 18, 0.9))';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter-value');
    const counterSection = document.querySelector('.counter-section');
    let counted = false;

    function startCounting() {
        if (counted) return;
        
        counters.forEach(counter => {
            const target = +counter.dataset.count;
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => startCounting(), 30);
            } else {
                counter.innerText = target;
            }
        });
        
        counted = true;
    }

    // Start counter when scrolled to section
    window.addEventListener('scroll', function() {
        if (counterSection.getBoundingClientRect().top < window.innerHeight - 100) {
            startCounting();
        }
    });

    // Form submission (prevent default)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation here
            const formInputs = this.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Show success message (in real app, would send data to server)
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Mensaje Enviado';
                submitBtn.classList.add('btn-success');
                submitBtn.disabled = true;
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.navbar .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Featured section image hover effects
    const featuredImages = document.querySelectorAll('.featured-image');
    featuredImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Price cards hover effect
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                priceCards.forEach(c => {
                    if (c.classList.contains('featured')) {
                        c.style.transform = 'translateY(0) scale(1)';
                    }
                });
                this.style.transform = 'translateY(-15px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
                priceCards.forEach(c => {
                    if (c.classList.contains('featured')) {
                        c.style.transform = 'translateY(-15px) scale(1.05)';
                    }
                });
            }
        });
    });

    // Video banner optimization
    const video = document.getElementById('banner-video');
    if (video) {
        // Reduce quality on mobile
        if (window.innerWidth < 768) {
            video.setAttribute('poster', 'img/gamer-playing-videogame-neon-lit-apartment-holding-controller-close-up.jpg');
        }
        
        // Pause video when not in viewport to save resources
        window.addEventListener('scroll', function() {
            const videoRect = video.getBoundingClientRect();
            if (videoRect.bottom < 0 || videoRect.top > window.innerHeight) {
                if (!video.paused) video.pause();
            } else {
                if (video.paused) video.play();
            }
        });
    }

    // Preload images for gallery
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        const src = img.getAttribute('src');
        const newImg = new Image();
        newImg.src = src;
    });

    // Responsive menu close on click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}); 