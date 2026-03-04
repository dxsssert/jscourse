document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('checkout-items-list');
    const totalElement = document.getElementById('checkout-total');
    const STORAGE_KEY = 'bookline_cart';

    const renderCheckout = () => {
        const cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        listContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            listContainer.innerHTML = '<p style="color:#555; text-align:center; padding: 40px;">Корзина пуста</p>';
            totalElement.innerText = '0 ₽';
            return;
        }

        const fragment = document.createDocumentFragment();

        cart.forEach((item, index) => {
            const itemSum = item.price * item.count;
            total += itemSum;

            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            itemElement.innerHTML = `
                <div class="checkout-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="checkout-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.count} шт. по ${item.price} ₽</p>
                </div>
                <div class="checkout-item-price">${itemSum} ₽</div>
                <button class="remove-item-btn" onclick="deleteItem(${index})" title="Удалить из заказа">
                    &times;
                </button>
            `;
            fragment.appendChild(itemElement);
        });

        listContainer.appendChild(fragment);
        totalElement.innerText = `${total} ₽`;
    };

    window.deleteItem = (index) => {
        const cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        cart.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        renderCheckout();
    };

    renderCheckout();
});