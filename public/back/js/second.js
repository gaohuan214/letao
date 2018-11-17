;$(function () {

    var currentPage = 1;
    var pagesize = 5;

    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pagesize,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var str = template('tmp', info);

                $('tbody').html(str);

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    };

    // 点击添加按钮,模态框显示
    // 并且发送ajax请求模态框中下拉框数据
    $('#add').click(function () {
        $('#addModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 1000,

            },
          success: function (info) {
                // console.log(info)
                var str = template('tmp_dropdown', info);
                $('.dropdown-menu').html(str);
            }

        })
    })


    // 点击选中下拉框中元素(事件委托),同步给按钮
    $('.dropdown-menu').on('click','li a',function(){

        var txt=$(this).text();
        $('.tips').text(txt);
        var id=$(this).data('id')
        $("[class='tips']").val(id);
    })

    // 点击上传文件按钮,利用文件上传插件获取文件地址
    $('#fileUpload').fileupload({
        dataType: 'json',
        done:function(e,data){

            var src = data.result.picAddr;
            console.log(src)
            // 将获取到地址赋值给图片的src,以及input的value值
            $('img.upload').attr("src",src);

            $('[name="brandLogo"]').val(src);
        }
    })

    // 提交表单,进行表单校验
        $("#form").bootstrapValidator({
            //1.校验字段
            fields:{

                categoryId:{
                    validators:{
                        notEmpty:{
                            message: "一级分类不能为空"
                        }
                    }
                },
                brandName:{
                    validators:{
                        notEmpty:{
                            message: "品牌名称不能为空"
                        }
                    }
                },
                brandLogo:{
                    validators:{
                        notEmpty:{
                            message: "图片不能为空"
                        }
                    }
                },
            },

            //2. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            //3. 指定不校验的类型,默认为[':disabled', ':hidden', ':not(:visible)']
            excluded:[]
        })

    // 注册表单验证成功事件
    $('#form').on('success.form.bv',function(e){
        console.log($('#form').serialize())
        e.preventDefault();

    //    使用ajax发送请求,添加数据,关闭模态框,重新渲染页面
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( info ){
                console.log(info)
                if(info.success){
                    $('#addModal').modal('hide');
                    render();

                }

            }
        })
    })
})