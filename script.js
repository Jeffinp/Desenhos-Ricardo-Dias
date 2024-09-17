// Utilities
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Modern Infinite Carousel functionality
const initInfiniteCarousel = () => {
    const carouselContents = $('.cards-contents');
    const cards = $$('.card-banner');
    const prevButton = $('.carousel-button.prev');
    const nextButton = $('.carousel-button.next');

    // Check if all necessary elements exist
    if (!carouselContents || cards.length === 0 || !prevButton || !nextButton) {
        console.warn('Some carousel elements are missing. Skipping carousel initialization.');
        return;
    }

    const cardMargin = 20;
    const breakpoints = { small: 820, medium: 1024 };

    let currentIndex = 0;
    let cardsPerView = 3;
    const totalCards = cards.length;

    // Touch functionality for swiping
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContents.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContents.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                showCard('next');
            } else {
                showCard('prev');
            }
        }
    };

    // Clone cards for infinite effect
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

// Antes e depois slider
let beforeAfterSliderInitialized = false;  // Flag to track initialization state

const initBeforeAfterSlider = () => {
    const slider = document.querySelector('#antes-depois-slider');
    const items = Array.from(document.querySelectorAll('.antes-depois-item'));
    const prevBtn = slider?.parentElement?.querySelector('.prev');
    const nextBtn = slider?.parentElement?.querySelector('.next');

    // Check if elements exist, and if slider is not already initialized
    if (!slider || items.length === 0 || !prevBtn || !nextBtn) {
        console.warn('Before and after slider elements are missing. Skipping slider initialization.');
        return;
    }

    if (beforeAfterSliderInitialized) {
        console.log('Slider is already initialized.');
        return;  // Exit if already initialized
    }

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

    const handleKeydown = (e) => {
        if (e.key === 'ArrowLeft') moveSlider(-1);
        if (e.key === 'ArrowRight') moveSlider(1);
    };

    document.addEventListener('keydown', handleKeydown);

    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
    slider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) moveSlider(diff > 0 ? 1 : -1);
    });

    const handleResize = () => updateCarousel();
    window.addEventListener('resize', handleResize);

    // Mark the slider as initialized
    beforeAfterSliderInitialized = true;

    // Initial update
    updateCarousel();

    // Function to clean up event listeners if needed
    const destroySlider = () => {
        nextBtn.removeEventListener('click', () => moveSlider(1));
        prevBtn.removeEventListener('click', () => moveSlider(-1));
        document.removeEventListener('keydown', handleKeydown);
        slider.removeEventListener('touchstart', touchStartX);
        slider.removeEventListener('touchend', touchEndX);
        window.removeEventListener('resize', handleResize);

        beforeAfterSliderInitialized = false;
    };

    return destroySlider;  // Optionally return the destroy function to be called if needed
};

// Call this when the page loads or relevant section becomes visible
initBeforeAfterSlider();

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initInfiniteCarousel();
    initMobileNavigation();
    initBeforeAfterSlider();
});