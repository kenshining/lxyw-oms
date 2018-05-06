//**接口枚举*/
function ServiceEnumeration(){
	//用户登录验证
 	this.USER_VALIDATE_LOGIN = "userAccount/validateLogin";
 	//用户列表查询
 	this.USER_SEARCH_LIST = "userInfo/getUserInfoPageInfo";
 	//验证用户名唯一
 	this.USER_VALIDATE_QUNIQUE = "userInfo/isUniqueUserName";


};
exports.init= function (){
	return new ServiceEnumeration();
};