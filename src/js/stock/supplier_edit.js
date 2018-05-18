layui.use(['form','layer','jquery','table','element'], function() {
	var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        element= layui.element,
        layer = layui.layer;
  //供应商联系人列表
  var contectList = [];
  //如果是修改，则页面加载完成后需要初始化采购人列表数据
  if($("#individualLink").length > 0){
      var individualLink = $.parseJSON($("#individualLink").val());
      for(var i = 0 ; i <individualLink.length ; i++){ 
         var item = {
              id:individualLink[i].id,
              name:individualLink[i].name,
              position:individualLink[i].position,
              cellphone:individualLink[i].cellphone,
              remark:individualLink[i].remark,
              email:individualLink[i].email
         }
         contectList.push(item);
      }
      JSON.stringify(JSON.stringify(contectList));
      //设置待提交设局
      $("#contact_table_container").attr("data",JSON.stringify(contectList));
      table.reload('contact_table',{
        data:contectList
      });

  }
  //渲染静态表格
  table.render({
        elem: '#contact_table_container'
        ,id: 'contact_table'
        ,page:false
        ,data:contectList
        ,cols:[[
           {field:'name', minWidth:'120', align:'center',title: '姓名'}
          ,{field:'position', minWidth:'120',  align:'center',title: '职位'}
          ,{field:'cellphone', minWidth:'120',  align:'center',title: '移动电话'}
          ,{field:'email', minWidth:'240',  align:'center',title: 'Email'}
          ,{field:'remark', minWidth:'240',  align:'center',title: '备注'}
          ,{align:'center',minWidth:'120', title: '操作', toolbar:'#table_control_bar'}
        ]]
        ,loading:true
  });
  form.render();
  table.reload('contact_table');
  $("#addNewConnectorBtn").on("click",function(){
      layer.open({
          content: $("#addContect").html(),
          type: 1,
          anim: 2, //动画类型
          title: '编辑联系人',
          btn: ['保存', '取消'],
          skin: 'layui-layer-rim', //加上边框
          area: ['500px', '90%'], //宽高
          success:function(){
            //未完成选择前禁用外层保存按钮
            $('.layui-layer-btn0', parent.document).hide();
          },
          yes:function(index, layero){
            var item = {
              id:new Date().getTime(),
              name:$('#tmp_add_name').val(),
              position:$('#tmp_add_position').val(),
              cellphone:$('#tmp_add_cellphoneNo').val(),
              email:$('#tmp_add_email').val(),
              remark:$('#tmp_add_remark').val()
            }
            //判断属性都不能为空
            if(item.name == "" || 
              item.position == "" ||
              item.cellphone == "" ||
              item.email == "" ){
              layer.msg("字段[姓名、职位、电话、email]均不能为空。");
              return;
            }
            contectList.push(item);
            $("#contact_table_container").attr("data",JSON.stringify(contectList));
            table.reload('contact_table',{
              data:contectList
            });
            layer.close(index);
          },
          end:function(){
            //完成选择前启用外层保存按钮
            $('.layui-layer-btn0', parent.document).show();
          }
      });
  });

  table.on('tool(contact_table_container)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        //console.log(data);
        if(layEvent === 'deletContect'){ //删除
            
            var tempArr = [];
            for(var i = 0; i < contectList.length ; i++){
              if(contectList[i].id != obj.data.id){
                  tempArr.push(contectList[i]);
              }
            }
            table.reload('contact_table',{
              data:tempArr
            });
            contectList = tempArr;
            $("#contact_table_container").attr("data",JSON.stringify(contectList));
        }
  });

});