const staticPjbaert = "pjbaert-site-v2.1";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/favicon.ico",
  "/favicon-16x26.png",
  "/favicon-32x32.png",
  "/mstile-150x150.png"
]


self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPjbaert).then(cache => {
      cache.addAll(assets).then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(
          cache => {
            if (cache !== staticPjbaert) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          }
        )
      )
    })
  );
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
