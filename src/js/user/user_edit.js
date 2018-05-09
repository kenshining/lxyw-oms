layui.use(['form','laydate','laydate','layer'], function(){
  var form = layui.form
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,layer = layui.layer;

  //日期
  laydate.render({
    elem: '#date'
  });

  form.render();

});