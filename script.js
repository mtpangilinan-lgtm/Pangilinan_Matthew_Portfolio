// ============================================
// Theme Toggle Functionality
// ============================================

const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const body = document.body;

// Initialize theme from localStorage or default to dark
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }
}

// Toggle theme function
function toggleTheme() {
    body.classList.toggle('light-mode');
    
    // Save preference
    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

// Desktop theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Mobile theme toggle
mobileThemeToggle.addEventListener('click', toggleTheme);

// Initialize on page load
initializeTheme();

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Email validation regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Remove message after 4 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 4000);
    }
}

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    // Validation
    if (!name) {
        showFormMessage('Please enter your name.', 'error');
        return;
    }
    
    if (!email || !isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!message) {
        showFormMessage('Please enter a message.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        console.log('Form Data:', { name, email, message });
        
        showFormMessage('Message sent successfully! Thank you.', 'success');
        contactForm.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal links
        if (href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Scroll Animation for Elements - REMOVED FOR PERFORMANCE
// ============================================
// Removed laggy scroll animations

// ============================================
// Active Navigation Link Styling
// ============================================

const navLinks = document.querySelectorAll('.nav-link, .nav-actions a[href^="#"]');
const sections = document.querySelectorAll('section, div[id]');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// Header Shadow on Scroll
// ============================================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ============================================
// Page Load Animation - REMOVED FOR PERFORMANCE
// ============================================
// Removed to prevent initial lag

// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus on form
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('contact-name').focus();
    }
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for scroll events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Performance Optimization
// ============================================

// Simplified scroll handling
window.addEventListener('scroll', throttle(updateActiveLink, 100));

// ============================================
// Mobile Menu Toggle
// ============================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// Back to Top Button
// ============================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}, 200));

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Ready Callback
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Emit custom event
    const readyEvent = new CustomEvent('portfolioReady');
    document.dispatchEvent(readyEvent);
});
