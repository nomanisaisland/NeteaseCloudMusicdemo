//歌曲播放
$(".song-play-top").addEventListener("click", song_play)
let i = 1;
let n = 1;
let compact_ratate_timer;
function song_play(){
    i++;
    if(i%2 == 0){
        clearInterval(compact_ratate_timer);
        $("#song-play").play();
        $(".song-play-compact-btn").style.opacity = 0;
        compact_ratate_timer = setInterval(compact_ratate,50)
    }else{
        clearInterval(compact_ratate_timer);
        $("#song-play").pause();
        $(".song-play-compact-btn").style.opacity = 1;
    }
    
}


function compact_ratate(){
    n++;
    $(".song-play-compact-out").style.transform = "rotateZ(" + n + "deg)";
    if(n > 360){
        n = 1;
    }
}

// $("#song-play").addEventListener("loadedmetadata",function(){
//     console.log($("#song-play").duration)
// })
// 歌词滚动
function gettimer(target){
    let top = 0;
    let num = 0;
    let index = 0;

    $("#song-play").onloadedmetadata = function(){
        // console.log($("#song-play").duration)
    }
    $("#song-play").ontimeupdate = function(){
        
        let current_time = $("#song-play").currentTime.toFixed(3);
        // let current_time_reg = /[0-9]*\.[0-9]{3}/;

        if(current_time >= target[num]){
            index++;
            num++;
            top -= 0.5;
           
            // console.log(top.toFixed(3));
            // console.log(current_time);
            $(".song-player-lyric-box").style.top = top.toFixed(3) + "rem";
            if(index>1) $A("#song_lyric_content > p")[index-2].style.color = "white";

            if(num>=3) $A("#song_lyric_content > p")[index-1].style.color = "red";
            if(top > target[target.length-1]){
                return false;

            }
        }
    }
}

//完整歌单的位置
// console.log($("#play-top-box"))
$("#play-top-box").style.height = document.body.clientHeight + "px";