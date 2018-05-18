var express = require('express');
var router = express.Router();
var async = require('async');
var mainService = require('../services/MainService');
var serviceEnumeration = require('../services/ServiceEnumeration');
var tools = require('../lib/tools');
var config=require('../config/config.json');

//导入路由配置
var stockRoutes = require("./stock");
var usersRoutes = require("./users");
var salesRoutes = require("./sales");

module.exports = function(app,logger){

	//init service instace
	var serviceInstance = mainService.init();
	//init serverside enumerations service instance
	var serviceEnumerationInstance = serviceEnumeration.init();

	//用户首页导航
	app.get('/', function(req, res, next) {
	  res.render('login', { title: 'Express' });
	});
	//验证用户名和密码是否正确
	app.post('/login', function(req, res, next) {

		var username = req.body.username;
		var password = req.body.password;

				req.session.user = {
					username:username
				};
	          	res.json({
	    	 		status:true,
	    	 		user:req.session.user,
	    	 		msg:'登录成功'
	    	 	});

		/*serviceInstance.callServer({username:username,password:password.toUpperCase()},
		//成功回调
        function(msg){
        	//用户名或密码错误
	        if(msg.state == "FAIL"){
	          	res.json({
	    	 		status:false,
	    	 		msg:'用户名或密码错误'
	    	 	});
	    	//用户名被禁止
          	}else{
	          	//登录成功存储用户登录状态
	          	req.session.user = msg.data;
	          	res.json({
	    	 		status:true,
	    	 		msg:'登录成功'
	    	 	});
          	}
	          //失败回调
	        },function(msg){
	        	res.json({
	    	 		status:false,
	    	 		msg:'系统运行异常，请与管理员联系'
	    	 	});
	        },
	        serviceEnumerationInstance.USER_VALIDATE_LOGIN);*/

	});
	//登出系统
	app.get('/logout', function(req, res, next) {
		req.session.user = null;
		res.json({
	  		code : 0
	  	});
	});

	app.get('/main', function(req, res, next) {

	  //获取用户信息
	  var user = req.session.user;
	  res.render('main', {
	  	user : user,
	  	title: 'Express' 
	  });
	});

	/**心跳检测用户登录状态是否仍然有效，如果无效需要给出提示锁屏**/
	app.post('/validateUserValid', function(req, res, next) {

	  //获取用户信息
	  var user = req.session.user;
	  if(!req.session || !req.session.user){
	  	//用户登录已经失效
	  	res.json({
	  		code:1,
	  		message:'为了您的账户安全，需要再次校验您的登录密码。'
	  	});
	  }else{
	  	res.json({
	  		code:0,
	  		message:''
	  	});
	  }
	 
	});

	/**跳转默认工作台**/
	app.get('/platform-default', function(req, res, next) {
	  res.render('platform-default', { title: 'Express' });
	});
	/**显示打印销售订单**/
	app.get('/print', function(req, res, next) {
	  res.render('print-model/sale_list', { title: 'Express' });
	});

	app.get('/comingSoon', function(req, res, next) {
	  res.render('comingSoon', { title: 'Express' });
	});
	
	//导入路由配置。
	stockRoutes.init(app,serviceInstance,serviceEnumerationInstance,logger);
	usersRoutes.init(app,serviceInstance,serviceEnumerationInstance,logger);
	salesRoutes.init(app,serviceInstance,serviceEnumerationInstance,logger);
};
