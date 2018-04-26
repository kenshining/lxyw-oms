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

	app.get('/', function(req, res, next) {
	  res.render('login', { title: 'Express' });
	});

	app.get('/main', function(req, res, next) {
	  res.render('main', { title: 'Express' });
	});

	app.get('/platform-default', function(req, res, next) {
	  res.render('platform-default', { title: 'Express' });
	});

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
