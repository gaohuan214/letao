;$(function () {

// 校验规则：
//
// 1. 用户名不能为空
// 2. 用户密码不能为空
// 3. 用户密码长度为6-12位

    $('#form').bootstrapValidator({
        //配置验证的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验字段
        fields: {
            //验证用户名
            username: {
                // 进行多个规则配置
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: "用户名不能为空"
                    }
                }
            },
            //验证密码
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空",
                    },

                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度为6-12位"
                    }
                }
            }
        },

    })

//    表单校验成功,注册表单校验成功的事件，阻止默认提交，使用ajax提交
    $("#form").on('success.form.bv', function (e) {
        //阻止默认事件
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( info){
                //验证成功过，跳转到index页面
                location.href = "index.html";
            }
        })
    });

})