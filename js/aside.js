/* 侧边栏 */
define(["aside"], function(aside){
    function aside(){
        //划出栏小按钮
        for(var i = 0;i < $(".ads_show").size();i++){
            $(".ads_show").eq(i).mouseenter(function(){
                $(this).find("div").eq(1).show()
            }).mouseleave(function(){
                $(this).find("div").eq(1).hide()
            })
        }

        /* 底边栏 */
        $(".rem").click(function(){
            $(".remind").css("display", "none")
        })
    }
    return{
        aside : aside
    }
})