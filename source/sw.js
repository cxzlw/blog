// import {precacheAndRoute} from 'workbox-precaching';

importScripts(
    'https://lib.baomitu.com/workbox-sw/7.0.0/workbox-sw.min.js'
);

const {StaleWhileRevalidate, NetworkFirst} = workbox.strategies; 
const {registerRoute} = workbox.routing; 
const {warmStrategyCache} = workbox.recipes;
const {clientsClaim} = workbox.core;

const staleWhileRevalidate = new StaleWhileRevalidate(); 
const networkFirst = new NetworkFirst(); 

registerRoute(/^https:\/\/lib\.baomitu\.com\/.*/, staleWhileRevalidate, "GET"); 
registerRoute(/^https:\/\/at\.alicdn\.com\/.*/, staleWhileRevalidate, "GET"); 
registerRoute(/^https:\/\/v1\.hitokoto\.cn\/.*/, staleWhileRevalidate, "GET"); 
registerRoute(/^https:\/\/blog\.cxzlw\.top\/.*/, networkFirst, "GET"); 
registerRoute(/^http:\/\/localhost:8000\/.*\.html/, networkFirst, "GET"); 
// registerRoute(/^http:\/\/localhost:8000\/.*/, staleWhileRevalidate, "GET"); 

const urls = self.__WB_MANIFEST.map(element => element["url"]);
const index_urls = urls.filter(url => url.endsWith("index.html")).map(url => url.substring(0, url.length - 10)); 

warmStrategyCache({urls:urls, strategy:staleWhileRevalidate}); 
warmStrategyCache({urls:index_urls, strategy:staleWhileRevalidate}); 

skipWaiting()
clientsClaim()
