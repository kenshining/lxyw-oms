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
				"icon" : "&#xe68e;",
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
				"icon" : "&#xe604;",
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
				"icon" : "&#xe612;",
				"href" : "/user/user_control",
				"spread" : false
			},
			{
				"id" : "10",
				"title" : "用户组与权限",
				"icon" : "&#xe770;",
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
               var dataForm = layer.getChildFrame('form', index);
               //dataForm.contents().find("input[name='username']").val()
               //验证输入是否合法
               var password = dataForm.contents().find("#password").val();
               var newPassword = dataForm.contents().find("#newPassword").val();
               var newPasswordRepeat = dataForm.contents().find("#newPasswordRepeat").val();
               	  //验证输入框不能为空
			      var cvu = new CommonValidationUtils();
			      var emu = new CommonValidationEmu();
			      //为空校验
			      if(cvu.isNull(password) 
			        || cvu.isNull(newPasswordRepeat) 
			        || cvu.isNull(newPassword)){
			        layer.msg(emu.errorMsg.all_not_null);
			    	return;
			      }
			      //验证棉麻输入是否满足要求
			      if(newPassword != newPasswordRepeat){
			      	layer.msg("两次输入的新密码不一致，请重新输入。");
			      	return;
			      }
               var loadIndex = layer.load(2);
               $.post('/user/modify_password',{
               		password:password,
               		newPassword:newPassword
               },function(data, textStatus, jqXHR){
               		layer.close(loadIndex);
               		if(data.code == 0){
	                    layer.close(index);
	                    layer.msg("用户密码已修改成功！");
               		}else{
	                    layer.msg(data.message);
               		}
                    
               },'json');
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
			$.ajax({
				url	:'/login',
				type:'POST',
				dataType:'json',
				data:{
					username:$("#lockUserName").html(),
					password:$(this).siblings(".admin-header-lock-input").val()
				},
				success:function(msg){
					if(msg.status){
						window.sessionStorage.setItem("lockcms",false);
						$(this).siblings(".admin-header-lock-input").val('');
						layer.closeAll();
						$(".admin-header-lock").hide();
					}else{
						layer.msg("密码错误，请重新输入！");
					}
					
				}

			});
		}
	});
	$(document).on('keydown', function() {
		if(event.keyCode == 13) {
			$("#unlock").click();
		}
	});

	//心跳检测用户登录状态是否有效，若无效需要重新验证
	setInterval(function(){
		//判断当前是否已被锁定，如果已被锁定则不在提示直接跳转到登录页面
		if(window.sessionStorage.getItem("lockcms") == "true"){
			//跳转登录页面，登录后不用再次输入密码
			window.sessionStorage.setItem("lockcms",false);
			window.location.href="/";
		}
		$.post('/validateUserValid',{
            t: new Date().getTime()  
	    },function(data, textStatus, jqXHR){
	        if(data.code != 0){
	        	//登录失效，显示验证窗口
	        	$(".lockcms").click();
	        	console.log("登录状态已失效...");
	        }else{
	        	console.log("登录状态有效...");
	        }
	    },'json');
	},1000*60*1);

	
});


