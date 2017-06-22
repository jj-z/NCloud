$(function() {
	var key_1 = localStorage.getItem('key_1');
	var hotline = localStorage.getItem('key_2');
	var qrcode = localStorage.getItem('key_3');
	var adImages = localStorage.getItem('key_4');
	var adLinks = localStorage.getItem('key_5');
	var data = JSON.parse(key_1);

	$('p').html("你一共购买<span>" + data.lockers.length + "</span>件商品，共<span>" + data.price + "</span>元。")
	var html = "";
	for(var i = 0; i < data.lockers.length; i++) {
		html += "<li>";
		html += "<div class='img'><img src='" + url + data.lockers[i].good_img + "'></div>";
		html += "<div>柜号：<span>" + data.lockers[i].cabinetSequence + "</span>盒号：<span>" + data.lockers[i].sequence + "</span><br>商品：<span>" + data.lockers[i].good_name + "</span>价格：<span>" + data.lockers[i].retailPrice / 100 + "</span></div>";
		html += "</li>";
	}
	$('ul').html(html);
	var adImages = adImages.split('|');
	var adLinks = adLinks.split('|');
	var html = "";
	if(adImages.length == adLinks.length) {
		for(var i = 0; i < adImages.length; i++) {
			if(adLinks[i]==""){
				adLinks[i]="javascript:0";
			}
			html += "<div class='swiper-slide'><a href='" + adLinks[i] + "'><img src='"+ url + adImages[i] + "' /></a></div>"
		}
	}
	$('.swiper-wrapper').html(html);

	$('.help a:eq(0)').attr("href", "tel:" + hotline);
	$('.help img').attr("src", url + qrcode);
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

	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		pagination: '.swiper-pagination',
		scrollbar: '.swiper-scrollbar',
		autoplay: 5000,
		autoplayDisableOnInteraction: false,
		autoHeight: true,
	})
})