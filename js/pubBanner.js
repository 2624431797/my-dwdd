/* 公共banner */
define(["pubBanner"], function (pubBanner) {
    function pubBanner() {
        var iNum = 0;
        var iW = parseInt($(".pub_banli").css("width"));
        var oBan = $(".pub_bannerbox");

        for (var i = 0; i < oBan.size(); i++) {
            oBan.eq(i).find(".pub_banner").css("width", oBan.eq(i).find(".pub_banli").size() * iW)

            oBan.eq(i).next().find(".pub_cirli").eq(0).addClass("pub_active")

            //根据圆点指向图片
            oBan.eq(i).next().find(".pub_cirli").stop(true, true).click(function () {
                iNum = $(this).index();
                pubAuto()
            })

            function pubAuto() {
                oBan.eq(i).next().find(".pub_cirli").attr("class", "pub_cirli pub_static").eq(iNum).attr("class", "pub_cirli pub_active")
                if (iNum == oBan.eq(i).next().find(".pub_cirli").size()) {
                    oBan.next().find(".pub_cirli").eq(0).attr("class", "pub_cirli pub_active")
                }
                oBan.eq(i).find(".pub_banner").animate({
                    left: iNum * -iW
                }, 100, function () {
                    if (iNum == oBan.eq(i).next().find(".pub_cirli").size()) {
                        iNum = 0;
                        oBan.eq(i).find(".pub_banner").css("left", "0px")
                    }
                })
            }

            //按钮
            oBan.eq(i).next().find(".pub_next").click(function () {
                iNum++

                if (parseInt(oBan.eq(i).find(".pub_banner").css("left")) <= (oBan.eq(i).find(".pub_banli").length - 1) * -iW) {
                    $(".pub_banner").css("left", "226px")
                }
                oBan.eq(i).find(".pub_banner").animate({
                    left: parseInt($(".pub_banner").css("left")) - iW
                }, 150)
            })
        }
    }
    return {
        pubBanner: pubBanner
    }
})