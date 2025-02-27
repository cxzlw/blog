async function main() {
    let url = window.location.href;
    let view_resp = await fetch(
        "https://blog-api.cxzlw.top/count?" +
            new URLSearchParams({ page_url: url, t: new Date() }),
        {
            method: "POST",
            cache: "no-cache",
        },
    );

    let view_result = await view_resp.json();
    console.log(view_result);

    let page_pv = document.getElementById("page_pv");
    let page_pv_value = document.getElementById("page_pv_value");
    let metas = document.getElementsByClassName("mt-1");

    if (page_pv && page_pv_value && metas) {
        metas[0].appendChild(page_pv);
        page_pv_value.textContent = view_result.page_pv;
        document.getElementById("page_pv").style = "display: inline; ";
    }

    let page_mv = document.getElementById("page_mv");
    let page_mv_value = document.getElementById("page_mv_value");
    let site_pv = document.getElementById("site_pv");
    let site_pv_value = document.getElementById("site_pv_value");
    let site_uv = document.getElementById("site_uv");
    let site_uv_value = document.getElementById("site_uv_value");
    let statistics = document.getElementById("statistics-div");
    let footer_inner = document.getElementsByClassName("footer-inner");

    if (
        page_mv &&
        page_mv_value &&
        site_pv &&
        site_pv_value &&
        site_uv &&
        site_uv_value &&
        statistics &&
        footer_inner
    ) {
        footer_inner[0].appendChild(statistics);
        page_mv_value.textContent = view_result.page_mv;
        site_pv_value.textContent = view_result.site_pv;
        site_uv_value.textContent = view_result.site_uv;
        page_mv.style = "display: inline; ";
        site_pv.style = "display: inline; ";
        site_uv.style = "display: inline; ";
    }

    let comment_resp = await fetch(
        "https://blog-waline.cxzlw.top/api/comment?" +
            new URLSearchParams({
                type: "count",
                url: new URL(url).pathname,
            }),
        {
            method: "GET",
            cache: "no-cache",
        },
    );
    let comment_count = (await comment_resp.json()).data[0];
    let comment_count_ele = document.getElementById("comment_count");
    let comment_count_value = document.getElementById("comment_count_value");

    if (comment_count_ele && comment_count_value && metas) {
        metas[0].appendChild(comment_count_ele);
        comment_count_value.textContent = comment_count;
        comment_count_ele.style = "display: inline; ";
    }
}

async function article_views(element) {
    let url = element.children[0].children[0].href;
    let post_metas = element.children[2];

    let tags = post_metas.children[1];
    if (tags) tags.classList.add("mr-3");

    let view_resp = await fetch(
        "https://blog-api.cxzlw.top/count?" +
            new URLSearchParams({ page_url: url, t: new Date() }),
        {
            method: "GET",
            cache: "no-cache",
        },
    );

    let view_result = await view_resp.json();
    console.log(view_result);
    let view_count = view_result.page_pv;

    let comment_resp = await fetch(
        "https://blog-waline.cxzlw.top/api/comment?" +
            new URLSearchParams({ type: "count", url: new URL(url).pathname }),
        {
            method: "GET",
            cache: "no-cache",
        },
    );
    let comment_count = (await comment_resp.json()).data[0];

    let node = document.createElement("div");
    post_metas.appendChild(node);
    node.outerHTML = `
    <div class="post-meta mr-3">
        <i class="iconfont icon-eye" aria-hidden="true"></i>
        <span>${view_count}</span>
    </div>
    <div class="post-meta">
        <i class="iconfont icon-comment" aria-hidden="true"></i>
        <span>${comment_count}</span>
    </div>`;
}

async function index_article_views() {
    let articles = document.getElementsByClassName("index-info");
    for (const element of articles) {
        article_views(element);
    }
}

main();

if (window.location.pathname === "/") {
    index_article_views();
}
