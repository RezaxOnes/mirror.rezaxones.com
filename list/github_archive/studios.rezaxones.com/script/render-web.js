// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
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

// Create floating particles effect
function createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 217, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: floatUp ${Math.random() * 15 + 10}s linear infinite;
    `;
    
    const container = document.getElementById('particles');
    if (container) {
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 25000);
    }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const parallax = scrolled * 0.3;
        hero.style.transform = `translateY(${parallax}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation on scroll
document.querySelectorAll('.work-item, .solution-box, .feature-item').forEach(el => {
    observer.observe(el);
});

// Add hover effect enhancements
document.querySelectorAll('.work-item, .solution-box').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s ease';
    });
});

// Navbar hide/show on scroll (sticky behavior)
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(lastScrollTop - st) <= 5) return;
    
    if (st > lastScrollTop && st > scrollThreshold) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
}, false);

// Glow effect disabled for better performance

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create initial burst of particles
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createParticle(), i * 100);
    }
    
    // Continue creating particles
    setInterval(createParticle, 400);
    
    // Console message
    console.log(
        '%c RezaxOnes Studios ',
        'background: linear-gradient(135deg, #00d9ff, #7b2ff7); color: white; font-size: 24px; padding: 15px 30px; border-radius: 8px; font-weight: bold;'
    );
    console.log(
        '%c Website tĩnh - An toàn & Bảo mật ',
        'background: #1a1f3a; color: #00d9ff; font-size: 14px; padding: 10px 20px; border-radius: 5px; margin-top: 10px;'
    );
    console.log(
        '%c Ubuntu Server LTS | Pure Static Content ',
        'color: #7b2ff7; font-size: 12px; margin-top: 5px;'
    );
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 50);
});

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('%c⚡ Performance Metrics', 'color: #00d9ff; font-size: 14px; font-weight: bold;');
                console.log(`DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`);
                console.log(`Page Load: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
            }
        }, 0);
    });
}

// Prevent default on dummy links
document.querySelectorAll('a[onclick="return false;"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Add some easter egg
let clickCount = 0;
document.querySelector('.logo').addEventListener('click', (e) => {
    clickCount++;
    if (clickCount === 5) {
        console.log('%c🎮 Welcome to RezaxOnes Studios! 🎮', 'font-size: 20px; color: #00d9ff;');
        clickCount = 0;
    }
});
