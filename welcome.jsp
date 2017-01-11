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
</head>
<link href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<script src="js/jquery.mini.js" type="text/javascript"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<body>
	<center>
		<h3>小组成员：康凯、张瑞云、钟奇林、陈天然、王靓</h3>
	</center>
	<br />
	<br />
	<br />
	<br />
	<br />
	<div style="vertical-align: middle; text-align: center;">
		<button id="patentLogin" type="button" class="btn btn-default btn-lg" style="font-size: 60px">
		  <span class="glyphicon glyphicon-user"></span> 病员登录
		</button>
		&nbsp;&nbsp;&nbsp;
		<button id="adminLogin" type="button" class="btn btn-default btn-lg" style="font-size: 60px">
		  <span class="glyphicon glyphicon-user"></span> 管理员登录
		</button>
	</div>
	<script type="text/javascript">
		$("#patentLogin").click(function(){
		    window.location.href="index.jsp";
		});
		$("#adminLogin").click(function(){
		    window.location.href="admin/index.jsp";
		});
	</script>
</body>
</html>
