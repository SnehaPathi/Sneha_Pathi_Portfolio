// Sneha Pathi - Portfolio Javascript Functions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Dark/Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (systemPrefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // 2. Sticky Navbar & Active Link Update on Scroll
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        if (navLinksContainer.classList.contains('active')) {
            mobileMenuIcon.className = 'fas fa-times';
        } else {
            mobileMenuIcon.className = 'fas fa-bars';
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileMenuIcon.className = 'fas fa-bars';
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 5. Contact Form Submission handling & Validation (EmailJS)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // Initialize EmailJS
    (function() {
        emailjs.init("RwdhjyIx3r5UUsgYP");
    })();

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        const showError = (inputElement, errorId, message) => {
            inputElement.classList.add('invalid');
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.innerText = message;
                errorElement.classList.add('visible');
            }
        };

        const clearError = (inputElement, errorId) => {
            inputElement.classList.remove('invalid');
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.innerText = '';
                errorElement.classList.remove('visible');
            }
        };

        const validateField = (inputElement, errorId, type = 'text') => {
            let isValid = true;
            if (inputElement.value.trim() === '') {
                showError(inputElement, errorId, 'This field is required');
                isValid = false;
            } else if (type === 'email' && !validateEmail(inputElement.value)) {
                showError(inputElement, errorId, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(inputElement, errorId);
            }
            return isValid;
        };

        // Real-time validation setup
        const setupValidation = (inputElement, errorId, type) => {
            inputElement.addEventListener('blur', () => validateField(inputElement, errorId, type));
            inputElement.addEventListener('input', () => {
                if (inputElement.classList.contains('invalid')) {
                    validateField(inputElement, errorId, type);
                }
            });
        };

        setupValidation(nameInput, 'nameError', 'text');
        setupValidation(emailInput, 'emailError', 'email');
        setupValidation(messageInput, 'messageError', 'text');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all fields on submit
            const isNameValid = validateField(nameInput, 'nameError', 'text');
            const isEmailValid = validateField(emailInput, 'emailError', 'email');
            const isMessageValid = validateField(messageInput, 'messageError', 'text');

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                return; // Stop submission if invalid
            }

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            // Simple animation for feedback
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            emailjs.sendForm('service_9k0q93i', 'template_mw1idbl', '#contactForm')
            .then(function() {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
                contactForm.reset();
                btn.innerHTML = '<i class="fas fa-check"></i> Sent';
                btn.style.background = '#10B981'; // Success green
            }, function(error) {
                console.error('EmailJS Error:', error);
                formStatus.className = 'form-status error';
                formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong.';
            })
            .finally(() => {
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.innerHTML = '';
                    }, 4000);
                }, 3000);
            });
        });
    }
});
