const cacheName = "GamingOverclock -OrganizeItems-0.1";
const contentToCache = [
    "Build/9d46d02a0061bb846466b8b8484ed059.loader.js",
    "Build/c41618d2a05555c61e7f40cd12e422c6.framework.js.br",
    "Build/5d93785508a32dd0a44d49f7b2deb502.data.br",
    "Build/60d91534057c743babfd6e7cdc3ad347.wasm.br",
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
