document.addEventListener('DOMContentLoaded', () => {
    const filters = {
        category: document.getElementById('categoryFilter'),
        cover: document.getElementById('coverFilter'),
        publisher: document.getElementById('publisherFilter'),
        priceMin: document.getElementById('priceMin'),
        priceMax: document.getElementById('priceMax'),
        sort: document.getElementById('priceSort')
    };
    
    const applyBtn = document.getElementById('applyFiltersBtn');
    const bookContainer = document.querySelector('.books-grid');
    const allBooks = Array.from(document.querySelectorAll('.book-card'));

    function applyFilters() {
        const minPrice = parseFloat(filters.priceMin.value) || 0;
        const maxPrice = parseFloat(filters.priceMax.value) || Infinity;

        let filteredBooks = allBooks.filter(book => {
            const bookPrice = parseFloat(book.dataset.price);
            const matchesCategory = filters.category.value === 'all' || book.dataset.category === filters.category.value;
            const matchesCover = filters.cover.value === 'all' || book.dataset.cover === filters.cover.value;
            const matchesPublisher = filters.publisher.value === 'all' || book.dataset.publisher === filters.publisher.value;
            const matchesPrice = bookPrice >= minPrice && bookPrice <= maxPrice;
            
            return matchesCategory && matchesCover && matchesPublisher && matchesPrice;
        });

        // Сортировка
        if (filters.sort.value === 'low') {
            filteredBooks.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        } else if (filters.sort.value === 'high') {
            filteredBooks.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        }

        // Отображение
        bookContainer.innerHTML = '';
        if (filteredBooks.length > 0) {
            filteredBooks.forEach(book => bookContainer.appendChild(book));
        } else {
            bookContainer.innerHTML = '<p style="color: white; grid-column: 1/-1; text-align: center;">Ничего не найдено</p>';
        }
    }

    // ТЕПЕРЬ ВСЁ СРАБОТАЕТ ТОЛЬКО ПРИ КЛИКЕ
    applyBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        applyFilters();
    });
});