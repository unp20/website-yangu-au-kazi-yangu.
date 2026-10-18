/* ==========================================
   UNP TOURS — Service Worker (PWA)
   Version: 2.0
   ========================================== */

const CACHE_NAME = 'unp-tours-v2';
const CACHE_URLS = [
  './',
  './index.html',
  './trips.html',
  './safari.html',
  './usambara-cabins.html',
  './booking.html',
  './contact.html',
  './about.html',
  './destinations.html',
  './blog.html',
  './events.html',
  './gallery.html',
  './faq.html',
  './forum.html',
  './promotions.html',
  './membership.html',
  './testimonials.html',
  './privacy.html',
  './terms.html',
  './refund.html',
  './payment.html',
  './travel-tips.html',
  './press.html',
  './careers.html',
  './sitemap.html',
  './partner-public.html',
  './404.html',
  './manifest.json'
];

// ==================== INSTALL ====================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ UNP SW v2: Caching core pages');
      return cache.addAll(CACHE_URLS).catch((err) => {
        console.log('⚠️ SW cache partial:', err);
      });
    })
  );
  self.skipWaiting();
});

// ==================== ACTIVATE ====================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('🗑️ SW: Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ==================== FETCH ====================
self.addEventListener('fetch', (event) => {
  // Skip non-GET
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // Skip Firebase, analytics, external APIs
  if (
    url.includes('firestore.googleapis.com') ||
    url.includes('firebase') ||
    url.includes('google-analytics') ||
    url.includes('googletagmanager') ||
    url.includes('onesignal') ||
    url.includes('yandex') ||
    url.includes('wa.me') ||
    url.includes('tailwindcss.com') ||
    url.includes('fonts.googleapis.com') ||
    url.includes('fonts.gstatic.com')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached + update in background (stale-while-revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Not in cache — fetch from network
      return fetch(event.request).then((response) => {
        // Cache successful responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('./404.html');
        }
      });
    })
  );
});

// ==================== PUSH NOTIFICATIONS ====================
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'UNP TOURS';
  const options = {
    body: data.body || 'New update from UNP Tours!',
    icon: 'assets/images/logo.png',
    badge: 'assets/images/logo.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});

console.log('✅ UNP TOURS Service Worker v2 loaded');