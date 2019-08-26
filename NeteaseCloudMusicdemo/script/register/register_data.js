$("#mobile_login_footer").addEventListener('click', function () {
    // let phonenum = $("#phone").value;
    let phonenum = 15659821008;

    fetch("http://localhost:3000/cellphone/existence/check?phone=" + phonenum, {
        method: "POST"
    }).then(response => {
        if (response.status == 200) {
            return response.json();
        }
    }).then(data => {
        if (parseInt(data.exist) == 1) {
            user_login.mobileNumNtn($("#mobile_login_footer"), $(".mobile-login"), $(".mobile-verify-pwd"));
            pwdVerfiy(phonenum);
        } else if (parseInt(data.exist) == -1) {
            console.log(data.exist);
        }
    })
});
// 密码验证
function pwdVerfiy(phonenum) {
    $("#user_login").addEventListener("click", function () {
        let phonepwd = $("#user_pwd").value;
        fetch("http://localhost:3000/login/cellphone?phone=" + phonenum + "&password=" + phonepwd, {
            method: "POST"
        }).then(response => {
            if (response.status == 200) {
                return response.json();
            }
            if (response.status == 502) {
                console.log("密码错误");
            }
        }).then(data => {
            console.log(data);
        })
    })
}

// 验证码

function verifyVcode(codenum) {
    fetch("http://localhost:3000/captcha/verify?phone=15659821008&captcha="+codenum, {
        method: "POST"
    }).then(response => {
        if(response.status == 200){
            return response.json()
        }
        else if(response.status == 503){
            console.log(验证码错误);
        }
    }).then(data=>{
        console.log(data);
    })
}