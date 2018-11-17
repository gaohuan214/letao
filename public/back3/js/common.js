

// 功能1: 添加进度条(插件)
//jq中ajax的全局事件,ajaxStart,在开始一个ajax请求时触发
$(document).ajaxStart(function(){
    //开启进度条
    NProgress.start();
})

//ajaxStop在ajax请求结束后触发(所有ajax请求结束)
$(document).ajaxStop(function(){
    //关闭进度条
    NProgress.done();
})

// 功能2: 侧边栏分类管理,隐藏列表显示
;$(function(){
    $('.lt_aside .categories').click(function(){
        // 用slideToggle增加动态效果
        $('.category').stop().slideToggle();
    })
})

// 功能3:点击topbar左边按钮,侧边栏隐藏
;$(function(){
    $('.topbar .icon_left').click(function(){

    //    侧边栏隐藏
        $('.lt_aside').toggleClass('hide_menu');
    //   topbar 的padding_left值同步改变
        $('.topbar').toggleClass('hide_menu');
    //   content部分 padding_left值同步改变
        $('.lt_content').toggleClass('hide_menu');
    })
})