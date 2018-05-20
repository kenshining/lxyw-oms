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

      res.render('sales/sales_edit', {
        user:req.session.user,
        title: '销售订单管理'
      });
  });

  app.get('/sales/sales_process', function(req, res){

      res.render('sales/sales_process', {title: '销售过程状态' });
  });

	/**客户管理**/
  app.get('/sales/customer_control', function(req, res){

      res.render('sales/customer_control', {title: '客户管理' });
  });

  /**销售订单选择客户**/
  app.get('/sales/chooes_customer', function(req, res){

      res.render('sales/chooes_customer', {title: '销售订单选择客户' });
  });
  /**客户管理**/
  app.get('/sales/customer_findByPage', function(req, res){
       var params = {
          pageIndex:(req.query.page-1)*req.query.limit,
          pageSize:req.query.limit,
          customerType:null,
          customerName:null,
          cellphoneNo:null
       };
       if(req.query.customerName != ''){
          params.customerName = req.query.customerName;
       }
       if(req.query.customerType != ''){
          params.customerType = req.query.customerType;
       }else
       if(req.query.cellphoneNo != ''){
          params.cellphoneNo = req.query.cellphoneNo;
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
      },serviceEnumerationInstance.SALSE_CUSTOMER_LIST,"POST");
  });
  /**客户管理-查询用户**/
  app.get('/sales/customer_edit', function(req, res){

    var id = req.query.id;
    //判断为新增则直接跳转到页面
    if(id != null && id != ""){
      var params={
        id:id
      }
      serviceInstance.callServer(params,function(msg){
        console.info(msg);
        //传输将JSON对象作为字符串传递给前台
        msg.data.customerLinks = JSON.stringify(msg.data.customerLinks);
        res.render('sales/customer_edit', {
          user:req.session.user,
          msg:msg
        });
      },function(msg){
        console.error(msg);
        res.render('sales/customer_edit', {
          user:req.session.user,
          msg:msg
        });
      },serviceEnumerationInstance.SALSE_CUSTOMER_SEARCH_BY_PRIMARYKEY,"POST");

    }else{
       res.render('sales/customer_edit', {
          user:req.session.user,
          msg:{}
      });
    }

  });

  //获取客户联系人信息
  app.get('/sales/customer_links', function(req, res){
      var id = req.query.id;
      var params={
        id:id
      }
      serviceInstance.callServer(params,function(msg){
        console.info(msg);
        res.json({
          customerlinks:msg.data.customerLinks
        });
      },function(msg){
        console.error(msg);
        res.json({
          customerlinks:msg.data.customerLinks
        });
      },serviceEnumerationInstance.SALSE_CUSTOMER_SEARCH_BY_PRIMARYKEY,"POST");

  });

  /**客户管理-保存用户信息**/
  app.post('/sales/customer_save', function(req, res){

     //准备保存用户数据
     var id = req.body.id,
      customerName = req.body.customerName,
      customerType = req.body.customerType,
      customerCellphone = req.body.customerCellphone,
      customerEmail = req.body.customerEmail,
      customerAddress = req.body.customerAddress,
      customerRemark = req.body.customerRmarks,
      custlist = req.body.custlist;
      if(custlist !=null && custlist != ""){
          custlist =  JSON.parse(custlist);
      }

      var params = {
        customerName:customerName,
        customerType:customerType,
        customerEmail:customerEmail,
        customerCellphone:customerCellphone,
        customerAddress:customerAddress,
        customerRemark:customerRemark,
        customerLinks:custlist
      }

      console.info(params);

     if(id != null && id != ""){
      //修改客户
      params.id = id;
      params.updateBy = req.session.user.username;
      serviceInstance.callServer(params,function(msg){
        console.info(msg);
        res.json(msg);
      },function(msg){
        res.json(msg);
      },serviceEnumerationInstance.SALSE_CUSTOMER_SAVE_UPDATE,"POST");

     }else{
      //新增用户
      params.createdBy = req.session.user.username;
      serviceInstance.callServer(params,function(msg){
        console.info(msg);
        res.json(msg);
      },function(msg){
        res.json(msg);
      },serviceEnumerationInstance.SALSE_CUSTOMER_SAVE_NEW,"POST");
     }

  });

  /**客户管理-保存用户信息**/
  app.post('/sales/customer_delete', function(req, res){
    var id = req.body.id;
    //准备用户参数
    var params = {
      id: id
    };
    //更新用户
    serviceInstance.callServer(params,function(msg){
      console.info(msg);
      res.json(msg);
    },function(msg){
      res.json(msg);
    },serviceEnumerationInstance.SALSE_CUSTOMER_SAVE_DELETE,"POST");

  });


};