// 头部背景图渲染
let local_search = location.search;
// console.log(local_search);   
let local_search_reg = /(?<=\?id=)\d+/;
let detail_data_url = local_search.match(local_search_reg).toString();
// console.log(detail_data_url);
let local_search_pic_reg = /(?<=\&?pic=).+/;
let datail_data_bg = local_search.match(local_search_pic_reg).toString();
// console.log(datail_data_bg)


$(".ofplheader-wrap-bg").style.background = "url(" + datail_data_bg + ") no-repeat center";
$(".ofplheader-wrap-pic > img").src = datail_data_bg;

let detail_detail_data_url = "http://localhost:3000/playlist/detail?id=";
render(detail_detail_data_url + detail_data_url).then(data => {

    $(".ofplheader-wrap-right-title").innerHTML = data.playlist.name;
    $(".ofplheader-wrap-right-user > span").innerHTML = data.playlist.creator.nickname;
    $(".ofplheader-wrap-right-user > i > img").src = data.playlist.creator.avatarUrl.toString();
    $(".ofplheader-wrap-right-user > i > img").src = data.playlist.creator.avatarUrl.toString();
    $(".ofplheader-lable-description").innerHTML = data.playlist.description;

    $(".play-count").innerHTML = (data.playlist.playCount / 10000).toFixed(1) + "万";
    // 收藏数

    // 头部标签

    let mark_input = "";
    data.playlist.tags.forEach(value => {

        mark_input +=
            `
        <span>${value}</span>
        `
    })
    $(".ofplheader-lable-mark").innerHTML = mark_input;




    let song_list_input = "";
    data.playlist.tracks.forEach((value, index)=> {

        if (value.al.name.length > 1) {
            value.al.name = "-&nbsp" + value.al.name;
        }

        song_list_input +=
            `
        <a href="song-play.html?id=${value.id}?pic=${value.al.picUrl}">
            <li>
                <div class="song-list-content-left first num">
                    ${index+1}
                </div>
                <!-- 左边歌名部分 -->
                <div class="song-list-left hot-song-change">
                    <p>${value.name}<span></span></p>
                    <p>     
                        <!-- 下面图标 -->
                        <i></i>
                        <span>${value.ar[0].name}</span>
                        <span>${value.al.name}</span>
                        <!-- 歌手 -->

                    </p>
                </div>
                <!-- 右边播放部分 -->
                <div class="radio-box">
                    <i class="radio-btn"></i>
                </div>

            </li>
        </a>
        `
    })
    $("#song-list-recom").innerHTML = song_list_input;
})
let data_url = "http://localhost:3000/comment/playlist?id="+detail_data_url;
addCommoent(data_url);
