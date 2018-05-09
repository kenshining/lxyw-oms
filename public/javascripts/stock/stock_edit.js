layui.use(['form','layer','table','jquery'], function() {

 	var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        layer = layui.layer;

        //选择供应商切换视图和渲染表格
        $('#selectSupplier').on('click', function() {
            fadeDiv("#product_form","#supplier_select");
            //渲染供应商选择列表 
            table.render({
                elem: '#supplier_select_List'
                ,id: 'supplier_select_List'
                ,cellMinWidth: 200 //全局定义常规单元格的最小宽度，
                ,where:{
                    t: new Date().getTime()
                }
                //,url:'/user/user_findUserByPage'
                ,cols: [[
                  {type:'checkbox'}
                  ,{field:'name',  align:'center',title: '供货商名称'}
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
            //未完成选择前禁用外层保存按钮
            $('.layui-layer-btn0', parent.document).hide();
        });
        //供应商查询按钮，检索供应商
        $('#searchSelectSupplierBtn').on("click",function(){
            table.reload('supplier_select_List',{
              page: {
              curr: 1 //重新从第 1 页开始
              }
            ,where:{
                t: new Date().getTime(),
                supplierName:$('#supplierName').val()
            }
            ,loading:true
            });
        });
        //绑定监听按钮事件，处理点选供应商
        table.on('tool(supplier_select_List)', function(obj){
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
            //console.log(data);
            if(layEvent === 'selectSupplierBtn'){ //删除
                layer.msg(obj.data.id);
                 fadeDiv("#supplier_select","#product_form",function(){
                    //滚动到最底部，显示赋值。
                    $('html,body').animate({scrollTop:$("body").height()},'fast');
                    $("#supplier_select_input").val(obj.data.id);
                    //完成选择前启用外层保存按钮
                    $('.layui-layer-btn0', parent.document).show();
                });
                
            }
      });
    //切换显示DIV内容
    var fadeDiv = function(fadeOutId,fadeInId,callback){
        $(fadeOutId).fadeOut(50,function(){
            $(fadeInId).fadeIn(50,function(){
                if(typeof callback == "function"){
                    callback();
                }
            });
        });
    }
});
