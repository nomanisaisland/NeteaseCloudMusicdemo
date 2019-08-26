$("#mobile_login_verfiy").addEventListener('click', function () {
    let phonenum = $("#phone").value;
    // let phonenum = 15659821008;

    fetch("http://localhost:3000/cellphone/existence/check?phone=" + phonenum, {
        method: "POST"
    }).then(response => {
        if (response.status == 200) {
            return response.json();
        }
    }).then(data => {
        console.log(data)
        if (parseInt(data.exist) == 1) {
            // 手机号输入后的事件
            juge.turnPage($("#user_agmet"), $("#mobile_login_pwd"), $(".mobile-verify-pwd"))    ;

            // user_login.mobileNumNtn($("#mobile_login_verfiy"), $(".mobile-login"), $(".mobile-verify-pwd"));
            pwdVerfiy(phonenum);
        } else if (parseInt(data.exist) == -1) {
            console.log(data.exist);
            juge.turnPage($("#user_agmet"), $("#mobile_login_pwd"), $("#mobile_verify"));
            let phonenunb = $("#phone").value;
            // 发送验证码
            fetch("http://localhost:3000/captcha/sent?phone=" + phonenunb, {
                method: "POST"
            }).then(response => {
                if (response.status = 200) {
                    return response.json();
                }
            }).then(data => {
                console.log(data)

                juge.turnPage($("#user_agmet"), $(".mobile-new-pwd"), $("#mobile_verify"));
                user_login.mobile_login.verifiycode_input();
                $("#verification_content").oninput = function () {
                    let codenum = $("#verification_content").value.match(/^\d{0,4}/);
                    codenum = codenum.toString();
                    console.log(codenum);
                    user_login.mobile_login.mobile_verifiycode($("verification_content"), $("#num1"), $("#num2"), $("#num3"), $("#num4"), codenum);
                }

            })
        }
    })
});
// 密码验证
function pwdVerfiy(phonenum) {
    $("#user_login").addEventListener("click", function () {
        let phonepwd = $("#user_pwd").value;
        console.log(phonenum)
        console.log(phonepwd)
        fetch("http://localhost:3000/login/cellphone?phone=" + phonenum + "&password=" + phonepwd, {
            method: "POST"
        }).then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                console.log("密码错误");
                $(".err-pwd").style.opacity = "1";

                return false;
            }
        }).then(data => {
            console.log(data)
            $("#user_login_btn").href = "index.html?id=" + data.account.id;
        })
    })
}

// 验证码
// 发送验证码
$("#user_register").addEventListener("click", function () {
    let phonenunb = $("#phone").value;

    fetch("http://localhost:3000/captcha/sent?phone=" + phonenunb, {
        method: "POST"
    }).then(response => {
        if (response.status = 200) {
            return response.json();
        }
    }).then(data => {
        console.log(data)

        juge.turnPage($("#user_agmet"), $(".mobile-new-pwd"), $("#mobile_verify"));
        user_login.mobile_login.verifiycode_input();
        $("#verification_content").oninput = function () {
            let codenum = $("#verification_content").value.match(/^\d{0,4}/);
            codenum = codenum.toString();
            console.log(codenum);
            user_login.mobile_login.mobile_verifiycode($("verification_content"), $("#num1"), $("#num2"), $("#num3"), $("#num4"), codenum);
        }

    })
})

// 验证验证码
function verifyVcode(codenum) {
    let phone_num = $("#phone").value;
    let user_new_pwd = $("#user_new_pwd").value;
    fetch("http://localhost:3000/register/cellphone?phone=" + phone_num + "&password=" + user_new_pwd + "&captcha=" + codenum, {
        method: "POST"
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        } else if (response.status == 503) {
            $(".code_err").style.opacity = "1";
        }
    }).then(data => {
        // console.log(data)   
        if (data.code == 200) {
            setInterval(function () {
                $("#turn_page_index").src = "index.html?id=" + data.account.id;
            }, 100)
        }
    })
}