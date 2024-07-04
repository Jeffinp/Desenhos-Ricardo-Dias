document.addEventListener('DOMContentLoaded', function() {
    // Carrossel de imagens
    const slider = document.getElementById('card-slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let slideIndex = 0;

    function showSlide(index) {
        const slides = slider.children;
        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;
        
        for (let slide of slides) {
            slide.style.opacity = '0.5';
        }
        slides[slideIndex].style.opacity = '1';
    }

    prevBtn.addEventListener('click', () => {
        slideIndex--;
        showSlide(slideIndex);
    });

    nextBtn.addEventListener('click', () => {
        slideIndex++;
        showSlide(slideIndex);
    });

    showSlide(slideIndex);

    // Botão Voltar ao Topo
    const btnTopo = document.getElementById("btnTopo");

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnTopo.style.display = "block";
        } else {
            btnTopo.style.display = "none";
        }
    };

    btnTopo.onclick = function() {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
    };

    // Validação do formulário de contato
    const form = document.getElementById('formulario-contato');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const mensagem = form.mensagem.value.trim();

        if (nome === '' || email === '' || mensagem === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Aqui você pode adicionar o código para enviar o formulário
        alert('Mensagem enviada com sucesso!');
        form.reset();
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});