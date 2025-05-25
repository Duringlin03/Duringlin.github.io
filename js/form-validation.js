//表单验证
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');

    function validateName() {
        if (!nameInput.value.trim()) {
            nameError.classList.remove('hidden');
            return false;
        }
        nameError.classList.add('hidden');
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.classList.remove('hidden');
            return false;
        }
        emailError.classList.add('hidden');
        return true;
    }

    function validateMessage() {
        if (!messageInput.value.trim()) {
            messageError.classList.remove('hidden');
            return false;
        }
        messageError.classList.add('hidden');
        return true;
    }

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            setTimeout(() => {
                contactForm.reset();
                formSuccess.classList.remove('hidden');
                localStorage.removeItem('contactFormData');
                setTimeout(() => formSuccess.classList.add('hidden'), 3000);
            }, 1000);
        }
    });

    contactForm.addEventListener('input', function () {
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    });

    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        nameInput.value = formData.name || '';
        emailInput.value = formData.email || '';
        messageInput.value = formData.message || '';
    }
});
