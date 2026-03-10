document.addEventListener('DOMContentLoaded', () => {
    // 📊 PIXEL HOOK: PageView
    emitPixelEvent('PageView', { page: window.location.pathname });

    // 📊 PIXEL HOOK: view_item_list
    const itemIds = products.map(p => p.id);
    emitPixelEvent('view_item_list', {
        item_list_id: "all_products",
        item_list_name: "All Products",
        items: products.map(p => ({
            item_id: p.id,
            item_name: p.title,
            price: p.price,
            item_category: p.category
        }))
    });

    const productList = document.getElementById('product-list');

    function renderProducts() {
        if (!productList) return;
        productList.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <a href="product.html?id=${product.id}" class="product-link">
                        <img src="${product.image}" alt="${product.title}" loading="lazy">
                    </a>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <a href="product.html?id=${product.id}" style="text-decoration:none; color:inherit;">
                        <h3 class="product-title">${product.title}</h3>
                    </a>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productList.appendChild(card);
        });
    }

    renderProducts();

    // Event Delegation for clicks
    productList.addEventListener('click', (e) => {
        // Handle Add to Cart
        if (e.target.classList.contains('add-to-cart-btn')) {
            const id = e.target.getAttribute('data-id');
            const product = getProductById(id);
            if (product) {
                addToCart(product);
                // Visual feedback
                e.target.textContent = 'Added!';
                setTimeout(() => { e.target.textContent = 'Add to Cart'; }, 1000);
            }
        }

        // Handle Select Item (clicking link/image)
        const link = e.target.closest('a');
        if (link) {
            // Find which product was clicked based on href
            const urlParams = new URLSearchParams(link.search);
            const id = urlParams.get('id');
            const product = getProductById(id);
            if (product) {
                // 📊 PIXEL HOOK: select_item
                emitPixelEvent('select_item', {
                    item_list_id: "all_products",
                    item_list_name: "All Products",
                    items: [{
                        item_id: product.id,
                        item_name: product.title,
                        price: product.price
                    }]
                });
            }
        }
    });

});
