//缓存菜单使用对象
var menuCache = [];
layui.config({
  base: '/layui/lay/modules/' //假设这是你存放拓展模块的根目录
}).use(['navbar','tab','layer','code','element','jquery','form'], function() {
	var navbar = layui.navbar(),
		layer = layui.layer,
		form = layui.form,
		$ = layui.jquery,
		element = layui.element;
		layui.code();

	var tab = layui.tab();
	tab.set({
		elem: '#tabs'
		,autoRefresh: true
		,closed: true
	});

	var munes = [{
		"id" : "2",
		"title" : "库存管理",
		"icon" : "&#xe63c;",
		"href" : "",
		"spread" : false,
		"children" : [
			{
				"id" : "4",
				"title" : "供货商管理",
				"icon" : "&#xe62e;",
				"href" : "/stock/supplier_control",
				"spread" : false
			},
			{
				"id" : "3",
				"title" : "货品库存",
				"icon" : "&#xe622;",
				"href" : "/stock/stock_control",
				"spread" : false
			}
		]
	},{
		"id" : "9",
		"title" : "销售管理",
		"icon" : "&#xe61c;",
		"href" : "",
		"spread" : false,
		"children" : [
			{
				"id" : "9292",
				"title" : "客户管理",
				"icon" : "&#xe613;",
				"href" : "/sales/customer_control",
				"spread" : false
			},
			{
				"id" : "99",
				"title" : "销售订单",
				"icon" : "&#xe609;",
				"href" : "/sales/sales_control",
				"spread" : false
			},
			{
				"id" : "992",
				"title" : "订单异常处理",
				"icon" : "&#xe60a;",
				"href" : "/comingSoon",
				"spread" : false
			},
			{
				"id" : "41",
				"title" : "销售业绩（个人）",
				"icon" : "&#xe62f;",
				"href" : "/comingSoon",
				"spread" : false
			}
		]
	},{
		"id" : "6",
		"title" : "报表与数据",
		"icon" : "&#xe61c;",
		"href" : "",
		"spread" : false,
		"children" : [
			{
				"id" : "939",
				"title" : "销售数据统计",
				"icon" : "&#xe62c;",
				"href" : "/comingSoon",
				"spread" : false
			},
			{
				"id" : "9292",
				"title" : "库存数据统计",
				"icon" : "&#xe632;",
				"href" : "/comingSoon",
				"spread" : false
			},
			{
				"id" : "441",
				"title" : "客户活跃统计",
				"icon" : "&#xe616;",
				"href" : "/comingSoon",
				"spread" : false
			}
		]
	},{
		"id" : "8",
		"title" : "系统设置",
		"icon" : "&#xe620;",
		"href" : "",
		"spread" : false,
		"children" : [
			{
				"id" : "9",
				"title" : "用户管理",
				"icon" : "&#xe631;",
				"href" : "/user/user_control",
				"spread" : false
			},
			{
				"id" : "10",
				"title" : "用户组与权限",
				"icon" : "&#xe631;",
				"href" : "/comingSoon",
				"spread" : false
			}
		]
	}];
	navbar.set({
		elem: '#nav_bar',
		data: munes,
		cached: true
	});
	navbar.render();
	navbar.on('click(nav_bar)', function(data) {
		/*console.log(data.elem);
		console.log(data.field.title);
		console.log(data.field.icon);
		console.log(data.field.href);*/
		//layer.msg(data.field.href);
		var menu ={
			title: data.field.title,
	        href:data.field.href,
	        icon:data.field.icon,
	        id: data.field.id
		}
		tab.tabAdd(menu);
		menuCache.push(menu);
		//window.sessionStorage.setItem("lockcms",false);
	});

	//修改用户密码
	$("#main_password_modify").on("click",function(){
		var index = layer.open({
            content: '/user/modify_password',
            type: 2,
            anim: 2, //动画类型
            title: '修改密码',
            btn: ['修改', '取消'],
            skin: 'layui-layer-rim', //加上边框
            area: ['450px', '280px'], //宽高
            success: function(layero, index){
                //console.log(layero, index);
                form.render();
            },
            yes: function(index,layero){
               /*var dataForm = layer.getChildFrame('form', index);
               //dataForm.contents().find("input[name='username']").val()
               var loadIndex = layer.load(2);
               $.post('/user/saveUser',{
                name:dataForm.contents().find("input[name='name']").val(),
                username:dataForm.contents().find("input[name='username']").val(),
                sex:dataForm.contents().find("select[name='sex']").val(),
                email:dataForm.contents().find("input[name='email']").val(),
                idcardNo:dataForm.contents().find("input[name='idcardNo']").val(),
                birthday:dataForm.contents().find("input[name='birthday']").val(),
                cellphoneNo:dataForm.contents().find("input[name='cellphoneNo']").val(),
                wechat:dataForm.contents().find("input[name='wechat']").val(),
                postCode:dataForm.contents().find("input[name='postCode']").val(),
                address:dataForm.contents().find("textarea[name='address']").val()
               },function(data, textStatus, jqXHR){
                    layer.close(loadIndex);
                    layer.close(index);
                    layer.msg("用户数据保存成功");
                    table.reload('user_table');
               },'json');*/
            }
        });
	});


	//手机设备的简单适配
	var treeMobile = $('.site-tree-mobile'),
		shadeMobile = $('.site-mobile-shade')

	treeMobile.on('click', function(){
		$('body').addClass('site-mobile');
	});

	shadeMobile.on('click', function(){
		$('body').removeClass('site-mobile');
	});

	//锁屏相关判定
	// 判断是否显示锁屏
	if(window.sessionStorage.getItem("lockcms") == "true"){
		layer.open({
        title : false,
        type : 1,
        content : $("#lock-box"),
        closeBtn : 0,
        shade : 0.4
    });
	}
	$(".lockcms").on("click",function(){
		window.sessionStorage.setItem("lockcms",true);
		layer.open({
        title : false,
        type : 1,
        content : $("#lock-box"),
        closeBtn : 0,
        shade : 0.4
    });
	});
	//绑定解锁事件
	$("#unlock").on("click",function(){
		if($(this).siblings(".admin-header-lock-input").val() == ''){
			layer.msg("请输入解锁密码！");
		}else{
			if($(this).siblings(".admin-header-lock-input").val() == "123456"){
				window.sessionStorage.setItem("lockcms",false);
				$(this).siblings(".admin-header-lock-input").val('');
				layer.closeAll();
				$(".admin-header-lock").hide();
			}else{
				layer.msg("密码错误，请重新输入！");
			}
		}
	});
	$(document).on('keydown', function() {
		if(event.keyCode == 13) {
			$("#unlock").click();
		}
	});
	
});


