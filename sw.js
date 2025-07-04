const CACHE_NAME = 'gamenenuco-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/img/gamer-playing-videogame-neon-lit-apartment-holding-controller-close-up.jpg',
  '/img/gaming-setup-with-computer-chair.jpg',
  '/img/man-holding-joystick-video-games.jpg',
  '/img/view-illuminated-neon-gaming-keyboard-setup-controller.jpg',
  '/videos/0_Man_Playing_Video_Games_3840x2160.mp4'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de caché: Cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso si está en caché
        if (response) {
          return response;
        }
        
        // Si no está en caché, lo buscamos en la red
        return fetch(event.request)
          .then(response => {
            // Si la respuesta no es válida, devolvemos la respuesta tal cual
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Si la respuesta es válida, la clonamos y la guardamos en caché
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
      })
  );
}); 