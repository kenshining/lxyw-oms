/**
* 	对基础方法的封装。
*	formatMoney	格式化金额（如无设置则按照三位分割逗号，小数点后两位返回）
*/
function CommonValidationEmu(options){
	this.options = options;
	//枚举信息
	this.errorMsg = {

		all_not_null:'该表单所有字段均不能为空。',
		all_worng_cellphoneNo:'注意手机号输入格式不正确。',
		all_worng_email:'请输入有效的EMAIL地址。',
		all_worng_idcardNo:'请输入有效的身份证号。'
	};
}
CommonValidationEmu.prototype = {
  	
};