
// 进行登录拦截,页面一加载就判断用户是否登录过,没有,去登录页面登录
// 前端不知道是否登录过,但是后台指定,向后台请求数据
;$(function(){
    $.ajax({
        type: "get",
        url: "/employee/checkRootLogin",
        dataType: 'json',
        success: function( info){
            if( info.error === 400){
                location.href = "login.html";
            }
        }
    })
})