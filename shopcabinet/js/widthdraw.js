$(function() {
	//	选择提现时手风琴效果
	$('.withdraw div').click(function() {
		if($(this).index() == 0) {
			$(this).siblings('.withdraw_right').css({
				'left': '80%'
			});
		} else if($(this).index() == 1) {
			$(this).css({
				'left': '20%'
			});
		}
	})
	//	提交	
	var i=0;
	var j=0;
	$('button').click(function() {
		if($('input[name="pay"]:checked').val() == "wechat") {
			if(i>0){
				alert("您已经提过现了，不能重复提交");
				return false;
			}else if(wepayAmount - wepayAuxiliary >= 1) {
				withdraw(urlWepay);
				i++;
			}else {
				alert("可提取金额不能低于1元！");
				return false;
			}
		} else if($('input[name="pay"]:checked').val() == "alipay") {
			if(j>0){
				alert("您已经提过现了，不能重复提交");
			}else if(alipayAmount - alipayAuxiliary >= 1) {
					withdraw(urlAlipay);
					j++;
				} else {
					alert("可提取金额不能低于1元！")
				}
		} else {
			alert("请确认是否已勾选！")
		}

	})

	function withdraw(url) {		
		$.ajax({
			type: "post",
			contentType: "application/json;charset=utf-8;",
			url: url,
			data: JSON.stringify({}),
			async: false,
			success: function(data) {
				if(data.errorCode == 0){
					alert('提现成功！')
				}else{
					alert(data.errorMessage);					
				}
			},
			error: function(xhr, textStatus, errMsg) {
				alert("异常");
				$('.submit').attr('disabled', false);
			}
		});
	}
})