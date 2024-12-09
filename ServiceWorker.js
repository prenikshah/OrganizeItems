const cacheName = "DefaultCompany-OrganizeItems-1.0";
const contentToCache = [
    "Build/87b20b7854cef650e3e09f29d48f6029.loader.js",
    "Build/cc48a754ca17ba7b80f9c4fe3c5a1544.framework.js",
    "Build/b00d3e2426da75b6d0e066b23ecf4cc0.data",
    "Build/09bb600d3aca31eeda63e9c4734225b6.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
