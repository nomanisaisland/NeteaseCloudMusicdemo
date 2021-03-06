let song_play_turn_url = "http://localhost:3000/song/url";
let local_search_a = location.search;
let id_arr = [];
let num = 0;

let local_search_reg1 = /(?<=\?id=)\d+/;
// 当前歌曲id
let local_search_reg1_url;


let local_search_reg2 = /(?<=\?pic=).*/;
let local_search_reg1_pic = local_search_a.match(local_search_reg2);


// 分离cls区别歌单
let local_search_reg3 = /(?<=\?cls=)\d*/;
let local_search_reg3_cls = parseInt(local_search_a.match(local_search_reg3));
let local_search_reg4 = /(?<=\?iddx=)\d*/;
let local_search_reg4_cls = parseInt(local_search_a.match(local_search_reg4));

$("#play-mid-btn").style.background = "url(" + local_search_reg1_pic + ") no-repeat center";
$(".song-play-bg").style.background = "url(" + local_search_reg1_pic + ") no-repeat center";
// render(song_play_turn_url).then(data=>){
$("#play-mid-btn").style.backgroundSize = "100%";

if(local_search_reg3_cls == 10002){
    render("http://localhost:3000/personalized").then(data => {
        let input = "";
        data.result.splice(0, 6).forEach(value =>{
            if(local_search_reg4_cls == value.id){
                addPage('http://localhost:3000/playlist/detail?id=' + value.id,"privileges");
            }
        })
    })
}
if(local_search_reg3_cls == 10000){
    addPage('http://localhost:3000/personalized/newsong',"result");
}
if(local_search_reg3_cls ==10001){
    addPage('http://localhost:3000/top/list?idx=1',"privileges");
}


// 切歌功能实现
function addPage(url,area) {
    
    render(url).then(data => {
        data[area].forEach(value => {
            id_arr.push(value.id);

        })
        return id_arr;
    }).then(value => {
        // console.log(value)
        local_search_reg1_url = local_search_a.match(local_search_reg1);

        function findId(data) {
            return data == parseInt(local_search_reg1_url);
        }
        value.findIndex(findId);

        if (value.findIndex(findId) != -1) {

            songRender(value[parseInt(value.findIndex(findId))]);
            $(".song_down").addEventListener('click', function () {
                num++;
                local_search_reg1_url = parseInt(value.findIndex(findId) + num);
                if (local_search_reg1_url > value.length - 1) {
                    local_search_reg1_url = value.length - 1;
                    alert("下面没有歌了哦")
                }
                songRender(value[local_search_reg1_url]);
            });
            $(".song_up").addEventListener('click', function () {
                num--;
                local_search_reg1_url = parseInt(value.findIndex(findId) + num);
                if (local_search_reg1_url < 0) {
                    local_search_reg1_url = 0;
                    num = 0;
                    alert("上面没有歌了哦")
                }
                songRender(value[local_search_reg1_url]);

            });
        } else {
            songRender(local_search_reg1_url);
        }

    })
}

function songRender(local_search_reg1_url) {
    render(song_play_turn_url + "?id=" + local_search_reg1_url).then(data => {

        $("#song-play").src = data.data[0].url;

    })
    //歌词渲染
    let song_lyric_url = "http://localhost:3000/lyric";
    render(song_lyric_url + "?id=" + local_search_reg1_url).then(data => {

        let song_lyric_data_reg = /(?<=\]).*/g;
        let song_lyric_data_arr = data.lrc.lyric.match(song_lyric_data_reg);
        let lyric_arr_input = "";
        song_lyric_data_arr.forEach(function (value, index, arr) {
            lyric_arr_input +=
                `
             <p>${value}</p>  
            `
        })
        $("#song_lyric_content").innerHTML = lyric_arr_input;
        let song_lyric_time_reg = /(?<=\[).*(?=\])/g
        let song_lyric_timer_arr = data.lrc.lyric.match(song_lyric_time_reg);
        // console.log(song_lyric_timer_arr)
        // console.log(parseFloat(song_lyric_timer_arr[1])*10000)
        let sum = 0;
        let arr1 = [];
        song_lyric_timer_arr.forEach(function (value, index, arr) {

            let current_time_left_reg = /\d*(?=\:)/;
            let current_time_mid_reg = /(?<=\:)\d*/;
            let current_time_right_reg = /(?<=\.)\d*/;
            let m = parseInt(value.match(current_time_left_reg));
            let s = parseInt(value.match(current_time_mid_reg));
            let ms = parseInt(value.match(current_time_right_reg));
            sum = m * 60 + s + ms / 1000;
            // console.log(s)
            //song-play.js  line:31

            arr1.push(sum);
        })
        // console.log(arr1)

        gettimer(arr1);
    })

    let song_lyric_detail = "http://localhost:3000/song/detail";
    render(song_lyric_detail + "?ids=" + local_search_reg1_url).then(data => {

        let lyric_title_input = "";
        data.songs.forEach(function (value, index, arr) {
            lyric_title_input =
                `
                <span>${value.name}</span>
                <span>-</span>
                <span>${value.ar[0].name}</span>
            `
        })

        //歌名渲染
        $(".song-player-lyric-title").innerHTML = lyric_title_input;
        $(".song-name-title").innerHTML = lyric_title_input;
    })
    // 
    let simi_playlist_url = "http://localhost:3000/simi/playlist";
    render(simi_playlist_url + "?id=" + local_search_reg1_url).then(data => {
        let song_play_include_input = "";
        data.playlists.forEach(function (value, index, arr) {
            playCount(value);
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
    render(simi_playsong_url + "?id=" + local_search_reg1_url).then(data => {

        let simi_playsong_input = "";
        data.songs.forEach(function (value, index, arr) {
            simi_playsong_input +=
                `
            <li>
                <div class="song-list-content-left">
                    <img src="${value.album.picUrl}" alt="">
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

    $("#play-top-box").style.height = document.body.clientHeight + "px";


    let data_url = "http://localhost:3000/comment/music?id=" + local_search_reg1_url;
    addCommoent(data_url);
}





// 切歌