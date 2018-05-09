//**接口枚举*/
function ServiceEnumeration(){
	//用户登录验证
 	this.USER_VALIDATE_LOGIN = "userAccount/validateLogin";
 	//用户列表查询
 	this.USER_SEARCH_LIST = "userInfo/getUserInfoPageInfo";
 	//根据用户主键查询用户
 	this.USER_SEARCH_BY_PRIMARYKEY = "userInfo/findUserByPrimaryKey";
 	//保存用户
 	this.USER_SAVE_NEW = "userInfo/addUserInfo";
 	//更新用户
 	this.USER_SAVE_UPDATE = "userInfo/updateUserInfo";
 	//验证用户名唯一
 	this.USER_VALIDATE_QUNIQUE = "userInfo/isUniqueUserName";


};
exports.init= function (){
	return new ServiceEnumeration();
};