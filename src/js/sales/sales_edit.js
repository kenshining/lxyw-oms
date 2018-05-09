layui.use(['form','layer','table','element'], function() {
	var $ = layui.jquery,
        form = layui.form,
        supplier_table = layui.table,
        layer = layui.layer,
        element = layui.element;
		form.on('select', function(data){
			$(data.elem).find("option:contains('"+data.value+"')").attr("selected",true);
		});
});