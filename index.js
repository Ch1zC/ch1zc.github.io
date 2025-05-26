function getValueRang(start, end) {

    dataList = new Array()

    return fetch("data/notes.json")
        .then(response => response.json())
        .then(data => {
            const data_re = data.reverse()
            return top3 = data_re.slice(start, end);
        })
    .catch(err => {
        console.log("something wrong:", err)
        return [
            {
                "updateDate": "2025年5月26日",
                "specificTtime": "18点01分",
                "title": "WRONG",
                "content": "SOMETHING WRONG its the only thing we know."
            }
        ]
    })
}

function shownote_recentlyUpdated() {

    const srcList = ["img/icon-pc.svg","img/icon-serverSetup.svg","img/icon-networkSetup.svg",
        "img/icon-Cybersecurity.svg","img/icon-gameDev.svg","img/icon-writing.svg"]
    const typeList = ["操作系统开发","服务器搭建","网络搭建","网络安全","游戏开发","小说"]

    getValueRang(0, 3).then(datalist => {
        
        for(i in datalist) {
            const data = datalist[i]
            const id  = data["id"]
            const type  = data["type"]
            const title = data["title"]
            const update_date = data["updateDate"]

            const showarea = document.querySelector('.recent-updates-showarea')

            //big box, include every div following
            const bigDiv = document.createElement("div");
            bigDiv.classList.add("recent-updates-contentbox")

            //logo box
            const logoBox = document.createElement("div")
            logoBox.classList.add("contentbox-imgbox")

            //img inside the logo box
            const img = document.createElement("img")
            img.src = srcList[type]

            //text: data type
            const text_data_type = document.createElement("p")
            text_data_type.classList.add("contentbox-notetype")
            text_data_type.classList.add("text-second-color")
            text_data_type.innerHTML = typeList[type]

            //a: href
            const a_href = document.createElement("p")
            a_href.classList.add("a")

            //text: data title. inside the a
            const text_data_title = document.createElement("h1")
            text_data_title.classList.add("text-main-color")
            text_data_title.innerHTML = title

            //text: update date
            const text_data_update_date = document.createElement("p")
            text_data_update_date.classList.add("text-main-color")
            text_data_update_date.classList.add("contentbox-updatedate")
            text_data_update_date.innerHTML = update_date

            a_href.addEventListener("click",function() {
                sessionStorage.setItem("selectedNote", JSON.stringify(data))
                window.location.href = "data-show.html?id=" + id
            })

            logoBox.appendChild(img)
            a_href.appendChild(text_data_title)

            bigDiv.appendChild(logoBox)
            bigDiv.appendChild(text_data_type)
            bigDiv.appendChild(a_href)
            bigDiv.appendChild(text_data_update_date)

            showarea.appendChild(bigDiv)
        } 
    });


}

shownote_recentlyUpdated()