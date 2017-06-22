$(function() {
	var index = window.location.search.slice(9);
	$.ajax({
		type: "post",
		url: "../json/product" + index + ".json",
		async: false,
		success: function(data) {
			console.log(data);
			console.log(data.product_details.img[0]);
			console.log(data.product_presentation[0]);
			if(data.product == index) {
				$('.product_banner img').attr('data-original', '../img/' + data.product_banner);
				$('.product_quality img').attr('data-original', '../img/' + data.product_quality);
				$('.product_intro img').css('background', '../img/' + data.product_intro.img);
				$('.product_intro p').html(data.product_intro.p);
				$('.product_details p').html(data.product_details.p);
				var html = "";
				for(var i = 0; i < data.product_details.img.length; i++) {
					html += "<li>";
					html += "<img  class='lazy'  src='' data-original='../img/" + data.product_details.img[i] + "'/>";
					html += "</li>";
				}
				$('.product_details ul').append(html);
				var html1 = "";
				for(var i = 0; i < data.product_presentation.length; i++) {
					html1 += "<li>";
					html1 += "<h4>" + data.product_presentation[i].h4 + "</h4>";
					html1 += "<p>——</p>";
					html1 += "<p>" + data.product_presentation[i].p + "</p>";
					html1 += "</li>"
				}
				$('.product_presentation ul').append(html1);
			}
		},
		error: function(xhr, textStatus, errMsg) {
			console.log(textStatus);
			console.log(errMsg);
		}
	});
	//	懒加载
	
	$("img.lazy").lazyload({
		effect: "fadeIn"
	});
})