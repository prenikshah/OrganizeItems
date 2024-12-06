const cacheName = "GamingOverclock -OrganizeItems-0.1";
const contentToCache = [
    "Build/c6adb01c56997338bd512e5ba4188a24.loader.js",
    "Build/fda7598d97d7bf16c480169b0312ea5a.framework.js",
    "Build/d459286722dce11f051366ec3316da56.data",
    "Build/e3a1346199e98ac7e174d549db0677d0.wasm",
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
