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
	<form id="addPerson" class="form-horizontal" role="form" action="registerPatient.action" method="post"
		style="vertical-align: middle; text-align: center;" onsubmit="return validate();">
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
			<label for="repassword" class="col-sm-4 control-label">再次输入密码：</label>
			<div class="col-sm-4">
				<input type="password" class="form-control" id="repassword" name="repassword"
					placeholder="请再次输入密码">
			</div>
		</div>
		<div class="form-group">
			<label for="password" class="col-sm-4 control-label">性别：</label>
			<div class="col-sm-4">
				<select id="sex" class="col-sm-4" style="font-size: 20px;" name="sex">
					<option value="男" selected="selected">男</option>
					<option value="女">女</option>
				</select>
			</div>
		</div>
		<div class="form-group">
			<label for="telephone" class="col-sm-4 control-label">电话号码：</label>
			<div class="col-sm-4">
				<input type="text" class="form-control" id="telephone" name="telephone"
					placeholder="请输入电话号码">
			</div>
		</div>
		<div class="form-group">
			<label for="address" class="col-sm-4 control-label">住址：</label>
			<div class="col-sm-4">
				<input type="text" class="form-control" id="address" name="address"
					placeholder="请输入住址">
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-offset-4 col-sm-4">
				<button id="submit" type="submit" class="btn btn-default">提交</button>
			</div>
		</div>
	</form>
</body>
<script type="text/javascript">
	function validate(){
		var name = $("#name").val();
		var password = $("#password").val();
	    var repassword = $("#repassword").val();
	    if (name=="" || name==null) {
	    	showError("请输入用户名！");
	    	return false;
	    }
	    if (password=="" || password==null) {
	    	showError("请输入密码！");
	    	return false;
	    }
	    if (repassword=="" || repassword==null) {
	    	showError("请再次输入密码！");
	    	return false;
	    }
	    if (repassword != password) {
	    	showError("两次输入密码不一致，请重新输入！");
	    	return false;
	    }
	    return true;
	}
	
	function showError(error) {
		alert(error);
	}
</script>
</html>
