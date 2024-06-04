if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistration('/').then(function(registration) {
    registration.update();
  });
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log(""))
      .catch(err => console.log("service worker not registered", err))
  })
}
