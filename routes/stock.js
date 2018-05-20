var tools= require('../lib/tools');
/**
* 我要借款模块
**/
exports.init= function(app,serviceInstance,serviceEnumerationInstance,logger){

  /**跳转库存**/
  app.get('/stock/stock_control', function(req, res){

      res.render('stock/stock_control', {title: 'Express' });
  });

  app.get('/stock/stock_findByPage', function(req, res){

      var params = {
          pageIndex:(req.query.page-1)*req.query.limit,
          pageSize:req.query.limit,
          productName:null,
          productStatus:null,
          startDate:null,
          endDate:null
       };

      if(req.query.productName != ''){
          params.productName = req.query.productName;
      }
      if(req.query.start_date != ''){
          params.startDate = req.query.start_date;
      }
      if(req.query.start_date != ''){
          params.endDate = req.query.start_date;
      }
      if(req.query.productStatus != ''){
          params.productStatus = req.query.productStatus;
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

  /**新增或修改库存**/
  app.get('/stock/stock_edit', function(req, res){

      res.render('stock/stock_edit', {title: 'Express' });
  });

  app.get('/stock/stock_status', function(req, res){
      res.render('stock/stock_status', {title: 'Express' });
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
        console.info(JSON.stringify(msg.data.supplierIndividualList));
        msg.data.individualLink = JSON.stringify(msg.data.supplierIndividualList);
        res.render('stock/supplier_edit', {
          msg:msg
        });
      },function(msg){
        console.info(msg);
        res.render('stock/supplier_edit', {
          msg:msg
        });
      },serviceEnumerationInstance.STOCK_SUPPLIER_SEARCH_BY_PRIMARYKEY,"POST");

  });

  //保存&更新供应商
  app.post('/stock/supplier_save', function(req, res){

    var id = req.body.id,
    individualLink = req.body.individualLink;
      if(individualLink !=null && individualLink != ""){
          individualLink =  JSON.parse(individualLink);
      }

    //准备用户参数
    var params = {
      id: req.body.id,
      supplierName: req.body.supplierName,
      supplierType: req.body.supplierType,
      supplierEmail:req.body.supplierEmail,
      supplierLocation:req.body.supplierLocation,
      supplierCellphone:req.body.supplierCellphone,
      supplierAddress:req.body.supplierAddress,
      supplierRemark:req.body.supplierRemark,
      supplierIndividualList:individualLink
    };
    console.info("=============="+id+"================");
    console.info(params);

    if( id != null && id != ''){
      //更新用户
      params.id = id;
      params.updateBy = req.session.user.username;
      serviceInstance.callServer(params,function(msg){
        console.info(msg);
        res.json(msg);
      },function(msg){
        res.json(msg);
      },serviceEnumerationInstance.STOCK_SUPPLIER_SAVE_UPDATE,"POST");
    }else{
      //新增用户
      params.createdBy = req.session.user.username;
      serviceInstance.callServer(params,function(msg){
        console.info(msg);
        res.json(msg);
      },function(msg){
        res.json(msg);
      },serviceEnumerationInstance.STOCK_SUPPLIER_SAVE_NEW,"POST");
    }


  });

  //删除供应商
  app.post('/stock/supplier_delete', function(req, res){

    var id = req.body.id;
    //准备用户参数
    var params = {
      id: req.body.id
    };
    console.info("============== delete:"+id+"================");
    //更新用户
    serviceInstance.callServer(params,function(msg){
      console.info(msg);
      res.json(msg);
    },function(msg){
      res.json(msg);
    },serviceEnumerationInstance.STOCK_SUPPLIER_SAVE_DELETE,"POST");

  });


};