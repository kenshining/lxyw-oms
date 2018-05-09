;(function($){
    $.fn.Role = function(options){
        
        var defaults = {
            //显示属性，若为空字符串则默认为显示内容
            displayRole:'',
            //对照显示属性，若存在ownRoles内的编码与displayRole一致，则显示。
            //若无法找到则将HTML片段焚毁。
            ownRoles:[]
        }


        var options = $.extend(defaults,options);

        this.each(function(){

            var _this = $(this);


        });

        return this;
    }



})(jQuery);