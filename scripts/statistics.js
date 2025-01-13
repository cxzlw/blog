hexo.extend.filter.register("theme_inject", function (injects) {
    injects.postMetaTop.raw(
        "views",
        `
    <span id="page_pv" class="post-meta mr-2" style="display: none;">
          <i class="iconfont icon-eye" aria-hidden="true"></i>
          <span id="page_pv_value"></span> 次
    </span>
    `,
    );
    injects.postMetaTop.raw(
        "comment_count",
        `
    <span id="comment_count" class="post-meta mr-2" style="display: none;">
          <i class="iconfont icon-comment" aria-hidden="true"></i>
          <span id="comment_count_value"></span> 条
    </span>
    `,
    );
    injects.footer.raw(
        "statistics-div",
        `
    <div id="statistics-div" class="statistics-div">
        <span id="page_mv" class="statistics-span" style="display: none">
                你访问了这个页面
                <span id="page_mv_value"></span>
                次
        </span>
        <div class="pvuv-div">
            <span id="site_pv" class="statistics-span" style="display: none">
                总访问量
                <span id="site_pv_value"></span>
                次
            </span>
            
            <span id="site_uv" class="statistics-span" style="display: none">
                总访客数
                <span id="site_uv_value"></span>
                人
            </span>
        </div>
    </div>`,
    );

    injects.bodyEnd.raw(
        "statistics-js",
        `
    <script async src="/js/statistics.js"></script>
    `,
    );
});
