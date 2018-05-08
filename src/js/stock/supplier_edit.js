layui.use(['form','layer','jquery','table','element'], function() {
	var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        element= layui.element,
        layer = layui.layer;
  //供应商联系人列表
  var contectList = [];
  //渲染静态表格
  table.render({
        elem: '#contact_table_container'
        ,id: 'contact_table'
        ,page:false
        ,data:contectList
        ,cols:[[
           {field:'name',  align:'center',title: '姓名'}
          ,{field:'position',  align:'center',title: '职位'}
          ,{field:'cellphoneNo',  align:'center',title: '移动电话'}
          ,{field:'email',  align:'center',title: 'Email'}
          ,{field:'remark',  align:'center',title: '备注'}
          ,{align:'center',title: '操作', toolbar:'#table_control_bar'}
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
          yes:function(index, layero){
            var item = {
              id:new Date().getTime(),
              name:$('#tmp_add_name').val(),
              position:$('#tmp_add_position').val(),
              cellphoneNo:$('#tmp_add_cellphoneNo').val(),
              email:$('#tmp_add_email').val(),
              remark:$('#tmp_add_remark').val()
            }
            contectList.push(item);
            table.reload('contact_table',{
              data:contectList
            });
            layer.close(index);
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
        }
  });

});