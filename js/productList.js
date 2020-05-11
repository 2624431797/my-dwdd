/* 路径 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "jquery-ui": "jquery-ui.min",
        "jquery-cookie": "jquery.cookie",
        "aside": "aside",
        "header": "header",
        "shopCart": "shopCart"
    },
    shim: {
        "jquery-cookie": ["jquery"]
    }
})

require(["aside", "header", "shopCart"], function (aside, header, shopCart) {
    aside.aside()
    header.header()
    shopCart.shopCart()
})

/* 女士服装 */
require([], function () {
    for (var i = 0; i < $(".clothes_botdiv").size(); i++) {
        $(".clothes_botdiv").eq(i).mouseenter(function () {
            $(this).addClass("clo_botdiv");
            $(this).find(".clothes_botdiv_txt").addClass("clo_botdiv_hbg")
        }).mouseleave(function () {
            $(this).removeClass("clo_botdiv")
            $(this).find(".clothes_botdiv_txt").removeClass("clo_botdiv_hbg")
        })
    }

    //列表
    for (var i = 0; i < $(".shop_body").size(); i++) {
        $(".shop_body").eq(i).mouseenter(function () {
            $(this).find(".shop_show").addClass("shop_showact")
        }).mouseleave(function () {
            $(this).find(".shop_show").removeClass("shop_showact")
        })
    }
})