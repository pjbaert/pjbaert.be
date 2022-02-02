const staticPjbaert = "pjbaert-site-v1.1";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/css/style.css",
  "/favicon.ico",
  "/assets/favicon.png",
  "/scripts/modernizr.js"
]


self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPjbaert).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
