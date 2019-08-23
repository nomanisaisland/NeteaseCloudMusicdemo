
function $(e) {
    return document.querySelector(e);
}
function $A(e) {
    return document.querySelectorAll(e);
}

function render(url) {
    return fetch(url, {
        method: "GET",
        mode: "cors"
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        } 
        // else {
        //     alert("err:" + response.status)
        // }
    })
}

// 页面渲染主体
function addHtml(obj, arr, callback, link) {
    let input = "";
    arr.forEach((value, index) => {
        playCount(value); //index.js   line1
        input += callback(link, value, index);
    })
    obj.innerHTML = input;
}


function playCount(v){
    if(v.playCount > 10000){
        v.playCount = (v.playCount / 10000).toFixed(1) + "万";
        
    }
}