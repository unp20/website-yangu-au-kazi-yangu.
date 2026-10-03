/* ==========================================
   UNP TOURS - SEARCH.JS
   Kutafuta trips, destinations, na maeneo
   ========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

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
// 1. PAKUA TRIPS ZOTE
// ==========================================
window.unpLoadAllTrips = async function() {
    try {
        const snap = await getDocs(collection(db, "trips"));
        const trips = [];
        snap.forEach(doc => {
            trips.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: trips };
    } catch (error) {
        return { success: false, error: error.message, data: [] };
    }
};

// ==========================================
// 2. TAFUTA TRIPS
// ==========================================
window.unpSearchTrips = async function(query, category) {
    const result = await window.unpLoadAllTrips();
    if (!result.success) return result;

    let trips = result.data;
    const q = (query || '').toLowerCase();

    if (q) {
        trips = trips.filter(t =>
            (t.name || '').toLowerCase().includes(q) ||
            (t.category || '').toLowerCase().includes(q) ||
            (t.description || '').toLowerCase().includes(q) ||
            (t.location || '').toLowerCase().includes(q)
        );
    }

    if (category && category !== 'all') {
        trips = trips.filter(t => t.category === category);
    }

    return { success: true, data: trips };
};

// ==========================================
// 3. CHUJA KWA KATEGORIA
// ==========================================
window.unpFilterByCategory = async function(category) {
    return await window.unpSearchTrips('', category);
};

// ==========================================
// 4. CHUJA KWA BEI
// ==========================================
window.unpFilterByPrice = async function(minPrice, maxPrice) {
    const result = await window.unpLoadAllTrips();
    if (!result.success) return result;

    const trips = result.data.filter(t => {
        const price = parseFloat(t.priceBudget || 0);
        return price >= minPrice && price <= maxPrice;
    });

    return { success: true, data: trips };
};

// ==========================================
// 5. KUPATA TRIPS ZILIZO FEATURED
// ==========================================
window.unpGetFeaturedTrips = async function() {
    const result = await window.unpLoadAllTrips();
    if (!result.success) return result;
    const trips = result.data.filter(t => t.featured === true);
    return { success: true, data: trips };
};

// ==========================================
// 6. KUPATA KATEGORIA ZOTE
// ==========================================
window.unpGetCategories = async function() {
    const result = await window.unpLoadAllTrips();
    if (!result.success) return { success: false, data: [] };

    const categories = [...new Set(result.data.map(t => t.category).filter(Boolean))];
    return { success: true, data: categories };
};

// ==========================================
// 7. KUPATA TRIP MOJA KWA ID
// ==========================================
window.unpGetTripById = async function(id) {
    try {
        const result = await window.unpLoadAllTrips();
        if (!result.success) return result;
        const trip = result.data.find(t => t.id === id);
        if (trip) {
            return { success: true, data: trip };
        }
        return { success: false, error: 'Trip haipatikani.' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ==========================================
// 8. TAFUTA KWA MAHALI
// ==========================================
window.unpSearchByLocation = async function(location) {
    const result = await window.unpLoadAllTrips();
    if (!result.success) return result;
    const loc = (location || '').toLowerCase();
    const trips = result.data.filter(t =>
        (t.location || '').toLowerCase().includes(loc)
    );
    return { success: true, data: trips };
};

// ==========================================
// 9. TAFUTA KWA SIKU
// ==========================================
window.unpSearchByDays = async function(minDays, maxDays) {
    const result = await window.unpLoadAllTrips();
    if (!result.success) return result;
    const trips = result.data.filter(t => {
        const days = parseInt(t.days || 0);
        return days >= minDays && days <= maxDays;
    });
    return { success: true, data: trips };
};

// ==========================================
// 10. TAFUTA KWA RANGI (SORT)
// ==========================================
window.unpSortTrips = function(trips, sortBy) {
    const sorted = [...trips];
    if (sortBy === 'price_asc') {
        sorted.sort((a, b) => (a.priceBudget || 0) - (b.priceBudget || 0));
    } else if (sortBy === 'price_desc') {
        sorted.sort((a, b) => (b.priceBudget || 0) - (a.priceBudget || 0));
    } else if (sortBy === 'name') {
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'days') {
        sorted.sort((a, b) => (a.days || 0) - (b.days || 0));
    }
    return sorted;
};

console.log('✅ UNP TOURS Search.js imepakiwa');
