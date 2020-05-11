/* 轮播图 */
define(["banner"], function (banner) {
    function banner() {
        /* var iLength = $(".banner_img").size() //记录总宽度
        var timer = null //定时器
        var iNum = 0 //记录图片下标
        var iWidth = parseInt($(".banner_img").css("width"))

        //获取容器的总宽
        $(".banner").css({
            width: parseInt(iLength * iWidth)
        })

        //动态获取圆点数
        for (var i = 0; i < iLength - 1; i++) {
            $("<li class='cir_num static'></li>").appendTo(".banner_cir");
        }

        //设置第一个圆点class
        $(".banner_cir").children().eq(0).attr("class", "cir_num active");

        //指向圆点移入图片
        $(".cir_num").stop(true, true).mouseenter(function () {
            iNum = $(this).index()
            movePoint()
        })

        //轮播移入移出
        $(".bannerbox").mouseenter(function () {
            clearInterval(timer)
        }).mouseleave(function () {
            timer = setInterval(function () {
                iNum++
                move()
            }, 4000)
        })

        //按钮
        $(".point_next").click(function () {
            iNum++
            $(".cir_num").attr("class", "cir_num static").eq(iNum).attr("class", "cir_num active");
            if (iNum == $(".cir_num").size()) {
                iNum = 0
                $(".cir_num").eq(0).attr("class", "cir_num active")
            }

            if (parseInt($(".banner").css("left")) <= ($(".banner_img").length - 1) * -iWidth) {
                $(".banner").css("left", "0")
            }

            $(".banner").animate({
                left: parseInt($(".banner").css("left")) - iWidth
            }, 150)
        })

        $(".point_prev").click(function () {
            iNum--;
            $(".cir_num").attr("class", "cir_num static").eq(iNum).attr("class", "cir_num active")
            if (-iNum == $(".cir_num").size()) {
                iNum = 8
                $(".cir_num").eq(iNum).attr("class", "cir_num active")
            }

            if (parseInt($(".banner").css("left")) >= 0) {
                $(".banner").css("left", "-10720px")
            }

            $(".banner").animate({
                left: parseInt($(".banner").css("left")) + iWidth
            }, 150)
        })

        //封装运动函数
        function move() {
            $(".cir_num").attr("class", "cir_num static").eq(iNum).attr("class", "cir_num active")
            if (iNum == $(".cir_num").size()) {
                $(".cir_num").eq(0).attr("class", "cir_num active")
            }

            $(".banner").animate({
                left: parseInt(iNum * -iWidth),
                easing: "easeOutQuint"
            }, function () {
                if (iNum == $(".cir_num").size()) {
                    iNum = 0
                    $(".banner").css("left", "0px")
                }
            })
        }

        function movePoint() {
            $(".cir_num").attr("class", "cir_num static").eq(iNum).attr("class", "cir_num active")
            if (iNum == $(".cir_num").size()) {
                $(".cir_num").eq(0).attr("class", "cir_num active")
            }

            $(".banner").animate({
                left: parseInt(iNum * -iWidth),
                easing: "easeOutQuint"
            }, 99, function () {
                if (iNum == $(".cir_num").size()) {
                    iNum = 0;
                    $(".banner").css("left", "0px")
                }
            })
        } */
    }
    return {
        banner: banner
    }
})