document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const body = document.body;

    if (toggle && navLinks && menuIcon && closeIcon) {
        toggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            menuIcon.style.display = isOpen ? 'none' : 'inline';
            closeIcon.style.display = isOpen ? 'inline' : 'none';
            // Lock or unlock body scroll
            if (isOpen) {
                body.classList.add('menu-open');
            } else {
                body.classList.remove('menu-open');
            }
        });
    }

    // Dropdown toggle for Services on mobile
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    function isMobile() {
        return window.innerWidth <= 768;
    }
    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            if (isMobile()) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });
    }

    // Optional: Close dropdown when resizing from mobile to desktop
    window.addEventListener('resize', function() {
        if (!isMobile() && dropdown) {
            dropdown.classList.remove('open');
        }
        if (!isMobile() && navLinks) {
            navLinks.classList.remove('active');
            menuIcon.style.display = 'inline';
            closeIcon.style.display = 'none';
        }
    });

    // Animate .wrapper when it enters the viewport
    const wrapper = document.querySelector('.wrapper');
    function revealWrapperOnScroll() {
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight - 100) { // 100px before it fully enters
            wrapper.classList.add('visible');
            window.removeEventListener('scroll', revealWrapperOnScroll);
        }
    }
    revealWrapperOnScroll();
    window.addEventListener('scroll', revealWrapperOnScroll);

    // Initialize international telephone input
    var input = document.querySelector("#phone");
    var errorMsg = document.querySelector("#phone-error");
    var iti = window.intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            fetch('https://ipapi.co/json')
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback('NG'));
        },
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"
    });

    function validatePhone() {
        if (input.value.trim()) {
            if (iti.isValidNumber()) {
                errorMsg.style.display = "none";
                input.style.borderColor = "#ccc";
            } else {
                errorMsg.style.display = "block";
                input.style.borderColor = "red";
            }
        } else {
            errorMsg.style.display = "none";
            input.style.borderColor = "#ccc";
        }
    }

    input.addEventListener('blur', validatePhone);
    input.addEventListener('change', validatePhone);
    input.addEventListener('keyup', validatePhone);

    // Optional: Prevent form submission if invalid
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        if (!iti.isValidNumber()) {
            e.preventDefault();
            errorMsg.style.display = "block";
            input.style.borderColor = "red";
            input.focus();
        }
    });
});