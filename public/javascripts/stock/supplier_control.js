layui.use(['form','layer','jquery','table'], function() {
	var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        layer = layui.layer;
	//绑定新增事件
	$('#add').on('click', function() {
        //打开弹出窗口加载内容
       var index = layer.open({
            content: '/stock/supplier_edit',
            type: 2,
            anim: 4, //动画类型
            title: '编辑供货商',
            btn: ['保存', '取消'],
            success: function(layero, index){
                //console.log(layero, index);
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
                   var individualLink = $.parseJSON(dataForm.contents().find("#contact_table_container").attr("data"));
                   var loadIndex = layer.load(2);
                   $.post('/stock/supplier_save',{
                    supplierName:dataForm.contents().find("#supplierName").val(),
                    supplierType:dataForm.contents().find("#supplierType").val(),
                    supplierEmail:dataForm.contents().find("#supplierEmail").val(),
                    supplierLocation:dataForm.contents().find("#supplierLocation").val(),
                    supplierCellphone:dataForm.contents().find("#supplierCellphone").val(),
                    supplierAddress:dataForm.contents().find("#supplierAddress").val(),
                    supplierRemark:dataForm.contents().find("#supplierRemark").val(),
                    individualLink:JSON.stringify(individualLink)
                   },function(data, textStatus, jqXHR){
                        layer.close(loadIndex);
                        if(data.code == 0){
                            layer.close(index);
                            layer.msg("供应商信息成功");
                            table.reload('supplier_table');
                        }else{
                            layer.msg("保存失败："+data.message);
                        }
                   },'json');
                }
        });
        //默认全屏显示
        layer.full(index);
    });

    //检索库存数据
    $("#search").on("click",function(){
        table.reload('supplier_table',{
          page: {
            curr: 1 //重新从第 1 页开始
          }
        ,where:{
            t: new Date().getTime(),
            supplierName:$('#supplierNameSearch').val()
        }
        ,loading:true
        });
    });

    table.render({
        elem: '#table_content'
        ,id: 'supplier_table'
        ,where:{
            t: new Date().getTime(),
            supplierName:$("#supplierNameSearch").val()
        }
        ,url:'/stock/supplier_findByPage'
        ,cols: [[
          {field:'supplierName',  align:'center',title: '供货商名称'}
          ,{field:'supplierType',  align:'center',title: '供货商类别' ,templet: function(d){
              if(d.supplierType == '0'){
                return "公司客户";
              }else{
                return "个人客户";
              }
            }}
          ,{field:'supplierEmail', align:'center', title: '邮件'}
          ,{field:'supplierCellphone', align:'center', title: '联系电话'}
          ,{field:'supplierLocation', align:'center', title: '供货商所属地区'}
          ,{fixed: 'right', align:'center',title: '操作', toolbar:'#table_control_bar'}
        ]]
        ,page: true
        ,loading:true
        ,limits:[10,20,50,90]
    });

     //监听工具条
    table.on('tool(supplier_table_filter)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if(layEvent === 'edit'){
          var index = layer.open({
                content: '/stock/supplier_edit?id='+data.id,
                type: 2,
                anim: 2, //动画类型
                title: '编辑供应商信息',
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
                   var individualLink = $.parseJSON(dataForm.contents().find("#contact_table_container").attr("data"));
                   var loadIndex = layer.load(2);
                   $.post('/stock/supplier_save',{
                    id:data.id,
                    supplierName:dataForm.contents().find("#supplierName").val(),
                    supplierType:dataForm.contents().find("#supplierType").val(),
                    supplierEmail:dataForm.contents().find("#supplierEmail").val(),
                    supplierLocation:dataForm.contents().find("#supplierLocation").val(),
                    supplierCellphone:dataForm.contents().find("#supplierCellphone").val(),
                    supplierAddress:dataForm.contents().find("#supplierAddress").val(),
                    supplierRemark:dataForm.contents().find("#supplierRemark").val(),
                    individualLink:JSON.stringify(individualLink)
                   },function(data, textStatus, jqXHR){
                        layer.close(loadIndex);
                        if(data.code == 0){
                            layer.close(index);
                            layer.msg("供应商信息成功");
                            table.reload('supplier_table');
                        }else{
                            layer.msg("保存失败："+data.message);
                        }
                   },'json');
                }
            });
            //默认全屏显示
            layer.full(index);


        }else if(layEvent === 'del'){

          layer.confirm("确认要删除供应商和相关联系人吗？",{
                icon: 4
                ,title:'删除'
                ,btn : [ '删除', '取消' ]//按钮
            },function(index){
                //关闭提示删除窗口
                 layer.close(index);
                 //显示加载层
                 var loadIndex = layer.load(2);
                $.post('/stock/supplier_delete',{
                  id:data.id,
                  t: new Date().getTime()
                 },function(data, textStatus, jqXHR){
                    layer.close(loadIndex);
                    if(data.code == 0){
                        layer.close(index);
                        layer.msg("供应商与联系人数据已删除！");
                        table.reload('supplier_table');
                    }else{
                        layer.msg("删除失败："+data.message);
                    }

                 },'json');
            });

        }
    });

    //保存验证
    var saveValidate = function(dataForm){
      
      var supplierName=dataForm.contents().find("#supplierName").val(),
      supplierType=dataForm.contents().find("#supplierType").val(),
      supplierEmail=dataForm.contents().find("#supplierEmail").val(),
      supplierLocation=dataForm.contents().find("#supplierLocation").val(),
      supplierCellphone=dataForm.contents().find("#supplierCellphone").val(),
      supplierAddress=dataForm.contents().find("#supplierAddress").val(),
      supplierRemark=dataForm.contents().find("#supplierRemark").val();
      //验证输入框不能为空
      var cvu = new CommonValidationUtils();
      var emu = new CommonValidationEmu();

      //为空校验
      if(cvu.isNull(supplierName)
        || cvu.isNull(supplierEmail)
        || cvu.isNull(supplierLocation)
        || cvu.isNull(supplierCellphone)
        || cvu.isNull(supplierAddress)
        || cvu.isNull(supplierRemark) ){
        return emu.errorMsg.all_not_null;
      }
      var indata = dataForm.contents().find("#contact_table_container").attr("data");
      if(indata == null || indata == ""){
        return "必须设置一位[供应商联系人]";
      }
      var individualLink = $.parseJSON(dataForm.contents().find("#contact_table_container").attr("data"));
      //收货联系人必须填写
      if(individualLink.length <= 0 ){
        return "必须设置一位[供应商联系人]";
      }
      return "";
    }

});