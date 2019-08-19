
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
        } else {
            alert("err:" + response.status)
        }
    })
}
// 页面渲染主体