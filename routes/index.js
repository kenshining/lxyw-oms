var express = require('express');
var router = express.Router();
var async = require('async');
var mainService = require('../services/MainService');
var serviceEnumeration = require('../services/ServiceEnumeration');
var tools = require('../lib/tools');
var config=require('../config/config.json');

//导入路由配置
var stockRoutes = require("./stock");

module.exports = function(app,logger){

	//init service instace
	var serviceInstance = mainService.init();
	//init serverside enumerations service instance
	var serviceEnumerationInstance = serviceEnumeration.init();

	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
	});

	app.get('/main', function(req, res, next) {
	  res.render('main', { title: 'Express' });
	});

	app.get('/print-model/form', function(req, res, next) {
	  res.render('print-model/sale_list', { title: 'Express' });
	});

	//导入路由配置。
	stockRoutes.init(app,serviceInstance,serviceEnumerationInstance,logger);
};
