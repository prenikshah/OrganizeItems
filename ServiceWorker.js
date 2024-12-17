const cacheName = "psgaming09-OrganizeItems-1.0";
const contentToCache = [
    "Build/68fd946c58f9589c4c0e60682c309126.loader.js",
    "Build/4049226985604ca7746b19bef3c95a12.framework.js",
    "Build/b209290ee7159685ab7da4f3f21254cb.data",
    "Build/7cf8573daff8d02ef18b3bfb4e970cb2.wasm",
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
