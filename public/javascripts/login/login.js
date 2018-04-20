layui.use(['layer', 'form'], function() {
	var layer = layui.layer,
		$ = layui.jquery,
		form = layui.form();
		
	form.on('submit(login)',function(data){
		location.href='/main';
		return false;
	});
});