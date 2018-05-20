//示例代码
layui.use(['layer','jquery','form','table','laydate'], function() {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        laydate = layui.laydate,
        layer = layui.layer;

        //检索库存数据
        $("#search").on("click",function(){
            var search_date = $('#stock_search_date').val();
            var start_date;
            var end_date;
            if(search_date != ""){
              start_date = search_date.split("_")[0];
              end_date = search_date.split("_")[1];
            }
            table.reload('stock_table',{
              page: {
                curr: 1 //重新从第 1 页开始
              }
            ,where:{
                t: new Date().getTime(),
                productName:$('#productName_search').val(),
                productStatus:$('#productStatus_search').val(),
                start_date:start_date,
                end_date:end_date
            }
            ,loading:true
            });
        });
        laydate.render({
          elem: 'input[name="stock_search_date"]'
          ,range: '-'
          ,format: 'yyyy-MM-dd'
        });
        //新增库存
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
                    },
                    yes:function(index,layero){
                      //创建保存库存数据
                      var dataForm = layer.getChildFrame('#stock_form', index);
                      var msg = validateSave(dataForm);
                      if(msg != ""){
                        //验证错误提示用户错误
                        layer.msg(msg);
                        return;
                      }
                      //提取费用细则数据
                      var feelist = $.parseJSON(dataForm.contents().find("#fee_container").attr("data"));
                      //提交数据
                       /*var loadIndex = layer.load(2);
                       $.post('/user/saveUser',{

                       },function(data, textStatus, jqXHR){
                            layer.close(loadIndex);
                            layer.close(index);
                            layer.msg("库存保存成功");
                            table.reload('stock_table');
                       },'json');*/
                    }
                });
                 //默认全屏显示
                layer.full(index);

        });

        table.render({
            elem: '#table_content'
            ,id: 'stock_table'
            ,url:'/stock/stock_findByPage'
            ,where:{
                t: new Date().getTime()
            }
            ,cols: [[
              {field:'productName',  align:'center',title: '品名'}
              ,{field:'qNo', align:'center', title: '条形码'}
              ,{field:'batch', align:'center', title: '批次'}
              ,{field:'location', align:'center', title: '产地'}
              ,{field:'location', align:'center', title: '规格'}
              ,{field:'location', align:'center', title: '供应商'}
              ,{field:'state',  align:'center',title: '库存状态' ,templet: function(d){

                  if(d.status == '0'){
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
    //保存验证存储数据
    var validateSave = function(dataForm){

      //验证输入框不能为空
      var cvu = new CommonValidationUtils();
      var emu = new CommonValidationEmu();

      var productName=dataForm.contents().find("input[name='productName']").val(),
          productBatch=dataForm.contents().find("input[name='productBatch']").val(),
          productDate=dataForm.contents().find("input[name='productDate']").val(),
          deadDate=dataForm.contents().find("input[name='deadDate']").val(),
          qno=dataForm.contents().find("input[name='qno']").val(),
          location=dataForm.contents().find("input[name='location']").val(),
          box_num=dataForm.contents().find("#box_num").val(),
          positon=dataForm.contents().find("select[name='positon']").val(),
          plus_num=dataForm.contents().find("#plus_num").val(),
          plusPosition=dataForm.contents().find("select[name='plusPosition']").val(),
          format_num=dataForm.contents().find("#format_num").val(),
          guaranteeTime=dataForm.contents().find("#guaranteeTime").val(),
          singleNetWeight=dataForm.contents().find("#singleNetWeight").val(),
          singleCapacity=dataForm.contents().find("#singleCapacity").val(),
          state=dataForm.contents().find("#state").val(),
          storage=dataForm.contents().find("#storage").val(),
          wastage=dataForm.contents().find("#wastage").val(),
          supplierId=dataForm.contents().find("#supplierId").val(),
          storage_fee=dataForm.contents().find("#storage_fee").val();
      //为空校验
      if(cvu.isNull(productName)
        || cvu.isNull(productBatch)
        || cvu.isNull(qno)
        || cvu.isNull(location)
        || cvu.isNull(box_num)
        || cvu.isNull(positon)
        || cvu.isNull(plus_num)
        || cvu.isNull(plusPosition)
        || cvu.isNull(format_num)
        || cvu.isNull(guaranteeTime)
        || cvu.isNull(singleNetWeight)
        || cvu.isNull(singleCapacity)
        || cvu.isNull(wastage)
        || cvu.isNull(productDate)
        || cvu.isNull(deadDate)
        //|| cvu.isNull(supplierId)
        || cvu.isNull(storage_fee)){
        return emu.errorMsg.all_not_null;
      }
      //验证feeList项目是否都填写数据
      var feelist = $.parseJSON(dataForm.contents().find("#fee_container").attr("data"));
      for(var i = 0; i < feelist.length ; i++ ){
        if(cvu.isNull(feelist[i].fee)){
          return "未设置["+feelist[i].type+"],若无需保存此项，请删除。";
        }
        if(cvu.isNumber(feelist[i].fee) || cvu.isDecimal(feelist[i].fee)){
        }else{
          return "["+feelist[i].type+"],要求输入数字。";
        }
      }

      return "";
    }

});