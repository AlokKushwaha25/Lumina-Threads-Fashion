document.addEventListener('DOMContentLoaded', () => {
    // 📊 PIXEL HOOK: PageView
    emitPixelEvent('PageView', { page: window.location.pathname });

    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartTotalPrice = document.getElementById('cart-total-price');

    // 📊 PIXEL HOOK: view_cart
    if (cart.length > 0) {
        emitPixelEvent('view_cart', {
            currency: "USD",
            value: cart.reduce((sum, item) => sum + item.price, 0),
            items: cart.map(item => ({
                item_id: item.id,
                item_name: item.title,
                price: item.price
            }))
        });
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty.</div>';
            checkoutBtn.disabled = true;
            cartTotalPrice.textContent = '$0.00';
            return;
        }

        checkoutBtn.disabled = false;
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalPrice.textContent = '$' + total.toFixed(2);
    }

    renderCart();

    // Event Delegation for remove
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            saveCart(); // from shared.js
            renderCart();
        }
    });

    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // 📊 PIXEL HOOK: begin_checkout
            emitPixelEvent('begin_checkout', {
                currency: "USD",
                value: cart.reduce((sum, item) => sum + item.price, 0),
                items: cart.map(item => ({
                    item_id: item.id,
                    item_name: item.title,
                    price: item.price
                }))
            });

            window.location.href = 'checkout.html';
        }
    });
});
