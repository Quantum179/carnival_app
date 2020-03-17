importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js')

var CACHE_NAME = 'carnivalCache'
var urlsToCache = ['./main.js']

// if (workbox) {
//   console.log(`Workbox is loaded`)
//   workbox.precaching.precacheAndRoute(self.__precacheManifest)
// } 
// else {
//   console.log(`Workbox didn't load`);
// }

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response
        }

        return fetch(event.request).then(
          function (response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        )
      })
    )
})

self.addEventListener('sync', function(event) {
  if (event.tag == 'sendOfflineVotes') {
    event.waitUntil(console.log('sended'));
  }
})