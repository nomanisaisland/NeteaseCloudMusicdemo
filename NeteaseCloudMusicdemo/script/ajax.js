// 每日推荐歌单页面
let personalized = "http://localhost:3000/personalized";

render(personalized).then(data => {
    let input = "";
    data.result.splice(0, 6).forEach(function (value, index, arr) {
        input +=
            `
        <li>
            <a href="page2.html?id"+${value.id}>
                <img src="${value.picUrl}">
            <p>${value.name}</p>
            <div class="recommend-hot">
                <!-- 图标可以尝试用伪类 -->
                <i class="fa fa-headphones "></i>
                <p>${value.playCount}</p>
            </div>
            </a>
        </li>
        `
    })
    $(".recommend-titile-header").innerHTML = input;
})

let newsongurl = "http://localhost:3000/personalized/newsong";
render(newsongurl).then(data => {
    let newsonginput = "";
    data.result.forEach(function (value, index, arr) {
        newsonginput +=
        `
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
        `
    })
    $(".song-list-content").innerHTML = newsonginput;
})


// 热歌榜

let hotsongurl = "http://localhost:3000/top/list?idx=1";
render(hotsongurl).then(data => { 
    // console.log(data);
    let hotsonginput = "";
    data.playlist.tracks.splice(0,20).forEach(function (value, index, arr) {
        // console.log(arr);
        if(arr[index].alia.length ==1){
            arr[index].alia = "&nbsp-" + arr[index].alia
        }
        hotsonginput +=
        `
        <li>
            <div class="song-list-content-left first num">
                ${index+1}
            </div>
            <!-- 左边歌名部分 -->
            <div class="song-list-left hot-song-change song-name-change">
                <p>${arr[index].name}<span>${arr[index].alia}</span></p>
                <p>
                    <!-- 下面图标 -->
                    <i></i>
                    <span>${arr[index].ar[0].name}${arr[index].alia}</span>
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
    $("#hot-song-list").innerHTML = hotsonginput;
})


//  默认搜索关键字  
let serch_hot = "http://localhost:3000/search/hot";

render(serch_hot).then(data => {
    // console.log(data.result.hots);
    let searchinput = "";
    data.result.hots.forEach(function (value, index, arr) {
        searchinput +=
        `
        <li class="search_tap">
            <p>${arr[index].first}</p>
        </li>
        `
    })
    $("#tab_history").innerHTML = searchinput;
    addLocalS();
})

function addLocalS(){
    // console.log($A(".search_tap"))
    for(let i = 1; i < $A(".search_tap").length; i++){
        $A(".search_tap")[i].onclick = function(){
            let search_value =  $A(".search_tap > p").nodeValue;
            console.log(search_value)
        }
    }
}
