const cacheName = '2048-pwa_static-v4';
const cacheFiles = [
	'/',
	'/index.html',
	'/styles/main.css',
	'/js/app.js',
	'/js/constants.js',
	'/js/dom.js',
	'/js/game.js',
	'/js/grid.js',
	'https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap',
	'/img/icons/icon-72.png',
];

self.addEventListener('install', (e) => {
	console.log('Installing service worker');

	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(cacheFiles);
		})
	);
});

self.addEventListener('activate', (e) => {
	console.log('Activating new service worker');

	const allowedCaches = [cacheName];

	e.waitUntil(
		caches.keys().then((cacheKeys) => {
			return Promise.all(
				cacheKeys.map((cacheKey) => {
					if (!allowedCaches.includes(cacheKey)) {
						return caches.delete(cacheKey);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (e) => {
	console.log('Fetch request for', e.request.url);

	e.respondWith(
		caches
			.match(e.request)
			.then((res) => {
				return (
					res ||
					fetch(e.request).then((res) => {
						return caches.open(cacheName).then((cache) => {
							cache.put(e.request.url, res.clone());
							return res;
						});
					})
				);
			})
			.catch((err) => {
				console.log(err);
			})
	);
});
