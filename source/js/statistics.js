async function main() {
    let resp = await fetch("https://blog-api.cxzlw.top/count", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "page_url": window.location.href
            }),
    });
    
    let result = await resp.json(); 
    console.log(result); 
    
    let page_pv = document.getElementById("page_pv"); 
    let page_pv_value = document.getElementById("page_pv_value"); 
    let metas = document.getElementsByClassName("mt-1"); 

    if (page_pv && page_pv_value && metas) {
        metas[0].appendChild(page_pv);
        page_pv_value.textContent = result.page_pv; 
        document.getElementById("page_pv").style = "display: inline; "
    }

    let site_pv = document.getElementById("site_pv"); 
    let site_pv_value = document.getElementById("site_pv_value"); 
    let site_uv = document.getElementById("site_uv"); 
    let site_uv_value = document.getElementById("site_uv_value"); 
    let statistics = document.getElementById("statistics-div"); 
    let footer_inner = document.getElementsByClassName("footer-inner"); 

    if (site_pv && site_pv_value && site_uv && site_uv_value && statistics && footer_inner) {
        footer_inner[0].appendChild(statistics);
        site_pv_value.textContent = result.site_pv; 
        site_uv_value.textContent = result.site_uv; 
        document.getElementById("site_pv").style = "display: inline; "
        document.getElementById("site_uv").style = "display: inline; "
    }
}

main(); 