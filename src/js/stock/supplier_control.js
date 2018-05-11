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
            }
        });
        //默认全屏显示
        layer.full(index);
            
    });

    table.render({
        elem: '#table_content'
        ,id: 'supplier_table'
        ,where:{
            t: new Date().getTime()
        }
        //,url:'/user/user_findUserByPage'
        ,cols: [[
          {field:'name',  align:'center',title: '供货商名称'}
          ,{field:'type',  align:'center',title: '供货商类别' ,templet: function(d){
              if(d.sex == '0'){
                return "公司客户";
              }else{
                return "个人客户";
              }
            }}
          ,{field:'email', align:'center', title: '邮件'}
          ,{field:'phone', align:'center', title: '联系电话'}
          ,{field:'location', align:'center', title: '供货商所属地区'}
          ,{fixed: 'right', align:'center',title: '操作', toolbar:'#table_control_bar'}
        ]]
        ,page: true
        ,loading:true
        ,limits:[10,20,50,90]
    });
    
});