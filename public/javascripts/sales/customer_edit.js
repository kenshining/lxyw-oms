layui.use(['form','layer','table','jquery','element'], function() {
	var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        table = layui.table,
        element = layui.element;

    //采购联系人列表
  var cusList = [];
  //渲染静态表格
  table.render({
        elem: '#cus_table_container'
        ,id: 'cus_table'
        ,page:false
        ,data:cusList
        ,cols:[[
           {field:'name',  align:'center',title: '姓名'}
          ,{field:'cellphoneNo',  align:'center',title: '移动电话'}
          ,{field:'email',  align:'center',title: 'Email'}
          ,{field:'address',  align:'center',title: '地址'}
          ,{align:'center',title: '操作', toolbar:'#table_control_bar'}
        ]]
        ,loading:true
  });
  form.render();
  table.reload('cus_table');
    $("#addNewCusBtn").on('click',function(){
        //新增联系人
        layer.open({
            content: $("#addCustom").html(),
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
                cellphoneNo:$('#tmp_add_cellphoneNo').val(),
                email:$('#tmp_add_email').val(),
                address:$('#tmp_add_address').val()
              }
              //判断属性都不能为空
              if(item.name == "" || 
                item.address == "" ||
                item.cellphoneNo == "" ||
                item.email == "" ){
                layer.msg("字段[姓名、地址、电话、email]均不能为空。");
                return;
              }
              cusList.push(item);
              table.reload('cus_table',{
                data:cusList
              });
              layer.close(index);
            },
            end:function(){
              //完成选择前启用外层保存按钮
              $('.layui-layer-btn0', parent.document).show();
            }
        });
    
    });

    table.on('tool(cus_table_container)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        //console.log(data);
        if(layEvent === 'deletCusbtn'){ //删除
            
            var tempArr = [];
            for(var i = 0; i < cusList.length ; i++){
              if(cusList[i].id != obj.data.id){
                  tempArr.push(cusList[i]);
              }
            }
            table.reload('cus_table',{
              data:tempArr
            });
            cusList = tempArr;
        }
  });
});