const CACHE_NAME = 'health-directory-cache-v1';
const urlsToCache = [
  '/shaviyanihealthdirectory/',
  '/index.html',
  '/add-contact.html',
  '/manifest.json',
  '/logo.png',
  // Add your icons folder if needed
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Bootstrap CSS and JS CDN (cache them for offline)
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
];

// Install event: cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch event: serve cached files if available, else fetch network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
