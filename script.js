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

    // ... (កូដដែលមានស្រាប់របស់អ្នកសម្រាប់ navigation highlight, contact form, certificate verification) ...
});
// script.js
document.addEventListener('DOMContentLoaded', function() {
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
            messageElement.innerHTML = message;
            messageElement.className = `form-status-message ${type}`;
            messageElement.style.display = 'block';
        }
    }

    // Contact Form Submission (unchanged)
    const contactForm = document.getElementById('contactForm');
    const contactFormStatus = document.getElementById('contactFormStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !message) {
                displayMessage('contactFormStatus', 'សូមបំពេញគ្រប់វាលទាំងអស់។', 'error');
                return;
            }

            // Simulate form submission
            console.log('Contact Form Submitted!', { name, email, message });
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

    // Removed: All Login Modal Logic
    // (loginRegisterBtn, authSection, closeAuthBtn, loginForm, registerForm, toggleToRegister, toggleToLogin)
    // If you need login/registration functionality, you would re-implement it here.
});