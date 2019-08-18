// 头部背景图渲染
let local_search = location.search;
// console.log(local_search);   
let local_search_reg = /(?<=\?id=)\d+/;
let detail_data_url = local_search.match(local_search_reg).toString();
// console.log(detail_data_url);
let local_search_pic_reg = /(?<=\&?pic=).+/;
let datail_data_bg = local_search.match(local_search_pic_reg).toString();
// console.log(datail_data_bg)

    
$(".ofplheader-wrap-bg").style.background = "url("+datail_data_bg+") no-repeat center";
$(".ofplheader-wrap-pic > img").src = datail_data_bg;

fetch("http://localhost:3000/playlist/detail?id="+detail_data_url,{
    method: "GET",
    mode: "cors" 
}).then(r=>{
    if(r.status == 200){
        return r.json();
    }
}).then(data=>{
    // console.log(data);
    $(".ofplheader-wrap-right-title").innerHTML = data.playlist.name;
    $(".ofplheader-wrap-right-user > span").innerHTML = data.playlist.creator.nickname;
    $(".ofplheader-wrap-right-user > i > img").src = data.playlist.creator.avatarUrl.toString();     
    $(".ofplheader-wrap-right-user > i > img").src = data.playlist.creator.avatarUrl.toString();     
    $(".ofplheader-lable-description").innerHTML = data.playlist.description;

    $(".play-count").innerHTML = data.playlist.playCount;
    // 收藏数

    // 头部标签
    let mark_input = "";
    data.playlist.tags.forEach(function(index, value, arr){
        mark_input += 
        `
        <span>${value}</span>
        ` 
    })
    // let mark_input = "";
    //     mark_input += 
    //     `
    //     <span>${data.playlist.tags[0]}</span>
    //     <span>${data.playlist.tags[1]}</span>
    //     <span>${data.playlist.tags[2]}</span>
    //     ` 
          
    $(".ofplheader-lable-mark").innerHTML = mark_input;

    let song_list_input = "";
    data.playlist.tracks.forEach(function(value,index,arr){
        if(arr[index].al.name.length > 1){
            arr[index].al.name = "-&nbsp" + arr[index].al.name;
        }
        // console.log(value.al.id)
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

fetch("http://localhost:3000/comment/playlist?id="+detail_data_url,{
    method: "GET",
    mode: "cors"
}).then(respond=>{
    if(respond.status == 200){
        return respond.json();
    }
}).then(data=>{
    // console.log(data)

    let hotComments_input = "";
    data.hotComments.forEach(function(value, index, arr){
        // console.log(value.user.avatarUrl);
        hotComments_input +=
        `
        <div class="ofplfooter-content">
            <!-- 左边头像 -->
            <div class="ofplfooter-content-head">
                <img src="${value.user.avatarUrl}" alt="头像">
            </div>
            <!-- 评论主体 -->
            <div class="ofplfooter-content-body">
                <ul class="ofplfooter-content-body-list">
                    <li>
                        <p>
                            <span>${value.user.nickname}</span>
                            <i class="vip_icon"></i>
                        </p>
                        <p>
                            <span>
                                ${value.likedCount}
                            </span>
                            <i class="fa fa-thumbs-o-up"></i>
                        </p>
                    </li>
                    <li>
                        <span>${value.decoration.time} </span>
                    </li>
                    <li>
                        <p>
                            <span class="">
                                
                            </span>
                            <a href="#"></a>
                            <span>
                                ${value.content}
                            </span>
                        </p>
                        
                    </li>
                </ul>
            </div>

        </div>
        `
    })
    $("#ofplfooter").innerHTML += hotComments_input;
})