/**
 * Utilitários
 * ===========
 * Funções auxiliares para seleção de elementos do DOM.
 */
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

/**
 * Carrossel Infinito Moderno
 * ==========================
 * Funcionalidade para um carrossel infinito, responsivo e com suporte a toque.
 */
const initInfiniteCarousel = () => {
    const carouselContents = $('.cards-contents');
    const cards = $$('.card-banner');
    const prevButton = $('.carousel-button.prev');
    const nextButton = $('.carousel-button.next');

    if (!carouselContents || cards.length === 0 || !prevButton || !nextButton) {
        console.warn('Alguns elementos do carrossel estão faltando. Ignorando a inicialização do carrossel.');
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

    carouselContents.addEventListener('touchstart', handleTouchStart, { passive: true }); // Listener passivo para touchstart
    carouselContents.addEventListener('touchend', handleTouchEnd, { passive: true });   // Listener passivo para touchend

    // Duplica os cards para criar o efeito de loop infinito
    cards.forEach(card => carouselContents.appendChild(card.cloneNode(true)));

    const updateCarousel = (smooth = true) => {
        const cardWidth = cards[0].offsetWidth + cardMargin;
        carouselContents.style.transition = smooth ? 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none';
        carouselContents.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        cards.forEach((card, index) => {
            // Aplica animações de fadeIn e slideIn apenas aos cards visíveis
            card.style.animation = (index >= currentIndex && index < currentIndex + cardsPerView)
                ? 'fadeIn 0.8s forwards, slideIn 0.8s forwards'
                : 'none';
        });
    };

    const resetCarousel = () => {
        currentIndex = totalCards;
        updateCarousel(false); // Atualiza sem transição suave
    };

    const showCard = (direction) => {
        currentIndex += direction === 'next' ? 1 : -1;
        if (currentIndex >= totalCards * 2) {
            // Quando chega ao final do loop, reseta para o início
            setTimeout(resetCarousel, 800);
        } else if (currentIndex < 0) {
            // Quando chega ao início do loop, reseta para o final
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
    // configuração do header
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY; // Store the initial scroll position

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) { // Threshold to avoid hiding on very small scrolls
            if (currentScrollY > lastScrollY && !header.classList.contains('header--hidden')) {
                // Scrolling Down and header is visible - Hide it
                header.classList.add('header--hidden');
            } else if (currentScrollY < lastScrollY && header.classList.contains('header--hidden')) {
                // Scrolling Up and header is hidden - Show it
                header.classList.remove('header--hidden');
            }
        } else {
            // If scrolled back to the top (or above threshold), ensure header is visible
            header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY; // Update last scroll position
    });

/**
 * Navegação Mobile
 * =================
 * Funcionalidade para o menu de navegação em dispositivos móveis.
 */
const initMobileNavigation = () => {
    const mobileNavToggle = $('.mobile-nav-toggle');
    const mobileNav = $('.mobile-nav');

    if (!mobileNavToggle || !mobileNav) {
        console.warn('Elementos de navegação móvel estão faltando. Ignorando a inicialização da navegação móvel.');
        return;
    }

    mobileNavToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        // Ajusta a altura máxima e a opacidade para a animação
        mobileNav.style.maxHeight = isOpen ? `${mobileNav.scrollHeight}px` : '0';
        mobileNav.style.opacity = isOpen ? '1' : '0';
        // Atualiza o atributo aria-expanded para acessibilidade
        mobileNavToggle.setAttribute('aria-expanded', isOpen);
    });
};

/**
 * Slider Antes e Depois
 * =====================
 * Funcionalidade para um slider de comparação de imagens "antes e depois".
 */
const initBeforeAfterSlider = () => {
    const slider = $('#antes-depois-slider');
    const items = $$('.antes-depois-item');
    const prevBtn = $('.carousel-button2.prev');
    const nextBtn = $('.carousel-button2.next');
    const container = $('.carousel-container2');

    if (!slider || items.length === 0 || !prevBtn || !nextBtn || !container) {
        console.warn('Elementos do slider "antes e depois" estão faltando. Ignorando a inicialização do slider.');
        return;
    }

    let currentIndex = 0;
    let touchStartX = 0;

    // Cria os indicadores de slide
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
        slider.style.transform = `translateX(${-currentIndex * 100}%)`;

        // Atualiza os indicadores de slide
        $$('.indicator-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Controla a visibilidade dos botões de navegação
        prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        nextBtn.style.visibility = currentIndex === items.length - 1 ? 'hidden' : 'visible';
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateCarousel();
    };

    const moveSlider = (direction) => {
        currentIndex = Math.max(0, Math.min(currentIndex + direction, items.length - 1));
        updateCarousel();
    };

    const handleTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            moveSlider(diff > 0 ? 1 : -1);
        }
    };

    nextBtn.addEventListener('click', () => moveSlider(1));
    prevBtn.addEventListener('click', () => moveSlider(-1));
    slider.addEventListener('touchstart', handleTouchStart, { passive: true }); // Listener passivo para touchstart
    slider.addEventListener('touchend', handleTouchEnd, { passive: true });   // Listener passivo para touchend

    updateCarousel();
};

/**
 * Inicialização de todos os componentes
 * ====================================
 * Executa as funções de inicialização de cada componente após o carregamento do DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    initInfiniteCarousel();
    initMobileNavigation();
    initBeforeAfterSlider();
});