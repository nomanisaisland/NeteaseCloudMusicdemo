
(function () {
    function $(e){
        return document.querySelector(e);
    }
    function $A(e){
        return document.querySelectorAll(e);
    }
    

    let tabH = document.querySelector("#tab_history").querySelectorAll("li");
    // console.log(tabH);
    let historyList = document.querySelector("#tab_history_list");
    
    

    for (let i = 0; i < tabH.length; i++) {
        // let i =1;

        tabH[i].onclick = function () {
            

            let menu = tabH[i].innerText;
            let newEle = document.createElement("li")
            let icon_box_one = document.createElement("i")
            let icon_one = document.createElement("span")
            let icon_box_two = document.createElement("i");
            let icon_two = document.createElement("span");
            let txt = document.createElement("p");
            txt.innerText = menu;

            newEle.setAttribute("class", "fx remve_node");
            icon_one.setAttribute("class", "fa fa-clock-o");
            icon_two.setAttribute("class", "fa fa-close");
            icon_box_two.setAttribute("class", "remove");
            icon_box_one.appendChild(icon_one);
            icon_box_two.appendChild(icon_two);
            newEle.appendChild(icon_box_one);
            newEle.appendChild(txt);
            newEle.appendChild(icon_box_two);
            historyList.appendChild(newEle);

            removeHistory();
            // console.log(listChild);
        }
    }

    function removeHistory() {
        let listChild = document.querySelectorAll(".remve_node");
        let remove = document.querySelectorAll(".remove");
        console.log(listChild);
        for (let i = 0; i < remove.length; i++) {
            remove[i].onclick = function () {
                historyList.removeChild(listChild[i]);
            }
        }
    }
    
}())