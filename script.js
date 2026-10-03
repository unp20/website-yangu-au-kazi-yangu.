/* ==========================================
   UNP TOURS - SCRIPT.JS (KAMILI)
   ========================================== */

// ==========================================
// 0. GLOBAL VARIABLES
// ==========================================
let selectedStars = 0;

// ==========================================
// 1. MENU TOGGLE
// ==========================================
const menuToggleBtn = document.getElementById('menuToggleBtn');
const navLinks = document.getElementById('navLinks');

if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });
}

// ==========================================
// 2. STAR RATING
// ==========================================
const stars = document.querySelectorAll('#starContainer .fa-star, #reviewStars .fa-star');

if (stars.length > 0) {
    stars.forEach(function (star) {
        star.addEventListener('click', function () {
            selectedStars = parseInt(this.getAttribute('data-value'));
            stars.forEach(function (s, idx) {
                if (idx < selectedStars) s.classList.add('active');
                else s.classList.remove('active');
            });
            const hiddenInput = document.getElementById('selectedReviewRating');
            if (hiddenInput) hiddenInput.value = selectedStars;
        });
    });
}

// ==========================================
// 3. VOTE FORM
// ==========================================
const voteForm = document.getElementById('voteForm');
if (voteForm) {
    voteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const service = document.getElementById('voteExperience') ? document.getElementById('voteExperience').value : '';
        const box = document.getElementById('voteMessage');
        if (!box) return;

        box.style.display = 'none';

        if (selectedStars === 0) {
            box.style.display = 'block';
            box.style.background = '#fed7d7';
            box.style.color = '#c53030';
            box.style.borderColor = '#c53030';
            box.innerHTML = 'Tafadhali chagua nyota (1-5) kabla ya kutuma!';
            return;
        }

        box.style.background = '#fefcbf';
        box.style.color = '#744210';
        box.style.borderColor = '#d4af37';
        box.style.display = 'block';
        box.innerHTML = 'Asante! Umetoa <strong>' + selectedStars + ' Nyota</strong> kwa <strong>' + service + '</strong>!';
    });
}

// ==========================================
// 4. BOOKING FORM (WhatsApp)
// ==========================================
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const phone = "255655728982";
        const name = document.getElementById('guestName') ? document.getElementById('guestName').value : '';
        const contact = document.getElementById('guestContact') ? document.getElementById('guestContact').value : '';
        const service = document.getElementById('guestService') ? document.getElementById('guestService').value : '';
        const date = document.getElementById('guestDate') ? document.getElementById('guestDate').value : '';
        const count = document.getElementById('guestCount') ? document.getElementById('guestCount').value : '';
        const notes = document.getElementById('guestNotes') ? document.getElementById('guestNotes').value : '';

        let msg = '*UNP TOURS - OMBI JIPYA*%0A%0A';
        msg += 'Jina: ' + encodeURIComponent(name) + '%0A';
        msg += 'Mawasiliano: ' + encodeURIComponent(contact) + '%0A';
        msg += 'Huduma: ' + encodeURIComponent(service) + '%0A';
        msg += 'Tarehe: ' + encodeURIComponent(date) + '%0A';
        msg += 'Watu: ' + encodeURIComponent(count) + '%0A';
        msg += 'Mahitaji: ' + encodeURIComponent(notes || 'Hakuna');

        window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
    });
}

// ==========================================
// 5. COOKIES BANNER
// ==========================================
if (!localStorage.getItem('cookiesAccepted')) {
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) cookieBanner.style.display = 'block';
}

window.acceptCookies = function() {
    localStorage.setItem('cookiesAccepted', 'true');
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) cookieBanner.style.display = 'none';
};

// ==========================================
// 6. CHATBOT
// ==========================================
window.toggleChatbot = function() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    if (chatbotContainer) chatbotContainer.classList.toggle('active');
};

window.handleKeyPress = function(e) {
    if (e.key === 'Enter') sendMessage();
};

window.sendMessage = function() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;

    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    chatMessages.innerHTML += '<div class="message user">' + msg + '</div>';
    input.value = '';

    setTimeout(function() {
        chatMessages.innerHTML += '<div class="message bot">Asante kwa ujumbe wako! Tutakujibu hivi punde. Kwa haraka, wasiliana nasi kwa WhatsApp: +255 655 728 982</div>';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
};

// ==========================================
// 7. SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// 8. NAVBAR SCROLL EFFECT
// ==========================================
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
        }
    });
}

// ==========================================
// 9. BACK TO TOP BUTTON
// ==========================================
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.id = 'backToTop';
backToTop.style.cssText = 'position: fixed; bottom: 170px; right: 25px; background-color: #d4af37; color: #082f49; width: 50px; height: 50px; border-radius: 50%; border: none; cursor: pointer; font-size: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 1099; display: none; align-items: center; justify-content: center; transition: all 0.3s;';
document.body.appendChild(backToTop);

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
