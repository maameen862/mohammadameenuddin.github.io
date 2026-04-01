// Load config first
document.addEventListener('DOMContentLoaded', function() {
    initSite();
});

function initSite() {
    // Hide loader
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);

    // Apply config
    applyConfig();
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate on scroll
    initScrollAnimations();
    
    // Contact form
    initContactForm();
    
    // Mobile menu
    initMobileMenu();
}

function applyConfig() {
    if (window.siteConfig) {
        // Update all text elements
        document.getElementById('siteTitle').textContent = window.siteConfig.title;
        document.getElementById('navLogoText').textContent = window.siteConfig.logo;
        document.getElementById('heroMainTitle').textContent = window.siteConfig.heroTitle;
        document.getElementById('heroSubtitle').textContent = window.siteConfig.heroSubtitle;
        document.getElementById('contactEmail').textContent = window.siteConfig.email;
        document.getElementById('contactPhone').textContent = window.siteConfig.phone;
        document.getElementById('contactAddress').textContent = window.siteConfig.address;
        
        // Services
        renderServices();
        
        // Portfolio
        renderPortfolio();
        
        // Colors
        applyColors();
    }
}

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (window.siteConfig?.services) {
        grid.innerHTML = window.siteConfig.services.map(service => `
            <div class="service-card">
                <i class="fas ${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
            </div>
        `).join('');
    }
}

function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (window.siteConfig?.portfolio) {
        grid.innerHTML = window.siteConfig.portfolio.map(item => `
            <div class="portfolio-item">
                <img src="${item.img}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            </div>
        `).join('');
    }
}

function applyColors() {
    if (window.siteConfig?.colors) {
        document.documentElement.style.setProperty('--primary-color', window.siteConfig.colors.primary);
        document.documentElement.style.setProperty('--secondary-color', window.siteConfig.colors.secondary);
    }
}

function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.service-card, .portfolio-item, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

function initContactForm() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Your message has been sent. 🚀');
        this.reset();
    });
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}