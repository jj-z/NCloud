$(function() {
	$.ajax({
		type: "get",
		url: "../json/aboutUs.json",
		async: false,
		success: function(data) {
			var html = "";
			for(var i = 0; i < data.contact_left.length; i++) {
				html += "<li>" + data.contact_left[i] + "</li>"
			};
			$('.contact_left').append(html);

			$('.contact_right_1').children('h3').append(data.contact_right.contact_right_1.h3);
			$('.contact_right_1').children('p').append(data.contact_right.contact_right_1.p);
			$('.contact_right_2').children('h3').append(data.contact_right.contact_right_2.h3);
			$('.contact_right_3').children('h3').append(data.contact_right.contact_right_3.h3);
			$('.contact_right_3').children('p').append(data.contact_right.contact_right_3.p);
			var html = "";

			function html1() {
				var html1 = "";
				for(var j = 0; j < data.contact_right.contact_right_2.li[i].ol1.length; j++) {
					html1 += "<li>" + data.contact_right.contact_right_2.li[i].ol1[j] + "</li>"
				}
				return html1;
			};

			function html2() {
				var html2 = "";
				for(var j = 0; j < data.contact_right.contact_right_2.li[i].ol2.length; j++) {
					html2 += "<li>" + data.contact_right.contact_right_2.li[i].ol2[j] + "</li>"
				}
				return html2;
			};
			for(var i = 0; i < data.contact_right.contact_right_2.li.length; i++) {
				html += "<li>";
				html += "<h4>" + data.contact_right.contact_right_2.li[i].h4 + "</h4>"
				html += "<h5>岗位职责：</h5>";
				html += "<ol>" + html1() + "</ol>";
				html += "<h5>任职要求：</h5>";
				html += "<ol>" + html2() + "</ol>";
				html += "</li>";
			}
			$('.contact_right_2').children('ol').append(html);

		},
		error: function(xhr, textStatus, errMsg) {
			alert("异常！")
			console.log(textStatus);
			console.log(errMsg);
		}
	});
	$('.contact_left li').click(function() {
		var index = $(this).index() + 1;
		$('.contact_right_' + index).show('slow').siblings().hide('fast');
	})

})