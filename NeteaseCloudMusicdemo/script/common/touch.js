var box = document.getElementById("move");
var startx, starty, movex, movey, endx, endy, nx, ny, angle;

function touchs(event,value) {
    // event.preventDefault();  //告诉浏览器不要执行默认动作

    if (event.type == "touchstart") {
        /*console.log('开始');*/
        var touch = event.touches[0];
        startx = Math.floor(touch.pageX);
        starty = Math.floor(touch.pageY);
    } else if (event.type == "touchmove") {
        /*console.log('滑动中');*/
        var touch = event.touches[0];
        movex = Math.floor(touch.pageX);
        movey = Math.floor(touch.pageY);


    } else if (event.type == "touchend" || event.type == "touchcancel") {
        endx = Math.floor(event.changedTouches[0].pageX);
        endy = Math.floor(event.changedTouches[0].pageY);
        /*console.log('结束');*/

        nx = endx - startx;
        ny = endy - starty;

        //通过坐标计算角度公式 Math.atan2(y,x)*180/Math.PI
        angle = Math.atan2(ny, nx) * 180 / Math.PI;

        if (Math.abs(nx) <= 1 || Math.abs(ny) <= 1) {
            console.log("1");
            num++;
            local_search_reg1_url = parseInt(value.findIndex(findId) + num);
            if (local_search_reg1_url > value.length - 1) {
                local_search_reg1_url = value.length - 1;
                alert("下面没有歌了哦")
            }
            songRender(value[local_search_reg1_url]);
            return false;
        }

        if (angle < 45 && angle >= -45) {
            num--;
            local_search_reg1_url = parseInt(value.findIndex(findId) + num);
            if (local_search_reg1_url < 0) {
                local_search_reg1_url = 0;
                num = 0;
                alert("上面没有歌了哦")
            }
            songRender(value[local_search_reg1_url]);
            return false;
        } else if (angle < 135 && angle >= 45) {
            return false;
        } else if ((angle <= 180 && angle >= 135) || (angle >= -180 && angle < -135)) {

            return false;
        } else if (angle <= -45 && angle >= -135) {
            return false;
        }

    }

}

// box.addEventListener('touchstart', touchs, false);
// box.addEventListener('touchmove', touchs, false);
// box.addEventListener('touchend', touchs, false);

// $("body").addEventListener('touchstart', touchs, false);
// $("body").addEventListener('touchmove', touchs, false);
// $("body").addEventListener('touchend', touchs, false);