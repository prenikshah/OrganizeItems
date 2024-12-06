const cacheName = "GamingOverclock -OrganizeItems-0.1";
const contentToCache = [
    "Build/0399d76e156d85dadd7cef09896870b9.loader.js",
    "Build/718deae20350fe937d13cc66177798ed.framework.js",
    "Build/1d4c7b9979147ba58d9ae39d4f942961.data",
    "Build/08c77739d78c587abb4444de79afb355.wasm",
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
