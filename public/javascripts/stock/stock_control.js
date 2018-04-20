//示例代码
layui.config({
    base: '/javascripts/layUI/'
}).use(['paging', 'code','form','laydate'], function() {
    layui.code();
    var $ = layui.jquery,
        form = layui.form(),
        laydate = layui.laydate,
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
    
});