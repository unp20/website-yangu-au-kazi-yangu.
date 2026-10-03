/* ==========================================
   UNP TOURS - ANALYTICS.JS
   Kufuatilia wateja — Google Analytics & Yandex
   ========================================== */

// ==========================================
// 1. KUANZA GOOGLE ANALYTICS
// ==========================================
window.unpInitGoogleAnalytics = function(measurementId) {
    const id = measurementId || 'G-5QJ1X38ZLC';
    
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);

    // Init dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id);

    console.log('✅ Google Analytics imeanzishwa: ' + id);
};

// ==========================================
// 2. KUANZA YANDEX METRICA
// ==========================================
window.unpInitYandexMetrica = function(metricaId) {
    const id = metricaId || '113203659';

    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) { return; }
        }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0];
        k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    ym(id, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });

    console.log('✅ Yandex Metrica imeanzishwa: ' + id);
};

// ==========================================
// 3. KUFUATILIA UKURASA (Page View)
// ==========================================
window.unpTrackPageView = function(pageName, pageUrl) {
    const page = pageName || document.title;
    const url = pageUrl || window.location.pathname;

    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: page,
            page_location: window.location.href,
            page_path: url
        });
    }

    // Yandex Metrica
    if (typeof ym !== 'undefined') {
        ym('113203659', 'hit', window.location.href, {
            title: page
        });
    }

    console.log('📊 Page view tracked: ' + page);
};

// ==========================================
// 4. KUFUATILIA TUKIO (Event)
// ==========================================
window.unpTrackEvent = function(category, action, label, value) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value || 1
        });
    }

    // Yandex Metrica
    if (typeof ym !== 'undefined') {
        ym('113203659', 'reachGoal', action);
    }

    console.log('🎯 Event tracked: ' + category + ' / ' + action);
};

// ==========================================
// 5. KUFUATILIA BOOKING
// ==========================================
window.unpTrackBooking = function(tripName, price, tier) {
    window.unpTrackEvent('Booking', 'booking_submitted', tripName, price);
    console.log('📅 Booking tracked: ' + tripName + ' (' + tier + ')');
};

// ==========================================
// 6. KUFUATILIA MALIPO
// ==========================================
window.unpTrackPayment = function(method, amount) {
    window.unpTrackEvent('Payment', 'payment_completed', method, amount);
    console.log('💰 Payment tracked: ' + method + ' — $' + amount);
};

// ==========================================
// 7. KUFUATILIA KUSOMA BLOG
// ==========================================
window.unpTrackBlogRead = function(articleTitle, category) {
    window.unpTrackEvent('Blog', 'article_read', articleTitle);
    console.log('📖 Article tracked: ' + articleTitle + ' (' + category + ')');
};

// ==========================================
// 8. KUFUATILIA KUBONYEZA WHATSAPP
// ==========================================
window.unpTrackWhatsApp = function(source) {
    window.unpTrackEvent('Contact', 'whatsapp_click', source || 'floating_button');
    console.log('📱 WhatsApp tracked: ' + source);
};

// ==========================================
// 9. KUFUATILIA KUTAFUTA
// ==========================================
window.unpTrackSearch = function(query, results) {
    window.unpTrackEvent('Search', 'search_performed', query, results);
    console.log('🔍 Search tracked: "' + query + '" — ' + results + ' results');
};

// ==========================================
// 10. KUANZA ANALYTICS ZOTE
// ==========================================
window.unpInitAllAnalytics = function() {
    window.unpInitGoogleAnalytics();
    window.unpInitYandexMetrica();
    console.log('✅ Analytics zote zimeanzishwa');
};

// ==========================================
// 11. AUTO-INIT (Kama una data attributes)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Auto-track page view
    if (typeof gtag !== 'undefined' || typeof ym !== 'undefined') {
        window.unpTrackPageView();
    }
});

console.log('✅ UNP TOURS Analytics.js imepakiwa');
