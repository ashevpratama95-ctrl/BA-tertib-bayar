const CACHE_NAME = 'ba-tertib-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Proses install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Proses ambil data (fetch)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kalau ada di cache, pakai itu
        if (response) {
          return response;
        }
        // Kalau nggak ada, ambil dari internet
        return fetch(event.request);
      })
  );
});

// Update service worker jika ada versi baru
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});