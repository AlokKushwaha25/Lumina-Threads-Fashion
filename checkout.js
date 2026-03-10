document.addEventListener('DOMContentLoaded', () => {
    // 📊 PIXEL HOOK: PageView
    emitPixelEvent('PageView', { page: window.location.pathname });

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    const form = document.getElementById('checkout-form');
    const saveShippingBtn = document.getElementById('save-shipping');

    saveShippingBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;

        if (name && address) {
            // 📊 PIXEL HOOK: add_shipping_info
            emitPixelEvent('add_shipping_info', {
                currency: "USD",
                value: cart.reduce((sum, item) => sum + item.price, 0),
                coupon: "SUMMER2026",
                shipping_tier: "Standard"
            });

            saveShippingBtn.textContent = 'Saved!';
            saveShippingBtn.style.background = '#22c55e';
            setTimeout(() => {
                saveShippingBtn.textContent = 'Save Shipping Info';
                saveShippingBtn.style.background = '#333';
            }, 2000);
        } else {
            alert('Please fill out name and address.');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 📊 PIXEL HOOK: add_payment_info
        emitPixelEvent('add_payment_info', {
            currency: "USD",
            value: cart.reduce((sum, item) => sum + item.price, 0),
            payment_type: "Credit Card"
        });

        // Redirect to success page
        window.location.href = 'success.html';
    });
});
