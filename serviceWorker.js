const staticPjbaert = "pjbaert-site-v2.4";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/mstile-150x150.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPjbaert)
    .then(cache => {
      cache.addAll(assets)
        .then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate', activateEvent => {
  activateEvent.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(
          cache => {
            if (cache !== staticPjbaert) {
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
    fetch(fetchEvent.request)
      .then(res => {
        const resClone = res.clone();
        // Open cache
        caches.open(staticPjbaert)
          .then(cache => {
              // Add response to cache
              cache.put(fetchEvent.request, resClone);
          });
        return res;
      }).catch(
        err => caches.match(fetchEvent.request)
        .then(res => res)
      )
  );
})
