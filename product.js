document.addEventListener('DOMContentLoaded', () => {
    // 📊 PIXEL HOOK: PageView
    emitPixelEvent('PageView', { page: window.location.pathname });

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = getProductById(productId);

    const container = document.getElementById('product-details');

    if (!product) {
        container.innerHTML = '<h2>Product not found.</h2><a href="products.html">Back to Shop</a>';
        return;
    }

    // 📊 PIXEL HOOK: view_item
    emitPixelEvent('view_item', {
        currency: "USD",
        value: product.price,
        items: [{
            item_id: product.id,
            item_name: product.title,
            price: product.price,
            item_category: product.category
        }]
    });

    container.innerHTML = `
        <div class="modal-image-container" style="flex: 1; max-width: 500px; margin: 0 auto;">
            <img src="${product.image}" alt="${product.title}" style="width: 100%; border-radius: 8px;">
        </div>
        <div class="modal-details" style="flex: 1; display:flex; flex-direction:column; justify-content:center;">
            <span class="product-category" style="margin-bottom:0.5rem; display:block;">${product.category}</span>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">${product.title}</h2>
            <p class="price" style="font-size: 1.5rem; margin-bottom: 1.5rem;">$${product.price.toFixed(2)}</p>
            <p class="description" style="line-height: 1.6; margin-bottom: 2rem;">${product.description}</p>
            
            <div style="display: flex; gap: 1rem;">
                <button id="add-to-cart" class="add-to-cart-btn" style="flex:1;">Add to Cart</button>
                <button id="add-to-wishlist" class="cta-button" style="flex:1; background: #fff; color: #111; border: 2px solid #111;">Add to Wishlist</button>
            </div>
            <a href="products.html" style="margin-top:2rem; display:inline-block; color:#666; text-decoration:none;">&larr; Back to Products</a>
        </div>
    `;

    // Event Listeners
    document.getElementById('add-to-cart').addEventListener('click', (e) => {
        addToCart(product);
        e.target.textContent = 'Added!';
        setTimeout(() => { e.target.textContent = 'Add to Cart'; }, 1000);
    });

    document.getElementById('add-to-wishlist').addEventListener('click', (e) => {
        // 📊 PIXEL HOOK: add_to_wishlist
        emitPixelEvent('add_to_wishlist', {
            currency: "USD",
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.title,
                price: product.price,
                item_category: product.category
            }]
        });

        e.target.textContent = 'Added to Wishlist!';
        setTimeout(() => { e.target.textContent = 'Add to Wishlist'; }, 2000);
    });

});
