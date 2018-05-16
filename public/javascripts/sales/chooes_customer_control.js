layui.use(['form','layer','element','jquery','table'], function() {
	
	var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        table = layui.table,
        element = layui.element;


    table.render({
        elem: '#table_content'
        ,id: 'customer_search_table'
        ,url:'/sales/customer_findByPage'
        ,where:{
            t: new Date().getTime(),
            customerName:$("#cust_search_name").val(),
            customerCellphone:$("#cust_search_cellphone").val(),
            customerType:$("#cust_search_type").val()
        }
        ,cols: [[
          {field:'customerName',  align:'center',title: '客户名称'}
          ,{field:'customerType', align:'center', title: '客户类别'}
          ,{field:'customerCellphone', align:'center', title: '客户电话'}
          ,{field:'customerEmail', align:'left', title: 'Email'}
          ,{field:'customerAddress', align:'left', title: '客户地址'}
          ,{fixed: 'right', align:'center',title: '操作', toolbar:'#table_control_bar'}
        ]]
        ,page: true
        ,loading:true
        ,limits:[10,20,50,90]
    });

    $('#search').on('click', function() {
         table.reload('customer_search_table',{
            where:{
                t: new Date().getTime(),
                customerName:$("#cust_search_name").val(),
                customerCellphone:$("#cust_search_cellphone").val(),
                customerType:$("#cust_search_type").val()
            }
         });
    });

     //监听工具条
    table.on('tool(cust_table_filter)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if(layEvent === 'select'){ 
        	//选择客户信息
        	$(window.parent.document.getElementById("customer_name")).val(obj.data.customerName);
        	//TODO 处理选择后事件
        	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
			parent.layer.close(index); //再执行关闭 
        }
    });
});