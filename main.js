document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
            
            // Add animation class for mobile menu
            if (mainNav.style.display === 'flex') {
                mainNav.style.position = 'absolute';
                mainNav.style.top = '70px';
                mainNav.style.left = '0';
                mainNav.style.width = '100%';
                mainNav.style.backgroundColor = '#0A0A0A';
                mainNav.style.padding = '20px';
                mainNav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                
                const menuItems = mainNav.querySelectorAll('ul');
                if (menuItems.length > 0) {
                    menuItems[0].style.flexDirection = 'column';
                    
                    const listItems = menuItems[0].querySelectorAll('li');
                    listItems.forEach(item => {
                        item.style.margin = '10px 0';
                    });
                }
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if the href is not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth < 768 && mainNav.style.display === 'flex') {
                        mainNav.style.display = 'none';
                    }
                }
            }
        });
    });
    
    // Form submission
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real implementation, you would send this to your backend
                console.log('Form submitted with email:', email);
                
                // Show success message
                emailInput.value = '';
                
                const formParent = signupForm.parentNode;
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.style.color = '#00E676';
                successMessage.style.marginTop = '20px';
                successMessage.style.padding = '10px';
                successMessage.style.borderRadius = '4px';
                successMessage.style.backgroundColor = 'rgba(0, 230, 118, 0.1)';
                successMessage.textContent = 'Thank you for signing up! We\'ll keep you updated.';
                
                formParent.appendChild(successMessage);
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 1s ease-out';
                    setTimeout(() => {
                        formParent.removeChild(successMessage);
                    }, 1000);
                }, 5000);
            }
        });
    }
    
    // Animate occupancy bar in phone mockup
    const occupancyFill = document.querySelector('.occupancy-fill');
    if (occupancyFill) {
        // Simulate changing occupancy over time for demo
        let currentWidth = 42;
        let direction = 1;
        
        setInterval(() => {
            currentWidth += direction * 0.5;
            
            // Reverse direction at boundaries
            if (currentWidth >= 80 || currentWidth <= 20) {
                direction *= -1;
            }
            
            occupancyFill.style.width = `${currentWidth}%`;
            
            // Update occupancy text
            const occupancyText = document.querySelector('.occupancy-text');
            if (occupancyText) {
                occupancyText.textContent = `${Math.round(currentWidth)}% CAPACITY`;
            }
            
            // Change color based on occupancy
            if (currentWidth > 70) {
                occupancyFill.style.backgroundColor = '#FF9800'; // Orange for high occupancy
            } else if (currentWidth > 50) {
                occupancyFill.style.backgroundColor = '#C5E17A'; // Yellow-green for medium
            } else {
                occupancyFill.style.backgroundColor = '#00E676'; // Green for low occupancy
            }
        }, 2000);
    }
    
    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .step, .cta h2');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial setup for scroll animations
    const setUpScrollAnimations = () => {
        const elements = document.querySelectorAll('.feature-card, .step, .cta h2');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
        
        // Run once on load
        animateOnScroll();
        
        // Add scroll listener
        window.addEventListener('scroll', animateOnScroll);
    };
    
    setUpScrollAnimations();
});