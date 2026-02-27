// MOCK DATA: Products
const products = [
    {
        id: 'SKU-001',
        title: 'Classic Oxford White',
        category: 'Dress Shirts',
        price: 45.00,
        image: 'assets/white_oxford_shirt.png',
        description: 'A timeless staple for every wardrobe. Made from 100% premium breathable cotton, this Oxford shirt guarantees comfort and style for both office and casual settings.'
    },
    {
        id: 'SKU-002',
        title: 'Midnight Denim Overshirt',
        category: 'Casual Shirts',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Rugged yet refined. This mid-weight denim overshirt is perfect for layering during cooler evenings. Features twin chest pockets and reinforced stitching.'
    },
    {
        id: 'SKU-003',
        title: 'Summer Linen Breeze',
        category: 'Summer Wear',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Stay cool when the temperature rises. Pure linen construction ensures maximum airflow. Finished with sustainable coconut shell buttons.'
    },
    {
        id: 'SKU-004',
        title: 'Urban Flannel Check',
        category: 'Casual Shirts',
        price: 50.00,
        image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Ultra-soft brushed flannel for maximum coziness. Provides a tailored fit without sacrificing the relaxed flannel aesthetic.'
    },
    {
        id: 'SKU-005',
        title: 'Executive Pinstripe',
        category: 'Business Formal',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Command the boardroom. Luxury twill fabric with subtle pinstripes. Requires minimal ironing to maintain a crisp look all day.'
    },
    {
        id: 'SKU-006',
        title: 'Botanical Print Resort',
        category: 'Vacation Wear',
        price: 48.00,
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Bring the vacation vibes anywhere. Lightweight viscose fabric drapes perfectly, featuring a custom hand-drawn botanical print.'
    }
];

// STATE
let cart = [];

// --- META PIXEL EVENT HOOKS ---

function emitPixelEvent(event, params) {
    if (window.trackPixelEvent) {
        window.trackPixelEvent(event, params);
    }
}

// 1. PageView - Triggered immediately on script load
emitPixelEvent('PageView', { page: window.location.pathname });

// 2. ViewContent - Triggered when viewing a product detail (Modal open)
function trackViewContent(product) {
    emitPixelEvent('ViewContent', {
        content_ids: [product.id],
        content_name: product.title,
        content_type: 'product',
        value: product.price,
        currency: 'USD'
    });
}

// 3. AddToCart - Triggered when adding an item to the cart
function trackAddToCart(product) {
    emitPixelEvent('AddToCart', {
        content_ids: [product.id],
        content_name: product.title,
        content_type: 'product',
        value: product.price,
        currency: 'USD'
    });
}

// 4. InitiateCheckout - Triggered when opening the checkout process
function trackInitiateCheckout() {
    const totalValue = cart.reduce((sum, item) => sum + item.price, 0);
    const contentIds = cart.map(item => item.id);
    const numItems = cart.length;

    emitPixelEvent('InitiateCheckout', {
        content_ids: contentIds,
        value: totalValue,
        currency: 'USD',
        num_items: numItems
    });
}

// 5. Purchase - Triggered on successful checkout
function trackPurchase() {
    const totalValue = cart.reduce((sum, item) => sum + item.price, 0);
    const contentIds = cart.map(item => item.id);

    emitPixelEvent('Purchase', {
        content_ids: contentIds,
        value: totalValue,
        currency: 'USD'
    });
}


// --- DOM ELEMENTS ---
const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Modal Elements
const modalOverlay = document.getElementById('product-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-description');
const modalAddToCartBtn = document.getElementById('modal-add-to-cart');

// Success Overlay
const successOverlay = document.getElementById('checkout-success');
const continueShoppingBtn = document.getElementById('continue-shopping');

// CURRENT VIEW STATE
let currentViewedProduct = null;

// --- INITIALIZATION ---
function init() {
    renderProducts();
    setupEventListeners();
    document.getElementById('year').textContent = new Date().getFullYear();
}

function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productList.appendChild(card);
    });
}

function setupEventListeners() {
    // Product List Clicks (Event Delegation)
    productList.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        if (!id) return;

        const product = products.find(p => p.id === id);

        if (e.target.classList.contains('add-to-cart-btn')) {
            addToCart(product);
        } else if (e.target.classList.contains('quick-view-btn')) {
            openProductModal(product);
        }
    });

    // Modal Actions
    closeModalBtn.addEventListener('click', closeProductModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeProductModal();
    });

    modalAddToCartBtn.addEventListener('click', () => {
        if (currentViewedProduct) {
            addToCart(currentViewedProduct);
            closeProductModal();
            openCart();
        }
    });

    // Cart Drawer Actions
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartDrawer.addEventListener('click', (e) => {
        if (e.target === cartDrawer) closeCart();
    });

    // Cart Items (Event Delegation for removal)
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeFromCart(index);
        }
    });

    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            trackInitiateCheckout(); // 📊 PIXEL HOOK
            processCheckout();
        }
    });

    // Success Overlay
    continueShoppingBtn.addEventListener('click', () => {
        successOverlay.classList.remove('active');
        closeCart();
    });
}

// --- LOGIC FUNCTIONS ---

function openProductModal(product) {
    currentViewedProduct = product;
    modalImage.src = product.image;
    modalTitle.textContent = product.title;
    modalPrice.textContent = '$' + product.price.toFixed(2);
    modalDesc.textContent = product.description;

    modalOverlay.classList.add('active');

    trackViewContent(product); // 📊 PIXEL HOOK
}

function closeProductModal() {
    modalOverlay.classList.remove('active');
    currentViewedProduct = null;
}

function addToCart(product) {
    cart.push(product);
    updateCartUI();

    trackAddToCart(product); // 📊 PIXEL HOOK

    // Tiny visual feedback
    const originalText = cartCount.textContent;
    cartCount.style.transform = 'scale(1.5)';
    setTimeout(() => { cartCount.style.transform = 'scale(1)'; }, 200);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    // Update count
    cartCount.textContent = cart.length;

    // Update List
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty.</div>';
        checkoutBtn.disabled = true;
        cartTotalPrice.textContent = '$0.00';
    } else {
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
}

function openCart() {
    cartDrawer.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('active');
}

function processCheckout() {
    // Simulate API delay
    checkoutBtn.textContent = 'Processing...';
    checkoutBtn.disabled = true;

    setTimeout(() => {
        trackPurchase(); // 📊 PIXEL HOOK

        // Clear cart
        cart = [];
        updateCartUI();

        // Reset UI
        checkoutBtn.textContent = 'Proceed to Checkout';

        // Show Success
        successOverlay.classList.add('active');

    }, 1500);
}

// Start app
init();
