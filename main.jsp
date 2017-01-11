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
<title>诊所管理系统</title>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
<link rel="stylesheet" href="css/style.css" type="text/css">
<link href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
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
	        <h3 class="panel-title">就诊记录</h3>
	    </div>
	    <div id="finishedTreatment" class="panel-body">
	        <ul class="list-group">
			    <s:iterator value="treatmentRecords" var="treatmentRecord">
			    <li class="list-group-item">
			        <span id="openTreatedVisitHistoryPage" class="badge"><input type="hidden" name="id" id="id" value="<s:property value="#treatmentRecord.id"/>"/>查看诊后随访历史</span>
			        <span id="openTreatmentDetailPage" class="badge"><input type="hidden" name="id" id="id" value="<s:property value="#treatmentRecord.id"/>"/>查看就诊详情</span>
			        您于<s:property value="#treatmentRecord.date"/>日接受就诊，病况描述为<s:property value="#treatmentRecord.healthDescription"/>
			    </li>
			    </s:iterator>
			</ul>
	    </div>
	</div>
	<script type="text/javascript">
		$("#finishedTreatment").find("span#openTreatmentDetailPage").click(function(){
			var treatmentId = $(this).find("#id").val();
			window.open("openTreatmentDetailPage?treatmentId="+treatmentId,"","toolbar=no,left=200,top=100,width=900,height=550,status=no,scrollbars=yes,resize=no,menuber=no");
		});
		$("#finishedTreatment").find("span#openTreatedVisitHistoryPage").click(function(){
			var treatmentId = $(this).find("#id").val();
			window.open("openTreatedVisitHistoryPage?treatmentId="+treatmentId,"","toolbar=no,left=200,top=100,width=900,height=550,status=no,scrollbars=yes,resize=no,menuber=no");
		});
	</script>
	<div class="panel panel-default">
	    <div class="panel-heading">
	        <h3 class="panel-title">挂号</h3>
	    </div>
	    <div class="panel-body">
	        <div class="input-group input-group-lg">
	            <span class="input-group-addon">病况描述：</span>
	            <input type="hidden" name="personId" id="personId" value="<%=patient.getId()%>"/>
	            <input type="text" id="healthDescription" name="healthDescription" class="form-control" placeholder="请填写就诊描述">
	        </div>
	        <br/>
	        <h4>挂号费用： 5元</h4>
	        <center><button id="addRegistration" type="button" class="btn btn-default">挂号</button></center>
	    </div>
	</div>
	<script type="text/javascript">
		$("#addRegistration").click(function() {
			var personId = $("#personId").val();
			var healthDescription = $("#healthDescription").val();
			if (healthDescription==null || healthDescription=="") {
				alert("挂号前请输入病况描述！");
			} else {
				var data = {"personId":personId,"healthDescription":healthDescription};
				$.ajax({
					type : "post",
					url :"addRegistration.action",
					dataType : "text",
					data : data,
					success : function(result){
						alert(result);
						window.location.reload(true);
					}
				 });
				
			}
		});
	</script>
</body>

<script type="text/javascript">
	
</script>
</html>
