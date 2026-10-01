/* ==========================================
   UNP TOURS - SCRIPT.JS
   ========================================== */

// ==========================================
// 1. MENU TOGGLE
// ==========================================
const menuToggleBtn = document.getElementById('menuToggleBtn');
const navLinks = document.getElementById('navLinks');

if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Funga menu ukibonyeza link
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
let selectedStars = 0;

if (stars.length > 0) {
    stars.forEach(function (star) {
        star.addEventListener('click', function () {
            selectedStars = parseInt(this.getAttribute('data-value'));
            stars.forEach(function (s, idx) {
                if (idx < selectedStars) s.classList.add('active');
                else s.classList.remove('active');
            });
            // Update hidden input kama ipo
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
// 5. LANGUAGE TRANSLATIONS
// ==========================================
const enTranslation = {
    heroTitle: "UNP TOURS ZANZIBAR",
    heroDesc: "Discover Zanzibar & Tanzania's most exquisite luxury tours, water sports, handmade artwork, and private sanctuary experiences in full freedom.",
    heroBtn: "Book VIP Experience",
    secTitle: "Our Exclusive Experiences",
    navExcursions: "Excursions",
    navWater: "Water Sports",
    navSafari: "Tanzania Safari",
    navArt: "Handmade Artwork",
    navGarden: "Secret Garden",
    navVote: "Rate Us",
    navVip: "VIP Experience",
    navBook: "Book Now",
    navContact: "Contact",
    navAbout: "About Us",
    navGallery: "Gallery",
    card1Title: "Zanzibar Excursions",
    card1Desc: "Visit giant tortoises, Safari Blue, and Stone Town.",
    card2Title: "Jozani Forest",
    card2Desc: "Explore rare Red Colobus Monkeys.",
    card3Title: "Vehicle Rentals",
    card3Desc: "Car rentals, scooters, and quad bikes.",
    card4Title: "Luxury Transfers",
    card4Desc: "VIP chauffeur transfers with Wi-Fi and A/C.",
    card5Title: "Tanzania Safaris",
    card5Desc: "Fly-in safaris to Serengeti & Ngorongoro.",
    card6Title: "Water Sports",
    card6Desc: "Jet Ski, Jet Car, and Drone Kayak.",
    card7Title: "Handmade Artwork",
    card7Desc: "Unique handcrafted souvenirs and artworks.",
    card8Title: "Secret Garden",
    card8Desc: "Private sanctuary experience with full freedom.",
    card9Title: "VIP Experience",
    card9Desc: "Luxury beyond your imagination.",
    card10Title: "Private Jet",
    card10Desc: "Arrive in style with our private jet service.",
    aboutHeading: "About Us",
    aboutDesc: "Unique & Natural Paradise (UNP) - Your gateway to luxury in Zanzibar.",
    aboutText1: "We are a premium tour operator based in Zanzibar, Tanzania. We offer exclusive experiences for discerning travelers.",
    aboutText2: "Our team of expert guides and hospitality professionals are dedicated to providing you with unforgettable memories.",
    galleryHeading: "Our Gallery",
    galleryDesc: "A glimpse into the beauty of Zanzibar & Tanzania.",
    voteHeading: "Rate Your Experience",
    voteDesc: "Tell us about your experience with UNP TOURS.",
    lblSelectExp: "Select the service you received:",
    lblRateStars: "Rate us (1-5 Stars):",
    btnVoteSubmit: "Submit Rating",
    vipHeading: "VIP Luxury Experience",
    vipDesc: "Experience Zanzibar like royalty.",
    vipF1: "Private Jet",
    vipF1Sub: "Arrive in style",
    vipF2: "Secret Garden",
    vipF2Sub: "Private sanctuary",
    vipF3: "Butler Service",
    vipF3Sub: "Personalized care",
    btnVipReq: "Request VIP Package",
    bookHeading: "Book Your Experience",
    bookDesc: "Fill in the form and we'll get back to you quickly.",
    lblGuestName: "Your Full Name:",
    lblGuestContact: "Email or Phone:",
    lblGuestService: "Select Package:",
    lblGuestDate: "Date:",
    lblGuestCount: "Number of Guests:",
    lblGuestNotes: "Special Requests:",
    btnBookSubmit: "Submit via WhatsApp",
    footerAbout: "10-Star luxury, adventure, handmade organic artwork, and sanctuary experiences in Zanzibar & Tanzania.",
    footerContactHead: "Direct Contact"
};

const swTranslation = {
    heroTitle: "UNP TOURS ZANZIBAR",
    heroDesc: "Gundua safari za kifahari za Zanzibar na Tanzania, michezo ya majini, sanaa za mikono, na uzoefu wa faragha kwa uhuru kamili.",
    heroBtn: "Weka Nafasi ya VIP",
    secTitle: "Uzoefu Wetu wa Kipekee",
    navExcursions: "Safari",
    navWater: "Michezo ya Majini",
    navSafari: "Safari ya Tanzania",
    navArt: "Sanaa za Mikono",
    navGarden: "Bustani ya Siri",
    navVote: "Tupime",
    navVip: "Uzoefu wa VIP",
    navBook: "Weka Nafasi",
    navContact: "Wasiliana",
    navAbout: "Kuhusu Sisi",
    navGallery: "Gallery",
    card1Title: "Safari za Zanzibar",
    card1Desc: "Tembelea kobe, Safari Blue, na Stone Town.",
    card2Title: "Msitu wa Jozani",
    card2Desc: "Gundua nyani adimu wa Red Colobus.",
    card3Title: "Kukodisha Magari",
    card3Desc: "Magari, pikipiki, na quad bikes.",
    card4Title: "Usafiri wa Kifahari",
    card4Desc: "Usafiri wa VIP wenye Wi-Fi na A/C.",
    card5Title: "Safari za Tanzania",
    card5Desc: "Safari za ndege kwenda Serengeti & Ngorongoro.",
    card6Title: "Michezo ya Majini",
    card6Desc: "Jet Ski, Jet Car, na Drone Kayak.",
    card7Title: "Sanaa za Mikono",
    card7Desc: "Vitu vya kipekee vya kumbukumbu.",
    card8Title: "Bustani ya Siri",
    card8Desc: "Uzoefu wa faragha kwa uhuru kamili.",
    card9Title: "Uzoefu wa VIP",
    card9Desc: "Kifahari kupita maelezo.",
    card10Title: "Ndege ya Kibinafsi",
    card10Desc: "Fika kwa mtindo na huduma yetu ya ndege ya kibinafsi.",
    aboutHeading: "Kuhusu Sisi",
    aboutDesc: "Unique & Natural Paradise (UNP) - Lango lako la kifahari Zanzibar.",
    aboutText1: "Sisi ni kampuni ya utalii ya kifahari iliyopo Zanzibar, Tanzania. Tunatoa uzoefu wa kipekee kwa watalii.",
    aboutText2: "Timu yetu ya guides na wataalamu wa ukarimu imejitolea kukupa kumbukumbu zisizosahaulika.",
    galleryHeading: "Gallery Yetu",
    galleryDesc: "Picha za uzuri wa Zanzibar & Tanzania.",
    voteHeading: "Pima Uzoefu Wako",
    voteDesc: "Tuambie uzoefu wako na UNP TOURS.",
    lblSelectExp: "Chagua huduma uliyopata:",
    lblRateStars: "Tupime (1-5 Nyota):",
    btnVoteSubmit: "Tuma Maoni",
    vipHeading: "Uzoefu wa Kifahari wa VIP",
    vipDesc: "Pata uzoefu wa Zanzibar kama mfalme.",
    vipF1: "Ndege ya Kibinafsi",
    vipF1Sub: "Fika kwa mtindo",
    vipF2: "Bustani ya Siri",
    vipF2Sub: "Faragha ya kibinafsi",
    vipF3: "Huduma ya Butler",
    vipF3Sub: "Huduma ya kibinafsi",
    btnVipReq: "Omba Kifurushi cha VIP",
    bookHeading: "Weka Nafasi Yako",
    bookDesc: "Jaza fomu na tutakujibu haraka.",
    lblGuestName: "Jina Lako Kamili:",
    lblGuestContact: "Barua Pepe au Simu:",
    lblGuestService: "Chagua Kifurushi:",
    lblGuestDate: "Tarehe:",
    lblGuestCount: "Idadi ya Watu:",
    lblGuestNotes: "Mahitaji Maalum:",
    btnBookSubmit: "Tuma kwa WhatsApp",
    footerAbout: "10-Star luxury, adventure, handmade organic artwork, and sanctuary experiences in Zanzibar & Tanzania.",
    footerContactHead: "Mawasiliano ya Moja kwa Moja"
};

const frTranslation = {
    heroTitle: "UNP TOURS ZANZIBAR",
    heroDesc: "Découvrez les circuits de luxe les plus exquis de Zanzibar et de Tanzanie, les sports nautiques, l'artisanat et les expériences privées en toute liberté.",
    heroBtn: "Réserver l'Expérience VIP",
    secTitle: "Nos Expériences Exclusives",
    navExcursions: "Excursions",
    navWater: "Sports Nautiques",
    navSafari: "Safari en Tanzanie",
    navArt: "Artisanat",
    navGarden: "Jardin Secret",
    navVote: "Notez-nous",
    navVip: "Expérience VIP",
    navBook: "Réserver",
    navContact: "Contact",
    navAbout: "À Propos",
    navGallery: "Galerie",
    card1Title: "Excursions à Zanzibar",
    card1Desc: "Visitez les tortues géantes, Safari Blue et Stone Town.",
    card2Title: "Forêt de Jozani",
    card2Desc: "Explorez les rares singes Colobus rouges.",
    card3Title: "Location de Véhicules",
    card3Desc: "Voitures, scooters et quads.",
    card4Title: "Transferts de Luxe",
    card4Desc: "Transferts VIP avec Wi-Fi et climatisation.",
    card5Title: "Safaris en Tanzanie",
    card5Desc: "Safaris en avion vers Serengeti et Ngorongoro.",
    card6Title: "Sports Nautiques",
    card6Desc: "Jet Ski, Jet Car et Drone Kayak.",
    card7Title: "Artisanat",
    card7Desc: "Souvenirs et œuvres d'art uniques.",
    card8Title: "Jardin Secret",
    card8Desc: "Expérience privée en toute liberté.",
    card9Title: "Expérience VIP",
    card9Desc: "Un luxe au-delà de l'imagination.",
    card10Title: "Jet Privé",
    card10Desc: "Arrivez avec style grâce à notre service de jet privé.",
    aboutHeading: "À Propos",
    aboutDesc: "Unique & Natural Paradise (UNP) - Votre passerelle vers le luxe à Zanzibar.",
    aboutText1: "Nous sommes un tour-opérateur haut de gamme basé à Zanzibar, en Tanzanie.",
    aboutText2: "Notre équipe de guides experts et de professionnels de l'hospitalité est dédiée à vous offrir des souvenirs inoubliables.",
    galleryHeading: "Notre Galerie",
    galleryDesc: "Un aperçu de la beauté de Zanzibar et de la Tanzanie.",
    voteHeading: "Évaluez Votre Expérience",
    voteDesc: "Parlez-nous de votre expérience avec UNP TOURS.",
    lblSelectExp: "Sélectionnez le service reçu :",
    lblRateStars: "Notez-nous (1-5 étoiles) :",
    btnVoteSubmit: "Soumettre",
    vipHeading: "Expérience de Luxe VIP",
    vipDesc: "Vivez Zanzibar comme la royauté.",
    vipF1: "Jet Privé",
    vipF1Sub: "Arrivez avec style",
    vipF2: "Jardin Secret",
    vipF2Sub: "Sanctuaire privé",
    vipF3: "Service de Majordome",
    vipF3Sub: "Soins personnalisés",
    btnVipReq: "Demander le Forfait VIP",
    bookHeading: "Réservez Votre Expérience",
    bookDesc: "Remplissez le formulaire et nous vous répondrons rapidement.",
    lblGuestName: "Votre Nom Complet :",
    lblGuestContact: "Email ou Téléphone :",
    lblGuestService: "Sélectionnez le Forfait :",
    lblGuestDate: "Date :",
    lblGuestCount: "Nombre de Personnes :",
    lblGuestNotes: "Demandes Spéciales :",
    btnBookSubmit: "Envoyer via WhatsApp",
    footerAbout: "Luxe 10 étoiles, aventure, artisanat et expériences privées à Zanzibar et en Tanzanie.",
    footerContactHead: "Contact Direct"
};

const itTranslation = {
    heroTitle: "UNP TOURS ZANZIBAR",
    heroDesc: "Scopri i tour di lusso più raffinati di Zanzibar e Tanzania, sport acquatici, artigianato e esperienze private in piena libertà.",
    heroBtn: "Prenota l'Esperienza VIP",
    secTitle: "Le Nostre Esperienze Esclusive",
    navExcursions: "Escursioni",
    navWater: "Sport Acquatici",
    navSafari: "Safari in Tanzania",
    navArt: "Artigianato",
    navGarden: "Giardino Segreto",
    navVote: "Valutaci",
    navVip: "Esperienza VIP",
    navBook: "Prenota",
    navContact: "Contatti",
    navAbout: "Chi Siamo",
    navGallery: "Galleria",
    card1Title: "Escursioni a Zanzibar",
    card1Desc: "Visita le tartarughe giganti, Safari Blue e Stone Town.",
    card2Title: "Foresta di Jozani",
    card2Desc: "Esplora i rari scimmie Colobus rossi.",
    card3Title: "Noleggio Veicoli",
    card3Desc: "Auto, scooter e quad.",
    card4Title: "Trasferimenti di Lusso",
    card4Desc: "Trasferimenti VIP con Wi-Fi e A/C.",
    card5Title: "Safari in Tanzania",
    card5Desc: "Safari in aereo verso Serengeti e Ngorongoro.",
    card6Title: "Sport Acquatici",
    card6Desc: "Jet Ski, Jet Car e Drone Kayak.",
    card7Title: "Artigianato",
    card7Desc: "Souvenir e opere d'arte unici.",
    card8Title: "Giardino Segreto",
    card8Desc: "Esperienza privata in piena libertà.",
    card9Title: "Esperienza VIP",
    card9Desc: "Lusso oltre l'immaginazione.",
    card10Title: "Jet Privato",
    card10Desc: "Arriva con stile con il nostro servizio di jet privato.",
    aboutHeading: "Chi Siamo",
    aboutDesc: "Unique & Natural Paradise (UNP) - La tua porta verso il lusso a Zanzibar.",
    aboutText1: "Siamo un tour operator premium con sede a Zanzibar, Tanzania.",
    aboutText2: "Il nostro team di guide esperte e professionisti dell'ospitalità è dedicato a offrirti ricordi indimenticabili.",
    galleryHeading: "La Nostra Galleria",
    galleryDesc: "Uno sguardo alla bellezza di Zanzibar e Tanzania.",
    voteHeading: "Valuta la Tua Esperienza",
    voteDesc: "Raccontaci la tua esperienza con UNP TOURS.",
    lblSelectExp: "Seleziona il servizio ricevuto:",
    lblRateStars: "Valutaci (1-5 stelle):",
    btnVoteSubmit: "Invia",
    vipHeading: "Esperienza di Lusso VIP",
    vipDesc: "Vivi Zanzibar come la regalità.",
    vipF1: "Jet Privato",
    vipF1Sub: "Arriva con stile",
    vipF2: "Giardino Segreto",
    vipF2Sub: "Santuario privato",
    vipF3: "Servizio di Maggiordomo",
    vipF3Sub: "Cura personalizzata",
    btnVipReq: "Richiedi Pacchetto VIP",
    bookHeading: "Prenota la Tua Esperienza",
    bookDesc: "Compila il modulo e ti risponderemo rapidamente.",
    lblGuestName: "Il Tuo Nome Completo:",
    lblGuestContact: "Email o Telefono:",
    lblGuestService: "Seleziona Pacchetto:",
    lblGuestDate: "Data:",
    lblGuestCount: "Numero di Ospiti:",
    lblGuestNotes: "Richieste Speciali:",
    btnBookSubmit: "Invia via WhatsApp",
    footerAbout: "Lusso 10 stelle, avventura, artigianato ed esperienze private a Zanzibar e Tanzania.",
    footerContactHead: "Contatto Diretto"
};

const deTranslation = {
    heroTitle: "UNP TOURS ZANZIBAR",
    heroDesc: "Entdecken Sie die exklusivsten Luxustouren von Sansibar und Tansania, Wassersport, handgefertigte Kunst und private Rückzugsorte in völliger Freiheit.",
    heroBtn: "VIP-Erlebnis Buchen",
    secTitle: "Unsere Exklusiven Erlebnisse",
    navExcursions: "Ausflüge",
    navWater: "Wassersport",
    navSafari: "Tansania Safari",
    navArt: "Handgefertigte Kunst",
    navGarden: "Geheimer Garten",
    navVote: "Bewerten Sie uns",
    navVip: "VIP-Erlebnis",
    navBook: "Buchen",
    navContact: "Kontakt",
    navAbout: "Über Uns",
    navGallery: "Galerie",
    card1Title: "Ausflüge in Sansibar",
    card1Desc: "Besuchen Sie Riesenschildkröten, Safari Blue und Stone Town.",
    card2Title: "Jozani-Wald",
    card2Desc: "Entdecken Sie seltene Roten Colobus-Affen.",
    card3Title: "Fahrzeugvermietung",
    card3Desc: "Autos, Roller und Quads.",
    card4Title: "Luxustransfers",
    card4Desc: "VIP-Chauffeurtransfers mit WLAN und Klimaanlage.",
    card5Title: "Tansania Safaris",
    card5Desc: "Flug-Safaris nach Serengeti und Ngorongoro.",
    card6Title: "Wassersport",
    card6Desc: "Jet Ski, Jet Car und Drohnen-Kajak.",
    card7Title: "Handgefertigte Kunst",
    card7Desc: "Einzigartige handgefertigte Souvenirs.",
    card8Title: "Geheimer Garten",
    card8Desc: "Privates Rückzugsort-Erlebnis in völliger Freiheit.",
    card9Title: "VIP-Erlebnis",
    card9Desc: "Luxus jenseits Ihrer Vorstellungskraft.",
    card10Title: "Privatjet",
    card10Desc: "Kommen Sie stilvoll mit unserem Privatjet-Service an.",
    aboutHeading: "Über Uns",
    aboutDesc: "Unique & Natural Paradise (UNP) - Ihr Tor zum Luxus in Sansibar.",
    aboutText1: "Wir sind ein Premium-Reiseveranstalter mit Sitz in Sansibar, Tansania.",
    aboutText2: "Unser Team aus erfahrenen Reiseleitern und Gastgewerbeprofis ist bestrebt, Ihnen unvergessliche Erinnerungen zu bieten.",
    galleryHeading: "Unsere Galerie",
    galleryDesc: "Ein Einblick in die Schönheit von Sansibar und Tansania.",
    voteHeading: "Bewerten Sie Ihre Erfahrung",
    voteDesc: "Erzählen Sie uns von Ihrer Erfahrung mit UNP TOURS.",
    lblSelectExp: "Wählen Sie den erhaltenen Service:",
    lblRateStars: "Bewerten Sie uns (1-5 Sterne):",
    btnVoteSubmit: "Absenden",
    vipHeading: "VIP-Luxus-Erlebnis",
    vipDesc: "Erleben Sie Sansibar wie königlich.",
    vipF1: "Privatjet",
    vipF1Sub: "Kommen Sie stilvoll an",
    vipF2: "Geheimer Garten",
    vipF2Sub: "Privates Rückzugsort",
    vipF3: "Butler-Service",
    vipF3Sub: "Persönliche Betreuung",
    btnVipReq: "VIP-Paket Anfordern",
    bookHeading: "Buchen Sie Ihr Erlebnis",
    bookDesc: "Füllen Sie das Formular aus und wir melden uns schnell bei Ihnen.",
    lblGuestName: "Ihr Vollständiger Name:",
    lblGuestContact: "E-Mail oder Telefon:",
    lblGuestService: "Paket Auswählen:",
    lblGuestDate: "Datum:",
    lblGuestCount: "Anzahl der Gäste:",
    lblGuestNotes: "Besondere Wünsche:",
    btnBookSubmit: "Per WhatsApp Senden",
    footerAbout: "10-Sterne-Luxus, Abenteuer, handgefertigte Kunst und Rückzugsorterlebnisse in Sansibar und Tansania.",
    footerC
