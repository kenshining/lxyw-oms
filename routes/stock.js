var tools= require('../lib/tools');
/**
* 我要借款模块
**/
exports.init= function(app,serviceInstance,serviceEnumerationInstance,logger){
  
  /**跳转库存**/
  app.get('/stock/stock_control', function(req, res){
  
      res.render('stock/stock_control', {title: 'Express' });
  });
  /**新增或修改库存**/
  app.get('/stock/stock_edit', function(req, res){
  
      res.render('stock/stock_edit', {title: 'Express' });
  });

  /**新增或修改库存**/
  app.get('/stock/stock_supplier', function(req, res){
  
      res.render('stock/stock_supplier', {title: 'Express' });
  });
  
};