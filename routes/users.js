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
};