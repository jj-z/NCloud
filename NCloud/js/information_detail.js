$(function() {

	var index = window.location.search.slice(13);
	$.ajax({
		type: "get",
		url: "../json/information" + index + ".json",
		async: false,
		success: function(data) {
			$('.contact').children('h3').html(data.h3);
			$('.contact').children('span').html(data.span);
			$('.contact').children('p').html(data.p);
		},
		error: function(xhr, textStatus, errMsg) {
			alert("异常！")
			console.log(textStatus);
			console.log(errMsg);
		}
	});
	//	懒加载
	$("img.lazy").lazyload({
		effect: "fadeIn"
	});
})