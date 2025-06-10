// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-darkBlue');
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('bg-darkBlue');
        navbar.classList.remove('shadow-lg');
    }
});

// Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
const animateElements = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

// Animate Skill Bars
const animateSkillBars = () => {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const elementTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }
    });
};

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.add('opacity-0', 'invisible');
        backToTopButton.classList.remove('opacity-100', 'visible');
    }
    
    animateElements();
    animateSkillBars();
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FIXED TESTIMONIAL SLIDER
const testimonialSlider = document.getElementById('testimonial-slider');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevButton = document.getElementById('testimonial-prev');
const nextButton = document.getElementById('testimonial-next');
let currentSlide = 0;
const totalSlides = 3;

// Initialize the first dot as active
if (testimonialDots.length > 0) {
    testimonialDots[0].classList.add('opacity-100');
    testimonialDots[0].classList.remove('opacity-50');
}

function showSlide(index) {
    // Update slider position
    if (testimonialSlider) {
        testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
    }
    
    // Update dots
    testimonialDots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('opacity-100');
            dot.classList.remove('opacity-50');
        } else {
            dot.classList.remove('opacity-100');
            dot.classList.add('opacity-50');
        }
    });
    
    currentSlide = index;
}

// Previous button click
if (prevButton) {
    prevButton.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = totalSlides - 1;
        showSlide(newIndex);
    });
}

// Next button click
if (nextButton) {
    nextButton.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= totalSlides) newIndex = 0;
        showSlide(newIndex);
    });
}

// Dot navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide testimonials
let testimonialInterval = setInterval(() => {
    let newIndex = currentSlide + 1;
    if (newIndex >= totalSlides) newIndex = 0;
    showSlide(newIndex);
}, 5000);

// Pause auto slide on hover
const testimonialSection = document.getElementById('testimonials');
if (testimonialSection) {
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= totalSlides) newIndex = 0;
            showSlide(newIndex);
        }, 5000);
    });
}

// Form Submission (Demo)
const contactForm = document.querySelector('#contact form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (nameInput.value && emailInput.value && messageInput.value) {
            alert('Terima kasih! Pesan Anda telah dikirim. Ini adalah demo, jadi tidak ada pesan yang benar-benar terkirim.');
            contactForm.reset();
        } else {
            alert('Mohon isi semua field yang diperlukan.');
        }
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    animateElements();
    animateSkillBars();
    
    // Trigger initial navbar style
    if (window.scrollY > 50) {
        navbar.classList.add('bg-darkBlue');
        navbar.classList.add('shadow-lg');
    }
});