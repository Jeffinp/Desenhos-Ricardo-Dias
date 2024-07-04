document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('card-slider');
    const cards = slider.getElementsByClassName('card-banner');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + -144; // Width + margin
        slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

        // Update active class
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('active');
        }
        for (let i = 0; i < 3; i++) {
            let index = (currentIndex + i) % cards.length;
            cards[index].classList.add('active');
        }
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);

    // Initialize
    updateCarousel();

    // Optional: Auto-play
    // setInterval(nextCard, 5000);
});
