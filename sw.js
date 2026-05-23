const CACHE = 'nexcampus-v3';
const ASSETS = [
  '.',
  'index.html',
  'manifest.json',
  'static/css/retro.css',
  'static/js/utils.js',
  'static/js/app.js',
  'static/js/modules/notebook.js',
  'static/js/modules/notes.js',
  'static/js/modules/tools.js',
  'static/icons/icon-192.png',
  'static/icons/icon-512.png',
  'static/icons/favicon.png',
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
    Promise.all([
      caches.keys().then(function(keys) {
        return Promise.all(
          keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); })
        );
      }),
      self.clients.claim()
    ])
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
