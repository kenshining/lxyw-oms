//示例代码
layui.use(['layer','jquery','form','table'], function() {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        layer = layui.layer;

        $('#add').on('click', function() {
            //打开弹出窗口加载内容
            var index = layer.open({
                    content: '/stock/stock_edit',
                    type: 2,
                    anim: 4, //动画类型
                    title: '编辑库存',
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
            ,id: 'stock_table'
            ,where:{
                t: new Date().getTime()
            }
            ,cols: [[
              {type:'checkbox'}
              ,{field:'productName',  align:'center',title: '品名'}
              ,{field:'qNo', align:'center', title: '条形码'}
              ,{field:'batch', align:'center', title: '批次'}
              ,{field:'location', align:'center', title: '产地'}
              ,{field:'location', align:'center', title: '规格'}
              ,{field:'location', align:'center', title: '供应商'}
              ,{field:'state',  align:'center',title: '库存状态' ,templet: function(d){

                  if(d.sex == 'F'){
                    return "女";
                  }else{
                    return "男";
                  }

                }}
              ,{fixed: 'right', align:'center',title: '操作', toolbar:'#table_control_bar'}
            ]]
            ,page: true
            ,loading:true
            ,limits:[10,20,50,90]
        });

});