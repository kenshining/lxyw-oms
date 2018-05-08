layui.use(['form','layer','jquery','table','element'], function() {
	var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        element= layui.element,
        layer = layui.layer;
  //供应商联系人列表
  var contectList = [];
  //渲染静态表格
  table.init('contact_table');
  form.render();
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
              id:$('#tmp_add_id').val(),
              name:$('#tmp_add_name').val(),
              position:$('#tmp_add_position').val(),
              cellphoneNo:$('#tmp_add_cellphoneNo').val(),
              email:$('#tmp_add_email').val(),
              remark:$('#tmp_add_remark').val()
            }
            contectList.push(item);
            console.log(contectList);
            table.reload('contact_table',{
              data:contectList
            });
            layer.close(index);
          }
      });
  });

});