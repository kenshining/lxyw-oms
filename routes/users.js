var tools= require('../lib/tools');
/**
* 我要借款模块
**/
exports.init= function(app,serviceInstance,serviceEnumerationInstance,logger){

  
  /**修改用户密码（本人）**/
  app.get('/user/modify_password', function(req, res){
  
      res.render('user/modify_password', {title: 'Express' });
  });
  /**修改用户密码（重置）**/
  app.get('/user/reset_password', function(req, res){
  
      res.render('user/reset_password', {title: 'Express' });
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
  app.get('/user/user_edit', function(req, res){
    //区别是新增还是修改
    if(req.query.id == null || req.query.id == ''){
      res.render('user/user_edit', {
          msg:{}
      });
    }
    var params = {
      id:req.query.id
    }
    serviceInstance.callServer(params,function(msg){
        console.info(msg);
        res.render('user/user_edit', {
          msg:msg
        });
      },function(msg){
        console.error(msg);
        res.render('user/user_edit', {
          msg:msg
        });
      },serviceEnumerationInstance.USER_SEARCH_BY_PRIMARYKEY,"POST");
      
  });

  /*用户管理*/
  app.post('/user/saveUser', function(req, res){

    var id = req.body.id;
    //准备用户参数
    var params = {
      id: req.body.id,
      username: req.body.username,
      name: req.body.name,
      sex:req.body.sex,
      email:req.body.email,
      idcardNo:req.body.idcardNo,
      birthday:req.body.birthday,
      cellphoneNo:req.body.cellphoneNo,
      wechat:req.body.wechat,
      postCode:req.body.postCode,
      address:req.body.address
    };
    console.info("=============="+id+"================");
    if( id != null && id != ''){
      //更新用户
      serviceInstance.callServer(params,function(msg){
        console.info(msg);
        res.json(msg); 
      },function(msg){
        res.json(msg);
      },serviceEnumerationInstance.USER_SAVE_UPDATE,"POST"); 
    }else{
      //新增用户
      serviceInstance.callServer(params,function(msg){
        console.info(msg);
        res.json(msg); 
      },function(msg){
        res.json(msg);
      },serviceEnumerationInstance.USER_SAVE_NEW,"POST");
    }
  
      
  });

  //删除用户数据
  app.post('/user/deleteUser', function(req, res){

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
    },serviceEnumerationInstance.USER_SAVE_DELETE,"POST");
    
  });

  
  

};