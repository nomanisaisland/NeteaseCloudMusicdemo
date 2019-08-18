let song_play_turn_url = "http://localhost:3000/song/url";
let local_search_a = location.search;
// console.log(local_search_a);
let local_search_reg1 = /(?<=\?id=)\d+/;
let local_search_reg1_url = local_search_a.match(local_search_reg1);
// console.log(local_search_reg1_url)

let local_search_reg2 = /(?<=\?pic=).*/;
let local_search_reg1_pic = local_search_a.match(local_search_reg2);
// console.log(local_search_reg1_pic)

$("#play-mid-btn").style.background = "url("+local_search_reg1_pic+") no-repeat center";
$("#song-list-bottom-img").style.background = "url("+local_search_reg1_pic+") no-repeat center";
$(".song-play-bg").style.background = "url("+local_search_reg1_pic+") no-repeat center";
// render(song_play_turn_url).then(data=>){
$("#play-mid-btn").style.backgroundSize = "100%";
// }

render(song_play_turn_url + "?id=" +local_search_reg1_url).then(data=>{
    // console.log(data);
    $("#song-play").src = data.data[0].url;
    console.log(data.data[0].url)
})

let song_lyric_url = "http://localhost:3000/lyric";
render(song_lyric_url + "?id=" + local_search_reg1_url).then(data=>{
    console.log(data);
    let song_lyric_data_reg = /(?<=\]).*/g;
    let song_lyric_data_arr = data.lrc.lyric.match(song_lyric_data_reg);
    let lyric_arr_input = "";
    song_lyric_data_arr.forEach(function(value, index, arr){
        lyric_arr_input +=
        `
         <p>${value}</p>  
        `
    })
    $("#song_lyric_content").innerHTML = lyric_arr_input;
})    

let song_lyric_detail = "http://localhost:3000/song/detail";
render(song_lyric_detail + "?ids=" + local_search_reg1_url).then(data=>{
    // console.log(data);
    let lyric_title_input = "";
   data.songs.forEach(function(value,index,arr){
        lyric_title_input = 
        `
            <span>${value.name}</span>
            <span>-</span>
            <span>${value.ar[0].name}</span>
        `
   })
    $(".song-player-lyric-title").innerHTML = lyric_title_input;
})
// 
let simi_playlist_url = "http://localhost:3000/simi/playlist";
render(simi_playlist_url + "?id=" + local_search_reg1_url).then(data=>{
    // console.log(data);
    let song_play_include_input = "";
    data.playlists.forEach(function(value,index,arr){
        song_play_include_input += 
        `
        <li>
            <div>
                <div>
                    <img src="${value.coverImgUrl}" alt="">
                    <p>
                        <i></i>
                        <span>${value.playCount}</span>
                    </p>
                </div>
                <p>${value.name}</p>
                <p><span>by</span>${value.creator.nickname}</p>
            </div>
        </li>
        `
    })
    $(".song-play-include-content").innerHTML = song_play_include_input;
})

let simi_playsong_url = "http://localhost:3000/simi/song";
render(simi_playsong_url + "?id=" + local_search_reg1_url).then(data=>{
    // console.log(data);
    let simi_playsong_input = "";
    data.songs.forEach(function(value,index,arr){
        simi_playsong_input +=
        `
        <li>
            <div class="song-list-content-left">
                <img src="../image/songplay/song-play-list1.webp" alt="">
            </div>
            <!-- 左边歌名部分 -->
            <div class="song-list-left hot-song-change">
                <p>${value.name}<span></span></p>
                <p>
                    <!-- 下面图标 -->
                    <i></i>
                    <p>
                         <span>${value.artists[0].name}</span>
                    </p>
                    <!-- 歌手 -->

                </p>
            </div>
            <!-- 右边播放部分 -->
            <div class="radio-box">
                <i class="radio-btn"></i>
            </div>

        </li>
        `
        
    })
    $(".song-play-like-list").innerHTML = simi_playsong_input;
})