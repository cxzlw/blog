(function(window, document) {
    for (const each of document.querySelectorAll('source[lazyload-data]')) {
      Fluid.utils.waitElementVisible(each.parentNode, function() {
        each.setAttribute("srcset", each.getAttribute("data-srcset"));
        each.removeAttribute('lazyload-data');
        each.removeAttribute('data-srcset');
      }, CONFIG.lazyload.offset_factor);
    }
})(window, document);
