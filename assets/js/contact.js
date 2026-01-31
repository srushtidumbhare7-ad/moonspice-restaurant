// ========================
// CONTACT FORM HANDLING
// ========================
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

// ========================
// FORM VALIDATION
// ========================
const validateContactForm = (formData) => {
    const errors = {};

    // Validate name
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
        errors.name = 'Name must be at least 3 characters';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Validate subject
    if (!formData.subject.trim()) {
        errors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
        errors.subject = 'Subject must be at least 3 characters';
    }

    // Validate message
    if (!formData.message.trim()) {
        errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }

    return errors;
};

// ========================
// SHOW FORM ERRORS
// ========================
const showFormErrors = (errors) => {
    // Clear previous errors
    contactForm.querySelectorAll('.error-msg').forEach(el => {
        el.textContent = '';
    });
    contactForm.querySelectorAll('.form-group').forEach(el => {
        el.classList.remove('error');
    });

    // Show new errors
    Object.keys(errors).forEach(fieldName => {
        const input = contactForm.querySelector(`[name="${fieldName}"]`);
        if (input) {
            input.parentElement.classList.add('error');
            const errorMsg = input.parentElement.querySelector('.error-msg');
            if (errorMsg) {
                errorMsg.textContent = errors[fieldName];
            }
        }
    });
};

// ========================
// SHOW FORM RESPONSE
// ========================
const showResponse = (message, isSuccess) => {
    formResponse.textContent = message;
    formResponse.className = isSuccess ? 'success' : 'error';
    formResponse.style.display = 'block';

    setTimeout(() => {
        formResponse.style.display = 'none';
    }, 5000);
};

// ========================
// FORM SUBMISSION
// ========================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        };

        // Validate form
        const errors = validateContactForm(formData);

        if (Object.keys(errors).length > 0) {
            showFormErrors(errors);
            showResponse('Please fix the errors above', false);
            return;
        }

        // Clear previous errors
        contactForm.querySelectorAll('.error-msg').forEach(el => {
            el.textContent = '';
        });
        contactForm.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('error');
        });

        // Show success message
        showResponse(
            'Thank you for contacting us! We will get back to you shortly.',
            true
        );

        // Reset form
        contactForm.reset();
    });
}

// ========================
// ADD ERROR MESSAGE ELEMENTS
// ========================
window.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.contact-form .form-group');
    formInputs.forEach(group => {
        if (!group.querySelector('.error-msg')) {
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-msg';
            group.appendChild(errorMsg);
        }
    });
});
