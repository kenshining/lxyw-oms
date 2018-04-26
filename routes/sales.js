var tools= require('../lib/tools');
/**
* 我要借款模块
**/
exports.init= function(app,serviceInstance,serviceEnumerationInstance,logger){
  
  /**跳转库存**/
  app.get('/sales/sales_control', function(req, res){
  
      res.render('sales/sales_control', {title: '销售订单管理' });
  });

  app.get('/sales/sales_edit', function(req, res){
  
      res.render('sales/sales_edit', {title: '销售订单管理' });
  });
};