document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('card-slider');
    const cards = slider.getElementsByClassName('card-banner');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function showCards() {
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.display = 'none';
        }
        for (let i = 0; i < 3; i++) {
            let index = (currentIndex + i) % cards.length;
            cards[index].style.display = 'block';
        }
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCards();
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCards();
    }

    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);

    showCards();
});