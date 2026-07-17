const CACHE = 'tml-hub-v49';
const APP_SHELL = ['./', './index.html?v=49', './css/styles.css?v=49', './css/player-dock.css?v=49', './css/modern-ui.css?v=49', './js/script.js?v=49', './manifest.webmanifest', './assets/tml_hub_icon.png', './assets/favicon.ico', './assets/favicon-16x16.png', './assets/favicon-32x32.png', './assets/apple-touch-icon.png', './assets/android-chrome-192x192.png', './assets/android-chrome-512x512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const isUpdate = keys.some((key) => key.startsWith('tml-hub-') && key !== CACHE);
    await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
    if (isUpdate) {
      const windows = await self.clients.matchAll({ type: 'window' });
      await Promise.allSettled(windows.map((client) => client.navigate(client.url)));
    }
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(event.request);
      if (response.ok) await cache.put(event.request, response.clone());
      return response;
    } catch (_) {
      return (await cache.match(event.request)) || (event.request.mode === 'navigate' ? cache.match('./index.html?v=49') : undefined) || Response.error();
    }
  })());
});
