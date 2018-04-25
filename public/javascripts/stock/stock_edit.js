layui.config({
  base: '/layui/lay/modules/' //假设这是你存放拓展模块的根目录
}).use(['form','layer','btable'], function() {

 	var $ = layui.jquery,
        form = layui.form(),
        stable = layui.btable(),
        layer = layui.layer;

        $('#selectSupplier').on('click', function() {
            fadeDiv("#product_form","#supplier_select");
            findSupplierByPage(stable);
        });

});
var fadeDiv = function(fadeOutId,fadeInId){
	$(fadeOutId).fadeOut(50,function(){
        $(fadeInId).fadeIn(50);
    });
}
var showStockWin = function(id){
    fadeDiv("#supplier_select","#product_form");
    $('html,body').animate({scrollTop:$("body").height()},'fast');
    $("#supplier_select_input").val(id);
}
var findSupplierByPage = function(stable){
	stable.set({
        openWait: true,//开启等待框
        elem:'#supplier_List',
        height:120,
        url: '/BeginnerAdmin/datas/btable_data.json', //数据源地址
        pageSize: 10,//页大小
        params: {//额外的请求参数
            t: new Date().getTime()
        },
        columns: [{ //配置数据列
            fieldName: '昵称', //显示名称
            field: 'name', //字段名
            sortable: true //是否显示排序
        }, {
            fieldName: '加入时间',
            field: 'createtime',
            sortable: true
        }, {
            fieldName: '签名',
            field: 'sign',
            format: function (id, obj) {
                //id
                //console.log(id);
                //行数据对象
                //console.log(obj);
                //返回值：格式化的纯文本或html文本
                return obj.sign;
            }
        }, {
            fieldName: '操作',
            field: 'id',
            format: function (val,obj) {
                var html = '<input type="button" value="选择供应商" data-action="edit" data-id="' + val + '" class="layui-btn layui-btn-mini"  onclick="showStockWin(\''+val+'\');"/> ' ;
                   
                return html;
            }
        }],
        even: true,//隔行变色
        field: 'id', //主键ID
        //skin: 'row',
        checkbox: false,//是否显示多选框
        paged: true, //是否显示分页
        singleSelect: false, //只允许选择一行，checkbox为true生效
        onSuccess: function ($elem) { //$elem当前窗口的jq对象

           $('html,body').animate({scrollTop:0},'fast');
        }
    });
    stable.render();
}