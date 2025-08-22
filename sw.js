// Minimal service worker to avoid 404 from registration
self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('[SW] Installed');
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    console.log('[SW] Activated');
    if (self.registration && self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  // Simple network-first strategy for navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/')));
    return;
  }
  // For other requests, just pass through to network
  event.respondWith(fetch(event.request).catch(() => new Response(null, { status: 504 })));
});
