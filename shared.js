// --- META PIXEL EVENT HOOKS ---
function emitPixelEvent(event, params) {
    if (window.trackPixelEvent) {
        window.trackPixelEvent(event, params);
    }

    // Also trigger the real pixel if loaded
    if (typeof fbq === 'function') {
        fbq('track', event, params);
    }
}

// Global script to handle cart state via localStorage
let cart = JSON.parse(localStorage.getItem('lumina_cart')) || [];

function saveCart() {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {
    cart.push(product);
    saveCart();

    // 📊 PIXEL HOOK: AddToCart
    emitPixelEvent('AddToCart', {
        content_ids: [product.id],
        content_name: product.title,
        content_type: 'product',
        value: product.price,
        currency: 'USD'
    });
}

function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}

// Global Nav setup
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Set year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Cart button link
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
});
