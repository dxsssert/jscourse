document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('checkout-items-list');
    const totalElement = document.getElementById('checkout-total');
    const orderForm = document.getElementById('orderForm');
    const modal = document.getElementById('thanksModal');
    const closeBtn = document.getElementById('closeModal');
    const STORAGE_KEY = 'bookline_cart';
    const payRadios = document.querySelectorAll('input[name="pay"]');
    const cardDetails = document.getElementById('card-details');
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvv = document.getElementById('cardCvv');
    const userEmail = document.getElementById('userEmail');
    const renderCheckout = () => {
        const cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        listContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            listContainer.innerHTML = '<p style="color:#FA9021; text-align:center; padding: 40px; font-size: 20px;">Ваша корзина пуста</p>';
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
                    <p>${item.count} шт. по ${item.price.toLocaleString()} ₽</p>
                </div>
                <div class="checkout-item-price">${itemSum.toLocaleString()} ₽</div>
                <button class="remove-item-btn" onclick="deleteItem(${index})" title="Удалить из заказа">
                    &times;
                </button>
            `;
            fragment.appendChild(itemElement);
        });

        listContainer.appendChild(fragment);
        totalElement.innerText = `${total.toLocaleString()} ₽`;
    };

    window.deleteItem = (index) => {
        const cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        cart.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        renderCheckout();
    };

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (modal) modal.classList.add('active');
            localStorage.removeItem(STORAGE_KEY);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) window.location.href = 'index.html';
        });
    }

    payRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const isOnline = document.querySelector('input[name="pay"]:checked').value === 'online';
            
            if (isOnline) {
                cardDetails.classList.remove('hidden');
            } else {
                cardDetails.classList.add('hidden');
            }
            
            [cardNumber, cardExpiry, cardCvv].forEach(input => {
                if (input) input.required = isOnline;
            });
        });
    });

    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
        });
    }

    if (cardExpiry) {
        cardExpiry.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[^\d]/g, '');
            if (val.length >= 2) {
                val = val.substring(0, 2) + '/' + val.substring(2, 4);
            }
            e.target.value = val;
        });
    }

    renderCheckout();
});

//Маска для номера телефона
if (userPhone) {
    userPhone.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        
        // Формат: +7 (999) 000-00-00
        if (!x[2]) {
            e.target.value = x[1] ? `+${x[1]}` : '';
        } else {
            e.target.value = `+${x[1]} (${x[2]}` + (x[3] ? `) ${x[3]}` : '') + (x[4] ? `-${x[4]}` : '') + (x[5] ? `-${x[5]}` : '');
        }
    });

    // Ограничиваем длину
    userPhone.addEventListener('keydown', (e) => {
        if (e.target.value.length >= 18 && e.keyCode !== 8 && e.keyCode !== 46) {
            e.preventDefault();
        }
    });
}