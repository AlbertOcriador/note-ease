
const CACHE_NAME = 'notafacil-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Instalar service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativar o service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar requisições para servir do cache
self.addEventListener('fetch', (event) => {
  // Bypass para URLs de download direto
  if (event.request.url.includes('.apk') || 
      event.request.url.includes('/download/') ||
      event.request.url.includes('github.com/releases')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Se a requisição falhar (por exemplo, offline),
            // tente servir a página offline para navegações
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            
            // Para arquivos de download que falham, redirecionar para a página de erro
            if (event.request.url.includes('.apk') || 
                event.request.url.includes('/download/') ||
                event.request.url.includes('github.com/releases')) {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Sincronização em segundo plano quando voltar online
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notas') {
    event.waitUntil(syncNotas());
  }
});

// Função para sincronizar notas quando voltar online
function syncNotas() {
  // Aqui iria a lógica para sincronizar com o backend
  console.log('Sincronizando notas...');
  return Promise.resolve();
}
