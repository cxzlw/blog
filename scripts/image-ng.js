// hexo.extend.filter.register('after_render:html', function(str, data) {
//     let result = str.replace(/<img src="(.*?)" srcset="(.*?)" lazyload alt="(.*?)">/g, (raw_str, src, srcset, alt) => {
//         // let picture_str = `
//         // <picture>
//         //     <source lazyload-data data-srcset="${src}.webp" type="image/webp">
//         //     <img src="${src}" srcset="${srcset}" lazyload alt="${alt}">
//         // </picture>
//         // `; 
//         let picture_str = `
//         <img src="${src}.webp" srcset="${srcset}" lazyload alt="${alt}">
//         `; 

//         return picture_str; 
//     }); 

//     return result; 
// }, 20);
// hexo.extend.injector.register('body_end', '<script async src="/js/image-ng.js"></script>', 'default');
