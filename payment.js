/* ==========================================
   UNP TOURS - PAYMENT.JS
   Malipo — M-Pesa, Tigo, Airtel, Visa, PayPal
   ========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2YtPFL2L_ZwAKdSYpXtvLt8gJUm2IX6s",
    authDomain: "unptours.firebaseapp.com",
    projectId: "unptours",
    storageBucket: "unptours.firebasestorage.app",
    messagingSenderId: "233326851661",
    appId: "1:233326851661:web:354156110a5cee29904e04"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// 1. NAMBA YA WHATSAPP YA MALIPO
// ==========================================
const PAYMENT_WHATSAPP = "255655728982";

// ==========================================
// 2. AINA ZA MALIPO
// ==========================================
const paymentMethods = {
    "M-Pesa": { icon: "fa-mobile-alt", color: "#e60000" },
    "Tigo Pesa": { icon: "fa-mobile-alt", color: "#0033a0" },
    "Airtel Money": { icon: "fa-mobile-alt", color: "#e40000" },
    "Halopesa": { icon: "fa-mobile-alt", color: "#ff6600" },
    "Visa/Mastercard": { icon: "fa-credit-card", color: "#1a1f71" },
    "PayPal": { icon: "fa-paypal", color: "#003087" },
    "Bank Transfer": { icon: "fa-university", color: "#006400" },
    "Cryptocurrency": { icon: "fa-bitcoin", color: "#f7931a" }
};

// ==========================================
// 3. TUMA OMBI LA MALIPO
// ==========================================
window.unpSubmitPayment = async function(data) {
    try {
        await addDoc(collection(db, "payments"), {
            method: data.method,
            name: data.name,
            email: data.email,
            phone: data.phone,
            reference: data.reference,
            amount: data.amount,
            notes: data.notes || '',
            status: 'Inasubiri',
            createdAt: new Date()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ==========================================
// 4. TUMA KWA WHATSAPP
// ==========================================
window.unpSendPaymentWhatsApp = function(data) {
    let message = '*UNP TOURS - OMBI LA MALIPO*%0A%0A';
    message += '*Njia:* ' + encodeURIComponent(data.method) + '%0A';
    message += '*Jina:* ' + encodeURIComponent(data.name) + '%0A';
    message += '*Email:* ' + encodeURIComponent(data.email) + '%0A';
    message += '*Simu:* ' + encodeURIComponent(data.phone) + '%0A';
    message += '*Booking Ref:* ' + encodeURIComponent(data.reference) + '%0A';
    message += '*Kiasi:* $' + encodeURIComponent(data.amount) + '%0A';
    message += '*Maelezo:* ' + encodeURIComponent(data.notes || 'Hakuna');

    window.open('https://wa.me/' + PAYMENT_WHATSAPP + '?text=' + message, '_blank');
};

// ==========================================
// 5. HESABU ZA MALIPO (Kwa wateja)
// ==========================================
const paymentAccounts = {
    "M-Pesa": {
        number: "+255 655 728 982",
        name: "UNP TOURS",
        instructions: "Tuma kwa M-Pesa, kisha tuma screenshot kwa WhatsApp."
    },
    "Tigo Pesa": {
        number: "+255 655 728 982",
        name: "UNP TOURS",
        instructions: "Tuma kwa Tigo Pesa, kisha tuma screenshot kwa WhatsApp."
    },
    "Airtel Money": {
        number: "+255 655 728 982",
        name: "UNP TOURS",
        instructions: "Tuma kwa Airtel Money, kisha tuma screenshot kwa WhatsApp."
    },
    "Bank Transfer": {
        number: "CRDB: 0150-XXXX-XXXX",
        name: "UNP TOURS LTD",
        instructions: "Tuma kwa benki, kisha tuma uthibitisho kwa WhatsApp."
    }
};

// ==========================================
// 6. PAKUA MAELEZO YA MALIPO
// ==========================================
window.unpGetPaymentAccount = function(method) {
    return paymentAccounts[method] || {
        number: "+255 655 728 982",
        name: "UNP TOURS",
        instructions: "Wasiliana nasi kwa maelezo zaidi."
    };
};

// ==========================================
// 7. HESABU YA JUMLA
// ==========================================
window.unpCalculateTotal = function(items) {
    let total = 0;
    items.forEach(item => {
        total += parseFloat(item.price || 0);
    });
    return total;
};

// ==========================================
// 8. KUPATA NAMBA YA REFERENCE
// ==========================================
window.unpGenerateReference = function() {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return 'UNP-' + year + '-' + random;
};

console.log('✅ UNP TOURS Payment.js imepakiwa');
