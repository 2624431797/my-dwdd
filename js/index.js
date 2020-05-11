/* 路径 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "jquery-ui": "jquery-ui.min",
        "jquery-cookie": "jquery.cookie",
        "aside": "aside",
        "banner": "banner",
        "header": "header",
        "ajax": "ajax",
        "ajax": "ajax",
    },
    shim: {
        "jquery-cookie": ["jquery"]
    }
})

require(["aside", "banner", "header", "ajax"], function (aside, banner, header, ajax) {
    aside.aside()
    banner.banner()
    ajax.ajax()
    header.header()
})

/* 主体内容 */
$(function () {
    /* 品牌旗舰 */
    for (var i = 0; i < $(".brand_lista").size(); i++) {
        $(".brand_lista").eq(i).mouseenter(function () {
            $(this).find("em").css("bottom", "0px")
        }).mouseleave(function () {
            $(this).find("em").css("bottom", "-90px")
        })
    }

    /* 热门旗舰 */
    var liLength = parseInt($(".store_li").css("width")) //获取li个数
    var onOff = true //声明变量

    //获取总宽度
    $(".brand_store").css("width", $(".store_li").length * liLength)

    //上一个
    $("#brand_le").click(function () {
        if (parseInt($(".brand_store").css("left")) >= 0) {
            return false;
        }

        if (onOff) {
            onOff = false;
            $(".brand_store").animate({
                left: parseInt($(".brand_store").css("left")) + liLength
            }, function () {
                onOff = true;
            })
        }
    })

    //下一个
    $("#brand_ri").click(function () {
        if (parseInt($(".brand_store").css("left")) <= ($(".store_li").length - 1) * -liLength) {
            return false;
        }
        if (onOff) {
            onOff = false;
            $(".brand_store").animate({
                left: parseInt($(".brand_store").css("left")) - liLength
            }, function () {
                onOff = true;
            })
        }
    })

    /* 图片特效 */
    $("<div class='topline'>").appendTo(".store_list")
    $("<div class='botline'>").appendTo(".store_list")
    $("<div class='leftline'>").appendTo(".store_list")
    $("<div class='rightline'>").appendTo(".store_list")

    for (var i = 0; i < $(".store_list").size(); i++) {
        $(".store_list").eq(i).mouseenter(function () {
            $(this).find(".topline").css("width", "100%")
            $(this).find(".botline").css("width", "100%")
            $(this).find(".leftline").css("height", "100%")
            $(this).find(".rightline").css("height", "100%")
            $(this).find("img").css("opacity", 0)
            $(this).find(".store_drop").css("opacity", 1)
        }).mouseleave(function () {
            $(this).find(".topline").css("width", "0")
            $(this).find(".botline").css("width", "0")
            $(this).find(".leftline").css("height", "0")
            $(this).find(".rightline").css("height", "0")
            $(this).find("img").css("opacity", 1)
            $(this).find(".store_drop").css("opacity", 0)
        })
    }
})

/* 商场同款 */
$(function () {
    //选项卡
    $(".center_static").eq(0).addClass("center_active")

    var liLength = parseInt($(".storesame_li").css("width"))
    var iNum = 0
    $(".storesame_ul").css("width", $(".storesame_li").size() * liLength)

    for (var i = 0; i < $(".center_static").size(); i++) {
        $(".center_static").eq(i).mouseenter(function () {
            $(".center_static").removeClass("center_active")
            $(this).addClass("center_active")

            iNum = $(this).index();

            $(".storesame_ul").animate({
                left: iNum * -liLength,
                easing: "easeOutQuint"
            }, 150)
        })
    }

    //卡1,2
    for (var i = 0; i < $(".show_div").size(); i++) {
        $(".show_div").eq(i).mouseenter(function () {
            $(this).find(".show_txt").addClass("show_txtshow")
            $(this).find(".show_pic").addClass("show_picshow")
        }).mouseleave(function () {
            $(this).find(".show_txt").removeClass("show_txtshow")
            $(this).find(".show_pic").removeClass("show_picshow")
        })
    }
})

/* 购物中心 */
$(function () {
    /* 购物选项块 */
    for (var i = 0; i < $(".menu_li").size(); i++) {
        $(".menu_li").eq(i).mouseenter(function () {
            $(this).find(".menu_list_show").addClass("menu_list_showauto")
            $(this).find(".menu_list_drop").addClass("menu_list_dropauto")
        }).mouseleave(function () {
            $(this).find(".menu_list_show").removeClass("menu_list_showauto")
            $(this).find(".menu_list_drop").removeClass("menu_list_dropauto")
        })
    }
})

/* 底部轮播 */
$(function () {
    // 边框
    $("<div class='topline'>").appendTo(".conbot_pic")
    $("<div class='botline'>").appendTo(".conbot_pic")
    $("<div class='leftline'>").appendTo(".conbot_pic")
    $("<div class='rightline'>").appendTo(".conbot_pic")

    for (var i = 0; i < $(".conbot_pic").size(); i++) {
        $(".conbot_pic").eq(i).mouseenter(function () {
            $(this).find(".topline").css("width", "100%")
            $(this).find(".botline").css("width", "100%")
            $(this).find(".leftline").css("height", "100%")
            $(this).find(".rightline").css("height", "100%")
        }).mouseleave(function () {
            $(this).find(".topline").css("width", "0")
            $(this).find(".botline").css("width", "0")
            $(this).find(".leftline").css("height", "0")
            $(this).find(".rightline").css("height", "0")
        })
    }

    //轮播
    $(".conbot_list").eq(0).css("display", "block");

    for (var i = 0; i < $(".conbot_pic").size(); i++) {
        $(".conbot_pic").eq(i).mouseenter(function () {
            $(".conbot_list").css("display", "none")

            $(".conbot_list").eq($(this).index()).css("display", "block")
        })
    }
})



$(function () {
    for (var i = 0; i < $(".pub_banner").size(); i++) {
        pubBanner($(".pub_banner").eq(i));
    }

    function pubBanner(node) {
        var iNum = 0;
        var iW = parseInt(node.find("li").css("width"));

        node.css("width", node.find(".pub_banli").size() * iW);
        node.parent().next().find(".pub_cirli").eq(0).addClass("pub_active");

        //根据圆点指向图片
        node.parent().next().find(".pub_cirli").stop(true, true).click(function () {
            iNum = $(this).index();
            auto();
        })

        //封装函数
        function auto() {
            node.parent().next().find(".pub_cirli").attr("class", "pub_cirli pub_static").eq(iNum).attr("class", "pub_cirli pub_active");
            if (iNum == node.parent().next().find(".pub_cirli").size()) {
                node.parent().next().find(".pub_cirli").eq(0).attr("class", "pub_cirli pub_active")
            }

            node.animate({
                left: iNum * -iW
            }, 100, function () {
                if (iNum == node.parent().next().find(".pub_cirli").size()) {
                    iNum = 0;
                    node.css("left", "0px")
                }
            })
        }

        //按钮
        node.parent().next().find(".pub_next").click(function () {
            iNum++;

            node.parent().next().find(".pub_cirli").attr("class", "pub_cirli pub_static").eq(iNum).attr("class", "pub_cirli pub_active")
            if (iNum == node.parent().next().find(".pub_cirli").size()) {
                iNum = 0;
                node.parent().next().find(".pub_cirli").eq(iNum).attr("class", "pub_cirli pub_active");
            }

            if (parseInt(node.css("left")) <= (node.find(".pub_banli").length - 1) * -iW) {
                node.css("left", "226px")
            }

            node.animate({
                left: parseInt(node.css("left")) - iW
            }, 99)
        })

        node.parent().next().find(".pub_prev").click(function () {
            iNum--

            node.parent().next().find(".pub_cirli").attr("class", "pub_cirli pub_static").eq(iNum).attr("class", "pub_cirli pub_active")
            if (-iNum == node.parent().next().find(".pub_cirli").size()) {

                iNum = 3;
                node.find(".pub_cirli").eq(iNum).attr("class", "pub_cirli pub_active");
            }

            if (parseInt(node.css("left")) >= 0) {
                node.css("left", "-678px")
            }
            node.animate({
                left: parseInt(node.css("left")) + iW
            }, 99)
        })
    }
})

/* 购物车 */
$(function () {
    //下拉
    $("#logo_cart").mouseenter(function () {
        $(".cart_cover").show(100)
        $(".cart_drop").slideDown(100)
    }).mouseleave(function () {
        $(".cart_cover").hide(100)
        $(".cart_drop").slideUp(100)
    })

    /* 侧边袋 */
    $(".asd_ic_cart").click(function () {
        $(".aside").stop(true, true).animate({
            right: 0
        }, 300)
    });

    var iA = true;

    $(".asd_ic_cart").click(function () {
        if (iA) {
            iA = false
            asideShow()
        } else {
            iA = true
            asideClose()
        }

        function asideShow() {
            $(".asd_ic_cart").click(function () {
                $(".aside").stop(true, true).animate({
                    right: 0
                }, 300, function () {
                    iA = true
                })
            })
        }

        function asideClose() {
            $(".asd_ic_cart").click(function () {
                $(".aside").stop(true, true).animate({
                    right: -300
                }, 300, function () {
                    iA = false
                })
            })
        }
    })

    $("#asd_close").click(function () {
        $(".aside").animate({
            right: -300
        })
    })
})