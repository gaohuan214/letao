
// 功能1: 进度条功能
;$(function(){

    // 全局ajax事件处理函数
    $(document).ajaxStart(function(){
        // 开启进度条
        NProgress.start();
    })

    $(document).ajaxStop(function(){
        // 结束进度条
        NProgress.done();
    })
});

// 功能2: 侧边栏 点击分类管理部分显示隐藏
;$(function(){

    $('.aside .category').click(function(){

        $(this).next().stop().slideToggle();
    })
});

//功能3: 点击顶部bar 左侧按钮,侧边栏隐藏
;$(function(){
    $('.content .icon_left').click(function(){
    //    思路:隐藏侧边栏其实是调整 侧边栏left的值
    //     同时,右侧部分同样向左移动相同距离
        $('.aside').toggleClass('hidemenu');
        $('.content .head').toggleClass('hidemenu');
        $('.content').toggleClass('hidemenu');

    })
})
