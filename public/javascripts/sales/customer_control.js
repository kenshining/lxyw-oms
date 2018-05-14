layui.use(['form','layer','element','jquery','table'], function() {
	var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        table = layui.table,
        element = layui.element;

        $('#add').on('click', function() {
            //打开弹出窗口加载内容
            var index = layer.open({
                    content: '/sales/customer_edit',
                    type: 2,
                    anim: 2, //动画类型
                    title: '编辑客户信息',
                    btn: ['保存', '取消'],
                    success: function(layero, index){
                        //console.log(layero, index);
                    },
                    yes:function(index,layero){
                      //创建保存库存数据
                      var dataForm = layer.getChildFrame('#customer_form', index);
                      //var msg = validateSave(dataForm);
                      /*if(msg != ""){
                        //验证错误提示用户错误
                        layer.msg(msg);
                        return;
                      }*/
                      //提取费用细则数据
                      var cutList = $.parseJSON(dataForm.contents().find("#cus_table_container").attr("data"));
                      //console.log(cutList);
                      //提交数据
                      var loadIndex = layer.load(2);
                       $.post('/sales/customer_save',{
                            customerName:dataForm.contents().find("#customer_name").val(),
                            customerType:dataForm.contents().find("#customer_type").val(),
                            customerCellphone:dataForm.contents().find("#customer_cellphone").val(),
                            customerEmail:dataForm.contents().find("#customer_email").val(),
                            customerAddress:dataForm.contents().find("#customer_address").val(),
                            customerRmarks:dataForm.contents().find("#customer_remarks").val(),
                            custlist:JSON.stringify(cutList)
                       },function(data, textStatus, jqXHR){
                            layer.close(loadIndex);
                            if(data.code == 0){
                                layer.close(index);
                                layer.msg("客户信息成功");
                                table.reload('customer_search_table');
                            }else{
                                layer.msg("保存失败："+data.message);
                            }
                            
                       },'json');
                    }
                });
            //默认全屏显示
            layer.full(index);
        });

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
              ,{field:'customerEmail', align:'center', title: 'Email'}
              ,{field:'customerAddress', align:'center', title: '客户地址'}
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
                    customerCellphone:$("#cust_search_cellphont").val(),
                    customerType:$("#cust_search_type").val()
                }
             });
        });
        
	
});