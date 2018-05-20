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
 	//删除用户
 	this.USER_SAVE_DELETE = "userInfo/deleteUserInfo";
 	//验证用户名唯一
 	this.USER_VALIDATE_QUNIQUE = "userInfo/isUniqueUserName";
 	//修改用户密码
 	this.USER_MODIFY_PASSWORD = "userInfo/modifyUserPassword";
 	//重置用户密码
 	this.USER_RESET_PASSWORD = "userInfo/resetUserPassword";

 	//库存管理
 	//供应商查询分页
 	this.STOCK_SUPPLIER_SEARCH_LIST = "supplierSubject/getSupplierSubjectPageInfo";
 	//供应商主键查询供应商信息
 	this.STOCK_SUPPLIER_SEARCH_BY_PRIMARYKEY = "supplierSubject/getSupplierSubjectById";
 	//供应商新增
 	this.STOCK_SUPPLIER_SAVE_NEW = "supplierSubject/addSupplierSubject";
 	//供应商更新
 	this.STOCK_SUPPLIER_SAVE_UPDATE = "supplierSubject/updateSupplierSubject";
 	//供应商删除
 	this.STOCK_SUPPLIER_SAVE_DELETE = "supplierSubject/deleteSupplierSubject";

 	//库存查询分页
 	this.STOCK_SEARCH_LIST = "stockList/getStockListPageInfo";
 	//库存主键查询库存记录
 	this.STOCK_SEARCH_BY_PRIMARYKEY = "stockList/getStockListById";
 	//新增库存信息
 	this.STOCK_SAVE_NEW = "stockList/addStockList";
 	//更新库存记录
 	this.STOCK_SAVE_UPDATE = "stockList/updateStockList";
 	//删除库存记录
 	this.STOCK_SAVE_DELETE = "stockList/deleteStockList";

 	//销售管理
 	//销售客户信息分页查询
 	this.SALSE_CUSTOMER_LIST = "customerInfo/getCustomerPageInfo";
 	//主键查询销售客户信息
 	this.SALSE_CUSTOMER_SEARCH_BY_PRIMARYKEY = "customerInfo/findCustomerInfoByPrimaryKey";
 	//销售客户新增
 	this.SALSE_CUSTOMER_SAVE_NEW = "customerInfo/addCustomerInfo";
 	//销售客户保存
 	this.SALSE_CUSTOMER_SAVE_UPDATE = "customerInfo/updateCustomerInfo";
 	//销售客户删除
 	this.SALSE_CUSTOMER_SAVE_DELETE = "customerInfo/deleteCustomerInfo";

 	//销售管理
 	//销售订单分页查询
 	this.SALSE_SEARCH_LIST = "userInfo";
 	//按主键查询销售订单
 	this.SALSE_SEARCH_BY_PRIMARYKEY = "userInfo";
 	//新增销售订单
 	this.SALSE_SAVE_NEW = "userInfo";
 	//销售订单更新
 	this.SALSE_SAVE_UPDATE = "userInfo";
 	//删除销售订单
 	this.SALSE_SAVE_DELETE = "userInfo";
 	//销售订单状态更新
 	this.SALSE_SAVE_UPDATE_STATE = "userInfo";


 	//二期接口
 	//报表与数据统计
 	//销售图形报表统计，传入日期段反馈销售数据。
 	this.REPORT_SALSE_ANALYZES_BY_DATE = "userInfo";
 	//库存统计、当前库存状态
 	this.REPORT_STOCK_ANALYZES = "userInfo";

};
exports.init= function (){
	return new ServiceEnumeration();
};