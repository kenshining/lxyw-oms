layui.config({
	base: '/javascripts/layUI/'
}).use(['navbar','tab', 'code','element'], function() {
	var navbar = layui.navbar(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery,
		element = layui.element();
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
				"id" : "3",
				"title" : "货品库存",
				"icon" : "&#xe622;",
				"href" : "/stock/stock_control",
				"spread" : false
			},
			{
				"id" : "4",
				"title" : "供货商管理",
				"icon" : "&#xe613;",
				"href" : "",
				"spread" : false
			}
		]
	},{
		"id" : "5",
		"title" : "百度",
		"icon" : "&#xe629;",
		"href" : "http://www.baidu.com/",
		"spread" : false
	},{
		"id" : "6",
		"title" : "404页面",
		"icon" : "&#xe61c;",
		"href" : "page/404.html",
		"spread" : false
	},{
		"id" : "7",
		"title" : "系统基本参数",
		"icon" : "&#xe631;",
		"href" : "page/systemParameter/systemParameter.html",
		"spread" : false
	},{
		"id" : "8",
		"title" : "二级菜单演示",
		"icon" : "&#xe61c;",
		"href" : "",
		"spread" : false,
		"children" : [
			{
				"id" : "9",
				"title" : "二级菜单1",
				"icon" : "&#xe631;",
				"href" : "page/systemParameter/systemParameter.html",
				"spread" : false
			},
			{
				"id" : "10",
				"title" : "二级菜单2",
				"icon" : "&#xe631;",
				"href" : "",
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
		tab.tabAdd({
			title: data.field.title,
	        href:data.field.href,
	        icon:data.field.icon,
	        id: data.field.id
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
		lockPage();
	}
	$(".lockcms").on("click",function(){
		window.sessionStorage.setItem("lockcms",true);
		lockPage();
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
//锁屏
var lockPage = function(){
    layer.open({
        title : false,
        type : 1,
        content : $("#lock-box"),
        closeBtn : 0,
        shade : 0.4
    });
}