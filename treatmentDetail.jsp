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
<title>就诊详情页面</title>
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
			<h3 class="panel-title">就诊大致</h3>
		</div>
		<div id="patientCondition" class="panel-body">
			<ul class="list-group">
				<li class="list-group-item">
				病人<s:property value="treatmentDetailVo.name" />
				于 <s:date name="treatmentDetailVo.date" format="yyyy/MM/dd" /> 日就诊，
				病况描述为：<s:property value="treatmentDetailVo.healthDescription" />，
				就诊费用为<s:property value="treatmentDetailVo.registrationFee" /> 元，
				总共支付 <s:property value="treatmentDetailVo.totalCost" />元</li>
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
						<th style="text-align: center;">药物成本价</th>
						<th style="text-align: center;">药物销售价</th>
						<th style="text-align: center;">收入</th>
					</tr>
				</thead>
				<tbody id="drugList">
					<s:iterator value="drugRecords" var="drugRecord">
					<tr>
						<td align="center"><s:property value="#drugRecord.name" /></td>
						<td align="center"><s:property value="#drugRecord.number" /></td>
						<td align="center"><s:property value="#drugRecord.firstCost" /></td>
						<td align="center"><s:property value="#drugRecord.salePrice" /></td>
						<td align="center"><s:property value="#drugRecord.recordRevenue" /></td>
					</tr>
					</s:iterator>
				</tbody>
			</table>
		</div>
	</div>
</body>

<script type="text/javascript">
	
</script>
</html>
