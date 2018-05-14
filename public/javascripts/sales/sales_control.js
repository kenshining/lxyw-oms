layui.use(['form','layer','element','jquery','table','laydate'], function() {
	var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        table = layui.table,
        laydate = layui.laydate,
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

        laydate.render({
          elem: 'input[name="sales_search_date"]'
          ,range: '到'
          ,format: 'yyyy-MM-dd'
        });

        table.render({
            elem: '#table_content'
            ,id: 'sales_bill_table'
            ,where:{
                t: new Date().getTime()
            }
            ,cols: [[
              {field:'batch', align:'center', title: '订单号'}
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

        table.on('tool(table_content)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        //console.log(data);
        if(layEvent === 'editOrderbtn'){ //编辑
            
        }else if(layEvent === 'editOrderbtn'){//删除

        }else{//订单履历

        }
  });
	
});