document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const heroCarousel = document.querySelector('.hero-carousel');
    
    if (carouselContainer && slides.length && heroCarousel) {
        let currentIndex = 0;
        const totalSlides = slides.length;
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
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }

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

    const contactModal = document.getElementById('contactModal');
    const writeBtn = document.getElementById('writeUsBtn');
    const actionBtn = document.getElementById('contactActionBtn');
    const closeBtn = document.getElementById('closeContact');
    const successCloseBtn = document.getElementById('closeSuccessBtn');
    const contactForm = document.getElementById('contactForm');
    const successContent = document.querySelector('.success-content');
    const formContent = document.querySelector('.form-content');

    function openModal() {
        if (contactModal) {
            contactModal.classList.add('active');
            contactModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (contactModal) {
            contactModal.classList.remove('active');
            contactModal.classList.remove('success-active');
            contactModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                if (successContent) successContent.style.display = 'none';
                if (formContent) formContent.style.display = 'block';
                if (contactForm) contactForm.reset();
            }, 300);
        }
    }

    if (writeBtn) writeBtn.addEventListener('click', openModal);
    if (actionBtn) actionBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeModal);

    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeModal();
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactModal.classList.add('success-active');
            if (formContent) formContent.style.display = 'none';
            if (successContent) successContent.style.display = 'flex';
        });
    }
});

const reviewsContainer = document.querySelector('.reviews');
if (reviewsContainer) {
    const cards = reviewsContainer.innerHTML;
    reviewsContainer.innerHTML = cards + cards;
}