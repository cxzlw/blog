hexo.extend.filter.register('theme_inject', function(injects) {
	// injects.postMetaTop.raw('views', `
    // <span id="page_pv" style="display: none;">
    //       <i class="iconfont icon-eye" aria-hidden="true"></i>
    //       <span id="page_pv_value"></span> 次
    // </span>
    // `);
    // injects.footer.raw('statistics-div', `
    // <div id="statistics-div" class="statistics">
    //     <span id="site_pv" style="display: none">
    //         总访问量 
    //         <span id="site_pv_value"></span>
    //         次
    //     </span>
    //     <span id="site_uv" style="display: none">
    //         总访客数 
    //         <span id="site_uv_value"></span>
    //         人
    //     </span>
    // </div>`); 
    injects.bodyEnd.raw('statistics-js', `
    <script async src="/js/statistics.js"></script>
    `); 
});