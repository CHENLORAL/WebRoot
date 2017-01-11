<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>诊所管理系统</title>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
<link rel="stylesheet" href="css/style.css" type="text/css">
<link href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<meta http-equiv="pragma" content="no-cache">
</head>
<script type="text/javascript" src="js/jquery.mini.js"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<body>
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<form class="form-horizontal" role="form" action="login.action" method="post"
		style="vertical-align: middle; text-align: center;">
		<div class="form-group">
			<label for="name" class="col-sm-4 control-label">用户名：</label>
			<div class="col-sm-4">
				<input type="text" class="form-control" id="name" name="name"
					placeholder="请输入用户名">
			</div>
		</div>
		<div class="form-group">
			<label for="password" class="col-sm-4 control-label">密码：</label>
			<div class="col-sm-4">
				<input type="password" class="form-control" id="password" name="password"
					placeholder="请输入密码">
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-offset-4 col-sm-1">
				<button type="submit" class="btn btn-default">登录</button>
			</div>
			<div class="col-sm-1">
				<button type="reset" class="btn btn-default">重置</button>
			</div>
			<div class="col-sm-1">
				<button id="register" type="button" class="btn btn-default">注册</button>
			</div>
		</div>
	</form>
</body>
<script type="text/javascript">
	$("#register").click(function(){
	    window.location.href="register.jsp";
	});
</script>
</html>
