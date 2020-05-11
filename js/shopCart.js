/* 购物车 */
define(["shopCart"], function (shopCart) {
    function shopCart() {
        //获取数据
        $(function () {
            sc_msg()
            sc_num()
            sc_pri()

            $.ajax({
                type: "get",
                url: "../json/shopList.json",
                success: arr => {
                    for (var i = 0; i < arr.length; i++) {
                        $(".shop_txt").eq(i).find("a").eq(0).html(`${arr[i].tit}`)
                        $(".shop_txt").eq(i).find("a").eq(1).html(`${arr[i].doc}`)
                        $(".shop_txt").eq(i).find("p").html(`${arr[i].pri}`)
                        var node = $(`
                            <a href="">
                                <img src="${arr[i].img}" alt="">
                            </a>
                        `)
                        node.appendTo($(".shop_img").eq(i))
                        var abtn = $(`
                            <button id="${arr[i].id}" class="shop_btncl">加入购物袋</button>
                        `)
                        abtn.appendTo($(".shop_btn").eq(i))
                    }
                },
                error: msg => {
                    console.log(msg)
                }
            })
            //事件委托
            $(".shop_btn").on("click", ".shop_btncl", function () {
                var {id} = this
                var first = $.cookie("goods") == null ? true : false
                //第一次添加
                if (first) {
                    var arr = [{
                        id: id,
                        num: 1
                    }]
                    $.cookie("goods", JSON.stringify(arr), {
                        expires: 7
                    })
                }
                //如果不是第一次添加，判断之前是否添加过
                else {
                    var cookieStr = $.cookie("goods");
                    var cookieArr = JSON.parse(cookieStr);
                    //假设没有添加过该商品
                    var same = false
                    //通过循环，去判断是否有符合条件的元素
                    for (var i = 0; i < cookieArr.length; i++) {
                        if (id == cookieArr[i].id) {
                            same = true
                            cookieArr[i].num++
                            break
                        }
                    }
                    if (!same) {
                        cookieArr.push({
                            id: id,
                            num: 1
                        })
                    }
                    //将数据存回cookie
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                }
                sc_msg()
                sc_num()
                sc_pri()
            })

            /* 购物车 */
            //下拉
            $("#logo_cart").mouseenter( () => {
                $(".cart_cover").show(100)
                $(".cart_drop").slideDown(100)
            }).mouseleave( () => {
                $(".cart_cover").hide(100)
                $(".cart_drop").slideUp(100)
            })

            /* 侧边袋 */
            $(".asd_ic_cart").click( () => {
                $(".aside").stop(true, true).animate({
                    right: 0
                }, 300)
            })
            var iA = true
            $(".asd_ic_cart").click( () => {
                if (iA) {
                    iA = false
                    asideShow()
                } else {
                    iA = true
                    asideClose()
                }

                function asideShow() {
                    $(".asd_ic_cart").click( () => {
                        $(".aside").stop(true, true).animate({
                            right: 0
                        }, 300, () => {
                            iA = true
                        })
                    })
                }
                function asideClose() {
                    $(".asd_ic_cart").click( () => {
                        $(".aside").stop(true, true).animate({
                            right: -300
                        }, 300, function () {
                            iA = false;
                        })
                    })
                }
            })
            $("#asd_close").click( () => {
                $(".aside").animate({
                    right: -300
                })
            })
            //加载右侧购物车的数据
            function sc_msg() {
                //清空当前节点下所有的子节点
                $(".asd_bag_con").empty();
                $(".cart_con").empty();
                $.ajax({
                    type: "get",
                    url: "../json/shopList.json",
                    success: arr => {
                        var cookieStr = $.cookie("goods")
                        var newArr = []
                        if (cookieStr) {
                            var cookieArr = JSON.parse(cookieStr)
                            for (var i = 0; i < arr.length; i++) {
                                for (var j = 0; j < cookieArr.length; j++) {
                                    //在cookie中这个商品有记录
                                    if (arr[i].id == cookieArr[j].id) {
                                        arr[i].num = cookieArr[j].num;
                                        newArr.push(arr[i]);
                                    }
                                }
                            }
                            for (var i = 0; i < newArr.length; i++) {
                                var node = $(`
                                    <li id ="${newArr[i].id}" class="asd_bag_pro">
                                        <div class="pro_goods">
                                            <div class="pro_goods_top">
                                                <div class="pro_go_pic">
                                                    <a href="">
                                                        <img src="${newArr[i].img}" alt="">
                                                    </a>
                                                </div>
                                                <div class="pro_go_tit">${newArr[i].tit}</div>
                                                <p class="pro_go_num">数量:${newArr[i].num}</p>
                                            </div>
                                            <div class="pro_goods_mid">
                                                <p class="pro_go_pri">${newArr[i].pri}</p>
                                                <i class="pro_addnum">+</i>
                                                <i class="pro_rdunum">-</i>
                                            </div>
                                            <div class="pro_goods_bot">
                                                <button class="pro_buy">购买</button>
                                                <button class="pro_del">删除</button>
                                            </div>
                                        </div>
                                    </li>
                                `)
                                node.appendTo(".asd_bag_con");
                                var aLi = $(`
                                    <li id ="${newArr[i].id}" class="cart_conli">
                                        <div class="cart_con_img">
                                            <img src="${newArr[i].img}" alt="">
                                        </div>
                                        <div class="cart_txt">
                                            <em class="cart_txt_tit">${newArr[i].tit}</em>
                                            <em class="cart_txt_doc">${newArr[i].doc}</em>
                                            <p>
                                                <em class="cart_txt_pri">${newArr[i].pri}</em>
                                                ×
                                                <em class="cart_txt_num">${newArr[i].num}</em>
                                                件
                                            </p>
                                        </div>
                                    </li>
                                `)
                                aLi.appendTo(".cart_con")
                            }
                        }
                        $(".asd_bag_con li:last-child").css("marginBottom", "100px");
                    },
                    error: msg => {
                        console.log(msg)
                    }
                })
            }

            //商品数量总数如何计算
            function sc_num() {
                var cookieStr = $.cookie("goods")
                if (cookieStr) {
                    //计算求和
                    var cookieArr = JSON.parse(cookieStr)
                    var sum = 0
                    for (var i = 0; i < cookieArr.length; i++) {
                        sum += cookieArr[i].num
                    }
                    //记录到页面中
                    $("#cart_number").html(sum)
                    $(".mon_num").html(sum)
                    $(".asd_bag_img").hide()
                    $(".cart_droptxt").hide()
                } else {
                    $("#cart_number").html(0)
                    $(".mon_num").html(0)
                    $(".asd_bag_img").show()
                    $(".cart_droptxt").show()
                }
            }
            //给右侧购物车商品的删除按钮添加点击事件，事件委托添加
            $(".asd_bag_con").on("click", ".pro_del", function () {
                var id = $(this).closest("li").remove().attr("id")
                var cookieStr = $.cookie("goods")
                var cookieArr = JSON.parse(cookieStr)
                for (var i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id == id) {
                        cookieArr.splice(i, 1)
                        break
                    }
                }
                //判断数组是否为空
                if (!cookieArr.length) {
                    $.cookie("goods", null)
                } else {
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                }
                sc_num()
                $(".asd_bag_con li:last-child").css("marginBottom", "100px")
            })
            //通过事件委托去给加和减添加点击事件
            $(".asd_bag_con").on("click", "i", function () {
                //获取商品id
                var id = $(this).closest("li").attr("id")
                var cookieStr = $.cookie("goods")
                var cookieArr = JSON.parse(cookieStr)
                for (var i = 0; i < cookieArr.length; i++) {
                    if (id == cookieArr[i].id) {
                        //判断操作是+还是-
                        if (this.innerHTML == "+") {
                            cookieArr[i].num++
                        } else {
                            //判断
                            if (cookieArr[i].num == 1) return false;
                            cookieArr[i].num--
                        }
                        //设置页面上新的商品数量
                        $(this).parent().prev().find(".pro_go_num").html("数量:" + cookieArr[i].num);
                        $.cookie("goods", JSON.stringify(cookieArr), {
                            expires: 7
                        })
                        break
                    }
                }
                sc_num()
            })
            //商品数量价格如何计算
            function sc_pri() {
                /* $.ajax({
                     type : "get",
                     url : "../json/shopList.json",
                     success : function(arr){
                         for(var i = 0;i < arr.length;i++){
                             var pri = 0;
                             pri += arr[i].pri
                         }
                         $(".mon_pri").html(pri);
                     },
                     error : function(msg){
                         console.log(msg)
                     }
                 }) */
            }
        })
    }
    return {
        shopCart: shopCart
    }
})