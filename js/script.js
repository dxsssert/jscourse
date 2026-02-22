document.addEventListener('DOMContentLoaded', function() {
    // ========== КАРУСЕЛЬ ==========
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const heroCarousel = document.querySelector('.hero-carousel');
    
    // Проверяем, есть ли карусель на странице
    if (!carouselContainer || !slides.length || !heroCarousel) return;
    
    // Создаем контейнер для точек
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Создаем точки
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active-dot');
        
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        
        dotsContainer.appendChild(dot);
    }
    
    // Добавляем точки в карусель
    heroCarousel.appendChild(dotsContainer);
    
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем активную точку
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }
    
    // Автопрокрутка
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);
});