// offline config passed to workbox-build.
module.exports = {
    globPatterns: ["**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}"],
    globDirectory: "./public",
    swDest: "./public/service-worker.js",
    // runtimeCaching: [
    //   {
    //     urlPattern: /^https:\/\/lib\.baomitu\.com\/.*/,
    //     handler: "StaleWhileRevalidate"
    //   },
    //   {
    //     urlPattern: /^https:\/\/at\.alicdn\.com\/.*/,
    //     handler: "StaleWhileRevalidate"
    //   },
    //   {
    //     urlPattern: /^https:\/\/blog\.cxzlw\.top\/service-worker\.js$/,
    //     handler: "NetworkOnly"
    //   }, 
    //   {
    //     urlPattern: /^https:\/\/blog\.cxzlw\.top\/.*/, 
    //     handler: "NetworkFirst"
    //   }
    // ], 
    skipWaiting: true, 
    clientsClaim: true
}