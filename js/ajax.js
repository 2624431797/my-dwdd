// 数据获取
define(["jquery"], function ($) {
    function ajax() {
        //banner图
        $(function () {
            $.ajax({
                type: "get",
                url: "json/banner.json",
                success: arr => {
                    for (var i = 0; i < arr.length; i++) {
                        var node = $(`
                            <img src="${arr[i].img}" alt="">
                        `)
                        for (var j = 0; j < $(".banner_img").size(); j++) {
                            node.appendTo($(".banner_img").eq(i).find("a"))
                        }
                    }
                },
                error: msg => {
                    console.log(msg)
                }
            })
        })
    }
    return {
        ajax: ajax
    }
})