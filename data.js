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

// Helper to get product by ID
function getProductById(id) {
    return products.find(p => p.id === id);
}
