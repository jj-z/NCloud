function submit(data) {
	$.ajax({
		type: "post",
		contentType: "application/json;charset=utf-8;",
		url: orderUrl,
		data: data,
		async: false,
		success: function(data) {
			if(data.errorCode == 0) {
				if(data.extra.paymentChannel == "alipay_wappay") {
					$('.submit').attr('disabled', false);
					$('body').html(data.baseObject.response);
				} else if(data.extra.paymentChannel == "wechat_jspay") {
					pay(data);
					$('.submit').attr('disabled', false);
				}
			} else {
				alert(data.errorMessage);
				$('.submit').attr('disabled', false);
				$('.help').children('a').eq(0).attr('href', data.extra.hotline);
				$('.help').children('img').attr('href', data.extra.qrcode);
				return false;
			}
		},
		error: function(xhr, textStatus, errMsg) {
			console.log(textStatus);
			console.log(errMsg);
			alert("异常");
			$('.submit').attr('disabled', false);

		}
	});
}

function pay(data) {
	appId = data.baseObject.appId;　　　　
	sign = data.baseObject.paySign;　　
	timeStamp = data.baseObject.timeStamp;　　
	nonceStr = data.baseObject.nonceStr;　　
	packageStr = data.baseObject.package;　　
	signType = data.baseObject.signType;
	//调起微信支付控件 
	callpay();　
}

//微信支付
var prepay_id;
var sign;
var appId;
var timeStamp;
var nonceStr;
var packageStr;
var signType;

function onBridgeReady() {
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest', {
			"appId": appId, //公众号名称，由商户传入
			"paySign": sign, //微信签名
			"timeStamp": timeStamp, //时间戳，自1970年以来的秒数
			"nonceStr": nonceStr, //随机串
			"package": packageStr, //预支付交易会话标识
			"signType": signType //微信签名方式
		},
		function(res) {
			if(res.err_msg == "get_brand_wcpay_request:ok") {
				window.location.replace(payedUrl);
			} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
				alert('支付取消');
				return false;
			} else if(res.err_msg == "get_brand_wcpay_request:fail") {
				alert('支付失败');
				return false;
			}
			//使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
		}
	);
}

function callpay() {
	if(typeof WeixinJSBridge == "undefined") {
		if(document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if(document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		onBridgeReady();
	}
}