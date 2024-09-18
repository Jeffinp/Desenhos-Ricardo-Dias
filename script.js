// Utilities
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Modern Infinite Carousel functionality
const initInfiniteCarousel = () => {
    const carouselContents = $('.cards-contents');
    const cards = $$('.card-banner');
    const prevButton = $('.carousel-button.prev');
    const nextButton = $('.carousel-button.next');

    if (!carouselContents || cards.length === 0 || !prevButton || !nextButton) {
        console.warn('Some carousel elements are missing. Skipping carousel initialization.');
        return;
    }

    const cardMargin = 20;
    const breakpoints = { small: 820, medium: 1024 };

    let currentIndex = 0;
    let cardsPerView = 3;
    const totalCards = cards.length;

    let touchStartX = 0;

    const handleTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > swipeThreshold) {
            showCard(swipeDistance > 0 ? 'next' : 'prev');
        }
    };

    carouselContents.addEventListener('touchstart', handleTouchStart);
    carouselContents.addEventListener('touchend', handleTouchEnd);

    cards.forEach(card => carouselContents.appendChild(card.cloneNode(true)));

    const updateCarousel = (smooth = true) => {
        const cardWidth = cards[0].offsetWidth + cardMargin;
        carouselContents.style.transition = smooth ? 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none';
        carouselContents.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        cards.forEach((card, index) => {
            card.style.animation = (index >= currentIndex && index < currentIndex + cardsPerView) 
                ? 'fadeIn 0.8s forwards, slideIn 0.8s forwards'
                : 'none';
        });
    };

    const resetCarousel = () => {
        currentIndex = totalCards;
        updateCarousel(false);
    };

    const showCard = (direction) => {
        currentIndex += direction === 'next' ? 1 : -1;
        if (currentIndex >= totalCards * 2) {
            setTimeout(resetCarousel, 800);
        } else if (currentIndex < 0) {
            currentIndex = totalCards - 1;
            updateCarousel(false);
            setTimeout(() => {
                currentIndex = totalCards * 2 - 1;
                updateCarousel();
            }, 20);
            return;
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
};

// Mobile navigation
const initMobileNavigation = () => {
    const mobileNavToggle = $('.mobile-nav-toggle');
    const mobileNav = $('.mobile-nav');

    if (!mobileNavToggle || !mobileNav) {
        console.warn('Mobile navigation elements are missing. Skipping mobile navigation initialization.');
        return;
    }

    mobileNavToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        mobileNav.style.maxHeight = isOpen ? `${mobileNav.scrollHeight}px` : '0';
        mobileNav.style.opacity = isOpen ? '1' : '0';
    });
};

// Before and After Slider
const initBeforeAfterSlider = () => {
    const slider = $('#antes-depois-slider');
    const items = $$('.antes-depois-item');
    const prevBtn = $('.carousel-button2.prev');
    const nextBtn = $('.carousel-button2.next');
    const container = $('.carousel-container2');

    if (!slider || items.length === 0 || !prevBtn || !nextBtn || !container) {
        console.warn('Before and after slider elements are missing. Skipping slider initialization.');
        return;
    }

    let currentIndex = 0;
    let touchStartX = 0;

    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'slider-indicator';
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        dot.addEventListener('click', () => goToSlide(index));
        indicatorContainer.appendChild(dot);
    });
    container.appendChild(indicatorContainer);

    const updateCarousel = () => {
        const isMobile = window.innerWidth < 768;
        slider.style.transform = isMobile ? `translateX(${-currentIndex * 100}%)` : 'none';
        
        $$('.indicator-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        prevBtn.style.visibility = isMobile ? (currentIndex === 0 ? 'hidden' : 'visible') : 'hidden';
        nextBtn.style.visibility = isMobile ? (currentIndex === items.length - 1 ? 'hidden' : 'visible') : 'hidden';
        indicatorContainer.style.display = isMobile ? 'flex' : 'none';
    };

    const goToSlide = (index) => {
        if (window.innerWidth < 768) {
            currentIndex = index;
            updateCarousel();
        }
    };

    const moveSlider = (direction) => {
        if (window.innerWidth < 768) {
            currentIndex = Math.max(0, Math.min(currentIndex + direction, items.length - 1));
            updateCarousel();
        }
    };

    const handleTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (window.innerWidth < 768 && Math.abs(diff) > 50) {
            moveSlider(diff > 0 ? 1 : -1);
        }
    };

    nextBtn.addEventListener('click', () => moveSlider(1));
    prevBtn.addEventListener('click', () => moveSlider(-1));
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', updateCarousel);

    updateCarousel();
};

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initInfiniteCarousel();
    initMobileNavigation();
    initBeforeAfterSlider();
});