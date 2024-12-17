const cacheName = "psgaming09-OrganizeItems-1.0";
const contentToCache = [
    "Build/2b2f20f9e6e38dc1f126847bc44667e3.loader.js",
    "Build/38b0dbafca586f9236fce42d04ef6983.framework.js",
    "Build/d7e9edb10281934af499b1f85d09b2b8.data",
    "Build/8649c26c57a0327755fbb221c846898f.wasm",
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
