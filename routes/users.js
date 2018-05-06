var tools= require('../lib/tools');
/**
* 我要借款模块
**/
exports.init= function(app,serviceInstance,serviceEnumerationInstance,logger){
  
  /**跳转库存**/
  app.get('/user/modify_password', function(req, res){
  
      res.render('user/modify_password', {title: 'Express' });
  });
  app.get('/user/modify_self_information', function(req, res){
  
      res.render('user/modify_self_information', {title: 'Express' });
  });

  /*用户管理*/
  app.get('/user/user_control', function(req, res){
  
      res.render('user/user_control', {title: 'Express' });
  });
  app.get('/user/user_findUserByPage', function(req, res){
  
       var params = {
          pageIndex:(req.query.page-1)*req.query.limit,
          pageSize:req.query.limit,
          username:null,
          name:null,
          cellphoneNo:null
       };
       if(req.query.username != ''){
          params.username = req.query.username;
       }
       if(req.query.name != ''){
          params.name = req.query.name;
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
      },serviceEnumerationInstance.USER_SEARCH_LIST,"POST"); 
  });

};