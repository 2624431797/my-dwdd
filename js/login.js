/* 路径 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "jquery-ui": "jquery-ui.min",
        "jquery-cookie": "jquery.cookie",
        "aside": "aside",
        "shopCart": "shopCart"
    },
    shim: {
        "jquery-cookie": ["jquery"]
    }
})

require(["aside", "shopCart"], function (aside, shopCart) {
    aside.aside();
    shopCart.shopCart();
})

/* 正则 */
$(function () {
    /* 用户框 */
    $("#username").focus(function () {
        $(this).css("borderColor", "#000")
    })
    $("#username").blur(function () {
        var box = /^[1]\d{10}$/

        if ($("#username").val() == "") {
            $("#username_alert").hide()
        } else {
            if (!box.test($("#username").val())) {
                $("#username_alert").show()
            } else {
                $("#username_alert").hide()
            }
        }

        $(this).css("borderColor", "#ccc")
    })

    /* 验证码框 */
    var oTextdiv = document.getElementById("textcode_div")
    var oText = document.getElementById("textcode")
    oTextdiv.onclick = function () {
        oTextdiv.innerHTML = textCode(6);
    }

    $("#textcode").focus(function () {
        $(this).css("borderColor", "#000")
    })
    $("#textcode").blur(function () {
        var box = new RegExp("^" + oTextdiv.innerHTML + "$", "i")

        if (oText.value == "") {
            $(".textcode_alert").hide()
        } else {
            if (box.test(oText.value)) {
                $(".textcode_alert").hide()
            } else {
                $(".textcode_alert").show()
            }
        }

        $(this).css("borderColor", "#ccc");
    })

    //弹出框
    $(".textcode_alert").find("a, button").click(function () {
        $(".textcode_alert").hide()
    })

    function textCode(n) {
        var arr = [];
        for (var i = 0; i < n; i++) {
            var res = parseInt(Math.random() * 123);
            if (res >= 0 && res <= 9) {
                arr.push(res)
            } else if (res >= 97 && res <= 122 || res >= 65 && res <= 90) {
                arr.push(String.fromCharCode(res));
            } else {
                //没有用的数，也会占用我的循环次数
                i--
            }
        }
        return arr.join("");
    }

    /* 密码框 */
    var oPassword = document.getElementById("password")
    var oPassword_val = document.getElementById("password_val")

    $("#password").focus(function () {
        $(this).css("borderColor", "#000")
        $("#password_alert").show()
    })
    $("#password").blur(function () {
        if (oPassword.value == "") {
            $(this).css("borderColor", "#ccc")
            $("#password_alert").hide()
        } else {
            if (oPassword.value.length < 6 || oPassword.value.length > 20) {
                $("#password_alert").show();
                $("#password_val").css("color", "#f62b0f")
                oPassword_val.innerHTML = "❗️ 建议6-20个字符"
            } else if (/[^0-9a-zA-Z]/.test(oPassword.value)) {
                $("#password_alert").show();
                $("#password_val").css("color", "#f62b0f");
                oPassword_val.innerHTML = "❗️ 建议使用字母、数字的组合"
            } else {
                $("#password_alert").hide()
                $(this).css("borderColor", "#ccc")
            }
        }
    })

    /* 确认密码 */
    var oRepassword = document.getElementById("repassword")

    $("#repassword").focus(function () {
        $(this).css("borderColor", "#000")
    })
    $("#repassword").blur(function () {
        if (oRepassword.value == "") {
            $(this).css("borderColor", "#ccc")
            $("#repassword_alert").hide()
        } else {
            if (oPassword.value == oRepassword.value) {
                $(this).css("borderColor", "#ccc")
                $("#repassword_alert").hide()
            } else {
                $("#repassword_alert").show()
            }
        }
    })
})

/* 前后端交互 */
$(function () {
    $("#submit").click(function () {
        var Time = (new Date()).getTime()
        $.post("../php/login.php", {
                username: $("#username").val(),
                password: $("#password").val(),
                repassword: $("#repassword").val().toLowerCase(),
                textcode: $("#textcode_div").text().toLowerCase(),
                retextcode: $("#textcode").val(),
                addTime: Time
            },
            function (result) {
                var obj = JSON.parse(result)
                if (obj.code) {
                    if (obj.code == 1) {
                        $("#username_alert").show()
                        $("#username_alert").find("p").html(obj.message)
                    } else if (obj.code == 2) {
                        $("#password_alert").show()
                        $("#password_alert").find("p").html(obj.message)
                        $("#password_alert").find("p").css("color", "red")
                    } else if (obj.code == 3) {
                        $(".textcode_alert").show()
                        $(".text_alert").html(obj.message)
                    } else if (obj.code == 8) {
                        $(".textcode_alert").show()
                        $(".text_alert").html(obj.message)
                    } else if (obj.code == 5) {
                        $("#repassword_alert").show()
                        $("#repassword_alert").find("p").html(obj.message)
                    } else if (obj.code == 6) {
                        $("#username_alert").show()
                        $("#username_alert").find("p").html(obj.message)
                    } else if (obj.code == 7) {
                        $(".textcode_alert").show()
                        $(".text_alert").html(obj.message)
                    } else {
                        $(".textcode_alert").show()
                        $(".text_alert").html(obj.message)
                    }
                } else {
                    $(".textcode_alert").show()
                    $(".text_alert").html(obj.message)
                }
            })
    })
})