// playCount   In tens of thousands
function playCount(v){
    if(v.playCount > 10000){
        v.playCount = (v.playCount / 10000).toFixed(1) + "万";
        
    }
}

//热歌 排行前三红色，后面#999
function addColor(){
    $A(".song-list-content-left").forEach(value=>{
        if(value.innerHTML > 3){
            value.style.color = "#999";
        }
    })
}

