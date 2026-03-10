document.addEventListener('DOMContentLoaded', () => {
    // 📊 PIXEL HOOK: PageView
    emitPixelEvent('PageView', { page: window.location.pathname });

    // Track promotion view
    const heroSection = document.getElementById('home-hero');
    if (heroSection) {
        // 📊 PIXEL HOOK: view_promotion
        emitPixelEvent('view_promotion', {
            creative_name: "Elevate Your Everyday Hero Banner",
            creative_slot: "hero",
            promotion_id: "promo_1",
            promotion_name: "Spring Collection"
        });
    }
});
