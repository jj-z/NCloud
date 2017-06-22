$(function() {
	//	加载完操作dom
	localStorage.clear();
	for(var i = 0; i < $('.row').length; i++) {
		var num = $(".cabinet").length;
		$('.row' + i).height(($('.row' + i).children('li').length / 8 + 1) * 50);
		$(".cabinet").addClass('width' + num);
	}
	for(var i = 1; i <= $('.row').length; i++) {
		for(var j = 1; j <= $('.row' + i).children('li').length; j++) {
			if(arr[i][j].failure == "true" || arr[i][j].opening == "true") {
				$('#checkbox' + arr[i][j].locker).prop('checked', false);
				$('#checkbox' + arr[i][j].locker).attr('disabled', true);
				$('#checkbox' + arr[i][j].locker).siblings('label').css('background-color', 'rgba(0,0,0,.3)');
				$('#checkbox' + arr[i][j].locker).parent('li').css('-webkit-filter', 'grayscale(100%)');
				$('#checkbox' + arr[i][j].locker).parent('li').css('filter', 'grayscale(100%)');
			}
		}
	}
	$(document).ready(function() {
		//			选择货柜样式
		var len = $(".row").length;
		$('.cabinet1').addClass('bgc').siblings().addClass('border');
		$('.row1').slideDown();
		for(var i = 0; i < len; i++) {
			(function(i) {
				i = i + 1;
				$('.cabinet' + i).click(function() {
					$('.cabinet' + i).addClass('bgc').siblings().removeClass('bgc').addClass('border');
					$('.row').hide();
					$('.row' + i).slideDown('slow');
				});
			})(i)
		}
		//			选取产品拼接列表

		var money = 0;

		$("body").on('click', "input[type='checkbox']", function() {
			var checkboxStatus = $(this).is(':checked');
			var length = $("input[type='checkbox']:checked").length;
			var number1 = $(this).val();
			var index = number1.indexOf("-");
			var number2 = number1.slice(0, index);
			var number3 = number1.slice(index + 1);
			var name = $(this).siblings('i').html();
			var price = $(this).siblings('span').html();
			var imgNumber = $(this).parent('li').css('background-image');
			var locker = $(this).attr('id').slice(8);
			var html = "<li class=li" + number1 + ">" + "<span class='img' style='background: #fff " + imgNumber + " center no-repeat;background-size:auto 100%'></span><div>柜号：" + "<span class='span span3'>" + number2 + "</span>&nbsp;&nbsp;&nbsp;&nbsp;盒号：<span class='span span0'>" + number3 + "</span></div>" + "<div>产品：<span class='span span4'>" + name + "</span>&nbsp;&nbsp;&nbsp;价格：￥<span class='span span5'>" + price + "</span></div><h6 style='display:none;'>" + locker + "</h6><i onclick=''>X</i></li>";

			if($(this).siblings('i').html() != "") {
				if(+$(this).siblings('span').html() > 0) {
					checkStates();
				} else if(freeEnabled == "true") {
					checkStates();

				} else {
					$(this).prop('checked', false);
					alert("活动商品，未参加活动不能购买。");
				}
			} else {
				$(this).prop('checked', false);
				alert("商品已售出，请选择其他商品。");
				$(this).siblings('label').css({
					'backgroundColor': 'rgba(0,0,0,.3)',
					'color': '#ad3333',
					'lineHeight': '30px'
				});
				$(this).siblings('label').html('空');
			}

			function checkStates() {
				if(checkboxStatus) {
					$('.lastLi').after(html);
					$('.span1').html(length);
					money += +$('.li' + number1).find('.span5').html();
					money = parseFloat(money.toFixed(2));
					$('.span2').html(money);
				} else {
					$('.span1').html(length);
					money -= +$('.li' + number1).find('.span5').html();
					money = parseFloat(money.toFixed(2));
					$('.span2').html(money);
					$('.li' + number1).remove();
				}
				if(length > 0) {
					$('.showLists').fadeIn('slow');
				} else {
					$('.showLists').fadeOut('slow');
				}
			}
		});
		//		判断选中还是取消,相应的产品展示消失

		$("body").on('click', 'i', function() {
			var length = +$(this).parents('.lists').children('li').length - 2;
			var a = $(this).parent('li').prop("className").slice(2);
			var b = a.slice(a.indexOf('-') + 1);
			var c = a.slice(0, a.indexOf('-'))
			$('.span2').html(money);
			$('.span1').html(length);
			$('#checkbox' + arr[c][b].locker).click();
			$(this).parent('li').remove();
			if(length < 1) {
				$('.showLists').fadeOut('slow');
				//				暂时放着
				$('.submit').attr('disabled', true);
			}
		});

		//		模拟支付

		$('.submit').click(function() {
			
			$('.submit').attr('disabled', true);
			
			var length = $('.showLists li').length - 1;
			
			//			本地缓存
			
			//			判断是否支持H5缓存
			if(window.localStorage) {
				var cache={};
				var lockers1 = [];
				cache['price'] = money;
				for(var i = 0; i < length; i++) {
					var className = $('.showLists').find('li').eq(i + 1).attr('class').slice(2);
					var index = className.indexOf("-");
					var a = +className.slice(0, index);
					var b = +className.slice(index + 1);
					lockers1[i] = {};
					lockers1[i]['cabinetSequence'] = arr[a][b].cabinetSequence;
					lockers1[i]['sequence'] = arr[a][b].sequence;
					lockers1[i]['retailPrice'] = arr[a][b].retailPrice * 100;
					lockers1[i]['good_name'] = arr[a][b].good.name;
					lockers1[i]['good_img'] = arr[a][b].good.img;
				}
				cache['lockers'] = lockers1;
				cache = JSON.stringify(cache);
				localStorage.setItem('key_1', cache);
				localStorage.setItem('key_2', hotline);
				localStorage.setItem('key_3', qrcode);
				localStorage.setItem('key_4', adImages);
				localStorage.setItem('key_5', adLinks);
			} else {
				alert('您的浏览器不支持H5数据缓存，体验可能不太好哦~');
			}
			
//			支付
			var data = {};
			var lockers = [];
			data['device'] = device;
			for(var i = 0; i < length; i++) {
				var className = $('.showLists').find('li').eq(i + 1).attr('class').slice(2);
				var index = className.indexOf("-");
				var a = +className.slice(0, index);
				var b = +className.slice(index + 1);
				lockers[i] = {};
				lockers[i]['cabinetSequence'] = arr[a][b].cabinetSequence;
				lockers[i]['locker'] = arr[a][b].locker;
				lockers[i]['sequence'] = arr[a][b].sequence;
				lockers[i]['auth'] = arr[a][b].auth;
				lockers[i]['retailPrice'] = arr[a][b].retailPrice * 100;
				lockers[i]['currency'] = arr[a][b].currency;
				lockers[i]['expireAt'] = arr[a][b].expireAt;
				lockers[i]["validBefore"] = arr[a][b].validBefore;
				lockers[i]['good'] = {};
				lockers[i]['good']['good'] = arr[a][b].good.good;
			}
			data['lockers'] = lockers;
			data = JSON.stringify(data);
			submit(data);
		});

		$('.help a:eq(0)').click(function() {
			if(hotline == "") {
				$('.help').children('a').eq(0).attr('href', 'javascript:0');
			};
		})
		$('.help a:eq(1)').click(function() {
			if(qrcode == "") {
				$('.help').children('img').remove();
			} else {
				$(this).siblings('img').toggle('slow');
			}
		})

	})

})