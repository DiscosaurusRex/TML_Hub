const CACHE = 'tml-hub-v42';
const APP_SHELL = ['./', './index.html', './css/styles.css', './css/player-dock.css', './js/script.js', './manifest.webmanifest', './assets/tml_hub_icon.png', './assets/favicon.ico', './assets/favicon-16x16.png', './assets/favicon-32x32.png', './assets/apple-touch-icon.png', './assets/android-chrome-192x192.png', './assets/android-chrome-512x512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
