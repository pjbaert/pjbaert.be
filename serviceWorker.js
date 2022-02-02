const staticPjbaert = "pjbaert-site-v1.2";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/favicon.ico",
  "favicon-32x32.png"
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
