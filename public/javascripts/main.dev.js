
layui.config({
	base: '/javascripts/layUI/'
}).use(['navbar', 'code'], function() {
	var navbar = layui.navbar(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;
	layui.code();

	var munes = [{
		"title" : "工作台",
		"icon" : "icon-computer",
		"href" : "page/main.html",
		"spread" : false
	},{
		"title" : "库存管理",
		"icon" : "&#xe629;",
		"href" : "",
		"spread" : false,
		"children" : [
			{
				"title" : "货品库存",
				"icon" : "&#xe622;",
				"href" : "/stock/stock_control",
				"spread" : false
			},
			{
				"title" : "供货商管理",
				"icon" : "&#xe613;",
				"href" : "",
				"spread" : false
			}
		]
	},{
		"title" : "友情链接",
		"icon" : "icon-text",
		"href" : "page/links/linksList.html",
		"spread" : false
	},{
		"title" : "404页面",
		"icon" : "&#xe61c;",
		"href" : "page/404.html",
		"spread" : false
	},{
		"title" : "系统基本参数",
		"icon" : "&#xe631;",
		"href" : "page/systemParameter/systemParameter.html",
		"spread" : false
	},{
		"title" : "二级菜单演示",
		"icon" : "&#xe61c;",
		"href" : "",
		"spread" : false,
		"children" : [
			{
				"title" : "二级菜单1",
				"icon" : "&#xe631;",
				"href" : "page/systemParameter/systemParameter.html",
				"spread" : false
			},
			{
				"title" : "二级菜单2",
				"icon" : "&#xe631;",
				"href" : "",
				"spread" : false
			}
		]
	}];
	navbar.set({
		elem: '#nav_bar',
		url: munes,
		cached: true
	});
	navbar.render();
	navbar.on('click(demo)', function(data) {
		console.log(data.elem);
		console.log(data.field.title);
		console.log(data.field.icon);
		console.log(data.field.href);
		layer.msg(data.field.href);
	});
});

/*
$(document).ready(function(){
	//拼接左侧菜单
	
	//初始化页面元素
	element.init();
	//显示左侧菜单
	if($(".navBar").html() == ''){
		$(".navBar").html(initMenu(navs)).height($(window).height()-230);
		$(window).resize(function(){
			$(".navBar").height($(window).height()-230);
		});
	}
	//锁屏相关判定
	$(".lockcms").on("click",function(){
		window.sessionStorage.setItem("lockcms",true);
		lockPage();
	});
	// 判断是否显示锁屏
	if(window.sessionStorage.getItem("lockcms") == "true"){
		lockPage();
	}
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
	//手机设备的简单适配
	var treeMobile = $('.site-tree-mobile'),
		shadeMobile = $('.site-mobile-shade')

	treeMobile.on('click', function(){
		$('body').addClass('site-mobile');
	});

	shadeMobile.on('click', function(){
		$('body').removeClass('site-mobile');
	});
	

});*/