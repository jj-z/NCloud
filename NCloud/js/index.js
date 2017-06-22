$(function() {
	$.ajax({
		type: "get",
		url: "../json/index.json",
		async: false,
		success: function(data) {
			//			banner图
			$('.header_bgc').attr('data-original', '../img/' + data.bgc_img);

			//			资讯
			$('.message').children('h3').html(data.message.h3);
			$('.message').children('p').html(data.message.p);
			var html = "";
			for(var i = 0; i < data.message.message_contant.length; i++) {
				html += "<li>";
				html += "<a href='" + data.message.message_contant[i].a_href + "'>";
				html += "<img class='lazy'  src='' data-original='../img/" + data.message.message_contant[i].img + "'/>"
				html += "<p>" + data.message.message_contant[i].p1 + "</p>"
				html += "<p></p>"
				html += "<p>" + data.message.message_contant[i].p2 + "</p>"
				html += "</a>"
				html += "</li>"
			}
			$('.message_contant ul').append(html);
			//			产品
			$('.product').children('h3').html(data.product.h3);
			$('.product').children('p').html(data.product.p);
			var html = "";
			for(var i = 0; i < data.product.product_contant.length; i++) {
				html += "<div class='swiper-slide'>";
				html += "<a href='" + data.product.product_contant[i].a_href + "'>";
				html += "<img src='../img/" + data.product.product_contant[i].img + "'/>"
				html += "<h3>" + data.product.product_contant[i].h3 + "</h3>"
				html += "<p>" + data.product.product_contant[i].p + "</p>"
				html += "</a>"
				html += "<i></i>"
				html += "</div>"
			}
			$('.swiper-wrapper').append(html);
			//			联系我们
			$('.contact').children('h3').html(data.contact.h3);
			$('.contact').children('p').html(data.contact.p);
			var html = "";
			for(var i = 0; i < data.contact.contact_contant.length; i++) {
				html += "<li>";
				html += "<img  src='' class='lazy' data-original='../img/" + data.contact.contact_contant[i].img + "'/>";
				html += "<p>" + data.contact.contact_contant[i].p1 + "</p>";
				html += "<p>" + data.contact.contact_contant[i].p2 + "</p>";
				html += "</li>"
			}
			$('.contact ul').append(html);
		},
		error: function(xhr, textStatus, errMsg) {
			alert("异常！")
			console.log(textStatus);
			console.log(errMsg);
		}
	});
	$('header').css('height', $(window).height());
	//	滚动事件
	$(window).scroll(function() {
		scroll_showH3('.message h3', '.message p', '.message .one');
		scroll_showH3('.product h3', '.product p', '.product .one');
		scroll_showH3('.contact h3', '.contact p', '.contact .one');
	})

	function scroll_showH3(a, b, c) {
		if($(window).scrollTop() >= $(a).offset().top - $(window).height() + 100) {
			$(a).addClass('fadeInDown');
			$(b).addClass('fadeInUp');
			$(a).css('opacity', '1');
			$(b).css('opacity', '1');
			$(c).css('opacity', '1');
		}
	}

	//	向下箭头
	$('.arrows').click(function() {
		$(this).animate(1200, function() {
			$(window).scrollTop($(this).offset().top);
		})
	})
	//创建和初始化地图函数：
	function initMap() {
		createMap(); //创建地图
		setMapEvent(); //设置地图事件
		addMapControl(); //向地图添加控件
		addMarker(); //向地图中添加marker
	}

	//创建地图函数：
	function createMap() {
		var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
		var point = new BMap.Point(113.406549, 23.041142); //定义一个中心点坐标
		map.centerAndZoom(point, 18); //设定地图的中心点和坐标并将地图显示在地图容器中
		window.map = map; //将map变量存储在全局
	}

	//地图事件设置函数：
	function setMapEvent() {
		map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
		//		map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
		map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
		map.enableKeyboard(); //启用键盘上下左右键移动地图
	}

	//地图控件添加函数：
	function addMapControl() {
		//向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_LEFT,
			type: BMAP_NAVIGATION_CONTROL_LARGE
		});
		map.addControl(ctrl_nav);
		//向地图中添加缩略图控件
		var ctrl_ove = new BMap.OverviewMapControl({
			anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
			isOpen: 1
		});
		map.addControl(ctrl_ove);
		//向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({
			anchor: BMAP_ANCHOR_BOTTOM_LEFT
		});
		map.addControl(ctrl_sca);
	}

	//标注点数组
	var markerArr = [{
		title: "广州云近科技有限公司",
		content: "广州云近科技有限公司<br/>地址：广东省广州市番禺区大学城外环西路100号&nbsp;广东工业大学IC基地502室<br/>电话：020-31062327",
		point: "113.40678|23.0413",
		isOpen: 1,
		icon: {
			w: 23,
			h: 25,
			l: 46,
			t: 21,
			x: 9,
			lb: 12
		}
	}];
	//创建marker
	function addMarker() {
		for(var i = 0; i < markerArr.length; i++) {
			var json = markerArr[i];
			var p0 = json.point.split("|")[0];
			var p1 = json.point.split("|")[1];
			var point = new BMap.Point(p0, p1);
			var iconImg = createIcon(json.icon);
			var marker = new BMap.Marker(point, {
				icon: iconImg
			});
			var iw = createInfoWindow(i);
			var label = new BMap.Label(json.title, {
				"offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)
			});
			marker.setLabel(label);
			map.addOverlay(marker);
			label.setStyle({
				borderColor: "#808080",
				color: "#333",
				cursor: "pointer"
			});

			(function() {
				var index = i;
				var _iw = createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click", function() {
					this.openInfoWindow(_iw);
				});
				_iw.addEventListener("open", function() {
					_marker.getLabel().hide();
				})
				_iw.addEventListener("close", function() {
					_marker.getLabel().show();
				})
				label.addEventListener("click", function() {
					_marker.openInfoWindow(_iw);
				})
				if(!!json.isOpen) {
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
		}
	}
	//创建InfoWindow
	function createInfoWindow(i) {
		var json = markerArr[i];
		var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
		return iw;
	}
	//创建一个Icon
	function createIcon(json) {
		var icon = new BMap.Icon("http://map.baidu.com/image/us_mk_icon.png", new BMap.Size(json.w, json.h), {
			imageOffset: new BMap.Size(-json.l, -json.t),
			infoWindowOffset: new BMap.Size(json.lb + 5, 1),
			offset: new BMap.Size(json.x, json.h)
		})
		return icon;
	}

	initMap(); //创建和初始化地图
	//	懒加载
	
	$("img.lazy").lazyload({
		effect: "fadeIn"
	});
	
	//	轮播图
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		slidesPerView: 4,
		paginationClickable: true,
		spaceBetween: 8,
		autoplay: 3000,
		autoplayDisableOnInteraction: false,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		loop: true,
		speed: 500,
	});
	$('.swiper-container').mouseenter(function() {
		swiper.stopAutoplay();
	}).mouseleave(function() {
		swiper.startAutoplay();
	})
})