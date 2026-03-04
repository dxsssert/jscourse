document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cartItems');
    const itemsTotalDisplay = document.getElementById('itemsTotal');
    const finalTotalDisplay = document.getElementById('finalTotal');

    function updateTotals() {
        let total = 0;
        const items = document.querySelectorAll('.cart-item');

        items.forEach(item => {
            const priceElement = item.querySelector('.cart-item-price');
            const price = parseInt(priceElement.getAttribute('data-price'));
            const count = parseInt(item.querySelector('.count-num').innerText);
            
            const itemSubtotal = price * count;
            total += itemSubtotal;
            
          
            priceElement.innerText = (price * count).toLocaleString() + ' ₽';
        });

        const formattedTotal = total.toLocaleString() + ' ₽';
        if (itemsTotalDisplay) itemsTotalDisplay.innerText = formattedTotal;
        if (finalTotalDisplay) finalTotalDisplay.innerText = formattedTotal;
    }

    if (cartContainer) {
        cartContainer.addEventListener('click', (e) => {
            const target = e.target;

            // Логика кнопок Плюс/Минус
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

            // Логика удаления
            if (target.closest('.remove-item-btn')) {
                const item = target.closest('.cart-item');
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    item.remove();
                    updateTotals();
                    if (document.querySelectorAll('.cart-item').length === 0) {
                        cartContainer.innerHTML = '<p style="color: #888; text-align: center; font-size: 20px; margin-top: 50px; font-family: Josefin Sans;">Ваша корзина пуста</p>';
                    }
                }, 300);
            }
        });
    }

    updateTotals();
});