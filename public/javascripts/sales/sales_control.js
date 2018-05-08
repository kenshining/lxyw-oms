layui.use(['form','layer','element','jquery','table'], function() {
	var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        table = layui.table,
        element = layui.element;

        $('#add').on('click', function() {
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
        });

        table.render({
            elem: '#table_content'
            ,id: 'stock_table'
            ,where:{
                t: new Date().getTime()
            }
            ,cols: [[
              {type:'checkbox'}
              ,{field:'batch', align:'center', title: '订单号'}
              ,{field:'name',  align:'center',title: '客户名称'}
              ,{field:'qNo', align:'center', title: '客户类别'}
              ,{field:'location', align:'center', title: '总价'}
              ,{field:'location', align:'center', title: '订单状态'}
              ,{fixed: 'right', align:'center',title: '操作', toolbar:'#table_control_bar'}
            ]]
            ,page: true
            ,loading:true
            ,limits:[10,20,50,90]
        });
	
});