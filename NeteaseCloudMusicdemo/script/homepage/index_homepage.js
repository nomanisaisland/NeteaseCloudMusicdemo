// 寻找内容    歌单推荐
render("http://localhost:3000/personalized").then(data => {
    addHtml($(".recommend-titile-header"), data.result.splice(0, 6), function callback(link, value, index) {
        return input =
            `
            <li>
                <a href=${link+value.id+"?pic="+value.picUrl}>
                    <img src="${value.picUrl}">
                <p>${value.name}</p>
                <div class="recommend-hot">
                    <!-- 图标可以尝试用伪类 -->
                    <i class="fa fa-headphones "></i>
                    <p class="play-count">${value.playCount}</p>
                </div>
                </a>
            </li>
        `

    }, "page3.html?id=");
})
// 推荐歌单新歌渲染
render("http://localhost:3000/personalized/newsong").then(data => {
    addHtml($(".song-list-content"), data.result, function callback(link, value, index) {
        return input =
            `
            <a href=${link+value.id+"?pic="+value.song.album.blurPicUrl+"?cls=10000"}>
                <li>
                    <div class="song-list-content-left">

                    </div>
                    <!-- 左边歌名部分 -->
                    <div class="song-list-left hot-song-change">
                        <p>${value.name}<span>${value.song.alias}</span></p>
                        <p>
                            <!-- 下面图标 -->
                            <i></i>
                            <span>${value.song.artists[0].name}-${value.song.album.name}</span>
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

    }, "song-play.html?id=");
})
// 热歌榜
render("http://localhost:3000/top/list?idx=1").then(data => {
    addHtml($("#hot-song-list"), data.playlist.tracks.splice(0, 20), function callback(link, value, index) {
        if (value.alia.length == 1) {
            value.alia = "&nbsp-" + value.alia;
        }
        num = index + 1;
        num = num < 10 ? "0" + num : num;
        return input =
            `
        <a href=${link+value.id+"?pic="+value.al.picUrl+"?cls=10001"}>
            <li>
                <div class="song-list-content-left first num">
                    ${num}
                </div>
                <!-- 左边歌名部分 -->
                <div class="song-list-left hot-song-change song-name-change">
                    <p>${value.name}<span>${value.alia}</span></p>
                    <p>
                        <!-- 下面图标 -->
                        <i></i>
                        <span>${value.ar[0].name}${value.alia}</span>
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

    }, "song-play.html?id=");
    addColor();
})

render("http://localhost:3000/search/hot").then(data => {

    addHtml($("#tab_history"), data.result.hots, function callback(link, value, index) {
        return input =
            `
            <li class="search_tap">
                <p>${value.first}</p>
            </li>
        `
    })
    addSearHis($A(".search_tap"));
})
// 搜索记录
let data_arr = JSON.parse(window.localStorage.getItem("kserch_data_hisey"));
if (data_arr == null) {
    data_arr = [];
}

function addSearHis() {
    for (let i = 0; i < $A(".search_tap").length; i++) {
        $A(".search_tap")[i].onclick = function () {
            let data_his = $A(".search_tap")[i].children[$A(".search_tap")[i].children.length - 1].innerHTML;
            let data_arr_json = {
                first: data_his,
                second: 1
            };
            data_arr.push(data_arr_json);
            // console.log(data_arr)            
            localStorage.setItem('kserch_data_hisey', JSON.stringify(data_arr))
            makeArr();
            removeSearHis();
        }

    }

}
// 将记录整理成数组
// 数组清空
// 渲染本地存储的数组格式数据
makeArr();

function makeArr() {
    if (data_arr !== null) {
        // console.log(data_arr);
        data_arr = JSON.parse(window.localStorage.getItem("kserch_data_hisey"));
        let data_arr_input = "";
        data_arr.forEach(value => {
            data_arr_input +=
                `
            <li class="fx remve_node"><i><span class="fa fa-clock-o"></span></i>
                <p>${value.first}</p>
                <i class="remove">
                    <span class="fa fa-close">
    
                    </span>
                </i>
            </li>
            `
        })
        $("#tab_history_list").innerHTML = data_arr_input;
    }

}
// 删除按钮
removeSearHis()

function removeSearHis() {
    let data_arr = JSON.parse(window.localStorage.getItem("kserch_data_hisey"));
    for (let i = 0; i < $A(".remove").length; i++) {
        $A(".remove")[i].onclick = function () {
            // localStorage.removeItem(key[i]);
            // window.localStorage.clear();
            data_arr.splice(i, 1);
            localStorage.setItem('kserch_data_hisey', JSON.stringify(data_arr));
            makeArr();
            removeSearHis();
        }
    }
}

//热歌 排行前三红色，后面#999
function addColor() {
    $A(".song-list-content-left").forEach(value => {
        if (value.innerHTML > 3) {
            value.style.color = "#999";
        }
    })
}


// 登录按钮悬浮效果功能
$("#top_login_btn").addEventListener("mouseover", function () {

});

// 删除按钮
$(".search-del").addEventListener("click", function () {
    $("#serch_song_key").value = "";
})
// 搜索功能实现
$("#serch_song_key").addEventListener("input", function () {
    // console.log("2");  //测试input

    let key_value = this.value;
    // console.log(key_value);

    render("http://localhost:3000/search?keywords=" + key_value).then(data => {
        addHtml($("#search_song_name"), data.result.songs, function callback(link, value, index) {
            let a = "";
            let b = "";
            if (value.name == undefined) {
                value.name = "";
            }
            switch (value.artists.length) {
                case 1:
                    a = value.artists[0].name;
                    break;
                case 2:
                    a = value.artists[0].name;

                    b = value.artists[1].name
                    break;
                default:
                    break;
            }
            return input =
                `
                <a href="">
                        <li>
                            <div class="song-list-content-left first num">
                            </div>
                            <!-- 左边歌名部分 -->
                            <div class="song-list-left hot-song-change">
                                <p>${value.name}<span></span></p>
                                <p>     
                                    <!-- 下面图标 -->
                                    <i></i>
                                    <span>${a}</span>
                                    <span>${b}-${value.album.name}</span>
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
    })
    // 歌手
    // render("http://localhost:3000/search?keywords=" + key_value+"&type=100&limit=1").then(data => {
    //     addHtml($(".search-key-song"), data.result.artists, function callback(link, value, index) {
    //         return input =
    //             `
    //             <div class="search-song-list">
    //                 <div>
    //                     <img class="song-icon" src="../img/109951163111191410.webp" alt="">
    //                     <p>
    //                         歌手：
    //                         <span>${value.name} ${value.alias}</span>
    //                     </p>
    //                 </div>
    //                 <i>&gt;</i>
    //             </div>
    //             `
    //     })
    // })
    // 专辑
    

})