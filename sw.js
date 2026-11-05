const CACHE_NAME = 'finanzas-arcade-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Durante la instalación, guardamos los archivos clave en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché guardados con éxito');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para servir desde caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en caché, lo devuelve
        if (response) {
          return response;
        }
        // Si no, va a buscarlo a internet
        return fetch(event.request);
      })
  );
});
