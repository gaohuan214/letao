
// 功能1: 进度条功能

    // 全局ajax事件处理函数
    $(document).ajaxStart(function(){
        // 开启进度条
        NProgress.start();
    });

    $(document).ajaxStop(function(){
        setTimeout(function(){
            // 结束进度条
            NProgress.done();
        },500)
    })


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
});


//功能4: 模态框的显示与隐藏
;$(function(){
    // 点击顶部 bar 右侧按钮 ,模态框显示
    $('.content .icon_right').click(function(){

        $('#logoutModal').modal();

    })
});

//功能5: 登出功能
// 点击登出按钮,向后台提交登出请求
;$(function(){
    $('#logout').click(function(){

        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function( info ){
                if( info.success){
                    //成功 ,返回登录页面
                    location.href = "login.html";
                }else if( info.error){
                    alert('登出失败,请稍后重试');
                }
            }
        })
    })
});



