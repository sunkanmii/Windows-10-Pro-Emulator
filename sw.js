let CACHE_NAME = 'my-site-cache-v1';
let urlsToCache = [
    '/',
    'index.html',
    'imgs/slideshow/Img2.jpg',
    'imgs/slideshow/Img4.jpg',
    'imgs/slideshow/Img6.jpg',
    'imgs/apps/[removal.ai]_tmp-60d72cc48e6d1_EUZTXT.png',
    'imgs/apps/brand-icon.png',
    'imgs/apps/edge.svg',
    'imgs/apps/chrome.svg',
    'css/main.css',
    'js/main.js',
    'js/drag-and-drop.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', function (event) {

    let cacheAllowlist = ['my-site-cache-v1'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});