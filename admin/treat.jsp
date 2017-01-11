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
			<h3 class="panel-title">病人病情</h3>
		</div>
		<div id="patientCondition" class="panel-body">
			<ul class="list-group">
				<li class="list-group-item">
				<input type="hidden" name="registrationId" id="registrationId"
					value="<s:property value="registration.id"/>" />
				<input type="hidden" name="healthDescription" id="healthDescription"
					value="<s:property value="registration.healthDescription"/>" />
				<input type="hidden" name="personId" id="personId"
					value="<s:property value="registration.personId"/>" /> 病人于 <s:date
						name="registration.date" format="yyyy/MM/dd" /> 日挂号，病况描述为：<s:property
						value="registration.healthDescription" /></li>
			</ul>
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">药物清单</h3>
		</div>
		<div class="panel-body">
			<table class="table table-striped">
				<thead>
					<tr>
						<th style="text-align: center;">药物名称</th>
						<th style="text-align: center;">所开剂量</th>
					</tr>
				</thead>
				<tbody id="drugList">
					<tr>
						<td align="center">
						<select id="drugId" style="font-size: 20px;" name="drugId">
							<s:iterator value="drugList" var="drug">
								<option value="<s:property value="#drug.id"/>" selected="selected"><s:property value="#drug.name"/></option>
							</s:iterator>
						</select>
						</td>
						<td align="center"><input type="text" name="number" id="number"/></td>
					</tr>
				</tbody>
			</table>
			<center>
				<button id="addDrugRecord" type="button" class="btn btn-default">添加药物</button>
			</center>
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">给予建议</h3>
		</div>
		<div class="panel-body">
            <input id="suggestion" type="text" class="form-control" placeholder="请输入建议">
		</div>
	</div>
	<center>
		<button id="addTreatment" type="button" class="btn btn-default">完成就诊</button>
	</center>
	<script type="text/javascript">
		$("#addDrugRecord").click(function() {
			var prev = $("#drugList").html();
			var newLine = $("#drugList").find("tr").last().html();
			$("#drugList").empty();
			$("#drugList").append(prev+newLine);
		});
		$("#addTreatment").click(function() {
			var personId = $("#personId").val();
			var registrationId = $("#registrationId").val();
			var suggestion = $("#suggestion").val();
			var healthDescription = $("#healthDescription").val();
			if (suggestion==null || suggestion=="") {
				alert("请填写建议！");
			} else {
				var data = {};
				data.personId = personId;
				data.registrationId = registrationId;
				data.suggestion = suggestion;
				data.healthDescription = healthDescription;
				// 遍历得到药物和剂量
				var length = $("#drugList").find("tr").length;
				var drugList = "";
				var drugId, number;
				for (var i=0; i<length-1; i++) {
					drugId = $("#drugList").find("tr").eq(i).find("#drugId").val();
					number = $("#drugList").find("tr").eq(i).find("#number").val();
					drugList += drugId + ":" + number + ",";
				}
				if (length > 0) {
					drugId = $("#drugList").find("tr").eq(length-1).find("#drugId").val();
					number = $("#drugList").find("tr").eq(length-1).find("#number").val();
				}
				drugList += drugId + ":" + number;
				data.drugList = drugList;
				$.ajax({
					type : "post",
					url :"addTreatment.action",
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
