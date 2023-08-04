// offline config passed to workbox-build.
module.exports = {
    globPatterns: ["**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}"],
    globDirectory: "./public",
    swDest: "./public/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/lib\.baomitu\.com\/.*/,
        handler: "CacheFirst"
      },
      {
        urlPattern: /^https:\/\/at\.alicdn\.com\/.*/,
        handler: "CacheFirst"
      },
      {
        urlPattern: /^https:\/\/blog\.cxzlw\.top\/.*/, 
        handler: "NetworkFirst"
      }
    ]
}