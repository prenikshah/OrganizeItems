const cacheName = "psgaming09-OrganizeItems-1.0";
const contentToCache = [
    "Build/86a6b753ef93034def206d78a9dc53fb.loader.js",
    "Build/38b0dbafca586f9236fce42d04ef6983.framework.js",
    "Build/3bcc25a1cf31df52e7e893aab4d16919.data",
    "Build/6df089459da5a9e9a3d4e0cac1e011f0.wasm",
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
