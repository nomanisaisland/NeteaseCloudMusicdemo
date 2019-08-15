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
    console.log(data)
    $(".ofplheader-wrap-right-title").innerHTML = data.playlist.name;
    $(".ofplheader-wrap-right-user > span").innerHTML = data.playlist.creator.nickname;
    $(".ofplheader-wrap-right-user > i > img").src = data.playlist.creator.avatarUrl.toString();     
    $(".ofplheader-wrap-right-user > i > img").src = data.playlist.creator.avatarUrl.toString();     
    $(".ofplheader-lable-description").innerHTML = data.playlist.description;
})