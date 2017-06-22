<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.gzncloud.ssss.foreground.entity.Locker" %>
<%@taglib prefix="fn" uri="/WEB-INF/taglib/fn.tld"%>
<%@taglib prefix="c" uri="/WEB-INF/taglib/c.tld" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<title>购物系统</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<% 	String mode = (String)request.getAttribute("mode");
			if("device".equals(mode)) { %>
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/base.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/device.css" />
		<% }else if("locker".equals(mode)) { %>
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/base.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/locker.css" />
		<% } %>
	</head>

	<body class="container-fluid">
		<h3>欢迎使用自助售货机</h3>
		<% if("device".equals(mode)) { %>
		<script type="text/javascript">
			var arr = [];
		</script>
		<div class="title">
			<c:forEach items="${device.cabinets}" var="cabinet" varStatus="status">
				<span class='cabinet cabinet${status.count}'>${status.count}号柜</span>
			</c:forEach>
		</div>

		<c:forEach items="${device.cabinets}" var="cabinet" varStatus="status">
			<script type="text/javascript">
				arr['${cabinet.sequence}'] = {};
			</script>
			<ul class='row row${status.count}'>
				<c:forEach items="${cabinet.lockers }" var="locker" varStatus="status">
					<script type="text/javascript">
						
						var locker = {};
						
						locker["locker"] = "${locker.locker}";
						locker["cabinetSequence"] = "${cabinet.sequence}";
						locker["sequence"] = "${locker.sequence }";
						locker["auth"] = "${locker.auth}";
						locker["expireAt"] = "${locker.expireAt }";
						locker["retailPrice"] = "${locker.retailPrice / 100}";
						locker["currency"] = "${locker.currency}";
						locker["validBefore"] = "${locker.validBefore}";
						locker["failure"] = "${locker.failure}";
						locker["opening"] = "${locker.opening}";
						

						locker["good"] = {};
						locker["good"]["good"] = "${locker.good.good }";
						locker["good"]["img"] = "${locker.good.image1}";
						locker["good"]["name"] = "${locker.good.name }";

						arr["${cabinet.sequence}"]["${locker.sequence }"] = locker;
						
					</script>
					<li class=" checkbox  lis" style="background:#fff url(${goodImagesUrl}/${locker.good.image1 } ) center no-repeat;background-size:auto 100%">

						<input type='checkbox' value='${cabinet.sequence}-${locker.sequence }' id='checkbox${locker.locker }' name='number' />

						<label for='checkbox checkbox${locker.locker }'>
							<img src='${contextPath}/resources/img/checked.png'>								
						</label>
						<i style='display:none;'>${locker.good.name }</i>
						<span style='display:none;'>${locker.retailPrice / 100}</span>
					</li>
				</c:forEach>
			</ul>
		</c:forEach>
		<div class="showLists">
			<ul class="lists">
				<li class="lastLi">
					<div>共&nbsp;<span class="span span1"></span>&nbsp;件，总价：￥&nbsp;<span class="span span2"></span></div>
					<input class="submit" type="button" value="支付" />
				</li>
			</ul>
		</div>
		<div class="pay">
		</div>
		<div class="help">
			<a href="tel:${hotline}">客服电话</a>
			<br />
			<a href="javascript:0">客服微信</a>
			<br />
			<img class="img" src="${goodImagesUrl}/${qrcode}" alt="客服二维码" />
		</div>
		<%
		} else if ("locker".equals(mode)) { 
			Locker locker = (Locker)request.getAttribute("locker");
			if(locker.getGood() != null && locker.getGood().getGood() > 0){
		%>
			<div class="goods">
				<img src='${goodImagesUrl}/${locker.good.image1 }' />
				<div><span class="span span1">${locker.good.name }</span>&nbsp;&nbsp;￥<span class="span span2">${locker.retailPrice /100}</span></div>
			</div>
			<div class="pay">
				<input class="submit" type="button" value="支付"></input>
			</div>
			<div class="help">
				<br />
				<a href="tel:${hotline}">&nbsp;&nbsp;故障报告</a>
				<br />
				<a href="javascript:0">&nbsp;&nbsp;客服微信</a>
				<br />
				<img class="img" src="${goodImagesUrl}/${qrcode}" alt="客服二维码" />
			</div>
		<%
			} 
		}
		%>
	</body>

	<% if("device".equals(mode)) { %>
	<script type="text/javascript">
		var device = "${device.device}";
		var orderUrl = "${orderUrl }";
		var imgUrl = "${goodImagesUrl}/";
		var freeEnabled = "${device.freeEnabled}";
		var hotline = "${hotline}";
		var qrcode = "${qrcode}";
		var payedUrl = "${contextPath}/wechat/pay_return";
		var adImages = "${device.adImages}";
		var adLinks = "${device.adLinks}";
	</script>
	<script src="${contextPath}/resources/js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="${contextPath}/resources/js/pay.js" type="text/javascript" charset="utf-8"></script>
	<script src="${contextPath}/resources/js/device.js" type="text/javascript" charset="utf-8"></script>
	<% }else if("locker".equals(mode)) { %>
	<script type="text/javascript">
		var device = "${locker.device.device}";
		var orderUrl = "${orderUrl }";
		var cabinetSequence = "${locker.cabinetSequence }";
		var locker = "${locker.locker }";
		var sequence = "${locker.sequence }";
		var auth = "${locker.auth }";
		var retailPrice = "${locker.retailPrice }";
		var currency = "${locker.currency }";
		var expireAt = "${locker.expireAt }";
		var validBefore = "${locker.validBefore }";
		var good = "${locker.good.good }";
		var name = "${locker.good.name }";
		var img = "${locker.good.image1 }";
		var hotline = "${hotline}";
		var qrcode = "${qrcode}";
		var failure = "${locker.failure }";
		var opening = "${locker.opening }";
		var payedUrl = "${contextPath}/wechat/pay_return";
		var adImages = "${locker.device.adImages}";
		var adLinks = "${locker.device.adLinks}";
	</script>
	<script src="${contextPath}/resources/js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="${contextPath}/resources/js/pay.js" type="text/javascript" charset="utf-8"></script>
	<script src="${contextPath}/resources/js/locker.js" type="text/javascript" charset="utf-8"></script>
	<% } %>

</html>