// Offline support: the first visit saves the game on the phone,
// and later visits load from that saved copy, with or without internet.
// Bump VERSION whenever the game changes so phones pick up the new copy.
const PREFIX = 'ttt-';
const VERSION = PREFIX + 'v2';
const FILES = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    // Only remove this game's older copies; other games on the same site keep theirs.
    .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
      // Keep a copy of the web fonts too, so the game looks the same offline.
      if (res.ok && /fonts\.(googleapis|gstatic)\.com/.test(e.request.url)) {
        const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
