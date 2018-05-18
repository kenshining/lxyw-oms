layui.use(['layer', 'form','jquery'], function() {
	var layer = layui.layer,
		$ = layui.jquery,
		form = layui.form;
		//判断是否存在记录的用户名如果存在则填入表单
		var localremeberedUser = layui.data('user');
		if(localremeberedUser != null){
			var username = localremeberedUser.username;
			$("#username").val(username);
		}

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
					//验证成功后保留用户名
					if($("#rememberMe").attr("checked") == true){
						layui.data('user',{
							username:$("#username").val()
						});
					}
					
					location.href='/main';
				}else{
					layer.alert(msg.msg, {icon: 2});
				}
				
			}

		});
		
		return false;
	});
});