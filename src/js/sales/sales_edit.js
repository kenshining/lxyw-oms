layui.config({
  base: '/layui/lay/modules/' //假设这是你存放拓展模块的根目录
}).use(['form','layer','btable','element'], function() {
	var $ = layui.jquery,
        form = layui.form(),
        supplier_table = layui.btable(),
        layer = layui.layer,
        element = layui.element;
		form.on('select', function(data){
			$(data.elem).find("option:contains('"+data.value+"')").attr("selected",true);
		});
});