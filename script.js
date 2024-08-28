document.addEventListener('DOMContentLoaded', () => {
    const carouselContents = document.querySelector('.cards-contents');
    const cards = document.querySelectorAll('.card-banner');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cardMargin = 20; // Margem horizontal aplicada às cartas
    const cardsPerViewLarge = 3; // Imagens visíveis em telas grandes
    const cardsPerViewMedium = 2; // Imagens visíveis em tamanhos entre 820px e 1024px
    const cardsPerViewSmall = 1; // Imagens visíveis em dispositivos móveis

    let currentIndex = 10;
    let cardsPerView = cardsPerViewLarge;
    const totalCards = cards.length;

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + cardMargin;
        carouselContents.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function showNextCard() {
        if (currentIndex + cardsPerView < totalCards) {
            currentIndex += cardsPerView;
        } else {
            currentIndex = 0; // Retorna ao início se atingir o final
        }
        updateCarousel();
    }

    function showPreviousCard() {
        if (currentIndex - cardsPerView >= 0) {
            currentIndex -= cardsPerView;
        } else {
            currentIndex = totalCards - cardsPerView; // Vai para o final se estiver no início
        }
        updateCarousel();
    }

    function updateCardsPerView() {
        if (window.matchMedia('(max-width: 820px)').matches) {
            cardsPerView = cardsPerViewSmall;
        } else if (window.matchMedia('(max-width: 1024px)').matches) {
            cardsPerView = cardsPerViewMedium;
        } else {
            cardsPerView = cardsPerViewLarge;
        }
        currentIndex = Math.min(currentIndex, totalCards - cardsPerView); // Ajusta o índice atual
        updateCarousel();
    }

    nextButton.addEventListener('click', showNextCard);
    prevButton.addEventListener('click', showPreviousCard);

    // Opcional: Adicionar navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNextCard();
        if (e.key === 'ArrowLeft') showPreviousCard();
    });

    // Atualiza o carrossel ao redimensionar a tela
    window.addEventListener('resize', updateCardsPerView);

    // Inicializa o carrossel
    updateCardsPerView();
});



document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileNavToggle.addEventListener('click', function() {
        if (mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            mobileNav.style.maxHeight = '0'; // Reseta a altura máxima
            mobileNav.style.opacity = '0'; // Reseta a opacidade
        } else {
            mobileNav.classList.add('open');
            mobileNav.style.maxHeight = mobileNav.scrollHeight + 'px'; // Ajusta a altura máxima para a altura real do conteúdo
            mobileNav.style.opacity = '1'; // Torna visível
        }
    });
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

    //navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevItem();
        if (e.key === 'ArrowRight') nextItem();
    });

    //suporte para swipe em dispositivos touch
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

//NAVIGATOR ANIMADO
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileNavToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });
});