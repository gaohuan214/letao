
// 登录拦截,判断页面是否登录过,是,继续访问,否,去登录

;$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function( info ){
        console.log(info)
        if( info.error === 400 ){

        //    未登录,去登录页
            alert('您未登录,请登录');

            location.href = 'login.html';
        }
    }
});