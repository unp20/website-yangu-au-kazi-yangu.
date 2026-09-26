document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuToggleBtn && navLinks) {
        menuToggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Language Switcher Engine + Support ya Kiarabu (RTL)
    const langSelect = document.getElementById('languageSelector');

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            changeLanguage(selectedLang);
        });
    }

    function changeLanguage(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) return;

        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }

        const elementsToTranslate = document.querySelectorAll('[data-key]');
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        localStorage.setItem('unp_selected_language', lang);
    }

    const savedLang = localStorage.getItem('unp_selected_language');
    if (savedLang && langSelect) {
        langSelect.value = savedLang;
        changeLanguage(savedLang);
    }

    // 3. Online Form Logic -> Kutuma Maelezo Moja kwa Moja WhatsApp
    const bookingForm = document.getElementById('whatsappBookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('custName').value;
            const service = document.getElementById('custService').value;
            const date = document.getElementById('custDate').value;
            const notes = document.getElementById('custNotes').value;
            
            const whatsappNumber = "255655728982"; 
            
            const message = `Hello UNP!%0A%0A*NEW ONLINE BOOKING*%0A*Name:* ${encodeURIComponent(name)}%0A*Experience:* ${encodeURIComponent(service)}%0A*Preferred Date:* ${encodeURIComponent(date)}%0A*Special Notes:* ${encodeURIComponent(notes)}%0A%0APlease confirm my booking.`;
            
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    }
});
