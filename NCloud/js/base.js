$(function() {
	$.ajax({
		type: "get",
		url: "../json/bace.json",
		async: false,
		success: function(data) {
			$('.box').children('img').attr('src', '../img/' + data.header.logo_img);
			$('.box').children('h1').html(data.header.h1);
			var html = "";
			for(var i = 0; i < data.header.nav.length; i++) {
				html += "<li><a href='" + data.header.nav[i].href + "'>" + data.header.nav[i].name + "</a></li>"
			}
			$('.box ul').append(html);
			var html1 = "";
			for(var i = 0; i < data.header.nav_extend.length; i++) {
				html1 += "<li><a href='" + data.header.nav_extend[i].href + "'  target='_blank'>" + data.header.nav_extend[i].name + "</a></li>"
			}
			$('.box ul').children('li:last-child').find('a').after("<ul class='nav_extend'></ul>");
			$('.nav_extend').append(html1);
			
			$("footer").find('a').attr(data.footer.href);
			$("footer").find('a').html(data.footer.a);
			$("footer").children('p:last-child').html(data.footer.p);
		},
		error: function(xhr, textStatus, errMsg) {
			alert("异常！")
			console.log(textStatus);
			console.log(errMsg);
		}
	});

	$(window).scroll(function() {
		var width = $('.header_contant li ul').width();
		if($(window).scrollTop() > 40) {
			$('.header_contant').css({
				'position': 'fixed',
				'top': '0px',
				'z-index': '1000',
				'margin': '0',
				'padding': '0',
				'height': '110px',
				'background-color': 'rgba(0,0,0,1)'
			})
			$('.header_contant li ul').css({
				'width': '400px',
				'bottom': '0px',
				'left': -width / 1.6 + 'px'
			})
			$('.header_contant li li').css({
				'float': 'left',
				'width': 'auto',
				'margin': '0 10px'
			})
			$('.header_contant li li a').css({
				'border': 'none'
			})
		} else {
			$('.header_contant').css({
				'position': 'static',
				'top': '0',
				'z-index': '0',
				'margin': '0',
				'padding-top': '0px',
				'height': 'auto',
				'background-color': 'rgba(255,255,255,0)'
			})
			$('.header_contant li ul').css({
				'width': '100%',
				'bottom': '-126px',
				'left': '0px'
			})
			$('.header_contant li li').css({
				'float': 'none',
				'width': '200%',
				'padding': '0 10px',
				'z-index': '10000'
			})
			$('.header_contant li li a').css({
				'border-bottom': '1px solid #f8f8f8'
			})
		}
	})
	$('.box').children('img').click(function(){
		window.location.href="index.html"
	})
	$('.box').children('h1').click(function(){
		window.location.href="index.html"
	})
})