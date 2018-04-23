//示例代码
layui.config({
    base: '/javascripts/layUI/'
}).use(['paging', 'code','form','laydate','btable'], function() {
    layui.code();
    var $ = layui.jquery,
        form = layui.form(),
        laydate = layui.laydate,
        btable = layui.btable(),
        paging = layui.paging();

    var data={
        "rel": true,
        "msg": "获取成功",
        "list": [
            {
                "name": "张三",
                "age":21,
                "createtime": "2017-01-10 10:42:36"
            },
            {
                "name": "李四",
                "age":31,
                "createtime": "2017-01-10 10:42:36"
            },{
                "name": "王五",
                "age":23,
                "createtime": "2017-01-10 10:42:36"
            },{
                "name": "赵六",
                "age":18,
                "createtime": "2017-01-10 10:42:36"
            }
        ],
        "count": 57
    }

    btable.set({
                openWait: true,//开启等待框
                elem: '#table_content',
                url: '/BeginnerAdmin/datas/btable_data.json', //数据源地址
                pageSize: 3,//页大小
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
                        console.log(id);
                        //行数据对象
                        console.log(obj);
                        //返回值：格式化的纯文本或html文本
                        return obj.sign;
                    }
                }, {
                    fieldName: '操作',
                    field: 'id',
                    format: function (val,obj) {
                        var html = '<input type="button" value="编辑" data-action="edit" data-id="' + val + '" class="layui-btn layui-btn-mini" /> ' +
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
                                        layerTips.msg(action + ":" + id);
                                        break;
                                    case 'del': //删除
                                        var name = $that.parent('td').siblings('td[data-field=name]').text();
                                        //询问框
                                        layerTips.confirm('确定要删除[ <span style="color:red;">' + name + '</span> ] ？', { icon: 3, title: '系统提示' }, function (index) {
                                            $that.parent('td').parent('tr').remove();
                                            layerTips.msg('删除成功.');
                                        });
                                        break;
                                }
                            });
                        });
                    });
                }
            });
            btable.render();

    
});