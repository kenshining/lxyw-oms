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

  //供货商管理
  app.get('/stock/supplier_control', function(req, res){
  
      res.render('stock/supplier_control', {title: '供货商管理' });
  });
  //编辑供货商
  app.get('/stock/supplier_edit', function(req, res){
  
      res.render('stock/supplier_edit', {title: '编辑供货商' });
  });
};