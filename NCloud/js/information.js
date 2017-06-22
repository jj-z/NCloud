$(function() {
	$.ajax({
		type:"get",
		url:"../json/information.json",
		async:false,
		success:function(data){
			$('.banner').children('img').attr('data-original','../img/'+data.img_src)
			$('.content').children('h3').html('<p class="before"></p>'+data.h3+'<p class="after"></p>');
			$('.content').children('p').html(data.p);
			var html="";
			for (var i=0;i<data.ul.length;i++) {
				html+="<li><img class='lazy'  src='' data-original='../img/"+data.ul[i].img_src+"' alt='"+data.ul[i].p+"' /><p>"+data.ul[i].p+"</p><div><a href='information_detail.html' target='_blank'>点击前往</a></div></li>"
				console.log(html)
			}
			$('.content').children('.content_list').append(html);
		},
		error: function(xhr, textStatus, errMsg) {
			alert("异常！")
			console.log(textStatus);
			console.log(errMsg);
		}
	});
	$('.content_list li').click(function(){
		$(this).find('a').attr('href','information_detail.html?information='+$(this).index())
	})
	$(window).scroll(function() {
		scroll_showH3('.content h3', '.content p');
	})

	function scroll_showH3(a, b) {
		if ($(window).scrollTop() >= $(a).offset().top - $(window).height() + 100) {
			$(a).addClass('fadeInDown');
			$(b).addClass('fadeInUp');
			$(a).css('opacity', '1');
			$(b).css('opacity', '1');
			$(a).find('.before').css({
				'opacity': '1',
				'left': '-200px'
			});
			$(a).find('.after').css({
				'opacity': '1',
				'right': '-200px'
			});
		}
	}
	//	懒加载
	$("img.lazy").lazyload({
		effect: "fadeIn"
	});
})