// DOM Elements
const nav = document.getElementById('nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const loadingOverlay = document.getElementById('loadingOverlay');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('currentYear');

// Update current year
currentYearSpan.textContent = new Date().getFullYear();

// Loading overlay
window.addEventListener('load', () => {
    loadingOverlay.classList.add('hidden');
    document.body.style.overflow = 'visible';
    
    // Start observing elements after page load
    initializeAnimations();
});

// Navigation
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize animations
function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-card, .cert-card, .project-card').forEach(el => {
        observer.observe(el);
    });
}

// Form validation and submission
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    formGroup.classList.add('error');
    errorMessage.textContent = message;
}

function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });

    // Validate name
    const nameInput = contactForm.querySelector('#name');
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validate email
    const emailInput = contactForm.querySelector('#email');
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validate message
    const messageInput = contactForm.querySelector('#message');
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    } else {
        clearError(messageInput);
    }

    if (isValid) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Here you would typically send the form data to your backend
            // For demonstration, we'll use a timeout to simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            contactForm.reset();
            alert('Thank you for your message! I will get back to you soon.');

        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    }
});

// Handle form input events
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        clearError(input);
    });
}); 