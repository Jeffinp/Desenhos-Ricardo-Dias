// Modern Infinite Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselContents = document.querySelector('.cards-contents');
    const cards = document.querySelectorAll('.card-banner');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cardMargin = 20;
    const breakpoints = {
        small: 820,
        medium: 1024
    };

    let currentIndex = 0;
    let cardsPerView = 3;
    const totalCards = cards.length;

    // Clone cards for infinite effect
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        carouselContents.appendChild(clone);
    });

    const updateCarousel = (smooth = true) => {
        const cardWidth = cards[0].offsetWidth + cardMargin;
        if (smooth) {
            carouselContents.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        } else {
            carouselContents.style.transition = 'none';
        }
        carouselContents.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Apply animations to visible cards
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + cardsPerView) {
                card.style.animation = 'fadeIn 0.8s forwards, slideIn 0.8s forwards';
            } else {
                card.style.animation = 'none';
            }
        });
    };

    const resetCarousel = () => {
        currentIndex = totalCards;
        updateCarousel(false);
    };

    const showCard = (direction) => {
        if (direction === 'next') {
            currentIndex++;
            if (currentIndex >= totalCards * 2) {
                setTimeout(() => resetCarousel(), 800);
            }
        } else {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = totalCards - 1;
                updateCarousel(false);
                setTimeout(() => {
                    currentIndex = totalCards * 2 - 1;
                    updateCarousel();
                }, 20);
                return;
            }
        }
        updateCarousel();
    };

    const updateCardsPerView = () => {
        const windowWidth = window.innerWidth;
        cardsPerView = windowWidth <= breakpoints.small ? 1 : windowWidth <= breakpoints.medium ? 2 : 3;
        updateCarousel(false);
    };

    nextButton.addEventListener('click', () => showCard('next'));
    prevButton.addEventListener('click', () => showCard('prev'));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showCard('next');
        if (e.key === 'ArrowLeft') showCard('prev');
    });

    window.addEventListener('resize', updateCardsPerView);
    updateCardsPerView();
});

// Mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileNavToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        mobileNav.style.maxHeight = isOpen ? `${mobileNav.scrollHeight}px` : '0';
        mobileNav.style.opacity = isOpen ? '1' : '0';
    });
});

// Before and after slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('antes-depois-slider');
    const items = Array.from(slider.getElementsByClassName('antes-depois-item'));
    const prevBtn = slider.parentElement.querySelector('.prev');
    const nextBtn = slider.parentElement.querySelector('.next');
    let currentIndex = 0;

    const updateCarousel = () => {
        const containerWidth = slider.offsetWidth;
        const itemWidth = items[0].offsetWidth;
        const visibleItems = Math.floor(containerWidth / itemWidth);
        
        slider.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        items.forEach((item, index) => {
            item.classList.toggle('active', index >= currentIndex && index < currentIndex + visibleItems);
        });

        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex >= items.length - visibleItems ? 'none' : 'block';
    };

    const moveSlider = (direction) => {
        const containerWidth = slider.offsetWidth;
        const itemWidth = items[0].offsetWidth;
        const visibleItems = Math.floor(containerWidth / itemWidth);
        currentIndex = Math.max(0, Math.min(currentIndex + direction, items.length - visibleItems));
        updateCarousel();
    };

    nextBtn.addEventListener('click', () => moveSlider(1));
    prevBtn.addEventListener('click', () => moveSlider(-1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') moveSlider(-1);
        if (e.key === 'ArrowRight') moveSlider(1);
    });

    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
    slider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) moveSlider(diff > 0 ? 1 : -1);
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});