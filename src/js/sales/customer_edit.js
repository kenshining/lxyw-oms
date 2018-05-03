layui.config({
  base: '/layui/lay/modules/' //假设这是你存放拓展模块的根目录
}).use(['form','layer','btable','element'], function() {
	var $ = layui.jquery,
        form = layui.form(),
        supplier_table = layui.btable(),
        layer = layui.layer,
        element = layui.element;

    $("#addNewConnectorBtn").on('click',function(){
        //新增联系人
        addNewConnector();
    });
});
//添加一行联系人
var addNewConnector = function(){

    var newItem = '<tr>'+
                      '<td><input type="input" class="layui-input"></td>'+
                      '<td><input type="input" class="layui-input"></td>'+
                      '<td nowrap="nowrap"><input type="input" class="layui-input"></td>'+
                       '<td nowrap="nowrap">'+
                        '<div class="layui-btn-group">'+
                           ' <button class="layui-btn layui-btn-primary layui-btn-mini" type="button" onclick="saveConnector(this);">'+
                              '<i class="layui-icon">&#xe618;保存</i>'+
                            '</button>'+
                            '<button class="layui-btn layui-btn-primary layui-btn-mini" type="button" onclick="deleteConnector(this);">'+
                              '<i class="layui-icon">&#xe640;删除</i>'+
                            '</button>'+
                          '</div>'+
                       '</td>'+
                   ' </tr>';
    $("#con_body").append(newItem);
}
var listedConnector = function(jsonlist){
    var items = '<tr>'+
                      '<td><span class="note">成龙</span></td>'+
                      '<td><span class="note">18611699091</span></td>'+
                      '<td nowrap="nowrap"><span class="note">kencheng@foxmail.com</span></td>'+
                       '<td nowrap="nowrap">'+
                        '<div class="layui-btn-group">'+
                           ' <button class="layui-btn layui-btn-primary layui-btn-mini" type="button" onclick="editConnector(this);">'+
                              '<i class="layui-icon">&#xe642;编辑</i>'+
                            '</button>'+
                            '<button class="layui-btn layui-btn-primary layui-btn-mini" type="button" onclick="deleteConnector(this);">'+
                              '<i class="layui-icon">&#xe640;删除</i>'+
                            '</button>'+
                          '</div>'+
                       '</td>'+
                   ' </tr>';
    $("#con_body").append(items);
}
//保存联系人
var saveConnector = function(saveBtn){
   $("#con_body").find(".layui-input").each(function(){
        //获取文本框值
        var value = $(this).val();
        //处理成不可编辑状态
        $(this).parent().html('<span class="note">'+value+'</span>');
  });
   //变更按钮为编辑和删除
}
//删除联系人
var deleteConnector = function(deleteBtn){
    $(deleteBtn).parent().parent().parent().remove();
}
//编辑联系人
var editConnector = function(editBtn){
    $(editBtn).parent().parent().parent().find(".layui-input");
}