const staticPjbaert = "pjbaert-site-v2.7";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/hi.js",
  "/manifest.json",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/mstile-150x150.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPjbaert)
      .then(cache => cache.addAll(assets))
      .then(() => self.skipWaiting())
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
    }).then(() => self.clients.claim())
  );
})

self.addEventListener("fetch", fetchEvent => {
  if (fetchEvent.request.method !== "GET") {
    return;
  }

  fetchEvent.respondWith(
    fetch(fetchEvent.request)
      .then(res => {
        if (!res || !res.ok) {
          return res;
        }

        const resClone = res.clone();

        caches.open(staticPjbaert)
          .then(cache => {
            cache.put(fetchEvent.request, resClone);
          });

        return res;
      }).catch(
        () => caches.match(fetchEvent.request)
      )
  );
})
