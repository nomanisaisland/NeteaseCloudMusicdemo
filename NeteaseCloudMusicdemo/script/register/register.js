$(".register-page").style.height = document.documentElement.clientHeight + "px";
$("video").muted = true;
$("video").loop = true;

// 用户操作功能
function UserLogin() {
    this.mobileNumNtn = function (obj, n, b) {
        obj.addEventListener('click', function () {
            // 判断是否为隐藏
            
            if (obj == $("#mobile_login_verfiy")) {

                juge.phoneNumLen($("#phone"), n, b)
            }
            else if (obj == $("#clear_btn")) {
                user_login.mobile_login.number_clear();
            }else{
                juge.turnPage($("#user_agmet"), n, b);
            }
        });
    };
    // 验证码验证功能
    this.verifiyCodeNum = function (obj) {
        obj.addEventListener("click", function () {
            user_login.mobile_login.verifiycode_input();
            $("#verification_content").oninput = function () {
                
                let codenum = $("#verification_content").value.match(/^\d{0,4}/);
                codenum = codenum.toString();
                // console.log(codenum);
                user_login.mobile_login.mobile_verifiycode($("verification_content"), $("#num1"), $("#num2"), $("#num3"), $("#num4"), codenum);
            }
        })
    }
    this.mobile_login = {
        // 密码登录功能
        mobile_pwd: function () {

        },
        // 验证码显示功能
        mobile_verifiycode: function (obj, obj1, obj2, obj3, obj4, codenum) {
            

            switch (codenum.length) {
                case 1:
                    obj1.innerHTML = codenum;
                    obj2.innerHTML = "";
                    obj3.innerHTML = "";
                    obj4.innerHTML = "";
                    break;
                case 2:
                    obj2.innerHTML = codenum.slice(1, 2);
                    obj3.innerHTML = "";
                    obj4.innerHTML = "";
                    break;
                case 3:
                    // obj4.innerHTML = "";
                    obj3.innerHTML = codenum.slice(2, 3);
                    obj4.innerHTML = "";
                    break;
                case 4:
                    obj4.innerHTML = codenum.slice(3, 4);
                    verifyVcode(codenum);
                    break;
                default:
                    obj1.innerHTML = "";
                    break;
            }
        },
        // 验证码输入功能
        verifiycode_input: function () {
            $("#mobile_verify").addEventListener("click",function(){
                $("#verification_content").focus();
            })
            
        },
        // 验证码框的值
        verifiycode_value: function(obj){
            return obj.value
        },
        //手机号清空功能
        number_clear: function () {
            $("#phone").value = "";
        }

    }
}
let user_login = new UserLogin();

// console.log(typeof(user_login.mobileNumNtn()));
// 判断用户的操作是否可以执行
function Juge(obj) {
    // 跳转页面发生的事件
    this.turnPage = function (obj, n, b) {
        if (obj.checked != false) {
            n.style.display = "none";
            if(b == $(".register-page")){
                b.style.display = "flex";
            }else{
                b.style.display = "block";
            }
        }
    };
    this.phoneNumLen = function (obj, n, b) {
        if (obj.value.length < 11) {
            $(".err-tip").style.opacity = "1";
        } else {
            $(".err-tip").style.opacity = "0";
            n.style.display = "none";
            b.style.display = "block";
        }
    }

}

let juge = new Juge();


// 特殊功能实现
function SpecialFn() {
    this.vcode_len = function () {

    }
}
// let stopPropagation();


//函数执行
// 后退功能
user_login.mobileNumNtn($("#back_index"), $("#mobile_login_pwd"), $(".register-page"));

// 手机密码登录事件
user_login.mobileNumNtn($(".register-content-mobile"), $(".register-page"), $("#mobile_login_pwd"));
// 手机号输入后的事件
user_login.mobileNumNtn($("#mobile_login_verfiy"), $("#mobile_login_pwd"), $("#mobile-verify-pwd"));
// 手机输入后验证码界面出现
user_login.mobileNumNtn($("#mobile_login_footer"), $("#mobile_login_ver"), $("#mobile_verify"));
//手机验证码登录事件
user_login.mobileNumNtn($("#m_verifiycode"), $(".register-page"), $("#mobile_login_ver"));
//点击清空
user_login.mobileNumNtn($("#clear_btn"));

// 验证码
user_login.verifiyCodeNum($("#m_verifiycode"));