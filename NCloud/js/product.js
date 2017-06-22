$(function() {
	$.ajax({
		type: "get",
		url: "../json/product.json",
		async: false,
		success: function(data) {
			$('.banner').children('img').attr('data-original','../img/'+data.bgc_img)
			var html = "";
			for(var i = 0; i < data.content.length; i++) {
				html += "<div class='content_" + i + "'><a href='"+data.content[i].a_href+"' target='_blank'><img class='lazy'  src='' data-original='"+data.content[i].img_src+"'/></a></div>"
			}
			$('.content').append(html)
		},
		error: function(xhr, textStatus, errMsg) {
			alert("异常！")
			console.log(textStatus);
			console.log(errMsg);
		}
	});
	$(window).scroll(function() {
		function scrollShow(a, b, c) {
			if($(window).scrollTop() >= $(a).offset().top - $(window).height() + 500) {
				$(a).css('opacity', '1');
				$(a).addClass(b);
				$(a).siblings('img').css('opacity', '1');
				$(a).siblings('img').addClass(c);
			}
		}
	});
	//	懒加载
	
	$("img.lazy").lazyload({
		effect: "fadeIn"
	});

})