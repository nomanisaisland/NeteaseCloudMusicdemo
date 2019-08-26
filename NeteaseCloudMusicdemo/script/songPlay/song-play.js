
$(".song-mian").style.height = document.documentElement.clientHeight * 0.9 + "px";
//歌曲播放
$(".song-play-compact-btn").addEventListener("click", song_play)

$("#play_btn").addEventListener("click", song_play)

let i = 1;
let n = 1;
let compact_ratate_timer;

function song_play(e) {
    e.stopPropagation();
    i++;
    if (i % 2 == 0) {

        $("#song-play").play();

    } else {
        $("#song-play").pause();
    }
    $("#song-play").onpause = function(){
        clearInterval(compact_ratate_timer);
        $(".song-play-compact-btn").style.opacity = 0;
        $("#play_btn").className = "fa fa-play";
    }
    $("#song-play").onplay = function(){
        clearInterval(compact_ratate_timer);
        $(".song-play-compact-btn").style.opacity = 1;
        $("#play_btn").className = "fa fa-pause";
        compact_ratate_timer = setInterval(compact_ratate, 50)
    }
}

function compact_ratate() {
    n++;
    $(".song-play-compact-out").style.transform = "rotateZ(" + n + "deg)";
    if (n > 360) {
        n = 1;
    }
}

// 歌词滚动
function gettimer(target) {
    // console.log(target)
    let top;
    let currentLine = 0;
    let current_time;

    
    // if($("#song-play").currentTime == 0){
    //     return;
    // }
    $("#input").oninput = function(){
        $("#song-play").currentTime = this.value * $("#song-play").duration/100;
    }    

    $("#song-play").ontimeupdate = function () {


        current_time = $("#song-play").currentTime;

        for(j = currentLine, len = target.length ; j < len ;j++){
            $A("#song_lyric_content > p")[j].style.color = "white";
            if (current_time >= target[j] && current_time <= target[j+1]) {
                currentLine = j;
                top =-0.6 + (-0.3 * currentLine);
                // console.log(top)
                $(".song-player-lyric-box").style.top = top + "rem";
                $A("#song_lyric_content > p")[j].style.color = "red";
              
                break;
            } 
        }


        if ($("#song-play").currentTime.toFixed(0) < 10) {
            $(".current-time").innerHTML = "0:0" + $("#song-play").currentTime.toFixed(0);
        }
        if ($("#song-play").currentTime.toFixed(0) > 10 && $("#song-play").currentTime.toFixed(0) < 60) {
            $(".current-time").innerHTML = "0:" + $("#song-play").currentTime.toFixed(0);
        }
        if ($("#song-play").currentTime.toFixed(0) >= 59) {
            if (($("#song-play").currentTime % 60).toFixed(0) < 10) {
                $(".current-time").innerHTML = parseInt($("#song-play").currentTime.toFixed(0) / 60) + ":0" + ($("#song-play").currentTime % 60).toFixed(0);

            }else{
                $(".current-time").innerHTML = parseInt($("#song-play").currentTime.toFixed(0) / 60) + ":" + ($("#song-play").currentTime % 60).toFixed(0);

            }
        }

        if ($("#song-play").duration.toFixed(0) < 10) {
            $(".duration_time").innerHTML = "0:0" + $("#song-play").duration.toFixed(0);
        }
        if ($("#song-play").duration.toFixed(0) > 10 && $("#song-play").duration.toFixed(0) < 60) {
            $(".duration_time").innerHTML = "0:" + $("#song-play").duration.toFixed(0);
        }
        if ($("#song-play").duration.toFixed(0) >= 60) {
            if (($("#song-play").duration / 60).toFixed(0) < 10) {
                $(".duration_time").innerHTML = parseInt($("#song-play").duration.toFixed(0) / 60) + ":0" + ($("#song-play").duration / 60).toFixed(0);
            } else {
                $(".duration_time").innerHTML = parseInt($("#song-play").duration.toFixed(0) / 60) + ":" + ($("#song-play").duration / 60).toFixed(0);
            }
        }


        $("#input").value = 100 * $("#song-play").currentTime / $("#song-play").duration
    }
    $("#song-play").onseeked = function() {//audio进度更改后事件
        current_time = $("#song-play").currentTime;
        for (k=0, len=target.length; k<len; k++){
            $A("#song_lyric_content > p")[k].style.color = "white";

            if (current_time < target[k+1] && current_time >= target[k]){
                $A("#song_lyric_content > p")[k].style.color = "red";
                currentLine =  k;
                break;
            }
        }
    };
}


//完整歌单的位置

let num_count = 0;
$(".player-turn-control").addEventListener("click", function () {
        $(".song-play-compact").style.display = "none";
        $(".song-play-like").style.display = "none";
        $("#ofplfooter").style.display = "none";
        $(".top-hook").style.display = "none";
        $(".song-player-lyric").style.height = "3.5rem";
        $(".song-player-lyric").style.top = "1rem";
        $(".song-player-lyric-box").style.marginTop = "1.5rem";
        $("#song_lyric_turn").style.color = "red";
        $(".song-name-title").style.display = "block";
        $(".player-turn-control").style.display="none";
        $(".player-control").style.display = "block";

})
$("#song_lyric_turn").addEventListener("click", function (){
    $(".song-play-compact").style.display = "block";
        $(".song-play-like").style.display = "block";
        $("#ofplfooter").style.display = "block";
        $(".top-hook").style.display = "block";
        $(".song-player-lyric").style.height = "1.2rem";
        $(".song-player-lyric").style.top = "0";
        $(".song-player-lyric-box").style.marginTop = "0";
        $("#song_lyric_turn").style.color = "white";
        $(".song-name-title").style.display = "none";
        $(".player-control").style.display = "none";
        $(".player-turn-control").style.display="block";
    
})