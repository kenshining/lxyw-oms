layui.config({
  base: '/layui/lay/modules/' //假设这是你存放拓展模块的根目录
}).use(['form','layer','btable','element'], function() {
	var $ = layui.jquery,
        form = layui.form(),
        user_table = layui.btable(),
        layer = layui.layer,
        element = layui.element;

        user_table.set({
                openWait: true,//开启等待框
                height:120,
                elem: '#table_content',
                url: '/user/user_findUserByPage', //数据源地址
                pageSize: 10,//页大小
                params: {//额外的请求参数
                    t: new Date().getTime(),
                    username:$('#username').val(),
                    name:$('#name').val(),
                    cellphoneNo:$('#cellphoneNo').val()
                },
                columns: [{ //配置数据列
                    fieldName: '用户名', //显示名称
                    field: 'username', //字段名
                    sortable: true //是否显示排序
                }, {
                    fieldName: '姓名',
                    field: 'name',
                    sortable: true
                }, {
                    fieldName: '性别',
                    field: 'sex',
                    format: function (id, obj) {
                        if(obj.sex == "F"){
                            return "女";
                        }else{
                            return "男";
                        }

                    }
                },{
                    fieldName: '手机号',
                    field: 'cellphoneNo',
                    format: function (id, obj) {

                    }
                }, {
                    fieldName: '创建时间',
                    field: 'createdDate'
                }, {
                    fieldName: '操作',
                    field: 'id',
                    format: function (val,obj) {
                        var html = '<input type="button" value="编辑" data-action="edit" data-id="' + val + '" class="layui-btn layui-btn-mini" /> ' +
                            '<input type="button" value="重置密码" data-action="edit" data-id="' + val + '" class="layui-btn layui-btn-mini" /> ' +
                            '<input type="button" value="删除" data-action="del" data-id="' + val + '" class="layui-btn layui-btn-mini layui-btn-danger" />';
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
                    $elem.children('tr').each(function () {
                        $(this).children('td:last-child').children('input').each(function () {
                            var $that = $(this);
                            var action = $that.data('action');
                            var id = $that.data('id');
                            $that.on('click', function () {
                                switch (action) {
                                    case 'edit':
                                        layer.msg(action + ":" + id);
                                        break;
                                    case 'del': //删除
                                        var name = $that.parent('td').siblings('td[data-field=name]').text();
                                        //询问框
                                        layer.confirm('确定要删除[ <span style="color:red;">' + name + '</span> ] ？', { icon: 3, title: '系统提示' }, function (index) {
                                            $that.parent('td').parent('tr').remove();
                                            layer.msg('删除成功.');
                                        });
                                        break;
                                }
                            });
                        });
                    });
                }
            });
            user_table.render();
            
    form.on('submit(search)', function (data) {
        user_table.get(data.field);
        return false;
    });
});