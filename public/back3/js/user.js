
// 查询用户信息
;$(function(){
    var currentpage = 1;
    var pagesize = 5;

    render();

    // 封装渲染的方法
    function render(){
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentpage,
                pageSize: pagesize,
            },
            dataType: 'json',
            success: function( info){
                console.log(info)
                var str = template('tmp',info);
                $('tbody').html(str);

                //使用分页
                $('#pagination').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    // currentPage: 1,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked:function(event, originalEvent, type,page){
                        console.log(page)
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentpage = page;
                        render();
                    }
                })

            }
        })
    };


    // 点击操作按钮,弹出模态框

    $('tbody').on('click','.btn',function(){

        $('#userModal').modal('show');
        var id= $(this).parent().data('id');
        console.log(id)
        var isDelete= $(this).hasClass('btn-danger')?"0":"1";


        // 点击确认按钮,发送ajax请求,成功后,隐藏模态框,重新渲染页面
        $('#confirm').click(function(){
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete,
                },
                dataType: 'json',
                success: function( info){
                    console.log(info)
                    $('#userModal').modal('hide');
                    render();
                }
            })
        })
    })

})

