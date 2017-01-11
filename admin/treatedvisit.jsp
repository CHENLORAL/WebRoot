<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@page import="com.opensymphony.xwork2.ActionContext"%>
<%@page import="com.clinic.domain.Person"%>
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
<title>就诊页面</title>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
<link rel="stylesheet" href="css/style.css" type="text/css">
<link
	href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css"
	rel="stylesheet">
<meta http-equiv="pragma" content="no-cache">
</head>
<script type="text/javascript" src="js/jquery.mini.js"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<%
	ActionContext ctx = ActionContext.getContext();
	Map sessions = (Map) ctx.getSession();
	Person patient = (Person) sessions.get("user_session");
 %>
<body>
	<br />
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">就诊详情</h3>
		</div>
		<div id="patientCondition" class="panel-body">
			<ul class="list-group">
				<li class="list-group-item">
				<input type="hidden" name="personId" id="personId"
					value="<s:property value="treatment.personId"/>" />
				<input type="hidden" name="treatmentId" id="treatmentId"
					value="<s:property value="treatment.id"/>" /> 
					已为id为<s:property value="treatment.personId"/>的病人在<s:property value="treatment.date"/>日就诊，病况描述为<s:property value="treatment.healthDescription"/></li>
			</ul>
		</div>
	</div>
	
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">诊后随访历史</h3>
		</div>
		<div class="panel-body">
			<ul class="list-group">
			    <s:iterator value="treatedVisits" var="treatedVisit">
			    <li class="list-group-item">
			    	您于<s:property value="#treatedVisit.date"/>日为id为<s:property value="#treatedVisit.personId"/>的病人做了诊后随访，随访状况为：<s:property value="#treatedVisit.treatedDescription"/>
			    </li>
			    </s:iterator>
			</ul>
			
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">添加诊后随访详情</h3>
		</div>
		<div class="panel-body">
			<input id="treatedDescription" type="text" class="form-control" placeholder="请输入诊后随访详情">
		</div>
	</div>
	<center>
		<button id="addTreatedVisit" type="button" class="btn btn-default">完成诊后随访添加</button>
	</center>
	<script type="text/javascript">
		$("#addTreatedVisit").click(function() {
			var personId = $("#personId").val();
			var treatmentId = $("#treatmentId").val();
			var treatedDescription = $("#treatedDescription").val();
			
			if (treatedDescription==null || treatedDescription=="") {
				alert("请填写诊后随访详情！");
			} else {
				var data = {};
				data.personId = personId;
				data.treatmentId = treatmentId;
				data.treatedDescription = treatedDescription;
				$.ajax({
					type : "post",
					url :"addTreatedVisit.action",
					dataType : "text",
					data : data,
					success : function(result){
						alert(result);
						window.location.reload(true);
						self.close();
					}
				 });
				
			}
		});
	</script>
</body>

<script type="text/javascript">
	
</script>
</html>
