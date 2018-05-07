layui.use(['table','layer','element','jquery'], function() {
    var table = layui.table,
    layer = layui.layer,
    element = layui.element,
    $ = layui.jquery;

    table.render({
        elem: '#table_content'
        ,id: 'user_table'
        ,where:{
            t: new Date().getTime(),
            username:$('#username').val(),
            name:$('#name').val(),
            cellphoneNo:$('#cellphoneNo').val()
        }
        ,url:'/user/user_findUserByPage'
        ,cols: [[
          {type:'checkbox'}
          ,{field:'username',  align:'center',title: '用户名'}
          ,{field:'name', align:'center', title: '姓名'}
          ,{field:'sex',  align:'center',title: '性别' ,templet: function(d){
              
              if(d.sex == 'F'){
                return "女";
              }else{
                return "男";
              }


            }}
          ,{field:'cellphoneNo', align:'center', title: '手机号'}
          ,{field:'birthdayStr', align:'center', title: '生日'}
          ,{fixed: 'right', align:'center',title: '操作', toolbar:'#table_control_bar'}
        ]]
        ,page: true
        ,loading:true
        ,limits:[10,20,50,90]
    });

    //检索用户数据
    $("#search").on("click",function(){
        table.reload('user_table',{
          page: {
          curr: 1 //重新从第 1 页开始
          }
        ,where:{
            t: new Date().getTime(),
            username:$('#username').val(),
            name:$('#name').val(),
            cellphoneNo:$('#cellphoneNo').val()
        }
        ,loading:true
        });
    });
    //添加用户使用
    $("#add").on("click",function(){
       var index = layer.open({
            content: '/user/user_edit',
            type: 2,
            anim: 2, //动画类型
            title: '新增用户信息',
            btn: ['新增', '取消'],
            skin: 'layui-layer-rim', //加上边框
            area: ['500px', '400px'], //宽高
            success: function(layero, index){
                //console.log(layero, index);
            },
            yes: function(index,layero){
               var dataForm = layer.getChildFrame('form', index);
               //dataForm.contents().find("input[name='username']").val()
               var loadIndex = layer.load(2);
               $.post('/user/saveUser',{
                username:dataForm.contents().find("input[name='username']").val(),
                sex:dataForm.contents().find("select[name='sex']").val(),
                email:dataForm.contents().find("input[name='email']").val(),
                idcardNo:dataForm.contents().find("input[name='idcardNo']").val(),
                birthday:dataForm.contents().find("input[name='birthday']").val(),
                cellphoneNo:dataForm.contents().find("input[name='cellphoneNo']").val(),
                wechat:dataForm.contents().find("input[name='wechat']").val(),
                postCode:dataForm.contents().find("input[name='postCode']").val(),
                address:dataForm.contents().find("textarea[name='address']").val()
               },function(data, textStatus, jqXHR){
                    layer.close(loadIndex);
                    layer.close(index);
                    layer.msg("用户数据保存成功");

               },'json');
            }
        });
    });
    //监听工具条
    table.on('tool(user_table_filter)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if(layEvent === 'del'){ //删除
            layer.confirm("确认要删除用户吗？",{
                icon: 4
                ,title:'删除'
                ,btn : [ '删除', '取消' ]//按钮
            },function(index){
                 layer.close(index);
                 var loadIndex = layer.load(2);
                 layer.close(loadIndex);
                 alert(data.id);
                 table.reload('user_table');
            });
        }else if (layEvent === 'edit'){//编辑
            //打开编辑窗口
            var index = layer.open({
                content: '/user/user_edit?id='+data.id,
                type: 2,
                anim: 2, //动画类型
                title: '编辑客户信息',
                btn: ['保存', '取消'],
                skin: 'layui-layer-rim', //加上边框
                area: ['500px', '400px'], //宽高
                success: function(layero, index){
                    //console.log(layero, index);
                },
                yes: function(index,layero){
                   var dataForm = layer.getChildFrame('form', index);
                   //dataForm.contents().find("input[name='username']").val()
                   var loadIndex = layer.load(2);
                   $.post('/user/saveUser',{
                    id:dataForm.contents().find("input[name='id']").val(),
                    username:dataForm.contents().find("input[name='username']").val(),
                    sex:dataForm.contents().find("select[name='sex']").val(),
                    email:dataForm.contents().find("input[name='email']").val(),
                    idcardNo:dataForm.contents().find("input[name='idcardNo']").val(),
                    birthday:dataForm.contents().find("input[name='birthday']").val(),
                    cellphoneNo:dataForm.contents().find("input[name='cellphoneNo']").val(),
                    wechat:dataForm.contents().find("input[name='wechat']").val(),
                    postCode:dataForm.contents().find("input[name='postCode']").val(),
                    address:dataForm.contents().find("textarea[name='address']").val()
                   },function(data, textStatus, jqXHR){
                        layer.close(loadIndex);
                        layer.close(index);
                        layer.msg("用户数据保存成功");

                   },'json');
                }
            });
        }
    });
    
});