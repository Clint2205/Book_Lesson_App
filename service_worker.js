// Cache name
const CACHE_NAME = "Lessonapp-v1";

// Static Files to cache
const urlsToCache = [
    "index.html",
   // "products.js",
    "images/android-chrome-512x512.png",
    "images/favicon-32x32.png"
    
];

// Install event
self.addEventListener("install", function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("[Service Worker] Caching files");
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event
self.addEventListener("fetch", function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            // Check if the request is in the cache
            if (response) {
                console.log("[Service Worker] Fetching resource from cache:", e.request.url);
                return response;
            } else {
                // Check if the request is a Chrome extension request because its un-supported
                if (e.request.url.startsWith("chrome-extension://")) {
                    console.log("[Service Worker] Skipping caching for Chrome extension request:", e.request.url);
                    return fetch(e.request);
                } else {
                    // If not in cache and not a Chrome extension request, fetch from network and cache dynamically
                    return fetch(e.request).then(function(response) {
                        return caches.open(CACHE_NAME).then(function(cache) {
                            console.log("[Service Worker] Caching new resource:", e.request.url);
                            cache.put(e.request, response.clone());
                            return response;
                        });
                    });
                }
            }
        })
    );
});
