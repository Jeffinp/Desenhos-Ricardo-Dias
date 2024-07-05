document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('card-slider');
    const cards = Array.from(slider.getElementsByClassName('card-banner'));
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 20; // Width + margin
        const visibleCards = window.innerWidth > 1365 ? 3 : window.innerWidth > 768 ? 2 : 1;
        
        slider.style.transition = 'transform 0.3s ease-in-out';
        slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

        // Update active class
        cards.forEach((card, index) => {
            card.classList.toggle('active', index >= currentIndex && index < currentIndex + visibleCards);
        });
    }

    function nextCard() {
        const visibleCards = window.innerWidth > 1365 ? 3 : window.innerWidth > 768 ? 2 : 1;
        currentIndex = (currentIndex + visibleCards) % cards.length;
        updateCarousel();
    }

    function prevCard() {
        const visibleCards = window.innerWidth > 1365 ? 3 : window.innerWidth > 768 ? 2 : 1;
        currentIndex = (currentIndex - visibleCards + cards.length) % cards.length;
        updateCarousel();
    }

    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);

    // Adiciona navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevCard();
        if (e.key === 'ArrowRight') nextCard();
    });

    // Adiciona suporte para swipe em dispositivos touch
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextCard();
        } else if (touchEndX - touchStartX > 50) {
            prevCard();
        }
    }

    // Ajustar o carousel quando a janela é redimensionada
    window.addEventListener('resize', updateCarousel);

    // Inicializa o carousel
    updateCarousel();
});

//ANTES E DEPOIS SLIDER
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('antes-depois-slider');
    const items = Array.from(slider.getElementsByClassName('antes-depois-item'));
    const prevBtn = slider.parentElement.querySelector('.prev');
    const nextBtn = slider.parentElement.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
        const containerWidth = slider.offsetWidth;
        const itemWidth = items[0].offsetWidth;
        const visibleItems = Math.floor(containerWidth / itemWidth);
        
        slider.style.transition = 'transform 0.3s ease-in-out';
        slider.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        // Update active class
        items.forEach((item, index) => {
            item.classList.toggle('active', index >= currentIndex && index < currentIndex + visibleItems);
        });

        // Hide/show navigation buttons
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex >= items.length - visibleItems ? 'none' : 'block';
    }

    function nextItem() {
        const containerWidth = slider.offsetWidth;
        const itemWidth = items[0].offsetWidth;
        const visibleItems = Math.floor(containerWidth / itemWidth);
        if (currentIndex < items.length - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevItem() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    nextBtn.addEventListener('click', nextItem);
    prevBtn.addEventListener('click', prevItem);

    // Adiciona navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevItem();
        if (e.key === 'ArrowRight') nextItem();
    });

    // Adiciona suporte para swipe em dispositivos touch
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 100000) {
            nextItem();
        } else if (touchEndX - touchStartX > 50) {
            prevItem();
        }
    }

    // Ajusta o carousel quando a janela é redimensionada
    window.addEventListener('resize', updateCarousel);

    // Inicializa o carousel
    updateCarousel();
});


document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileNavToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });
});