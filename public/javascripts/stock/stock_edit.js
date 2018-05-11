layui.use(['form','layer','table','jquery','laydate'], function() {

 	var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        laydate = layui.laydate,
        layer = layui.layer;

        //选择供应商切换视图和渲染表格
        $('#selectSupplier_show').on('click', function() {
            fadeDiv("#stock_form","#supplier_select");
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
                 fadeDiv("#supplier_select","#stock_form",function(){
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

    $("#addFeeBtn").on("click",function(){
        addNewFeeItem();
    });

    var feeList = [];
    //增加成本费用
    var addNewFeeItem = function(){
        var id = "fee_item_"+new Date().getTime();
        var itemHtml = '<div class="layui-inline" id="'+id+'" name="'+id+'">'+
            '<label class="layui-form-label">费用种类：</label>'+
            '<div class="layui-input-inline" style="min-width: 100px;">'+
               '<select name="fee_select" id="'+id+'_select" lay-verify="" lay-filter="fee_select">'+
                '<option value="预付款">预付款</option>'+
               ' <option value="尾款">尾款</option>'+
                '<option value="增值税">增值税</option>'+
                '<option value="报关费">报关费</option>'+
                '<option value="物流费（国外）">物流费（国外）</option>'+
                '<option value="物流费（国内）">物流费（国内）</option>'+
                '<option value="海运费">海运费</option>'+
                '<option value="其他费用">其他费用</option>'+
             ' </select>'+
            '</div>'+
           ' <div class="layui-input-inline" style="width: 200px;">'+
                '<input type="text" name="fee_input" id="'+id+'_input" autocomplete="off" class="layui-input" placeholder="请输入金额（元）">'+
            '</div>'+
            '<div class="layui-form-label">'+
               '<button class="layui-btn layui-btn-xs layui-btn-danger" type="button" name="deleteFeeBtn"> <i class="layui-icon">&#xe640;</i>删除</button>'+
            '</div>'+
        '</div>';
        $("#fee_container").append(itemHtml);
        //添加HTML时需要重新渲染表单。
        form.render();
        feeList.push({
            id:id
        });
        //console.log(JSON.stringify(feeList));
    }
    //绑定删除事件
    $('body').on('click','button[name="deleteFeeBtn"]',function() {
        var tempArr = [];
        for(var i = 0; i < feeList.length ; i++){
          if(feeList[i].id != $(this).parent().parent().attr("id")){
              tempArr.push(feeList[i]);
          }
        }
        feeList = tempArr;
        //删除对象
        $(this).parent().parent().remove();
        //console.log(JSON.stringify(feeList));
        //删除后重新计算费用
        calculateFee();
        //刷新全局feeList
        refreshFeeList();
    });
    //绑定计算事件
    $('body').on("change",'input[name="fee_input"],input[name="stock_num_input"],input[name="storage_fee"]',function() {
        //录入结束计算费用
        calculateFee();
        //刷新全局feeList
        refreshFeeList();
        
    });
    form.on('select(fee_select)', function(data){
       //刷新全局feeList
        refreshFeeList();
    }); 
    //刷新全局feeList
    var refreshFeeList = function(){
        //将费用部分同步到feeList中方便外围获取数据
        $("input[name='fee_input']").each(function(){
            //统计每一个项目的录入并更新到数据对象
            var idSub = $(this).attr("id").split("_")[2];
            for(var i = 0; i < feeList.length ; i++){
                if(feeList[i].id == "fee_item_"+idSub){
                    feeList[i].type = $(this).parent().parent().find("select").val();
                    feeList[i].fee = $(this).val();
                }
            }
        });
        //console.log(feeList);
        //将data设置到浮层
        $("#fee_container").attr("data",JSON.stringify(feeList));
        //console.log(JSON.stringify(feeList));
    };
    //统计并显示费用
    var calculateFee = function(){
        //遍历所有费用项目并显示成本计算内容
        //表单验证对象
        var cvu = new CommonValidationUtils();
        var cu = new CommonUtils();
        //总成本计算
        var feeInputs = $("input[name='fee_input']");
        var total = 0;
        for(var i = 0 ; i< feeInputs.length ; i++){
            var fee = $(feeInputs[i]).val();
            if(cvu.isNumber(fee) || cvu.isDecimal(fee)){
                total = cu.floatAdd(total,fee);
            }else if(fee == "" || cvu.isNull()){
                total = cu.floatAdd(total,0);
            }else{
                total = "-元";
                $("#total_fee").html(total);
                return;
            }
        }
        //增加库存费
        var storage_fee = $("#storage_fee").val();
        //console.log(storage_fee);
        if(cvu.isNumber(storage_fee) || cvu.isDecimal(fee)){
            total = cu.floatAdd(total,storage_fee);
        }
        $("#total_fee").html(cu.formatMoney(total)+"元");
        //计算单品成本
        var box_num = $("#box_num").val();
        var plus_num = $("#plus_num").val();
        var format_num = $("#format_num").val();
        var wastage = $("#wastage").val();

        if(!cvu.isNull(box_num) && !cvu.isNull(plus_num) && !cvu.isNull(format_num) && !cvu.isNull(wastage)){
            //计算单品数量
            var num = cu.floatMul(box_num,format_num);
            num = cu.floatSub(num,wastage);
            var totalNum = cu.floatAdd(num,plus_num);
            $("#everage_fee").html(cu.formatMoney(cu.floatDiv(total,totalNum))+"元");
        }else{
            $("#everage_fee").html("-元");
        }
    }
});
