/* 顶部导航 */
define(["header"], function (header) {
    function header() {
        /* 我的，下拉菜单 */
        $("#minebox").mouseenter(function () {
            $("#mine").css({
                background: "#fff",
                borderColor: "#ccc"
            });
            $(".mine_drop").show();
        }).mouseleave(function () {
            $("#mine").css({
                background: "#f2f2f2",
                borderColor: "#f2f2f2"
            });
            $(".mine_drop").hide()
        })

        /* APP下载 */
        $(".phone_downbox").mouseenter(function () {
            $(".phone_down").css({
                background: "#fff",
                borderColor: "#ccc"
            })
            $(".phone_drop").show()
        }).mouseleave(function () {
            $(".phone_down").css({
                background: "#f2f2f2",
                borderColor: "#f2f2f2"
            })
            $(".phone_drop").hide()
        })

        /* logo导航搜索栏 */
        /* 导航栏 */
        /* 下拉菜单 */
        $(".nav_menu").mouseenter(function () {
            $(".menu_list").show();
        }).mouseleave(function () {
            $(".menu_list").hide();
        })

        for (var i = 0; i < $(".menu_listli").size(); i++) {
            $(".menu_listli").eq(i).mouseenter(function () {
                $(this).addClass("menu_listliover");
                $(this).find("a").addClass("listli_aover");
                $(this).find("i").css("opacity", 1);
                $(this).find("b").addClass("listli_bover");
                $(this).find(".menu_show").show();
            }).mouseleave(function () {
                $(this).removeClass("menu_listliover");
                $(this).find("a").removeClass("listli_aover");
                $(this).find("i").css("opacity", 0);
                $(this).find("b").removeClass("listli_bover");
                $(this).find(".menu_show").hide();
            })
        }
    }
    return {
        header: header
    }
})