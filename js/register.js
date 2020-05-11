/* 路径 */
require.config({
    paths: {
        "aside": "aside",
        "shopCart": "shopCart"
    }
})

require(["aside", "shopCart"], function (aside, shopCart) {
    aside.aside()
    shopCart.shopCart()
})

/* 登录内容 */
$(function () {
    //选项卡
    $(".reg_titli").find("span").eq(0).addClass("reg_titli_act")
    var iWidth = parseInt($(".reg_list").css("width"))
    var iNum = 0;
    $(".reg_box").css("width", $(".reg_list").size() * iWidth)
    for (var i = 0; i < $(".reg_titli").size(); i++) {
        $(".reg_titli").eq(i).click(function () {
            $(".reg_titli").find("span").removeClass("reg_titli_act")
            $(this).find("span").addClass("reg_titli_act")

            iNum = $(this).index();

            $(".reg_box").animate({
                left: iNum * -200,
                easing: "easeOutQuint"
            }, 150)
        })
    }
    //卡1
    $(".reg_con_li").mouseenter(function () {
        $(".reg_con_li").find("img").eq(1).css({
            width: 165,
            transform: "scaleX(1)"
        })
    }).mouseleave(function () {
        $(".reg_con_li").find("img").eq(1).css({
            width: 0,
            transform: "scaleX(0)"
        })
    })
    //弹出框
    $(".textcode_alert").find("button").click(function () {
        $(".textcode_alert").hide()
    })
})

$(function () {
    $("#submit").click(function () {
        $.post("../php/register.php", {
            username: $("#username").val(),
            password: $("#password").val()
        }, function (result) {
            var obj = JSON.parse(result)
            $(".textcode_alert").show()
            $(".text_alert").html(obj.message)
        })
    })
})