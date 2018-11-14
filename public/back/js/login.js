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
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                },

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
                    },

                    callback: {
                        message : "密码错误",
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
                console.log(info);
               // 参数1: 校验字段  username/password
                // 参数2: 校验状态  NOT_VALIDATED(未校验), VALIDATING(校验中), INVALID(失败) or VALID(成功)
                // 参数3: 校验规则, 用来配置错误时的提示信息
                if(info.error === 1001){
                    // 密码错误
                    $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
                else if(info.error === 1000 ){
                   //   用户名不存在
                    $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }else if(info.success){
                     // 表示验证成功
                     location.href = "index.html";
                }
            }
        })
    });
})

// 重置表单
$('[type="reset"]').on("click",function(){

    $('#form').data("bootstrapValidator").resetForm( );
});