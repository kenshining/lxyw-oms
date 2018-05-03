layui.config({
  base: '/layui/lay/modules/' //假设这是你存放拓展模块的根目录
}).use(['form','layer','btable','element'], function() {
	var $ = layui.jquery,
        form = layui.form(),
        supplier_table = layui.btable(),
        layer = layui.layer,
        element = layui.element;


       /* $('#add').on('click', function() {
            //打开弹出窗口加载内容
            var index = layer.open({
                    content: '/sales/sales_edit',
                    type: 2,
                    anim: 2, //动画类型
                    title: '编辑订单',
                    btn: ['保存', '取消'],
                    success: function(layero, index){
                        //console.log(layero, index);
                    }
                });
            //默认全屏显示
            layer.full(index);
        });*/
	
});