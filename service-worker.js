const CACHE = 'tml-hub-v26';
const APP_SHELL = ['./', './index.html', './styles.css', './player-dock.css', './script.js', './week1.json', './week2.json', './manifest.webmanifest', './tml_hub_icon.png', './favicon.ico', './favicon-16x16.png', './favicon-32x32.png', './apple-touch-icon.png', './android-chrome-192x192.png', './android-chrome-512x512.png'];

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
  const pathname = new URL(event.request.url).pathname;
  if (pathname.endsWith('/week1.json') || pathname.endsWith('/week2.json')) {
    event.respondWith(fetch(event.request).then((response) => {
      if (response.ok) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
