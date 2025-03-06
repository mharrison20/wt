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