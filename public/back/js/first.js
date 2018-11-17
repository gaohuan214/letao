
;$(function(){

    var currentPage = 1;
    var pagesize = 5;

    render();

    function render(){

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pagesize,
            },
            dataType: 'json',
            success: function( info ){
                console.log(info)
                // 将模板和数据结合
                var str = template('tmp',info);
                // 页面渲染
                $('tbody').html(str);

                $('#paginator').bootstrapPaginator({
                    // bootstrap版本
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil(info.total/info.size),//总页数
                    //位按钮绑定点击事件  page:当前点击的按钮值
                    onPageClicked: function( a,b,c,page){

                        currentPage = page;
                        render();
                    }
                })
            }
        })
    };

     // 点击分类按钮
    // 1.添加模态框显示
    $('#add').click(function(){
        $('#addModal').modal('show');
    })
    // 2.点击添加按钮,发送ajax请求


        // 表单校验(不能为空)

        $('#form').bootstrapValidator({
            // 1. 校验字段
            fields:{
                categoryName:{
                    validators:{
                        notEmpty:{
                            message: '请输入一级分类名称',
                        }
                    }
                }
            },
            //2. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
        });

        //注册表单验证成功事件
        $('#form').on('success.form.bv',function( e ){
            // 阻止默认submit提交表单
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/category/addTopCategory',
                data: $('#form').serialize(),
                dataType: 'json',
                success: function( info ){
                    console.log(info)
                 if( info.success){
                 //    关闭模态框
                     $('#addModal').modal('hide');
                 // 重置表单项
                     $('#form').data('bootstrapValidator').resetForm( true);
                 //        重新渲染页面
                     render();
                 }
                }
            })
        })


})