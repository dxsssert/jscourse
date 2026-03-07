document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cartItems');
    const itemsTotalDisplay = document.getElementById('itemsTotal');
    const finalTotalDisplay = document.getElementById('finalTotal');
    const checkoutBtn = document.getElementById('goToCheckout');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('bookline_cart')) || [];
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p style="color: #888; text-align: center; font-size: 20px; margin-top: 50px; font-family: Josefin Sans;">Ваша корзина пуста</p>';
            updateTotals();
            return;
        }

        cartContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item" data-id="${item.id}" data-index="${index}">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img" style="width: 80px; border-radius: 5px;">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <small>${item.author || ''}</small>
                </div>
                <div class="cart-item-controls">
                    <button class="count-btn minus">-</button>
                    <span class="count-num">${item.count}</span>
                    <button class="count-btn plus">+</button>
                </div>
                <div class="cart-item-price" data-price="${item.price}">${(item.price * item.count).toLocaleString()} ₽</div>
                <button class="remove-item-btn">✕</button>
            </div>
        `).join('');

        updateTotals();
    }

    function updateTotals() {
        let total = 0;
        const cartItems = [];
        const items = document.querySelectorAll('.cart-item');

        items.forEach(item => {
            const id = item.getAttribute('data-id');
            const title = item.querySelector('h4').innerText;
            const priceElement = item.querySelector('.cart-item-price');
            const price = parseInt(priceElement.getAttribute('data-price'));
            const count = parseInt(item.querySelector('.count-num').innerText);
            
            const itemSubtotal = price * count;
            total += itemSubtotal;
            
            priceElement.innerText = itemSubtotal.toLocaleString() + ' ₽';

            cartItems.push({
                id,
                title,
                price,
                count,
                image: item.querySelector('img').src,
                author: item.querySelector('small').innerText
            });
        });

        localStorage.setItem('bookline_cart', JSON.stringify(cartItems));

        const formattedTotal = total.toLocaleString() + ' ₽';
        if (itemsTotalDisplay) itemsTotalDisplay.innerText = formattedTotal;
        if (finalTotalDisplay) finalTotalDisplay.innerText = formattedTotal;
    }

    if (cartContainer) {
        cartContainer.addEventListener('click', (e) => {
            const target = e.target;

            if (target.closest('.count-btn')) {
                const btn = target.closest('.count-btn');
                const countSpan = btn.parentElement.querySelector('.count-num');
                let currentCount = parseInt(countSpan.innerText);

                if (btn.classList.contains('plus')) {
                    currentCount++;
                } else if (btn.classList.contains('minus') && currentCount > 1) {
                    currentCount--;
                }

                countSpan.innerText = currentCount;
                updateTotals();
            }

            if (target.closest('.remove-item-btn')) {
                const item = target.closest('.cart-item');
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    item.remove();
                    updateTotals();
                    if (document.querySelectorAll('.cart-item').length === 0) {
                        renderCart();
                    }
                }, 300);
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            const cart = JSON.parse(localStorage.getItem('bookline_cart')) || [];
            if (cart.length === 0) {
                alert('Сначала добавьте книги в корзину!');
                e.preventDefault();
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }

    renderCart();
});