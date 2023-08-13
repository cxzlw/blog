// import {precacheAndRoute} from 'workbox-precaching';

importScripts(
    'https://lib.baomitu.com/workbox-sw/7.0.0/workbox-sw.min.js'
);

const {StaleWhileRevalidate} = workbox.strategies; 
const {registerRoute} = workbox.routing; 
const {warmStrategyCache} = workbox.recipes;

const staleWhileRevalidate = new StaleWhileRevalidate(); 

registerRoute(/^https:\/\/lib\.baomitu\.com\/.*/, staleWhileRevalidate, "GET"); 
registerRoute(/^https:\/\/at\.alicdn\.com\/.*/, staleWhileRevalidate, "GET"); 
registerRoute(/^https:\/\/blog\.cxzlw\.top\/.*/, staleWhileRevalidate, "GET"); 

const urls = self.__WB_MANIFEST.map(element => element["url"]);

warmStrategyCache({urls:urls, strategy:staleWhileRevalidate}); 
