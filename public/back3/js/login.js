
;$(function(){
    // 校验规则
    $("#form").bootstrapValidator({

        // 校验字段
        fields: {
            // 校验用户名, 对应的是name的属性值
            username: {
                // 校验规则
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: "用户名不能为空",
                    },
                    // 长度校验
                    stringLength: {
                        min: 2 ,
                        max: 6 ,
                        message: "用户名长度2-6位",
                    },
                    // 自定义配置校验
                    callback:{
                        message: "用户名不存在",
                    }
                }
            },
            password: {
                validators: {

                    // 不能为空
                    notEmpty: {
                        message: "密码不能为空",
                    },
                    // 长度校验
                    stringLength: {
                        min: 6,
                        max: 12 ,
                        message: "密码长度6-12位",
                    },
                    // 自定义配置密码校验
                    callback: {
                        message: "密码错误",
                    }
                }
            }
        },

        // 指定校验时的图标显示，默认是bootstrap风格
        // 参数说明 : valid(验证成功) invalid(验证失败) validating(验证中)
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    })

    // 重置按钮(完善)
    // 功能:点击重置按钮,表单内容清空(默认会),添加功能: 状态图标清空
    // resetForm(resetFormData) resetFormData为boolean ,为true时,清空表单所有内容,不传参,只清空图标部分
    $('[type="reset"]').on('click',function(){
        // reset本身就会清空表单内容,故resetForm不传参
        $("form").data('bootstrapValidator').resetForm();
    })

    //  2. 表单校验需要在表单提交时, 进行校验, 需要submit按钮
    //     可以注册一个表单校验成功事件, 表单校验成功之后, 默认会提交
    //     可以在成功事件中, 阻止默认的表单提交, 通过 ajax 提交, 就不会跳转了
    //
    //  思路: 1. 注册表单校验成功事件
    //       2. 在事件中, 阻止默认的表单提交, 通过 ajax 提交即可
    $('#form').on("success.form.bv",function( e ){
        console.log(1)
        // 阻止表单通过submit按钮提交
        e.preventDefault();
        // 通过ajax请求
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            // 通过表单序列化快速获取表单数据
            data: $('#form').serialize(),
            dataType:'json',
            success: function(info){
                console.log(info)
                if (info.success){
                    // 验证成功跳转到首页
                    location.href = "index.html"
                } else if(info.error === 1001){
                    //密码错误
                    $(form).data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }else if(info.error === 1000){
                    //用户名不存在
                    $(form).data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }

            }
        })
    })
})