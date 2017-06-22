function weixinClose(){
	if(typeof WeixinJSBridge == "undefined"){
		setTimeout(function(){
			weixinClose();
		}, 200);
	}else{
		WeixinJSBridge.call('closeWindow');
	}
}

function alipayClose(){
	if(typeof AlipayJSBridge == "undefined"){
		setTimeout(function(){
			alipayClose();
		}, 200);
	}else{
		AlipayJSBridge.call('closeWebview');
	}
}

$(function() {
	localStorage.clear();
	
	if(good==0){
		alert("这个盒子内的商品暂时不能购买，换一个吧！");
		weixinClose();
		alipayClose();
		window.close();

		return false;
	} else {
		$('.submit').click(function() {
			if(failure == "true" || opening == "true" ) {
				alert("这个盒子内的商品暂时不能购买，换一个吧！");
				$('.submit').attr('disabled', true);
				return false;
			};
			//判断是否支持H5缓存
			if(window.localStorage) {
				var cache={};
				var lockers1 = [];
				cache['price'] = retailPrice /100;
				lockers1[0] = {};
				lockers1[0]['good_name'] = name;
				lockers1[0]['good_img'] = img;
				lockers1[0]['sequence'] = sequence;
				lockers1[0]['retailPrice'] = retailPrice;
				lockers1[0]['cabinetSequence'] = cabinetSequence;
				cache['lockers'] = lockers1;
				cache = JSON.stringify(cache);
				localStorage.setItem('key_1', cache);
				localStorage.setItem('key_2', hotline);
				localStorage.setItem('key_3', qrcode);
				localStorage.setItem('key_4', adImages);
				localStorage.setItem('key_5', adLinks);
				
			} else {
				alert('您的浏览器不支持H5数据缓存，请换手机~');
			}
	//		支付
			var data = {};
			var lockers = [];
			data['device'] = device;
			lockers[0] = {};
			lockers[0]['cabinetSequence'] = cabinetSequence;
			lockers[0]['locker'] = locker;
			lockers[0]['sequence'] = sequence;
			lockers[0]['auth'] = auth;
			lockers[0]['retailPrice'] = retailPrice;
			lockers[0]['currency'] = currency;
			lockers[0]['expireAt'] = expireAt;
			lockers[0]['validBefore'] = validBefore;
			lockers[0]['good'] = {};
			lockers[0]['good']['good'] = good;
			data['lockers'] = lockers;
			data = JSON.stringify(data);
			submit(data);
		});

		$('.help a:eq(0)').click(function() {
			if(hotline == "") {
				$('.help').children('a').eq(0).attr('href', 'javascript:0');
			};
		});
		
		$('.help a:eq(1)').click(function() {
			if(qrcode == "") {
				$('.help').children('img').remove();
			} else {
				$(this).siblings('img').toggle('slow');
			}
		});
	}
});