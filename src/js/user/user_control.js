layui.use(['table','jquery'], function() {
    var table = layui.table,
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
          ,{field:'username', title: '用户名'}
          ,{field:'name', title: '姓名'}
          ,{field:'sex', title: '性别' ,templet: function(d){
              
              if(d.sex == 'F'){
                return "女";
              }else{
                return "男";
              }


            }}
          ,{field:'cellphoneNo', title: '手机号'}
          ,{field:'birthdayStr', title: '生日'}
        ]]
        ,page: true
    });

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
        });
    });
    
});