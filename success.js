document.addEventListener('DOMContentLoaded', () => {
    // 📊 PIXEL HOOK: PageView
    emitPixelEvent('PageView', { page: window.location.pathname });

    // Retrieve cart one last time to fire purchase event
    const currentCart = JSON.parse(localStorage.getItem('lumina_cart')) || [];

    if (currentCart.length > 0) {
        const totalValue = currentCart.reduce((sum, item) => sum + item.price, 0);

        // 📊 PIXEL HOOK: Purchase
        emitPixelEvent('Purchase', {
            currency: "USD",
            value: totalValue,
            transaction_id: "T_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            items: currentCart.map(item => ({
                item_id: item.id,
                item_name: item.title,
                price: item.price
            }))
        });

        // Clear the cart
        localStorage.removeItem('lumina_cart');
    }
});
