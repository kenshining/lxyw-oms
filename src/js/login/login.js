layui.use(['layer', 'form','jquery'], function() {
	var layer = layui.layer,
		$ = layui.jquery,
		form = layui.form;

	$("#loginBtn").on('click',function(data){
		var username = $("#username").val();
		var password = $("#password").val();
		if(username.trim() == "" || password.trim() == ""){
			layer.alert("用户名与密码不能为空", {icon: 2});
			return false;
		}
		$.ajax({
			url	:'/login',
			type:'POST',
			dataType:'json',
			data:{
				username:$("#username").val(),
				password:$("#password").val()
			},
			success:function(msg){
				if(msg.status){
					location.href='/main';
				}else{
					layer.alert(msg.msg, {icon: 2});
				}
				
			}

		});
		
		return false;
	});
});