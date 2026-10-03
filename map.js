/* ==========================================
   UNP TOURS - MAP.JS
   Ramani — maeneo ya kitalii Tanzania & Zanzibar
   ========================================== */

// ==========================================
// 1. MAENEO YA KITALII (Coordinates)
// ==========================================
const unpLocations = {
    // Zanzibar
    "Stone Town": { lat: -6.1619, lng: 39.1888, type: "Zanzibar", desc: "Mji wa kihistoria wa Zanzibar" },
    "Nungwi": { lat: -5.7261, lng: 39.2964, type: "Zanzibar", desc: "Fukwe nzuri kaskazini" },
    "Kendwa": { lat: -5.7422, lng: 39.2917, type: "Zanzibar", desc: "Full Moon Party" },
    "Paje": { lat: -6.2617, lng: 39.5342, type: "Zanzibar", desc: "Kitesurfing" },
    "Jambiani": { lat: -6.3156, lng: 39.5483, type: "Zanzibar", desc: "Fukwe tulivu" },
    "Kiwengwa": { lat: -5.9883, lng: 39.3831, type: "Zanzibar", desc: "Fukwe nzuri" },
    "Michamvi": { lat: -6.1500, lng: 39.4667, type: "Zanzibar", desc: "Sunset nzuri" },
    "Matemwe": { lat: -5.8833, lng: 39.3667, type: "Zanzibar", desc: "Snorkeling" },
    
    // Tanzania Safari
    "Serengeti": { lat: -2.3333, lng: 34.8333, type: "Safari", desc: "Mbuga maarufu duniani" },
    "Ngorongoro": { lat: -3.2000, lng: 35.5000, type: "Safari", desc: "Crater kubwa duniani" },
    "Tarangire": { lat: -3.8333, lng: 36.0000, type: "Safari", desc: "Tembo wengi" },
    "Lake Manyara": { lat: -3.5833, lng: 35.8333, type: "Safari", desc: "Flamingos" },
    "Mikumi": { lat: -7.2000, lng: 37.1333, type: "Safari", desc: "Karibu na Morogoro" },
    "Ruaha": { lat: -7.6667, lng: 34.9333, type: "Safari", desc: "Mbuga kubwa" },
    "Selous": { lat: -8.0000, lng: 37.5000, type: "Safari", desc: "Mbuga kubwa duniani" },
    
    // Milima
    "Kilimanjaro": { lat: -3.0674, lng: 37.3556, type: "Mountain", desc: "Mlima mrefu Afrika" },
    "Mount Meru": { lat: -3.2500, lng: 36.7500, type: "Mountain", desc: "Mlima wa pili Tanzania" },
    "Udzungwa": { lat: -7.7500, lng: 36.8333, type: "Mountain", desc: "Milima ya wanyama" },
    "Usambara": { lat: -4.5000, lng: 38.3333, type: "Mountain", desc: "Lushoto, Tanga" },
    "Mahale": { lat: -6.0000, lng: 29.7500, type: "Mountain", desc: "Chimpanzees" },
    "Gombe": { lat: -4.6667, lng: 29.6333, type: "Mountain", desc: "Chimpanzees" },
    
    // Miji
    "Dar es Salaam": { lat: -6.7924, lng: 39.2083, type: "City", desc: "Mji mkubwa Tanzania" },
    "Arusha": { lat: -3.3869, lng: 36.6830, type: "City", desc: "Mji wa safari" },
    "Morogoro": { lat: -6.8278, lng: 37.6591, type: "City", desc: "Mji wa Mikumi" },
    "Dodoma": { lat: -6.1630, lng: 35.7516, type: "City", desc: "Mji mkuu Tanzania" },
    "Mwanza": { lat: -2.5164, lng: 32.9175, type: "City", desc: "Mji wa Ziwa Victoria" },
    "Mbeya": { lat: -8.9000, lng: 33.4500, type: "City", desc: "Mji wa kusini" }
};

// ==========================================
// 2. PAKUA RAMANI
// ==========================================
window.unpLoadMap = function(elementId, centerLat, centerLng, zoom) {
    if (typeof L === 'undefined') {
        console.error('Leaflet haijapakiwa. Weka Leaflet CSS & JS kwenye HTML.');
        return null;
    }

    const map = L.map(elementId).setView([centerLat || -6.1659, centerLng || 39.2026], zoom || 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
    }).addTo(map);

    return map;
};

// ==========================================
// 3. ONGEZA MARKER
// ==========================================
window.unpAddMarker = function(map, lat, lng, title, description) {
    if (!map) return null;
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup('<strong>' + title + '</strong><br>' + (description || ''));
    return marker;
};

// ==========================================
// 4. ONGEZA MAENEO YOTE
// ==========================================
window.unpAddAllLocations = function(map, filterType) {
    if (!map) return;
    Object.keys(unpLocations).forEach(name => {
        const loc = unpLocations[name];
        if (filterType && loc.type !== filterType) return;
        L.marker([loc.lat, loc.lng])
            .addTo(map)
            .bindPopup('<strong>' + name + '</strong><br>' + loc.desc + '<br><em>' + loc.type + '</em>');
    });
};

// ==========================================
// 5. ONGEZA MAENEO YA ZANZIBAR
// ==========================================
window.unpAddZanzibarLocations = function(map) {
    window.unpAddAllLocations(map, 'Zanzibar');
};

// ==========================================
// 6. ONGEZA MAENEO YA SAFARI
// ==========================================
window.unpAddSafariLocations = function(map) {
    window.unpAddAllLocations(map, 'Safari');
};

// ==========================================
// 7. ONGEZA MAENEO YA MILIMA
// ==========================================
window.unpAddMountainLocations = function(map) {
    window.unpAddAllLocations(map, 'Mountain');
};

// ==========================================
// 8. TAFUTA MAENEO KWA JINA
// ==========================================
window.unpGetLocation = function(name) {
    return unpLocations[name] || null;
};

// ==========================================
// 9. PAKUA RAMANI YA ZANZIBAR
// ==========================================
window.unpLoadZanzibarMap = function(elementId) {
    const map = window.unpLoadMap(elementId, -6.1659, 39.2026, 9);
    window.unpAddZanzibarLocations(map);
    return map;
};

// ==========================================
// 10. PAKUA RAMANI YA TANZANIA
// ==========================================
window.unpLoadTanzaniaMap = function(elementId) {
    const map = window.unpLoadMap(elementId, -6.3690, 34.8888, 6);
    window.unpAddAllLocations(map);
    return map;
};

// ==========================================
// 11. HESABU UMBALI (Haversine)
// ==========================================
window.unpCalculateDistance = function(lat1, lng1, lat2, lng2) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(2) + ' km';
};

console.log('✅ UNP TOURS Map.js imepakiwa');
