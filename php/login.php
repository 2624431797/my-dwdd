<?php 
    header('content-type:text/html;charset="utf-8"');
    
    $responseData = array("code" => 0, "message" => "");

    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST["repassword"];
    $textcode = $_POST["textcode"];
    $retextcode = $_POST["retextcode"];
    $addTime = $_POST['addTime'];

    if(!$username){
        $responseData['code'] = 1;
        $responseData['message'] = "❗️ 用户名不能为空";
        echo json_encode($responseData);
        exit;
    }

    if(!$password){
        $responseData['code'] = 2;
        $responseData['message'] = "❗️ 密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$retextcode){
        $responseData['code'] = 8;
        $responseData['message'] = "❗️ 图形验证码不能为空";
        echo json_encode($responseData);
        exit;
    }

    if($textcode != $retextcode){
        $responseData['code'] = 3;
        $responseData['message'] = "❗️ 图形验证码不正确";
        echo json_encode($responseData);
        exit;
    }

    if($password != $repassword){
		$responseData['code'] = 4;
		$responseData['message'] = "❗️ 两次密码输入不一致";
		echo json_encode($responseData);
		exit;
	}

    $link = mysql_connect("localhost", "root", "949995");
    if(!$link){
        $responseData['code'] = 5;
        $responseData['message'] = "❗️ 服务器忙";
        echo json_encode($responseData);
        exit;
    }

    mysql_set_charset("utf8");

    mysql_select_db("qd1906");

    $sql = "SELECT * FROM diwudadao WHERE username='{$username}'";

    $res = mysql_query($sql);

    $row = mysql_fetch_assoc($res);

    if($row){
        $responseData['code'] = 6;
        $responseData['message'] = "❗️ 用户名已存在";
        echo json_encode($responseData);
        exit;
    }

    $str = md5(md5(md5($password)."qianfeng")."qingdao");

    $sql2 = "INSERT INTO diwudadao(username,password,addTime) VALUES('{$username}','{$str}',{$addTime})";

    $res2 = mysql_query($sql2);
    if(!$res2){
        $responseData['code'] = 7;
        $responseData['message'] = "❗️ 注册失败";
        echo json_encode($responseData);
        exit;
    }

    $responseData['message'] = "✅ 注册成功";

    echo json_encode($responseData);

    mysql_close($link);
?>