let PRECACHE = 'black-hole-square';
let PRECACHE_URLS = [
    'index.html',
    'icon.png',
    'manifest.json'
];

let createCacheBustedRequest = url => {
    let request = new Request(url, { cache: 'reload' });
    if ('cache' in request) {
        return request;
    }
    let bustedUrl = new URL(url, self.location.href);
    bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
    return new Request(bustedUrl);
}

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(fetch(createCacheBustedRequest(event.request.url)).then(response => {
        caches.open(PRECACHE).then(cache => cache.put(event.request.url, response.clone()));
        return response.clone();
    }).catch(error => {
        return caches.match(event.request.url);
    }));
});
