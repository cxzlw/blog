// offline config passed to workbox-build.
module.exports = {
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
        urlPattern: /^https:\/\/blog\.cxzlw\.top\/manifest\.json/, 
        handler: "NetworkFirst"
      }
    ]
}