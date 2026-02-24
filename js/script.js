document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. ГЛАВНАЯ КАРУСЕЛЬ (БАННЕРЫ) ==========
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const heroCarousel = document.querySelector('.hero-carousel');
    
    if (carouselContainer && slides.length && heroCarousel) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
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
        
        heroCarousel.appendChild(dotsContainer);
        
        function updateCarousel() {
            carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active-dot', index === currentIndex);
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
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }

    // ========== 2. КАРУСЕЛЬ ХИТОВ ПРОДАЖ (КНИГИ) ==========
  
const booksTrack = document.querySelector('.trending .Books');
const nextBooksBtn = document.querySelector('.trending-next');
const prevBooksBtn = document.querySelector('.trending-prev');
const booksWrapper = document.querySelector('.books-slider-wrapper');

if (booksTrack && nextBooksBtn && prevBooksBtn && booksWrapper) {
    let currentPos = 0;

  
    function getScrollStep() {
        const firstBlock = booksTrack.querySelector('.Block');
        if (!firstBlock) return 0;
        
        const blockWidth = firstBlock.offsetWidth; 
        const gap = 30; 
        
        return (blockWidth + gap) * 2; 
    }

    nextBooksBtn.addEventListener('click', () => {
        const step = getScrollStep();
        const maxScroll = -(booksTrack.scrollWidth - booksWrapper.offsetWidth);
        
        currentPos -= step;
        
     
        if (currentPos < maxScroll) {
            currentPos = maxScroll;
        }
        
        booksTrack.style.transform = `translateX(${currentPos}px)`;
    });

    prevBooksBtn.addEventListener('click', () => {
        const step = getScrollStep();
        
        currentPos += step;
        
        
        if (currentPos > 0) {
            currentPos = 0;
        }
        
        booksTrack.style.transform = `translateX(${currentPos}px)`;
    });

    
    window.addEventListener('resize', () => {
        currentPos = 0;
        booksTrack.style.transform = `translateX(0px)`;
    });
}

}); 
document.addEventListener('DOMContentLoaded', function() {
    const catalogBtn = document.getElementById('catalogTrigger');
    const catalogMenu = document.getElementById('catalogMenu');

    catalogBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Чтобы страница не перезагружалась
        catalogMenu.classList.toggle('active');
    });

    // Закрытие меню, если кликнули в любое другое место сайта
    document.addEventListener('click', function(e) {
        if (!catalogBtn.contains(e.target) && !catalogMenu.contains(e.target)) {
            catalogMenu.classList.remove('active');
        }
    });
});