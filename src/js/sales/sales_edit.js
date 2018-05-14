layui.use(['form','layer','table','element'], function() {
	var $ = layui.jquery,
        form = layui.form,
        supplier_table = layui.table,
        layer = layui.layer,
        element = layui.element;

	//商品列表数据对象
	var productList = [];
	//添加商品列表
	$("#addProductBtn").on("click",function(){
		createNewSalesItem();
	});
	//删除商品列表
	$("#deleteProductBtn").on("click",function(){
		deleteSalesItem();
	});
	//监听优惠选择
	form.on('select(discount_type)', function(data){
	  //分解ID用于处理input显示
	  var id = $(data.elem).attr("id");
	  var subId = id.split("_")[2];
	  var inputText = $("#product_item_"+subId+"_discount_value");
	  inputText.removeClass("layui-disabled");
	  inputText.val("");
	  //根据不同的优惠显示不同的内容
	  if(data.value == 1){
	  	//折扣优惠
	  	inputText.attr("placeholder","请输入折扣额度，如：9.5");

	  }else if(data.value == 2){
	  	//抹零优惠
	  	inputText.attr("placeholder","请输入抹零后总价");
	  }else if(data.value == 3){
	  	//免单
	  	inputText.attr("placeholder","免费");
	  	inputText.addClass("layui-disabled");
	  }else{
	  	//无优惠
	  	inputText.attr("placeholder","无优惠");
	  	inputText.addClass("layui-disabled");
	  }
	  //刷新列表内容
	  refreshProductList();

	});
	//监听所有product_item_ input变化，更新产品列表。
	$('body').on("change",'input[name="product_list_input"]',function() {
        //刷新列表内容
	  	refreshProductList();
	  	//计算优惠价格和总价
    });

	//新增销售产品条目
	var createNewSalesItem = function(item){

		var id = "product_item_"+new Date().getTime();
		//将商品列表增加
		productList.push({
			id:id
		});

		var html='<tr name="'+id+'">'+
		      '<td rowspan="2" align="center" valign="middle">'+
				'<input type="checkbox" name="product_Check" lay-skin="primary" value="'+id+'">'+
		      '</td>'+
		      '<td>日本透明奶茶</td>'+
		      '<td>4200340</td>'+
		      '<td nowrap="nowrap">瓶装500ml*24/箱</td>'+
		      '<td>日本|24个月|34kg/箱|0.1M3/箱</td>'+
		      '<td>'+
		      	'<input type="text" name="product_list_input" id="'+id+'_single_price" autocomplete="off" class="layui-input" placeholder="单品金额（元）">'+
		      '</td>'+
		      '<td>'+
		      	'<input type="text" name="product_list_input" id="'+id+'_count" autocomplete="off" class="layui-input" placeholder="订购数量（箱）">'+
		      '</td>'+
		      '<td>'+
		      	'<input type="text" name="product_list_input" id="'+id+'_present" autocomplete="off" class="layui-input" placeholder="搭赠量（件）">'+
		      '</td>'+
		    '</tr>'+
		    '<tr name="'+id+'" style="background-color:rgb(250, 255, 189);">'+
		      '<td>'+
		      '<select name="discount_type" lay-verify="" id="'+id+'_discount_type" lay-filter="discount_type">'+
	              '<option value="0" selected="true">无优惠</option>'+
	              '<option value="1">折扣优惠</option>'+
	              '<option value="2">抹零优惠</option>'+
	              '<option value="3">免单</option>'+
	            '</select>'+
	          '</td>'+
		      '<td>'+
		      	'<input type="text" name="product_list_input" id="'+id+'_discount_value" autocomplete="off" class="layui-input layui-disabled" placeholder="无优惠">'+
		      '</td>'+
		      '<td colspan="5">单品类总价（元）：<em class="highlight">454.22</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;优惠后总价（元）：<em class="highlight">532.9</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;优惠金额（元）：<em class="highlight">532.9</em>'+
		      '</td>'+
		    '</tr>';
		$("#productListTable tr:first").before(html);
		form.render();
	}
	//删除商品列表
	var deleteSalesItem = function(){
		$("input[name='product_Check']:checkbox:checked").each(function(){
			//移除表格对象
			$("tr[name='"+$(this).val()+"']").remove();
			//删除暂存数据
			var tempArr = [];
	        for(var i = 0; i < productList.length ; i++){
	          if(productList[i].id != $(this).val()){
	              tempArr.push(productList[i]);
	          }
	        }
	        productList = tempArr;
		});

	}

	//刷新全局productList
    var refreshProductList = function(){
        //将费用部分同步到productList中方便外围获取数据
        $("#productListTable").find("tr").each(function(){
            //统计每一个项目的录入并更新到数据对象
            var idSub = '';
            if($(this).attr("name") != undefined){
            	idSub = $(this).attr("name").split("_")[2];
            }
            for(var i = 0; i < productList.length ; i++){
                if(productList[i].id == "product_item_"+idSub){
                    productList[i].singlePrice = $("#product_item_"+idSub+"_single_price").val();
                    productList[i].count = $("#product_item_"+idSub+"_count").val();
                    productList[i].present = $("#product_item_"+idSub+"_present").val();
                    productList[i].discountType = $("#product_item_"+idSub+"_discount_type").val();
                    productList[i].discountValue = $("#product_item_"+idSub+"_discount_value").val();
                }
            }
        });
        //将data设置到浮层
        $("#productListTable").attr("data",JSON.stringify(productList));
        console.log(JSON.stringify(productList));
    };
});