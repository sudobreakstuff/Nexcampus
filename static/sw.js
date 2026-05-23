const CACHE = 'nexcampus-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/retro.css',
  '/js/utils.js',
  '/js/app.js',
  '/js/modules/notebook.js',
  '/js/modules/notes.js',
  '/js/modules/tools.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/favicon.png',
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); })
      );
    })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.url.startsWith(self.location.origin + '/api/')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request);
    })
  );
});
