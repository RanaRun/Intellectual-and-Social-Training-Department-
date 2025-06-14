// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Register Service Worker for PWA functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('Service Worker registration failed: ', registrationError);
                });
        });
    }

    // Highlight active navigation link
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Handle cases for index.html (empty path or 'index.html')
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Function to display messages for forms (kept for other forms)
    function displayMessage(elementId, message, type) {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = 'form-status-message ' + type;
            messageElement.style.display = 'block'; // Make sure it's visible
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000); // Hide after 5 seconds
        }
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                displayMessage('contactFormStatus', 'សូមបំពេញគ្រប់វាលទាំងអស់។', 'error');
                return;
            }
            // Simulate form submission
            console.log('Contact Form Data:', { name, email, message });
            displayMessage('contactFormStatus', 'សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ! យើងនឹងទាក់ទងអ្នកឆាប់ៗ។', 'success');
            contactForm.reset();
        });
    }

    // Certificate Verification Form Submission (unchanged)
    const verifyCertificateForm = document.getElementById('verifyCertificateForm');
    const verificationResult = document.getElementById('verificationResult');

    if (verifyCertificateForm) {
        verifyCertificateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const certCode = document.getElementById('certCode').value.trim();

            if (certCode === '') {
                displayMessage('verificationResult', 'សូមបញ្ចូលលេខកូដវិញ្ញាបនបត្រ។', 'error');
                return;
            }

            // Simulate verification (replace with actual backend check)
            if (certCode === 'ABC12345') {
                displayMessage('verificationResult', 'វិញ្ញាបនបត្រមានសុពលភាព! ឈ្មោះ: សុខា, វគ្គសិក្សា: ការសរសេរគេហទំព័រមូលដ្ឋាន។', 'success');
            } else {
                displayMessage('verificationResult', 'លេខកូដវិញ្ញាបនបត្រមិនត្រឹមត្រូវ ឬមិនមានសុពលភាព។', 'error');
            }
        });
    }

    // Smart Header (Hide on scroll down, show on scroll up)
    let lastScrollTop = 0; // Stores the last scroll position
    const header = document.querySelector('.main-header'); // Get the header element

    if (header) { // Ensure header exists before adding listener
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Current scroll position

            // If scrolling down and past the header, add 'header-hidden' class
            if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
                header.classList.add('header-hidden');
            } 
            // If scrolling up or at the very top, remove 'header-hidden' class
            else if (scrollTop < lastScrollTop || scrollTop <= 0) {
                header.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop; // Update last scroll position
        });
    }
});
