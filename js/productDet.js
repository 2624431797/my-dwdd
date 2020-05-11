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

/* 放大镜下的选择图片 */
$(function () {
    //选择图片
    $(".pricebox_code").mouseenter(function () {
        $(".pricebox_code_drop").show()
        $(".code_icon").addClass("code_icon_show")
    }).mouseleave(function () {
        $(".pricebox_code_drop").hide()
        $(".code_icon").removeClass("code_icon_show")
    })

    $(".fenqi_drop").mouseenter(function () {
        $(this).find("i").css("opacity", 1)
        $("#fenqi_drop").show()
    }).mouseleave(function () {
        $(this).find("i").css("opacity", 0)
        $("#fenqi_drop").hide()
    })

    //轮播图片
    var iNum = 0
    var timer = null
    var iA = true

    $(".box_next").bind("mousedown mouseup", function (ev) {
        if (iA) {
            if (ev.type == "mousedown") {
                clearInterval(timer)
                timer = setInterval(function () {
                    iNum--
                    if (iNum <= -600) {
                        iNum = -600
                        return false
                    } else {
                        $(".box_con_show").stop(true, true).animate({
                            left: parseInt(iNum)
                        })
                    }
                }, function () {
                    if ($(".box_con_show").css("left") <= -600) {
                        return false
                    }
                })
            } else if (ev.type == "mouseup") {
                clearInterval(timer)
            }
        }
    })

    $(".box_prev").bind("mousedown mouseup", function (ev) {
        if (iA) {
            if (ev.type == "mousedown") {
                clearInterval(timer)
                timer = setInterval(function () {
                    iNum++
                    if (iNum >= 0) {
                        iNum = 0
                        return false
                    } else {
                        $(".box_con_show").stop(true, true).animate({
                            left: parseInt(iNum)
                        })
                    }
                }, function () {
                    if (parseInt($(".box_con_show").css("left")) >= 0) {
                        return false
                    }
                })
            } else if (ev.type == "mouseup") {
                clearInterval(timer)
            }
        }
    })
})

/* 放大镜 */
$(function () {
    $(".mainle_top, main_glass").mouseenter(function () {
        $(".main_cover").css("opacity", 1)
        $(".main_small").css("opacity", 1)
        $(".main_glass").css({
            opacity: 1,
            left: 500,
            "transition": "all 1s",
            "transform": "scale(1)"
        })
    }).mouseleave(function () {
        $(".main_cover").css("opacity", 0)
        $(".main_small").css("opacity", 0)
        $(".main_glass").css({
            opacity: 0,
            left: 0,
            "transform": "scale(0)"
        })
    }).mousemove(function (ev) {
        var l = ev.pageX - $(this).offset().left - 120
        var t = ev.pageY - $(this).offset().top - 120

        if (l <= 0) {
            l = 0
        }
        if (l >= 240) {
            l = 240
        }
        if (t <= 0) {
            t = 0
        }
        if (t >= 240) {
            t = 240
        }

        $(".main_small").css({
            left: l,
            top: t
        })

        $(".main_small img").css({
            left: -l - 4,
            top: -t - 4
        })

        $(".main_glass img").css({
            left: -2 * l,
            top: -2 * t
        })
    })

    $(".box_con_showli").eq(0).find(".showli_drop").show()
    $(".maintop_img").eq(0).show()
    $(".mainsmall_img").eq(0).show()
    $(".maingla_img").eq(0).show()

    for (var i = 0; i < $(".box_con_showli").size(); i++) {
        $(".box_con_showli").eq(i).click(function () {
            $(".showli_drop").hide()
            $(this).find(".showli_drop").fadeIn()

            $(".maintop_img").hide()
            $(".maintop_img").eq($(this).index()).fadeIn()

            $(".mainsmall_img").hide()
            $(".mainsmall_img").eq($(this).index()).fadeIn()

            $(".maingla_img").hide()
            $(".maingla_img").eq($(this).index()).fadeIn()
        })
    }
})

/* 轮播图 */
$(function () {
    var iNum = 0
    var timer = null
    var iL = $(".ban_li").size()
    var iW = parseInt($(".ban_li").css("width"))

    $(".ban_con").css({
        width: parseInt(iL * iW)
    })

    for (var i = 0; i < $(".ban_li").size(); i++) {
        $("<li class='static'></li>").appendTo(".ban_cir");
    }

    $(".ban_li").eq(iNum).show()
    $(".static").eq(iNum).addClass("active")

    // 自动轮播
    $(".banner").mouseenter(function () {
        clearInterval(timer)
    }).mouseleave(function () {
        timer = setInterval(function () {
            iNum++
            banAuto()
        }, 4000)
    })

    function banAuto() {
        if (iNum === iL) {
            $(".ban_li").eq(0).fadeIn().siblings(".ban_li").fadeOut()
            $(".static").eq(0).addClass("active").siblings(".static").removeClass("active")
            iNum = 0
        } else if (iNum === -1) {
            $(".ban_li").eq(iL - 1).fadeIn().siblings(".ban_li").fadeOut()
            $(".static").eq(iL - 1).addClass("active").siblings(".static").removeClass("active")
            iNum = iL - 1
        } else {
            $(".ban_li").eq(iNum).fadeIn().siblings(".ban_li").fadeOut()
            $(".static").eq(iNum).addClass("active").siblings(".static").removeClass("active")
        }
    }

    $(".static").click(function () {
        iNum = $(this).index()
        banAuto()
    })

    $(".banner").mouseenter(function () {
        $(".btn_prev").animate({
            left: 10,
            opacity: 1
        }, 250)
        $(".btn_next").animate({
            right: 10,
            opacity: 1
        }, 250)
    }).mouseleave(function () {
        $(".btn_prev").animate({
            left: -38,
            opacity: 0
        }, 250)
        $(".btn_next").animate({
            right: -38,
            opacity: 0
        }, 250)
    })

    $(".btn_prev").click(function () {
        iNum--
        banAuto()
    })
    $(".btn_next").click(function () {
        iNum++
        banAuto()
    })
})

$(function () {
    /* 正品 */
    $(".CNbot").mouseenter(function () {
        $(this).find("a").animate({
            width: 1100,
            height: 350,
            marginLeft: -50,
            marginTop: -15
        }, 250)
    }).mouseleave(function () {
        $(this).find("a").animate({
            width: 1000,
            height: 320,
            marginLeft: 0,
            marginTop: 0
        }, 250)
    })

    /* 移民 */
    for (var i = 0; i < $(".overcon_list").size(); i++) {
        $(".overcon_list").eq(i).mouseenter(function () {
            $(this).find(".over_drop").animate({
                bottom: 0
            }, 300)
            $(this).find(".over_cover").fadeOut()
        }).mouseleave(function () {
            $(this).find(".over_drop").animate({
                bottom: -150
            }, 300)
            $(this).find(".over_cover").fadeIn()
        })
    }
})