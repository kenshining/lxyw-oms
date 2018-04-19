var menu=[];
//允许打开TAB的数量
var openTabNum = 10;
var tabIdIndex = 0;
var element = layui.element;
var tabFilter = "tabs";

$(document).ready(function(){
	
	//拼接左侧菜单
	var navs = [{
		"title" : "后台首页",
		"icon" : "icon-computer",
		"href" : "page/main.html",
		"spread" : false
	},{
		"title" : "文章列表",
		"icon" : "icon-text",
		"href" : "page/news/newsList.html",
		"spread" : false
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

	// 添加新窗口
	//统一处理TAB绑定事件
	$(".layui-nav .layui-nav-item a").on("click",function(){
		openTab(this);
		$(this).parent("li").siblings().removeClass("layui-nav-itemed");
	});
	//绑定关闭事件
	bindMenuEmit();

	//显示左侧菜单
	if($(".navBar").html() == ''){
		$(".navBar").html(initMenu(navs)).height($(window).height()-230);
		$(window).resize(function(){
			$(".navBar").height($(window).height()-230);
		});
	}
	//刷新后保持打开窗口
	currentTabFlash();
	

});

/**
* 初始化菜单
**/
var initMenu = function(data){
	var ulHtml = '<ul class="layui-nav layui-nav-tree">';
	for(var i=0;i<data.length;i++){
		if(data[i].spread){
			ulHtml += '<li class="layui-nav-item layui-nav-itemed" data-href="'+data[i].href+'">';
		}else{
			ulHtml += '<li class="layui-nav-item" data-href="'+data[i].href+'">';
		}
		if(data[i].children != undefined && data[i].children.length > 0){
			ulHtml += '<a href="javascript:;">';
			if(data[i].icon != undefined && data[i].icon != ''){
				if(data[i].icon.indexOf("icon-") != -1){
					ulHtml += '<i class="iconfont '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
				}else{
					ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
				}
			}
			ulHtml += '<cite>'+data[i].title+'</cite>';
			ulHtml += '<span class="layui-nav-more"></span>';
			ulHtml += '</a>'
			ulHtml += '<dl class="layui-nav-child">';
			for(var j=0;j<data[i].children.length;j++){
				ulHtml += '<dd><a href="javascript:;" data-url="'+data[i].children[j].href+'">';
				if(data[i].children[j].icon != undefined && data[i].children[j].icon != ''){
					if(data[i].children[j].icon.indexOf("icon-") != -1){
						ulHtml += '<i class="iconfont '+data[i].children[j].icon+'" data-icon="'+data[i].children[j].icon+'"></i>';
					}else{
						ulHtml += '<i class="layui-icon" data-icon="'+data[i].children[j].icon+'">'+data[i].children[j].icon+'</i>';
					}
				}
				ulHtml += '<cite>'+data[i].children[j].title+'</cite></a></dd>';
			}
			ulHtml += "</dl>"
		}else{
			ulHtml += '<a href="javascript:;" data-url="'+data[i].href+'">';
			if(data[i].icon != undefined && data[i].icon != ''){
				if(data[i].icon.indexOf("icon-") != -1){
					ulHtml += '<i class="iconfont '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
				}else{
					ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
				}
			}
			ulHtml += '<cite>'+data[i].title+'</cite></a>';
		}
		ulHtml += '</li>'
	}
	ulHtml += '</ul>';
	$("#nav_bar").html(ulHtml);
	return ulHtml;
}
//菜单点击事件
var hasTab = function(title){
	var tabIndex = -1;
	$(".layui-tab-title.top_tab li").each(function(){
		if($(this).find("cite").text() == title){
			tabIndex = 1;
		}
	})
	return tabIndex;
}
var getLayId = function(title){
	$(".layui-tab-title.top_tab li").each(function(){
		if($(this).find("cite").text() == title){
			layId = $(this).attr("lay-id");
		}
	})
	return layId;
}
var openTab = function(item){
	if(window.sessionStorage.getItem("menu")){
		menu = JSON.parse(window.sessionStorage.getItem("menu"));
	}
	var obj = $(item);
	if(obj.find("i.iconfont,i.layui-icon").attr("data-icon") != undefined){
		if(hasTab(obj.find("cite").text()) == -1 && obj.siblings("dl.layui-nav-child").length == 0){
			//限制打开选项卡数量
			if($(".layui-tab-title.top_tab li").length == openTabNum){
				layer.msg('只能同时打开'+openTabNum+'个选项卡。');
				return;
			}
			tabIdIndex++;
			var title = '';
			if(obj.find("i.iconfont").attr("data-icon") != undefined){
				title += '<i class="iconfont '+obj.find("i.iconfont").attr("data-icon")+'"></i>';
			}else{
				title += '<i class="layui-icon">'+obj.find("i.layui-icon").attr("data-icon")+'</i>';
			}
			title += '<cite>'+obj.find("cite").text()+'</cite>';
			title += '<i class="layui-icon layui-unselect layui-tab-close" data-id="'+tabIdIndex+'">&#x1006;</i>';
			element.tabAdd(tabFilter, {
		        title : title,
		        content :"<iframe src='"+obj.attr("data-url")+"' data-id='"+tabIdIndex+"'></frame>",
		        id : new Date().getTime()
			});

			//当前窗口内容
			var curmenu = {
				"icon" : obj.find("i.iconfont").attr("data-icon")!=undefined ? obj.find("i.iconfont").attr("data-icon") : obj.find("i.layui-icon").attr("data-icon"),
				"title" : obj.find("cite").text(),
				"href" : obj.attr("data-url"),
				"layId" : new Date().getTime()
			}
			menu.push(curmenu);
			window.sessionStorage.setItem("menu",JSON.stringify(menu)); //打开的窗口
			window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));  //当前的窗口
			element.tabChange(tabFilter,getLayId(obj.find("cite").text()));
		}else{
			//当前窗口内容
			var curmenu = {
				"icon" : obj.find("i.iconfont").attr("data-icon")!=undefined ? obj.find("i.iconfont").attr("data-icon") : obj.find("i.layui-icon").attr("data-icon"),
				"title" : obj.find("cite").text(),
				"href" : obj.attr("data-url"),
				"layId" : new Date().getTime()
			}
			window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));  //当前的窗口
			element.tabChange(tabFilter, getLayId(obj.find("cite").text()));
		}
	}

};
var bindMenuEmit = function(){
	//设置当前选择的tab
	$("body").on("click",".top_tab li",function(){
		//切换后获取当前窗口的内容
		var curmenu = '';
		var menu = JSON.parse(window.sessionStorage.getItem("menu"));
		curmenu = menu[$(this).index()-1];
		if($(this).index() == 0){
			window.sessionStorage.setItem("curmenu",'');
		}else{
			window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
			if(window.sessionStorage.getItem("curmenu") == "undefined"){
				//如果删除的不是当前选中的tab,则将curmenu设置成当前选中的tab
				if(curNav != JSON.stringify(delMenu)){
					window.sessionStorage.setItem("curmenu",curNav);
				}else{
					window.sessionStorage.setItem("curmenu",JSON.stringify(menu[liIndex-1]));
				}
			}
		}
		element.tabChange(tabFilter,$(this).attr("lay-id")).init();
	});
	//删除tab
	$("body").on("click",".top_tab li i.layui-tab-close",function(){
		//删除tab后重置session中的menu和curmenu
		liIndex = $(this).parent("li").index();
		var menu = JSON.parse(window.sessionStorage.getItem("menu"));
		//获取被删除元素
		delMenu = menu[liIndex-1];
		var curmenu = window.sessionStorage.getItem("curmenu")=="undefined" ? "undefined" : window.sessionStorage.getItem("curmenu")=="" ? '' : JSON.parse(window.sessionStorage.getItem("curmenu"));
		if(JSON.stringify(curmenu) != JSON.stringify(menu[liIndex-1])){  //如果删除的不是当前选中的tab
			// window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
			curNav = JSON.stringify(curmenu);
		}else{
			if($(this).parent("li").length > liIndex){
				window.sessionStorage.setItem("curmenu",curmenu);
				curNav = curmenu;
			}else{
				window.sessionStorage.setItem("curmenu",JSON.stringify(menu[liIndex-1]));
				curNav = JSON.stringify(menu[liIndex-1]);
			}
		}
		menu.splice((liIndex-1), 1);
		window.sessionStorage.setItem("menu",JSON.stringify(menu));
		element.tabDelete(tabFilter,$(this).parent("li").attr("lay-id")).init();
	});
}
//锁屏
var lockPage = function(){
	layer.open({
		title : false,
		type : 1,
		content : $("#lock-box"),
		closeBtn : 0,
		shade : 0.9
	});
}
//刷新后仍然打开当前窗口
var currentTabFlash = function(){
	if(window.sessionStorage.getItem("menu") != null){
		menu = JSON.parse(window.sessionStorage.getItem("menu"));
		curmenu = window.sessionStorage.getItem("curmenu");
		var openTitle = '';
		for(var i=0;i<menu.length;i++){
			openTitle = '';
			if(menu[i].icon.split("-")[0] == 'icon'){
				openTitle += '<i class="iconfont '+menu[i].icon+'"></i>';
			}else{
				openTitle += '<i class="layui-icon">'+menu[i].icon+'</i>';
			}
			openTitle += '<cite>'+menu[i].title+'</cite>';
			openTitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="'+menu[i].layId+'">&#x1006;</i>';
			element.tabAdd(tabFilter,{
				title : openTitle,
		        content :"<iframe src='"+menu[i].href+"' data-id='"+menu[i].layId+"'></frame>",
		        id : menu[i].layId
			})
			//定位到刷新前的窗口
			if(curmenu != "undefined"){
				if(curmenu == '' || curmenu == "null"){  //定位到后台首页
					element.tabChange(tabFilter,'');
				}else if(JSON.parse(curmenu).title == menu[i].title){  //定位到刷新前的页面
					element.tabChange(tabFilter,menu[i].layId);
				}
			}else{
				element.tabChange(tabFilter,menu[menu.length-1].layId);
			}
		}
	}

}
