document.addEventListener('DOMContentLoaded', () => {
    
    // ========== 1. ГЛАВНАЯ КАРУСЕЛЬ (БАННЕРЫ) ==========
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const heroCarousel = document.querySelector('.hero-carousel');
    
    if (carouselContainer && slides.length && heroCarousel) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Создаем точки (dots)
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active-dot');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        });
        heroCarousel.appendChild(dotsContainer);
        
        function updateCarousel() {
            carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active-dot', index === currentIndex);
            });
        }
        
        nextBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });
        
        prevBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
        
        // Автопрокрутка баннеров
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
            if (currentPos < maxScroll) currentPos = maxScroll;
            booksTrack.style.transform = `translateX(${currentPos}px)`;
        });

        prevBooksBtn.addEventListener('click', () => {
            const step = getScrollStep();
            currentPos += step;
            if (currentPos > 0) currentPos = 0;
            booksTrack.style.transform = `translateX(${currentPos}px)`;
        });

        window.addEventListener('resize', () => {
            currentPos = 0;
            booksTrack.style.transform = `translateX(0px)`;
        });
    }

    // ========== 3. КАТАЛОГ (ВЫПАДАЮЩЕЕ МЕНЮ) ==========
    const catalogTrigger = document.getElementById('catalogTrigger');
    const catalogMenu = document.getElementById('catalogMenu');

    if (catalogTrigger && catalogMenu) {
        catalogTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            catalogMenu.classList.toggle('active');
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!catalogTrigger.contains(e.target) && !catalogMenu.contains(e.target)) {
                catalogMenu.classList.remove('active');
            }
        });
    }

    // ========== 4. ЛОГИКА КОРЗИНЫ (LOCAL STORAGE) ==========
    const addButtons = document.querySelectorAll('.add-to-cart-btn');

    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const book = {
                id: btn.dataset.id,
                title: btn.dataset.title,
                author: btn.dataset.author,
                price: parseInt(btn.dataset.price),
                image: btn.dataset.image,
                count: 1
            };

            let cart = JSON.parse(localStorage.getItem('bookline_cart')) || [];
            const existingBook = cart.find(item => item.id === book.id);

            if (existingBook) {
                existingBook.count += 1;
            } else {
                cart.push(book);
            }

            localStorage.setItem('bookline_cart', JSON.stringify(cart));

            // Визуальный фидбек
            const originalText = btn.innerText;
            btn.innerText = 'Добавлено! ✓';
            btn.style.backgroundColor = '#28a745'; 
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = ''; 
                btn.disabled = false;
            }, 1000);
        });
    });
});

const reviewsContainer = document.querySelector('.reviews');

if (reviewsContainer) {
    // Копируем все карточки, которые уже есть в HTML
    const cards = reviewsContainer.innerHTML;
    
    // Добавляем их в конец еще раз, чтобы создать "вторую порцию"
    reviewsContainer.innerHTML = cards + cards;
    
    // Если отзывов очень мало (всего 2-3), можно добавить еще раз:
    // reviewsContainer.innerHTML += cards;
}