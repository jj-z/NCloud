<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/withdraw.css" />
		<script src="${contextPath}/resources/js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${contextPath}/resources/js/widthdraw.js" type="text/javascript" charset="utf-8"></script>
		<title>提现</title>
	</head>

	<body>
		<div class="air">提现</div>
		<div class="withdraw">
			<div class="withdraw_left">
				<p>${wepayAmount / 100}</p>
				<p>手续费：${wepayAuxiliary / 100}</p>
				<p>提现起始时间:${wepayPeriodFrom}</p>
				<p>提现截止时间:${periodTo}</p>
				<input type="radio" name="pay" id="wechat" value="wechat" />
				<a>微信</a>
			</div>
			<div class="withdraw_right">
				<p>${alipayAmount / 100}</p>
				<p>手续费：${alipayAuxiliary / 100}</p>
				<p>提现起始时间:${alipayPeriodFrom}</p>
				<p>提现截止时间:${periodTo}</p>
				<input type="radio" name="pay" id="alipay" value="alipay" />
				<a>支付宝</a>
			</div>			
		</div>
		<button>提现</button>
	</body>
	<script type="text/javascript">
		var urlWepay = "${wepayUrl}";
		var urlAlipay = "${alipayUrl}";
		var wepayAmount ="${wepayAmount / 100}";
		var wepayAuxiliary ="${wepayAuxiliary / 100}";
		var alipayAmount ="${alipayAmount / 100}";
		var alipayAuxiliary = "${alipayAuxiliary / 100}";
	</script>
</html>