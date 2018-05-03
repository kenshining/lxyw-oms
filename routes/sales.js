var tools= require('../lib/tools');
/**
* 我要借款模块
**/
exports.init= function(app,serviceInstance,serviceEnumerationInstance,logger){
  
  /**销售订单**/
  app.get('/sales/sales_control', function(req, res){
  
      res.render('sales/sales_control', {title: '销售订单管理' });
  });

  app.get('/sales/sales_edit', function(req, res){
  
      res.render('sales/sales_edit', {title: '销售订单管理' });
  });

  app.get('/sales/sales_process', function(req, res){
  
      res.render('sales/sales_process', {title: '销售过程状态' });
  });

	/**客户管理**/
  app.get('/sales/customer_control', function(req, res){
  
      res.render('sales/customer_control', {title: '客户管理' });
  });

  app.get('/sales/customer_edit', function(req, res){
  
      res.render('sales/customer_edit', {title: '客户编辑' });
  });


  
};