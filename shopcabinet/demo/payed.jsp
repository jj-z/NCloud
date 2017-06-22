<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="fn" uri="/WEB-INF/taglib/fn.tld"%>
<%@taglib prefix="c" uri="/WEB-INF/taglib/c.tld" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>支付成功</title>
		<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/base.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/payed.css" />
		<link rel="stylesheet" href="${contextPath}/resources/css/swiper-3.4.2.min.css" />
		<script src="${contextPath}/resources/js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${contextPath}/resources/js/swiper-3.4.2.jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${contextPath}/resources/js/payed.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<% 	String total_amount = (String)request.getParameter("total_amount");%>

	<body class="container-fluid">
		<p></p>
		<div class="swiper-container" dir="ltr">
			<div class="swiper-wrapper"></div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>

			<!-- 如果需要滚动条 -->
			<div class="swiper-scrollbar"></div>
		</div>
		<ul></ul>
		<div class="help">
			<a href="tel:">&nbsp;&nbsp;故障报告</a>
			<br />
			<a href="javascript:0">&nbsp;&nbsp;客服微信</a>
			<br />
			<img class="img" src="${goodImagesUrl}/${qrcode}" alt="客服二维码" />
		</div>
	</body>
	<script type="text/javascript">
		var url = "${adImagesUrl}/";
	</script>

</html>