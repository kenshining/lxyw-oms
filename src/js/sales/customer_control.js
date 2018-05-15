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
                      var msg = validateSave(dataForm);
                      if(msg != ""){
                        //验证错误提示用户错误
                        layer.msg(msg);
                        return;
                      }
                      //提取采购联系人
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
        if(layEvent === 'del'){ //删除
            layer.confirm("确认要删除客户信息和联系人吗？",{
                icon: 4
                ,title:'删除'
                ,btn : [ '删除', '取消' ]//按钮
            },function(index){
                //关闭提示删除窗口
                 layer.close(index);
                 //显示加载层
                 var loadIndex = layer.load(2);
                 
                $.post('/sales/customer_delete',{
                  id:data.id,
                  t: new Date().getTime()
                 },function(data, textStatus, jqXHR){
                    layer.close(loadIndex);
                    if(data.code == 0){
                        layer.close(index);
                        layer.msg("客户与联系人数据已删除！");
                        table.reload('customer_search_table');
                    }else{
                        layer.msg("保存失败："+data.message);
                    }
                     
                 },'json');
            });
        }else if (layEvent === 'edit'){//编辑
            //打开编辑窗口
            var index = layer.open({
                content: '/sales/customer_edit?id='+data.id,
                type: 2,
                anim: 2, //动画类型
                title: '编辑客户信息',
                btn: ['保存', '取消'],
                success: function(layero, index){
                    
                },
                yes: function(index,layero){
                   var dataForm = layer.getChildFrame('form', index);
                   //dataForm.contents().find("input[name='username']").val()
                   //进行必要验证
                   var msg = saveValidate(dataForm);
                   if(msg != ''){
                    layer.msg(msg);
                    return;
                   }
                   //取不到ID使用逐层查找的方式找ID
                   //var id = $(layero).find("iframe")[0].contentWindow.document.getElementById("user_id").value;
                   //提取采购联系人
                   var cutList = $.parseJSON(dataForm.contents().find("#cus_table_container").attr("data"));
                   var loadIndex = layer.load(2);
                   $.post('/sales/customer_save',{
                    id:data.id,
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
        }
    });

    //添加和修改验证
    var saveValidate = function(dataForm){
      var cutList = $.parseJSON(dataForm.contents().find("#cus_table_container").attr("data")),
      customerName=dataForm.contents().find("#customer_name").val(),
      customerType=dataForm.contents().find("#customer_type").val(),
      customerCellphone=dataForm.contents().find("#customer_cellphone").val(),
      customerEmail=dataForm.contents().find("#customer_email").val(),
      customerAddress=dataForm.contents().find("#customer_address").val(),
      customerRmarks=dataForm.contents().find("#customer_remarks").val();

      //验证输入框不能为空
      var cvu = new CommonValidationUtils();
      var emu = new CommonValidationEmu();

      //为空校验
      if(cvu.isNull(customerName) 
        || cvu.isNull(customerType) 
        || cvu.isNull(customerCellphone) 
        || cvu.isNull(customerRmarks) 
        || cvu.isNull(customerAddress) 
        || cvu.isNull(customerEmail) ){
        return emu.errorMsg.all_not_null;
      }
      //收货联系人必须填写
      if(cutList.length <= 0 ){
        return "必须设置一位[采购联系人]";
      }
      return "";
    }
	
});