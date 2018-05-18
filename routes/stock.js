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
  //供货商分页查询
  app.get('/stock/supplier_findByPage', function(req, res){

      var params = {
          pageIndex:(req.query.page-1)*req.query.limit,
          pageSize:req.query.limit,
          supplierName:null
       };

      if(req.query.supplierName != ''){
          params.supplierName = req.query.supplierName;
      }
      var pageJson = {};
      console.info(params);
      serviceInstance.callServer(params,function(msg){
        console.info(msg);
        pageJson.code = 0;
        pageJson.msg = "获取成功";
        pageJson.count = msg.data.totalSize;
        pageJson.data = msg.data.list;
        res.json(pageJson); 
      },function(msg){
        pageJson.code = 1;
        pageJson.msg = msg.message;
        res.json(msg);
      },serviceEnumerationInstance.STOCK_SUPPLIER_SEARCH_LIST,"POST"); 
  });
  //编辑供货商
  app.get('/stock/supplier_edit', function(req, res){

    console.info(req.query.id);
    //区别是新增还是修改
    if(req.query.id == null || req.query.id == ''){
      res.render('stock/supplier_edit', {
          msg:{}
      });
    }
    var params = {
      id:req.query.id
    }
    serviceInstance.callServer(params,function(msg){
        console.info(msg);
        res.render('stock/supplier_edit', {
          msg:msg
        });
      },function(msg){
        console.error(msg);
        res.render('stock/supplier_edit', {
          msg:msg
        });
      },serviceEnumerationInstance.STOCK_SUPPLIER_SEARCH_BY_PRIMARYKEY,"POST");

  });
};