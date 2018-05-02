//**接口枚举*/
function ServiceEnumeration(){
	//用户登录验证
 	this.USER_VALIDATE_LOGIN = "userAccount/userinfo.do";

};
exports.init= function (){
	return new ServiceEnumeration();
};