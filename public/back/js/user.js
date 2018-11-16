

$(function(){
    var currentpage =1;
    var pageSize = 5;

    // 进入页面，获取第一屏数据
    render();

    //封装渲染的方法
    function render(  ){
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentpage ,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function( info ){
                console.log( info)

                //将模板所需数据与模板结合
                var str = template('tmp',info)
                //    进行渲染
                $('tbody').html(str);

                var paginator = $('#bp-element');

                options = {
                    bootstrapMajorVersion:3, //对应的bootstrap版本
                    currentPage: currentpage, //当前页数，这里是用的EL表达式，获取从后台传过来的值
                    totalPages: Math.ceil(info.total/ info.size), //总页数，这里是用的EL表达式，获取从后台传过来的值

                    // 为操作按钮添加点击事件
                    onPageClicked:function(event, originalEvent, type,page){

                         // 将page赋值给currentpage

                         currentpage = page;

                        // 进行渲染
                        render();
                    }
                };
                paginator.bootstrapPaginator(options);
            }
        });
    }


   // 为操作按钮添加点击事件,用事件委托,
    // 1. 点击操作按钮  模态框显示
    // 2. 点击模态框 确认 按钮,发送ajax请求,重新渲染页面,关闭模态框
    // 发送ajax请求更新用户信息
   //  根据按钮颜色操作对应数据(id)

    $('tbody').on('click','.btn',function(){
       // 获取id
        var id= $(this).parent().data('id');

        var isDelete = $(this).hasClass('btn-danger')?0:1;

        // 显示模态框
        $('#updateModal').modal( 'show')

        $('#confirm').click(function(){
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data:{
                    id: id,
                    isDelete: isDelete,
                },
                dataType: 'json',
                success: function( info ){

                    if( info.success){

                        // 关闭模态框
                        $('#updateModal').modal( 'hide')

                        //重新渲染当前页
                        render()
                    }
                }
            })
        })

    })
})