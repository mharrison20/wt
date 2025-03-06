document.addEventListener('DOMContentLoaded', function() {
    // Animate feature bars on load
    animateFeatureBars();
    
    // Handle beta form submission
    const betaForm = document.querySelector('.beta-form');
    
    if (betaForm) {
        betaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone') ? document.getElementById('phone').value.trim() : '',
                gym: document.getElementById('gym').value.trim(),
                experience: document.querySelector('input[name="experience"]:checked').value,
                why: document.getElementById('why').value.trim(),
                updates: document.querySelector('input[name="updates"]').checked
            };
            
            // In a real implementation, you would send this to your backend
            console.log('Beta application submitted:', formData);
            
            // Show success message
            const formContainer = document.querySelector('.beta-form-container');
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00E676" stroke-width="2" width="60" height="60" style="margin: 0 auto 20px; display: block;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h2>Application Received!</h2>
                <p>Thanks for your interest in the Weight-Time beta, ${formData.name}!</p>
                <p>We're reviewing applications and will be in touch soon.</p>
                <a href="index.html" class="btn-secondary" style="display: inline-block; margin-top: 20px;">
                    Return to Homepage
                </a>
            `;
            
            // Replace form with success message
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // Scroll to success message
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
                    const mainNav = document.querySelector('.main-nav');
                    if (window.innerWidth < 768 && mainNav && mainNav.style.display === 'flex') {
                        mainNav.style.display = 'none';
                    }
                }
            }
        });
    });
    
    // Animate mockup feature bars
    function animateFeatureBars() {
        const featureFills = document.querySelectorAll('.feature-fill');
        
        featureFills.forEach((fill, index) => {
            // Set random widths for more natural appearance
            const widths = [65, 75, 85];
            const randomWidth = widths[index % widths.length];
            
            // Set initial width
            fill.style.width = '30%';
            
            // Animate to final width
            setTimeout(() => {
                fill.style.transition = 'width 1.5s ease-in-out';
                fill.style.width = `${randomWidth}%`;
            }, 300 * (index + 1));
        });
    }
    
    // Form field focus effects
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
            
            // Add 'filled' class if field has content
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });
    
    // FAQ interactions
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.transition = 'transform 0.3s ease';
            
            const number = item.querySelector('.step-number');
            if (number) {
                number.style.backgroundColor = '#00E676';
                number.style.color = '#0A0A0A';
                number.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            
            const number = item.querySelector('.step-number');
            if (number) {
                number.style.backgroundColor = 'transparent';
                number.style.color = '#00E676';
            }
        });
    });
});