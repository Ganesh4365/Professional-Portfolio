// DevOps Portfolio JavaScript - Main functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
    
    // Navigation functionality
    initNavigation();
    
    // Typing animation
    initTypingAnimation();
    
    // Skills chart
    initSkillsChart();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Contact form
    initContactForm();
    
    // Mobile menu
    initMobileMenu();
    
    // Scroll-based animations
    initScrollAnimations();
    
    // Particle animation
    initParticleAnimation();
    
    // Performance monitoring
    initPerformanceMonitoring();
});

// Navigation System
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('backdrop-blur-lg', 'bg-gray-900/98');
        } else {
            navbar.classList.remove('backdrop-blur-lg', 'bg-gray-900/98');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    const texts = [
        'DevOps Engineer',
        'Cloud Architect', 
        'CI/CD Specialist',
        'Infrastructure Automation Expert',
        'Kubernetes Engineer',
        'AWS Solutions Architect'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let timeout = isDeleting ? 100 : 150;
        
        if (!isDeleting && charIndex === currentText.length) {
            timeout = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, timeout);
    }
    
    if (typingElement) {
        setTimeout(typeText, 500);
    }
}

// Skills Chart using Chart.js
function initSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;
    
    const skillsData = {
        labels: [
            'AWS Cloud',
            'Docker',
            'Kubernetes', 
            'Jenkins',
            'Terraform',
            'Linux Admin',
            'Git/GitHub',
            'Maven',
            'Python',
            'Java'
        ],
        datasets: [{
            label: 'Proficiency Level (%)',
            data: [90, 90, 82, 88, 80, 85, 92, 85, 75, 80],
            backgroundColor: [
                'rgba(0, 212, 170, 0.8)',
                'rgba(0, 102, 204, 0.8)',
                'rgba(0, 212, 170, 0.6)',
                'rgba(0, 102, 204, 0.6)',
                'rgba(0, 212, 170, 0.4)',
                'rgba(0, 102, 204, 0.4)',
                'rgba(0, 212, 170, 0.7)',
                'rgba(0, 102, 204, 0.7)',
                'rgba(0, 212, 170, 0.5)',
                'rgba(0, 102, 204, 0.5)'
            ],
            borderColor: [
                '#00d4aa',
                '#0066cc',
                '#00d4aa',
                '#0066cc',
                '#00d4aa',
                '#0066cc',
                '#00d4aa',
                '#0066cc',
                '#00d4aa',
                '#0066cc'
            ],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
        }]
    };
    
    const config = {
        type: 'polarArea',
        data: skillsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14,
                            family: 'Inter'
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    titleColor: '#00d4aa',
                    bodyColor: '#ffffff',
                    borderColor: '#00d4aa',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}% proficiency`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#ffffff',
                        font: {
                            size: 12,
                            family: 'Inter'
                        }
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            size: 10
                        },
                        stepSize: 20
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutCubic'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    };
    
    new Chart(ctx, config);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name') || document.getElementById('name').value,
                email: formData.get('email') || document.getElementById('email').value,
                subject: formData.get('subject') || document.getElementById('subject').value,
                message: formData.get('message') || document.getElementById('message').value
            };
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Simulate form submission (replace with actual submission logic)
            showFormSuccess();
            
            // Reset form
            contactForm.reset();
        });
    }
    
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject || data.subject.trim().length < 5) {
            errors.push('Subject must be at least 5 characters long');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        if (errors.length > 0) {
            showFormErrors(errors);
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormErrors(errors) {
        const errorHtml = errors.map(error => `<div class="text-red-400 text-sm mb-2">${error}</div>`).join('');
        showNotification(errorHtml, 'error');
    }
    
    function showFormSuccess() {
        showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            });
        });
    }
}

// Scroll-based Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                if (entry.target.classList.contains('skill-progress')) {
                    entry.target.style.width = entry.target.getAttribute('style').match(/width:\s*(\d+%)/)[1];
                }
                
                // Animate counters
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe skill bars
    document.querySelectorAll('.skill-progress').forEach(el => observer.observe(el));
    
    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(el => observer.observe(el));
}

// Counter Animation
function animateCounter(element) {
    const target = element.querySelector('div');
    if (!target || target.dataset.animated) return;
    
    const text = target.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    
    let current = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        target.textContent = Math.floor(current) + suffix;
    }, 40);
    
    target.dataset.animated = 'true';
}

// Enhanced Particle Animation
function initParticleAnimation() {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;
    
    // Create additional animated particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? '#00d4aa' : '#0066cc'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add CSS for particle float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    // Set notification styling based on type
    const typeClasses = {
        'success': 'bg-green-600 text-white',
        'error': 'bg-red-600 text-white',
        'info': 'bg-blue-600 text-white',
        'warning': 'bg-yellow-600 text-black'
    };
    
    notification.className += ` ${typeClasses[type] || typeClasses.info}`;
    notification.innerHTML = `
        <div class="flex items-start">
            <div class="flex-1">
                ${message}
            </div>
            <button class="ml-4 text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Performance:', {
                'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
                'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
            });
        }, 0);
    });
    
    // Monitor scroll performance
    let ticking = false;
    function optimizedScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-based operations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', optimizedScroll);
}

// Project Modal System (for future enhancements)
function initProjectModals() {
    const projectButtons = document.querySelectorAll('.project-card .btn-primary');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            
            // Create modal (simplified version)
            showProjectModal(projectTitle, projectCard);
        });
    });
}

function showProjectModal(title, projectCard) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50';
    modal.innerHTML = `
        <div class="bg-gray-800 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-devops-accent">${title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="text-gray-300">
                    <p>Detailed project information would go here...</p>
                    <p class="mt-4">This feature can be extended to show comprehensive project details, screenshots, technical specifications, and deployment information.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.fixed.inset-0');
        modals.forEach(modal => modal.remove());
    }
    
    // Arrow keys for navigation (optional enhancement)
    if (e.altKey) {
        switch(e.key) {
            case 'ArrowUp':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'ArrowDown':
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;
        }
    }
});

// Initialize project modals when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initProjectModals, 1000); // Delay to ensure all elements are ready
});

// Export functions for potential future use
window.DevOpsPortfolio = {
    showNotification,
    showProjectModal,
    animateCounter
};