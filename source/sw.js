// import {precacheAndRoute} from 'workbox-precaching';

importScripts(
    'https://unpkg.com/workbox-sw@7.1.0/build/workbox-sw.js'
);

const {StaleWhileRevalidate, NetworkFirst, CacheFirst} = workbox.strategies; 
const {registerRoute} = workbox.routing; 
const {warmStrategyCache} = workbox.recipes;
const {clientsClaim} = workbox.core;

const staleWhileRevalidate = new StaleWhileRevalidate(); 
const networkFirst = new NetworkFirst(); 
const cacheFirst = new CacheFirst(); 

registerRoute(/^https:\/\/lib\.baomitu\.com\/.*/, cacheFirst, "GET"); 
registerRoute(/^https:\/\/at\.alicdn\.com\/.*/, cacheFirst, "GET"); 
registerRoute(/^https:\/\/unpkg\.com\/.*/, cacheFirst, "GET"); 

// cdnjs 由于不透明响应需要使用 staleWhileRevalidate
registerRoute(/^https:\/\/cdnjs\.cloudflare\.com\/.*/, staleWhileRevalidate, "GET"); 

registerRoute(/^https:\/\/v1\.hitokoto\.cn\/.*/, staleWhileRevalidate, "GET"); 

registerRoute(/^https:\/\/blog\.cxzlw\.top\/.*/, networkFirst, "GET"); 
registerRoute(/^https:\/\/blog-api\.cxzlw\.top\/.*/, networkFirst, "GET"); 
registerRoute(/^http:\/\/localhost:8000\/.*\.html/, networkFirst, "GET"); 
// registerRoute(/^http:\/\/localhost:8000\/.*/, staleWhileRevalidate, "GET"); 

const urls = self.__WB_MANIFEST.map(element => element["url"]);
const index_urls = urls.filter(url => url.endsWith("index.html")).map(url => url.substring(0, url.length - 10)); 

warmStrategyCache({urls:urls, strategy:staleWhileRevalidate}); 
warmStrategyCache({urls:index_urls, strategy:networkFirst}); 

skipWaiting()
clientsClaim()
