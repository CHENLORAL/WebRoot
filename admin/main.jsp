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
	        <h3 class="panel-title">未就诊挂号清单</h3>
	    </div>
	    <div id="untreatedRegistrationList" class="panel-body">
	        <ul class="list-group">
			    <s:iterator value="untreatedRegistrations" var="registration">
				    <li class="list-group-item">
				        <span class="badge"><input type="hidden" name="id" id="id" value="<s:property value="#registration.id"/>"/>就诊</span>
				        病人于 <s:date name="#registration.date" format="yyyy/MM/dd" /> 日挂号，病况描述为：<s:property value="#registration.healthDescription"/>
				    </li>
			    </s:iterator>
			</ul>
	    </div>
	</div>
	<script type="text/javascript">
		$("#untreatedRegistrationList").find("span").click(function(){
			var registrationId = $(this).find("#id").val();
			window.open("openTreatmentPage?registrationId="+registrationId,"","toolbar=no,left=200,top=100,width=900,height=550,status=no,scrollbars=yes,resize=no,menuber=no");
		});
	</script>
	<div class="panel panel-default">
	    <div class="panel-heading">
	        <h3 class="panel-title">已就诊记录清单</h3>
	    </div>
	    <div id="finishedTreatment" class="panel-body">
	        <ul class="list-group">
			    <s:iterator value="finishedTreatments" var="treatment">
			    <li class="list-group-item">
			        <span id="openTreatedVisitPage" class="badge"><input type="hidden" name="id" id="id" value="<s:property value="#treatment.id"/>"/>添加诊后随访</span>
			    	<span id="openTreatedVisitHistoryPage" class="badge"><input type="hidden" name="id" id="id" value="<s:property value="#treatment.id"/>"/>查看诊后随访历史</span>
			    	<span id="openTreatmentDetailPage" class="badge"><input type="hidden" name="id" id="id" value="<s:property value="#treatment.id"/>"/>查看就诊详情</span>
			    	已为id为<s:property value="#treatment.personId"/>的病人在<s:property value="#treatment.date"/>日就诊，病况描述为<s:property value="#treatment.healthDescription"/>
			    </li>
			    </s:iterator>
			</ul>
	    </div>
	</div>
	<script type="text/javascript">
		$("#finishedTreatment").find("span#openTreatedVisitPage").click(function(){
			var treatmentId = $(this).find("#id").val();
			window.open("openTreatedVisitPage?treatmentId="+treatmentId,"","toolbar=no,left=200,top=100,width=900,height=550,status=no,scrollbars=yes,resize=no,menuber=no");
			
		});
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
	        <h3 class="panel-title">收入状况</h3>
	    </div>
	    <div class="panel-body">
	        <table class="table table-striped">
				<thead>
					<tr>
						<th style="text-align: center;">收入id号</th>
						<th style="text-align: center;">挂号费</th>
						<th style="text-align: center;">总收入</th>
						<th style="text-align: center;">病人总支付</th>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="revenues" var="revenue">
						<tr>
							<td align="center"><s:property value="#revenue.id"/></td>
							<td align="center"><s:property value="#revenue.registrationFee"/></td>
							<td align="center"><s:property value="#revenue.revenue"/></td>
							<td align="center"><s:property value="#revenue.totalCost"/></td>
						</tr>
					</s:iterator>
				</tbody>
			</table>
	    </div>
	</div>
	<%-- <script type="text/javascript">
		$("#addRegistration").click(function() {
			var personId = $("#personId").val();
			var healthDescription = $("#healthDescription").val();
			if (healthDescription==null || healthDescription=="") {
				alert("挂号前请输入病况描述！");
			} else {
				var data = {"personId":personId,"healthDescription":healthDescription};
				debugger;
				$.ajax({
					type : "post",
					url :"addRegistration.action",
					dataType : "text",
					data : data,
					success : function(result){
						debugger;
						alert(result);
					}
				 });
				
			}
		});
	</script> --%>
</body>

<script type="text/javascript">
	
</script>
</html>
