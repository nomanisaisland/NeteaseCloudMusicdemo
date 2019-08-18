// 每日推荐歌单页面
let personalized = "http://localhost:3000/personalized";

render(personalized).then(data => {
    let input = "";
    data.result.splice(0, 6).forEach(function (value, index, arr) {
        input +=
            `
        <li>
            <a href="page3.html?id=${value.id}&?pic=${value.picUrl}">
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
        console.log(value);
        newsonginput +=
        `
        <a href="song-play.html?id=${value.id}?pic=${value.song.album.blurPicUrl}">
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
    })
    $(".song-list-content").innerHTML = newsonginput;
})


// 热歌榜

let hotsongurl = "http://localhost:3000/top/list?idx=1";
render(hotsongurl).then(data => { 
    // console.log(data);
    let hotsonginput = "";
    data.playlist.tracks.splice(0,20).forEach(function (value, index, arr) {
        
        if(arr[index].alia.length ==1){
            arr[index].alia = "&nbsp-" + arr[index].alia;
        }
        // console.log(value);
        hotsonginput +=
        `
        <a href="song-play.html?id=${value.id}?pic=${value.al.picUrl}">
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
        </a>
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
    addSearHis($A(".search_tap"));
})

// 搜索记录
let data_arr = JSON.parse(window.localStorage.getItem("kserch_data_hisey"));
if(data_arr == null){
    data_arr = [];
}
function addSearHis(){
    for(let i = 0;i < $A(".search_tap").length;i++){
        $A(".search_tap")[i].onclick = function(){
            let data_his = $A(".search_tap")[i].children[$A(".search_tap")[i].children.length - 1].innerHTML;
            let data_arr_json = {first: data_his,second: 1};
            data_arr.push(data_arr_json);
            // console.log(data_arr)            
            localStorage.setItem('kserch_data_hisey',JSON.stringify(data_arr))
            makeArr();
            removeSearHis();
        }
        
    }
    
}

// 将记录整理成数组
// 数组清空
// 渲染本地存储的数组格式数据
makeArr();
function makeArr(){
    if(data_arr !== null){
        // console.log(data_arr);
        data_arr = JSON.parse(window.localStorage.getItem("kserch_data_hisey"));
        let data_arr_input = "";
        data_arr.forEach(function(value,index,arr) {
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
function removeSearHis(){
    let data_arr = JSON.parse(window.localStorage.getItem("kserch_data_hisey"));
    for(let i = 0;i < $A(".remove").length;i++){
        $A(".remove")[i].onclick = function(){     
            // localStorage.removeItem(key[i]);
            // window.localStorage.clear();
            data_arr.splice(i,1);
            localStorage.setItem('kserch_data_hisey',JSON.stringify(data_arr));
            makeArr();
            removeSearHis();
        }
    }
}









