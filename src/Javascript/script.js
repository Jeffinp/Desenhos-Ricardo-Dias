
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
});

// Form submission
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert('Mensagem enviada! Entraremos em contato em breve.');
    form.reset();
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Toggle mobile menu
const menuToggle = document.createElement('button');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('header .container').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});

// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.disconnect();
            }
        });
    });

    io.observe(target);
};

lazyImages.forEach(lazyLoad);

// Add scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollTopButton.classList.add('scroll-top');
document.body.appendChild(scrollTopButton);

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
});