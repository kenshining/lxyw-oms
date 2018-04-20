//示例代码
layui.config({
    base: '/javascripts/layUI/'
}).use(['paging', 'code'], function() {
    layui.code();
    var $ = layui.jquery,
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
    paging.init({
        //url: 'datas/laytpl_laypage_data.json', //地址
        data: 
        elem: '#con', //内容容器
        params: { //发送到服务端的参数
            t: Math.random(),
            action: 'GetXxx'
        },
        tempElem: '#conTemp', //模块容器
        pageConfig: { //分页参数配置
            elem: '#paged', //分页容器
            pageSize: 3 //分页大小
        },
        success: function() { //渲染成功的回调
            //alert('渲染成功');
        },
        fail: function(msg) { //获取数据失败的回调
            //alert('获取数据失败')
        },
        complate: function() { //完成的回调
            //alert('处理完成');
        },
    });
});