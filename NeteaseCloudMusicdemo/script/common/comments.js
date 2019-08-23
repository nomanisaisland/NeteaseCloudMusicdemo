function addCommoent(url) {

    render(url).then(data => {

        let hotComments_input = "";
        data.hotComments.forEach(value => {
            let replied_content;
            let vip_icon;
            if (value.user.vipType == 11) {
                vip_icon = "vip_icon";
            }
            let time = new Date(value.time);
            let comment_time = time.getFullYear() + "年" + time.getMonth() + "月" + time.getDay() + "日";
            if (value.beReplied.length > 0) {
                replied = `<span class="be-replied font-color">回复<a href="#">@${value.beReplied[0].user.nickname}:</a></span>`;
                replied_content = `<div class="font-color"><span> @${value.beReplied[0].user.nickname}:</span><span>${value.beReplied[0].content}</span> </div>`
            } else {
                replied = ``;
                replied_content = ``;
            }
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
                            <span class="font-color">${value.user.nickname}</span>
                            <i class="${vip_icon}"></i>
                        </p>
                        <p>
                            <span>
                                ${value.likedCount}
                            </span>
                            <i class="fa fa-thumbs-o-up good-color"></i>
                        </p>
                    </li>
                    <li>
                        <span>${comment_time} </span>
                    </li>
                    <li>
                        <p>
                            
                            <span class="font-color">
                                ${value.content}
                            </span>
                        </p>
                        ${replied_content}
                    </li>
                </ul>
            </div>

        </div>
        `

        })
        $(".ofplfooter-hot-content").innerHTML += hotComments_input;


        let newComments_input = "";
        data.comments.forEach(value => {
            let vip_icon;
            let replied;
            let replied_content;
            if (value.user.vipType == 11) {
                vip_icon = "vip_icon";
            }

            if (value.beReplied.length > 0) {
                replied = `<span class="be-replied font-color">回复<a href="#">@${value.beReplied[0].user.nickname}:</a></span>`;
                replied_content = `<div class="font-color"><span> @${value.beReplied[0].user.nickname}:</span><span>${value.beReplied[0].content}</span> </div>`
            } else {
                replied = ``;
                replied_content = ``;
            }
            let time = new Date(value.time);
            let comment_time = time.getFullYear() + "年" + time.getMonth() + "月" + time.getDay() + "日";

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
                            <i class="fa fa-thumbs-o-up good-color"></i>
                        </p>
                    </li>
                    <li>
                        <span>${comment_time} </span>
                    </li>
                    <li>
                        <p>
                            
                            ${replied}
                            <span class="font-color">
                                ${value.content}
                            </span>
                        </p>
                        ${replied_content}
                    </li>
                </ul>
            </div>

        </div>
        `

        })
        $(".ofplfooter-new-content").innerHTML += hotComments_input;


    })
}