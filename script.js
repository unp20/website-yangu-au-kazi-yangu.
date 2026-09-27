document.getElementById('menuToggleBtn').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        document.getElementById('navLinks').classList.remove('active');
    });
});

var stars = document.querySelectorAll('#starContainer .fa-star');
var selectedStars = 0;

stars.forEach(function(star) {
    star.addEventListener('click', function() {
        selectedStars = parseInt(this.getAttribute('data-value'));
        stars.forEach(function(s, idx) {
            if (idx < selectedStars) s.classList.add('active');
            else s.classList.remove('active');
        });
    });
});

document.getElementById('voteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var service = document.getElementById('voteExperience').value;
    var box = document.getElementById('voteMessage');
    box.style.display = 'none';
    if (selectedStars === 0) {
        box.style.display = 'block';
        box.style.background = '#fed7d7';
        box.style.color = '#c53030';
        box.style.borderColor = '#c53030';
        box.innerHTML = 'Please select stars (1-5) before submitting!';
        return;
    }
    box.style.background = '#fefcbf';
    box.style.color = '#744210';
    box.style.borderColor = '#d4af37';
    box.style.display = 'block';
    box.innerHTML = 'Thank you! You rated <strong>' + service + '</strong> with <strong>' + selectedStars + ' Stars</strong>!';
});

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var phone = "255655728982";
    var name = document.getElementById('guestName').value;
    var contact = document.getElementById('guestContact').value;
    var service = document.getElementById('guestService').value;
    var date = document.getElementById('guestDate').value;
    var count = document.getElementById('guestCount').value;
    var notes = document.getElementById('guestNotes').value;
    var msg = '*UNP TOURS - NEW RESERVATION*%0A%0A';
    msg += 'Name: ' + encodeURIComponent(name) + '%0A';
    msg += 'Contact: ' + encodeURIComponent(contact) + '%0A';
    msg += 'Package: ' + encodeURIComponent(service) + '%0A';
    msg += 'Date: ' + encodeURIComponent(date) + '%0A';
    msg += 'Guests: ' + encodeURIComponent(count) + '%0A';
    msg += 'Requests: ' + encodeURIComponent(notes || 'None');
    window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
});

var allTranslations = {
    en: enTranslation,
    fr: frTranslation,
    it: itTranslation,
    de: deTranslation,
    ru: ruTranslation,
    sw: swTranslation,
    ar: arTranslation,
    zh: zhTranslation
};

var langSel = document.getElementById('languageSelector');

function changeLanguage(lang) {
    var t = allTranslations[lang];
    if (!t) return;
    var map = ['heroTitle','heroDesc','heroBtn','secTitle','navExcursions','navWater','navSafari','navArt','navGarden','navVote','navVip','navBook','navContact','navAbout','navGallery','card1Title','card1Desc','card2Title','card2Desc','card3Title','card3Desc','card4Title','card4Desc','card5Title','card5Desc','card6Title','card6Desc','card7Title','card7Desc','card8Title','card8Desc','card9Title','card9Desc','card10Title','card10Desc','aboutHeading','aboutDesc','aboutText1','aboutText2','galleryHeading','galleryDesc','voteHeading','voteDesc','lblSelectExp','lblRateStars','btnVoteSubmit','vipHeading','vipDesc','vipF1','vipF1Sub','vipF2','vipF2Sub','vipF3','vipF3Sub','btnVipReq','bookHeading','bookDesc','lblGuestName','lblGuestContact','lblGuestService','lblGuestDate','lblGuestCount','lblGuestNotes','btnBookSubmit','footerAbout','footerContactHead'];
    map.forEach(function(id) {
        var el = document.getElementById(id);
        if (el && t[id]) {
            if (el.tagName === 'BUTTON' || el.tagName === 'A') {
                var ic = el.querySelector('i') ? el.querySelector('i').outerHTML : '';
                el.innerHTML = ic + ' ' + t[id];
            } else {
                el.textContent = t[id];
            }
        }
    });
}

if (langSel) langSel.addEventListener('change', function(e) { changeLanguage(e.target.value); });
changeLanguage('en');
                    
