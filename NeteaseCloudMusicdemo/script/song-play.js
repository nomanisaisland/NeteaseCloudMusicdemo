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
}