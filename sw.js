// sw.js
const CACHE_NAME = 'online-school-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/lessons.html',
    '/certificates.html',
    '/library.html',
    '/contact.html',
    '/english-basic-detail.html',
    '/english-translation-detail.html',
    // បន្ថែមមេរៀនវីដេអូរបស់អ្នកទាំងអស់នៅទីនេះ
    '/english-basic-video-lesson-1.html',
    '/english-basic-video-lesson-2.html',
    '/english-basic-video-lesson-3.html',
    '/english-basic-video-lesson-4.html',
    '/english-basic-video-lesson-5.html',
    '/english-basic-video-lesson-6.html',
    '/english-basic-video-lesson-7.html',
    '/english-basic-video-lesson-8.html',
    '/english-basic-video-lesson-9.html',
    '/english-basic-video-lesson-10.html',
    // ឯកសារផ្សេងទៀតដូចជា Sanskrit.html, English I.html, Ebook(pdf).html
    '/Sanskrit.html',
    '/English I.html',
    '/Ebook(pdf).html',
    '/style.css',
    '/script.js',
    '/logo.png', // ត្រូវប្រាកដថាអ្នកមានឯកសារ logo.png
    // បន្ថែម Icon របស់អ្នកទាំងអស់
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/image_2f5b53.jpg',
    // បន្ថែម PDFs ប្រសិនបើអ្នកចង់ឱ្យពួកវាអាចចូលប្រើបាន Offline
    // '/pdfs/english-basic-notes.pdf',
    // '/ebooks/sample_math.pdf', // ល។
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css', // Cache Font Awesome CSS
    'https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Noto+Sans+Khmer:wght@400;700&display=swap' // Cache Google Fonts CSS
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});